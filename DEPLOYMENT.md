# Heritagey Vox - Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL 15+
- Redis 7+

## Quick Start with Docker

### 1. Clone and Configure

```bash
git clone https://github.com/rudiranshiin/heritagey-vox.git
cd heritagey-vox
cp env.example .env
```

### 2. Configure Environment

Edit `.env` with production values:

```env
NODE_ENV=production
PORT=3002
DATABASE_URL=postgresql://user:password@host:5432/heritagey_vox
REDIS_URL=redis://host:6379
JWT_SECRET=your-secure-secret-key
```

### 3. Start Services

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose run --rm migrate

# Seed database
docker-compose run --rm seed
```

### 4. Verify Deployment

```bash
curl http://localhost:3002/health
```

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

```bash
# Create database
createdb heritagey_vox

# Run migrations
npx prisma migrate dev

# Seed data
npx prisma db seed
```

### 3. Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3002`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | development |
| `PORT` | Server port | 3002 |
| `DATABASE_URL` | PostgreSQL connection | - |
| `REDIS_URL` | Redis connection | redis://localhost:6379 |
| `JWT_SECRET` | JWT signing key | - |

## API Documentation

Access Swagger docs at: `http://localhost:3002/api-docs`

## Database Management

### Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset
```

### Seeding

```bash
npx prisma db seed
```

## Docker Commands

```bash
# Build image
docker build -t heritagey-vox .

# Run container
docker run -p 3002:3002 --env-file .env heritagey-vox

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Health Checks

### Application Health

```bash
curl http://localhost:3002/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-26T12:00:00.000Z",
  "services": {
    "database": "connected",
    "cache": "connected"
  }
}
```

## API Endpoints Overview

### Core Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /api-docs` | Swagger documentation |
| `GET /api/v1` | API info |
| `GET /api/v1/languages` | Supported languages |

### Curriculum

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/curriculum/modules` | List modules |
| `GET /api/v1/curriculum/scenarios/:id` | Get scenario |
| `GET /api/v1/curriculum/pathways` | List pathways |

### Learners

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/learners` | Create learner |
| `GET /api/v1/learners/:id` | Get learner |
| `GET /api/v1/learners/:id/summary` | Get summary |

### Sessions

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/sessions` | Create session |
| `GET /api/v1/sessions/:id/context` | Get context (for voice agent) |
| `POST /api/v1/sessions/:id/complete` | Complete session |

### Assessments

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/assessments` | Create assessment |
| `GET /api/v1/assessments/progression/:id` | Evaluate progression |
| `GET /api/v1/assessments/recommendations/:id` | Get recommendations |

## Performance Targets

| Metric | Target |
|--------|--------|
| Session creation | < 200ms |
| Context assembly | < 300ms |
| Assessment scoring | < 500ms |
| Health check | < 50ms |

## Monitoring

### Logs

Application logs to stdout. Use Docker or cloud logging:

```bash
docker-compose logs -f app
```

### Metrics

Key metrics to monitor:
- Response times
- Error rates
- Database connection pool
- Redis memory usage

## Security

### Production Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Enable HTTPS
- [ ] Configure CORS appropriately
- [ ] Enable rate limiting
- [ ] Use connection pooling
- [ ] Regular dependency updates

## Troubleshooting

### Database Connection Issues

```bash
# Check connection
npx prisma db pull

# Verify migrations
npx prisma migrate status
```

### Redis Connection Issues

```bash
# Test Redis
redis-cli ping
```

### Application Won't Start

1. Check environment variables
2. Verify database is running
3. Check port availability
4. Review application logs

## Support

For issues, create a GitHub issue or contact the development team.

