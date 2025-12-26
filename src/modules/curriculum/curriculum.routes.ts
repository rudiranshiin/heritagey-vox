import { Router } from 'express';
import {
  getModules,
  getModuleById,
  getScenariosByModule,
  getScenarioById,
  getPathways,
  getPathwayById,
} from './curriculum.controller';

const router = Router();

// Module routes
router.get('/modules', getModules);
router.get('/modules/:moduleId', getModuleById);
router.get('/modules/:moduleId/scenarios', getScenariosByModule);

// Scenario routes
router.get('/scenarios/:scenarioId', getScenarioById);

// Pathway routes
router.get('/pathways', getPathways);
router.get('/pathways/:pathwayId', getPathwayById);

export default router;

