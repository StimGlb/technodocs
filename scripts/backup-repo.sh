#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# backup-repo.sh — Archive le dépôt (sans .git) vers backups/YYYY-MM-DD_HHMMSS.tar.gz
# Usage: backup-repo.sh [--out DIR] [--exclude "pattern"]

OUT_DIR="backups"
EXCLUDES=()
for a in "$@"; do
  case $a in
    --out) shift; OUT_DIR="$1";;
    --exclude) shift; EXCLUDES+=("$1");;
  esac
done

info(){ printf "[INFO] %s\n" "$*"; }
err(){ printf "[ERR] %s\n" "$*"; }

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$ROOT"
mkdir -p "$OUT_DIR"

TS=$(date +"%Y-%m-%d_%H%M%S")
ARCHIVE="$OUT_DIR/repo-backup-$TS.tar.gz"

# Build tar exclude args
EXCLUDE_ARGS=(--exclude=".git")
for p in "${EXCLUDES[@]}"; do
  EXCLUDE_ARGS+=(--exclude="$p")
done

info "Création de l'archive: $ARCHIVE"
tar -czf "$ARCHIVE" "${EXCLUDE_ARGS[@]}" .

info "Archive créée: $ARCHIVE"
