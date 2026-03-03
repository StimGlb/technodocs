# Prompt Agent — Intégration des fiches de révision DNB

## Contexte

On ajoute une section "Révisions DNB" au frontend TechnoDocs. Elle comprend 8 fiches de révision au format HTML + JSON + Markdown, qui réutilisent le système existant `cours-loader.js` (hero + contenu Markdown via Marked.js + TOC auto).

Les fiches n'utilisent PAS le carousel (slides vide `[]` dans le JSON). Le `renderCarousel` du loader gère déjà ce cas avec son guard `if (!track || !slides || slides.length === 0) return;`.

## Arborescence à créer

```
pages/revisions/
├── fiche-01-ost.html
├── fiche-02-chaine-energie.html
├── fiche-03-chaine-information.html
├── fiche-04-materiaux.html
├── fiche-05-reseaux.html
├── fiche-06-donnees-numerique.html
├── fiche-07-programmation.html
├── fiche-08-projet-technique.html
└── index.html                        ← page d'index listant les 8 fiches

data/revisions/
├── fiche-01-ost.json
├── fiche-02-chaine-energie.json
├── fiche-03-chaine-information.json
├── fiche-04-materiaux.json
├── fiche-05-reseaux.json
├── fiche-06-donnees-numerique.json
├── fiche-07-programmation.json
└── fiche-08-projet-technique.json

content/md/revisions/
├── fiche-01-ost.md
├── fiche-02-chaine-energie.md
├── fiche-03-chaine-information.md
├── fiche-04-materiaux.md
├── fiche-05-reseaux.md
├── fiche-06-donnees-numerique.md
├── fiche-07-programmation.md
└── fiche-08-projet-technique.md
```

## Tâches à réaliser

### 1. Vérifier l'arborescence


### 2. Déployer les fichiers fournis

Les fichiers suivants sont fournis et prêts à copier :
- **8 fichiers JSON** → dans `data/revisions/`
- **Le template HTML** (`fiche-revision-template.html`) → à dupliquer 8 fois dans `pages/revisions/`
- **Les fichiers .md** → dans `data/markdown/revisions/` (seul le premier est disponible pour l'instant, les autres arrivent)

Pour chaque duplication du template HTML, remplacer les 3 variables `[À MODIFIER]` :

| Fiche | `<title>` | `<meta description>` | `initCoursPage()` path |
|-------|-----------|---------------------|----------------------|
| 01 | `Fiche 01 — Les objets et systèmes techniques \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — Les objets et systèmes techniques` | `../../data/cours/fiche-01-ost.json` |
| 02 | `Fiche 02 — La chaîne d'énergie \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — La chaîne d'énergie` | `../../data/cours/fiche-02-chaine-energie.json` |
| 03 | `Fiche 03 — La chaîne d'information \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — La chaîne d'information` | `../../data/cours/fiche-03-chaine-information.json` |
| 04 | `Fiche 04 — Matériaux et procédés \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — Matériaux et procédés` | `../../data/cours/fiche-04-materiaux.json` |
| 05 | `Fiche 05 — Les réseaux informatiques \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — Les réseaux informatiques` | `../../data/cours/fiche-05-reseaux.json` |
| 06 | `Fiche 06 — Données et numérique \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — Données et numérique` | `../../data/cours/fiche-06-donnees-numerique.json` |
| 07 | `Fiche 07 — La programmation \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — La programmation` | `../../data/cours/fiche-07-programmation.json` |
| 08 | `Fiche 08 — Le projet technique \| Révisions DNB \| TechnoDocs` | `Fiche de révision DNB Technologie — Le projet technique` | `../../data/cours/fiche-08-projet-technique.json` |

### 3. Créer la page index des révisions

Créer `pages/revisions/index.html` qui :
- Utilise le même layout que les autres pages du site (header-placeholder, footer-placeholder, components.js)
- Charge les mêmes CSS (`style.css`, `cours.css`)
- Affiche un hero simple avec titre "Révisions DNB Technologie" et subtitle "8 fiches pour préparer l'épreuve"
- Liste les 8 fiches sous forme de cartes cliquables avec :
  - Numéro de la fiche
  - Titre
  - Lien vers la page HTML correspondante
- Respecte le style existant du site (pas de nouveau CSS custom sauf si nécessaire pour la grille de cartes)

### 4. Ajouter le lien dans la navigation

Dans le composant header/navigation du site, ajouter un lien vers `pages/revisions/index.html` (texte : "Révisions DNB" ou "DNB"). Vérifier l'emplacement logique dans le menu existant.

### 5. Vérifications

Après intégration, vérifier :
- [ ] `pages/revisions/fiche-01-ost.html` charge correctement le JSON et affiche le .md
- [ ] Le hero affiche le titre et le subtitle (pas "Chargement…")
- [ ] Pas de carousel affiché (slides vide)
- [ ] La TOC (sommaire) se génère correctement dans la sidebar
- [ ] La page index liste les 8 fiches avec des liens fonctionnels
- [ ] Les chemins relatifs sont corrects (CSS, JS, JSON, MD) — attention à la profondeur `../../`
- [ ] Le header et footer se chargent via components.js

## Contraintes

- **Zéro modification** de `cours-loader.js` — on utilise le loader tel quel
- **Conventions** : kebab-case pour les fichiers et CSS, camelCase pour les ID HTML
- **Sécurité** : pas de innerHTML ajouté, le loader utilise déjà createElement
- **Ne pas créer de contenu .md** — les fichiers Markdown sont fournis séparément
- **security-check:local** avant tout push

## Fichiers de référence

- Template HTML : `fiche-revision-template.html` (fourni)
- Page existante similaire : `pages/cours/conception-3d.html`
- Loader : `js/cours-loader.js`
- JSON exemple : `data/revisions/fiche-01-ost.json` (fourni)
