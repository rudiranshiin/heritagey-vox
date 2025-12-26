import { Request, Response } from 'express';
import { assessmentService } from './assessment.service';
import { progressionEngine } from './progression.engine';
import { competencyChecker } from './competency.checker';
import { reviewRecommender } from './review.recommender';
import type {
  CreateAssessmentDTO,
  AssessmentInput,
  AssessmentFilter,
  AssessmentType,
} from './assessment.types';
import type { Level } from '../learner/learner.types';

export class AssessmentController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateAssessmentDTO = req.body;
      const input: AssessmentInput = req.body.input;

      if (!data.learnerId || !data.languageCode || !data.type) {
        return res
          .status(400)
          .json({ error: 'learnerId, languageCode, and type are required' });
      }

      if (!input || !input.events) {
        return res.status(400).json({ error: 'Assessment input with events is required' });
      }

      const assessment = await assessmentService.createAssessment(data, input);
      return res.status(201).json(assessment);
    } catch (error) {
      console.error('Error creating assessment:', error);
      return res.status(500).json({ error: 'Failed to create assessment' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessment = await assessmentService.getById(id);

      if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found' });
      }

      return res.json(assessment);
    } catch (error) {
      console.error('Error getting assessment:', error);
      return res.status(500).json({ error: 'Failed to get assessment' });
    }
  }

  async getLatest(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const assessment = await assessmentService.getLatest(learnerId, language as string);

      if (!assessment) {
        return res.status(404).json({ error: 'No assessments found' });
      }

      return res.json(assessment);
    } catch (error) {
      console.error('Error getting latest assessment:', error);
      return res.status(500).json({ error: 'Failed to get latest assessment' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { learnerId, language, type, moduleId, startDate, endDate, limit, offset } = req.query;

      const filter: AssessmentFilter = {
        learnerId: learnerId as string,
        languageCode: language as string,
        type: type as AssessmentType,
        moduleId: moduleId as string,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        offset: offset ? parseInt(offset as string, 10) : undefined,
      };

      const result = await assessmentService.list(filter);
      return res.json(result);
    } catch (error) {
      console.error('Error listing assessments:', error);
      return res.status(500).json({ error: 'Failed to list assessments' });
    }
  }

  async getAverageScores(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language, days } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const scores = await assessmentService.getAverageScores(
        learnerId,
        language as string,
        days ? parseInt(days as string, 10) : undefined
      );

      return res.json(scores);
    } catch (error) {
      console.error('Error getting average scores:', error);
      return res.status(500).json({ error: 'Failed to get average scores' });
    }
  }

  async evaluateProgression(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const result = await progressionEngine.evaluateProgression(learnerId, language as string);
      return res.json(result);
    } catch (error) {
      console.error('Error evaluating progression:', error);
      return res.status(500).json({ error: 'Failed to evaluate progression' });
    }
  }

  async advanceLevel(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const result = await progressionEngine.advanceLevel(learnerId, language as string);
      return res.json(result);
    } catch (error) {
      console.error('Error advancing level:', error);
      return res.status(500).json({ error: 'Failed to advance level' });
    }
  }

  async getProgressToNextLevel(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const result = await progressionEngine.getProgressToNextLevel(learnerId, language as string);
      return res.json(result);
    } catch (error) {
      console.error('Error getting progress to next level:', error);
      return res.status(500).json({ error: 'Failed to get progress' });
    }
  }

  async getCompetencyProgress(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language, targetLevel } = req.query;

      if (!language || !targetLevel) {
        return res
          .status(400)
          .json({ error: 'language and targetLevel query parameters are required' });
      }

      const result = await competencyChecker.getCompetencyProgress(
        learnerId,
        language as string,
        targetLevel as Level
      );
      return res.json(result);
    } catch (error) {
      console.error('Error getting competency progress:', error);
      return res.status(500).json({ error: 'Failed to get competency progress' });
    }
  }

  async getRecommendations(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language, limit } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const recommendations = await reviewRecommender.getRecommendations(
        learnerId,
        language as string,
        limit ? parseInt(limit as string, 10) : undefined
      );

      return res.json(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return res.status(500).json({ error: 'Failed to get recommendations' });
    }
  }

  async getLearnerProgress(req: Request, res: Response) {
    try {
      const { learnerId } = req.params;
      const { language } = req.query;

      if (!language) {
        return res.status(400).json({ error: 'language query parameter is required' });
      }

      const progress = await reviewRecommender.getLearnerProgress(learnerId, language as string);
      return res.json(progress);
    } catch (error) {
      console.error('Error getting learner progress:', error);
      return res.status(500).json({ error: 'Failed to get learner progress' });
    }
  }
}

export const assessmentController = new AssessmentController();

