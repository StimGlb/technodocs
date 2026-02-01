#!/usr/bin/env bash

# autocommit.sh — Auto-commit & push simple et sûr
# Usage: autocommit.sh [-n] [-m "message"] [-p remote] [-b branch] [-e "pattern"] [paths...]
# -n    Dry-run (ne pas commit/push, affiche ce qui serait fait)
# -m    Message additionnel à ajouter au message automatique
# -p    Remote (défaut: origin)
# -b    Branch (défaut: branche courante)
# -e    Exclure fichiers correspondant au pattern (option répétable)
# paths Liste de chemins à commit (si omis, commitera tous les changements)

set -euo pipefail
IFS=$'\n\t'

# Couleurs
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
CYAN="\033[0;36m"
NC="\033[0m"

info(){ printf "%b\n" "${CYAN}[INFO]${NC} $*"; }
success(){ printf "%b\n" "${GREEN}[OK]${NC} $*"; }
warn(){ printf "%b\n" "${YELLOW}[WARN]${NC} $*"; }
err(){ printf "%b\n" "${RED}[ERR]${NC} $*"; }

usage(){
  cat <<EOF
Usage: $0 [-n] [-m "message"] [-p remote] [-b branch] [-e "pattern"] [paths...]

Options:
  -n   Dry-run (simulate)
  -m   Message append to auto message
  -p   Remote (default: origin)
  -b   Branch (default: current branch)
  -e   Exclude pattern (can be repeated, simple grep regex)
  -h   Affiche cette aide
EOF
}

# Validate git availability
if ! command -v git >/dev/null 2>&1; then
  err "git n'est pas installé ou introuvable dans PATH"
  exit 2
fi

# Variables par défaut
DRY_RUN=0
REMOTE="origin"
USER_MSG=""
BRANCH=""
EXCLUDE_PATTERNS=()

while getopts ":hnm:p:b:e:" opt; do
  case $opt in
    h) usage; exit 0 ;;
    n) DRY_RUN=1 ;;
    m) USER_MSG="$OPTARG" ;;
    p) REMOTE="$OPTARG" ;;
    b) BRANCH="$OPTARG" ;;
    e) EXCLUDE_PATTERNS+=("$OPTARG") ;;
    \?) err "Option invalide: -$OPTARG"; usage; exit 2 ;;
    :) err "L'option -$OPTARG requiert un argument"; usage; exit 2 ;;
  esac
done
shift $((OPTIND-1))

# Determine repo root & current branch
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  err "Ce script doit être exécuté depuis un dépôt git"
  exit 2
fi

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

if [[ -z "$BRANCH" ]]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

# Collect changed files (staged and unstaged and untracked)
mapfile -t CHANGED_FILES < <(git status --porcelain -z | awk -v RS='\0' '{print substr($0,4)}') || true

# If paths were provided, use those instead
if [[ $# -gt 0 ]]; then
  CUSTOM_PATHS=()
  for p in "$@"; do
    if [[ -e $p ]]; then
      CUSTOM_PATHS+=("$p")
    else
      warn "Chemin introuvable: $p"
    fi
  done
  CHANGED_FILES=()
  for p in "${CUSTOM_PATHS[@]}"; do
    CHANGED_FILES+=("$p")
  done
fi

# Apply excludes (simple regex matching)
FILTERED=()
for f in "${CHANGED_FILES[@]:-}"; do
  skip=0
  for pat in "${EXCLUDE_PATTERNS[@]:-}"; do
    if [[ $f =~ $pat ]]; then
      skip=1
      break
    fi
  done
  (( skip == 0 )) && FILTERED+=("$f")
done

if [[ ${#FILTERED[@]} -eq 0 ]]; then
  info "Aucun changement détecté à committer. Sortie."; exit 0
fi

info "Fichiers à ajouter (${#FILTERED[@]}):"
for f in "${FILTERED[@]}"; do printf "  %s\n" "$f"; done

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto-commit du $TIMESTAMP"
if [[ -n "$USER_MSG" ]]; then COMMIT_MSG+=" — $USER_MSG"; fi
COMMIT_MSG+=" (branch: $BRANCH)"

if [[ $DRY_RUN -eq 1 ]]; then
  warn "--- DRY-RUN ---"
  info "Commit message: $COMMIT_MSG"
  info "Pas de commit ni de push effectué (dry-run)."
  exit 0
fi

# Stage files safely
if ! git add -- "${FILTERED[@]}"; then
  err "Échec lors du 'git add'"
  exit 3
fi

# Commit
if git commit -m "$COMMIT_MSG"; then
  success "Commit créé: $COMMIT_MSG"
else
  warn "Aucun commit créé (rien à committer ou erreur)"
  exit 0
fi

# Push (set upstream si absent)
push_args=()
if ! git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  info "Upstream absent pour $BRANCH — push avec -u $REMOTE $BRANCH"
  push_args+=("-u" "$REMOTE" "$BRANCH")
else
  push_args+=("$REMOTE" "$BRANCH")
fi

if git push "${push_args[@]}"; then
  success "Push réussi vers ${REMOTE}/${BRANCH}"
  exit 0
else
  err "Push échoué. Vérifie les droits ou conflits de remote."
  exit 4
fi
