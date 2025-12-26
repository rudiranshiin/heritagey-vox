# Research Notes - British English Curriculum Engine

## Context Engineering Architecture

### Memory System Design

**Pattern: Learner Knowledge Graph**

The curriculum uses a layered memory system:

1. **Short-term Memory** (Session Scope)
   - Current conversation context
   - Recent error occurrences
   - Immediate performance metrics
   - Stored in Redis for sub-ms access

2. **Long-term Memory** (Persistent)
   - Cumulative error patterns
   - Learning preferences
   - Progress milestones
   - Stored in PostgreSQL with JSON columns

3. **Semantic Memory** (Content-Linked)
   - Connections between learner struggles and curriculum content
   - Scenario-specific performance history
   - Cultural insight absorption tracking

### Error Pattern Analysis Algorithms

**Approach: Frequency + Recency + Severity Weighting**

```
errorWeight = frequency * recencyDecay * severityMultiplier

where:
- frequency: count of occurrences
- recencyDecay: exponential decay (0.95^daysSinceLastOccurrence)
- severityMultiplier: 1.0 (minor) to 2.0 (critical)
```

**Categories from Curriculum Spec**:
- Grammar errors (tenses, articles, word order)
- Vocabulary errors (false friends, register mismatch)
- Pronunciation errors (vowels, consonants, intonation)
- Cultural errors (directness, formality, humor misread)

### Trend Detection

**Pattern: Rolling Window Analysis**

- Compare error rates across 7-day windows
- Calculate improvement/regression slope
- Classify as: improving, stable, regressing

---

## CEFR Level Mapping

| Level | Module | Description | Key Milestones |
|-------|--------|-------------|----------------|
| A2 | 1A, 1B | Basic interactions | 10-min conversations, 50 expressions |
| B1 | 1C, 1D | Practical life | Independent handling of life situations |
| B1+ | 2A | Idiom mastery | 50+ idioms natural use |
| B2 | 2B, 2C | Professional/Cultural | Interview confidence, cultural depth |
| B2+ | 2D | Spontaneous | 5-min impromptu speaking |
| C1 | 3A, 3B | Sophisticated | Subtext detection, intellectual discourse |
| C1+ | 3C, 3D | Native-like | Professional excellence, prosody mastery |
| C2 | 4A, 4B, 4C | Mastery | Creative language, complete register command |

---

## Voice Agent Integration Patterns

### Session Context Handoff

The voice agent needs a comprehensive context package:

```json
{
  "learnerContext": {
    "name": "preferred name",
    "currentLevel": "B1",
    "recentTopics": ["weather", "food"],
    "errorFocus": ["phrasal-verbs"],
    "preferredPace": "moderate",
    "engagingTopics": ["football", "cooking"]
  },
  "scenarioContext": {
    "id": "1B-3",
    "title": "Accepting and Declining Invitations",
    "setting": "Colleague invites learner to pub",
    "objectives": ["polite refusal", "alternative suggestion"],
    "keyPhrases": ["I'd love to but...", "Perhaps another time?"],
    "culturalPoints": ["British indirect refusal norms"]
  },
  "agentGuidance": {
    "feedbackStyle": "implicit-first",
    "errorThreshold": 3,
    "encouragementLevel": "high",
    "culturalExplanationDepth": "medium"
  }
}
```

### Event Stream Design

Events from voice agent to curriculum backend:

- `session_started`: Learner entered session
- `topic_engaged`: Learner showed interest
- `error_detected`: Error occurred (with details)
- `self_correction`: Learner corrected themselves
- `cultural_confusion`: Cultural point needed explanation
- `fluency_hesitation`: Notable pause/hesitation
- `session_completed`: Session ended normally
- `session_abandoned`: Session ended early

---

## L1-Specific Challenge Mapping

From curriculum spec Section "Common Challenges by L1 Background":

### Spanish/Romance Speakers
- False friends (actual ≠ actual)
- Vowel pronunciation
- Continuous tense overuse
- Question word order

### East Asian Speakers
- Article usage (the, a, an)
- Plural forms
- Verb tense aspects
- Question intonation

### Germanic Speakers
- Phrasal verb avoidance
- Complex sentence word order
- Formality calibration

### Arabic Speakers
- Vowel pronunciation
- Gender-neutral pronouns
- Register informality

---

## Adaptive Pathway Logic

### Pathway Selection Criteria

| Pathway | Trigger Conditions | Module Priorities |
|---------|-------------------|-------------------|
| Business | goal=work OR field=business | 2B→3D→2A |
| Academic | goal=study OR field=academic | 2B→3B→2C |
| Social | goal=friends OR goal=travel | 1B→2C→2A |
| Relocation | goal=relocate | 1C→1A→1B |
| Heritage | hasUKFamily=true | Cultural deep-dive first |

### Dynamic Pathway Adjustment

If learner shows strong performance in a pathway area, suggest:
- "Branch out" to adjacent pathway content
- "Accelerate" to next level in current pathway

If learner struggles in pathway area:
- "Reinforce" with additional scenarios
- "Simplify" with lower-level content from same domain

---

## Assessment Scoring Algorithms

### Fluency Score (0-10)

```
fluencyScore = (1 - hesitationRate) * speedNormalized * flowScore

where:
- hesitationRate: pauses > 2s / total speaking time
- speedNormalized: words per minute / expected WPM for level
- flowScore: subjective from voice agent (1-10)
```

### Accuracy Score (0-10)

```
accuracyScore = (correctUtterances / totalUtterances) * 10

Weighted by error severity:
- Grammar: 1.0 weight
- Vocabulary: 0.8 weight
- Minor pronunciation: 0.5 weight
```

### Appropriacy Score (0-10)

```
appropriacyScore = registerMatch + culturalFit + contextRelevance

Each component 0-3.33, combined to 10
```

### Progression Decision

```
if (avgScore >= 8.0 AND completedScenarios >= 80% AND noRegressionTrends):
    recommend("advance")
elif (avgScore >= 6.5 AND completedScenarios >= 60%):
    recommend("consolidate")
else:
    recommend("review", areas=weakestPatterns)
```

---

## Technology Stack Decisions

### Why Express + TypeScript

- Matches existing Heritagey backend
- Team familiarity
- Rich ecosystem for API development
- Type safety for complex data structures

### Why Prisma

- Type-safe database access
- Excellent migration tooling
- JSON field support for flexible schemas
- Works well with TypeScript

### Why Redis for Sessions

- Sub-millisecond reads for active sessions
- TTL support for automatic cleanup
- Pub/sub for potential real-time features
- Battle-tested for session management

### Why JSON Columns

- LearnerMemory evolves frequently
- Error patterns have varied structures
- Preferences are learner-specific
- Avoids constant schema migrations

---

## Open Questions for Refinement

1. **Voice Agent Protocol**: What's the exact WebSocket/REST contract for real-time events?

2. **Authentication Flow**: How does the voice agent authenticate on behalf of learners?

3. **Content Versioning**: How do we handle curriculum updates for learners mid-progress?

4. **Offline Support**: Does the voice agent need offline-capable session summaries?

5. **Analytics Granularity**: What event-level data does the analytics team need?

---

## References

- British Curriculum Spec: `/Users/rrudiyanto/Desktop/british-curriculum-spec.md`
- Existing Heritagey Backend: `/Users/rrudiyanto/Desktop/AI/project/heritagey/backend`
- Spec-Kit Methodology: https://github.com/github/spec-kit


