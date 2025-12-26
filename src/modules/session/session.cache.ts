import { redis, isRedisAvailable } from '../../shared/cache/redis';
import type { ActiveSessionState } from './session.types';

const SESSION_PREFIX = 'active-session:';
const LEARNER_SESSION_PREFIX = 'learner-session:';
const SESSION_TTL = 3600 * 4;

export class SessionCache {
  async setActiveSession(sessionId: string, state: ActiveSessionState): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      const sessionKey = `${SESSION_PREFIX}${sessionId}`;
      const learnerKey = `${LEARNER_SESSION_PREFIX}${state.learnerId}:${state.languageCode}`;

      await Promise.all([
        redis.setex(sessionKey, SESSION_TTL, JSON.stringify(state)),
        redis.setex(learnerKey, SESSION_TTL, sessionId),
      ]);
    } catch {
      console.warn('Failed to set active session in cache');
    }
  }

  async getActiveSession(sessionId: string): Promise<ActiveSessionState | null> {
    if (!isRedisAvailable()) return null;

    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async getActiveSessionIdForLearner(learnerId: string, languageCode: string): Promise<string | null> {
    if (!isRedisAvailable()) return null;

    try {
      const key = `${LEARNER_SESSION_PREFIX}${learnerId}:${languageCode}`;
      return redis.get(key);
    } catch {
      return null;
    }
  }

  async updateSessionState(sessionId: string, updates: Partial<ActiveSessionState>): Promise<void> {
    const current = await this.getActiveSession(sessionId);
    if (!current) return;

    const updated: ActiveSessionState = {
      ...current,
      ...updates,
      lastEventAt: new Date().toISOString(),
    };

    await this.setActiveSession(sessionId, updated);
  }

  async incrementEventsCount(sessionId: string): Promise<void> {
    const current = await this.getActiveSession(sessionId);
    if (!current) return;

    await this.updateSessionState(sessionId, {
      eventsCount: current.eventsCount + 1,
    });
  }

  async incrementErrorsCount(sessionId: string): Promise<void> {
    const current = await this.getActiveSession(sessionId);
    if (!current) return;

    await this.updateSessionState(sessionId, {
      errorsInSession: current.errorsInSession + 1,
    });
  }

  async setCurrentActivityIndex(sessionId: string, index: number): Promise<void> {
    await this.updateSessionState(sessionId, {
      currentActivityIndex: index,
    });
  }

  async removeActiveSession(sessionId: string): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      const state = await this.getActiveSession(sessionId);
      if (!state) return;

      const sessionKey = `${SESSION_PREFIX}${sessionId}`;
      const learnerKey = `${LEARNER_SESSION_PREFIX}${state.learnerId}:${state.languageCode}`;

      await Promise.all([redis.del(sessionKey), redis.del(learnerKey)]);
    } catch {
      console.warn('Failed to remove active session from cache');
    }
  }

  async extendSessionTTL(sessionId: string): Promise<void> {
    const state = await this.getActiveSession(sessionId);
    if (!state) return;

    await this.setActiveSession(sessionId, state);
  }

  async getAllActiveSessions(): Promise<string[]> {
    if (!isRedisAvailable()) return [];

    try {
      const keys = await redis.keys(`${SESSION_PREFIX}*`);
      return keys.map((k) => k.replace(SESSION_PREFIX, ''));
    } catch {
      return [];
    }
  }

  async getSessionsIdleFor(seconds: number): Promise<string[]> {
    const sessionIds = await this.getAllActiveSessions();
    const now = new Date();
    const idleSessions: string[] = [];

    for (const sessionId of sessionIds) {
      const state = await this.getActiveSession(sessionId);
      if (!state) continue;

      const lastEventTime = new Date(state.lastEventAt);
      const idleSeconds = (now.getTime() - lastEventTime.getTime()) / 1000;

      if (idleSeconds >= seconds) {
        idleSessions.push(sessionId);
      }
    }

    return idleSessions;
  }

  createInitialState(
    sessionId: string,
    learnerId: string,
    languageCode: string,
    scenarioId: string | null
  ): ActiveSessionState {
    const now = new Date().toISOString();
    return {
      sessionId,
      learnerId,
      languageCode,
      scenarioId,
      startedAt: now,
      lastEventAt: now,
      eventsCount: 1,
      errorsInSession: 0,
      currentActivityIndex: 0,
    };
  }
}

export const sessionCache = new SessionCache();

