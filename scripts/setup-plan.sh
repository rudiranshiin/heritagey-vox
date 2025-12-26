#!/bin/bash

# Setup script for spec-kit planning
# Creates the spec structure for a new feature

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Heritagey Vox - Spec Setup${NC}"
echo "================================"

# Check if feature name is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: ./scripts/setup-plan.sh <feature-number>-<feature-name>${NC}"
    echo "Example: ./scripts/setup-plan.sh 002-voice-integration"
    exit 1
fi

FEATURE_NAME="$1"
SPEC_DIR="$PROJECT_ROOT/specs/$FEATURE_NAME"

# Create spec directory
if [ -d "$SPEC_DIR" ]; then
    echo -e "${RED}Error: Spec directory already exists: $SPEC_DIR${NC}"
    exit 1
fi

echo "Creating spec structure for: $FEATURE_NAME"
mkdir -p "$SPEC_DIR"
mkdir -p "$SPEC_DIR/contracts"

# Copy templates
cp "$PROJECT_ROOT/templates/spec-template.md" "$SPEC_DIR/spec.md"
cp "$PROJECT_ROOT/templates/plan-template.md" "$SPEC_DIR/plan.md"
cp "$PROJECT_ROOT/templates/tasks-template.md" "$SPEC_DIR/tasks.md"

# Create empty files
touch "$SPEC_DIR/research.md"
touch "$SPEC_DIR/quickstart.md"
touch "$SPEC_DIR/data-model.md"

echo -e "${GREEN}✓ Created spec structure at: $SPEC_DIR${NC}"
echo ""
echo "Next steps:"
echo "1. Edit $SPEC_DIR/spec.md with feature requirements"
echo "2. Research and document in $SPEC_DIR/research.md"
echo "3. Create implementation plan in $SPEC_DIR/plan.md"
echo "4. Break down tasks in $SPEC_DIR/tasks.md"
echo ""
echo -e "${YELLOW}Tip: Use Claude/AI to help fill in the templates!${NC}"


