import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
}

export const learnerSchemas = {
  create: z.object({
    body: z.object({
      externalId: z.string().optional(),
      languageCode: z.string().min(2).max(10),
      nativeLanguage: z.string().optional(),
    }),
  }),

  addLanguage: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
    body: z.object({
      languageCode: z.string().min(2).max(10),
    }),
  }),

  getById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),

  getByLanguage: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
    query: z.object({
      language: z.string().min(2).max(10),
    }),
  }),
};

export const sessionSchemas = {
  create: z.object({
    body: z.object({
      learnerId: z.string().uuid(),
      languageCode: z.string().min(2).max(10),
      scenarioId: z.string().optional(),
      metadata: z.record(z.unknown()).optional(),
    }),
  }),

  addEvent: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
    body: z.object({
      type: z.enum([
        'session_start',
        'session_end',
        'user_message',
        'agent_message',
        'error_detected',
        'correction_given',
        'correction_accepted',
        'hint_requested',
        'hint_given',
        'scenario_started',
        'scenario_completed',
        'practice_activity_started',
        'practice_activity_completed',
        'feedback_given',
        'pause',
        'resume',
      ]),
      data: z.record(z.unknown()).optional(),
    }),
  }),

  getById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
};

export const assessmentSchemas = {
  create: z.object({
    body: z.object({
      learnerId: z.string().uuid(),
      languageCode: z.string().min(2).max(10),
      type: z.enum(['INFORMAL', 'MILESTONE']),
      moduleId: z.string().optional(),
      input: z.object({
        events: z.array(z.object({
          type: z.string(),
          timestamp: z.string(),
          data: z.record(z.unknown()),
        })),
        errorLogs: z.array(z.object({
          category: z.string(),
          subcategory: z.string().optional(),
          context: z.string(),
          corrected: z.boolean(),
        })).optional().default([]),
        duration: z.number().min(0),
      }),
    }),
  }),

  getById: z.object({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),

  getByLearner: z.object({
    params: z.object({
      learnerId: z.string().uuid(),
    }),
    query: z.object({
      language: z.string().min(2).max(10),
    }),
  }),
};

export const curriculumSchemas = {
  getModules: z.object({
    query: z.object({
      language: z.string().min(2).max(10).optional(),
      level: z.enum(['A2', 'B1', 'B2', 'C1', 'C2']).optional(),
    }),
  }),

  getScenario: z.object({
    params: z.object({
      id: z.string(),
    }),
  }),
};

