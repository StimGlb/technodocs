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
  echo -e "       $0 <branch-name> [base-branch]  # puis choisissez une branche à puller dans la nouvelle branche"
  echo ""
  echo "Arguments:"
  echo "  branch-name   Nom de la nouvelle branche (requis)"
  echo "  base-branch   Branche de départ (défaut: main)"
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
BASE_BRANCH=${2:-main}

# Vérifier si la branche existe déjà
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  echo -e "${YELLOW}ℹ️  La branche '$BRANCH_NAME' existe déjà.${NC}"
  read -p "Voulez-vous basculer sur cette branche et éventuellement fusionner une branche distante dedans ? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}ℹ️  Opération annulée.${NC}"
    exit 0
  fi

  echo -e "${BLUE}🔄 Passage sur la branche existante '$BRANCH_NAME'...${NC}"
  git checkout "$BRANCH_NAME"

  # Proposer une fusion depuis une branche distante
  read -p "Souhaitez-vous fusionner une branche distante dans '$BRANCH_NAME' ? (y/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Quelle branche distante voulez-vous puller ? [${BASE_BRANCH}] " PULL_SRC
    PULL_SRC=${PULL_SRC:-$BASE_BRANCH}

    echo -e "${BLUE}⬇️  Récupération des refs distantes...${NC}"
    git fetch origin

    echo -e "${BLUE}⬇️  Pull origin/${PULL_SRC} dans ${BRANCH_NAME}...${NC}"
    if git pull origin "$PULL_SRC"; then
      echo -e "${GREEN}✅ Fusion depuis origin/${PULL_SRC} réussie.${NC}"
    else
      echo -e "${RED}❌ Erreur lors du git pull depuis origin/${PULL_SRC}. Résolvez les conflits manuellement.${NC}"
      exit 1
    fi
  fi

  echo -e "${GREEN}✅ Branche '$BRANCH_NAME' prête.${NC}"
  echo -e "${BLUE}ℹ️  Branche actuelle: $(git branch --show-current)${NC}"
  exit 0
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

# Après création, proposer de fusionner une autre branche distante dans la nouvelle branche
echo
read -p "Souhaitez-vous fusionner une autre branche distante dans '$BRANCH_NAME' ? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  read -p "Quelle branche distante voulez-vous puller ? [${BASE_BRANCH}] " PULL_SRC
  PULL_SRC=${PULL_SRC:-$BASE_BRANCH}

  echo -e "${BLUE}⬇️  Récupération des refs distantes...${NC}"
  git fetch origin

  echo -e "${BLUE}⬇️  Pull origin/${PULL_SRC} dans ${BRANCH_NAME}...${NC}"
  if git pull origin "$PULL_SRC"; then
    echo -e "${GREEN}✅ Fusion depuis origin/${PULL_SRC} réussie.${NC}"
  else
    echo -e "${RED}❌ Erreur lors du git pull depuis origin/${PULL_SRC}. Résolvez les conflits manuellement.${NC}"
    exit 1
  fi
fi

echo -e "${GREEN}✅ Branche '$BRANCH_NAME' créée avec succès !${NC}"
echo -e "${BLUE}ℹ️  Branche actuelle: $(git branch --show-current)${NC}"
