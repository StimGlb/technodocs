# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TechnoDocs is a multi-page static educational website for teaching Technology at French middle schools (Collège, Cycle 4). It provides course materials, interactive tools, revision resources, and flashcard applications for learning various technology concepts including electronics, programming, 3D design, and repairability.

## Architecture

This is a **static website** with no build process or framework dependencies:
- Pure HTML, CSS, and vanilla JavaScript
- Client-side only (no backend required)
- Deployed on Netlify with automatic deployment from the `main` branch

### Project Structure

```
technodocs/
├── index.html              # Main landing page with navigation
├── dist/
│   ├── css/
│   │   └── style.css      # Main site styles with CSS variables
│   ├── js/
│   │   └── app.js         # Main site JavaScript (navigation, animations)
│   └── pages/
│       └── flashcards/
│           ├── reparabilite.html  # Standalone flashcard app (30 cards)
│           └── flashcards.html    # (empty placeholder)
├── deploy.bat             # Windows deployment script
├── deploy.sh              # Linux/macOS deployment script
├── netlify.toml           # Netlify configuration
└── package.json           # NPM configuration with Vite setup
```

### Technology Stack

- **Fonts**: Google Fonts (Inter, Space Grotesk for main site; DM Sans, Fraunces for flashcards)
- **CSS**: Modern CSS with custom properties, Grid, Flexbox
- **JavaScript**: ES6+ modules, Intersection Observer API for scroll animations
- **Deployment**: Netlify with automatic deployments

## Main Site (index.html + dist/)

The main landing page provides navigation to different sections:

**Sections**:
- Hero section with call-to-action buttons
- Cours & Infographies (courses)
- Outils Numériques (external tool links: Vittascience, Tinkercad, mBlock, etc.)
- Révisions (flashcards, fiches, quiz)
- Ressources (videos, documents, useful links)

**Key Features** (dist/js/app.js):
- Mobile navigation menu with hamburger button
- Scroll-based animations using Intersection Observer
- Header shadow effect on scroll
- Smooth scrolling between sections

**Styling** (dist/css/style.css):
- CSS custom properties for theming (indigo, cyan, amber color palette)
- Responsive design with mobile-first approach
- Modern component-based layout (cards, buttons, navigation)

## Flashcard Application (dist/pages/flashcards/reparabilite.html)

A **standalone single-file application** for teaching "Indice de Réparabilité" (Repairability Index):

**Data Structure** (reparabilite.html:525-556):
- 30 flashcards stored in `flashcardsData` array with `q` (question) and `a` (answer) properties
- All content embedded in JavaScript

**Application State**:
- `cards`: Complete set of flashcards
- `filteredCards`: Currently displayed subset based on search
- `currentIndex`: Active card in single-card mode
- `singleMode`: Boolean toggling between grid and single-card views
- `allFlipped`: Tracks global flip state

**Core Features**:
1. **Dual Display Modes**: Grid view (all cards) vs single-card view with navigation
2. **3D Card Flip Animation**: CSS `transform-style: preserve-3d` with 180° rotation
3. **Search Functionality**: Real-time filtering across questions and answers
4. **Shuffle**: Fisher-Yates algorithm implementation
5. **Keyboard Navigation**: Arrow keys and spacebar/enter in single-card mode

**Styling**: Dark theme with green accents (`--accent-green`, `--accent-lime`, `--accent-teal`)

## Development Commands

### Running Locally

**Option 1**: Direct file open (for quick testing)
```bash
start index.html              # Windows
open index.html               # macOS
xdg-open index.html           # Linux
```

**Option 2**: Using Vite dev server (if you need hot reload)
```bash
npm install    # First time only
npm run dev    # Start dev server
```

### Deployment

**Automatic deployment** using provided scripts:

```bash
# Windows
deploy.bat
# OR
npm run deploy:win

# Linux/macOS
./deploy.sh
# OR
npm run deploy
```

The deployment scripts:
1. Verify you're on the `main` branch
2. Check for uncommitted changes
3. Display modified files
4. Prompt for commit message (default: "Update flashcards content")
5. Add, commit, and push to GitHub
6. Netlify automatically deploys from `main` branch

**Manual deployment**:
```bash
git add .
git commit -m "Your message"
git push origin main
```

## Modification Guidelines

### Adding/Editing Flashcards

Edit `dist/pages/flashcards/reparabilite.html`:

1. Modify the `flashcardsData` array (lines 525-556):
```javascript
{ q: "Question text?", a: "Answer text." }
```

2. Update hardcoded totals in HTML (lines 499, 513) and JavaScript initialization

### Modifying Main Site Content

- **HTML Structure**: Edit `index.html` directly
- **Styles**: Edit `dist/css/style.css` (uses CSS custom properties in `:root`)
- **JavaScript**: Edit `dist/js/app.js` (ES6 modules)

### Adding New Pages

Create new HTML files in `dist/pages/` and link them from navigation in `index.html`. Each page can be standalone (like reparabilite.html) or use the main site's CSS/JS.

### Styling System

Both the main site and flashcard app use CSS custom properties for theming:

**Main Site** (dist/css/style.css):
- `--color-primary`: #6366f1 (Indigo)
- `--color-secondary`: #06b6d4 (Cyan)
- `--color-accent`: #f59e0b (Amber)

**Flashcard App** (reparabilite.html):
- `--accent-green`: #22c55e
- `--accent-lime`: #a3e635
- `--accent-teal`: #14b8a6
- Dark theme: `--bg-primary`: #0a0f0d

## Netlify Configuration

Configured in `netlify.toml`:
- Publishes from root directory (`.`)
- No build command (static HTML)
- Security headers (X-Frame-Options, CSP, etc.)
- Cache control for static assets (1 year for CSS/JS/images)
- 404 redirect to index.html

## Important Notes

- The project is fully in **French** (target audience: French middle school students)
- No framework dependencies - pure vanilla JavaScript
- Browser compatibility: Modern browsers with ES6+ support
- Mobile-responsive design throughout
- All external tool links open in new tabs with `rel="noopener"`
