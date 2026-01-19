# Guide de Déploiement TechnoDocs

Ce document explique comment déployer automatiquement vos modifications sur la branche `main`.

## 📋 Prérequis

- Git installé et configuré
- Accès en écriture au dépôt (permissions push)
- Être sur la branche `main`
- Avoir des modifications à committer

## 🚀 Déploiement Automatique

### Sur Windows

#### Méthode 1 : Double-clic sur le fichier
Simplement double-cliquer sur le fichier `deploy.bat` à la racine du projet.

#### Méthode 2 : Ligne de commande
```bash
deploy.bat
```

#### Méthode 3 : Via npm
```bash
npm run deploy:win
```

### Sur Linux/macOS

#### Méthode 1 : Rendre le script exécutable (une seule fois)
```bash
chmod +x deploy.sh
./deploy.sh
```

#### Méthode 2 : Via bash
```bash
bash deploy.sh
```

#### Méthode 3 : Via npm
```bash
npm run deploy
```

## 📝 Processus de Déploiement

Le script effectue automatiquement les étapes suivantes :

1. **Vérification de la branche** - S'assure que vous êtes sur `main`
2. **Détection des modifications** - Vérifie qu'il y a des changements à committer
3. **Affichage des fichiers** - Montre les fichiers modifiés
4. **Message de commit** - Vous demande un message (ou utilise un message par défaut)
5. **Ajout des fichiers** - Exécute `git add .`
6. **Création du commit** - Crée le commit avec votre message
7. **Push vers origin** - Envoie les modifications vers GitHub

## ⚙️ Fonctionnement du Script

### Sécurités intégrées

- ✅ Vérifie que vous êtes sur la branche `main`
- ✅ Vérifie qu'il y a des modifications à committer
- ✅ Affiche les fichiers qui seront commitées
- ✅ Demande confirmation via le message de commit
- ✅ Gère les erreurs à chaque étape

### Message de commit par défaut

Si vous appuyez sur Entrée sans saisir de message, le script utilisera :
```
Update flashcards content
```

## 🔧 Personnalisation

### Modifier le message par défaut

Éditez `deploy.bat` ou `deploy.sh` et changez la ligne :
```bash
COMMIT_MSG="Update flashcards content"
```

### Ajouter des vérifications supplémentaires

Vous pouvez ajouter des tests avant le déploiement dans les scripts.

## 🌐 Déploiement sur Netlify

Une fois que vous avez poussé vers GitHub avec le script, Netlify déploiera automatiquement :

1. **Push automatique** - Le script push vers `origin/main`
2. **Netlify détecte** - Netlify détecte le nouveau commit
3. **Build & Deploy** - Netlify build et déploie automatiquement
4. **Site mis à jour** - Votre site est live en quelques secondes

### Vérifier le déploiement Netlify

1. Allez sur https://app.netlify.com/
2. Sélectionnez votre site TechnoDocs
3. Consultez l'onglet "Deploys" pour voir l'état

## ❌ Résolution de problèmes

### Erreur : "Vous n'êtes pas sur la branche main"

```bash
git checkout main
```

### Erreur : "Aucune modification à committer"

Vous devez d'abord modifier des fichiers avant de déployer.

### Erreur : "Impossible de pusher vers origin/main"

Vérifiez :
- Votre connexion internet
- Vos permissions sur le dépôt
- Que vous êtes authentifié avec GitHub

```bash
# Vérifier la connexion au remote
git remote -v

# Tester l'authentification
git fetch origin
```

### Erreur : "Permission denied"

Sur Linux/macOS, rendez le script exécutable :
```bash
chmod +x deploy.sh
```

## 📚 Commandes Git Utiles

### Voir l'état du dépôt
```bash
git status
```

### Voir l'historique des commits
```bash
git log --oneline -10
```

### Annuler le dernier commit (avant push)
```bash
git reset --soft HEAD~1
```

### Voir les différences
```bash
git diff
```

## 🎯 Workflow Recommandé

1. Modifiez vos fichiers (par exemple `index.html` pour les flashcards)
2. Testez localement en ouvrant `index.html` dans un navigateur
3. Lancez le script de déploiement :
   - Windows : `deploy.bat`
   - Linux/macOS : `./deploy.sh`
4. Entrez un message de commit descriptif
5. Attendez que Netlify déploie (1-2 minutes)
6. Vérifiez votre site en production

## 💡 Bonnes Pratiques

- ✅ Testez toujours localement avant de déployer
- ✅ Écrivez des messages de commit clairs et descriptifs
- ✅ Déployez régulièrement plutôt qu'en grosses modifications
- ✅ Vérifiez le site après chaque déploiement
- ✅ Gardez la branche `main` stable et fonctionnelle

## 🔗 Liens Utiles

- [Documentation Git](https://git-scm.com/doc)
- [Documentation Netlify](https://docs.netlify.com/)
- [Guide GitHub](https://docs.github.com/)
