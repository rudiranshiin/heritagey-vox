import { prisma } from '../../shared/database/prisma';
import type { LearnerPreferences } from '../learner/learner.types';
import type { SessionMetrics, PreferenceUpdate } from './memory.types';

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

export class PreferenceTracker {
  private sessionHistory: Map<string, SessionMetrics[]> = new Map();

  recordSession(learnerId: string, languageCode: string, metrics: SessionMetrics): void {
    const key = `${learnerId}:${languageCode}`;
    const history = this.sessionHistory.get(key) || [];
    history.push(metrics);

    if (history.length > 50) {
      history.shift();
    }

    this.sessionHistory.set(key, history);
  }

  async inferPreferences(learnerId: string, languageCode: string): Promise<PreferenceUpdate[]> {
    const key = `${learnerId}:${languageCode}`;
    const history = this.sessionHistory.get(key) || [];

    if (history.length < 5) {
      return [];
    }

    const updates: PreferenceUpdate[] = [];

    const avgDuration = history.reduce((sum, s) => sum + s.duration, 0) / history.length;
    const durationPreference = this.inferDurationPreference(avgDuration);
    if (durationPreference) {
      updates.push({
        type: 'session_duration',
        value: durationPreference,
        confidence: Math.min(history.length / 20, 1),
        source: 'inferred',
      });
    }

    const topScenarioTypes = this.findMostEngagingTypes(history);
    topScenarioTypes.forEach((type) => {
      updates.push({
        type: 'scenario_type',
        value: type,
        confidence: 0.7,
        source: 'inferred',
      });
    });

    const avoidedTopics = this.findAvoidedTopics(history);
    avoidedTopics.forEach((topic) => {
      updates.push({
        type: 'topic_preference',
        value: topic,
        confidence: 0.6,
        source: 'inferred',
      });
    });

    return updates;
  }

  async applyInferredPreferences(
    learnerId: string,
    languageCode: string
  ): Promise<LearnerPreferences | null> {
    const updates = await this.inferPreferences(learnerId, languageCode);

    if (updates.length === 0) {
      return null;
    }

    const memory = await prisma.learnerMemory.findUnique({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
    });

    if (!memory) return null;

    const currentPrefs =
      (memory.preferences as unknown as LearnerPreferences) || DEFAULT_PREFERENCES;
    const updatedPrefs = { ...currentPrefs };

    for (const update of updates) {
      if (update.confidence < 0.5) continue;

      switch (update.type) {
        case 'session_duration':
          updatedPrefs.sessionDuration = update.value as 'short' | 'medium' | 'long';
          break;
        case 'scenario_type':
          if (!updatedPrefs.preferredScenarioTypes.includes(update.value)) {
            updatedPrefs.preferredScenarioTypes.push(update.value);
          }
          break;
        case 'topic_preference':
          if (!updatedPrefs.avoidTopics.includes(update.value)) {
            updatedPrefs.avoidTopics.push(update.value);
          }
          break;
      }
    }

    await prisma.learnerMemory.update({
      where: {
        learnerId_languageCode: { learnerId, languageCode },
      },
      data: {
        preferences: updatedPrefs,
      },
    });

    return updatedPrefs;
  }

  suggestSessionSettings(
    preferences: LearnerPreferences,
    recentPerformance: { errorRate: number; engagementScore: number }
  ): {
    suggestedDuration: number;
    suggestedDifficulty: string;
    suggestedFocus: string[];
  } {
    let suggestedDuration: number;
    switch (preferences.sessionDuration) {
      case 'short':
        suggestedDuration = 10;
        break;
      case 'long':
        suggestedDuration = 30;
        break;
      default:
        suggestedDuration = 20;
    }

    let suggestedDifficulty = preferences.challengeLevel;
    if (recentPerformance.errorRate > 0.4) {
      suggestedDifficulty = 'comfortable';
    } else if (recentPerformance.errorRate < 0.1 && recentPerformance.engagementScore > 0.8) {
      suggestedDifficulty = 'challenging';
    }

    const suggestedFocus = [...preferences.focusAreas];
    if (suggestedFocus.length === 0) {
      suggestedFocus.push('general');
    }

    return {
      suggestedDuration,
      suggestedDifficulty,
      suggestedFocus,
    };
  }

  private inferDurationPreference(avgMinutes: number): 'short' | 'medium' | 'long' | null {
    if (avgMinutes < 10) return 'short';
    if (avgMinutes > 25) return 'long';
    if (avgMinutes >= 15 && avgMinutes <= 25) return 'medium';
    return null;
  }

  private findMostEngagingTypes(history: SessionMetrics[]): string[] {
    const typeScores: Record<string, { total: number; count: number }> = {};

    for (const session of history) {
      if (!typeScores[session.scenarioType]) {
        typeScores[session.scenarioType] = { total: 0, count: 0 };
      }
      typeScores[session.scenarioType].total += session.engagementScore;
      typeScores[session.scenarioType].count += 1;
    }

    return Object.entries(typeScores)
      .map(([type, scores]) => ({
        type,
        avgScore: scores.total / scores.count,
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 3)
      .filter((t) => t.avgScore > 0.7)
      .map((t) => t.type);
  }

  private findAvoidedTopics(history: SessionMetrics[]): string[] {
    const topicStats: Record<string, { abandoned: number; total: number }> = {};

    for (const session of history) {
      if (!topicStats[session.topic]) {
        topicStats[session.topic] = { abandoned: 0, total: 0 };
      }
      topicStats[session.topic].total += 1;
      if (session.completionRate < 0.5) {
        topicStats[session.topic].abandoned += 1;
      }
    }

    return Object.entries(topicStats)
      .filter(([, stats]) => stats.total >= 3 && stats.abandoned / stats.total > 0.5)
      .map(([topic]) => topic);
  }
}

export const preferenceTracker = new PreferenceTracker();
