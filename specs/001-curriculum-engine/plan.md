# British English Curriculum Engine - Implementation Plan

## Implementation Phases

### Phase 1: Project Foundation (Week 1)

**Duration**: 5 days

**Objectives**:

- Establish project structure and tooling
- Set up database schema
- Create base API infrastructure

**Deliverables**:

1. TypeScript Node.js project with Express
2. Prisma schema with all core entities
3. Database migrations applied
4. Health check and base routes
5. Swagger documentation setup

**Tasks**:

- [ ] Initialize Node.js project with TypeScript
- [ ] Configure ESLint, Prettier, Jest
- [ ] Set up Prisma with PostgreSQL
- [ ] Create database schema for Learner, LearnerMemory, Module, Scenario
- [ ] Create Session, ErrorLog, Assessment schemas
- [ ] Run initial migrations
- [ ] Set up Express app with middleware
- [ ] Configure Swagger/OpenAPI
- [ ] Create health check endpoint
- [ ] Set up environment configuration

---

### Phase 2: Curriculum Content System (Week 2)

**Duration**: 5 days

**Objectives**:

- Build curriculum content management
- Seed all curriculum data from spec
- Create curriculum APIs

**Deliverables**:

1. Complete curriculum seeding (4 modules, 16 sub-modules, all scenarios)
2. Curriculum CRUD APIs
3. Pathway management system

**Tasks**:

- [ ] Create Module service and controller
- [ ] Create Scenario service and controller
- [ ] Create Pathway service and controller
- [ ] Build seed data transformer for curriculum spec
- [ ] Seed Module 1: Foundation (A2-B1) content
- [ ] Seed Module 2: Intermediate (B1-B2) content
- [ ] Seed Module 3: Advanced (B2-C1) content
- [ ] Seed Module 4: Mastery (C1-C2) content
- [ ] Seed all 5 adaptive pathways
- [ ] Create curriculum retrieval APIs
- [ ] Add caching layer for curriculum content
- [ ] Write integration tests for curriculum APIs

---

### Phase 3: Learner Memory System (Week 3)

**Duration**: 5 days

**Objectives**:

- Implement learner memory persistence
- Build error pattern tracking
- Create preference learning system

**Deliverables**:

1. Learner registration and profile management
2. Memory CRUD with full context retrieval
3. Error pattern analysis engine
4. Preference tracking system

**Tasks**:

- [ ] Create Learner service and controller
- [ ] Create LearnerMemory service with JSON field handling
- [ ] Implement progress tracking logic
- [ ] Build error pattern recording API
- [ ] Create error pattern analysis algorithms
- [ ] Implement trend detection for error patterns
- [ ] Build preference learning from session data
- [ ] Create L1-specific challenge predictions
- [ ] Implement memory consolidation (periodic cleanup)
- [ ] Write unit tests for memory logic
- [ ] Write integration tests for learner APIs

---

### Phase 4: Session Management (Week 4)

**Duration**: 5 days

**Objectives**:

- Build session lifecycle management
- Implement context handoff for voice agent
- Create real-time event tracking

**Deliverables**:

1. Session creation with full context loading
2. Session event recording
3. Session completion with memory updates
4. Redis-backed session caching

**Tasks**:

- [ ] Set up Redis connection
- [ ] Create Session service and controller
- [ ] Implement session creation with context assembly
- [ ] Build context retrieval API for voice agent
- [ ] Create event recording endpoint
- [ ] Implement real-time error tracking integration
- [ ] Build session completion flow
- [ ] Implement memory update on session end
- [ ] Add session recovery for interrupted sessions
- [ ] Create session timeout handling
- [ ] Write integration tests for session flow

---

### Phase 5: Adaptive Learning Engine (Week 5)

**Duration**: 5 days

**Objectives**:

- Build adaptive difficulty system
- Implement progression recommendations
- Create assessment framework

**Deliverables**:

1. Difficulty adjustment algorithms
2. Progression decision engine
3. Informal and milestone assessment APIs

**Tasks**:

- [ ] Create Assessment service and controller
- [ ] Build fluency scoring algorithm
- [ ] Build accuracy scoring algorithm
- [ ] Implement appropriacy evaluation
- [ ] Create confidence indicator calculation
- [ ] Build progression recommendation engine
- [ ] Implement competency threshold checking
- [ ] Create review area identification
- [ ] Build informal assessment recording
- [ ] Build milestone assessment workflow
- [ ] Write unit tests for scoring algorithms
- [ ] Write integration tests for assessment flow

---

### Phase 6: Integration & Polish (Week 6)

**Duration**: 5 days

**Objectives**:

- Complete API documentation
- Performance optimization
- Integration testing with voice agent

**Deliverables**:

1. Complete OpenAPI documentation
2. Performance benchmarks met
3. Integration test suite
4. Deployment configuration

**Tasks**:

- [ ] Complete Swagger documentation for all endpoints
- [ ] Add request validation with Zod
- [ ] Implement rate limiting
- [ ] Add query optimization for common patterns
- [ ] Create performance benchmark suite
- [ ] Verify < 200ms response times
- [ ] Build end-to-end integration tests
- [ ] Create Docker configuration
- [ ] Set up CI/CD pipeline
- [ ] Create deployment documentation
- [ ] Final security review

---

## Technical Approach

### Architecture Decisions

1. **Express + TypeScript**: Chosen for compatibility with existing Heritagey backend and team familiarity

2. **Prisma ORM**: Type-safe database access, great migration tooling, matches existing backend

3. **JSON columns for flexible data**: LearnerMemory, errorPatterns, preferences stored as JSON for schema flexibility

4. **Redis for session cache**: Active sessions cached for sub-100ms access during voice agent interactions

5. **Module-based code organization**: Each domain (learner, curriculum, session, assessment) in separate module folders

### Key Components

1. **LearnerMemoryService**: Core engine for memory persistence, retrieval, and analysis
2. **ErrorPatternAnalyzer**: Algorithm for detecting patterns and trends in learner errors
3. **ProgressionEngine**: Decision logic for level advancement and review recommendations
4. **SessionOrchestrator**: Manages session lifecycle and context assembly
5. **CurriculumRepository**: Efficient retrieval and caching of curriculum content

### File Structure

```
src/
├── app.ts
├── index.ts
├── config/
│   ├── database.ts
│   ├── redis.ts
│   └── swagger.ts
├── modules/
│   ├── learner/
│   │   ├── learner.controller.ts
│   │   ├── learner.service.ts
│   │   ├── learner.routes.ts
│   │   └── learner.types.ts
│   ├── memory/
│   │   ├── memory.controller.ts
│   │   ├── memory.service.ts
│   │   ├── error-pattern.analyzer.ts
│   │   └── memory.types.ts
│   ├── curriculum/
│   │   ├── curriculum.controller.ts
│   │   ├── curriculum.service.ts
│   │   ├── curriculum.routes.ts
│   │   └── curriculum.types.ts
│   ├── session/
│   │   ├── session.controller.ts
│   │   ├── session.service.ts
│   │   ├── session.routes.ts
│   │   └── session.types.ts
│   └── assessment/
│       ├── assessment.controller.ts
│       ├── assessment.service.ts
│       ├── progression.engine.ts
│       └── assessment.types.ts
├── shared/
│   ├── database/
│   │   └── prisma.ts
│   ├── cache/
│   │   └── redis.ts
│   ├── middleware/
│   │   └── auth.ts
│   └── types/
│       └── common.ts
└── routes.ts
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Curriculum spec changes during implementation | Medium | Medium | Design flexible JSON schemas; use feature flags |
| Voice agent integration complexity | Medium | High | Early mock integration; detailed API contracts |
| Error pattern analysis accuracy | Low | Medium | Start simple; iterate with real learner data |
| Performance under load | Low | High | Cache aggressively; benchmark early; optimize queries |
| Database schema changes post-launch | Medium | Medium | Use JSON fields for evolving data; careful migration planning |

---

## Dependencies

### Upstream Dependencies (must be available)

- PostgreSQL database (local dev + hosted)
- Redis instance (local dev + hosted)
- Heritagey main backend running (for user context)

### Downstream Dependencies (we provide to)

- AI Voice Agent (will consume our APIs)
- Heritagey Frontend (will consume analytics APIs)

---

## Testing Strategy

### Unit Tests

- LearnerMemoryService: memory CRUD, error pattern analysis
- ProgressionEngine: advancement decisions, review recommendations
- ErrorPatternAnalyzer: pattern detection, trend calculation
- Scoring algorithms: fluency, accuracy, appropriacy

### Integration Tests

- Full session flow: create → events → complete → memory update
- Curriculum seeding and retrieval
- Learner lifecycle: register → sessions → progression
- Assessment flow: informal → milestone → advancement

### Performance Tests

- Session creation under load (1000 concurrent)
- Memory retrieval latency (target: < 100ms)
- Curriculum content caching effectiveness

---

## Definition of Done

- [ ] All Phase 1-6 tasks completed
- [ ] 90%+ test coverage on core modules
- [ ] All APIs documented in Swagger
- [ ] Performance benchmarks passing
- [ ] Security review completed
- [ ] Docker deployment tested
- [ ] CI/CD pipeline functional
- [ ] Integration with voice agent verified


