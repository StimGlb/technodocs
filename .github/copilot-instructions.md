# AI Agent Instructions for TechnoDocs

## Project Overview
**TechnoDocs** is a static educational platform for teaching secondary-level Technology (Cycle 4) in French. Built with vanilla HTML/CSS/JavaScript (ES6+), it emphasizes security, performance, accessibility, and modularity without frameworks.

### Tech Stack
- **Static site**: No backend/database; hosted on Netlify
- **Build tool**: Vite (dev server with hot reload; builds to `/dist`)
- **Security-first**: Strict CSP, no `innerHTML`, local dependencies only
- **No frameworks**: Pure ES6 modules, CSS Variables, Intersection Observer API
- **CSS standards**: Gender-neutral design, Lexend font for dyslexia-friendly reading

## Architecture Patterns

### 1. **Component System**
- **Header/Footer**: Dynamically loaded HTML (`src/includes/header.html`, `footer.html`) via `components.js`
- **Security**: Uses `DOMParser` instead of `innerHTML` to maintain CSP compliance
- **Pattern**: Placeholder elements (`#header-placeholder`, `#footer-placeholder`) replaced with fetched content
- **Error handling**: Fallback fallback UI if includes fail to load (silent in production, logged in dev)

### 2. **Centralized Link Management**
- **Config file**: `src/data/links.json` defines all navigation (tools, corrections, courses, revisions)
- **Loader module**: `links-loader.js` dynamically renders links as cards using `createElement` (CSP-safe)
- **Icon system**: Supports emoji, images, and custom icons via type/value schema
- **Benefits**: Add/modify links without touching HTML; external links marked with `external: true`

### 3. **Markdown Rendering System**
- **Files**: Source markdown in `src/pages/content/md/*.md`, compiled pages in `src/pages/corrections/*.html`
- **Template**: Generic `md-template.html` with query parameter `?doc=path/to/file.md`
- **Parser**: Local `marked.min.js` (v11.1.1) respects CSP; no CDN
- **Features**: Auto-generated table of contents from h3/h4 headings, semantic HTML for accessibility
- **Example**: `/dist/pages/corrections/correction-reparabilite.html` renders `content/md/correction-reparabilite.md`

## Critical Developer Workflows

### Build & Deploy
```bash
npm run dev            # Start Vite dev server (port 3000, opens browser)
npm run build          # Build to /dist (Vite + Rollup)
npm run preview        # Preview production build locally (port 4173)
npm run deploy:preview # Deploy preview to Netlify
npm run deploy:prod    # Deploy to production
npm run security-check # Verify CSP and security headers against live site
```

### Deployment Notes
- **Branch strategy**: Push to main → automatic Netlify deploy
- **Environment**: Netlify reads from root directory (index.html at `/`)
- **Build command**: Empty (static site, no build step needed)
- **Ignore rule**: Skip build if only `/dist` or `package.json` changed

### Development Safety
- Always run `npm run security-check` before production deploys
- Local dev uses full CSP headers (test CSP violations early)
- Browser console shows CSP errors; fix immediately as they block features

## Project-Specific Conventions

### 1. **Security-First Development**
- **Never use**: `innerHTML`, `eval()`, `document.write()`, inline event handlers
- **Always**: Validate HTTP responses with `response.ok`, use `createElement` for DOM injection
- **CSP policy**: `script-src 'self'` (only local scripts), Google Fonts allowed, no external scripts
- **Testing**: Open DevTools → Console; no CSP warnings should appear

### 2. **Accessibility & Education Focus**
- **Typography**: Lexend font (lines 1.8, base 1.125rem) for readability; dyslexia-friendly
- **Color**: Creamed background (#fefdfb) reduces eye strain
- **Semantics**: Use proper HTML5 semantic tags (`<section>`, `<article>`, `<nav>`)
- **Mobile-first**: All pages responsive; test on mobile early

### 3. **CSS Architecture**
- **Variables**: Define colors/spacing in `:root` (e.g., `--color-primary: #6366f1`)
- **Structure**: `style.css` (globals) + `markdown.css` (content styling) + inline `<style>` in app.js for animations
- **Avoid**: No Tailwind/preprocessors; hand-written CSS kept minimal
- **Animations**: Use CSS transitions/transforms, not JavaScript animations

### 4. **Data Flow**
```
links.json → links-loader.js → createElement (card generation)
           ↓
        app.js → initNavigation, initScrollAnimations, etc.

Markdown files → marked.min.js → HTML output → markdown.css styling
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/js/app.js` | Navigation toggle, scroll animations (Intersection Observer), security compliance |
| `src/js/components.js` | Header/footer loading with safe DOM replacement |
| `src/js/links-loader.js` | JSON-to-HTML link rendering; central content discovery |
| `src/data/links.json` | Centralized config for all site navigation |
| `netlify.toml` | Security headers (CSP, HSTS), caching rules, build config |
| `src/css/style.css` | Global styles with CSS variables |
| `src/css/markdown.css` | Semantic styling for `.md` content (headings, tables, code blocks) |

## Common Tasks

### Adding a New Educational Page
1. Create markdown file: `src/pages/content/md/correction-mynewpage.md`
2. Create or use template HTML: `src/pages/corrections/correction-mynewpage.html`
3. Update `src/data/links.json` to add entry in `"corrections"` or `"cours"` arrays
4. Build: `npm run build` → Vite copies to `/dist`

### Adding a New Tool/External Link
Edit `src/data/links.json` under `"outils"`:
```json
{
  "name": "MyTool",
  "url": "https://example.com",
  "tag": "Category",
  "icon": { "type": "emoji", "value": "🔧" },
  "external": true
}
```

### Fixing Security Issues
- **CSP violations**: Check DevTools console → identify inline script/style → move to `<style>` or external file
- **Unsafe DOM**: Replace `innerHTML` with `DOMParser` or `createElement`
- **External resources**: Add to CSP whitelist in `netlify.toml` **only** if absolutely necessary

## Testing Checklist
- [ ] `npm run dev` starts without errors
- [ ] All pages load on localhost:3000
- [ ] Mobile menu (hamburger) toggles correctly
- [ ] Links in `links.json` render as expected cards
- [ ] DevTools Console shows **zero CSP warnings**
- [ ] Build completes: `npm run build` with no errors
- [ ] `npm run security-check` passes
- [ ] Preview build matches dev (`npm run preview`)

## Quick Reference: ES6 Module Imports
```javascript
import { loadLinks } from './links-loader.js';           // Named import
import { initNavigation } from './app.js';               // Multiple pages share functions
// All modules use ES6 native (type: "module" in package.json)
```

## Educational Context
- **Students**: Middle-school (≈11-15 years old) in France
- **Topics**: 3D modeling, repairability, programming (Scratch/Python/Arduino), networking
- **Content**: Interactive flashcards (30 repairability questions), correction sheets, course materials
- **Design goal**: Minimal, accessible, fast-loading (no bloat)
