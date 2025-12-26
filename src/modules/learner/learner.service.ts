import { prisma } from '../../shared/database/prisma';
import type {
  Learner,
  LearnerLanguage,
  LearnerMemory,
  LearnerWithProgress,
  LearnerSummary,
  CreateLearnerDTO,
  UpdateLearnerDTO,
  AddLanguageDTO,
  UpdateLanguageDTO,
  UpdatePreferencesDTO,
  ProgressData,
  LearnerPreferences,
  LearnerProfile,
  Level,
  ErrorPattern,
} from './learner.types';

const DEFAULT_PROGRESS_DATA: ProgressData = {
  completedModules: [],
  completedScenarios: [],
  currentStreak: 0,
  longestStreak: 0,
  totalSessions: 0,
  totalPracticeMinutes: 0,
  moduleProgress: {},
};

const DEFAULT_PREFERENCES: LearnerPreferences = {
  sessionDuration: 'medium',
  practiceStyle: 'mixed',
  feedbackLevel: 'moderate',
  voiceSpeed: 'normal',
  focusAreas: [],
  avoidTopics: [],
  preferredScenarioTypes: [],
  challengeLevel: 'balanced',
};

const DEFAULT_PROFILE: LearnerProfile = {
  nativeLanguage: '',
  otherLanguages: [],
  learningGoals: [],
  interests: [],
};

function parseMemory(dbMemory: {
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
    id: dbMemory.id,
    learnerId: dbMemory.learnerId,
    languageCode: dbMemory.languageCode,
    progressData: (dbMemory.progressData as ProgressData) || DEFAULT_PROGRESS_DATA,
    errorPatterns: (dbMemory.errorPatterns as ErrorPattern[]) || [],
    preferences: (dbMemory.preferences as LearnerPreferences) || DEFAULT_PREFERENCES,
    profile: (dbMemory.profile as LearnerProfile) || DEFAULT_PROFILE,
    updatedAt: dbMemory.updatedAt,
  };
}

export class LearnerService {
  async create(data: CreateLearnerDTO): Promise<Learner> {
    const learner = await prisma.learner.create({
      data: {
        externalId: data.externalId,
      },
    });

    if (data.languageCode) {
      await this.addLanguage(learner.id, {
        languageCode: data.languageCode,
      });
    }

    return (await this.getById(learner.id)) as Learner;
  }

  async getById(id: string): Promise<Learner | null> {
    const learner = await prisma.learner.findUnique({
      where: { id },
      include: {
        languages: {
          orderBy: { createdAt: 'asc' },
        },
        memories: true,
      },
    });

    if (!learner) return null;

    return {
      ...learner,
      memories: learner.memories.map(parseMemory),
    };
  }

  async getByExternalId(externalId: string): Promise<Learner | null> {
    const learner = await prisma.learner.findUnique({
      where: { externalId },
      include: {
        languages: {
          orderBy: { createdAt: 'asc' },
        },
        memories: true,
      },
    });

    if (!learner) return null;

    return {
      ...learner,
      memories: learner.memories.map(parseMemory),
    };
  }

  async getWithProgress(id: string): Promise<LearnerWithProgress | null> {
    const learner = await prisma.learner.findUnique({
      where: { id },
      include: {
        languages: {
          orderBy: { createdAt: 'asc' },
        },
        memories: true,
      },
    });

    if (!learner) return null;

    const parsedMemories = learner.memories.map(parseMemory);

    const languagesWithMemory = learner.languages.map((lang) => ({
      ...lang,
      memory: parsedMemories.find((m) => m.languageCode === lang.languageCode),
    }));

    return {
      ...learner,
      memories: parsedMemories,
      languages: languagesWithMemory,
    };
  }

  async getSummary(id: string): Promise<LearnerSummary | null> {
    const learner = await this.getWithProgress(id);
    if (!learner) return null;

    return {
      id: learner.id,
      externalId: learner.externalId,
      languages: learner.languages.map((lang) => {
        const memory = lang.memory;
        const progressData = memory?.progressData || DEFAULT_PROGRESS_DATA;
        return {
          code: lang.languageCode,
          level: lang.currentLevel as Level,
          isActive: lang.isActive,
          progress: {
            completedModules: progressData.completedModules?.length || 0,
            totalSessions: progressData.totalSessions || 0,
            currentStreak: progressData.currentStreak || 0,
          },
        };
      }),
      createdAt: learner.createdAt,
    };
  }

  async update(id: string, data: UpdateLearnerDTO): Promise<Learner | null> {
    const learner = await this.getById(id);
    if (!learner) return null;

    if (data.profile && learner.memories && learner.memories.length > 0) {
      for (const memory of learner.memories) {
        const currentProfile = memory.profile || DEFAULT_PROFILE;
        await prisma.learnerMemory.update({
          where: { id: memory.id },
          data: {
            profile: { ...currentProfile, ...data.profile } as object,
          },
        });
      }
    }

    return this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.learner.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async addLanguage(learnerId: string, data: AddLanguageDTO): Promise<LearnerLanguage> {
    const language = await prisma.language.findUnique({
      where: { code: data.languageCode },
    });

    if (!language) {
      throw new Error(`Language ${data.languageCode} not found`);
    }

    const learnerLanguage = await prisma.learnerLanguage.create({
      data: {
        learnerId,
        languageCode: data.languageCode,
        currentLevel: data.currentLevel || 'A2',
      },
    });

    await prisma.learnerMemory.create({
      data: {
        learnerId,
        languageCode: data.languageCode,
        progressData: DEFAULT_PROGRESS_DATA as object,
        errorPatterns: [],
        preferences: DEFAULT_PREFERENCES as object,
        profile: DEFAULT_PROFILE as object,
      },
    });

    return learnerLanguage as LearnerLanguage;
  }

  async updateLanguage(
    learnerId: string,
    languageCode: string,
    data: UpdateLanguageDTO
  ): Promise<LearnerLanguage | null> {
    try {
      const updated = await prisma.learnerLanguage.update({
        where: {
          learnerId_languageCode: { learnerId, languageCode },
        },
        data,
      });
      return updated as LearnerLanguage;
    } catch {
      return null;
    }
  }

  async removeLanguage(learnerId: string, languageCode: string): Promise<boolean> {
    try {
      await prisma.$transaction([
        prisma.learnerMemory.deleteMany({
          where: { learnerId, languageCode },
        }),
        prisma.learnerLanguage.delete({
          where: {
            learnerId_languageCode: { learnerId, languageCode },
          },
        }),
      ]);
      return true;
    } catch {
      return false;
    }
  }

  async getMemory(learnerId: string, languageCode: string): Promise<LearnerMemory | null> {
    const memory = await prisma.learnerMemory.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!memory) return null;

    return parseMemory(memory);
  }

  async updatePreferences(
    learnerId: string,
    languageCode: string,
    preferences: UpdatePreferencesDTO
  ): Promise<LearnerMemory | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    if (!memory) return null;

    const currentPrefs = memory.preferences || DEFAULT_PREFERENCES;
    const updatedMemory = await prisma.learnerMemory.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        preferences: { ...currentPrefs, ...preferences } as object,
      },
    });

    return parseMemory(updatedMemory);
  }

  async updateProfile(
    learnerId: string,
    languageCode: string,
    profile: Partial<LearnerProfile>
  ): Promise<LearnerMemory | null> {
    const memory = await this.getMemory(learnerId, languageCode);
    if (!memory) return null;

    const currentProfile = memory.profile || DEFAULT_PROFILE;
    const updatedMemory = await prisma.learnerMemory.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        profile: { ...currentProfile, ...profile } as object,
      },
    });

    return parseMemory(updatedMemory);
  }

  async list(options?: {
    languageCode?: string;
    level?: Level;
    limit?: number;
    offset?: number;
  }): Promise<{ learners: LearnerSummary[]; total: number }> {
    const where: Record<string, unknown> = {};

    if (options?.languageCode || options?.level) {
      where.languages = {
        some: {
          ...(options?.languageCode && { languageCode: options.languageCode }),
          ...(options?.level && { currentLevel: options.level }),
        },
      };
    }

    const [learners, total] = await Promise.all([
      prisma.learner.findMany({
        where,
        include: {
          languages: true,
          memories: true,
        },
        take: options?.limit || 50,
        skip: options?.offset || 0,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.learner.count({ where }),
    ]);

    const summaries: LearnerSummary[] = learners.map((learner) => ({
      id: learner.id,
      externalId: learner.externalId,
      languages: learner.languages.map((lang) => {
        const memory = learner.memories.find((m) => m.languageCode === lang.languageCode);
        const progressData = (memory?.progressData as unknown as ProgressData) || DEFAULT_PROGRESS_DATA;
        return {
          code: lang.languageCode,
          level: lang.currentLevel as Level,
          isActive: lang.isActive,
          progress: {
            completedModules: progressData.completedModules?.length || 0,
            totalSessions: progressData.totalSessions || 0,
            currentStreak: progressData.currentStreak || 0,
          },
        };
      }),
      createdAt: learner.createdAt,
    }));

    return { learners: summaries, total };
  }
}

export const learnerService = new LearnerService();
