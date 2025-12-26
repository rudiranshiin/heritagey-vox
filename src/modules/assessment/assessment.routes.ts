import { Router } from 'express';
import { assessmentController } from './assessment.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/assessments:
 *   get:
 *     summary: List assessments with filters
 *     tags: [Assessments]
 *     parameters:
 *       - in: query
 *         name: learnerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INFORMAL, MILESTONE]
 */
router.get('/', (req, res) => assessmentController.list(req, res));

/**
 * @swagger
 * /api/v1/assessments:
 *   post:
 *     summary: Create a new assessment
 *     tags: [Assessments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - learnerId
 *               - languageCode
 *               - type
 *               - input
 *             properties:
 *               learnerId:
 *                 type: string
 *               languageCode:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [INFORMAL, MILESTONE]
 *               moduleId:
 *                 type: string
 *               input:
 *                 type: object
 *                 properties:
 *                   events:
 *                     type: array
 *                   errorLogs:
 *                     type: array
 *                   duration:
 *                     type: number
 */
router.post('/', (req, res) => assessmentController.create(req, res));

/**
 * @swagger
 * /api/v1/assessments/latest/{learnerId}:
 *   get:
 *     summary: Get latest assessment for a learner
 *     tags: [Assessments]
 */
router.get('/latest/:learnerId', (req, res) => assessmentController.getLatest(req, res));

/**
 * @swagger
 * /api/v1/assessments/scores/{learnerId}:
 *   get:
 *     summary: Get average scores for a learner
 *     tags: [Assessments]
 */
router.get('/scores/:learnerId', (req, res) => assessmentController.getAverageScores(req, res));

/**
 * @swagger
 * /api/v1/assessments/progression/{learnerId}:
 *   get:
 *     summary: Evaluate if learner can advance to next level
 *     tags: [Assessments]
 */
router.get('/progression/:learnerId', (req, res) => assessmentController.evaluateProgression(req, res));

/**
 * @swagger
 * /api/v1/assessments/progression/{learnerId}/advance:
 *   post:
 *     summary: Advance learner to next level if eligible
 *     tags: [Assessments]
 */
router.post('/progression/:learnerId/advance', (req, res) => assessmentController.advanceLevel(req, res));

/**
 * @swagger
 * /api/v1/assessments/progression/{learnerId}/progress:
 *   get:
 *     summary: Get progress towards next level
 *     tags: [Assessments]
 */
router.get('/progression/:learnerId/progress', (req, res) => assessmentController.getProgressToNextLevel(req, res));

/**
 * @swagger
 * /api/v1/assessments/competency/{learnerId}:
 *   get:
 *     summary: Get competency progress for a specific level
 *     tags: [Assessments]
 */
router.get('/competency/:learnerId', (req, res) => assessmentController.getCompetencyProgress(req, res));

/**
 * @swagger
 * /api/v1/assessments/recommendations/{learnerId}:
 *   get:
 *     summary: Get personalized review recommendations
 *     tags: [Assessments]
 */
router.get('/recommendations/:learnerId', (req, res) => assessmentController.getRecommendations(req, res));

/**
 * @swagger
 * /api/v1/assessments/learner-progress/{learnerId}:
 *   get:
 *     summary: Get comprehensive learner progress overview
 *     tags: [Assessments]
 */
router.get('/learner-progress/:learnerId', (req, res) => assessmentController.getLearnerProgress(req, res));

/**
 * @swagger
 * /api/v1/assessments/{id}:
 *   get:
 *     summary: Get assessment by ID
 *     tags: [Assessments]
 */
router.get('/:id', (req, res) => assessmentController.getById(req, res));

export default router;

