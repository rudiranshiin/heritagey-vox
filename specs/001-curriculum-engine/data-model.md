# Data Model - Multi-Language Curriculum Engine

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    Language     │       │     Learner     │       │     Module      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ code (PK)       │       │ id (PK)         │       │ id (PK)         │
│ name            │       │ externalId      │       │ languageCode(FK)│
│ nativeName      │       │ createdAt       │       │ parentModuleId  │
│ flag            │       │ updatedAt       │       │ title           │
│ isActive        │       └────────┬────────┘       │ level           │
└────────┬────────┘                │                │ objectives      │
         │                         │                │ duration        │
         │        ┌────────────────┼───────┐        │ order           │
         │        │                │       │        └────────┬────────┘
         │        ▼                ▼       ▼                 │
         │  ┌─────────────┐  ┌──────────────────┐            ▼
         │  │LearnerLang  │  │  LearnerMemory   │  ┌─────────────────┐
         │  ├─────────────┤  ├──────────────────┤  │    Scenario     │
         └─▶│ id (PK)     │  │ id (PK)          │  ├─────────────────┤
            │ learnerId   │  │ learnerId (FK)   │  │ id (PK)         │
            │ langCode(FK)│  │ languageCode(FK) │  │ moduleId (FK)   │
            │ currentLevel│  │ progressData     │  │ title           │
            │ currentMod  │  │ errorPatterns    │  │ context         │
            │ isActive    │  │ preferences      │  │ objectives      │
            └─────────────┘  │ profile          │  │ culturalInsights│
                             └──────────────────┘  │ grammarNotes    │
                                                   │ commonMistakes  │
┌─────────────────┐       ┌─────────────────┐      │ successCriteria │
│    Session      │       │    Pathway      │      └─────────────────┘
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ learnerId (FK)  │       │ languageCode(FK)│
│ languageCode    │       │ name            │
│ scenarioId      │       │ description     │
│ status          │       │ moduleOverrides │
│ events/metrics  │       │ additionalContent│
└────────┬────────┘       └─────────────────┘
         │
         ▼
┌─────────────────┐       ┌─────────────────┐
│    ErrorLog     │       │   Assessment    │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ learnerId (FK)  │       │ learnerId (FK)  │
│ languageCode    │       │ languageCode    │
│ sessionId (FK)  │       │ type            │
│ category        │       │ moduleId        │
│ context         │       │ scores          │
│ corrected       │       │ recommendations │
└─────────────────┘       └─────────────────┘
```

---

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== LANGUAGE DOMAIN ====================

model Language {
  code        String   @id // ISO code: "en-GB", "fr-FR", "es-ES"
  name        String   // English name: "British English", "French"
  nativeName  String   // Native name: "British English", "Français"
  flag        String   // Emoji: "🇬🇧", "🇫🇷"
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  modules          Module[]
  pathways         Pathway[]
  learnerLanguages LearnerLanguage[]
  learnerMemories  LearnerMemory[]
}

// ==================== LEARNER DOMAIN ====================

model Learner {
  id              String   @id @default(uuid())
  externalId      String   @unique // From main Heritagey backend
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  languages   LearnerLanguage[]
  memories    LearnerMemory[]
  sessions    Session[]
  errorLogs   ErrorLog[]
  assessments Assessment[]

  @@index([externalId])
}

model LearnerLanguage {
  id              String   @id @default(uuid())
  learnerId       String
  languageCode    String
  currentLevel    Level    @default(A2)
  currentModuleId String?
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  learner  Learner  @relation(fields: [learnerId], references: [id], onDelete: Cascade)
  language Language @relation(fields: [languageCode], references: [code])

  @@unique([learnerId, languageCode])
  @@index([learnerId])
  @@index([languageCode])
}

model LearnerMemory {
  id            String   @id @default(uuid())
  learnerId     String
  languageCode  String   // Memory is per-language
  progressData  Json     @default("{}")  // ProgressData type
  errorPatterns Json     @default("[]")  // ErrorPattern[] type
  preferences   Json     @default("{}")  // LearnerPreferences type
  profile       Json     @default("{}")  // LearnerProfile type
  updatedAt     DateTime @updatedAt

  // Relations
  learner  Learner  @relation(fields: [learnerId], references: [id], onDelete: Cascade)
  language Language @relation(fields: [languageCode], references: [code])

  @@unique([learnerId, languageCode])
  @@index([learnerId])
  @@index([languageCode])
}

enum Level {
  A2
  B1
  B2
  C1
  C2
}

// ==================== CURRICULUM DOMAIN ====================

model Module {
  id             String   @id // e.g., "en-GB:1A", "fr-FR:2B"
  languageCode   String   // Target language
  parentModuleId String?  // e.g., "1", "2", "3", "4" for top-level grouping
  title          String
  level          String   // e.g., "A2-B1", "B1-B2"
  objectives     Json     @default("[]")  // String[]
  duration       String   // e.g., "3 weeks"
  order          Int
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  language  Language   @relation(fields: [languageCode], references: [code])
  scenarios Scenario[]

  @@index([languageCode])
  @@index([parentModuleId])
  @@index([level])
}

model Scenario {
  id               String   @id // e.g., "1A-1", "1A-2"
  moduleId         String
  title            String
  context          String   @db.Text // Conversational context
  objectives       Json     @default("[]")  // String[]
  practiceActivities Json   @default("[]")  // PracticeActivity[]
  culturalInsights Json     @default("[]")  // CulturalInsight[]
  grammarNotes     Json     @default("[]")  // GrammarNote[]
  commonMistakes   Json     @default("[]")  // CommonMistake[]
  successCriteria  Json     @default("[]")  // String[]
  order            Int
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  // Relations
  module   Module    @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  sessions Session[]

  @@index([moduleId])
}

model Pathway {
  id               String   @id // e.g., "en-GB:business", "fr-FR:academic"
  languageCode     String   // Target language
  name             String
  description      String   @db.Text
  moduleOverrides  Json     @default("{}")  // Module priority adjustments
  additionalContent Json    @default("[]")  // Pathway-specific content
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  // Relations
  language Language @relation(fields: [languageCode], references: [code])

  @@index([languageCode])
}

// ==================== SESSION DOMAIN ====================

model Session {
  id           String        @id @default(uuid())
  learnerId    String
  languageCode String        // Which language is being practiced
  scenarioId   String?
  status       SessionStatus @default(ACTIVE)
  startedAt    DateTime      @default(now())
  completedAt  DateTime?
  events       Json          @default("[]")  // SessionEvent[]
  metrics      Json?         // SessionMetrics
  metadata     Json?         // Additional session metadata

  // Relations
  learner   Learner    @relation(fields: [learnerId], references: [id], onDelete: Cascade)
  scenario  Scenario?  @relation(fields: [scenarioId], references: [id])
  errorLogs ErrorLog[]

  @@index([learnerId])
  @@index([languageCode])
  @@index([status])
  @@index([startedAt])
}

enum SessionStatus {
  ACTIVE
  COMPLETED
  ABANDONED
  PAUSED
}

model ErrorLog {
  id           String   @id @default(uuid())
  learnerId    String
  languageCode String   // Which language the error was in
  sessionId    String?
  category     String   // e.g., "grammar", "vocabulary", "pronunciation", "cultural"
  subcategory  String?  // e.g., "tense", "phrasal-verbs"
  context      String   @db.Text // Error context
  corrected    Boolean  @default(false) // Was it self-corrected?
  timestamp    DateTime @default(now())

  // Relations
  learner Learner  @relation(fields: [learnerId], references: [id], onDelete: Cascade)
  session Session? @relation(fields: [sessionId], references: [id])

  @@index([learnerId])
  @@index([languageCode])
  @@index([category])
  @@index([timestamp])
  @@index([learnerId, languageCode, category])
}

// ==================== ASSESSMENT DOMAIN ====================

model Assessment {
  id              String         @id @default(uuid())
  learnerId       String
  languageCode    String         // Which language was assessed
  type            AssessmentType
  moduleId        String?
  scores          Json           @default("{}")  // AssessmentScores
  recommendations Json           @default("[]")  // ProgressionRecommendation[]
  createdAt       DateTime       @default(now())

  // Relations
  learner Learner @relation(fields: [learnerId], references: [id], onDelete: Cascade)

  @@index([learnerId])
  @@index([languageCode])
  @@index([type])
  @@index([createdAt])
}

enum AssessmentType {
  INFORMAL
  MILESTONE
}
```

---

## JSON Field Types (TypeScript)

```typescript
// src/shared/types/learner-memory.types.ts

interface ProgressData {
  completedScenarios: string[];
  milestones: string[];
  totalSessionTime: number; // seconds
  lastSessionAt?: string; // ISO date
  sessionsCount: number;
}

interface ErrorPattern {
  category: string;
  subcategory?: string;
  frequency: number;
  lastOccurred: string; // ISO date
  trend: 'improving' | 'stable' | 'regressing';
  weight: number; // Calculated importance
}

interface LearnerPreferences {
  formalityLevel: 'formal' | 'moderate' | 'casual';
  engagingTopics: string[];
  boringTopics: string[];
  pace: 'fast' | 'moderate' | 'slow';
  feedbackStyle: 'implicit' | 'explicit' | 'mixed';
}

interface LearnerProfile {
  l1Background?: string;
  field?: string;
  goals: string[];
  interests: string[];
  timeline?: string;
  hasUKFamily?: boolean;
  targetRegion?: string;
}
```

```typescript
// src/shared/types/curriculum.types.ts

interface PracticeActivity {
  type: 'role-play' | 'scenario' | 'challenge' | 'discussion' | 'drill';
  prompt: string;
  expectedBehaviors: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface CulturalInsight {
  topic: string;
  content: string;
  importance: 'essential' | 'helpful' | 'enrichment';
}

interface GrammarNote {
  topic: string;
  content: string;
  examples: string[];
}

interface CommonMistake {
  mistake: string;
  correction: string;
  explanation?: string;
}
```

```typescript
// src/shared/types/session.types.ts

interface SessionEvent {
  type: SessionEventType;
  timestamp: string; // ISO date
  data: Record<string, unknown>;
}

type SessionEventType =
  | 'session_started'
  | 'topic_engaged'
  | 'error_detected'
  | 'self_correction'
  | 'cultural_confusion'
  | 'fluency_hesitation'
  | 'session_completed'
  | 'session_abandoned';

interface SessionMetrics {
  fluencyScore: number;     // 0-10
  accuracyScore: number;    // 0-10
  appropriacyScore: number; // 0-10
  confidenceScore: number;  // 0-10
  engagementScore: number;  // 0-10
  durationSeconds: number;
  errorCount: number;
  selfCorrectionCount: number;
}
```

```typescript
// src/shared/types/assessment.types.ts

interface AssessmentScores {
  fluency: number;
  accuracy: number;
  appropriacy: number;
  confidence: number;
  overall: number;
}

interface ProgressionRecommendation {
  action: 'advance' | 'consolidate' | 'review';
  targetModuleId?: string;
  confidence: number;
  reasoning: string;
}
```

---

## Indexes Strategy

### Primary Access Patterns

1. **Learner by External ID** (authentication flow)
   - Index: `Learner.externalId`

2. **Learner Memory** (session context loading)
   - Index: `LearnerMemory.learnerId` (implicit via unique)

3. **Scenarios by Module** (curriculum navigation)
   - Index: `Scenario.moduleId`

4. **Sessions by Learner** (history, analytics)
   - Index: `Session.learnerId`

5. **Error Logs by Learner and Category** (pattern analysis)
   - Composite Index: `ErrorLog(learnerId, category)`

6. **Active Sessions** (monitoring, timeout handling)
   - Index: `Session.status`

---

## Data Retention Policies

| Entity | Retention | Notes |
|--------|-----------|-------|
| Learner | Indefinite | Core user data |
| LearnerMemory | Indefinite | Cumulative learning data |
| Session | 2 years | Archive after retention |
| ErrorLog | 1 year | Aggregate then purge |
| Assessment | Indefinite | Milestone records |

---

## Migration Strategy

1. **Initial Migration**: Create all tables with current schema
2. **Seed Migration**: Populate curriculum content
3. **Future Migrations**:
   - Use JSON fields for flexibility
   - Add columns, don't remove
   - Version JSON schemas internally


