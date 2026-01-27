# TechnoDocs

Site web éducatif statique pour l'enseignement de la Technologie au Collège (Cycle 4).
Ressources pédagogiques incluant cours, outils interactifs, flashcards et supports de révision.

## 🎯 Vue d'ensemble

**TechnoDocs** est une plateforme web statique sans framework, construite en HTML/CSS/JavaScript pur (ES6+), destinée aux élèves de collège pour l'apprentissage de la Technologie (Cycle 4). Le projet met l'accent sur la **sécurité**, la **performance**, l'**accessibilité** et la **modularité**.

### Thématiques couvertes

- 🏗️ **Conception 3D** — Modélisation et impression 3D
- 🔌 **Réparabilité** — Indice de réparabilité, diagnostic de pannes
- 💻 **Programmation** — Scratch, Python, Arduino
- 🌐 **Internet & Réseaux** — Web, sécurité, communication
- 🎴 **Révisions interactives** — Flashcards avec animations 3D

## 🏗️ Architecture

### Stack technique

| Technologie | Usage |
|-------------|-------|
| HTML5/CSS3 | Structure et design moderne avec CSS Variables |
| JavaScript ES6+ | Vanilla JS, modules ES6, Intersection Observer API |
| Google Fonts | Inter, Space Grotesk, Lexend, Fira Code |
| Sécurité | CSP strict, HSTS, headers Netlify renforcés |
| Hébergement | Netlify avec déploiement automatique |
| Dev Server | Vite pour le développement local (hot reload) |

> **Note** : Aucun framework JavaScript — site 100% statique et modulaire.

### Structure du projet

```
technodocs/
├── index.html                 # Page d'accueil principale
├── src/                       # Sources du site (servi par Netlify)
│   ├── css/
│   │   ├── style.css          # Styles globaux avec CSS Variables
│   │   └── markdown.css       # Styles pour le rendu Markdown
│   ├── js/
│   │   ├── app.js             # Logique principale (navigation, animations)
│   │   ├── components.js      # Chargement dynamique header/footer
│   │   ├── links-loader.js    # Système de liens modulaire
│   │   └── libs/
│   │       ├── lucide.min.js  # Icônes Lucide (local)
│   │       └── marked.min.js  # Parser Markdown (local)
│   ├── includes/
│   │   ├── header.html        # Composant header réutilisable
│   │   ├── footer.html        # Composant footer réutilisable
│   │   └── nav.html           # Navigation mobile
│   ├── images/                # Images et logos
│   ├── data/
│   │   └── links.json         # Configuration centralisée des liens
│   └── pages/
│       ├── flashcards/
│       │   ├── flashcards.html              # Index des flashcards
│       │   ├── reparabilite.html           # 30 flashcards Réparabilité
│       │   ├── reparabilite.js            # Données + logique Réparabilité
│       │   ├── modelisation3d.html        # Flashcards Modélisation 3D
│       │   └── modelisation3d.js          # Données + logique Modélisation 3D
│       ├── corrections/
│       │   ├── fiches_activites.html # Index des corrections
│       │   └── *.html                # Pages de correction dédiées
│       ├── content/
│       │   └── md/                   # Fichiers Markdown sources
│       ├── outils/
│       │   └── tinkercad-classes.html
│       └── md-template.html          # Template générique Markdown
├── docs/                      # Documentation technique
│   ├── MARKDOWN_SYSTEM.md     # Guide système Markdown
│   ├── LINKS_SYSTEM.md        # Guide système de liens
│   └── SECURITY.md            # Bonnes pratiques sécurité
├── scripts/                   # Scripts d'automatisation
│   ├── commit.sh              # Script commit Linux/Mac
│   └── commit.bat             # Script commit Windows
├── security-check.js          # Script de vérification sécurité
├── netlify.toml               # Configuration Netlify + headers sécurité
├── package.json               # Scripts npm et dépendances
└── .gitignore                 # Exclusion fichiers dev/deploy
```

## ✨ Fonctionnalités principales

### 🎴 Applications Flashcards interactives

Deux applications standalone complètes pour l'apprentissage actif :

**Réparabilité (30 flashcards)**
- Questions/réponses sur l'Indice de Réparabilité
- Animation flip 3D avec `transform-style: preserve-3d`
- Recherche en temps réel sur questions et réponses
- Mélange aléatoire (algorithme Fisher-Yates)
- Navigation clavier (flèches, Espace/Enter)

**Modélisation 3D**
- Flashcards sur la conception et l'impression 3D
- Même système d'interaction que Réparabilité

**Fonctionnalités communes** : deux modes d'affichage (grille/carte unique), navigation clavier et souris, design responsive.

### 📝 Système de rendu Markdown

Création facile de pages pédagogiques (corrections, cours, fiches) à partir de fichiers `.md` :

- Table des matières automatique générée depuis les titres H3/H4
- Style optimisé éducation avec police Lexend (dyslexie-friendly)
- Sécurité renforcée : zéro `innerHTML`, utilisation de `DOMParser`
- Marked.js en local (pas de dépendance CDN)
- Encadrés automatiques pour compétences, critères, réponses modèles

### 🔗 Système de liens modulaire

Gestion centralisée de tous les liens via `src/data/links.json` :

- Ajout/suppression sans toucher au HTML
- Support : Outils, Corrections, Cours
- Icônes flexibles (emoji ou images)
- Génération sécurisée via `createElement`
- Fallback HTML si JSON non chargé

### 🧩 Composants réutilisables

- Header/Footer dynamiques chargés via `fetch()`
- Navigation mobile avec menu hamburger animé
- Scroll animations avec Intersection Observer

### 🎨 Design System

Variables CSS centralisées dans `:root` :

```css
/* Couleurs principales */
--color-primary: #6366f1;     /* Indigo */
--color-secondary: #06b6d4;   /* Cyan */
--color-accent: #f59e0b;      /* Amber */

/* Espacements cohérents */
--space-1 à --space-16

/* Typographie */
--text-xs à --text-4xl
```

## 🚀 Déploiement

### Configuration Netlify

Le site est déployé automatiquement sur Netlify à chaque push sur `main`.

**Optimisation des builds** : Le fichier `netlify.toml` contient une règle pour économiser les crédits :

```toml
[build]
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- src/ package.json"
```

Seuls les changements dans `src/` ou `package.json` déclenchent un build.

### Scripts disponibles

```bash
# Développement local avec hot reload
npm run dev

# Vérification de sécurité (local)
npm run security-check

# Vérification de sécurité (production)
npm run security-check:prod

# Commit automatisé
npm run commit        # Linux/macOS
npm run commit:win    # Windows
```

### Déploiement manuel

```bash
git add .
git commit -m "Description des changements"
git push origin main
# → Déploiement automatique Netlify
```

## 💻 Développement local

### Option 1 : Serveur Vite (recommandé)

```bash
npm install    # Première fois uniquement
npm run dev    # Lance le serveur sur http://localhost:3000 (avec hot reload)
```

### Option 2 : Ouverture directe

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

> ⚠️ Certaines fonctionnalités (fetch, modules ES6) nécessitent un serveur local.

## 📂 Gestion Git

### Branches

| Branche | Usage |
|---------|-------|
| `main` | Production (déploiement auto Netlify) |
| `dev` | Développement actif |
| `feature/*` | Fonctionnalités en cours |

### Workflow recommandé

1. Développer sur `dev` ou créer une feature branch
2. Tester localement avec `npm run dev`
3. Vérifier la sécurité avec `npm run security-check`
4. Commiter avec `npm run commit`
5. Merger vers `main` pour déploiement

## 📝 Modifications et ajouts

### Ajouter des flashcards

1. Éditer le fichier `.js` correspondant (`reparabilite.js` ou `modelisation3d.js`)
2. Modifier l'array `flashcardsData` : `{ q: "Question?", a: "Réponse." }`
3. Le HTML correspondant charge automatiquement ce fichier via `<script src="reparabilite.js"></script>`
4. Recompiler avec `npm run build` pour l'intégrer à `/dist`

### Créer une page de correction Markdown

1. Créer le fichier `.md` dans `src/pages/content/md/`
2. Structure : H2 pour titre, H3 pour activités, H4 pour questions
3. Créer une page HTML dédiée (copier un template existant)
4. Adapter le chemin dans `fetch()` vers votre fichier `.md`
5. Voir `docs/MARKDOWN_SYSTEM.md` pour la documentation complète

### Ajouter un lien (outil, correction, cours)

1. Éditer `src/data/links.json`
2. Ajouter l'objet dans la section appropriée
3. Définir : `name`, `url`, `description`/`tag`, `icon`
4. Voir `docs/LINKS_SYSTEM.md` pour la documentation complète

### Sécurité : Scripts externalisés pour CSP

Les flashcards utilisent des scripts externalisés (`.js`) pour respecter la CSP strict :
- ✅ Pas de `<script>` inline
- ✅ Tous les événements et DOM via `addEventListener` et `createElement`
- ✅ Conforme à la politique CSP : `script-src 'self'`

**Important** : Quand vous modifiez une flashcard, externalisez le script inline en fichier `.js` séparé.

### Créer une nouvelle page

1. Créer le fichier HTML dans `src/pages/`
2. Lier `/src/css/style.css` pour les styles globaux
3. Ajouter les placeholders `#header-placeholder` et `#footer-placeholder`
4. Charger `/src/js/components.js` en module
5. **Jamais d'inline scripts** — créer un fichier `.js` séparé si nécessaire

## 🔧 Technologies et patterns

### JavaScript moderne

- ES6 Modules (import/export natifs)
- Async/Await pour le chargement asynchrone
- Intersection Observer API pour les animations
- Template Literals et Arrow Functions

### CSS moderne

- CSS Variables pour le theming
- CSS Grid et Flexbox pour les layouts
- Media Queries pour le responsive
- `prefers-reduced-motion` pour l'accessibilité

### Bonnes pratiques

- ✅ Sécurité renforcée : CSP strict, HSTS, zéro `innerHTML`
- ✅ Mobile-first : design responsive par défaut
- ✅ Accessibilité : ARIA labels, police Lexend, navigation clavier
- ✅ Performance : pas de framework lourd, assets locaux
- ✅ SEO : meta tags, semantic HTML, URLs propres
- ✅ Modularité : composants réutilisables, configuration centralisée

## 📚 Documentation

| Fichier | Contenu |
|---------|---------|
| `docs/MARKDOWN_SYSTEM.md` | Système de rendu Markdown, TOC automatique, guide de style |
| `docs/LINKS_SYSTEM.md` | Gestion centralisée des liens via JSON |
| `docs/SECURITY.md` | Configuration CSP/HSTS, script de vérification |

## 📊 Statistiques

- **2 applications flashcards** — Réparabilité (30 cartes) + Modélisation 3D
- **Système Markdown** — Rendu automatique avec TOC et styles éducatifs
- **0 framework** — Vanilla JavaScript ES6+ uniquement
- **Sécurité renforcée** — CSP strict, HSTS, zéro `innerHTML`
- **Mobile-first** — Responsive sur tous les écrans
- **Accessibilité** — Police Lexend, ARIA labels, navigation clavier

## 🔗 Liens

- **Site en ligne** : [technodocs.netlify.app](https://technodocs.netlify.app)
- **Dépôt GitHub** : [StimGlb/technodocs](https://github.com/StimGlb/technodocs)

## 📄 Licence

Usage éducatif — Ressources destinées à l'enseignement de la Technologie au Collège.

---

**Créé par StimGLB** | Dernière mise à jour : Janvier 2026