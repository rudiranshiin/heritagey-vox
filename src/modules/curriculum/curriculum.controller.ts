import { Request, Response } from 'express';
import { curriculumService } from './curriculum.service';

/**
 * @swagger
 * /api/v1/curriculum/modules:
 *   get:
 *     summary: Get all curriculum modules
 *     tags: [Curriculum]
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language code (e.g., en-GB)
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter by CEFR level (e.g., A2-B1)
 *       - in: query
 *         name: parentModule
 *         schema:
 *           type: string
 *         description: Filter by parent module ID (e.g., 1, 2, 3, 4)
 *     responses:
 *       200:
 *         description: List of modules
 */
export async function getModules(req: Request, res: Response) {
  try {
    const { language, level, parentModule } = req.query;
    const modules = await curriculumService.getModules({
      language: language as string,
      level: level as string,
      parentModule: parentModule as string,
    });
    res.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
}

/**
 * @swagger
 * /api/v1/curriculum/modules/{moduleId}:
 *   get:
 *     summary: Get a specific module with its scenarios
 *     tags: [Curriculum]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID (e.g., en-GB:1A)
 *     responses:
 *       200:
 *         description: Module with scenarios
 *       404:
 *         description: Module not found
 */
export async function getModuleById(req: Request, res: Response) {
  try {
    const { moduleId } = req.params;
    const module = await curriculumService.getModuleById(moduleId);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    console.error('Error fetching module:', error);
    res.status(500).json({ error: 'Failed to fetch module' });
  }
}

/**
 * @swagger
 * /api/v1/curriculum/modules/{moduleId}/scenarios:
 *   get:
 *     summary: Get scenarios for a module
 *     tags: [Curriculum]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: List of scenarios
 */
export async function getScenariosByModule(req: Request, res: Response) {
  try {
    const { moduleId } = req.params;
    const scenarios = await curriculumService.getScenariosByModule(moduleId);
    res.json(scenarios);
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    res.status(500).json({ error: 'Failed to fetch scenarios' });
  }
}

/**
 * @swagger
 * /api/v1/curriculum/scenarios/{scenarioId}:
 *   get:
 *     summary: Get a specific scenario with full content
 *     tags: [Curriculum]
 *     parameters:
 *       - in: path
 *         name: scenarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: Scenario ID (e.g., en-GB:1A-1)
 *     responses:
 *       200:
 *         description: Scenario with full content
 *       404:
 *         description: Scenario not found
 */
export async function getScenarioById(req: Request, res: Response) {
  try {
    const { scenarioId } = req.params;
    const scenario = await curriculumService.getScenarioById(scenarioId);

    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    res.json(scenario);
  } catch (error) {
    console.error('Error fetching scenario:', error);
    res.status(500).json({ error: 'Failed to fetch scenario' });
  }
}

/**
 * @swagger
 * /api/v1/curriculum/pathways:
 *   get:
 *     summary: Get all learning pathways
 *     tags: [Curriculum]
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language code
 *     responses:
 *       200:
 *         description: List of pathways
 */
export async function getPathways(req: Request, res: Response) {
  try {
    const { language } = req.query;
    const pathways = await curriculumService.getPathways(language as string);
    res.json(pathways);
  } catch (error) {
    console.error('Error fetching pathways:', error);
    res.status(500).json({ error: 'Failed to fetch pathways' });
  }
}

/**
 * @swagger
 * /api/v1/curriculum/pathways/{pathwayId}:
 *   get:
 *     summary: Get a specific pathway
 *     tags: [Curriculum]
 *     parameters:
 *       - in: path
 *         name: pathwayId
 *         required: true
 *         schema:
 *           type: string
 *         description: Pathway ID (e.g., en-GB:business)
 *     responses:
 *       200:
 *         description: Pathway details
 *       404:
 *         description: Pathway not found
 */
export async function getPathwayById(req: Request, res: Response) {
  try {
    const { pathwayId } = req.params;
    const pathway = await curriculumService.getPathwayById(pathwayId);

    if (!pathway) {
      return res.status(404).json({ error: 'Pathway not found' });
    }

    res.json(pathway);
  } catch (error) {
    console.error('Error fetching pathway:', error);
    res.status(500).json({ error: 'Failed to fetch pathway' });
  }
}

