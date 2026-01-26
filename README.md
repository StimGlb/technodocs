# TechnoDocs

Site web éducatif statique pour l'enseignement de la Technologie au Collège (Cycle 4).
Ressources pédagogiques incluant cours, outils interactifs, flashcards et supports de révision.

## 🎯 Vue d'ensemble

**TechnoDocs** est une plateforme web statique sans framework, construite en HTML/CSS/JavaScript pur (ES6+), destinée aux élèves de collège pour l'apprentissage de la Technologie (Cycle 4). Le projet met l'accent sur la **sécurité**, la **performance**, l'**accessibilité** et la **modularité**.

### Thématiques couvertes
- 🏗️ **Conception 3D** - Modélisation et impression 3D
- 🔌 **Réparabilité** - Indice de réparabilité, diagnostic de pannes
- 💻 **Programmation** - Scratch, Python, Arduino
- 🌐 **Internet & Réseaux** - Web, sécurité, communication
- 🎴 **Révisions interactives** - Flashcards avec animations 3D

## 🏗️ Architecture

### Stack technique
- **HTML5/CSS3** - Structure et design moderne avec CSS Variables
- **JavaScript ES6+** - Vanilla JS, modules ES6, Intersection Observer API
- **Fonts** - Google Fonts (Inter, Space Grotesk, Lexend, Fira Code)
- **Sécurité** - CSP strict, HSTS, headers Netlify renforcés
- **Hébergement** - Netlify avec déploiement automatique optimisé
- **Dev Server** - Vite pour le développement local avec hot reload
- **Pas de framework** - Site statique pur, architecture modulaire

### Structure du projet

```
technodocs/
├── index.html                 # Page d'accueil principale
├── src/                       # Sources du site (servi par Vite en dev)
│   ├── css/
│   │   ├── style.css         # Styles globaux avec CSS Variables
│   │   └── markdown.css      # Styles pour le rendu Markdown
│   ├── js/
│   │   ├── app.js            # Logique principale (navigation, animations)
│   │   ├── components.js     # Chargement dynamique header/footer
│   │   ├── links-loader.js   # Système de liens modulaire
│   │   └── libs/
│   │       ├── lucide.min.js # Icônes Lucide (local)
│   │       └── marked.min.js # Parser Markdown (local)
│   ├── includes/
│   │   ├── header.html       # Composant header réutilisable
│   │   ├── footer.html       # Composant footer réutilisable
│   │   └── nav.html          # Navigation mobile
│   ├── assets/
│   │   └── images/           # Images et logos
│   ├── data/
│   │   └── links.json        # Configuration centralisée des liens
│   └── pages/
│       ├── flashcards/
│       │   ├── flashcards.html      # Index des flashcards
│       │   ├── reparabilite.html    # 30 flashcards Réparabilité
│       │   └── modelisation3d.html  # Flashcards Modélisation 3D
│       ├── corrections/
│       │   ├── fiches_activites.html        # Index des corrections
│       │   ├── correction-impression3d.html # Correction dédiée
│       │   └── correction-reparabilite.html # Correction dédiée
│       ├── content/
│       │   └── md/                  # Fichiers Markdown sources
│       │       ├── correction-impression3d.md
│       │       └── correction-reparabilite.md
│       ├── outils/
│       │   └── tinkercad-classes.html
│       └── md-template.html         # Template générique Markdown
├── dist/                      # Copie de src/ pour compatibilité (legacy)
├── data/
│   └── links.json            # Configuration des liens (racine)
├── docs/                     # Documentation technique
│   ├── MARKDOWN_SYSTEM.md    # Guide système Markdown
│   ├── LINKS_SYSTEM.md       # Guide système de liens
│   ├── SECURITY.md           # Bonnes pratiques sécurité
│   └── resume.md             # Résumé des améliorations
├── scripts/                  # Scripts d'automatisation
│   ├── commit.sh             # Script commit Linux/Mac
│   ├── commit.bat            # Script commit Windows
│   └── SCRIPTS.md            # Documentation des scripts
├── security-check.js         # Script de vérification sécurité
├── netlify.toml              # Configuration Netlify + headers sécurité
├── _redirects                # Règles de redirection Netlify
├── package.json              # Scripts npm et dépendances
└── .gitignore                # Exclusion fichiers dev/deploy
```

## ✨ Fonctionnalités principales

### 🎴 Applications Flashcards interactives

Deux applications standalone complètes pour l'apprentissage actif :

#### Réparabilité (30 flashcards)
- Questions/réponses sur l'Indice de Réparabilité
- Animation flip 3D avec `transform-style: preserve-3d`
- Recherche en temps réel sur questions et réponses
- Mélange aléatoire (algorithme Fisher-Yates)
- Navigation clavier (flèches, Espace/Enter)
- Statistiques dynamiques

#### Modélisation 3D
- Flashcards sur la conception et l'impression 3D
- Même système d'interaction que Réparabilité
- Design cohérent avec palette de couleurs dédiée

**Fonctionnalités communes :**
- **Deux modes d'affichage** : grille complète ou carte unique
- **Navigation fluide** : Clavier et souris
- **Design intégré** : Header/footer du site + styles cohérents
- **Responsive** : Adapté mobile et desktop

### 📝 Système de rendu Markdown

Permet de créer facilement des pages de contenu pédagogique (corrections, cours, fiches) à partir de fichiers `.md` :

- **Table des matières automatique** - Générée depuis les titres H3/H4
- **Style optimisé éducation** - Police Lexend (dyslexie-friendly), fond papier
- **Sécurité renforcée** - Zéro `innerHTML`, utilisation de `DOMParser`
- **Marked.js local** - Pas de dépendance CDN
- **Encadrés automatiques** - Pour compétences, critères, réponses modèles
- **Tableaux stylisés** - Avec alternance de couleurs et hover
- **Blocs de code** - Avec Fira Code et coloration

**Pages disponibles :**
- Correction Impression 3D
- Correction Réparabilité
- Template générique avec paramètre `?doc=`

### 🔗 Système de liens modulaire

Gestion centralisée de tous les liens de l'index via `data/links.json` :

- **Centralisation** - Tous les liens dans un seul fichier JSON
- **Modularité** - Ajout/suppression sans toucher au HTML
- **Types supportés** - Outils, Corrections, Cours
- **Icônes flexibles** - Emoji ou images personnalisées
- **Génération sécurisée** - Via `createElement` (pas d'`innerHTML`)
- **Fallback HTML** - Si JSON non chargé, contenu statique affiché

### 🧩 Système de composants réutilisables

- **Header/Footer dynamiques** - Chargés via `fetch()` et injectés dans les placeholders
- **Navigation mobile** - Menu hamburger responsive avec animations
- **Scroll animations** - Intersection Observer pour effets au défilement
- **Architecture modulaire** - Composants indépendants et réutilisables

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
- **Utilisation actuelle** : 270/300 (30 minutes restantes)
- **Stratégie** : Regrouper les modifications et déployer uniquement les changements testés et fonctionnels

### Scripts de déploiement et commit

**Commit automatisé (Windows)** :
```bash
npm run commit:win
# OU
./scripts/commit.bat
```

**Commit automatisé (Linux/macOS)** :
```bash
npm run commit
# OU
./scripts/commit.sh
```

Les scripts automatisent :
1. Affichage du statut Git
2. Détection des modifications non committées
3. Affichage des fichiers modifiés
4. Prompt pour le message de commit
5. Add, commit et push vers GitHub
6. Déploiement automatique Netlify (si fichiers src/ modifiés)

**Vérification de sécurité** :
```bash
# Local
npm run security-check

# Production
npm run security-check:prod
```

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
- **`main`** - Branche de production (déploiement automatique Netlify)
- **`dev`** - Branche de développement active
- **`feature/*`** - Branches de fonctionnalités (ex: `feature/md-template`)

### Workflow recommandé
1. Développer sur `dev` ou créer une feature branch
2. Tester localement avec `npm run dev`
3. Vérifier la sécurité avec `npm run security-check`
4. Commiter avec `npm run commit` ou `npm run commit:win`
5. Merger vers `main` pour déploiement en production

### Fichiers ignorés (.gitignore)
Les fichiers suivants sont exclus du dépôt :
- Dépendances : `node_modules/`, `package-lock.json`
- Fichiers système et IDE : `.vscode/`, `.idea/`, `.DS_Store`
- Netlify : `.netlify/`
- Logs et temporaires : `*.log`, `*.tmp`

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
- ✅ **Sécurité renforcée** - CSP strict, HSTS, anti-XSS (zéro `innerHTML`)
- ✅ **Mobile-first** - Design responsive par défaut
- ✅ **Accessibilité** - Attributs ARIA, police Lexend, navigation clavier
- ✅ **Performance** - Pas de framework lourd, lazy loading, assets locaux
- ✅ **SEO** - Meta tags, semantic HTML, URLs propres
- ✅ **Modularité** - Composants réutilisables, configuration centralisée
- ✅ **Maintenabilité** - Code documenté, architecture claire

## 📝 Modifications et ajouts

### Pour ajouter des flashcards
1. Éditer le fichier HTML correspondant dans `src/pages/flashcards/`
2. Modifier l'array `flashcardsData` dans le `<script>`
3. Format : `{ q: "Question?", a: "Réponse." }`
4. Mettre à jour le compteur total si nécessaire

### Pour créer une page de correction Markdown
1. Créer le fichier `.md` dans `src/pages/content/md/`
2. Suivre la structure : H2 pour titre, H3 pour activités, H4 pour questions
3. Créer une page HTML dédiée (copier `correction-impression3d.html`)
4. Adapter le chemin dans `fetch()` vers votre fichier `.md`
5. Ajouter le lien dans `src/pages/corrections/fiches_activites.html`
6. **Documentation complète** : Voir `docs/MARKDOWN_SYSTEM.md`

### Pour ajouter un lien (outil, correction, cours)
1. Éditer `data/links.json`
2. Ajouter l'objet dans la section appropriée (`outils`, `corrections`, `cours`)
3. Définir : `name`, `url`, `description`/`tag`, `icon`
4. Valider la syntaxe JSON
5. Tester en local avec `npm run dev`
6. **Documentation complète** : Voir `docs/LINKS_SYSTEM.md`

### Pour créer une nouvelle page
1. Créer le fichier HTML dans `src/pages/`
2. Lier `../css/style.css` pour les styles globaux
3. Ajouter les placeholders `#header-placeholder` et `#footer-placeholder`
4. Charger `../js/components.js` en module
5. Ajouter le lien dans la navigation (`src/includes/header.html`) ou via `links.json`

### Pour modifier les styles globaux
- Éditer `src/css/style.css`
- Utiliser les variables CSS existantes (`:root`)
- Tester sur toutes les pages
- Pour les pages Markdown : éditer `src/css/markdown.css`

## 📚 Documentation

Le projet dispose d'une documentation technique complète dans le dossier `docs/` :

### Guides système
- **`MARKDOWN_SYSTEM.md`** - Système de rendu Markdown complet
  - Création de pages de corrections
  - Table des matières automatique
  - Guide de style et bonnes pratiques
  - Personnalisation et troubleshooting

- **`LINKS_SYSTEM.md`** - Système de liens modulaire
  - Gestion centralisée via JSON
  - Ajout d'outils, corrections, cours
  - Types d'icônes et personnalisation
  - Exemples et troubleshooting

- **`SECURITY.md`** - Bonnes pratiques sécurité
  - Configuration CSP et HSTS
  - Guide d'utilisation du script `security-check.js`
  - Recommandations production
  - Checklist de déploiement

- **`VITE_SETUP.md`** - Configuration Vite et développement

### Fichiers de référence
- **`resume.md`** - Résumé des améliorations de sécurité (2026-01-21)
- **`scripts/SCRIPTS.md`** - Documentation des scripts d'automatisation

## 📊 Statistiques

- **2 applications flashcards** - Réparabilité (30 cartes) + Modélisation 3D
- **Système Markdown** - Rendu automatique avec TOC et styles éducatifs
- **Système de liens modulaire** - Configuration JSON centralisée
- **Architecture modulaire** - Composants réutilisables (header, footer, nav)
- **0 framework** - Vanilla JavaScript ES6+ uniquement
- **Sécurité renforcée** - CSP strict, HSTS, zéro `innerHTML`
- **Score sécurité** - 63% local, ~90% production attendu
- **Déploiement optimisé** - Économie de crédits Netlify (270/300 utilisés)
- **Mobile-first** - Responsive sur tous les écrans
- **Accessibilité** - Police Lexend, ARIA labels, navigation clavier

## 🔗 Liens utiles

- **Dépôt GitHub** : [StimGlb/technodocs](https://github.com/StimGlb/technodocs)
- **Site en ligne** : Hébergé sur Netlify
- **Documentation Claude** : Voir `CLAUDE.md` pour instructions détaillées

## 📄 Licence

Usage éducatif - Ressources destinées à l'enseignement de la Technologie au Collège.

---

**Créé par StimGLB** | Dernière mise à jour : Janvier 2026
