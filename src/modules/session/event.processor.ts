import { sessionService } from './session.service';
import { sessionCache } from './session.cache';
import { realtimeErrorHandler } from './realtime-error.handler';
import { memoryService } from '../memory/memory.service';
import type {
  Session,
  SessionEvent,
  EventType,
  AddEventDTO,
  ErrorEventData,
  CorrectionEventData,
} from './session.types';
import type { ErrorCategory } from '../learner/learner.types';

export interface ProcessedEvent {
  event: SessionEvent;
  session: Session;
  sideEffects: string[];
}

export class EventProcessor {
  async processEvent(sessionId: string, eventData: AddEventDTO): Promise<ProcessedEvent | null> {
    const session = await sessionService.addEvent(sessionId, eventData);
    if (!session) return null;

    const sideEffects: string[] = [];

    await sessionCache.incrementEventsCount(sessionId);
    sideEffects.push('cache_updated');

    const latestEvent = session.events[session.events.length - 1];

    switch (eventData.type) {
      case 'error_detected':
        await this.handleErrorDetected(session, eventData.data as unknown as ErrorEventData);
        sideEffects.push('error_pattern_updated');
        break;

      case 'correction_accepted':
        await this.handleCorrectionAccepted(session, eventData.data as unknown as CorrectionEventData);
        sideEffects.push('correction_recorded');
        break;

      case 'practice_activity_completed':
        await this.handleActivityCompleted(sessionId);
        sideEffects.push('activity_progress_updated');
        break;

      case 'user_message':
        await this.handleUserMessage(session);
        break;

      case 'hint_requested':
        sideEffects.push('hint_logged');
        break;
    }

    return {
      event: latestEvent,
      session,
      sideEffects,
    };
  }

  private async handleErrorDetected(session: Session, errorData: ErrorEventData): Promise<void> {
    if (!errorData) return;

    await realtimeErrorHandler.handleError(session.id, {
      learnerId: session.learnerId,
      languageCode: session.languageCode,
      sessionId: session.id,
      category: errorData.category,
      subcategory: errorData.subcategory,
      context: errorData.context,
    });

    await sessionCache.incrementErrorsCount(session.id);
  }

  private async handleCorrectionAccepted(session: Session, correctionData: CorrectionEventData): Promise<void> {
    if (!correctionData?.errorEventId) return;
  }

  private async handleActivityCompleted(sessionId: string): Promise<void> {
    const state = await sessionCache.getActiveSession(sessionId);
    if (state) {
      await sessionCache.setCurrentActivityIndex(sessionId, state.currentActivityIndex + 1);
    }
  }

  private async handleUserMessage(session: Session): Promise<void> {
    await sessionCache.extendSessionTTL(session.id);
  }

  async processBatchEvents(
    sessionId: string,
    events: AddEventDTO[]
  ): Promise<{ processed: number; errors: string[] }> {
    const errors: string[] = [];
    let processed = 0;

    for (const eventData of events) {
      try {
        await this.processEvent(sessionId, eventData);
        processed++;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Failed to process ${eventData.type}: ${message}`);
      }
    }

    return { processed, errors };
  }

  async getRecentEvents(sessionId: string, limit: number = 10): Promise<SessionEvent[]> {
    const session = await sessionService.getById(sessionId);
    if (!session) return [];

    return session.events.slice(-limit);
  }

  async getEventsByType(sessionId: string, type: EventType): Promise<SessionEvent[]> {
    const session = await sessionService.getById(sessionId);
    if (!session) return [];

    return session.events.filter((e) => e.type === type);
  }

  async getSessionEventStats(sessionId: string): Promise<Record<EventType, number>> {
    const session = await sessionService.getById(sessionId);
    if (!session) return {} as Record<EventType, number>;

    const stats: Partial<Record<EventType, number>> = {};
    for (const event of session.events) {
      stats[event.type] = (stats[event.type] || 0) + 1;
    }

    return stats as Record<EventType, number>;
  }

  createUserMessageEvent(content: string, metadata?: Record<string, unknown>): AddEventDTO {
    return {
      type: 'user_message',
      data: {
        content,
        ...metadata,
      },
    };
  }

  createAgentMessageEvent(content: string, metadata?: Record<string, unknown>): AddEventDTO {
    return {
      type: 'agent_message',
      data: {
        content,
        ...metadata,
      },
    };
  }

  createErrorEvent(
    category: ErrorCategory,
    context: string,
    subcategory?: string,
    userUtterance?: string
  ): AddEventDTO {
    return {
      type: 'error_detected',
      data: {
        category,
        subcategory,
        context,
        userUtterance,
      },
    };
  }

  createCorrectionEvent(
    errorEventId: string,
    correction: string,
    explanation?: string
  ): AddEventDTO {
    return {
      type: 'correction_given',
      data: {
        errorEventId,
        correction,
        explanation,
      },
    };
  }

  createActivityCompletedEvent(activityIndex: number, score?: number): AddEventDTO {
    return {
      type: 'practice_activity_completed',
      data: {
        activityIndex,
        score,
      },
    };
  }
}

export const eventProcessor = new EventProcessor();

