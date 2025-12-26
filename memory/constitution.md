# Heritagey Vox - Project Constitution

## Vision

Build a **Context-Engineered Multi-Language Curriculum Backend** that powers an AI voice agent for personalized language learning, maintaining memory of learner progress, adapting to individual needs, and providing culturally immersive fluency training in multiple languages.

**Supported Languages** (extensible):
- British English (`en-GB`) - Initial focus
- French (`fr-FR`) - Planned
- Spanish (`es-ES`) - Planned
- German (`de-DE`) - Planned
- Additional languages via curriculum seeding

## Core Principles

### 1. Context Engineering First

- **Memory Persistence**: Every learner interaction is tracked, analyzed, and remembered across sessions
- **Error Pattern Recognition**: The system identifies recurring mistakes and adapts content accordingly
- **Preference Learning**: Content difficulty, pace, and style adapt to individual learner behavior
- **Long-term Intent**: Learning goals inform all session recommendations and content selection

### 2. Conversation-First Architecture

- The backend serves an AI voice agent, not traditional web interfaces
- All responses are optimized for spoken delivery
- Cultural context and nuance are embedded in every interaction
- Session flow mimics natural British conversation patterns

### 3. Progressive Mastery Model

- Content follows CEFR levels: A2-B1 → B1-B2 → B2-C1 → C1-C2
- Progression is competency-based, not time-based
- Learners can move non-linearly based on demonstrated proficiency
- Continuous assessment informs progression recommendations

### 4. Cultural Authenticity

- All content reflects authentic British English usage
- Regional variations (RP, Cockney, Northern, Scottish) are acknowledged
- Cultural insights are integrated, not isolated
- British communication styles (indirectness, hedging, humor) are taught through practice

## Technical Mandates

### Architecture

- **Microservice Design**: This service handles curriculum and learning context only
- **API-First**: RESTful APIs for integration with voice agent and frontend
- **Event-Driven**: Learning events are published for analytics and adaptation
- **Stateless Sessions**: All state persisted in database, enabling horizontal scaling

### Data Patterns

- **Learner Memory**: Long-term storage of progress, errors, preferences
- **Session Context**: Current session state with conversation history
- **Curriculum Graph**: Structured content with prerequisites and pathways
- **Assessment Data**: Continuous evaluation metrics for progression decisions

### Quality Standards

- Type safety with TypeScript throughout
- Prisma for database access and migrations
- Comprehensive API documentation with Swagger/OpenAPI
- Unit and integration tests for core learning logic

## Integration Points

### Upstream (Consumers)

- **AI Voice Agent**: Primary consumer for session management and content delivery
- **Heritagey Frontend**: Dashboard for learner progress and settings
- **Analytics Pipeline**: Learning event stream for ML/insights

### Downstream (Dependencies)

- **Existing Heritagey Backend**: User authentication, agent configuration
- **AI Provider**: LLM for adaptive response generation
- **Vector Database**: Semantic search for content matching

## Constraints

### Must Have

- Multi-language support with per-language curriculum and progress
- CEFR-aligned content structure (Modules 1-4 per language)
- Learner memory persistence across sessions (per language)
- Error pattern tracking and feedback customization
- Session management with context handoff to voice agent
- Cultural knowledge integration for each target language

### Must Not Have

- User authentication (delegated to main Heritagey backend)
- Direct LLM integration (voice agent handles this)
- Frontend components (API-only service)
- Payment/subscription logic (handled elsewhere)

### Should Have

- Adaptive difficulty adjustment based on performance
- Multiple learning pathway support (Business, Academic, Social, etc.)
- L1-specific challenge recognition (Spanish, Asian, Arabic speakers)
- Milestone assessment framework

## Success Metrics

- Learner session completion rate > 80%
- Error pattern recognition accuracy > 90%
- Content appropriateness rating (from voice agent feedback) > 4.5/5
- API response time < 200ms for session operations
- 100% curriculum coverage in content database


