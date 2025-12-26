import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT || 4003;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Heritagey Vox API',
      version: '1.0.0',
      description: 'Context-Engineered Multi-Language Curriculum Backend API',
      contact: {
        name: 'Heritagey Team',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Languages', description: 'Supported languages' },
      { name: 'Learners', description: 'Learner management' },
      { name: 'Memory', description: 'Learner memory management' },
      { name: 'Curriculum', description: 'Curriculum content' },
      { name: 'Sessions', description: 'Session management' },
      { name: 'Assessments', description: 'Assessment and progression' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Learner: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            externalId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        LearnerLanguage: {
          type: 'object',
          properties: {
            learnerId: { type: 'string', format: 'uuid' },
            languageCode: { type: 'string' },
            currentLevel: { type: 'string', enum: ['A2', 'B1', 'B2', 'C1', 'C2'] },
            currentModuleId: { type: 'string' },
          },
        },
        Module: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            languageCode: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'string' },
            order: { type: 'integer' },
          },
        },
        Scenario: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            moduleId: { type: 'string' },
            title: { type: 'string' },
            context: { type: 'string' },
            objectives: { type: 'array', items: { type: 'string' } },
          },
        },
        Session: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            learnerId: { type: 'string', format: 'uuid' },
            languageCode: { type: 'string' },
            scenarioId: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'ABANDONED', 'PAUSED'] },
            startedAt: { type: 'string', format: 'date-time' },
            completedAt: { type: 'string', format: 'date-time' },
          },
        },
        Assessment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            learnerId: { type: 'string', format: 'uuid' },
            languageCode: { type: 'string' },
            type: { type: 'string', enum: ['INFORMAL', 'MILESTONE'] },
            scores: { type: 'object' },
            recommendations: { type: 'array', items: { type: 'object' } },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes.ts', './src/modules/**/*.routes.ts', './src/modules/**/*.controller.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve raw OpenAPI spec
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

