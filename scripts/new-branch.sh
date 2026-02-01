#!/usr/bin/env bash
set -euo pipefail

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'aide
usage() {
  echo -e "${BLUE}Usage:${NC} $0 <branch-name> [base-branch]"
  echo ""
  echo "Arguments:"
  echo "  branch-name   Nom de la nouvelle branche (requis)"
  echo "  base-branch   Branche de départ (défaut: master)"
  echo ""
  echo "Exemples:"
  echo "  $0 feature/new-component"
  echo "  $0 fix/bug-123 develop"
  exit 1
}

# Vérifier qu'on est dans un dépôt git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo -e "${RED}❌ Erreur: Pas dans un dépôt Git${NC}"
  exit 1
fi

# Vérifier les arguments
if [ $# -eq 0 ]; then
  usage
fi

BRANCH_NAME=$1
BASE_BRANCH=${2:-master}

# Vérifier que la branche n'existe pas déjà
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  echo -e "${RED}❌ Erreur: La branche '$BRANCH_NAME' existe déjà${NC}"
  exit 1
fi

# Vérifier s'il y a des modifications non commitées
if ! git diff-index --quiet HEAD 2>/dev/null; then
  echo -e "${YELLOW}⚠️  Attention: Il y a des modifications non commitées${NC}"
  read -p "Voulez-vous continuer quand même ? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}ℹ️  Opération annulée${NC}"
    exit 0
  fi
fi

echo -e "${BLUE}🔄 Passage sur la branche '$BASE_BRANCH'...${NC}"
git checkout "$BASE_BRANCH"

echo -e "${BLUE}⬇️  Récupération des dernières modifications...${NC}"
git pull origin "$BASE_BRANCH"

echo -e "${BLUE}🌿 Création de la nouvelle branche '$BRANCH_NAME'...${NC}"
git checkout -b "$BRANCH_NAME"

echo -e "${GREEN}✅ Branche '$BRANCH_NAME' créée avec succès !${NC}"
echo -e "${BLUE}ℹ️  Branche actuelle: $(git branch --show-current)${NC}"
