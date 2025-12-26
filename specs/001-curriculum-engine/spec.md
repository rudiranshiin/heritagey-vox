# British English Curriculum Engine Specification

## Overview

The Curriculum Engine is the core backend service for Heritagey Vox, providing context-engineered British English learning experiences through an AI voice agent. It manages learner memory, curriculum content, session orchestration, and adaptive feedback—all designed for conversational learning.

## User Stories

### Primary: Learner Experience

**As a learner**, I want the AI voice agent to remember my progress, mistakes, and preferences so that every session picks up where I left off and adapts to my needs.

**As a learner**, I want culturally authentic British English content at my level so that I can build real-world communication skills.

**As a learner**, I want personalized feedback on my error patterns so that I can improve efficiently.

### Secondary: Voice Agent Integration

**As the AI voice agent**, I need session context and curriculum content so that I can conduct natural conversations with learners.

**As the AI voice agent**, I need learner memory data so that I can reference past sessions and provide personalized responses.

### Tertiary: Analytics & Admin

**As a product manager**, I want learning analytics data so that I can understand learner progress and optimize content.

**As a content administrator**, I want to manage curriculum content so that I can update scenarios and cultural insights.

---

## Functional Requirements

### FR1: Learner Memory System

The system MUST maintain persistent memory of each learner including:

1. **Progress Tracking**
   - Current module and level (A2-B1, B1-B2, B2-C1, C1-C2)
   - Completed scenarios and success criteria
   - Time spent per module/scenario
   - Milestone achievements

2. **Error Pattern Recognition**
   - Tracked error categories (grammar, vocabulary, pronunciation, cultural)
   - Frequency and recency of each error type
   - Correlation with specific scenarios or topics
   - Improvement trends over time

3. **Preference Learning**
   - Preferred formality level
   - Engaging vs. boring topics (tracked from session metrics)
   - Pace preferences (fast/moderate/slow progression)
   - Learning style indicators

4. **Personal Context**
   - L1 background (for L1-specific challenge anticipation)
   - Professional/academic field (for content personalization)
   - Learning goals and timeline
   - Interests and hobbies (for scenario personalization)

### FR2: Curriculum Content Management

The system MUST structure curriculum content per the British English Fluency Roadmap:

1. **Module Structure** (4 modules, 16 sub-modules)
   - Module 1: Foundation (A2-B1) - 4 sub-modules
   - Module 2: Intermediate (B1-B2) - 4 sub-modules
   - Module 3: Advanced (B2-C1) - 4 sub-modules
   - Module 4: Mastery (C1-C2) - 4 sub-modules

2. **Scenario Content**
   - Conversational scenarios with context
   - Practice activities with AI agent prompts
   - Cultural insights and explanations
   - Grammar in context notes
   - Common mistakes to address

3. **Adaptive Pathways**
   - Business Professional pathway
   - Academic Learner pathway
   - Social/Cultural pathway
   - Relocation Preparation pathway
   - Heritage/Family pathway

### FR3: Session Management

The system MUST orchestrate learning sessions:

1. **Session Lifecycle**
   - Session creation with learner context loading
   - Real-time context updates during session
   - Session completion with memory persistence
   - Session recovery for interrupted sessions

2. **Context Handoff**
   - Current scenario and objectives
   - Relevant learner memory for personalization
   - Recommended conversation flows
   - Error patterns to watch for
   - Cultural points to reinforce

3. **Feedback Integration**
   - Accept feedback events from voice agent
   - Update error patterns in real-time
   - Adjust session recommendations mid-session
   - Log conversation quality metrics

### FR4: Adaptive Difficulty System

The system MUST adjust content difficulty based on:

1. **Performance Metrics**
   - Error rate per session
   - Self-correction frequency
   - Fluency indicators (hesitation patterns)
   - Cultural appropriateness scores

2. **Progression Logic**
   - Competency thresholds for advancement
   - Automatic difficulty adjustment within sessions
   - Module progression recommendations
   - Review recommendations for weak areas

### FR5: Assessment Framework

The system MUST support continuous assessment:

1. **Informal Assessment** (every session)
   - Fluency metrics
   - Accuracy tracking
   - Appropriacy evaluation
   - Confidence indicators

2. **Milestone Assessment** (per module)
   - Extended conversation evaluation
   - Scenario-based competency checks
   - Self-assessment integration
   - Progression decision support

---

## API Endpoints

### Learner Memory APIs

#### GET /api/v1/learners/{learnerId}/memory

Retrieves complete learner memory for context loading.

```json
{
  "learnerId": "uuid",
  "currentLevel": "B1",
  "currentModule": 2,
  "currentSubModule": "2B",
  "progress": {
    "completedScenarios": ["1A-1", "1A-2", "1B-1"],
    "milestones": ["module-1-complete"],
    "totalSessionTime": 3600
  },
  "errorPatterns": [
    {
      "category": "phrasal-verbs",
      "frequency": 12,
      "lastOccurred": "2025-01-15T10:00:00Z",
      "trend": "improving"
    }
  ],
  "preferences": {
    "formalityLevel": "moderate",
    "engagingTopics": ["football", "food"],
    "pace": "moderate"
  },
  "profile": {
    "l1Background": "Indonesian",
    "field": "technology",
    "goals": ["business-communication"],
    "interests": ["cooking", "travel"]
  }
}
```

#### PATCH /api/v1/learners/{learnerId}/memory

Updates specific memory fields (partial update).

#### POST /api/v1/learners/{learnerId}/errors

Records a new error occurrence.

```json
{
  "category": "phrasal-verbs",
  "context": "Said 'put up' instead of 'put up with'",
  "scenarioId": "2A-3",
  "corrected": true
}
```

### Curriculum APIs

#### GET /api/v1/curriculum/modules

Returns all modules with structure.

#### GET /api/v1/curriculum/modules/{moduleId}/scenarios

Returns scenarios for a module.

#### GET /api/v1/curriculum/scenarios/{scenarioId}

Returns complete scenario content.

```json
{
  "id": "1A-1",
  "module": "1A",
  "title": "Greeting People Appropriately",
  "level": "A2-B1",
  "conversationalContext": "Meeting someone at a British workplace",
  "objectives": [
    "Use appropriate greetings for formal/informal contexts",
    "Understand British personal space norms"
  ],
  "practiceActivities": [
    {
      "type": "role-play",
      "prompt": "You're meeting a new colleague on your first day at a London office",
      "expectedBehaviors": ["Appropriate greeting", "Small talk attempt"]
    }
  ],
  "culturalInsights": [
    {
      "topic": "Personal Space",
      "content": "British people typically maintain about arm's length distance..."
    }
  ],
  "grammarNotes": [
    {
      "topic": "Modal Verbs for Politeness",
      "content": "Use 'could' and 'would' for polite requests..."
    }
  ],
  "commonMistakes": [
    {
      "mistake": "Being too enthusiastic in greetings",
      "correction": "British greetings are typically understated"
    }
  ],
  "successCriteria": [
    "Uses appropriate greeting for context",
    "Demonstrates awareness of formality levels"
  ]
}
```

#### GET /api/v1/curriculum/pathways/{pathwayId}

Returns pathway-specific content recommendations.

### Session APIs

#### POST /api/v1/sessions

Creates a new learning session.

```json
{
  "learnerId": "uuid",
  "type": "practice",
  "scenarioId": "1A-1",
  "metadata": {
    "voiceAgentVersion": "1.0.0"
  }
}
```

Response includes full context for voice agent:

```json
{
  "sessionId": "uuid",
  "context": {
    "learnerMemory": { /* abbreviated memory */ },
    "scenario": { /* full scenario content */ },
    "recommendations": {
      "focusAreas": ["phrasal-verbs"],
      "errorPatternsToWatch": ["over-formality"],
      "culturalPointsToReinforce": ["British understatement"]
    }
  }
}
```

#### GET /api/v1/sessions/{sessionId}/context

Retrieves current session context (for reconnection).

#### POST /api/v1/sessions/{sessionId}/events

Records session events from voice agent.

```json
{
  "type": "error_detected",
  "data": {
    "category": "grammar",
    "subcategory": "tense",
    "context": "Used simple past instead of present perfect",
    "correctionProvided": true
  }
}
```

#### POST /api/v1/sessions/{sessionId}/complete

Marks session as complete and persists updates.

```json
{
  "metrics": {
    "fluencyScore": 7.5,
    "accuracyScore": 8.0,
    "confidenceScore": 6.5,
    "engagementScore": 9.0
  },
  "feedback": {
    "overallQuality": 4,
    "learnerSatisfaction": 5
  }
}
```

### Assessment APIs

#### POST /api/v1/assessments/informal

Records informal assessment data.

#### POST /api/v1/assessments/milestone

Records milestone assessment results.

#### GET /api/v1/learners/{learnerId}/progression

Returns progression recommendations.

```json
{
  "currentLevel": "B1",
  "readyForAdvancement": true,
  "recommendations": [
    {
      "action": "advance_to_2C",
      "confidence": 0.85,
      "reasoning": "Completed 90% of 2B scenarios with avg score 8.2"
    }
  ],
  "areasForReview": [
    {
      "topic": "phrasal-verbs",
      "suggestedScenarios": ["2A-3", "2B-2"]
    }
  ]
}
```

---

## Data Model

### Core Entities

#### Learner

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary identifier |
| externalId | String | ID from main Heritagey backend |
| currentLevel | Enum | CEFR level (A2, B1, B2, C1, C2) |
| currentModuleId | String | Current module reference |
| createdAt | DateTime | Account creation |
| updatedAt | DateTime | Last update |

#### LearnerMemory

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary identifier |
| learnerId | UUID | Foreign key to Learner |
| progressData | JSON | Completion tracking |
| errorPatterns | JSON | Error pattern analysis |
| preferences | JSON | Learning preferences |
| profile | JSON | Personal context |
| updatedAt | DateTime | Last memory update |

#### Module

| Field | Type | Description |
|-------|------|-------------|
| id | String | Module identifier (1A, 2B, etc.) |
| parentModuleId | String | Parent module (1, 2, 3, 4) |
| title | String | Module title |
| level | String | CEFR level range |
| objectives | JSON | Learning objectives |
| duration | String | Estimated duration |
| order | Int | Display order |

#### Scenario

| Field | Type | Description |
|-------|------|-------------|
| id | String | Scenario identifier |
| moduleId | String | Parent module |
| title | String | Scenario title |
| context | Text | Conversational context |
| objectives | JSON | Scenario objectives |
| practiceActivities | JSON | Activity definitions |
| culturalInsights | JSON | Cultural notes |
| grammarNotes | JSON | Grammar in context |
| commonMistakes | JSON | Mistakes to address |
| successCriteria | JSON | Evaluation criteria |
| order | Int | Display order |

#### Session

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary identifier |
| learnerId | UUID | Foreign key to Learner |
| scenarioId | String | Current scenario |
| status | Enum | active, completed, abandoned |
| startedAt | DateTime | Session start |
| completedAt | DateTime | Session end |
| events | JSON | Session event log |
| metrics | JSON | Performance metrics |

#### ErrorLog

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary identifier |
| learnerId | UUID | Foreign key to Learner |
| sessionId | UUID | Foreign key to Session |
| category | String | Error category |
| subcategory | String | Error subcategory |
| context | Text | Error context |
| corrected | Boolean | Was it self-corrected |
| timestamp | DateTime | When it occurred |

#### Assessment

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary identifier |
| learnerId | UUID | Foreign key to Learner |
| type | Enum | informal, milestone |
| moduleId | String | Related module |
| scores | JSON | Assessment scores |
| recommendations | JSON | Generated recommendations |
| createdAt | DateTime | Assessment date |

### Pathway Entity

| Field | Type | Description |
|-------|------|-------------|
| id | String | Pathway identifier |
| name | String | Pathway name |
| description | Text | Pathway description |
| moduleOverrides | JSON | Module priority adjustments |
| additionalContent | JSON | Pathway-specific scenarios |

---

## Non-Functional Requirements

### Performance

- Session creation: < 200ms response time
- Memory retrieval: < 100ms response time
- Event recording: < 50ms response time
- Support 1000 concurrent sessions

### Reliability

- 99.9% uptime for session APIs
- Automatic session recovery on connection loss
- Event replay capability for missed updates

### Security

- All endpoints require valid JWT (from Heritagey main backend)
- Learner data isolated by learner ID
- Audit logging for all memory updates

### Scalability

- Horizontal scaling via stateless API design
- Database connection pooling
- Redis caching for hot data (active sessions)

---

## Dependencies

### Upstream

- **Heritagey Main Backend**: User authentication, user IDs
- **AI Voice Agent**: Primary API consumer

### Downstream

- **PostgreSQL**: Primary data store
- **Redis**: Session cache and real-time state

---

## Success Criteria

- [ ] Full CRUD for learner memory with < 200ms latency
- [ ] Complete curriculum content for all 4 modules seeded
- [ ] Session management supporting voice agent workflow
- [ ] Error pattern tracking with trend analysis
- [ ] Adaptive pathway recommendations functional
- [ ] 90% test coverage for core learning logic
- [ ] OpenAPI documentation for all endpoints


