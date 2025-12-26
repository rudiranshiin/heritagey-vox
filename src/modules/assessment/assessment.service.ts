import { prisma } from '../../shared/database/prisma';
import { fluencyScorer, accuracyScorer, appropriacyScorer, confidenceScorer } from './scorers';
import type {
  Assessment,
  AssessmentScores,
  AssessmentRecommendation,
  AssessmentInput,
  CreateAssessmentDTO,
  AssessmentFilter,
  AssessmentType,
  ScoreBreakdown,
} from './assessment.types';

function parseAssessment(dbAssessment: {
  id: string;
  learnerId: string;
  languageCode: string;
  type: string;
  moduleId: string | null;
  scores: unknown;
  recommendations: unknown;
  createdAt: Date;
}): Assessment {
  return {
    id: dbAssessment.id,
    learnerId: dbAssessment.learnerId,
    languageCode: dbAssessment.languageCode,
    type: dbAssessment.type as AssessmentType,
    moduleId: dbAssessment.moduleId,
    scores: dbAssessment.scores as AssessmentScores,
    recommendations: dbAssessment.recommendations as AssessmentRecommendation[],
    createdAt: dbAssessment.createdAt,
  };
}

export class AssessmentService {
  async createAssessment(data: CreateAssessmentDTO, input: AssessmentInput): Promise<Assessment> {
    const scores = this.calculateScores(input);
    const recommendations = await this.generateRecommendations(
      data.learnerId,
      data.languageCode,
      scores
    );

    const assessment = await prisma.assessment.create({
      data: {
        learnerId: data.learnerId,
        languageCode: data.languageCode,
        type: data.type,
        moduleId: data.moduleId,
        scores: JSON.parse(JSON.stringify(scores)),
        recommendations: JSON.parse(JSON.stringify(recommendations)),
      },
    });

    return parseAssessment(assessment);
  }

  async getById(id: string): Promise<Assessment | null> {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!assessment) return null;
    return parseAssessment(assessment);
  }

  async getLatest(learnerId: string, languageCode: string): Promise<Assessment | null> {
    const assessment = await prisma.assessment.findFirst({
      where: { learnerId, languageCode },
      orderBy: { createdAt: 'desc' },
    });

    if (!assessment) return null;
    return parseAssessment(assessment);
  }

  async getLatestForModule(
    learnerId: string,
    languageCode: string,
    moduleId: string
  ): Promise<Assessment | null> {
    const assessment = await prisma.assessment.findFirst({
      where: { learnerId, languageCode, moduleId },
      orderBy: { createdAt: 'desc' },
    });

    if (!assessment) return null;
    return parseAssessment(assessment);
  }

  async list(filter: AssessmentFilter = {}): Promise<{ assessments: Assessment[]; total: number }> {
    const where: Record<string, unknown> = {};

    if (filter.learnerId) where.learnerId = filter.learnerId;
    if (filter.languageCode) where.languageCode = filter.languageCode;
    if (filter.type) where.type = filter.type;
    if (filter.moduleId) where.moduleId = filter.moduleId;

    if (filter.startDate || filter.endDate) {
      where.createdAt = {};
      if (filter.startDate) {
        (where.createdAt as Record<string, Date>).gte = filter.startDate;
      }
      if (filter.endDate) {
        (where.createdAt as Record<string, Date>).lte = filter.endDate;
      }
    }

    const [assessments, total] = await Promise.all([
      prisma.assessment.findMany({
        where,
        take: filter.limit || 50,
        skip: filter.offset || 0,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.assessment.count({ where }),
    ]);

    return {
      assessments: assessments.map(parseAssessment),
      total,
    };
  }

  async getAverageScores(
    learnerId: string,
    languageCode: string,
    days: number = 30
  ): Promise<{ overall: number; fluency: number; accuracy: number; appropriacy: number; confidence: number }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const assessments = await prisma.assessment.findMany({
      where: {
        learnerId,
        languageCode,
        createdAt: { gte: startDate },
      },
    });

    if (assessments.length === 0) {
      return { overall: 0, fluency: 0, accuracy: 0, appropriacy: 0, confidence: 0 };
    }

    const parsed = assessments.map(parseAssessment);
    const totals = parsed.reduce(
      (acc, a) => {
        acc.overall += a.scores.overall;
        acc.fluency += a.scores.fluency.score;
        acc.accuracy += a.scores.accuracy.score;
        acc.appropriacy += a.scores.appropriacy.score;
        acc.confidence += a.scores.confidence.score;
        return acc;
      },
      { overall: 0, fluency: 0, accuracy: 0, appropriacy: 0, confidence: 0 }
    );

    return {
      overall: Math.round(totals.overall / parsed.length),
      fluency: Math.round(totals.fluency / parsed.length),
      accuracy: Math.round(totals.accuracy / parsed.length),
      appropriacy: Math.round(totals.appropriacy / parsed.length),
      confidence: Math.round(totals.confidence / parsed.length),
    };
  }

  calculateScores(input: AssessmentInput): AssessmentScores {
    const fluency = fluencyScorer.score(input.events, input.duration);
    const accuracy = accuracyScorer.score(input.events, input.errorLogs);
    const appropriacy = appropriacyScorer.score(input.events, input.errorLogs);
    const confidence = confidenceScorer.score(input.events, input.errorLogs);

    const overall = Math.round(
      fluency.score * 0.25 +
        accuracy.score * 0.35 +
        appropriacy.score * 0.2 +
        confidence.score * 0.2
    );

    const breakdown = this.generateBreakdown(fluency, accuracy, appropriacy, confidence);

    return {
      overall,
      fluency,
      accuracy,
      appropriacy,
      confidence,
      breakdown,
    };
  }

  private generateBreakdown(
    fluency: { score: number },
    accuracy: { score: number },
    appropriacy: { score: number },
    confidence: { score: number }
  ): ScoreBreakdown {
    const scores = [
      { name: 'Fluency', score: fluency.score },
      { name: 'Accuracy', score: accuracy.score },
      { name: 'Appropriacy', score: appropriacy.score },
      { name: 'Confidence', score: confidence.score },
    ];

    const strengths = scores.filter((s) => s.score >= 75).map((s) => s.name);
    const areasForImprovement = scores.filter((s) => s.score < 60).map((s) => s.name);

    return {
      strengths,
      areasForImprovement,
      comparedToPrevious: {
        improved: [],
        declined: [],
        stable: [],
      },
    };
  }

  private async generateRecommendations(
    learnerId: string,
    languageCode: string,
    scores: AssessmentScores
  ): Promise<AssessmentRecommendation[]> {
    const recommendations: AssessmentRecommendation[] = [];

    if (scores.accuracy.score < 60) {
      const topError = Object.entries(scores.accuracy.errorsByCategory)
        .sort((a, b) => b[1] - a[1])[0];

      if (topError) {
        recommendations.push({
          type: 'focus_area',
          value: topError[0],
          reason: `Your ${topError[0]} accuracy needs improvement`,
          priority: 'high',
        });
      }
    }

    if (scores.fluency.score < 60) {
      recommendations.push({
        type: 'practice_type',
        value: 'conversation',
        reason: 'Practice more conversational exercises to improve fluency',
        priority: 'high',
      });
    }

    if (scores.appropriacy.score < 60) {
      recommendations.push({
        type: 'focus_area',
        value: 'cultural',
        reason: 'Focus on British cultural conventions and politeness',
        priority: 'medium',
      });
    }

    if (scores.overall >= 80) {
      recommendations.push({
        type: 'level_change',
        value: 'consider_advancement',
        reason: 'Your scores indicate you may be ready for more advanced content',
        priority: 'medium',
      });
    }

    return recommendations;
  }

  async compareWithPrevious(
    assessment: Assessment
  ): Promise<{ improved: string[]; declined: string[]; stable: string[] }> {
    const previous = await prisma.assessment.findFirst({
      where: {
        learnerId: assessment.learnerId,
        languageCode: assessment.languageCode,
        createdAt: { lt: assessment.createdAt },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!previous) {
      return { improved: [], declined: [], stable: [] };
    }

    const prevScores = previous.scores as unknown as AssessmentScores;
    const currScores = assessment.scores;

    const categories = ['fluency', 'accuracy', 'appropriacy', 'confidence'] as const;
    const improved: string[] = [];
    const declined: string[] = [];
    const stable: string[] = [];

    for (const cat of categories) {
      const prevScore = prevScores[cat].score;
      const currScore = currScores[cat].score;
      const diff = currScore - prevScore;

      if (diff >= 5) {
        improved.push(cat);
      } else if (diff <= -5) {
        declined.push(cat);
      } else {
        stable.push(cat);
      }
    }

    return { improved, declined, stable };
  }
}

export const assessmentService = new AssessmentService();

