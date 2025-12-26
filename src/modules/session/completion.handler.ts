import { prisma } from '../../shared/database/prisma';
import { sessionService } from './session.service';
import { sessionCache } from './session.cache';
import { memoryService } from '../memory/memory.service';
import { errorPatternAnalyzer } from '../memory/error-pattern.analyzer';
import { realtimeErrorHandler } from './realtime-error.handler';
import type { Session, SessionCompletionResult, SessionMetrics } from './session.types';

export class CompletionHandler {
  async completeSession(sessionId: string): Promise<SessionCompletionResult | null> {
    const session = await sessionService.getById(sessionId);
    if (!session) return null;

    if (session.status === 'COMPLETED') {
      return {
        session,
        metrics: session.metrics || this.getDefaultMetrics(),
        memoryUpdated: false,
        progressUpdate: {
          scenarioCompleted: false,
          moduleProgress: 0,
          newStreak: 0,
        },
        feedback: ['Session already completed'],
      };
    }

    const completedSession = await sessionService.complete(sessionId);
    if (!completedSession) return null;

    const memoryUpdated = await this.updateLearnerMemory(completedSession);

    const progressUpdate = await this.calculateProgressUpdate(completedSession);

    const errorSummary = await realtimeErrorHandler.getSessionErrorSummary(sessionId);
    const memory = await memoryService.getMemory(session.learnerId, session.languageCode);
    const patterns = memory?.errorPatterns || [];
    const patternFeedback = errorPatternAnalyzer.generateFeedback(patterns);

    const feedback = [
      ...this.generateSessionFeedback(completedSession),
      ...errorSummary.suggestions,
      ...patternFeedback,
    ];

    await sessionCache.removeActiveSession(sessionId);

    return {
      session: completedSession,
      metrics: completedSession.metrics || this.getDefaultMetrics(),
      memoryUpdated,
      progressUpdate,
      feedback: [...new Set(feedback)].slice(0, 5),
    };
  }

  private async updateLearnerMemory(session: Session): Promise<boolean> {
    try {
      const scenarioCompleted = session.scenarioId && this.isScenarioCompleted(session);

      await memoryService.updateProgress(session.learnerId, session.languageCode, {
        scenarioId: scenarioCompleted ? session.scenarioId! : undefined,
        moduleId: session.scenarioId ? this.extractModuleId(session.scenarioId) : undefined,
        sessionDuration: session.metrics?.duration || 0,
        completed: scenarioCompleted || false,
        score: session.metrics?.overallScore,
      });

      await memoryService.resetRecentCounts(session.learnerId, session.languageCode);

      return true;
    } catch (error) {
      console.error('Failed to update learner memory:', error);
      return false;
    }
  }

  private async calculateProgressUpdate(session: Session): Promise<{
    scenarioCompleted: boolean;
    moduleProgress: number;
    newStreak: number;
  }> {
    const scenarioCompleted = session.scenarioId ? this.isScenarioCompleted(session) : false;

    let moduleProgress = 0;
    if (session.scenarioId) {
      const moduleId = this.extractModuleId(session.scenarioId);
      const memory = await memoryService.getMemory(session.learnerId, session.languageCode);
      const progressData = memory?.progressData;

      if (progressData?.moduleProgress?.[moduleId]) {
        const mp = progressData.moduleProgress[moduleId];
        moduleProgress = Math.round((mp.scenariosCompleted / mp.scenariosTotal) * 100);
      }
    }

    const memory = await memoryService.getMemory(session.learnerId, session.languageCode);
    const newStreak = memory?.progressData?.currentStreak || 0;

    return {
      scenarioCompleted,
      moduleProgress,
      newStreak,
    };
  }

  private generateSessionFeedback(session: Session): string[] {
    const feedback: string[] = [];
    const metrics = session.metrics;

    if (!metrics) {
      feedback.push('Session completed');
      return feedback;
    }

    if (metrics.overallScore >= 80) {
      feedback.push('Excellent session! Great work!');
    } else if (metrics.overallScore >= 60) {
      feedback.push('Good session. Keep practicing!');
    } else {
      feedback.push("Every practice session helps. You're improving!");
    }

    const durationMinutes = Math.round(metrics.duration / 60);
    if (durationMinutes >= 20) {
      feedback.push(`Great dedication - ${durationMinutes} minutes of practice!`);
    }

    if (metrics.accuracyScore >= 90) {
      feedback.push('Your accuracy was impressive!');
    }

    if (metrics.activitiesCompleted > 0) {
      feedback.push(`Completed ${metrics.activitiesCompleted} practice activities`);
    }

    if (metrics.errorsDetected === 0) {
      feedback.push('Perfect session - no errors detected!');
    } else if (metrics.correctionsAccepted > metrics.errorsDetected * 0.8) {
      feedback.push('Great job accepting and learning from corrections!');
    }

    return feedback;
  }

  private isScenarioCompleted(session: Session): boolean {
    const activitiesStarted = session.events.filter(
      (e) => e.type === 'practice_activity_started'
    ).length;
    const activitiesCompleted = session.events.filter(
      (e) => e.type === 'practice_activity_completed'
    ).length;

    if (activitiesStarted === 0) {
      const userMessages = session.events.filter((e) => e.type === 'user_message').length;
      return userMessages >= 5;
    }

    return activitiesCompleted >= activitiesStarted;
  }

  private extractModuleId(scenarioId: string): string {
    const parts = scenarioId.split('-');
    if (parts.length >= 2) {
      return parts.slice(0, -1).join('-');
    }
    return scenarioId;
  }

  private getDefaultMetrics(): SessionMetrics {
    return {
      duration: 0,
      messageCount: 0,
      userMessageCount: 0,
      agentMessageCount: 0,
      errorsDetected: 0,
      correctionsMade: 0,
      correctionsAccepted: 0,
      hintsRequested: 0,
      activitiesCompleted: 0,
      engagementScore: 0,
      fluencyScore: 0,
      accuracyScore: 0,
      overallScore: 0,
    };
  }

  async getCompletionPreview(sessionId: string): Promise<{
    canComplete: boolean;
    estimatedScore: number;
    activitiesCompleted: number;
    activitiesRemaining: number;
    recommendation: string;
  } | null> {
    const session = await sessionService.getById(sessionId);
    if (!session) return null;

    const metrics = sessionService.calculateMetrics(session);
    const activitiesCompleted = session.events.filter(
      (e) => e.type === 'practice_activity_completed'
    ).length;
    const activitiesStarted = session.events.filter(
      (e) => e.type === 'practice_activity_started'
    ).length;

    const activitiesRemaining = activitiesStarted - activitiesCompleted;

    let recommendation = 'Ready to complete!';
    if (activitiesRemaining > 0) {
      recommendation = `Complete ${activitiesRemaining} remaining activities for best results`;
    } else if (metrics.userMessageCount < 3) {
      recommendation = 'Practice more conversations before completing';
    }

    return {
      canComplete: session.status === 'ACTIVE' || session.status === 'PAUSED',
      estimatedScore: metrics.overallScore,
      activitiesCompleted,
      activitiesRemaining,
      recommendation,
    };
  }
}

export const completionHandler = new CompletionHandler();

