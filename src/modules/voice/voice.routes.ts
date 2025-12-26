import { Router, Request, Response } from 'express';

const router = Router();

const OPENAI_API_KEY = process.env.HUBSPOT_US_OPEN_AI_API_KEY || process.env.OPENAI_API_KEY;
const OPENAI_SESSION_URL = 'https://us.api.openai.com/v1/realtime/sessions';

/**
 * @swagger
 * /api/v1/voice/session:
 *   post:
 *     summary: Create an ephemeral OpenAI Realtime session
 *     tags: [Voice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 default: gpt-4o-realtime-preview-2024-12-17
 *               voice:
 *                 type: string
 *                 default: ash
 *     responses:
 *       200:
 *         description: Ephemeral session token
 *       500:
 *         description: Failed to create session
 */
router.post('/session', async (req: Request, res: Response) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OpenAI API key not configured',
      message: 'Set HUBSPOT_US_OPEN_AI_API_KEY or OPENAI_API_KEY environment variable',
    });
  }

  try {
    const { model = 'gpt-4o-realtime-preview-2024-12-17', voice = 'ash' } = req.body;

    const response = await fetch(OPENAI_SESSION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI session error:', error);
      return res.status(response.status).json({
        error: 'Failed to create OpenAI session',
        details: error,
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Voice session error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

