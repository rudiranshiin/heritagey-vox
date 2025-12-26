import { prisma } from '../../shared/database/prisma';
import { memoryService } from '../memory/memory.service';
import { errorPatternAnalyzer } from '../memory/error-pattern.analyzer';
import type { ReviewRecommendation, LearnerProgress } from './assessment.types';
import type { Level, ErrorPattern, ProgressData } from '../learner/learner.types';

export class ReviewRecommender {
  async getRecommendations(
    learnerId: string,
    languageCode: string,
    limit: number = 5
  ): Promise<ReviewRecommendation[]> {
    const recommendations: ReviewRecommendation[] = [];

    const skillRecs = await this.getSkillRecommendations(learnerId, languageCode);
    recommendations.push(...skillRecs);

    const moduleRecs = await this.getModuleRecommendations(learnerId, languageCode);
    recommendations.push(...moduleRecs);

    const scenarioRecs = await this.getScenarioRecommendations(learnerId, languageCode);
    recommendations.push(...scenarioRecs);

    return this.prioritizeRecommendations(recommendations).slice(0, limit);
  }

  async getSkillRecommendations(
    learnerId: string,
    languageCode: string
  ): Promise<ReviewRecommendation[]> {
    const memory = await memoryService.getMemory(learnerId, languageCode);
    if (!memory) return [];

    const errorPatterns = memory.errorPatterns;
    const focusAreas = errorPatternAnalyzer.suggestFocusAreas(errorPatterns);

    const recommendations: ReviewRecommendation[] = [];

    if (focusAreas.primary) {
      recommendations.push({
        type: 'skill',
        id: focusAreas.primary.category,
        name: this.formatSkillName(focusAreas.primary.category),
        reason: `Recurring challenge with ${focusAreas.primary.frequency} occurrences`,
        priority: 'high',
        currentScore: this.estimateSkillScore(focusAreas.primary),
        targetScore: 80,
      });
    }

    for (const pattern of focusAreas.secondary.slice(0, 2)) {
      recommendations.push({
        type: 'skill',
        id: pattern.category,
        name: this.formatSkillName(pattern.category),
        reason: 'Area needs attention',
        priority: 'medium',
        currentScore: this.estimateSkillScore(pattern),
        targetScore: 75,
      });
    }

    return recommendations;
  }

  async getModuleRecommendations(
    learnerId: string,
    languageCode: string
  ): Promise<ReviewRecommendation[]> {
    const memory = await memoryService.getMemory(learnerId, languageCode);
    if (!memory) return [];

    const progressData = memory.progressData;
    const recommendations: ReviewRecommendation[] = [];

    const lowScoreModules: { moduleId: string; score: number; lastPracticed?: string }[] = [];

    for (const [moduleId, progress] of Object.entries(progressData.moduleProgress || {})) {
      if (progress.averageScore < 70) {
        lowScoreModules.push({
          moduleId,
          score: progress.averageScore,
          lastPracticed: progress.lastPracticedAt,
        });
      }
    }

    lowScoreModules.sort((a, b) => a.score - b.score);

    for (const mod of lowScoreModules.slice(0, 2)) {
      const module = await prisma.module.findUnique({
        where: { id: mod.moduleId },
        select: { title: true },
      });

      recommendations.push({
        type: 'module',
        id: mod.moduleId,
        name: module?.title || mod.moduleId,
        reason: `Average score of ${Math.round(mod.score)}% needs improvement`,
        priority: mod.score < 50 ? 'high' : 'medium',
        lastPracticedAt: mod.lastPracticed,
        currentScore: Math.round(mod.score),
        targetScore: 70,
      });
    }

    return recommendations;
  }

  async getScenarioRecommendations(
    learnerId: string,
    languageCode: string
  ): Promise<ReviewRecommendation[]> {
    const errorLogs = await prisma.errorLog.findMany({
      where: {
        learnerId,
        languageCode,
      },
      include: {
        session: {
          select: { scenarioId: true },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });

    const scenarioErrorCounts: Record<string, number> = {};
    for (const log of errorLogs) {
      if (log.session?.scenarioId) {
        scenarioErrorCounts[log.session.scenarioId] =
          (scenarioErrorCounts[log.session.scenarioId] || 0) + 1;
      }
    }

    const recommendations: ReviewRecommendation[] = [];
    const sortedScenarios = Object.entries(scenarioErrorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    for (const [scenarioId, errorCount] of sortedScenarios) {
      const scenario = await prisma.scenario.findUnique({
        where: { id: scenarioId },
        select: { title: true },
      });

      recommendations.push({
        type: 'scenario',
        id: scenarioId,
        name: scenario?.title || scenarioId,
        reason: `${errorCount} errors recorded in this scenario`,
        priority: errorCount > 5 ? 'high' : 'medium',
        targetScore: 80,
      });
    }

    return recommendations;
  }

  async getLearnerProgress(learnerId: string, languageCode: string): Promise<LearnerProgress> {
    const learnerLanguage = await prisma.learnerLanguage.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    const memory = await memoryService.getMemory(learnerId, languageCode);

    const currentLevel = (learnerLanguage?.currentLevel as Level) || 'A2';
    const progressData = memory?.progressData || this.getDefaultProgressData();
    const errorPatterns = memory?.errorPatterns || [];

    const completedModules = progressData.completedModules.length;
    const totalModules = await prisma.module.count({
      where: { languageCode },
    });

    const avgScore = this.calculateAverageModuleScore(progressData);
    const strongAreas = this.identifyStrongAreas(errorPatterns);
    const weakAreas = this.identifyWeakAreas(errorPatterns);

    return {
      currentLevel,
      percentToNextLevel: this.calculatePercentToNextLevel(currentLevel, avgScore),
      modulesCompleted: completedModules,
      modulesTotal: totalModules,
      averageScore: avgScore,
      streak: progressData.currentStreak,
      totalPracticeTime: progressData.totalPracticeMinutes,
      strongAreas,
      weakAreas,
    };
  }

  private formatSkillName(category: string): string {
    const names: Record<string, string> = {
      grammar: 'Grammar Skills',
      vocabulary: 'Vocabulary',
      pronunciation: 'Pronunciation',
      cultural: 'Cultural Awareness',
      pragmatic: 'Pragmatic Usage',
      register: 'Register Matching',
    };
    return names[category] || category;
  }

  private estimateSkillScore(pattern: ErrorPattern): number {
    if (pattern.trend === 'improving') return 70;
    if (pattern.trend === 'stable') return 55;
    return 40;
  }

  private prioritizeRecommendations(recs: ReviewRecommendation[]): ReviewRecommendation[] {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  private getDefaultProgressData(): ProgressData {
    return {
      completedModules: [],
      completedScenarios: [],
      currentStreak: 0,
      longestStreak: 0,
      totalSessions: 0,
      totalPracticeMinutes: 0,
      moduleProgress: {},
    };
  }

  private calculateAverageModuleScore(progressData: ProgressData): number {
    const moduleScores = Object.values(progressData.moduleProgress || {});
    if (moduleScores.length === 0) return 0;

    const total = moduleScores.reduce((sum, m) => sum + m.averageScore, 0);
    return Math.round(total / moduleScores.length);
  }

  private identifyStrongAreas(patterns: ErrorPattern[]): string[] {
    return patterns
      .filter((p) => p.trend === 'improving' || p.recentCount === 0)
      .map((p) => this.formatSkillName(p.category))
      .slice(0, 3);
  }

  private identifyWeakAreas(patterns: ErrorPattern[]): string[] {
    return patterns
      .filter((p) => p.trend === 'worsening' || p.frequency >= 5)
      .sort((a, b) => b.frequency - a.frequency)
      .map((p) => this.formatSkillName(p.category))
      .slice(0, 3);
  }

  private calculatePercentToNextLevel(currentLevel: Level, avgScore: number): number {
    const thresholds: Record<Level, number> = {
      A2: 60,
      B1: 70,
      B2: 80,
      C1: 90,
      C2: 100,
    };

    const required = thresholds[currentLevel];
    return Math.min(100, Math.round((avgScore / required) * 100));
  }
}

export const reviewRecommender = new ReviewRecommender();

