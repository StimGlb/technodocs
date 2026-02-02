#!/usr/bin/env bash
set -euo pipefail

# Définition de la racine du projet (un dossier au-dessus du script)
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 Préparation de l'environnement de développement..."
echo "📁 Racine du projet : $ROOT"

# 1) Nettoyage chirurgical
# On supprime 'dist' pour éviter les vieux fichiers HTML renommés
# On supprime '.vite' pour forcer Vite à recalculer le graphe des dépendances et des fichiers
echo -e "\n1) Nettoyage : suppression de dist/ et node_modules/.vite"
rm -rf "$ROOT/dist" "$ROOT/node_modules/.vite"
echo "✅ Dossiers supprimés."

# 2) Rappel pour les assets (PNG)
echo -e "\n2) Rappel technique pour vos images (.png) :"
echo "   - Dans le HTML : Utilisez des chemins relatifs directs."
echo "   - Ex (public) : <img src=\"/image.png\">"
echo "   - Ex (src)    : <img src=\"/src/images/image.png\">"
echo "   - Évitez les alias (@images) directement dans l'attribut src des fichiers .html."

# 3) Relance
echo -e "\n3) Relancement de Vite..."
cd "$ROOT"

# Utilise 'exec' pour que le processus npm remplace le script shell
exec npm run dev