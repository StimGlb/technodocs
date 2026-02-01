#!/usr/bin/env bash
set -euo pipefail
# Options: --staged --fast --fix
STAGED=0; FAST=0; FIX=0
for a in "$@"; do [[ $a == "--staged" ]] && STAGED=1; [[ $a == "--fast" ]] && FAST=1; [[ $a == "--fix" ]] && FIX=1; done

run_or_script(){
  local s=$1; shift
  if grep -q "\"$s\"" package.json 2>/dev/null; then npm run "$s" -- "$@"; else return 0; fi
}

# Format
if [[ $FIX -eq 1 ]]; then run_or_script format || npx prettier --write .; else run_or_script format || npx prettier --check .; fi
# Lint
run_or_script lint || npx eslint "${STAGED:+--staged}" .
# Typecheck
run_or_script typecheck || (test -f tsconfig.json && npx tsc --noEmit)
# Tests
run_or_script test || npx vitest run
# Build (skip with --fast)
if [[ $FAST -eq 0 ]]; then run_or_script build || npx vite build; fi

echo "✅ prepush checks passed"