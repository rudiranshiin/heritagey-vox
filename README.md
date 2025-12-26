# Heritagey Vox

**Context-Engineered British English Curriculum Backend**

A backend service for AI-powered British English language learning, providing personalized curriculum delivery through context engineering architecture.

## 🎯 Vision

Power an AI voice agent that maintains memory of learner progress, adapts to individual needs, and provides culturally immersive British English fluency training.

## ✨ Key Features

- **Learner Memory System**: Persistent tracking of progress, error patterns, and preferences
- **Context Engineering**: Long-term learning intent integrated with immediate practice
- **Adaptive Curriculum**: CEFR-aligned content (A2-C2) with personalized pathways
- **Session Management**: Full context handoff for AI voice agent integration
- **Assessment Framework**: Continuous evaluation with progression recommendations

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Constitution](memory/constitution.md) | Core principles and constraints |
| [Specification](specs/001-curriculum-engine/spec.md) | Detailed feature requirements |
| [Implementation Plan](specs/001-curriculum-engine/plan.md) | 6-week development roadmap |
| [Tasks](specs/001-curriculum-engine/tasks.md) | Actionable task breakdown |
| [Data Model](specs/001-curriculum-engine/data-model.md) | Database schema and types |
| [Research](specs/001-curriculum-engine/research.md) | Technical decisions and algorithms |
| [API Spec](specs/001-curriculum-engine/contracts/api-spec.json) | OpenAPI 3.0 specification |

## 🏗️ Architecture

```
heritagey-vox/
├── prisma/                 # Database schema and migrations
├── src/
│   ├── modules/
│   │   ├── learner/        # Learner management
│   │   ├── memory/         # Memory and error patterns
│   │   ├── curriculum/     # Modules, scenarios, pathways
│   │   ├── session/        # Session lifecycle
│   │   └── assessment/     # Scoring and progression
│   └── shared/             # Common utilities
├── specs/                  # Spec-kit documentation
├── memory/                 # Project constitution
└── templates/              # Spec templates
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database/redis credentials

# Set up database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

## 📡 API Overview

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/learners` | Create new learner |
| `GET /api/v1/learners/:id/memory` | Get learner memory |
| `GET /api/v1/curriculum/modules` | List curriculum modules |
| `POST /api/v1/sessions` | Start learning session |
| `POST /api/v1/sessions/:id/events` | Record session event |
| `GET /api/v1/learners/:id/progression` | Get progression recommendations |

Full API documentation at `/api-docs` when running.

## 🧠 Context Engineering

The service implements context engineering for personalized learning:

1. **Memory Persistence**: Track progress, errors, and preferences across sessions
2. **Error Pattern Recognition**: Identify recurring mistakes and adapt content
3. **Preference Learning**: Adjust difficulty, pace, and topics based on behavior
4. **Long-term Intent**: Learning goals inform all recommendations

## 📊 Curriculum Structure

Based on CEFR levels with 4 main modules:

| Module | Level | Focus |
|--------|-------|-------|
| 1 | A2-B1 | Foundation: Daily interactions, social connections |
| 2 | B1-B2 | Intermediate: Idioms, professional communication |
| 3 | B2-C1 | Advanced: Sophisticated expression, prosody |
| 4 | C1-C2 | Mastery: Native-like proficiency |

## 🔗 Integration

- **Heritagey Main Backend**: User authentication, user IDs
- **AI Voice Agent**: Primary API consumer for sessions
- **Heritagey Frontend**: Dashboard for learner progress

## 📝 Development

This project uses **Spec-Driven Development** via [spec-kit](https://github.com/github/spec-kit).

See [CLAUDE.md](CLAUDE.md) for AI agent guidance.

## 📄 License

MIT


