import { Request, Response } from 'express';
import { learnerService } from './learner.service';
import type {
  CreateLearnerDTO,
  UpdateLearnerDTO,
  AddLanguageDTO,
  UpdateLanguageDTO,
  UpdatePreferencesDTO,
  LearnerProfile,
  Level,
} from './learner.types';

export class LearnerController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateLearnerDTO = req.body;

      if (!data.externalId) {
        return res.status(400).json({ error: 'externalId is required' });
      }

      const existing = await learnerService.getByExternalId(data.externalId);
      if (existing) {
        return res.status(409).json({ error: 'Learner with this externalId already exists' });
      }

      const learner = await learnerService.create(data);
      return res.status(201).json(learner);
    } catch (error) {
      console.error('Error creating learner:', error);
      return res.status(500).json({ error: 'Failed to create learner' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const learner = await learnerService.getById(id);

      if (!learner) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      return res.json(learner);
    } catch (error) {
      console.error('Error getting learner:', error);
      return res.status(500).json({ error: 'Failed to get learner' });
    }
  }

  async getByExternalId(req: Request, res: Response) {
    try {
      const { externalId } = req.params;
      const learner = await learnerService.getByExternalId(externalId);

      if (!learner) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      return res.json(learner);
    } catch (error) {
      console.error('Error getting learner:', error);
      return res.status(500).json({ error: 'Failed to get learner' });
    }
  }

  async getSummary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const summary = await learnerService.getSummary(id);

      if (!summary) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      return res.json(summary);
    } catch (error) {
      console.error('Error getting learner summary:', error);
      return res.status(500).json({ error: 'Failed to get learner summary' });
    }
  }

  async getWithProgress(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const learner = await learnerService.getWithProgress(id);

      if (!learner) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      return res.json(learner);
    } catch (error) {
      console.error('Error getting learner with progress:', error);
      return res.status(500).json({ error: 'Failed to get learner with progress' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateLearnerDTO = req.body;

      const learner = await learnerService.update(id, data);

      if (!learner) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      return res.json(learner);
    } catch (error) {
      console.error('Error updating learner:', error);
      return res.status(500).json({ error: 'Failed to update learner' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await learnerService.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting learner:', error);
      return res.status(500).json({ error: 'Failed to delete learner' });
    }
  }

  async addLanguage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: AddLanguageDTO = req.body;

      if (!data.languageCode) {
        return res.status(400).json({ error: 'languageCode is required' });
      }

      const learner = await learnerService.getById(id);
      if (!learner) {
        return res.status(404).json({ error: 'Learner not found' });
      }

      const language = await learnerService.addLanguage(id, data);
      return res.status(201).json(language);
    } catch (error) {
      console.error('Error adding language:', error);
      const message = error instanceof Error ? error.message : 'Failed to add language';
      return res.status(500).json({ error: message });
    }
  }

  async updateLanguage(req: Request, res: Response) {
    try {
      const { id, languageCode } = req.params;
      const data: UpdateLanguageDTO = req.body;

      const language = await learnerService.updateLanguage(id, languageCode, data);

      if (!language) {
        return res.status(404).json({ error: 'Language not found for this learner' });
      }

      return res.json(language);
    } catch (error) {
      console.error('Error updating language:', error);
      return res.status(500).json({ error: 'Failed to update language' });
    }
  }

  async removeLanguage(req: Request, res: Response) {
    try {
      const { id, languageCode } = req.params;
      const removed = await learnerService.removeLanguage(id, languageCode);

      if (!removed) {
        return res.status(404).json({ error: 'Language not found for this learner' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Error removing language:', error);
      return res.status(500).json({ error: 'Failed to remove language' });
    }
  }

  async getMemory(req: Request, res: Response) {
    try {
      const { id, languageCode } = req.params;
      const memory = await learnerService.getMemory(id, languageCode);

      if (!memory) {
        return res.status(404).json({ error: 'Memory not found for this learner and language' });
      }

      return res.json(memory);
    } catch (error) {
      console.error('Error getting memory:', error);
      return res.status(500).json({ error: 'Failed to get memory' });
    }
  }

  async updatePreferences(req: Request, res: Response) {
    try {
      const { id, languageCode } = req.params;
      const preferences: UpdatePreferencesDTO = req.body;

      const memory = await learnerService.updatePreferences(id, languageCode, preferences);

      if (!memory) {
        return res.status(404).json({ error: 'Memory not found for this learner and language' });
      }

      return res.json(memory);
    } catch (error) {
      console.error('Error updating preferences:', error);
      return res.status(500).json({ error: 'Failed to update preferences' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const { id, languageCode } = req.params;
      const profile: Partial<LearnerProfile> = req.body;

      const memory = await learnerService.updateProfile(id, languageCode, profile);

      if (!memory) {
        return res.status(404).json({ error: 'Memory not found for this learner and language' });
      }

      return res.json(memory);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { language, level, limit, offset } = req.query;

      const result = await learnerService.list({
        languageCode: language as string,
        level: level as Level,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        offset: offset ? parseInt(offset as string, 10) : undefined,
      });

      return res.json(result);
    } catch (error) {
      console.error('Error listing learners:', error);
      return res.status(500).json({ error: 'Failed to list learners' });
    }
  }
}

export const learnerController = new LearnerController();

