# TechnoDocs — Tâches VS Code

Lancer via `Ctrl+Shift+P` → **Tasks: Run Task**
`Ctrl+Shift+B` déclenche directement **Build** (tâche par défaut).

## Dev

| Tâche                     | Commande                          | Description                                               |
| ------------------------- | --------------------------------- | --------------------------------------------------------- |
| Dev Server                | `npm run dev`                     | Lance Vite en mode développement local                    |
| Dev Netlify               | `npm run dev:netlify`             | Lance Netlify Dev (fonctions + redirects)                 |
| Dev Prepare (clean + dev) | `bash scripts/git/dev-prepare.sh` | Supprime `dist/` + `node_modules/.vite` puis relance Vite |

## Build & Check

| Tâche                 | Commande                           | Description                                               |
| --------------------- | ---------------------------------- | --------------------------------------------------------- |
| **Build** _(défaut)_  | `npm run build`                    | Compile le projet dans `dist/`                            |
| Check Dist            | `node scripts/build/check-dist.js` | Vérifie l'intégrité de `dist/` (assets, liens, scripts)   |
| Security Check        | `npm run security-check`           | Audit sécurité sur l'instance locale                      |
| Security Check (prod) | `npm run security-check:prod`      | Audit sécurité sur technodocs.netlify.app                 |
| Session Check         | `npm run session-check`            | Build + check-dist + security + git status → rapport JSON |

## Preview & Deploy

| Tâche                    | Commande                     | Description                                      |
| ------------------------ | ---------------------------- | ------------------------------------------------ |
| Preview                  | `npm run preview`            | Sert `dist/` localement via Vite preview         |
| Deploy Preview           | `npm run deploy:preview`     | Déploie un aperçu Netlify (branche en cours)     |
| Deploy Production        | `npm run deploy:prod`        | ⚠️ Déploie en production sur Netlify             |
| Clean Previews (dry-run) | `npm run clean:previews:dry` | Simule la suppression des vieux previews Netlify |
| Clean Previews           | `npm run clean:previews`     | Supprime les vieux previews Netlify              |

## Git

| Tâche             | Commande                | Description                                       |
| ----------------- | ----------------------- | ------------------------------------------------- |
| Auto Commit       | `npm run commit`        | Auto-commit + push sur la branche courante        |
| Sync Dev Pages    | `npm run dev:sync`      | Synchronise `_dev.html` avec les pages existantes |
| Install Git Hooks | `npm run hooks:install` | Installe le hook post-commit (sync `_dev.html`)   |
