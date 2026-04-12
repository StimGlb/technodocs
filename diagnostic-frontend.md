# Diagnostic Frontend — TechnoDocs

> Generated: 2026-04-09 | Branch: dev | Repo: `e:\Dev\technodocs-vanilla`

---

## 1. File Inventory

### 1.1 HTML Pages — `src/pages/`

| File | Role |
|------|------|
| `index.html` (root) | Accueil — hero, sections Cours/Révisions/Outils, cartes générées par JS |
| `_dev.html` (root) | Page de développement/test (non liée à la nav) |
| **activites/** | |
| `activites/3eme.html` | Index des activités 3ème |
| `activites/4eme.html` | Index des activités 4ème |
| `activites/5eme.html` | Index des activités 5ème |
| `activites/template-activite.html` | Template HTML pour activités |
| `activites/tpl-wizard.html` | Template Wizard réutilisable (avec placeholders `{{...}}`) |
| `activites/devoir-conso-maison.html` | Devoir consommation maison |
| `activites/devoirs.html` | Index des devoirs |
| `activites/4e-tinkercad-detecteur-presence.html` | Activité Tinkercad 4ème — WizardFirebase |
| `activites/activite-montage-tinkercad.html` | Activité Tinkercad générique |
| `activites/3eme/3e-consommation-maison.html` | Activité consommation maison 3ème |
| `activites/3eme/3e-mesure-chaine-energie.html` | Séance mesure chaîne énergie 3ème — WizardFirebase |
| `activites/3eme/corr-3e-simulateur-conso-wizard.html` | Correction simulateur 3ème |
| `activites/3eme/documents-techniques-habitat.html` | Documents techniques habitat 3ème — WizardFirebase |
| `activites/3eme/phase3-3e-habitat-energie.html` | Phase 3 habitat énergie 3ème |
| `activites/4eme/4e-consommation-maison.html` | Activité consommation maison 4ème |
| `activites/4eme/4e-mesure-chaine-energie.html` | Séance mesure chaîne énergie 4ème — WizardFirebase |
| `activites/4eme/phase1-4e-habitat-energie.html` | Phase 1 habitat énergie 4ème |
| `activites/4eme/phase3-4e-habitat-energie.html` | Phase 3 habitat énergie 4ème |
| `activites/5eme/5e-consommation-maison.html` | Activité consommation maison 5ème — WizardFirebase |
| `activites/5eme/5e-documents-techniques-habitat.html` | Documents techniques habitat 5ème — WizardFirebase |
| `activites/devoirs/conception3d.html` | Cahier des charges conception 3D — WizardFirebase |
| `activites/devoirs/evaluation-3d-reparabilite-3eme.html` | Éval. 3D réparabilité 3ème — WizardFirebase |
| `activites/devoirs/evaluation-3d-reparabilite-4eme.html` | Éval. 3D réparabilité 4ème — WizardFirebase |
| `activites/devoirs/evaluation-3d-reparabilite-5eme.html` | Éval. conception 3D 5ème — WizardFirebase |
| `activites/devoirs/modelisation3d.html` | Devoir modélisation 3D — WizardFirebase |
| `activites/devoirs/presentation-objet-technique.html` | Présentation objet technique — WizardFirebase |
| `activites/habitat-energie/s3-alerte-qualite-air.html` | Activité S3 alerte qualité air |
| `activites/habitat-energie/s3-eclairage-adaptatif.html` | Activité S3 éclairage adaptatif |
| `activites/habitat-energie/s3-eclairage-couloir.html` | Activité S3 éclairage couloir |
| **corrections/** | |
| `corrections/5e-s1-correction-habitat-energie.html` | Correction 5ème S1 |
| `corrections/autocorrecteur-exercice-calcul.html` | Autocorrecteur exercices calcul |
| `corrections/correction-exercice-calcul.html` | Correction exercice calcul |
| `corrections/correction-impression3d.html` | Correction impression 3D (md-loader) |
| `corrections/correction-reparabilite.html` | Correction réparabilité (md-loader) |
| `corrections/corrections.html` | Index corrections |
| **cours/** | |
| `cours/conception-3d.html` | Page cours Conception 3D (cours-loader) |
| `cours/index-cours.html` | Index cours |
| `cours/modelisation3d.html` | Page cours modélisation 3D |
| `cours/reparabilite.html` | Page cours réparabilité (cours-loader) |
| **editeur/** | |
| `editeur/article.html` | Éditeur d'article — WizardFirebase |
| **evaluations/** | |
| `evaluations/3e-evaluation-habitat-energie.html` | Évaluation habitat énergie 3ème |
| **exercices/** | |
| `exercices/exercices-calcul.html` | Exercices de calcul — WizardFirebase |
| **flashcards/** | |
| `flashcards/flashcards.html` | Index flashcards |
| `flashcards/modelisation3d.html` | Flashcards modélisation 3D |
| `flashcards/reparabilite.html` | Flashcards réparabilité |
| **outils/** | |
| `outils/generateur-graphiques.html` | Générateur de graphiques (Chart.js) |
| `outils/mini-slicer-3d.html` | Mini slicer 3D |
| `outils/task-manager.html` | Gestionnaire de tâches/Pomodoro |
| `outils/tinkercad-classes.html` | Classes Tinkercad |
| **projets/** | |
| `projets/bilan-conception3d.html` | Bilan conception 3D — WizardFirebase |
| `projets/cahier-des-charges-interactif.html` | Cahier des charges interactif |
| `projets/conception-objet-technique.html` | Conception objet technique |
| `projets/objet-connecte-example.html` | Objet connecté exemple |
| `projets/selecteur-projets-impression3d.html` | Sélecteur projets 3D (projets-impression3d.js) |
| **quiz/** | |
| `quiz/quiz-modelisation-3d.html` | Quiz modélisation 3D — WizardFirebase |
| `quiz/quiz-reparabilite.html` | Quiz réparabilité — WizardFirebase |
| `quiz/quiz.html` | Index quiz |
| **referentiels/** | |
| `referentiels/referentiel-competences-cycle4.html` | Référentiel compétences cycle 4 |
| **ressources/** | |
| `ressources/guide-tinkercad-simplifie.html` | Guide Tinkercad simplifié |
| `ressources/outil-plume-et-toupie.html` | Outil Plume et Toupie |
| `ressources/ressources.html` | Index ressources |
| **revisions/** | |
| `revisions/index.html` | Index révisions — 8 fiches + 3 exercices |
| `revisions/fiche-ost.html` | Fiche OST (cours-loader) |
| `revisions/fiche-chaine-energie.html` | Fiche chaîne d'énergie (cours-loader) |
| `revisions/fiche-chaine-information.html` | Fiche chaîne d'information (cours-loader) |
| `revisions/fiche-materiaux.html` | Fiche matériaux (cours-loader) |
| `revisions/fiche-reseaux.html` | Fiche réseaux (cours-loader) |
| `revisions/fiche-donnees-numerique.html` | Fiche données numérique (cours-loader) |
| `revisions/fiche-programmation.html` | Fiche programmation (cours-loader) |
| `revisions/fiche-projet-technique.html` | Fiche projet technique (cours-loader) |
| `revisions/fiche-revisions-template.html` | Template vide de fiche révision |
| `revisions/exercices-dnb-ost.html` | Exercices DNB OST — WizardFirebase |
| `revisions/exercices-dnb-chaine-information.html` | Exercices DNB chaîne d'information — WizardFirebase |
| `revisions/exercices-dnb-programmation.html` | Exercices DNB programmation — WizardFirebase |
| **simulateurs/** | |
| `simulateurs/artemis-ii-simulateur.html` | Simulateur Artemis II (Canvas) |
| `simulateurs/conso-electrique.html` | Simulateur consommation électrique |
| **printables/** (outside `pages/`) | |
| `printables/activite-template.html` | Template activité imprimable |
| `printables/s1-3eme-consommation-maison.html` | Fiche imprimable S1 3ème |
| `printables/s1-4eme-consommation-maison.html` | Fiche imprimable S1 4ème |
| `printables/s1-5eme-consommation-maison.html` | Fiche imprimable S1 5ème |

### 1.2 JavaScript Files — `src/js/`

| File | Role |
|------|------|
| `main.js` | Point d'entrée Vite — importe `components.js`, `app.js`, `index-loader.js` |
| `app.js` | Navigation mobile, scroll animations, IntersectionObserver, typing effect |
| `components.js` | Injection header/footer via DOMParser+replaceWith, construction nav depuis navigation.json |
| `index-loader.js` | Rendu dynamique des cartes Cours/Corrections/Devoirs/Outils depuis navigation.json |
| `cours-loader.js` | Chargement page cours : JSON config → hero + carousel + Markdown (Marked.js + DOMParser) |
| `md-loader.js` | Chargeur Markdown alternatif (pages corrections), TOC généré, DOMParser sécurisé |
| `wizard-firebase.js` | Classe `WizardFirebase` — gestion formulaires wizard + Firestore (debounce, phases, progress) |
| `new-wizard-firebase.js` | Version allégée de WizardFirebase (sans `collection`/`query`/`where`/`getDocs`). Doublon partiel. |
| `wizard-config.js` | Mot de passe centralisé pour wizards 4ème : `CORRECT_PASSWORD = "t4e2c0h2n6o"` |
| `wizard-config-5e.js` | Mot de passe centralisé pour wizards 5ème : `CORRECT_PASSWORD = "2rv3"` |
| `wizard-consommation-maison.js` | Instance WizardFirebase pour 4ème-consommation-maison (external JS file) |
| `form-handler.js` | Gestionnaire générique de formulaires `.form` (submit, validation, feedback) |
| `article-editor.js` | Anti copier-coller pédagogique + spellcheck sur textareas protégés |
| `chart-generator.js` | Classe `ChartGeneratorV2` — création graphiques Chart.js avec localStorage |
| `task-manager.js` | Classe `TaskManager` + `PomodoroTimer` — gestionnaire de tâches |
| `projets-impression3d.js` | Lecture Firestore multi-collections, affichage cartes projets élèves |
| `tinkercad-handler.js` | Handler pour pages Tinkercad |
| `services/firebase-config.js` | Init Firebase SDK v9 (CDN), export db + fonctions Firestore |
| `simulateurs/artemis-ii.js` | Simulateur Canvas Artemis II — trajectoire, télémétrie, animations |
| `simulateurs/conso-electrique.js` | Simulateur consommation électrique — sliders, Chart.js |
| `activites/3e-simulateur-conso-wizard.js` | Wizard 3ème simulateur conso (utilise `new-wizard-firebase.js`) |
| `activites/tpl-wizard.js` | Template wizard JS (placeholders `{{COLLECTION_NAME}}`, non instanciable tel quel) |
| `libs/marked.min.js` | Marked.js local (requis CSP — pas de CDN externe) |
| `libs/chart.umd.min.js` | Chart.js local UMD |

### 1.3 CSS Files — `src/css/`

| File | Scope / Role |
|------|-------------|
| `style.css` | Feuille principale — variables CSS, reset, header, hero, cards, sections, boutons, animations |
| `style-index-light.css` | Surcharges light mode pour `body.light-mode` (index + fiches révisions) |
| `cours.css` | Styles pages cours — `.cours-hero`, `.carousel`, `.carousel__slide`, animations float |
| `markdown.css` | Rendu du contenu Markdown — `.md-content`, `.md-layout`, `.md-sidebar`, `.md-toc` |
| `activite.css` | Fiches d'activité — `.fiche-meta`, `.fiche-ost`, `.zone-reponse`, `.print-header` |
| `wizard.css` | Wizards multi-phases — `.wizard`, `.wizard__phase`, `.wizard__nav-btn`, toast, modales |
| `forms.css` | Formulaires génériques `.form`, `.form__group`, `.form__input` |
| `print.css` | Styles `@media print` — masquage header/nav, reset dark, mise en page A4 |
| `tools.css` | Styles outils dédiés (task-manager, mini-slicer) — variables `:root` propres, `* {}` reset |
| `chart-generator.css` | Styles générateur graphiques — `.chart-form`, `.form-group` |
| `projets-impression3d.css` | Styles sélecteur projets 3D — `.page-hero`, `.stat-pill`, cartes projets |

### 1.4 Fichiers non-HTML dans `src/pages/` (potentiellement orphelins)

| File | Statut |
|------|--------|
| `activites/3eme/corr-3e-simulateur-conso-wizard.md` | Fichier MD dans pages/ — probablement à déplacer vers `content/md/` |
| `activites/fiche-activite-simulateur-conso.md` | Idem |
| `activites/5eme/Analyser les équipements.md` | Idem — nom avec espace et accent (fragile pour les chemins URL) |
| `flashcards/modelisation3d.js` | JS colocalisé dans pages/ — diverge du pattern `src/js/` |
| `flashcards/reparabilite.js` | Idem |

---

## 2. Dependency Map

Le projet utilise Vite : en développement, les scripts sont chargés directement. En production (build), Vite bundle les modules ES. Les pages HTML chargent soit `src/js/main.js` (via module), soit des scripts individuels.

### 2.1 Pages utilisant `main.js` (bundle complet)

`main.js` importe : `components.js` + `app.js` + `index-loader.js`

| Page | CSS chargés | JS chargés |
|------|-------------|------------|
| `index.html` | `style.css`, `style-index-light.css` | `main.js` (module) + inline script light-mode |
| `revisions/index.html` | `style.css`, `style-index-light.css` | `components.js`, `app.js` (modules séparés) |

### 2.2 Pages cours / fiches révisions (cours-loader)

Pattern : `style.css` + `markdown.css` + `cours.css` + `style-index-light.css` + `marked.min.js` (script) + `components.js` (module) + inline `initCoursPage(...)`.

| Page | JSON config |
|------|-------------|
| `cours/conception-3d.html` | `data/cours/conception-3d.json` |
| `cours/reparabilite.html` | `data/cours/reparabilite.json` |
| `revisions/fiche-ost.html` | `data/revisions/fiche-01-ost.json` |
| `revisions/fiche-chaine-energie.html` | `data/revisions/fiche-02-chaine-energie.json` |
| `revisions/fiche-chaine-information.html` | `data/revisions/fiche-03-chaine-information.json` |
| `revisions/fiche-materiaux.html` | `data/revisions/fiche-04-materiaux.json` |
| `revisions/fiche-reseaux.html` | `data/revisions/fiche-05-reseaux.json` |
| `revisions/fiche-donnees-numerique.html` | `data/revisions/fiche-06-donnees-numerique.json` |
| `revisions/fiche-programmation.html` | `data/revisions/fiche-07-programmation.json` |
| `revisions/fiche-projet-technique.html` | `data/revisions/fiche-08-projet-technique.json` |

**Note** : `cours/conception-3d.html` ne charge pas `style-index-light.css` ni le toggle light-mode (divergence avec les fiches révisions).

### 2.3 Pages Wizard

Pattern : `style.css` + `wizard.css` + `components.js` (module) + `wizard-firebase.js` ou `new-wizard-firebase.js` (module inline).

| Page | CSS supplémentaire | Inline styles |
|------|--------------------|---------------|
| `activites/devoirs/evaluation-3d-reparabilite-5eme.html` | — | Oui (`.wizard__question`, `.wizard__question-badge`…) |
| `activites/devoirs/evaluation-3d-reparabilite-4eme.html` | — | Oui |
| `activites/devoirs/evaluation-3d-reparabilite-3eme.html` | — | Oui |
| `activites/devoirs/modelisation3d.html` | — | — |
| `activites/devoirs/conception3d.html` | — | Oui (`.password-overlay` inline) |
| `activites/devoirs/presentation-objet-technique.html` | — | — |
| `activites/5eme/5e-consommation-maison.html` | — | — |
| `activites/5eme/5e-documents-techniques-habitat.html` | — | — |
| `activites/4eme/4e-mesure-chaine-energie.html` | — | — |
| `activites/3eme/3e-mesure-chaine-energie.html` | — | — |
| `activites/3eme/documents-techniques-habitat.html` | — | — |
| `revisions/exercices-dnb-ost.html` | — | — |
| `revisions/exercices-dnb-chaine-information.html` | — | — |
| `revisions/exercices-dnb-programmation.html` | — | — |
| `quiz/quiz-reparabilite.html` | — | — |
| `quiz/quiz-modelisation-3d.html` | — | — |
| `editeur/article.html` | — | — |
| `projets/bilan-conception3d.html` | — | — |
| `exercices/exercices-calcul.html` | — | — |

### 2.4 Pages outils dédiées

| Page | CSS | JS |
|------|-----|----|
| `outils/generateur-graphiques.html` | `style.css` + `chart-generator.css` | `chart-generator.js` + `chart.umd.min.js` |
| `outils/task-manager.html` | `style.css` + `tools.css` | `task-manager.js` |
| `simulateurs/artemis-ii-simulateur.html` | `style.css` (inline styles) | `artemis-ii.js` |
| `simulateurs/conso-electrique.html` | `style.css` | `conso-electrique.js` + `chart.umd.min.js` |
| `projets/selecteur-projets-impression3d.html` | `style.css` + `projets-impression3d.css` | `projets-impression3d.js` |

---

## 3. Points de Fragilité

### 3.1 CSS — Sélecteurs trop génériques

**Reset dupliqué et conflictuel entre `style.css` et `tools.css` :**

- `style.css` lignes 76-82 : `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }` — reset global
- `tools.css` ligne 28 : `* { margin: 0; padding: 0; box-sizing: border-box; }` — reset identique redondant

**`body {}` défini dans plusieurs fichiers :**

- `style.css` : `body { font-family: ...; background-color: ...; display: flex; flex-direction: column; }` — layout flex principal
- `tools.css` : `body { font-family: var(--mono); background: var(--bg); ... }` — écrase complètement le body si les deux CSS sont chargés ensemble. Or `tools.css` semble dédié à des pages spécifiques mais ne contient pas de scope (pas de `.page-task-manager body` ou équivalent). **Risque de collision si tools.css est chargé sur une page qui charge aussi style.css.**

**Sélecteurs `body` dans `print.css` :**

- `print.css` ligne 221 : `body { ... }` dans `@media print` — acceptable car scoped `@media`.

**Sélecteur `body > *:not(main)` dans `print.css` :**

- Très large, masque tous les enfants directs sauf `<main>` — intentionnel pour l'impression mais peut interagir avec des éléments injectés dynamiquement hors `<main>`.

**`.form-group` défini dans deux fichiers :**

- `chart-generator.css` : `.form-group { display: flex; flex-direction: column; gap: 8px; }` avec variables `--bg-card`, `--border-accent` (locales à `tools.css`/`chart-generator.css`)
- `tools.css` : `.form-group { display: flex; flex-direction: column; gap: var(--space-3); }` — même sélecteur, définitions différentes

Si `tools.css` et `chart-generator.css` étaient chargés ensemble, le dernier défini gagnerait. En pratique, chaque page charge l'un ou l'autre, mais l'absence de namespace reste une fragilité.

**`.section__badge`** défini dans `forms.css` — semble hors contexte dans ce fichier.

**`a { color: inherit; text-decoration: none; }` et `button { font: inherit; }` dans `style.css`** : reset global sur tous les liens et boutons, sans scope. Tout composant ajouté devra surcharger explicitement.

### 3.2 JS — Accès DOM sans vérification de null

Plusieurs accès sans garde dans les fichiers de simulateurs et de task-manager :

**`src/js/simulateurs/artemis-ii.js`** :
```js
document.getElementById("phaseName").textContent = telem.nom;
document.getElementById("btnPlay").addEventListener("click", () => { ... });
document.getElementById("btnPause").addEventListener("click", () => { ... });
document.getElementById("btnReset").addEventListener("click", () => { ... });
document.getElementById("speedSlider").addEventListener("input", (e) => { ... });
```
Tous ces accès sont directs, sans vérification `if (el)`. Si l'un des IDs est absent du HTML, une `TypeError: Cannot read properties of null` sera levée.

**`src/js/simulateurs/conso-electrique.js`** :
```js
const slider = document.getElementById(sliderId(p.id));
slider.min = 0;  // crash si slider est null
```
Pas de null check — si un poste JSON n'a pas de slider correspondant dans le HTML, crash silencieux.

**`src/js/task-manager.js`** :
```js
this.form = document.getElementById("taskForm");
this.form.addEventListener("submit", ...);  // crash si form null
```
L'accès à `this.form` dans `init()` n'est pas gardé, mais comme `TaskManager` est instancié uniquement sur la page dédiée, le risque est localisé.

**`src/js/activites/tpl-wizard.js`** :
```js
document.getElementById("passwordInput").addEventListener("keypress", (e) => { ... });
```
Accès direct sans null check — si la page n'a pas d'overlay password, crash.

**`src/js/wizard-firebase.js`** (risque moindre, mais notable) :
- `this.progressFill`, `this.saveIndicator`, etc. récupérés dans le constructeur via `getElementById`. La classe protège ensuite les accès via `if (this.progressFill)`. Bien géré.
- `document.querySelector(`input[name="${field.name}"]:checked`)` dans `updatePhaseIndicators()` — pas de null check sur `field` retourné par `querySelector('[data-field="${fieldName}"]')`, bien que `if (!field) return` soit présent juste après. Correct.

**`src/js/app.js`** — `initScrollAnimations()` :
```js
const elements = document.querySelectorAll('.card, .tool-card, .revision-card, .resource-item');
```
`querySelectorAll` ne retourne jamais `null` (retourne `NodeList` vide), donc sûr.

**`src/js/app.js`** — injection d'un `<style>` tag via `document.head.appendChild(styleSheet)` avec des règles CSS dans `styleSheet.textContent`. Cela contourne la CSP si elle est activée avec `unsafe-inline` interdit. Risque potentiel selon la politique CSP de production.

### 3.3 Couplage CSS classes / JS

La classe JS `WizardFirebase` dépend directement de nombreuses classes CSS pour fonctionner :

| Classe CSS utilisée en JS | Fichier JS | Contexte |
|---------------------------|------------|---------|
| `.wizard__phase` | `wizard-firebase.js` | Navigation entre phases |
| `.wizard__nav-btn` | `wizard-firebase.js` | Boutons de navigation |
| `.wizard__save-indicator` | `wizard-firebase.js` | Indicateur de sauvegarde |
| `.wizard__save-dot`, `.wizard__save-text` | `wizard-firebase.js` | Sous-éléments indicateur |
| `.wizard__toast-icon`, `.wizard__toast-message` | `wizard-firebase.js` | Toast notifications |
| `active`, `completed`, `show`, `saving`, `saved`, `error` | `wizard-firebase.js` | Classes d'état |
| `.carousel__slide`, `.carousel__dot` | `cours-loader.js` | Navigation carousel |
| `is-active`, `is-visible`, `is-open` | `app.js`, `cours-loader.js` | États visuels |
| `.card`, `.tool-card`, `.revision-card`, `.resource-item` | `app.js` | Scroll animations |
| `.animate-on-scroll` | `app.js` | Ajoutée dynamiquement par JS |

Renommer ou supprimer une classe CSS sans mettre à jour le JS correspondant casse silencieusement le comportement.

**`app.js` injecte des règles CSS via `<style>` pour `.animate-on-scroll` et `.is-visible`** — ces règles ne sont pas dans un fichier CSS, créant un couplage invisible (les règles sont dans le JS, les sélecteurs sont dans le JS, mais la relation est opaque).

### 3.4 CSS — Sélecteurs identiques définis dans plusieurs fichiers

| Sélecteur | Fichiers | Risque |
|-----------|----------|--------|
| `body {}` | `style.css`, `tools.css` | Conflit si les deux CSS sont chargés |
| `* { margin: 0; padding: 0; box-sizing: border-box; }` | `style.css`, `tools.css` | Redondance, charge inutile |
| `.form-group {}` | `chart-generator.css`, `tools.css` | Comportement différent selon l'ordre de chargement |
| `.hero {}` | `style.css` (`.hero`) et `cours.css` (`.cours-hero`) | Classes différentes mais rôle similaire — pas de conflit direct |
| `.section__badge {}` | `forms.css` | Sélecteur `.section__badge` défini dans `forms.css` alors que `.section` est dans `style.css` — confusion de responsabilités |

---

## 4. Wizard Audit

### 4.1 Tableau récapitulatif des instances WizardFirebase

| Page | `collectionName` | Phases | Champs requis (résumé) | Mot de passe | Classe WF |
|------|-----------------|--------|------------------------|--------------|-----------|
| `activites/3eme/3e-mesure-chaine-energie.html` | `seance2-mesure-energie-4eme` ⚠️ | 3+ | cr_depart_*, instrument_*, mesure_* | Non | `wizard-firebase.js` |
| `activites/4eme/4e-mesure-chaine-energie.html` | `seance2-mesure-energie-4eme` ⚠️ | 3+ | cr_depart_*, instrument_*, mesure_* | Non | `wizard-firebase.js` |
| `activites/3eme/documents-techniques-habitat.html` | `s2_docs_techniques_habitat` ⚠️ | — | — | Non | `wizard-firebase.js` |
| `activites/5eme/5e-documents-techniques-habitat.html` | `s2_docs_techniques_habitat` ⚠️ | — | — | Non | `wizard-firebase.js` |
| `activites/4e-tinkercad-detecteur-presence.html` | `s2_4eme_tinkercad_detecteur_presence` | — | — | Non | `wizard-firebase.js` |
| `activites/5eme/5e-consommation-maison.html` | `s1_5eme_consommation_maison` | 3 | studentName, studentClass, q1–q13 | Oui (`wizard-config-5e.js`) | `wizard-firebase.js` |
| `activites/devoirs/conception3d.html` | `devoir_cahier_charges_conception3d` | 3 | studentName, nom-projet, probleme, fonction-principale, style, temps-impression | Non | `wizard-firebase.js` |
| `activites/devoirs/modelisation3d.html` | `devoir_conception_impression_3d` | 3 | studentName, logicielModelisation, etapesConception, typeFilament, roleSlicer, problemeImpression | Non | `wizard-firebase.js` |
| `activites/devoirs/presentation-objet-technique.html` | `presentation_objet_technique` | 2 | studentName, studentClass, objetNom, objetCategorie, objetDescription, objetProbleme, oralIntroduction, oralDeveloppement, oralConclusion | Non | `wizard-firebase.js` |
| `activites/devoirs/evaluation-3d-reparabilite-5eme.html` | `evaluation_conception_3d_5eme` | 1 | studentName, studentClass, q1–q5_usage_quotidien | Oui (`wizard-config.js`) | `wizard-firebase.js` |
| `activites/devoirs/evaluation-3d-reparabilite-4eme.html` | `evaluation_3d_reparabilite_4eme` | 2 | studentName, studentClass, q1–q10 | Oui (`wizard-config.js`) | `wizard-firebase.js` |
| `activites/devoirs/evaluation-3d-reparabilite-3eme.html` | `evaluation_3d_reparabilite_3eme` | — | — | Oui (`wizard-config.js`) | `wizard-firebase.js` |
| `editeur/article.html` | `techno_article_editor` | 1 | studentName, studentClass, articleTitle, articleCategory, articleText | Non | `wizard-firebase.js` |
| `projets/bilan-conception3d.html` | `techno_bilan_conception3d` | 4 | studentName, studentClass, q1–q14, q8_* (5 sous-champs) | Non | `wizard-firebase.js` |
| `quiz/quiz-reparabilite.html` | `quiz_reparabilite_v1` | 4 | studentName, studentClass, q1–q4_amelioration_produit | Non | `wizard-firebase.js` |
| `quiz/quiz-modelisation-3d.html` | `quiz_modelisation_tinkercad_v1` | 5 | studentName, studentClass, q1_1–q5_3 | Non | `wizard-firebase.js` |
| `revisions/exercices-dnb-ost.html` | `exercices_dnb_ost_fiche01` | 1 | studentName, studentClass, q1a–q2c_argumentation | Non | `wizard-firebase.js` |
| `revisions/exercices-dnb-chaine-information.html` | `dnb-chaines-information-3e` | 3 | studentName, studentClass, ex1_*–ex3_* | Non | `wizard-firebase.js` |
| `revisions/exercices-dnb-programmation.html` | `dnb-programmation-3eme-v2` | 3+ | studentName, studentClass, ex1_*–ex3_* | Non | `new-wizard-firebase.js` |
| `exercices/exercices-calcul.html` | `exercices_technologie` | — | — | Non | `wizard-firebase.js` |
| `wizard-consommation-maison.js` → `activites/4eme/4e-consommation-maison.html` | `s1_4eme_consommation_maison` | 3 | q2_conso_valeur–q4_actions_proposees | Oui (`wizard-config.js`) | `wizard-firebase.js` |
| `activites/3e-simulateur-conso-wizard.js` → `activites/3eme/corr-3e-simulateur-conso-wizard.html` | `wizard_3e_simulateur_conso` | 3 | studentName, studentClass, q1–q18 | Non | `new-wizard-firebase.js` |

### 4.2 Anomalies critiques dans les collectionName

1. **Collision de collection** : `seance2-mesure-energie-4eme` est utilisé **à la fois** par `3e-mesure-chaine-energie.html` (3ème) et `4e-mesure-chaine-energie.html` (4ème). Les soumissions des deux niveaux iront dans la même collection Firestore — impossibilité de distinguer les élèves de 3ème et de 4ème.

2. **Collision de collection** : `s2_docs_techniques_habitat` est utilisé par `documents-techniques-habitat.html` (3ème) et `5e-documents-techniques-habitat.html` (5ème). Même problème.

3. **Kebab-case vs snake_case mélangés** dans les noms de collections : `seance2-mesure-energie-4eme` (kebab), `s1_5eme_consommation_maison` (snake), `techno_article_editor` (snake), `dnb-chaines-information-3e` (kebab). Pas de convention uniforme.

### 4.3 Deux classes WizardFirebase coexistantes

`wizard-firebase.js` et `new-wizard-firebase.js` sont deux implémentations quasi-identiques de `WizardFirebase`. La différence principale : `new-wizard-firebase.js` n'importe pas `collection`, `query`, `where`, `getDocs` (fonctions de requête). Certaines pages (exercices-dnb-programmation, 3e-simulateur-conso) utilisent `new-wizard-firebase.js`. Il n'y a pas de distinction documentée de cas d'usage. Ce doublon est une source de divergence future.

---

## 5. Inconsistances et fichiers suspects

### 5.1 Conventions de nommage

**Noms de fichiers HTML** : mélange de plusieurs patterns
- `kebab-case` : `fiche-chaine-energie.html`, `conso-electrique.html` ✓ (majorité)
- Préfixes de niveau : `3e-consommation-maison.html`, `4e-mesure-chaine-energie.html` ✓ (cohérent dans chaque dossier)
- `corr-` comme préfixe correction : `corr-3e-simulateur-conso-wizard.html` ✓

**Noms de variables `data-field`** :
- `camelCase` : `studentName`, `studentClass`, `q1PourcentageChauffage` (dans `3e-simulateur-conso-wizard.js`)
- `snake_case` : `q1_diagramme_batons`, `ex1_capteur`, `q2_conso_valeur` (dans la majorité des pages)
- `kebab-case` : `nom-projet`, `lieu-utilisation`, `support-impression` (dans `conception3d.html`)
- Ce mélange complique la maintenance et la lecture du code Firestore.

**noms de `collectionName`** : mélange de `snake_case` et `kebab-case` (voir section 4.2).

**CSS** : conventions BEM (`wizard__phase`, `card__title`) appliquées de manière cohérente dans `style.css`, `wizard.css`, `cours.css`. `tools.css` et `chart-generator.css` utilisent un style libre sans BEM.

**JS** : `camelCase` pour toutes les fonctions et variables — cohérent.

### 5.2 Divergences structurelles entre pages similaires

**Fiches de révision (`revisions/fiche-*.html`)** — structure quasi-identique (bon) avec une divergence :
- Toutes chargent `style-index-light.css` et incluent le toggle light-mode
- `cours/conception-3d.html` (même moteur `cours-loader`) **ne charge pas** `style-index-light.css` et n'a pas de toggle — divergence entre cours et révisions utilisant le même loader

**Pages activités 3ème vs 4ème** :
- `3e-mesure-chaine-energie.html` et `4e-mesure-chaine-energie.html` ont la même `collectionName` (bug, voir section 4.2)
- Structurellement ils sont miroir l'un de l'autre

**Pages cours** (`cours/conception-3d.html` vs `cours/reparabilite.html`) :
- `cours/conception-3d.html` : pas de `<!doctype html>` minuscule — utilise `<!DOCTYPE html>` (majuscule, ancienne convention). Toutes les autres pages utilisent `<!doctype html>` (lowercase, HTML5 standard).

### 5.3 Fichiers potentiellement inutilisés ou dupliqués

| Fichier | Statut suspecté | Raison |
|---------|----------------|--------|
| `src/js/new-wizard-firebase.js` | Doublon de `wizard-firebase.js` | Quasi-identique, différence mineure sur les imports Firestore. Pas de doc expliquant la distinction. |
| `src/js/form-handler.js` | Probablement inutilisé | Gère les formulaires `.form` avec `event.target.submit()` simulé. Aucune page ne semble l'importer explicitement via `<script type="module">`. |
| `src/js/tinkercad-handler.js` | Rôle non vérifié | Pas importé dans `main.js`, pas trouvé dans les scripts des pages visitées. |
| `src/assets/_dev-CYV9AXeT.js` | Artefact de build | Fichier JS bundlé résiduel dans `src/assets/` — probablement un ancien output Vite qui n'a pas été nettoyé. |
| `src/assets/index-BBdmBZfr.js`, `src/assets/index-qhL5qOKP.js`, `src/assets/main-Be7hAb-5.js`, `src/assets/main-DETIoT5R.js`, `src/assets/main-Yu5u_uPn.css` | Artefacts de build | Fichiers bundlés dans `src/` — devraient être dans `dist/`, pas dans `src/`. Risque de confusion. |
| `src/pages/activites/tpl-wizard.html` + `src/js/activites/tpl-wizard.js` | Templates de référence | Contiennent des placeholders `{{...}}` — non instanciables tels quels. À exclure du build Vite (actuellement, `vite.config.js` scanne tous les HTML de `src/`). |
| `src/pages/revisions/fiche-revisions-template.html` | Template vide | Idem — ne devrait pas être accessible en production. |
| `src/pages/activites/_templates/` | Dossier doc | README uniquement, pas de HTML. |
| `src/content/md/revisions/fiche-XX-template.md` | Template markdown | Fichier modèle, ne correspond à aucune page HTML active. |
| `src/pages/activites/3eme/corr-3e-simulateur-conso-wizard.md` | MD dans pages/ | Devrait être dans `content/md/`. |
| `src/pages/activites/fiche-activite-simulateur-conso.md` | MD dans pages/ | Idem. |
| `src/pages/activites/5eme/Analyser les équipements.md` | MD dans pages/ avec espace dans le nom | Idem + nom de fichier problématique pour les URLs. |
| `src/pages/flashcards/modelisation3d.js`, `reparabilite.js` | JS dans pages/ | Brisent le pattern `src/js/` — colocalisés avec leur HTML mais divergent de la structure générale. |

### 5.4 Mots de passe en clair dans le source

Les mots de passe de déverrouillage des wizards sont exposés en clair dans des fichiers JS bundlés par Vite et servis au client :

- `wizard-config.js` : `CORRECT_PASSWORD = "t4e2c0h2n6o"` (4ème)
- `wizard-config-5e.js` : `CORRECT_PASSWORD = "2rv3"` (5ème)

Ces fichiers sont inclus dans le bundle Vite, donc lisibles dans les DevTools. La protection est cosmétique — tout élève inspecant le source peut bypasser l'overlay. Ce n'est pas un risque de sécurité grave (les données vont dans Firestore avec les règles de sécurité côté serveur), mais cela induit une fausse impression de protection.

### 5.5 Utilisation de `navigator.sendBeacon` vers `/api/emergency-save`

Dans `wizard-firebase.js` (ligne ~370), le gestionnaire `beforeunload` tente :
```js
navigator.sendBeacon("/api/emergency-save", data);
```
Il n'y a aucune route `/api/emergency-save` dans ce projet statique (Netlify + Vite sans backend). L'appel échouera silencieusement, le `try/catch` l'absorbe. Ce code est dead code.

### 5.6 Dépendance Firebase SDK via CDN externe

`firebase-config.js` importe directement depuis `https://www.gstatic.com/firebasejs/9.23.0/...`. Vite ne peut pas bundler ces imports CDN — ils restent des requêtes réseau au runtime. Si la CSP interdit les imports de scripts depuis `www.gstatic.com`, ou si le CDN est indisponible, toute la stack wizard s'arrête.

---

## Synthèse des priorités

| Priorité | Problème | Impact |
|----------|----------|--------|
| 🔴 Critique | `collectionName` identique pour 3ème et 4ème (×2) | Données Firestore mélangées entre niveaux |
| 🔴 Critique | `body {}` dans `tools.css` sans scope | Conflit CSS si jamais chargé avec `style.css` |
| 🟠 Élevé | Deux classes `WizardFirebase` coexistantes | Divergence silencieuse lors des évolutions |
| 🟠 Élevé | DOM queries sans null check dans `artemis-ii.js`, `conso-electrique.js` | Crash JS si un ID est absent |
| 🟠 Élevé | Artefacts de build (`*.js`, `*.css`) dans `src/assets/` | Confusion source/dist, risque de commit de fichiers build |
| 🟡 Moyen | Templates HTML inclus dans le build Vite | Pages inaccessibles mais présentes en prod |
| 🟡 Moyen | `navigator.sendBeacon("/api/emergency-save")` — route inexistante | Dead code trompeur |
| 🟡 Moyen | Mots de passe en clair dans bundles JS | Sécurité cosmétique seulement |
| 🟡 Moyen | `app.js` injecte `<style>` dynamiquement | Contourne les bénéfices du CSS statique, possible CSP |
| 🟢 Faible | Convention `data-field` mixte (camelCase / snake_case / kebab-case) | Lisibilité, cohérence |
| 🟢 Faible | Fichiers MD dans `src/pages/` au lieu de `src/content/md/` | Confusion structurelle |
| 🟢 Faible | `cours/conception-3d.html` sans toggle light-mode | Incohérence UX mineure |
