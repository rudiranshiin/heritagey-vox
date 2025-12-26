# Heritagey Vox - AI Agent Guidance

## Project Overview

**Heritagey Vox** is a context-engineered British English curriculum backend service that powers an AI voice agent for personalized language learning. The service maintains learner memory, manages curriculum content, orchestrates learning sessions, and provides adaptive feedback.

## Key Documentation

Before working on this project, read these files:

1. **Constitution**: `memory/constitution.md` - Core principles and constraints
2. **Specification**: `specs/001-curriculum-engine/spec.md` - Feature requirements
3. **Implementation Plan**: `specs/001-curriculum-engine/plan.md` - Development phases
4. **Tasks**: `specs/001-curriculum-engine/tasks.md` - Actionable task breakdown
5. **Data Model**: `specs/001-curriculum-engine/data-model.md` - Database schema
6. **Research**: `specs/001-curriculum-engine/research.md` - Technical decisions and algorithms

## Architecture

### Tech Stack

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis for session state
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest with supertest

### Module Structure

```
src/modules/
├── learner/        # Learner registration and profile
├── memory/         # Learner memory and error patterns
├── curriculum/     # Modules, scenarios, pathways
├── session/        # Session lifecycle and context
└── assessment/     # Scoring and progression
```

### Key Patterns

1. **Service-Controller-Routes**: Each module follows this pattern
2. **JSON Columns**: Flexible data in `LearnerMemory`, `errorPatterns`, etc.
3. **Context Assembly**: Sessions load full learner context for voice agent
4. **Event Sourcing Light**: Session events logged for replay and analysis

## Development Commands

```bash
# Development
npm run dev              # Start with hot reload
npm run build            # Compile TypeScript
npm start                # Run production build

# Database
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations
npx prisma db seed       # Seed curriculum data
npx prisma studio        # Open Prisma Studio

# Testing
npm test                 # Run all tests
npm run test:unit        # Run unit tests
npm run test:integration # Run integration tests
npm run test:coverage    # Run with coverage

# Linting
npm run lint             # ESLint
npm run format           # Prettier
```

## API Endpoints Overview

### Learner APIs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/learners` | Create learner |
| GET | `/api/v1/learners/:id` | Get learner |
| GET | `/api/v1/learners/:id/memory` | Get learner memory |
| PATCH | `/api/v1/learners/:id/memory` | Update memory |
| POST | `/api/v1/learners/:id/errors` | Log error |

### Curriculum APIs

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/curriculum/modules` | List all modules |
| GET | `/api/v1/curriculum/modules/:id/scenarios` | Get scenarios |
| GET | `/api/v1/curriculum/scenarios/:id` | Get scenario detail |
| GET | `/api/v1/curriculum/pathways/:id` | Get pathway |

### Session APIs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/sessions` | Create session |
| GET | `/api/v1/sessions/:id/context` | Get session context |
| POST | `/api/v1/sessions/:id/events` | Record event |
| POST | `/api/v1/sessions/:id/complete` | Complete session |

### Assessment APIs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/assessments/informal` | Record informal assessment |
| POST | `/api/v1/assessments/milestone` | Record milestone assessment |
| GET | `/api/v1/learners/:id/progression` | Get progression recommendation |

## Key Implementation Notes

### Learner Memory Structure

```typescript
interface LearnerMemory {
  progressData: {
    completedScenarios: string[];
    milestones: string[];
    totalSessionTime: number;
  };
  errorPatterns: Array<{
    category: string;
    frequency: number;
    trend: 'improving' | 'stable' | 'regressing';
  }>;
  preferences: {
    formalityLevel: 'formal' | 'moderate' | 'casual';
    engagingTopics: string[];
    pace: 'fast' | 'moderate' | 'slow';
  };
  profile: {
    l1Background: string;
    goals: string[];
    interests: string[];
  };
}
```

### Session Context for Voice Agent

When a session is created, the API returns a comprehensive context package:

```typescript
interface SessionContext {
  learnerMemory: LearnerMemory;
  scenario: Scenario;
  recommendations: {
    focusAreas: string[];
    errorPatternsToWatch: string[];
    culturalPointsToReinforce: string[];
  };
}
```

### Error Pattern Analysis

Errors are weighted by: `frequency * recencyDecay * severityMultiplier`

- Track improving/stable/regressing trends
- Identify L1-specific patterns
- Suggest targeted remediation

## Integration Points

### With Heritagey Main Backend

- **Authentication**: JWT tokens validated against main backend
- **User Mapping**: `externalId` links to main user system

### With AI Voice Agent

- **Session Creation**: Agent calls `/sessions` to start
- **Context Loading**: Agent uses `/sessions/:id/context`
- **Event Streaming**: Agent posts to `/sessions/:id/events`
- **Completion**: Agent calls `/sessions/:id/complete`

### With Heritagey Frontend

- **Analytics**: Dashboards consume progression data
- **Settings**: User preferences synced via memory APIs

## Testing Guidelines

### Unit Tests

Focus on:
- `ErrorPatternAnalyzer` algorithms
- `ProgressionEngine` decision logic
- Scoring algorithms (fluency, accuracy, appropriacy)

### Integration Tests

Focus on:
- Full session flow (create → events → complete)
- Memory persistence and retrieval
- Curriculum content seeding and queries

## Performance Targets

- Session creation: < 200ms
- Memory retrieval: < 100ms
- Event recording: < 50ms
- Curriculum queries: < 50ms (cached)

## Security Considerations

- All endpoints require valid JWT
- Learner data isolated by learner ID
- No PII stored beyond what's in memory JSON
- Audit logging for memory updates

## Current Status

Check `specs/001-curriculum-engine/tasks.md` for current implementation progress.

## Questions?

Reference the research document at `specs/001-curriculum-engine/research.md` for algorithm details, technology decisions, and open questions.


