import { prisma } from '../../shared/database/prisma';
import type {
  LearnerMemory,
  ProgressData,
  ErrorPattern,
  LearnerPreferences,
  LearnerProfile,
} from '../learner/learner.types';
import type { ProgressUpdate, ErrorCategory } from './memory.types';

const DEFAULT_PROGRESS_DATA: ProgressData = {
  completedModules: [],
  completedScenarios: [],
  currentStreak: 0,
  longestStreak: 0,
  totalSessions: 0,
  totalPracticeMinutes: 0,
  moduleProgress: {},
};

export class MemoryService {
  async getMemory(learnerId: string, languageCode: string): Promise<LearnerMemory | null> {
    const memory = await prisma.learnerMemory.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!memory) return null;

    return this.parseMemory(memory);
  }

  async updateProgress(
    learnerId: string,
    languageCode: string,
    update: ProgressUpdate
  ): Promise<LearnerMemory | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    if (!memory) return null;

    const progressData = memory.progressData;
    const now = new Date().toISOString();

    progressData.totalSessions += 1;
    progressData.totalPracticeMinutes += Math.round(update.sessionDuration / 60);
    progressData.lastSessionAt = now;

    if (update.completed && update.scenarioId) {
      if (!progressData.completedScenarios.includes(update.scenarioId)) {
        progressData.completedScenarios.push(update.scenarioId);
      }

      if (update.moduleId) {
        if (!progressData.moduleProgress[update.moduleId]) {
          progressData.moduleProgress[update.moduleId] = {
            moduleId: update.moduleId,
            scenariosCompleted: 0,
            scenariosTotal: 5,
            averageScore: 0,
            lastPracticedAt: now,
          };
        }

        const moduleProgress = progressData.moduleProgress[update.moduleId];
        moduleProgress.scenariosCompleted += 1;
        moduleProgress.lastPracticedAt = now;

        if (update.score !== undefined) {
          const currentTotal = moduleProgress.averageScore * (moduleProgress.scenariosCompleted - 1);
          moduleProgress.averageScore = (currentTotal + update.score) / moduleProgress.scenariosCompleted;
        }

        if (moduleProgress.scenariosCompleted >= moduleProgress.scenariosTotal) {
          if (!progressData.completedModules.includes(update.moduleId)) {
            progressData.completedModules.push(update.moduleId);
          }
        }
      }
    }

    progressData.currentStreak = this.calculateStreak(progressData.lastSessionAt, progressData.currentStreak);
    progressData.longestStreak = Math.max(progressData.longestStreak, progressData.currentStreak);

    const updated = await prisma.learnerMemory.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        progressData: JSON.parse(JSON.stringify(progressData)),
      },
    });

    return this.parseMemory(updated);
  }

  async addErrorPattern(
    learnerId: string,
    languageCode: string,
    category: ErrorCategory,
    subcategory?: string,
    context?: string
  ): Promise<LearnerMemory | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    if (!memory) return null;

    const errorPatterns = memory.errorPatterns;
    const now = new Date().toISOString();

    const existingIndex = errorPatterns.findIndex(
      (p) => p.category === category && p.subcategory === subcategory
    );

    if (existingIndex >= 0) {
      const pattern = errorPatterns[existingIndex];
      pattern.frequency += 1;
      pattern.recentCount += 1;
      pattern.lastOccurrence = now;

      if (context) {
        pattern.examples.push({
          context,
          error: category,
          timestamp: now,
        });
        if (pattern.examples.length > 10) {
          pattern.examples = pattern.examples.slice(-10);
        }
      }
    } else {
      const newPattern: ErrorPattern = {
        category,
        subcategory,
        frequency: 1,
        recentCount: 1,
        trend: 'stable',
        examples: context
          ? [{ context, error: category, timestamp: now }]
          : [],
        firstOccurrence: now,
        lastOccurrence: now,
      };
      errorPatterns.push(newPattern);
    }

    const updated = await prisma.learnerMemory.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        errorPatterns: JSON.parse(JSON.stringify(errorPatterns)),
      },
    });

    return this.parseMemory(updated);
  }

  async resetRecentCounts(learnerId: string, languageCode: string): Promise<void> {
    const memory = await this.getMemory(learnerId, languageCode);
    if (!memory) return;

    const errorPatterns = memory.errorPatterns.map((pattern) => ({
      ...pattern,
      recentCount: 0,
    }));

    await prisma.learnerMemory.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        errorPatterns: JSON.parse(JSON.stringify(errorPatterns)),
      },
    });
  }

  async getErrorPatterns(
    learnerId: string,
    languageCode: string
  ): Promise<ErrorPattern[]> {
    const memory = await this.getMemory(learnerId, languageCode);
    if (!memory) return [];

    return memory.errorPatterns.sort((a, b) => b.frequency - a.frequency);
  }

  async getTopErrorPatterns(
    learnerId: string,
    languageCode: string,
    limit: number = 5
  ): Promise<ErrorPattern[]> {
    const patterns = await this.getErrorPatterns(learnerId, languageCode);
    return patterns.slice(0, limit);
  }

  async getProgress(learnerId: string, languageCode: string): Promise<ProgressData | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    return memory?.progressData || null;
  }

  async getPreferences(learnerId: string, languageCode: string): Promise<LearnerPreferences | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    return memory?.preferences || null;
  }

  async getProfile(learnerId: string, languageCode: string): Promise<LearnerProfile | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    return memory?.profile || null;
  }

  private parseMemory(memory: {
    id: string;
    learnerId: string;
    languageCode: string;
    progressData: unknown;
    errorPatterns: unknown;
    preferences: unknown;
    profile: unknown;
    updatedAt: Date;
  }): LearnerMemory {
    return {
      id: memory.id,
      learnerId: memory.learnerId,
      languageCode: memory.languageCode,
      progressData: (memory.progressData as ProgressData) || DEFAULT_PROGRESS_DATA,
      errorPatterns: (memory.errorPatterns as ErrorPattern[]) || [],
      preferences: memory.preferences as LearnerPreferences,
      profile: memory.profile as LearnerProfile,
      updatedAt: memory.updatedAt,
    };
  }

  private calculateStreak(lastSessionAt: string | undefined, currentStreak: number): number {
    if (!lastSessionAt) return 1;

    const lastSession = new Date(lastSessionAt);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return currentStreak;
    if (diffDays === 1) return currentStreak + 1;
    return 1;
  }
}

export const memoryService = new MemoryService();

