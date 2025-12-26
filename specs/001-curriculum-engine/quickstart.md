# Quickstart Guide - British English Curriculum Engine

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- pnpm (recommended) or npm

## Setup Steps

### 1. Clone and Install

```bash
cd /Users/rrudiyanto/Desktop/AI/project/heritagey-vox

# Initialize project (will be done during Phase 1)
npm init -y

# Install dependencies
npm install express prisma @prisma/client redis zod swagger-ui-express
npm install -D typescript @types/node @types/express jest ts-jest @types/jest
npm install -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Environment Setup

Create `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/heritagey_vox?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# Server
PORT=3001
NODE_ENV=development

# Auth (JWT from main Heritagey backend)
JWT_SECRET="your-jwt-secret"

# Logging
LOG_LEVEL=debug
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed curriculum data
npx prisma db seed
```

### 4. Start Development Server

```bash
# Development with hot reload
npm run dev

# Or production build
npm run build
npm start
```

### 5. Verify Setup

```bash
# Health check
curl http://localhost:3001/health

# Should return:
# {"status":"healthy","database":"connected","cache":"connected"}
```

## Quick API Test

### Create a Learner

```bash
curl -X POST http://localhost:3001/api/v1/learners \
  -H "Content-Type: application/json" \
  -d '{
    "externalId": "user-123",
    "profile": {
      "l1Background": "Indonesian",
      "goals": ["business-communication"],
      "interests": ["technology", "cooking"]
    }
  }'
```

### Get Curriculum Modules

```bash
curl http://localhost:3001/api/v1/curriculum/modules
```

### Create a Session

```bash
curl -X POST http://localhost:3001/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "learnerId": "LEARNER_ID_FROM_ABOVE",
    "scenarioId": "1A-1"
  }'
```

## API Documentation

Access Swagger UI at: `http://localhost:3001/api-docs`

## Project Structure

```
heritagey-vox/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seeds/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── config/
│   ├── modules/
│   │   ├── learner/
│   │   ├── memory/
│   │   ├── curriculum/
│   │   ├── session/
│   │   └── assessment/
│   ├── shared/
│   └── routes.ts
├── tests/
├── specs/
├── memory/
├── templates/
└── package.json
```

## Next Steps

1. **Implement Phase 1 tasks** from `specs/001-curriculum-engine/tasks.md`
2. **Review the spec** in `specs/001-curriculum-engine/spec.md`
3. **Check research notes** in `specs/001-curriculum-engine/research.md`

## Integration with Heritagey

This service integrates with:

1. **Heritagey Main Backend** (`/Users/rrudiyanto/Desktop/AI/project/heritagey/backend`)
   - User authentication (JWT)
   - User IDs (externalId mapping)

2. **Heritagey Frontend**
   - Dashboard for learner progress
   - Settings management

3. **AI Voice Agent**
   - Primary consumer of session APIs
   - Real-time context and feedback


