---
trigger: always_on
---

# TechnoDocs Project Rules - 2026 Standards

## Core Philosophy

- **Vanilla Only**: Strict Vanilla JS (ES6+). No frameworks (React, Vue, etc.) or heavy libraries. Use native Browser APIs (Fetch, Intersection Observer).
- **Architecture**: Modular components loaded via fetch. Main structural changes must happen in `src/includes/header.html` or `footer.html`.

## Security (Critical - Ref: resume.md)

- **Anti-XSS**: NEVER use `innerHTML`. Use `document.createElement()`, `textContent`, and `appendChild`.
- **Validation**: Always validate HTTP responses with `if (!response.ok)`.
- **Environment**: Keep console logs only for `localhost`. Use generic error messages for production.
- **CSP Compliance**: Ensure all new scripts or styles respect the strict CSP defined in `netlify.toml`.

## Netlify & Build Optimization

- **Build Credits**: Group modifications to save Netlify build minutes. Do not hardcode usage numbers in documentation; check current quotas on the Netlify dashboard before planning deployments.
- **Deployment**: Check `netlify.toml` headers (HSTS, CSP, Permissions-Policy) before suggesting network-related changes.

## Educational Quality

- **Naming**: Use descriptive English for variables/functions (pedagogical clarity).
- **Accessibility**: Include `aria-label` for all interactive elements and icons.
- **Content**: Align with French "Cycle 4" Technology curriculum (Robotics, 3D Design, Networks).

## Git Workflow

- **Branch**: Work on `dev` for feature development; reserve `main` for releases and hotfixes.
- **Commits**: Always use the project's commit scripts: `npm run commit` (Linux/macOS) or `npm run commit:win` (Windows). Do not bypass these scripts.

🔗 1. Fullstack Bridge & Hybrid Data
Dual-Sourcing : Toute interface de données (comme le Dashboard) doit être capable d'interroger simultanément l'API Locale (http://localhost:3000/api) et Firebase Firestore.

Schema Consistency : Les formulaires frontend doivent envoyer un objet answers structuré pour correspondre au champ JSON flexible du backend.

Source Labeling : Chaque entrée affichée doit porter un badge indiquant sa provenance (local ou firebase) pour éviter toute confusion pédagogique.

🏗️ 2. Clean Frontend Architecture (Rapport Ref:)
Logic Isolation : Ne jamais inclure de logique métier complexe (calculs, appels API, Firebase SDK) directement dans les fichiers .html. Tout doit être exporté dans des modules dédiés sous src/js/.

Zero-Inference Modules : Utiliser des scripts de type module (<script type="module">) pour garantir l'isolation des portées et éviter les collisions de variables globales.

Static Templates : Le HTML ne doit contenir que la structure sémantique. Les lignes de tableaux ou les cartes de données doivent être générées via document.createElement pour respecter la sécurité anti-XSS.

🧼 3. Design System & CSS
Portal Styling : Les styles spécifiques aux outils d'administration doivent résider dans src/css/portal.css pour ne pas alourdir la feuille de style principale des élèves.

Visual Feedback : Chaque action asynchrone (envoi de formulaire, chargement de dashboard) doit impérativement afficher un indicateur visuel de statut (ex: "Chargement...", "Échec API").
