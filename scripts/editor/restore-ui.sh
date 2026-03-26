#!/bin/bash

# Restore optimized VS Code UI settings
# Rétablit les paramètres d'interface optimisés
# Usage: bash scripts/ui/restore-ui.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Invoke Node.js script
node "$PROJECT_ROOT/scripts/editor/restore-ui-settings.js"
