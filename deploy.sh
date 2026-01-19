#!/bin/bash

# Script de déploiement automatique pour TechnoDocs
# Ce script commit et push automatiquement la branche main

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  TechnoDocs - Script de Déploiement"
echo "========================================"
echo ""

# Vérifier qu'on est sur la branche main
echo "[1/5] Vérification de la branche..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}ERREUR: Vous n'êtes pas sur la branche main!${NC}"
    echo "Branche actuelle: $CURRENT_BRANCH"
    echo "Veuillez basculer sur main avec: git checkout main"
    exit 1
fi
echo -e "${GREEN}✓ Vous êtes sur la branche main${NC}"
echo ""

# Vérifier s'il y a des modifications
echo "[2/5] Vérification des modifications..."
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${RED}ERREUR: Aucune modification à committer!${NC}"
    echo "Le répertoire de travail est propre."
    exit 1
fi
echo -e "${GREEN}✓ Modifications détectées${NC}"
echo ""

# Afficher les modifications
echo "[3/5] Fichiers modifiés:"
git status --short
echo ""

# Demander un message de commit
read -p "Entrez le message de commit (ou appuyez sur Entrée pour un message par défaut): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update flashcards content"
fi
echo ""

# Ajouter tous les fichiers
echo "[4/5] Ajout des fichiers..."
git add .
if [ $? -ne 0 ]; then
    echo -e "${RED}ERREUR: Impossible d'ajouter les fichiers${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Fichiers ajoutés${NC}"
echo ""

# Créer le commit
echo "[5/5] Création du commit..."
git commit -m "$COMMIT_MSG"
if [ $? -ne 0 ]; then
    echo -e "${RED}ERREUR: Impossible de créer le commit${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Commit créé avec succès${NC}"
echo ""

# Pousser vers le remote
echo "Push vers origin/main..."
git push origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}ERREUR: Impossible de pusher vers origin/main${NC}"
    echo "Vérifiez votre connexion internet et vos permissions"
    exit 1
fi

echo ""
echo "========================================"
echo -e "  ${GREEN}✓ DÉPLOIEMENT TERMINÉ AVEC SUCCÈS!${NC}"
echo "========================================"
echo ""
echo "Les modifications ont été commitées et déployées."
echo "Votre site devrait être mis à jour automatiquement."
echo ""
