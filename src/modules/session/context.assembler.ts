import { prisma } from '../../shared/database/prisma';
import { sessionService } from './session.service';
import { learnerService } from '../learner/learner.service';
import { memoryService } from '../memory/memory.service';
import { errorPatternAnalyzer } from '../memory/error-pattern.analyzer';
import { l1Predictor } from '../memory/l1-predictor';
import type {
  SessionContext,
  ScenarioContext,
  SessionRecommendation,
  PracticeActivityContext,
  CulturalInsightContext,
  GrammarNoteContext,
  CommonMistakeContext,
} from './session.types';
import type { ProgressData, ErrorPattern, LearnerPreferences, LearnerProfile } from '../learner/learner.types';

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

export class ContextAssembler {
  async assembleContext(sessionId: string): Promise<SessionContext | null> {
    const session = await sessionService.getById(sessionId);
    if (!session) return null;

    const learnerLanguage = await prisma.learnerLanguage.findUnique({
      where: {
        learnerId_languageCode: {
          learnerId: session.learnerId,
          languageCode: session.languageCode,
        },
      },
    });

    if (!learnerLanguage) return null;

    const memory = await memoryService.getMemory(session.learnerId, session.languageCode);
    const progressData = memory?.progressData || DEFAULT_PROGRESS_DATA;
    const errorPatterns = memory?.errorPatterns || [];
    const preferences = memory?.preferences || DEFAULT_PREFERENCES;
    const profile = memory?.profile || DEFAULT_PROFILE;

    let scenario: ScenarioContext | null = null;
    if (session.scenarioId) {
      scenario = await this.getScenarioContext(session.scenarioId);
    }

    const recommendations = await this.generateRecommendations(
      session.learnerId,
      session.languageCode,
      progressData,
      errorPatterns,
      preferences
    );

    const preSessionTips = l1Predictor.getPreSessionTips(
      profile.nativeLanguage || 'default',
      scenario?.practiceActivities?.[0]?.type || 'general',
      errorPatterns
    );

    const now = new Date();
    const duration = Math.floor((now.getTime() - session.startedAt.getTime()) / 1000);

    return {
      session: {
        id: session.id,
        status: session.status,
        startedAt: session.startedAt,
        duration,
        eventsCount: session.events.length,
      },
      learner: {
        id: session.learnerId,
        languageCode: session.languageCode,
        currentLevel: learnerLanguage.currentLevel,
        currentModuleId: learnerLanguage.currentModuleId,
      },
      memory: {
        progressData,
        errorPatterns,
        preferences,
        profile,
      },
      scenario,
      recommendations,
      preSessionTips,
    };
  }

  private async getScenarioContext(scenarioId: string): Promise<ScenarioContext | null> {
    const scenario = await prisma.scenario.findUnique({
      where: { id: scenarioId },
    });

    if (!scenario) return null;

    return {
      id: scenario.id,
      moduleId: scenario.moduleId,
      title: scenario.title,
      context: scenario.context,
      objectives: (scenario.objectives as string[]) || [],
      practiceActivities: (scenario.practiceActivities as unknown as PracticeActivityContext[]) || [],
      culturalInsights: (scenario.culturalInsights as unknown as CulturalInsightContext[]) || [],
      grammarNotes: (scenario.grammarNotes as unknown as GrammarNoteContext[]) || [],
      commonMistakes: (scenario.commonMistakes as unknown as CommonMistakeContext[]) || [],
      successCriteria: (scenario.successCriteria as string[]) || [],
    };
  }

  private async generateRecommendations(
    learnerId: string,
    languageCode: string,
    progressData: ProgressData,
    errorPatterns: ErrorPattern[],
    preferences: LearnerPreferences
  ): Promise<SessionRecommendation[]> {
    const recommendations: SessionRecommendation[] = [];

    const focusAreas = errorPatternAnalyzer.suggestFocusAreas(errorPatterns);
    if (focusAreas.primary) {
      recommendations.push({
        type: 'focus_area',
        value: focusAreas.primary.category,
        reason: `Recent challenges with ${focusAreas.primary.category}${focusAreas.primary.subcategory ? ` (${focusAreas.primary.subcategory})` : ''}`,
        priority: 'high',
      });
    }

    const stats = errorPatternAnalyzer.calculateStats(errorPatterns);
    if (stats.recentErrorRate > 10) {
      recommendations.push({
        type: 'difficulty',
        value: 'comfortable',
        reason: 'High recent error rate - consider easier content',
        priority: 'medium',
      });
    } else if (stats.recentErrorRate < 2 && progressData.totalSessions > 5) {
      recommendations.push({
        type: 'difficulty',
        value: 'challenging',
        reason: 'Great accuracy - ready for more challenge',
        priority: 'medium',
      });
    }

    const nextScenario = await this.suggestNextScenario(
      learnerId,
      languageCode,
      progressData,
      preferences
    );
    if (nextScenario) {
      recommendations.push(nextScenario);
    }

    if (focusAreas.improving.length > 0) {
      recommendations.push({
        type: 'focus_area',
        value: focusAreas.improving[0].category,
        reason: `Great progress on ${focusAreas.improving[0].category}!`,
        priority: 'low',
      });
    }

    return recommendations;
  }

  private async suggestNextScenario(
    learnerId: string,
    languageCode: string,
    progressData: ProgressData,
    preferences: LearnerPreferences
  ): Promise<SessionRecommendation | null> {
    const learnerLanguage = await prisma.learnerLanguage.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!learnerLanguage) return null;

    const currentModuleId = learnerLanguage.currentModuleId;

    if (currentModuleId) {
      const scenarios = await prisma.scenario.findMany({
        where: { moduleId: currentModuleId },
        orderBy: { order: 'asc' },
      });

      const completedScenarioIds = new Set(progressData.completedScenarios);
      const nextScenario = scenarios.find((s) => !completedScenarioIds.has(s.id));

      if (nextScenario) {
        return {
          type: 'scenario',
          value: nextScenario.id,
          reason: `Continue with "${nextScenario.title}" in current module`,
          priority: 'high',
        };
      }
    }

    const allModules = await prisma.module.findMany({
      where: { languageCode },
      orderBy: { order: 'asc' },
    });

    const completedModuleIds = new Set(progressData.completedModules);
    const nextModule = allModules.find((m) => !completedModuleIds.has(m.id));

    if (nextModule) {
      const firstScenario = await prisma.scenario.findFirst({
        where: { moduleId: nextModule.id },
        orderBy: { order: 'asc' },
      });

      if (firstScenario) {
        return {
          type: 'scenario',
          value: firstScenario.id,
          reason: `Start new module: "${nextModule.title}"`,
          priority: 'high',
        };
      }
    }

    return null;
  }

  async getQuickContext(sessionId: string): Promise<{
    scenarioTitle: string | null;
    currentLevel: string;
    topChallenges: string[];
    sessionDuration: number;
  } | null> {
    const session = await sessionService.getById(sessionId);
    if (!session) return null;

    const learnerLanguage = await prisma.learnerLanguage.findUnique({
      where: {
        learnerId_languageCode: {
          learnerId: session.learnerId,
          languageCode: session.languageCode,
        },
      },
    });

    if (!learnerLanguage) return null;

    let scenarioTitle: string | null = null;
    if (session.scenarioId) {
      const scenario = await prisma.scenario.findUnique({
        where: { id: session.scenarioId },
        select: { title: true },
      });
      scenarioTitle = scenario?.title || null;
    }

    const memory = await memoryService.getMemory(session.learnerId, session.languageCode);
    const errorPatterns = memory?.errorPatterns || [];
    const topPatterns = errorPatterns
      .sort((a, b) => b.recentCount - a.recentCount)
      .slice(0, 3)
      .map((p) => `${p.category}${p.subcategory ? `: ${p.subcategory}` : ''}`);

    const now = new Date();
    const duration = Math.floor((now.getTime() - session.startedAt.getTime()) / 1000);

    return {
      scenarioTitle,
      currentLevel: learnerLanguage.currentLevel,
      topChallenges: topPatterns,
      sessionDuration: duration,
    };
  }
}

export const contextAssembler = new ContextAssembler();

