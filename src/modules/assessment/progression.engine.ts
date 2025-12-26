import { prisma } from '../../shared/database/prisma';
import { assessmentService } from './assessment.service';
import { competencyChecker } from './competency.checker';
import type { ProgressionResult, Assessment } from './assessment.types';
import type { Level } from '../learner/learner.types';

const LEVEL_ORDER: Level[] = ['A2', 'B1', 'B2', 'C1', 'C2'];

export class ProgressionEngine {
  async evaluateProgression(
    learnerId: string,
    languageCode: string
  ): Promise<ProgressionResult> {
    const learnerLanguage = await prisma.learnerLanguage.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!learnerLanguage) {
      return {
        canAdvance: false,
        currentLevel: 'A2',
        recommendedLevel: null,
        moduleCompletion: null,
        reasons: ['Learner not found'],
        nextSteps: [],
      };
    }

    const currentLevel = learnerLanguage.currentLevel as Level;

    const recentAssessments = await assessmentService.list({
      learnerId,
      languageCode,
      limit: 5,
    });

    if (recentAssessments.assessments.length < 3) {
      return {
        canAdvance: false,
        currentLevel,
        recommendedLevel: null,
        moduleCompletion: null,
        reasons: ['Need more assessments to evaluate progression'],
        nextSteps: ['Complete at least 3 assessments before level advancement'],
      };
    }

    const avgScores = await assessmentService.getAverageScores(learnerId, languageCode, 30);

    const competencyMet = await competencyChecker.checkCompetency(
      learnerId,
      languageCode,
      currentLevel,
      avgScores
    );

    if (!competencyMet.passed) {
      return {
        canAdvance: false,
        currentLevel,
        recommendedLevel: null,
        moduleCompletion: this.getModuleCompletion(learnerLanguage.currentModuleId, avgScores.overall),
        reasons: competencyMet.failureReasons,
        nextSteps: competencyMet.recommendations,
      };
    }

    const nextLevel = this.getNextLevel(currentLevel);
    if (!nextLevel) {
      return {
        canAdvance: false,
        currentLevel,
        recommendedLevel: null,
        moduleCompletion: null,
        reasons: ['Already at maximum level (C2)'],
        nextSteps: ['Focus on maintaining and refining your excellent skills'],
      };
    }

    const consistentPerformance = this.checkConsistency(recentAssessments.assessments);
    if (!consistentPerformance) {
      return {
        canAdvance: false,
        currentLevel,
        recommendedLevel: null,
        moduleCompletion: this.getModuleCompletion(learnerLanguage.currentModuleId, avgScores.overall),
        reasons: ['Performance not yet consistent enough for advancement'],
        nextSteps: ['Maintain your current performance for a few more sessions'],
      };
    }

    return {
      canAdvance: true,
      currentLevel,
      recommendedLevel: nextLevel,
      moduleCompletion: this.getModuleCompletion(learnerLanguage.currentModuleId, avgScores.overall),
      reasons: [
        `Average score of ${avgScores.overall}% meets requirements`,
        'Consistent performance across recent assessments',
        'Required competencies demonstrated',
      ],
      nextSteps: [
        `Ready to advance to ${nextLevel} level content`,
        'New modules will be unlocked',
      ],
    };
  }

  async advanceLevel(learnerId: string, languageCode: string): Promise<{
    success: boolean;
    newLevel: Level | null;
    message: string;
  }> {
    const evaluation = await this.evaluateProgression(learnerId, languageCode);

    if (!evaluation.canAdvance || !evaluation.recommendedLevel) {
      return {
        success: false,
        newLevel: null,
        message: evaluation.reasons.join('; '),
      };
    }

    await prisma.learnerLanguage.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        currentLevel: evaluation.recommendedLevel,
      },
    });

    return {
      success: true,
      newLevel: evaluation.recommendedLevel,
      message: `Successfully advanced to ${evaluation.recommendedLevel}`,
    };
  }

  async getProgressToNextLevel(
    learnerId: string,
    languageCode: string
  ): Promise<{
    currentLevel: Level;
    nextLevel: Level | null;
    percentComplete: number;
    requirements: { name: string; current: number; required: number; met: boolean }[];
  }> {
    const learnerLanguage = await prisma.learnerLanguage.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!learnerLanguage) {
      return {
        currentLevel: 'A2',
        nextLevel: 'B1',
        percentComplete: 0,
        requirements: [],
      };
    }

    const currentLevel = learnerLanguage.currentLevel as Level;
    const nextLevel = this.getNextLevel(currentLevel);
    const avgScores = await assessmentService.getAverageScores(learnerId, languageCode, 30);

    const thresholds = competencyChecker.getThresholds(nextLevel || currentLevel);

    const requirements = [
      {
        name: 'Overall Score',
        current: avgScores.overall,
        required: thresholds.minOverallScore,
        met: avgScores.overall >= thresholds.minOverallScore,
      },
      {
        name: 'Fluency',
        current: avgScores.fluency,
        required: thresholds.minFluencyScore,
        met: avgScores.fluency >= thresholds.minFluencyScore,
      },
      {
        name: 'Accuracy',
        current: avgScores.accuracy,
        required: thresholds.minAccuracyScore,
        met: avgScores.accuracy >= thresholds.minAccuracyScore,
      },
      {
        name: 'Appropriacy',
        current: avgScores.appropriacy,
        required: thresholds.minAppropriracyScore,
        met: avgScores.appropriacy >= thresholds.minAppropriracyScore,
      },
    ];

    const metCount = requirements.filter((r) => r.met).length;
    const percentComplete = Math.round((metCount / requirements.length) * 100);

    return {
      currentLevel,
      nextLevel,
      percentComplete,
      requirements,
    };
  }

  private getNextLevel(current: Level): Level | null {
    const index = LEVEL_ORDER.indexOf(current);
    if (index === -1 || index >= LEVEL_ORDER.length - 1) {
      return null;
    }
    return LEVEL_ORDER[index + 1];
  }

  private checkConsistency(assessments: Assessment[]): boolean {
    if (assessments.length < 3) return false;

    const scores = assessments.map((a) => a.scores.overall);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    return stdDev < 15;
  }

  private getModuleCompletion(
    moduleId: string | null,
    score: number
  ): ProgressionResult['moduleCompletion'] {
    if (!moduleId) return null;

    return {
      moduleId,
      completed: score >= 70,
      score,
      requiredScore: 70,
    };
  }
}

export const progressionEngine = new ProgressionEngine();

