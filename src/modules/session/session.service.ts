import { prisma } from '../../shared/database/prisma';
import { v4 as uuidv4 } from 'uuid';
import type {
  Session,
  SessionEvent,
  SessionMetrics,
  SessionMetadata,
  CreateSessionDTO,
  UpdateSessionDTO,
  SessionFilter,
  AddEventDTO,
  SessionStatus,
} from './session.types';

const DEFAULT_METRICS: SessionMetrics = {
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

function parseSession(dbSession: {
  id: string;
  learnerId: string;
  languageCode: string;
  scenarioId: string | null;
  status: string;
  startedAt: Date;
  completedAt: Date | null;
  events: unknown;
  metrics: unknown;
  metadata: unknown;
}): Session {
  return {
    id: dbSession.id,
    learnerId: dbSession.learnerId,
    languageCode: dbSession.languageCode,
    scenarioId: dbSession.scenarioId,
    status: dbSession.status as SessionStatus,
    startedAt: dbSession.startedAt,
    completedAt: dbSession.completedAt,
    events: (dbSession.events as SessionEvent[]) || [],
    metrics: (dbSession.metrics as SessionMetrics) || null,
    metadata: (dbSession.metadata as SessionMetadata) || null,
  };
}

export class SessionService {
  async create(data: CreateSessionDTO): Promise<Session> {
    const learner = await prisma.learner.findUnique({
      where: { id: data.learnerId },
    });

    if (!learner) {
      throw new Error('Learner not found');
    }

    const language = await prisma.language.findUnique({
      where: { code: data.languageCode },
    });

    if (!language) {
      throw new Error('Language not found');
    }

    if (data.scenarioId) {
      const scenario = await prisma.scenario.findUnique({
        where: { id: data.scenarioId },
      });
      if (!scenario) {
        throw new Error('Scenario not found');
      }
    }

    const startEvent: SessionEvent = {
      id: uuidv4(),
      type: 'session_start',
      timestamp: new Date().toISOString(),
      data: {
        languageCode: data.languageCode,
        scenarioId: data.scenarioId,
      },
    };

    const session = await prisma.session.create({
      data: {
        learnerId: data.learnerId,
        languageCode: data.languageCode,
        scenarioId: data.scenarioId,
        status: 'ACTIVE',
        events: JSON.parse(JSON.stringify([startEvent])),
        metadata: data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : null,
      },
    });

    return parseSession(session);
  }

  async getById(id: string): Promise<Session | null> {
    const session = await prisma.session.findUnique({
      where: { id },
    });

    if (!session) return null;
    return parseSession(session);
  }

  async getActiveSession(learnerId: string, languageCode?: string): Promise<Session | null> {
    const where: Record<string, unknown> = {
      learnerId,
      status: 'ACTIVE',
    };
    if (languageCode) {
      where.languageCode = languageCode;
    }

    const session = await prisma.session.findFirst({
      where,
      orderBy: { startedAt: 'desc' },
    });

    if (!session) return null;
    return parseSession(session);
  }

  async update(id: string, data: UpdateSessionDTO): Promise<Session | null> {
    const session = await this.getById(id);
    if (!session) return null;

    const updateData: Record<string, unknown> = {};

    if (data.status) {
      updateData.status = data.status;
      if (data.status === 'COMPLETED') {
        updateData.completedAt = new Date();
      }
    }

    if (data.scenarioId !== undefined) {
      updateData.scenarioId = data.scenarioId;
    }

    if (data.metadata) {
      const currentMetadata = session.metadata || {};
      updateData.metadata = JSON.parse(JSON.stringify({ ...currentMetadata, ...data.metadata }));
    }

    const updated = await prisma.session.update({
      where: { id },
      data: updateData,
    });

    return parseSession(updated);
  }

  async addEvent(sessionId: string, eventData: AddEventDTO): Promise<Session | null> {
    const session = await this.getById(sessionId);
    if (!session) return null;

    if (session.status !== 'ACTIVE' && session.status !== 'PAUSED') {
      throw new Error('Cannot add events to a completed or abandoned session');
    }

    const newEvent: SessionEvent = {
      id: uuidv4(),
      type: eventData.type,
      timestamp: new Date().toISOString(),
      data: eventData.data || {},
    };

    const events = [...session.events, newEvent];

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: {
        events: JSON.parse(JSON.stringify(events)),
      },
    });

    return parseSession(updated);
  }

  async pause(sessionId: string): Promise<Session | null> {
    const session = await this.getById(sessionId);
    if (!session) return null;

    if (session.status !== 'ACTIVE') {
      throw new Error('Can only pause active sessions');
    }

    await this.addEvent(sessionId, { type: 'pause' });

    return this.update(sessionId, { status: 'PAUSED' });
  }

  async resume(sessionId: string): Promise<Session | null> {
    const session = await this.getById(sessionId);
    if (!session) return null;

    if (session.status !== 'PAUSED') {
      throw new Error('Can only resume paused sessions');
    }

    const updated = await this.update(sessionId, { status: 'ACTIVE' });
    if (updated) {
      await this.addEvent(sessionId, { type: 'resume' });
    }

    return this.getById(sessionId);
  }

  async complete(sessionId: string): Promise<Session | null> {
    const session = await this.getById(sessionId);
    if (!session) return null;

    if (session.status === 'COMPLETED') {
      return session;
    }

    await this.addEvent(sessionId, { type: 'session_end' });

    const metrics = this.calculateMetrics(session);

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        metrics: JSON.parse(JSON.stringify(metrics)),
      },
    });

    return parseSession(updated);
  }

  async abandon(sessionId: string): Promise<Session | null> {
    const session = await this.getById(sessionId);
    if (!session) return null;

    if (session.status === 'COMPLETED' || session.status === 'ABANDONED') {
      return session;
    }

    await this.addEvent(sessionId, {
      type: 'session_end',
      data: { reason: 'abandoned' },
    });

    const metrics = this.calculateMetrics(session);

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: {
        status: 'ABANDONED',
        completedAt: new Date(),
        metrics: JSON.parse(JSON.stringify(metrics)),
      },
    });

    return parseSession(updated);
  }

  async list(filter: SessionFilter = {}): Promise<{ sessions: Session[]; total: number }> {
    const where: Record<string, unknown> = {};

    if (filter.learnerId) where.learnerId = filter.learnerId;
    if (filter.languageCode) where.languageCode = filter.languageCode;
    if (filter.scenarioId) where.scenarioId = filter.scenarioId;
    if (filter.status) where.status = filter.status;

    if (filter.startDate || filter.endDate) {
      where.startedAt = {};
      if (filter.startDate) {
        (where.startedAt as Record<string, Date>).gte = filter.startDate;
      }
      if (filter.endDate) {
        (where.startedAt as Record<string, Date>).lte = filter.endDate;
      }
    }

    const [sessions, total] = await Promise.all([
      prisma.session.findMany({
        where,
        take: filter.limit || 50,
        skip: filter.offset || 0,
        orderBy: { startedAt: 'desc' },
      }),
      prisma.session.count({ where }),
    ]);

    return {
      sessions: sessions.map(parseSession),
      total,
    };
  }

  async getLearnerSessionHistory(
    learnerId: string,
    languageCode?: string,
    limit: number = 10
  ): Promise<Session[]> {
    const where: Record<string, unknown> = { learnerId };
    if (languageCode) {
      where.languageCode = languageCode;
    }

    const sessions = await prisma.session.findMany({
      where,
      take: limit,
      orderBy: { startedAt: 'desc' },
    });

    return sessions.map(parseSession);
  }

  async getSessionStats(
    learnerId: string,
    languageCode: string,
    days: number = 30
  ): Promise<{
    totalSessions: number;
    completedSessions: number;
    abandonedSessions: number;
    totalDuration: number;
    averageDuration: number;
    averageScore: number;
  }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sessions = await prisma.session.findMany({
      where: {
        learnerId,
        languageCode,
        startedAt: { gte: startDate },
      },
    });

    const parsed = sessions.map(parseSession);
    const completed = parsed.filter((s) => s.status === 'COMPLETED');
    const abandoned = parsed.filter((s) => s.status === 'ABANDONED');

    const totalDuration = completed.reduce((sum, s) => sum + (s.metrics?.duration || 0), 0);
    const totalScore = completed.reduce((sum, s) => sum + (s.metrics?.overallScore || 0), 0);

    return {
      totalSessions: parsed.length,
      completedSessions: completed.length,
      abandonedSessions: abandoned.length,
      totalDuration,
      averageDuration: completed.length > 0 ? totalDuration / completed.length : 0,
      averageScore: completed.length > 0 ? totalScore / completed.length : 0,
    };
  }

  calculateMetrics(session: Session): SessionMetrics {
    const events = session.events;
    const now = new Date();
    const startTime = new Date(session.startedAt);
    const duration = Math.floor((now.getTime() - startTime.getTime()) / 1000);

    const userMessages = events.filter((e) => e.type === 'user_message').length;
    const agentMessages = events.filter((e) => e.type === 'agent_message').length;
    const errorsDetected = events.filter((e) => e.type === 'error_detected').length;
    const correctionsMade = events.filter((e) => e.type === 'correction_given').length;
    const correctionsAccepted = events.filter((e) => e.type === 'correction_accepted').length;
    const hintsRequested = events.filter((e) => e.type === 'hint_requested').length;
    const activitiesCompleted = events.filter((e) => e.type === 'practice_activity_completed').length;

    const engagementScore = this.calculateEngagementScore(events, duration);
    const accuracyScore = this.calculateAccuracyScore(userMessages, errorsDetected);
    const fluencyScore = this.calculateFluencyScore(events, duration);
    const overallScore = Math.round((engagementScore + accuracyScore + fluencyScore) / 3);

    return {
      duration,
      messageCount: userMessages + agentMessages,
      userMessageCount: userMessages,
      agentMessageCount: agentMessages,
      errorsDetected,
      correctionsMade,
      correctionsAccepted,
      hintsRequested,
      activitiesCompleted,
      engagementScore,
      fluencyScore,
      accuracyScore,
      overallScore,
    };
  }

  private calculateEngagementScore(events: SessionEvent[], duration: number): number {
    if (duration === 0) return 0;

    const userMessages = events.filter((e) => e.type === 'user_message').length;
    const messagesPerMinute = userMessages / (duration / 60);

    let score = Math.min(messagesPerMinute * 20, 100);

    const hintsRequested = events.filter((e) => e.type === 'hint_requested').length;
    if (hintsRequested > 0) {
      score = Math.max(score - hintsRequested * 5, 0);
    }

    const activitiesCompleted = events.filter((e) => e.type === 'practice_activity_completed').length;
    score += activitiesCompleted * 10;

    return Math.min(Math.round(score), 100);
  }

  private calculateAccuracyScore(userMessages: number, errors: number): number {
    if (userMessages === 0) return 100;
    const errorRate = errors / userMessages;
    return Math.max(Math.round((1 - errorRate) * 100), 0);
  }

  private calculateFluencyScore(events: SessionEvent[], duration: number): number {
    if (duration === 0) return 0;

    const userMessages = events.filter((e) => e.type === 'user_message');
    if (userMessages.length < 2) return 50;

    let totalGap = 0;
    for (let i = 1; i < userMessages.length; i++) {
      const gap = new Date(userMessages[i].timestamp).getTime() - new Date(userMessages[i - 1].timestamp).getTime();
      totalGap += gap;
    }

    const averageGap = totalGap / (userMessages.length - 1) / 1000;

    if (averageGap < 5) return 100;
    if (averageGap < 10) return 80;
    if (averageGap < 20) return 60;
    if (averageGap < 30) return 40;
    return 20;
  }
}

export const sessionService = new SessionService();

