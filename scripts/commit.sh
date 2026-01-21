#!/bin/bash

# Script d'automatisation de commit pour TechnoDocs
# Usage: ./commit.sh "Votre message de commit"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "========================================"
echo "  TechnoDocs - Commit automatique"
echo "========================================"
echo ""

# Vérifier si un message a été fourni
if [ -z "$1" ]; then
    echo -e "${RED}[ERREUR]${NC} Aucun message de commit fourni."
    echo "Usage: ./commit.sh \"Votre message de commit\""
    echo ""
    exit 1
fi

# Afficher le statut Git
echo -e "${BLUE}[1/4]${NC} Statut Git actuel:"
echo "----------------------------------------"
git status --short
echo ""

# Demander confirmation
echo -e "Message de commit: ${YELLOW}$1${NC}"
echo ""
read -p "Continuer avec ce commit ? (o/N): " confirm

if [[ ! "$confirm" =~ ^[oO]$ ]]; then
    echo "Commit annulé."
    exit 0
fi

echo ""
echo -e "${BLUE}[2/4]${NC} Ajout des fichiers modifiés..."
git add .

echo -e "${BLUE}[3/4]${NC} Création du commit..."
git commit -m "$1"

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}[ERREUR]${NC} Échec du commit."
    exit 1
fi

echo -e "${BLUE}[4/4]${NC} Envoi vers GitHub..."
git push

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}[ERREUR]${NC} Échec du push."
    echo "Vérifiez votre connexion et vos droits d'accès."
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Commit et push réussis !${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
