import { Router } from 'express';
import { learnerController } from './learner.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/learners:
 *   get:
 *     summary: List all learners
 *     tags: [Learners]
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
 *           enum: [A2, B1, B2, C1, C2]
 *         description: Filter by proficiency level
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: List of learners with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 learners:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Learner'
 *                 total:
 *                   type: integer
 */
router.get('/', (req, res) => learnerController.list(req, res));

/**
 * @swagger
 * /api/v1/learners:
 *   post:
 *     summary: Create a new learner
 *     tags: [Learners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - languageCode
 *             properties:
 *               externalId:
 *                 type: string
 *                 description: External system ID
 *               languageCode:
 *                 type: string
 *                 example: en-GB
 *               profile:
 *                 type: object
 *                 properties:
 *                   nativeLanguage:
 *                     type: string
 *                   learningGoals:
 *                     type: array
 *                     items:
 *                       type: string
 *                   interests:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       201:
 *         description: Created learner
 *       409:
 *         description: Learner already exists
 */
router.post('/', (req, res) => learnerController.create(req, res));

/**
 * @swagger
 * /api/v1/learners/external/{externalId}:
 *   get:
 *     summary: Get learner by external ID
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: externalId
 *         required: true
 *         schema:
 *           type: string
 *         description: External system ID
 *     responses:
 *       200:
 *         description: Learner details
 *       404:
 *         description: Learner not found
 */
router.get('/external/:externalId', (req, res) => learnerController.getByExternalId(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}:
 *   get:
 *     summary: Get learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *     responses:
 *       200:
 *         description: Learner details
 *       404:
 *         description: Learner not found
 */
router.get('/:id', (req, res) => learnerController.getById(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/summary:
 *   get:
 *     summary: Get learner summary with progress overview
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *     responses:
 *       200:
 *         description: Learner summary with languages, progress, and streaks
 *       404:
 *         description: Learner not found
 */
router.get('/:id/summary', (req, res) => learnerController.getSummary(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/progress:
 *   get:
 *     summary: Get learner with full progress data
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *     responses:
 *       200:
 *         description: Full learner data with all progress details
 *       404:
 *         description: Learner not found
 */
router.get('/:id/progress', (req, res) => learnerController.getWithProgress(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}:
 *   patch:
 *     summary: Update learner
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               externalId:
 *                 type: string
 *                 description: External system ID
 *     responses:
 *       200:
 *         description: Updated learner
 *       404:
 *         description: Learner not found
 */
router.patch('/:id', (req, res) => learnerController.update(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}:
 *   delete:
 *     summary: Delete learner
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *     responses:
 *       204:
 *         description: Learner deleted
 *       404:
 *         description: Learner not found
 */
router.delete('/:id', (req, res) => learnerController.delete(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/languages:
 *   post:
 *     summary: Add a language to learner
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - languageCode
 *             properties:
 *               languageCode:
 *                 type: string
 *                 example: fr-FR
 *               currentLevel:
 *                 type: string
 *                 enum: [A2, B1, B2, C1, C2]
 *                 default: A2
 *     responses:
 *       201:
 *         description: Language added to learner
 *       404:
 *         description: Learner or language not found
 *       409:
 *         description: Language already added
 */
router.post('/:id/languages', (req, res) => learnerController.addLanguage(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/languages/{languageCode}:
 *   patch:
 *     summary: Update learner's language settings
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *       - in: path
 *         name: languageCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code (e.g., en-GB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentLevel:
 *                 type: string
 *                 enum: [A2, B1, B2, C1, C2]
 *               currentModuleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Language settings updated
 *       404:
 *         description: Learner or language not found
 */
router.patch('/:id/languages/:languageCode', (req, res) => learnerController.updateLanguage(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/languages/{languageCode}:
 *   delete:
 *     summary: Remove a language from learner
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *       - in: path
 *         name: languageCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code (e.g., en-GB)
 *     responses:
 *       204:
 *         description: Language removed
 *       404:
 *         description: Learner or language not found
 */
router.delete('/:id/languages/:languageCode', (req, res) => learnerController.removeLanguage(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/memory/{languageCode}:
 *   get:
 *     summary: Get learner's memory for a specific language
 *     tags: [Learners]
 *     description: Returns progress data, error patterns, preferences, and profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *       - in: path
 *         name: languageCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code (e.g., en-GB)
 *     responses:
 *       200:
 *         description: Learner memory data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 progressData:
 *                   type: object
 *                 errorPatterns:
 *                   type: array
 *                 preferences:
 *                   type: object
 *                 profile:
 *                   type: object
 *       404:
 *         description: Learner or memory not found
 */
router.get('/:id/memory/:languageCode', (req, res) => learnerController.getMemory(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/memory/{languageCode}/preferences:
 *   patch:
 *     summary: Update learner's preferences for a language
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *       - in: path
 *         name: languageCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code (e.g., en-GB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionDuration:
 *                 type: string
 *                 enum: [short, medium, long]
 *               practiceStyle:
 *                 type: string
 *                 enum: [guided, mixed, free]
 *               feedbackLevel:
 *                 type: string
 *                 enum: [minimal, moderate, detailed]
 *               voiceSpeed:
 *                 type: string
 *                 enum: [slow, normal, fast]
 *               focusAreas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Preferences updated
 *       404:
 *         description: Learner or memory not found
 */
router.patch('/:id/memory/:languageCode/preferences', (req, res) => learnerController.updatePreferences(req, res));

/**
 * @swagger
 * /api/v1/learners/{id}/memory/{languageCode}/profile:
 *   patch:
 *     summary: Update learner's profile for a language
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Learner UUID
 *       - in: path
 *         name: languageCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code (e.g., en-GB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nativeLanguage:
 *                 type: string
 *                 example: id-ID
 *               otherLanguages:
 *                 type: array
 *                 items:
 *                   type: string
 *               learningGoals:
 *                 type: array
 *                 items:
 *                   type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       404:
 *         description: Learner or memory not found
 */
router.patch('/:id/memory/:languageCode/profile', (req, res) => learnerController.updateProfile(req, res));

export default router;
