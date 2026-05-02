# AGENTS.md — TechnoDocs

Quick-ramp guide for AI agents. Every item here is something an agent would likely miss.
See `CLAUDE.md` for the full conventions reference.

---

## Stack Constraints (Hard Rules)

- **No framework JS** — vanilla HTML/CSS/ES6 only. Never propose React/Vue/Svelte.
- **No CSS framework** — custom CSS (BEM-like). Never propose Tailwind/Bootstrap.
- **No extra bundlers** — Vite only.
- **No `innerHTML` in new code** — use `textContent`, `createElement`, `appendChild`. Replace opportunistically when editing existing files.
- **No inline event handlers** — no `onclick=` in HTML. Use `addEventListener`.
- **`data-field` attributes** — kebab-case only (`student-name`, `q1-chauffage-source`). Existing code has camelCase violations; new code must use kebab-case.

---

## Dev Commands

```bash
npm run dev              # Vite dev server — port 3001 (not 3000)
npm run dev:netlify      # Netlify CLI proxy — port 8888 → Vite 3001
npm run build            # Vite build → dist/
npm run preview          # Serve dist/ on port 4173
npm run security-check   # Audit CSP/XSS (must pass before any deploy)
npm run deploy:preview   # build + netlify deploy (draft)
npm run deploy:prod      # build + netlify deploy --prod
```

**Never** deploy without building first — there is no safe "deploy source directly" path.

---

## Build Quirks

### Multi-entry HTML
Vite scans the entire project tree for all `.html` files and builds each as a separate Rollup entry. Every `.html` file is a page.

### Runtime-fetched files not bundled by Vite
These are copied verbatim to `dist/` by a custom `copyStaticAssets` Vite plugin. Vite does NOT process or bundle them:

- `src/js/libs/` — `marked.min.js`, `chart.umd.min.js` (loaded via plain `<script>`, not ES modules)
- `src/data/cours/`, `src/data/activites/`, `src/data/revisions/`, `src/data/referentiels/`, `src/data/graphiques/`
- `src/content/md/` — Markdown source files (never edit these — external input from another project)
- `src/assets/` — images referenced in `.md` files
- `_redirects`

If you add a new runtime-fetched file outside `src/data/` or `src/content/`, it must be added to the plugin in `vite.config.js`.

### Header/footer injection
`components.js` uses Vite `?raw` imports — header and footer HTML are **bundled at build time**, not fetched at runtime. Editing `src/includes/header.html` or `footer.html` requires a rebuild to take effect. Code depending on the header/footer DOM must listen for the `components-loaded` CustomEvent.

### GitHub Pages build
CI workflow (triggers on push to `dev`) sets `GITHUB_PAGES=true`, which changes Vite `base` to `/technodocs/`. This is a secondary deploy target — Netlify is primary.

### SPA fallback trap
Netlify has `/* → /index.html (200)` but `/src/*` is excluded. Any HTML page not physically present in `dist/` silently falls back to `index.html` — no 404 error shown.

---

## Firebase / Wizard System

### Firebase SDK
Loaded from CDN (`https://www.gstatic.com/firebasejs/9.23.0/`), **not from npm**. The `firebase` npm package in `package.json` is for admin scripts only. Config from `VITE_FIREBASE_*` env vars. If vars are missing, `db === null` and wizards degrade silently to local-only mode.

### WizardFirebase — instantiation pattern

```html
<!-- Always at end of HTML body, after DOM -->
<script type="module">
  import { WizardFirebase } from '/src/js/wizard-firebase.js';
  const wizard = new WizardFirebase({
    collectionName: 'collection_name',         // Firestore collection
    requiredFields: { 'field-name': true },    // kebab-case keys
  });
  // If page uses window.wizardGoToPhase / window.wizardComplete etc.:
  window.wizardInstance = wizard;
</script>
```

### Required DOM elements for WizardFirebase

| Selector | Purpose |
|---|---|
| `[data-field="*"]` | All form inputs — kebab-case names |
| `.wizard__phase[data-phase="N"]` | Phase containers |
| `.wizard__nav-btn[data-phase="N"]` | Navigation buttons |
| `#progressFill`, `#progressPercentage` | Progress bar |
| `#saveIndicator` | Save status (needs `.wizard__save-dot`, `.wizard__save-text`) |
| `#wizardToast` | Toast notifications |
| `#projectDate` | Auto-set date (read-only) |
| `#completionModal`, `#resetModal` | Modals |
| `#passwordOverlay` | If present, set `autoInit: false` and call `wizard.init()` manually |

### Window bridge (for legacy onclick= pages)
Pages that still use `onclick=` calls must set `window.wizardInstance = wizard`. The class exports: `window.wizardGoToPhase`, `window.wizardComplete`, `window.wizardReset`, `window.wizardExportJSON`, `window.wizardImportJSON`, `window.wizardShowModal`, `window.wizardCloseModal`.

### Autosave
Debounced 5 seconds after last field change. Phase navigation triggers an immediate save. Session doc ID stored in `localStorage` with a 1-hour expiry (`wizard_{collectionName}_session`).

---

## Content Separation

**Never create, edit, or refactor** `src/content/md/**` — these are external inputs from a separate project. They are fetched at runtime and rendered via `marked.min.js`.

Correct targets for page structure: `src/pages/cours/`, `src/pages/activites/`, `src/pages/corrections/`.

---

## CSS

- Global variables: `src/css/style.css` (`:root`)
- Wizard styles: `src/css/wizard.css` — BEM: `wizard__*`
- Never add `<style>` tags inside HTML pages; add a CSS module file instead.
- No `unsafe-inline` removal needed right now — it's a known tracked debt.

---

## Branch / Deploy Policy (as of May 2026)

- **`main`** = production (Netlify). **Frozen** — do not merge `dev` → `main`. Scheduled for May/June review.
- **`dev`** = active branch, 87 commits ahead of main.
- **Workflow**: branch from `dev` → PR → merge into `dev` → Netlify preview auto-deploys.
- On `dev`, Netlify redirects `/` → `/_dev.html` (302). On `main`, `/` → `index.html`.

---

## Pre-submit Checklist

1. `npm run build` — no errors
2. `npm run security-check` — must pass
3. Open `localhost:3001` — DevTools console shows zero CSP warnings
4. If wizard modified: test field save/restore and phase navigation
5. Check `dist/` for the new/modified pages
