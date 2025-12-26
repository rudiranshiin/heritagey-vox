#!/bin/bash

# Check prerequisites for Heritagey Vox development

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Checking prerequisites for Heritagey Vox..."
echo "============================================"

MISSING=0

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found${NC}"
    MISSING=1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    MISSING=1
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version)
    echo -e "${GREEN}✓ PostgreSQL: $PSQL_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ PostgreSQL CLI not found (may be running in Docker)${NC}"
fi

# Check Redis
if command -v redis-cli &> /dev/null; then
    REDIS_VERSION=$(redis-cli --version)
    echo -e "${GREEN}✓ Redis: $REDIS_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ Redis CLI not found (may be running in Docker)${NC}"
fi

# Check Docker (optional)
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓ Docker: $DOCKER_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ Docker not found (optional for local dev)${NC}"
fi

echo ""
if [ $MISSING -eq 1 ]; then
    echo -e "${RED}Some required tools are missing. Please install them before continuing.${NC}"
    exit 1
else
    echo -e "${GREEN}All required prerequisites are installed!${NC}"
fi


