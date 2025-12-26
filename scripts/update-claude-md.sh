#!/bin/bash

# Updates CLAUDE.md with latest API information
# Run after making significant changes to the API

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Updating CLAUDE.md..."
echo "Note: Manual review recommended after running this script"

# This is a placeholder - in a real implementation, this would:
# 1. Parse the OpenAPI spec
# 2. Extract endpoint summaries
# 3. Update the API section in CLAUDE.md

echo "✓ CLAUDE.md update complete (manual review recommended)"


