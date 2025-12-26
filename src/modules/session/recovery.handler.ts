import { prisma } from '../../shared/database/prisma';
import { sessionService } from './session.service';
import { sessionCache } from './session.cache';
import type { Session, ActiveSessionState } from './session.types';

export interface RecoveryResult {
  recovered: boolean;
  session: Session | null;
  action: 'resumed' | 'restored_from_cache' | 'marked_abandoned' | 'no_action_needed';
  message: string;
}

export class RecoveryHandler {
  private readonly IDLE_THRESHOLD_SECONDS = 1800;
  private readonly MAX_SESSION_DURATION_HOURS = 4;

  async recoverSession(sessionId: string): Promise<RecoveryResult> {
    const dbSession = await sessionService.getById(sessionId);

    if (!dbSession) {
      return {
        recovered: false,
        session: null,
        action: 'no_action_needed',
        message: 'Session not found',
      };
    }

    if (dbSession.status === 'COMPLETED' || dbSession.status === 'ABANDONED') {
      return {
        recovered: false,
        session: dbSession,
        action: 'no_action_needed',
        message: 'Session already ended',
      };
    }

    const cachedState = await sessionCache.getActiveSession(sessionId);
    if (cachedState) {
      const lastEventTime = new Date(cachedState.lastEventAt);
      const now = new Date();
      const idleSeconds = (now.getTime() - lastEventTime.getTime()) / 1000;

      if (idleSeconds < this.IDLE_THRESHOLD_SECONDS) {
        return {
          recovered: true,
          session: dbSession,
          action: 'resumed',
          message: 'Session still active',
        };
      }
    }

    const sessionDurationHours = (Date.now() - dbSession.startedAt.getTime()) / (1000 * 60 * 60);
    if (sessionDurationHours > this.MAX_SESSION_DURATION_HOURS) {
      await sessionService.abandon(sessionId);
      await sessionCache.removeActiveSession(sessionId);
      const abandonedSession = await sessionService.getById(sessionId);
      return {
        recovered: false,
        session: abandonedSession,
        action: 'marked_abandoned',
        message: 'Session exceeded maximum duration and was abandoned',
      };
    }

    if (!cachedState && dbSession.status === 'ACTIVE') {
      const restoredState: ActiveSessionState = {
        sessionId: dbSession.id,
        learnerId: dbSession.learnerId,
        languageCode: dbSession.languageCode,
        scenarioId: dbSession.scenarioId,
        startedAt: dbSession.startedAt.toISOString(),
        lastEventAt: new Date().toISOString(),
        eventsCount: dbSession.events.length,
        errorsInSession: dbSession.events.filter((e) => e.type === 'error_detected').length,
        currentActivityIndex: this.calculateCurrentActivityIndex(dbSession),
      };

      await sessionCache.setActiveSession(sessionId, restoredState);

      return {
        recovered: true,
        session: dbSession,
        action: 'restored_from_cache',
        message: 'Session state restored from database',
      };
    }

    if (dbSession.status === 'PAUSED') {
      const resumed = await sessionService.resume(sessionId);
      return {
        recovered: true,
        session: resumed,
        action: 'resumed',
        message: 'Paused session resumed',
      };
    }

    return {
      recovered: false,
      session: dbSession,
      action: 'no_action_needed',
      message: 'No recovery action needed',
    };
  }

  async cleanupStaleSessions(): Promise<{ cleaned: number; sessionIds: string[] }> {
    const staleSessionIds = await sessionCache.getSessionsIdleFor(this.IDLE_THRESHOLD_SECONDS);
    const cleaned: string[] = [];

    for (const sessionId of staleSessionIds) {
      try {
        await sessionService.abandon(sessionId);
        await sessionCache.removeActiveSession(sessionId);
        cleaned.push(sessionId);
      } catch (error) {
        console.error(`Failed to cleanup session ${sessionId}:`, error);
      }
    }

    return {
      cleaned: cleaned.length,
      sessionIds: cleaned,
    };
  }

  async findOrphanedSessions(): Promise<Session[]> {
    const activeSessions = await prisma.session.findMany({
      where: {
        status: 'ACTIVE',
        startedAt: {
          lt: new Date(Date.now() - this.MAX_SESSION_DURATION_HOURS * 60 * 60 * 1000),
        },
      },
    });

    return activeSessions.map((s) => ({
      id: s.id,
      learnerId: s.learnerId,
      languageCode: s.languageCode,
      scenarioId: s.scenarioId,
      status: s.status as Session['status'],
      startedAt: s.startedAt,
      completedAt: s.completedAt,
      events: (s.events as unknown as Session['events']) || [],
      metrics: s.metrics as unknown as Session['metrics'],
      metadata: s.metadata as unknown as Session['metadata'],
    }));
  }

  async recoverAllOrphanedSessions(): Promise<{ processed: number; results: RecoveryResult[] }> {
    const orphaned = await this.findOrphanedSessions();
    const results: RecoveryResult[] = [];

    for (const session of orphaned) {
      const result = await this.recoverSession(session.id);
      results.push(result);
    }

    return {
      processed: orphaned.length,
      results,
    };
  }

  async getSessionHealth(sessionId: string): Promise<{
    isHealthy: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    const session = await sessionService.getById(sessionId);
    if (!session) {
      return {
        isHealthy: false,
        issues: ['Session not found'],
        recommendations: [],
      };
    }

    const cachedState = await sessionCache.getActiveSession(sessionId);

    if (session.status === 'ACTIVE' && !cachedState) {
      issues.push('Active session missing from cache');
      recommendations.push('Cache will be restored on next interaction');
    }

    if (cachedState) {
      const lastEventTime = new Date(cachedState.lastEventAt);
      const idleMinutes = (Date.now() - lastEventTime.getTime()) / (1000 * 60);

      if (idleMinutes > 10) {
        issues.push(`Session idle for ${Math.round(idleMinutes)} minutes`);
        recommendations.push('Consider resuming or completing the session');
      }

      if (cachedState.eventsCount !== session.events.length) {
        issues.push('Event count mismatch between cache and database');
      }
    }

    const durationHours = (Date.now() - session.startedAt.getTime()) / (1000 * 60 * 60);
    if (durationHours > 2) {
      issues.push(`Session running for ${durationHours.toFixed(1)} hours`);
      recommendations.push('Long sessions may affect performance');
    }

    return {
      isHealthy: issues.length === 0,
      issues,
      recommendations,
    };
  }

  private calculateCurrentActivityIndex(session: Session): number {
    const completedActivities = session.events.filter(
      (e) => e.type === 'practice_activity_completed'
    ).length;
    return completedActivities;
  }
}

export const recoveryHandler = new RecoveryHandler();

