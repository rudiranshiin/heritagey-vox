import { Router } from 'express';
import { sessionController } from './session.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/sessions:
 *   get:
 *     summary: List sessions with filters
 *     tags: [Sessions]
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, COMPLETED, ABANDONED, PAUSED]
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of sessions with pagination
 */
router.get('/', (req, res) => sessionController.list(req, res));

/**
 * @swagger
 * /api/v1/sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - learnerId
 *               - languageCode
 *             properties:
 *               learnerId:
 *                 type: string
 *               languageCode:
 *                 type: string
 *               scenarioId:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Created session
 *       409:
 *         description: Active session already exists
 */
router.post('/', (req, res) => sessionController.create(req, res));

/**
 * @swagger
 * /api/v1/sessions/active/{learnerId}:
 *   get:
 *     summary: Get active session for a learner
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: learnerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Active session
 *       404:
 *         description: No active session found
 */
router.get('/active/:learnerId', (req, res) => sessionController.getActive(req, res));

/**
 * @swagger
 * /api/v1/sessions/history/{learnerId}:
 *   get:
 *     summary: Get session history for a learner
 *     tags: [Sessions]
 */
router.get('/history/:learnerId', (req, res) => sessionController.getHistory(req, res));

/**
 * @swagger
 * /api/v1/sessions/stats/{learnerId}:
 *   get:
 *     summary: Get session statistics for a learner
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: learnerId
 *         required: true
 *       - in: query
 *         name: language
 *         required: true
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 */
router.get('/stats/:learnerId', (req, res) => sessionController.getStats(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags: [Sessions]
 */
router.get('/:id', (req, res) => sessionController.getById(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}/context:
 *   get:
 *     summary: Get full context for a session (for voice agent)
 *     tags: [Sessions]
 *     description: Returns learner memory, scenario details, and recommendations
 */
router.get('/:id/context', (req, res) => sessionController.getContext(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   patch:
 *     summary: Update session
 *     tags: [Sessions]
 */
router.patch('/:id', (req, res) => sessionController.update(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}/events:
 *   post:
 *     summary: Add an event to the session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [user_message, agent_message, error_detected, correction_given, hint_requested, etc.]
 *               data:
 *                 type: object
 */
router.post('/:id/events', (req, res) => sessionController.addEvent(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}/pause:
 *   post:
 *     summary: Pause the session
 *     tags: [Sessions]
 */
router.post('/:id/pause', (req, res) => sessionController.pause(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}/resume:
 *   post:
 *     summary: Resume a paused session
 *     tags: [Sessions]
 */
router.post('/:id/resume', (req, res) => sessionController.resume(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}/complete:
 *   post:
 *     summary: Complete the session and update learner memory
 *     tags: [Sessions]
 *     description: Calculates metrics, updates progress, and returns completion summary
 */
router.post('/:id/complete', (req, res) => sessionController.complete(req, res));

/**
 * @swagger
 * /api/v1/sessions/{id}/abandon:
 *   post:
 *     summary: Abandon the session
 *     tags: [Sessions]
 */
router.post('/:id/abandon', (req, res) => sessionController.abandon(req, res));

export default router;

