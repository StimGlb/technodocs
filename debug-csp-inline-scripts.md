# Debug — Violations CSP : scripts inline

> Problème récurrent. Ce log documente les occurrences, la cause et la procédure de correction.

---

## Contexte

La CSP définie dans `netlify.toml` interdit tout script inline :

```
script-src 'self' https://www.gstatic.com
```

Tout `<script>` sans `src` (même `<script type="module">`) déclenche l'erreur :

```
Executing inline script violates the following Content Security Policy directive
'script-src 'self' ...'. Either the 'unsafe-inline' keyword, a hash (...), or a
nonce ('nonce-...') is required to enable inline execution. The action has been
blocked.
```

---

## Corrections appliquées

### 2026-04-08 — `artemis-ii-simulateur.html`

**Symptôme :** Script inline de ~470 lignes (simulateur Canvas) bloqué en `dev:netlify`.

**Cause :** Page créée en fichier unique autonome (HTML + CSS + JS), JS jamais externalisé.

**Correction :**

- Extrait le JS inline vers `src/js/simulateurs/artemis-ii.js`
- Remplacé `<script>` inline par `<script type="module" src="../../js/simulateurs/artemis-ii.js"></script>`

**Fichiers modifiés :**

- `src/pages/simulateurs/artemis-ii-simulateur.html`
- `src/js/simulateurs/artemis-ii.js` ← créé

---

### 2026-04-12 — `_dev.html`

**Symptôme :** Script inline du registre de pages (`PAGES` + `render()`) bloqué en `dev:netlify`.  
Hash signalé : `sha256-ax42+jxJtbzyhD55pHToUku7PkLYISAzyT1Ex8dWXuE=`

**Cause :** `_dev.html` est un fichier racine autonome — son script n'avait jamais été externalisé.

**Correction :**

- Extrait le JS inline (registre PAGES + render + keyboard nav) vers `src/js/_dev.js`
- Remplacé `<script>` inline par `<script type="module" src="/src/js/_dev.js"></script>`

**Fichiers modifiés :**

- `_dev.html`
- `src/js/_dev.js` ← créé

---

### 2026-04-12 — `5e-s1-correction-habitat-energie.html` (+ utilitaires partagés)

**Symptôme :** Deux scripts inline bloqués — module `initCoursPage` + toggle clair/sombre.  
Hash signalé : `sha256-ibMuTXEZIdkQqzSCXngZmvs+5e8b9daZL4SM7xu/RYQ=`

**Cause :** Pattern répété dans ~10 pages (`corrections`, `revisions`, `index.html`) — `initLightModeToggle` jamais externalisé.

**Correction :**

- Créé `src/js/light-mode-toggle.js` — utilitaire partagé pour toutes les pages avec `.mode-toggle`
- Créé `src/js/cours-page-init.js` — lit `data-config` sur `#markdown-container` et appelle `initCoursPage()`
- Ajouté `data-config="..."` sur `<article id="markdown-container">` dans la page
- Remplacé les deux `<script>` inline par les deux fichiers externes

**Fichiers modifiés :**

- `src/pages/corrections/5e-s1-correction-habitat-energie.html`
- `src/js/light-mode-toggle.js` ← créé (réutilisable sur toutes les pages)
- `src/js/cours-page-init.js` ← créé (réutilisable sur toutes les pages cours)

> **Note :** Les pages `corrections.html`, `revisions/index.html`, `fiche-*.html`, etc. ont le même inline `initLightModeToggle` — les migrer vers `light-mode-toggle.js` en suivant la même procédure.

---

## Procédure standard de correction

1. Identifier le `<script>` inline incriminé (l'erreur console donne le hash SHA-256)
2. Créer un fichier `.js` dans `src/js/` au bon sous-dossier (ex. `simulateurs/`, `pages/`)
3. Coller le contenu du script inline dans ce fichier (sans `<script>` ni `</script>`)
4. Supprimer le bloc `<script>...</script>` dans le HTML
5. Ajouter `<script type="module" src="chemin/vers/fichier.js"></script>` à la place
6. Vérifier en `dev:netlify` : zéro erreur CSP dans la console

> **Règle :** Ne jamais ajouter `'unsafe-inline'` à la CSP — cela annulerait la protection XSS.

---

## À ne pas faire

| ❌ Mauvaise pratique                                     | ✅ Alternative                           |
| -------------------------------------------------------- | ---------------------------------------- |
| Ajouter `'unsafe-inline'` dans `netlify.toml`            | Externaliser le script                   |
| Utiliser un hash SHA-256 (fragile, casse à chaque modif) | Externaliser le script                   |
| Mettre du JS dans un attribut `onclick="..."`            | `addEventListener` dans le fichier `.js` |
| `innerHTML` avec du JS                                   | `createElement` + `addEventListener`     |

---

## Rappel — Tester avant de déployer

```bash
npm run dev:netlify   # Test CSP en local avec les headers Netlify
npm run security-check  # Audit complet sur l'instance locale
```
