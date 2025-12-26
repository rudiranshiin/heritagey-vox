import { prisma } from '../../shared/database/prisma';
import type { CompetencyThreshold } from './assessment.types';
import type { Level } from '../learner/learner.types';

const LEVEL_THRESHOLDS: Record<Level, CompetencyThreshold> = {
  A2: {
    level: 'A2',
    minOverallScore: 50,
    minFluencyScore: 45,
    minAccuracyScore: 50,
    minAppropriracyScore: 40,
    requiredModules: [],
  },
  B1: {
    level: 'B1',
    minOverallScore: 60,
    minFluencyScore: 55,
    minAccuracyScore: 60,
    minAppropriracyScore: 55,
    requiredModules: ['en-GB:1A', 'en-GB:1B', 'en-GB:1C', 'en-GB:1D'],
  },
  B2: {
    level: 'B2',
    minOverallScore: 70,
    minFluencyScore: 65,
    minAccuracyScore: 70,
    minAppropriracyScore: 65,
    requiredModules: ['en-GB:2A', 'en-GB:2B', 'en-GB:2C', 'en-GB:2D'],
  },
  C1: {
    level: 'C1',
    minOverallScore: 80,
    minFluencyScore: 75,
    minAccuracyScore: 80,
    minAppropriracyScore: 75,
    requiredModules: ['en-GB:3A', 'en-GB:3B', 'en-GB:3C', 'en-GB:3D'],
  },
  C2: {
    level: 'C2',
    minOverallScore: 90,
    minFluencyScore: 85,
    minAccuracyScore: 90,
    minAppropriracyScore: 85,
    requiredModules: ['en-GB:4A', 'en-GB:4B', 'en-GB:4C'],
  },
};

export class CompetencyChecker {
  async checkCompetency(
    learnerId: string,
    languageCode: string,
    currentLevel: Level,
    scores: {
      overall: number;
      fluency: number;
      accuracy: number;
      appropriacy: number;
    }
  ): Promise<{
    passed: boolean;
    failureReasons: string[];
    recommendations: string[];
  }> {
    const thresholds = LEVEL_THRESHOLDS[currentLevel];
    const failureReasons: string[] = [];
    const recommendations: string[] = [];

    if (scores.overall < thresholds.minOverallScore) {
      failureReasons.push(
        `Overall score (${scores.overall}%) below required ${thresholds.minOverallScore}%`
      );
      recommendations.push('Continue practicing to improve your overall performance');
    }

    if (scores.fluency < thresholds.minFluencyScore) {
      failureReasons.push(
        `Fluency score (${scores.fluency}%) below required ${thresholds.minFluencyScore}%`
      );
      recommendations.push('Focus on conversational practice to improve fluency');
    }

    if (scores.accuracy < thresholds.minAccuracyScore) {
      failureReasons.push(
        `Accuracy score (${scores.accuracy}%) below required ${thresholds.minAccuracyScore}%`
      );
      recommendations.push('Review grammar and vocabulary to improve accuracy');
    }

    if (scores.appropriacy < thresholds.minAppropriracyScore) {
      failureReasons.push(
        `Appropriacy score (${scores.appropriacy}%) below required ${thresholds.minAppropriracyScore}%`
      );
      recommendations.push('Practice cultural scenarios to improve appropriacy');
    }

    const moduleCheck = await this.checkRequiredModules(
      learnerId,
      languageCode,
      thresholds.requiredModules
    );

    if (!moduleCheck.passed) {
      failureReasons.push(...moduleCheck.reasons);
      recommendations.push('Complete all required modules before advancement');
    }

    return {
      passed: failureReasons.length === 0,
      failureReasons,
      recommendations,
    };
  }

  async checkRequiredModules(
    learnerId: string,
    languageCode: string,
    requiredModules: string[]
  ): Promise<{ passed: boolean; reasons: string[] }> {
    if (requiredModules.length === 0) {
      return { passed: true, reasons: [] };
    }

    const memory = await prisma.learnerMemory.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!memory) {
      return {
        passed: false,
        reasons: ['Learner progress data not found'],
      };
    }

    const progressData = memory.progressData as { completedModules?: string[] } | null;
    const completedModules = new Set(progressData?.completedModules || []);

    const missingModules = requiredModules.filter((m) => !completedModules.has(m));

    if (missingModules.length > 0) {
      return {
        passed: false,
        reasons: [`Missing required modules: ${missingModules.join(', ')}`],
      };
    }

    return { passed: true, reasons: [] };
  }

  getThresholds(level: Level): CompetencyThreshold {
    return LEVEL_THRESHOLDS[level];
  }

  getAllThresholds(): Record<Level, CompetencyThreshold> {
    return LEVEL_THRESHOLDS;
  }

  async getCompetencyProgress(
    learnerId: string,
    languageCode: string,
    targetLevel: Level
  ): Promise<{
    overall: { current: number; required: number; percentage: number };
    fluency: { current: number; required: number; percentage: number };
    accuracy: { current: number; required: number; percentage: number };
    appropriacy: { current: number; required: number; percentage: number };
    modules: { completed: number; required: number; percentage: number };
  }> {
    const thresholds = LEVEL_THRESHOLDS[targetLevel];

    const assessments = await prisma.assessment.findMany({
      where: {
        learnerId,
        languageCode,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    let avgScores = { overall: 0, fluency: 0, accuracy: 0, appropriacy: 0 };

    if (assessments.length > 0) {
      const totals = assessments.reduce(
        (acc, a) => {
          const scores = a.scores as { overall: number; fluency: { score: number }; accuracy: { score: number }; appropriacy: { score: number } };
          acc.overall += scores.overall;
          acc.fluency += scores.fluency.score;
          acc.accuracy += scores.accuracy.score;
          acc.appropriacy += scores.appropriacy.score;
          return acc;
        },
        { overall: 0, fluency: 0, accuracy: 0, appropriacy: 0 }
      );

      avgScores = {
        overall: Math.round(totals.overall / assessments.length),
        fluency: Math.round(totals.fluency / assessments.length),
        accuracy: Math.round(totals.accuracy / assessments.length),
        appropriacy: Math.round(totals.appropriacy / assessments.length),
      };
    }

    const moduleCheck = await this.checkRequiredModules(
      learnerId,
      languageCode,
      thresholds.requiredModules
    );

    const memory = await prisma.learnerMemory.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    const progressData = memory?.progressData as { completedModules?: string[] } | null;
    const completedModules = progressData?.completedModules || [];
    const completedRequiredCount = thresholds.requiredModules.filter(
      (m) => completedModules.includes(m)
    ).length;

    return {
      overall: {
        current: avgScores.overall,
        required: thresholds.minOverallScore,
        percentage: Math.min(100, Math.round((avgScores.overall / thresholds.minOverallScore) * 100)),
      },
      fluency: {
        current: avgScores.fluency,
        required: thresholds.minFluencyScore,
        percentage: Math.min(100, Math.round((avgScores.fluency / thresholds.minFluencyScore) * 100)),
      },
      accuracy: {
        current: avgScores.accuracy,
        required: thresholds.minAccuracyScore,
        percentage: Math.min(100, Math.round((avgScores.accuracy / thresholds.minAccuracyScore) * 100)),
      },
      appropriacy: {
        current: avgScores.appropriacy,
        required: thresholds.minAppropriracyScore,
        percentage: Math.min(100, Math.round((avgScores.appropriacy / thresholds.minAppropriracyScore) * 100)),
      },
      modules: {
        completed: completedRequiredCount,
        required: thresholds.requiredModules.length,
        percentage:
          thresholds.requiredModules.length > 0
            ? Math.round((completedRequiredCount / thresholds.requiredModules.length) * 100)
            : 100,
      },
    };
  }
}

export const competencyChecker = new CompetencyChecker();

