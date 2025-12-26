# British English Curriculum Engine - Task Breakdown

## Legend

- `[P]` - Can be executed in parallel with other `[P]` tasks
- `[S]` - Sequential, must complete before next task
- `[C]` - Checkpoint - validate before proceeding

---

## Phase 1: Project Foundation

### Setup Tasks

- [ ] `[S]` Initialize Node.js project
  - File: `package.json`
  - Commands: `npm init`, add dependencies

- [ ] `[P]` Configure TypeScript
  - File: `tsconfig.json`
  - Description: Strict mode, path aliases, ES2022 target

- [ ] `[P]` Configure ESLint and Prettier
  - Files: `.eslintrc.js`, `.prettierrc`
  - Description: Consistent code style

- [ ] `[P]` Configure Jest
  - File: `jest.config.js`
  - Description: TypeScript support, coverage thresholds

### Database Setup

- [ ] `[S]` Initialize Prisma
  - File: `prisma/schema.prisma`
  - Command: `npx prisma init`

- [ ] `[S]` Create Learner and LearnerMemory models
  - File: `prisma/schema.prisma`
  - Description: Core learner entities with JSON fields

- [ ] `[P]` Create Module and Scenario models
  - File: `prisma/schema.prisma`
  - Description: Curriculum content entities

- [ ] `[P]` Create Session and ErrorLog models
  - File: `prisma/schema.prisma`
  - Description: Session tracking entities

- [ ] `[P]` Create Assessment and Pathway models
  - File: `prisma/schema.prisma`
  - Description: Assessment and pathway entities

- [ ] `[S]` Generate and run initial migration
  - Command: `npx prisma migrate dev --name init`

### Application Setup

- [ ] `[S]` Create Express application entry
  - Files: `src/app.ts`, `src/index.ts`
  - Description: Express setup with middleware

- [ ] `[P]` Create database connection utility
  - File: `src/shared/database/prisma.ts`
  - Description: Prisma client singleton

- [ ] `[P]` Create Redis connection utility
  - File: `src/shared/cache/redis.ts`
  - Description: Redis client with reconnection

- [ ] `[P]` Configure Swagger
  - File: `src/config/swagger.ts`
  - Description: OpenAPI documentation setup

- [ ] `[S]` Create health check endpoint
  - File: `src/routes.ts`
  - Description: /health with db and cache checks

### Checkpoint

- [ ] `[C]` Phase 1 Validation
  - Database migrations applied
  - Health endpoint returns 200
  - Swagger UI accessible at /api-docs

---

## Phase 2: Curriculum Content System

### Module Management

- [ ] `[S]` Create Module types
  - File: `src/modules/curriculum/curriculum.types.ts`
  - Description: Module and Scenario interfaces

- [ ] `[S]` Create Curriculum service
  - File: `src/modules/curriculum/curriculum.service.ts`
  - Description: CRUD operations for modules and scenarios

- [ ] `[S]` Create Curriculum controller
  - File: `src/modules/curriculum/curriculum.controller.ts`
  - Description: HTTP handlers for curriculum APIs

- [ ] `[S]` Create Curriculum routes
  - File: `src/modules/curriculum/curriculum.routes.ts`
  - Description: Route definitions

### Seed Data Creation

- [ ] `[S]` Create seed data structure
  - File: `prisma/seeds/curriculum/index.ts`
  - Description: Seed orchestration

- [ ] `[P]` Seed Module 1A: Essential Daily Interactions
  - File: `prisma/seeds/curriculum/module-1a.ts`
  - Description: Greetings, shopping, transport scenarios

- [ ] `[P]` Seed Module 1B: Building Social Connections
  - File: `prisma/seeds/curriculum/module-1b.ts`
  - Description: Introductions, hobbies, invitations

- [ ] `[P]` Seed Module 1C: Practical Life Management
  - File: `prisma/seeds/curriculum/module-1c.ts`
  - Description: Housing, healthcare, complaints

- [ ] `[P]` Seed Module 1D: Expanding Conversational Range
  - File: `prisma/seeds/curriculum/module-1d.ts`
  - Description: News, culture, opinions

- [ ] `[P]` Seed Module 2A: Mastering Idioms and Expressions
  - File: `prisma/seeds/curriculum/module-2a.ts`
  - Description: Colloquialisms, banter, slang

- [ ] `[P]` Seed Module 2B: Professional and Academic Communication
  - File: `prisma/seeds/curriculum/module-2b.ts`
  - Description: Interviews, meetings, academic

- [ ] `[P]` Seed Module 2C: Deep Cultural Immersion
  - File: `prisma/seeds/curriculum/module-2c.ts`
  - Description: History, politics, sports

- [ ] `[P]` Seed Module 2D: Spontaneous Communication Mastery
  - File: `prisma/seeds/curriculum/module-2d.ts`
  - Description: Impromptu, crisis, adaptation

- [ ] `[P]` Seed Module 3A-3D: Advanced content
  - Files: `prisma/seeds/curriculum/module-3*.ts`
  - Description: Sophisticated expression modules

- [ ] `[P]` Seed Module 4A-4C: Mastery content
  - Files: `prisma/seeds/curriculum/module-4*.ts`
  - Description: Native-like proficiency modules

- [ ] `[P]` Seed Adaptive Pathways
  - File: `prisma/seeds/curriculum/pathways.ts`
  - Description: Business, Academic, Social, Relocation, Heritage

- [ ] `[S]` Run seed script
  - Command: `npx prisma db seed`

### Caching Layer

- [ ] `[S]` Create curriculum cache service
  - File: `src/modules/curriculum/curriculum.cache.ts`
  - Description: Redis caching for hot content

### Testing

- [ ] `[P]` Unit tests for Curriculum service
  - File: `tests/unit/curriculum/curriculum.service.test.ts`

- [ ] `[P]` Integration tests for Curriculum APIs
  - File: `tests/integration/curriculum/curriculum.test.ts`

### Checkpoint

- [ ] `[C]` Phase 2 Validation
  - All modules and scenarios seeded
  - GET /api/v1/curriculum/modules returns data
  - Cache hit rate > 90% for repeated reads

---

## Phase 3: Learner Memory System

### Learner Management

- [ ] `[S]` Create Learner types
  - File: `src/modules/learner/learner.types.ts`
  - Description: Learner and LearnerMemory interfaces

- [ ] `[S]` Create Learner service
  - File: `src/modules/learner/learner.service.ts`
  - Description: Learner CRUD and memory management

- [ ] `[S]` Create Learner controller
  - File: `src/modules/learner/learner.controller.ts`
  - Description: HTTP handlers

- [ ] `[S]` Create Learner routes
  - File: `src/modules/learner/learner.routes.ts`
  - Description: Route definitions

### Memory System

- [ ] `[S]` Create Memory service
  - File: `src/modules/memory/memory.service.ts`
  - Description: Memory CRUD with JSON handling

- [ ] `[S]` Create ErrorPattern analyzer
  - File: `src/modules/memory/error-pattern.analyzer.ts`
  - Description: Pattern detection and trend analysis

- [ ] `[S]` Create Preference tracker
  - File: `src/modules/memory/preference.tracker.ts`
  - Description: Learn preferences from session data

- [ ] `[S]` Create L1 challenge predictor
  - File: `src/modules/memory/l1-predictor.ts`
  - Description: L1-specific challenge anticipation

### Error Logging

- [ ] `[S]` Create Error log service
  - File: `src/modules/memory/error-log.service.ts`
  - Description: Error recording and retrieval

- [ ] `[S]` Create trend detection algorithm
  - File: `src/modules/memory/trend-detector.ts`
  - Description: Rolling window analysis

### Testing

- [ ] `[P]` Unit tests for Memory service
  - File: `tests/unit/memory/memory.service.test.ts`

- [ ] `[P]` Unit tests for ErrorPattern analyzer
  - File: `tests/unit/memory/error-pattern.analyzer.test.ts`

- [ ] `[P]` Integration tests for Learner APIs
  - File: `tests/integration/learner/learner.test.ts`

### Checkpoint

- [ ] `[C]` Phase 3 Validation
  - Learner CRUD works
  - Error patterns tracked and analyzed
  - Trend detection produces sensible results

---

## Phase 4: Session Management

### Session Core

- [ ] `[S]` Create Session types
  - File: `src/modules/session/session.types.ts`
  - Description: Session and event interfaces

- [ ] `[S]` Create Session service
  - File: `src/modules/session/session.service.ts`
  - Description: Session lifecycle management

- [ ] `[S]` Create Session controller
  - File: `src/modules/session/session.controller.ts`
  - Description: HTTP handlers

- [ ] `[S]` Create Session routes
  - File: `src/modules/session/session.routes.ts`
  - Description: Route definitions

### Context Assembly

- [ ] `[S]` Create Context assembler
  - File: `src/modules/session/context.assembler.ts`
  - Description: Build context package for voice agent

- [ ] `[S]` Create Session cache
  - File: `src/modules/session/session.cache.ts`
  - Description: Redis-backed active session state

### Event Handling

- [ ] `[S]` Create Event processor
  - File: `src/modules/session/event.processor.ts`
  - Description: Process voice agent events

- [ ] `[S]` Create real-time error integration
  - File: `src/modules/session/realtime-error.handler.ts`
  - Description: Immediate error pattern updates

### Session Lifecycle

- [ ] `[S]` Create Session recovery handler
  - File: `src/modules/session/recovery.handler.ts`
  - Description: Handle interrupted sessions

- [ ] `[S]` Create Session completion flow
  - File: `src/modules/session/completion.handler.ts`
  - Description: Persist memory updates on completion

### Testing

- [ ] `[P]` Unit tests for Session service
  - File: `tests/unit/session/session.service.test.ts`

- [ ] `[P]` Unit tests for Context assembler
  - File: `tests/unit/session/context.assembler.test.ts`

- [ ] `[P]` Integration tests for Session flow
  - File: `tests/integration/session/session-flow.test.ts`

### Checkpoint

- [ ] `[C]` Phase 4 Validation
  - Session create → events → complete works
  - Context assembly includes all required data
  - Memory updates persist on completion

---

## Phase 5: Adaptive Learning Engine

### Assessment Core

- [ ] `[S]` Create Assessment types
  - File: `src/modules/assessment/assessment.types.ts`
  - Description: Assessment and score interfaces

- [ ] `[S]` Create Assessment service
  - File: `src/modules/assessment/assessment.service.ts`
  - Description: Assessment CRUD

- [ ] `[S]` Create Assessment controller
  - File: `src/modules/assessment/assessment.controller.ts`
  - Description: HTTP handlers

### Scoring Algorithms

- [ ] `[S]` Create Fluency scorer
  - File: `src/modules/assessment/scorers/fluency.scorer.ts`
  - Description: Hesitation and flow analysis

- [ ] `[P]` Create Accuracy scorer
  - File: `src/modules/assessment/scorers/accuracy.scorer.ts`
  - Description: Error rate calculation

- [ ] `[P]` Create Appropriacy scorer
  - File: `src/modules/assessment/scorers/appropriacy.scorer.ts`
  - Description: Register and cultural fit

- [ ] `[P]` Create Confidence scorer
  - File: `src/modules/assessment/scorers/confidence.scorer.ts`
  - Description: Risk-taking and self-correction

### Progression Engine

- [ ] `[S]` Create Progression engine
  - File: `src/modules/assessment/progression.engine.ts`
  - Description: Advancement decision logic

- [ ] `[S]` Create Competency threshold checker
  - File: `src/modules/assessment/competency.checker.ts`
  - Description: Level requirements validation

- [ ] `[S]` Create Review recommender
  - File: `src/modules/assessment/review.recommender.ts`
  - Description: Weak area identification

### Testing

- [ ] `[P]` Unit tests for scorers
  - Files: `tests/unit/assessment/scorers/*.test.ts`

- [ ] `[P]` Unit tests for Progression engine
  - File: `tests/unit/assessment/progression.engine.test.ts`

- [ ] `[P]` Integration tests for Assessment flow
  - File: `tests/integration/assessment/assessment.test.ts`

### Checkpoint

- [ ] `[C]` Phase 5 Validation
  - Scoring algorithms produce sensible scores
  - Progression recommendations are accurate
  - Milestone assessments work end-to-end

---

## Phase 6: Integration & Polish

### Documentation

- [ ] `[S]` Complete OpenAPI specs for all endpoints
  - File: `src/config/swagger.ts` + inline annotations
  - Description: Full Swagger documentation

- [ ] `[P]` Create API examples in documentation
  - Files: Various controller files
  - Description: Request/response examples

### Validation & Security

- [ ] `[S]` Add Zod schemas for all requests
  - Files: Various `*.types.ts` files
  - Description: Runtime validation

- [ ] `[P]` Add rate limiting
  - File: `src/shared/middleware/rate-limit.ts`
  - Description: Protect against abuse

- [ ] `[P]` Add authentication middleware
  - File: `src/shared/middleware/auth.ts`
  - Description: JWT validation

### Performance

- [ ] `[S]` Add query optimization
  - Files: Various service files
  - Description: Add indexes, optimize N+1

- [ ] `[S]` Create performance benchmark suite
  - File: `tests/performance/benchmarks.ts`
  - Description: Verify latency targets

### Deployment

- [ ] `[P]` Create Dockerfile
  - File: `Dockerfile`
  - Description: Multi-stage build

- [ ] `[P]` Create docker-compose
  - File: `docker-compose.yml`
  - Description: Local dev environment

- [ ] `[S]` Create CI/CD pipeline
  - File: `.github/workflows/ci.yml`
  - Description: Test, build, deploy

- [ ] `[P]` Create deployment documentation
  - File: `DEPLOYMENT.md`
  - Description: Deployment instructions

### Final Testing

- [ ] `[S]` End-to-end integration tests
  - File: `tests/e2e/full-flow.test.ts`
  - Description: Complete learner journey

- [ ] `[S]` Security review
  - Description: Manual security audit

### Checkpoint

- [ ] `[C]` Phase 6 Validation - FINAL
  - All APIs documented in Swagger
  - Performance benchmarks passing (< 200ms)
  - Security review completed
  - Docker deployment tested
  - CI/CD pipeline functional

---

## Final Validation

- [ ] All unit tests pass (target: 90% coverage)
- [ ] All integration tests pass
- [ ] API documentation complete
- [ ] Performance benchmarks met (session creation < 200ms)
- [ ] Code review approved
- [ ] Voice agent integration verified


