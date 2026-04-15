# TechnoDocs

Site web éducatif statique pour l'enseignement de la Technologie au Collège (Cycle 4).
Ressources pédagogiques incluant cours, outils interactifs, flashcards et supports de révision.

## 🎯 Vue d'ensemble

**TechnoDocs** est une plateforme web statique sans framework, construite en HTML/CSS/JavaScript pur (ES6+), destinée aux élèves de collège pour l'apprentissage de la Technologie (Cycle 4). Le projet met l'accent sur la **sécurité**, la **performance**, l'**accessibilité** et la **modularité**.

## 🏗️ Architecture

### Stack technique

| Technologie | Usage |
|-------------|-------|
| HTML5/CSS3 | Structure et design moderne avec CSS Variables |
| JavaScript ES6+ | Vanilla JS, modules ES6, Intersection Observer API |
| Google Fonts | Inter, Space Grotesk, Lexend, Fira Code |
| Sécurité | CSP strict, HSTS, headers Netlify renforcés |
| Hébergement | Netlify avec déploiement automatique |
| Build & Dev | Vite (build production + dev server avec hot reload) |
| Backend | Firebase/Firestore (wizard devoirs) |

> **Note** : Aucun framework JavaScript — site 100% statique et modulaire.

### Structure du projet

```
technodocs/
├── index.html                 # Page d'accueil principale
├── _dev.html                  # Page d'accueil dev/test
├── public/                    # Assets statiques copiés tels quels dans dist/
│   └── data/
│       ├── links.json         # Liens outils/corrections/cours (fetch runtime)
│       └── navigation.json    # Navigation globale (fetch runtime)
├── src/                       # Sources du site
│   ├── css/
│   │   ├── style.css          # Styles globaux avec CSS Variables
│   │   ├── markdown.css       # Styles pour le rendu Markdown
│   │   ├── cours.css          # Styles pages de cours
│   │   ├── forms.css          # Styles formulaires
│   │   └── wizard.css         # Styles wizard devoirs
│   ├── js/
│   │   ├── app.js             # Logique principale (navigation, animations)
│   │   ├── components.js      # Chargement dynamique header/footer + nav
│   │   ├── links-loader.js    # Système de liens modulaire
│   │   ├── main.js            # Point d'entrée JS
│   │   ├── cours-loader.js    # Chargement des pages de cours
│   │   ├── md-loader.js       # Chargement et rendu Markdown
│   │   ├── article-editor.js  # Éditeur d'articles
│   │   ├── form-handler.js    # Gestion des formulaires
│   │   ├── wizard-config.js   # Configuration wizard devoirs
│   │   ├── wizard-firebase.js # Wizard devoirs + Firebase
│   │   ├── libs/
│   │   │   └── marked.min.js  # Parser Markdown (local)
│   │   └── services/
│   │       └── firebase-config.js  # Configuration Firebase/Firestore
│   ├── includes/
│   │   ├── header.html        # Composant header réutilisable
│   │   └── footer.html        # Composant footer réutilisable
│   ├── images/                # Images et logos
│   ├── data/
│   │   ├── links.json         # Source des liens (import ?raw)
│   │   ├── navigation.json    # Source navigation (import ?raw)
│   │   └── cours/             # Données JSON par cours
│   │       ├── conception-3d.json
│   │       ├── amelioration-objet.json
│   │       └── reparabilite.json
│   ├── content/
│   │   └── md/
│   │       └── cours/         # Fichiers Markdown des cours
│   └── pages/
│       ├── activites/
│       │   ├── devoirs.html                    # Index devoirs
│       │   ├── presentation-objet-technique.html
│       │   └── devoirs/                        # Pages devoirs détaillées
│       ├── corrections/
│       │   ├── index-corrections-fa.html       # Index des corrections
│       │   ├── correction-impression3d.html
│       │   └── correction-reparabilite.html
│       ├── cours/
│       │   ├── index-cours.html                # Index des cours
│       │   ├── conception-3d.html
│       │   ├── modelisation3d.html
│       │   └── reparabilite.html
│       ├── editeur/
│       │   └── article-template.html           # Template éditeur d'articles
│       ├── flashcards/
│       │   ├── flashcards.html                 # Index des flashcards
│       │   ├── reparabilite.html / .js         # Flashcards Réparabilité
│       │   └── modelisation3d.html / .js       # Flashcards Modélisation 3D
│       ├── outils/
│       │   ├── tinkercad-classes.html
│       │   └── tinkercad-handler.js
│       ├── projets/
│       │   ├── cahier-des-charges-interactif.html
│       │   └── conception-objet-technique.html
│       ├── quiz/
│       │   ├── quiz-modelisation-3d.html
│       │   └── quiz-reparabilite.html
│       └── ressources/
│           └── ressources.html
├── docs/                      # Documentation technique
│   ├── LINKS_SYSTEM.md        # Guide système de liens
│   ├── MARKDOWN_SYSTEM.md     # Guide système Markdown
│   ├── SECURITY.md            # Bonnes pratiques sécurité
│   ├── VITE_SETUP.md          # Configuration Vite
│   └── QUICK_START_LINKS.md   # Guide rapide liens
├── scripts/                   # Scripts d'automatisation
│   ├── autocommit.sh          # Auto-commit
│   ├── new-branch.sh          # Création de branches
│   ├── release.sh             # Déploiement release
│   ├── prepush.sh             # Vérifications pre-push
│   ├── backup-repo.sh         # Backup du repo
│   ├── deps-update.sh         # Mise à jour dépendances
│   ├── dev-prepare.sh         # Préparation env dev
│   ├── export-firestore.js    # Export données Firestore
│   └── autofill-wizard-firestore.js  # Remplissage auto wizard
├── vite.config.js             # Configuration Vite (build, aliases, dev server)
├── security-check.js          # Script de vérification sécurité
├── netlify.toml               # Configuration Netlify + headers sécurité
├── .env.example               # Template variables d'environnement
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

- Header/Footer bundlés via imports Vite `?raw` (pas de fetch runtime)
- Navigation dynamique construite depuis `navigation.json`
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

### Scripts disponibles

```bash
# Développement
npm run dev              # Serveur Vite (http://localhost:3000)
npm run dev:netlify      # Serveur Netlify CLI + Vite (http://localhost:8888)
npm run build            # Build de production dans dist/
npm run preview          # Preview du build local

# Déploiement Netlify
npm run deploy:preview   # Deploy preview (brouillon)
npm run deploy:prod      # Deploy en production

# Sécurité
npm run security-check        # Vérification locale
npm run security-check:prod   # Vérification production
```

### Déploiement

Le site est déployé automatiquement sur Netlify à chaque push sur `main`. Pour un déploiement manuel :

```bash
npm run deploy:preview   # Tester d'abord en preview
npm run deploy:prod      # Puis déployer en production
```

## 💻 Développement local

```bash
npm install    # Première fois uniquement
npm run dev    # Lance le serveur Vite sur http://localhost:3000 (hot reload)
```

> ⚠️ Un serveur local est requis (modules ES6, fetch). L'ouverture directe du HTML ne fonctionne pas.

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
| `docs/QUICK_START_LINKS.md` | Guide rapide pour ajouter/modifier des liens |
| `docs/SECURITY.md` | Configuration CSP/HSTS, script de vérification |
| `docs/VITE_SETUP.md` | Configuration Vite, build, aliases |

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

**Créé par StimGLB** | Dernière mise à jour : Février 2026
