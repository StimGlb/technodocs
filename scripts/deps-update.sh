#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# deps-update.sh — Met à jour les dépendances de façon sûre
# Usage: deps-update.sh [--dry-run] [--commit]
# - --dry-run : n'applique pas les changements, affiche ce qui serait fait
# - --commit  : commit et push les changements si tout passe

DRY=0
COMMIT=0
for a in "$@"; do
  [[ $a == "--dry-run" ]] && DRY=1
  [[ $a == "--commit" ]] && COMMIT=1
done

info(){ printf "[INFO] %s\n" "$*"; }
err(){ printf "[ERR] %s\n" "$*"; }

# Ensure npm or pnpm/yarn present
if ! command -v npm >/dev/null 2>&1; then
  err "npm introuvable"
  exit 2
fi

# Use npx npm-check-updates to show available updates
info "Vérification des mises à jour des dépendances..."
if [[ $DRY -eq 1 ]]; then
  npx npm-check-updates --semverLevel minor
  exit 0
fi

# Update package.json versions
info "Mise à jour des versions dans package.json (npm-check-updates)..."
npx npm-check-updates -u

# Install updated deps
info "Installation des dépendances mises à jour..."
npm install

# Run tests/build to ensure nothing casse
info "Exécution des tests et build..."
npm test && npm run build

if [[ $COMMIT -eq 1 ]]; then
  git add package.json package-lock.json package-lock.json.old 2>/dev/null || true
  git commit -m "chore(deps): mise à jour des dépendances" || { err "Rien à commit ou échec du commit"; exit 0; }
  git push
  info "Dépendances mises à jour et poussées"
else
  info "Mises à jour appliquées localement. Utilise --commit pour committer & pousser si tu es satisfait."
fi
