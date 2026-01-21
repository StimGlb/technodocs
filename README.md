# TechnoDocs

Site web éducatif statique pour l'enseignement de la Technologie au Collège (Cycle 4).
Ressources pédagogiques incluant cours, outils interactifs, flashcards et supports de révision.

## 🎯 Vue d'ensemble

**TechnoDocs** est une plateforme web statique sans framework, construite en HTML/CSS/JavaScript pur, destinée aux élèves de collège pour l'apprentissage de la Technologie. Le projet met l'accent sur la simplicité, la performance et l'accessibilité.

### Thématiques couvertes
- 🏗️ **Conception 3D** - Modélisation et impression 3D
- 🔌 **Réparabilité** - Indice de réparabilité, diagnostic de pannes
- 💻 **Programmation** - Scratch, Python, Arduino
- 🌐 **Internet & Réseaux** - Web, sécurité, communication

## 🏗️ Architecture

### Stack technique
- **HTML5/CSS3** - Structure et design moderne avec CSS Variables
- **JavaScript ES6+** - Vanilla JS, modules ES6, Intersection Observer API
- **Fonts** - Google Fonts (Inter, Space Grotesk)
- **Hébergement** - Netlify avec déploiement automatique
- **Pas de build** - Site statique pur, pas de framework ni bundler

### Structure du projet

```
technodocs/
├── index.html                 # Page d'accueil principale
├── dist/
│   ├── css/
│   │   └── style.css         # Styles globaux avec CSS Variables
│   ├── js/
│   │   ├── app.js            # Logique principale (navigation, animations)
│   │   └── components.js     # Chargement dynamique header/footer
│   ├── includes/
│   │   ├── header.html       # Composant header réutilisable
│   │   └── footer.html       # Composant footer réutilisable
│   └── pages/
│       └── flashcards/
│           └── reparabilite.html  # Application flashcards (30 cartes)
├── netlify.toml              # Configuration Netlify + optimisation builds
├── .gitignore                # Exclusion fichiers dev/deploy
└── CLAUDE.md                 # Instructions pour Claude Code (AI)
```

## ✨ Fonctionnalités principales

### 🎴 Application Flashcards (reparabilite.html)
Application standalone complète pour l'apprentissage de l'Indice de Réparabilité :

- **30 flashcards** avec questions/réponses sur la réparabilité
- **Animation flip 3D** - Effet de retournement de carte avec `transform-style: preserve-3d`
- **Deux modes d'affichage** :
  - Mode grille : vue d'ensemble de toutes les cartes
  - Mode carte unique : navigation une par une avec flèches
- **Recherche en temps réel** - Filtrage instantané sur questions et réponses
- **Mélange aléatoire** - Algorithme Fisher-Yates pour randomiser l'ordre
- **Navigation clavier** - Flèches gauche/droite, Espace/Enter pour flip
- **Statistiques dynamiques** - Compteur cartes totales/affichées
- **Design intégré** - Header/footer du site + styles cohérents

### 🧩 Système de composants réutilisables
- **Header/Footer dynamiques** - Chargés via `fetch()` et injectés dans les placeholders
- **Navigation mobile** - Menu hamburger responsive avec animations
- **Scroll animations** - Intersection Observer pour effets au défilement

### 🎨 Design System
Variables CSS centralisées dans `:root` :
- **Couleurs** - Palette indigo/cyan/amber pour le site principal
- **Flashcards** - Palette verte (green/lime/teal) pour les cartes
- **Espacements** - Système cohérent (--space-1 à --space-16)
- **Typographie** - Échelle de tailles (--text-xs à --text-4xl)
- **Bordures & Ombres** - Radius et shadows standardisés

## 🚀 Déploiement

### Configuration Netlify optimisée

Le fichier `netlify.toml` contient une règle d'optimisation pour **économiser les crédits de build** :

```toml
[build]
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- dist/ package.json"
```

**Fonctionnement** : Netlify ne déclenche un build que si des fichiers dans `dist/` ou `package.json` ont changé. Les modifications de fichiers locaux (scripts deploy, .md, config) n'entraînent pas de déploiement.

### Gestion des crédits
- **Plan gratuit** : 300 minutes de build/mois
- **Utilisation actuelle** : 195/300 (105 minutes restantes)
- **Stratégie** : Regrouper les modifications et déployer uniquement les changements testés et fonctionnels

### Scripts de déploiement

**Windows** :
```bash
deploy.bat
# OU
npm run deploy:win
```

**Linux/macOS** :
```bash
./deploy.sh
# OU
npm run deploy
```

Les scripts automatisent :
1. Vérification de la branche `main`
2. Détection des modifications non committées
3. Affichage des fichiers modifiés
4. Prompt pour le message de commit
5. Add, commit et push vers GitHub
6. Déploiement automatique Netlify

### Déploiement manuel
```bash
git add .
git commit -m "Description des changements"
git push origin main
```

## 💻 Développement local

### Option 1 : Ouverture directe (rapide)
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Option 2 : Serveur de développement Vite (hot reload)
```bash
npm install    # Première fois uniquement
npm run dev    # Lance le serveur sur http://localhost:5173
```

## 📂 Gestion Git

### Branches
- **`main`** - Branche de production (déploiement automatique)
- **`dev`** - Branche de développement (synchronisée avec main)

### Workflow recommandé
1. Développer sur `main` ou créer une feature branch
2. Tester localement
3. Commiter les changements
4. Pusher vers GitHub (Netlify déploie automatiquement si nécessaire)

### Fichiers ignorés (.gitignore)
Les fichiers suivants sont exclus du dépôt :
- Scripts de déploiement (`deploy.sh`, `deploy.bat`)
- Fichiers de documentation technique (`CLAUDE.md`, `DEPLOYMENT.md`)
- Configuration npm (`package.json`, `package-lock.json`)
- Fichiers système et IDE

## 🔧 Technologies et patterns

### JavaScript moderne
- **ES6 Modules** - Import/export natifs
- **Async/Await** - Chargement asynchrone des composants
- **Destructuring & Spread** - Syntaxe moderne
- **Template Literals** - Construction HTML dynamique
- **Arrow Functions** - Syntaxe concise

### CSS moderne
- **CSS Variables** - Theming centralisé
- **CSS Grid** - Layouts bidimensionnels
- **Flexbox** - Alignements flexibles
- **Custom Properties** - Variables dynamiques
- **Media Queries** - Design responsive

### Bonnes pratiques
- ✅ **Mobile-first** - Design responsive par défaut
- ✅ **Accessibilité** - Attributs ARIA, focus visible
- ✅ **Performance** - Pas de framework lourd, lazy loading
- ✅ **SEO** - Meta tags, semantic HTML
- ✅ **Sécurité** - Headers Netlify, CSP

## 📝 Modifications et ajouts

### Pour ajouter des flashcards
1. Éditer `dist/pages/flashcards/reparabilite.html`
2. Modifier l'array `flashcardsData` (ligne ~435)
3. Format : `{ q: "Question?", a: "Réponse." }`
4. Mettre à jour les totaux hardcodés si nécessaire

### Pour créer une nouvelle page
1. Créer le fichier HTML dans `dist/pages/`
2. Lier `../../css/style.css` pour les styles globaux
3. Ajouter les placeholders `#header-placeholder` et `#footer-placeholder`
4. Charger `../../js/components.js` en module
5. Ajouter le lien dans la navigation (`dist/includes/header.html`)

### Pour modifier les styles globaux
- Éditer `dist/css/style.css`
- Utiliser les variables CSS existantes
- Tester sur toutes les pages

## 🤖 Collaboration avec Claude Code

### Fichier d'instructions : CLAUDE.md
Le fichier `CLAUDE.md` contient des instructions détaillées pour Claude Code :
- Vue d'ensemble du projet
- Architecture et structure
- Stack technique détaillée
- Fonctionnalités principales
- Guidelines de modification
- Configuration Netlify

### Prompt de relance pour nouvelle session

Pour relancer efficacement une session avec Claude Code, utilisez ce prompt :

```
Contexte du projet TechnoDocs :
- Site web éducatif statique pour cours de Technologie au collège
- Stack : HTML/CSS/JS pur (pas de framework), hébergé sur Netlify
- Architecture : composants réutilisables (header/footer), système de design avec CSS Variables
- Fonctionnalités clés : application flashcards avec flip 3D, recherche, navigation clavier
- Déploiement optimisé : règle ignore dans netlify.toml pour économiser les crédits (195/300 utilisés)
- Branches : main (prod), dev (sync avec main)
- Fichiers exclus du repo : deploy.sh/.bat, CLAUDE.md, package.json (voir .gitignore)

Consulte CLAUDE.md pour les détails techniques complets.

[Décris ici ta demande spécifique...]
```

## 📊 Statistiques

- **30 flashcards** sur l'Indice de Réparabilité
- **Architecture modulaire** avec composants réutilisables
- **0 framework** - Vanilla JavaScript uniquement
- **Déploiement optimisé** - Économie de crédits Netlify
- **Mobile-first** - Responsive sur tous les écrans

## 🔗 Liens utiles

- **Dépôt GitHub** : [StimGlb/technodocs](https://github.com/StimGlb/technodocs)
- **Site en ligne** : Hébergé sur Netlify
- **Documentation Claude** : Voir `CLAUDE.md` pour instructions détaillées

## 📄 Licence

Usage éducatif - Ressources destinées à l'enseignement de la Technologie au Collège.

---

**Créé par StimGLB** | Dernière mise à jour : Janvier 2026
