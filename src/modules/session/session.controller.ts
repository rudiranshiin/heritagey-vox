import { Request, Response } from 'express';
import { sessionService } from './session.service';
import { contextAssembler } from './context.assembler';
import { completionHandler } from './completion.handler';
import type {
  CreateSessionDTO,
  UpdateSessionDTO,
  AddEventDTO,
  SessionFilter,
  SessionStatus,
} from './session.types';

export class SessionController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateSessionDTO = req.body;

      if (!data.learnerId || !data.languageCode) {
        return res.status(400).json({ error: 'learnerId and languageCode are required' });
      }

      const existingActive = await sessionService.getActiveSession(data.learnerId, data.languageCode);
      if (existingActive) {
        return res.status(409).json({
          error: 'Active session already exists',
          activeSessionId: existingActive.id,
        });
      }

      const session = await sessionService.create(data);
      return res.status(201).json(session);
    } catch (error) {
      console.error('Error creating session:', error);
      const message = error instanceof Error ? error.message : 'Failed to create session';
      return res.status(500).json({ error: message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await sessionService.getById(id);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error getting session:', error);
      return res.status(500).json({ error: 'Failed to get session' });
    }
  }

  async getContext(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const context = await contextAssembler.assembleContext(id);

      if (!context) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(context);
    } catch (error) {
      console.error('Error getting session context:', error);
      return res.status(500).json({ error: 'Failed to get session context' });
    }
  }

  async getActive(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language } = req.query;

      const session = await sessionService.getActiveSession(learnerId, language as string);

      if (!session) {
        return res.status(404).json({ error: 'No active session found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error getting active session:', error);
      return res.status(500).json({ error: 'Failed to get active session' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateSessionDTO = req.body;

      const session = await sessionService.update(id, data);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error updating session:', error);
      return res.status(500).json({ error: 'Failed to update session' });
    }
  }

  async addEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const eventData: AddEventDTO = req.body;

      if (!eventData.type) {
        return res.status(400).json({ error: 'Event type is required' });
      }

      const session = await sessionService.addEvent(id, eventData);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error adding event:', error);
      const message = error instanceof Error ? error.message : 'Failed to add event';
      return res.status(500).json({ error: message });
    }
  }

  async pause(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await sessionService.pause(id);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error pausing session:', error);
      const message = error instanceof Error ? error.message : 'Failed to pause session';
      return res.status(500).json({ error: message });
    }
  }

  async resume(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await sessionService.resume(id);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error resuming session:', error);
      const message = error instanceof Error ? error.message : 'Failed to resume session';
      return res.status(500).json({ error: message });
    }
  }

  async complete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await completionHandler.completeSession(id);

      if (!result) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error completing session:', error);
      const message = error instanceof Error ? error.message : 'Failed to complete session';
      return res.status(500).json({ error: message });
    }
  }

  async abandon(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await sessionService.abandon(id);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Error abandoning session:', error);
      const message = error instanceof Error ? error.message : 'Failed to abandon session';
      return res.status(500).json({ error: message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { learnerId, language, scenarioId, status, startDate, endDate, limit, offset } = req.query;

      const filter: SessionFilter = {
        learnerId: learnerId as string,
        languageCode: language as string,
        scenarioId: scenarioId as string,
        status: status as SessionStatus,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        offset: offset ? parseInt(offset as string, 10) : undefined,
      };

      const result = await sessionService.list(filter);
      return res.json(result);
    } catch (error) {
      console.error('Error listing sessions:', error);
      return res.status(500).json({ error: 'Failed to list sessions' });
    }
  }

  async getHistory(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language, limit } = req.query;

      const sessions = await sessionService.getLearnerSessionHistory(
        learnerId,
        language as string,
        limit ? parseInt(limit as string, 10) : undefined
      );

      return res.json(sessions);
    } catch (error) {
      console.error('Error getting session history:', error);
      return res.status(500).json({ error: 'Failed to get session history' });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language, days } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const stats = await sessionService.getSessionStats(
        learnerId,
        language as string,
        days ? parseInt(days as string, 10) : undefined
      );

      return res.json(stats);
    } catch (error) {
      console.error('Error getting session stats:', error);
      return res.status(500).json({ error: 'Failed to get session stats' });
    }
  }
}

export const sessionController = new SessionController();

