import { Router, Request, Response } from 'express';
import { prisma } from './shared/database/prisma';
import { redis } from './shared/cache/redis';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                       example: connected
 *                     cache:
 *                       type: string
 *                       example: connected
 */
router.get('/health', async (_req: Request, res: Response) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      cache: 'unknown',
    },
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'connected';
  } catch {
    health.services.database = 'disconnected';
    health.status = 'degraded';
  }

  try {
    // Check Redis connection
    const pong = await redis.ping();
    health.services.cache = pong === 'PONG' ? 'connected' : 'disconnected';
  } catch {
    health.services.cache = 'disconnected';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

/**
 * @swagger
 * /api/v1/languages:
 *   get:
 *     summary: Get all supported languages
 *     tags: [Languages]
 *     responses:
 *       200:
 *         description: List of supported languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: en-GB
 *                   name:
 *                     type: string
 *                     example: British English
 *                   nativeName:
 *                     type: string
 *                     example: British English
 *                   flag:
 *                     type: string
 *                     example: 🇬🇧
 *                   isActive:
 *                     type: boolean
 *                     example: true
 */
router.get('/api/v1/languages', async (_req: Request, res: Response) => {
  try {
    const languages = await prisma.language.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    res.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

// Placeholder routes - will be replaced with module routes
router.get('/api/v1', (_req: Request, res: Response) => {
  res.json({
    name: 'Heritagey Vox API',
    version: '1.0.0',
    description: 'Context-Engineered Multi-Language Curriculum Backend',
    endpoints: {
      health: '/health',
      docs: '/api-docs',
      languages: '/api/v1/languages',
      learners: '/api/v1/learners (coming soon)',
      curriculum: '/api/v1/curriculum (coming soon)',
      sessions: '/api/v1/sessions (coming soon)',
    },
  });
});

export default router;

