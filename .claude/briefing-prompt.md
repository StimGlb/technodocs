# Briefing Agent — Fonctionnalité Print des fiches d'activité

## Contexte TechnoDocs

TechnoDocs est une plateforme pédagogique pour le collège (Technologie, Cycle 4). Le frontend est en **Vanilla HTML/CSS/JS** avec un système de chargement de contenu Markdown via `cours-loader.js`. Le site utilise un **dark theme** à l'écran.

Les fiches d'activité sont des documents destinés aux élèves. Elles ont **deux vies** :
- **À l'écran** : consultées sur le site avec le dark theme, la navigation, le hero animé
- **En impression** : imprimées sur papier A4 (recto-verso = 2 pages max), les élèves écrivent au stylo dans les zones de réponse

---

## Architecture de la fonctionnalité print

### Fichiers impliqués

```
css/
├── style.css          # Styles globaux (dark theme, layout)
├── markdown.css       # Rendu du contenu Markdown
├── cours.css          # Hero + layout des pages cours/révisions
├── activite.css       # Styles écran spécifiques aux fiches d'activité
└── print.css          # ★ Styles impression (chargé via media="print")

pages/activites/
└── template-activite.html   # Template HTML des fiches

js/
└── cours-loader.js    # Charge le JSON de config + le .md de contenu

data/activites/
└── exemple-activite.json    # Config (titre, niveau, séquence, compétences, chemin .md)

content/md/activites/
├── exemple-activite.md      # Contenu Markdown avec HTML inline
└── GUIDE-STRUCTURE.md       # Guide de rédaction pour les nouvelles fiches
```

### Principe de séparation écran / print

Le template HTML contient **deux systèmes d'en-tête parallèles** :

| Bloc HTML | Classe | Rôle écran | Rôle print |
|-----------|--------|-----------|------------|
| Hero (titre + gradient) | `.cours-hero` | Visible | Masqué |
| Bandeau meta (Niveau, Séquence…) | `.fiche-meta` | Visible | Masqué |
| En-tête print (identité + bandeau + infos) | `.print-header` | Masqué | Visible |
| Ancienne ligne identité | `.fiche-identite` | Masqué | Masqué (legacy) |

Le masquage/affichage est géré par des sélecteurs **nommés spécifiquement** dans chaque fichier CSS :

```css
/* activite.css — écran */
.print-header { display: none; }
.fiche-identite { display: none; }

/* print.css — @media print */
.print-header { display: block !important; }
.fiche-meta { display: none !important; }
.fiche-identite { display: none !important; }
.cours-hero { display: none !important; }
```

> **Point critique** : ne jamais utiliser une classe générique partagée (type `.no-screen`) pour gérer la visibilité écran/print. Ça a causé des régressions en cascade lors du développement. Toujours cibler les blocs par leur nom propre.

### Structure du print-header

3 rangées dans un tableau bordé :

```
┌─────────────────────────────────────────────────────────────────────┐
│  Prénom : _______________  Nom : ___________________  Classe : ___ │
├──────────────┬──────────────────────────────────────┬───────────────┤
│  Séquence    │         Fiche d'activité             │  TechnoDocs   │
│  Séance      │    [Titre — niveau]                  │  (logo)       │
├──────────────┴──────────────────────────────────────┴───────────────┤
│  Niveau : 5ème          Durée : 1h30          Compétences : …      │
└─────────────────────────────────────────────────────────────────────┘
```

Les valeurs sont peuplées par `cours-loader.js` via des IDs (`printNiveau`, `printSequence`, `printSeance`, `printDuree`, `printCompetences`, `printTitre`).

### Structure du contenu Markdown

Le `.md` utilise du HTML inline avec des classes CSS pour la mise en page :

```
.fiche-ost            → Bandeau OST / Problématique (2 colonnes)
.fiche-travail        → Bloc "Travail demandé" (fond gris, centré)
.fiche-activite       → Cadre d'activité numérotée
  .fiche-activite__titre
  .fiche-deux-colonnes  → Layout 60/40 (consignes / illustration)
.zone-reponse         → Espace vide pour écriture (+ --medium, --large, --lignes)
.zone-illustration    → Cadre pointillé pour image/schéma
.fiche-conclusion     → Bloc conclusion
.fiche-ordi           → Badge "💻 Sur ordinateur"
.page-break           → Saut de page manuel
```

### Fonctionnement du print.css

Le `@media print` est organisé en 7 sections dans cet ordre :
1. **Reset dark theme** — `* { color: #000; background: transparent }` neutralise tout
2. **Masquage** — hero, header/footer nav, fiche-meta, fiche-identite
3. **Affichage print-header** — styles des 3 rangées
4. **Structure page** — `@page { size: A4; margin: 10mm }`, body 9pt, line-height 1.3
5. **Composants** — OST, travail demandé, activités, zones réponse (hauteurs en mm)
6. **Typographie Markdown** — paragraphes, listes, tableaux compactés
7. **Sauts de page** — protection des titres orphelins et zones de réponse

Les exceptions au reset `*` (fonds gris, lignes d'écriture, bordures) sont définies **après** le reset.

---

## Contraintes de conception

- **Cible : 2 pages A4 recto-verso** pour une fiche type (2 activités + conclusion)
- **Typographie print** : 9pt minimum (lisibilité élève), line-height 1.3
- **Zones de réponse** : 30mm (courte), 45mm (medium), 60mm (large) — les élèves écrivent au stylo
- **Pas de `page-break-inside: avoid` sur `.fiche-activite`** — ça forçait chaque activité sur une page séparée. Seuls les petits éléments (titres, zones réponse, tableaux) sont protégés
- **Le fond gris du bandeau central print-header** nécessite `print-color-adjust: exact` sinon Chrome ne l'imprime pas
- **`-webkit-text-fill-color: #000`** peut être nécessaire si le hero utilise `background-clip: text` (gradient clipé → texte invisible en print sans ce fix)

---

## Pistes d'amélioration

### 1. En-tête print répété sur chaque page

Actuellement le `.print-header` n'apparaît que sur la page 1. Pour un document multi-pages distribué aux élèves, il serait utile d'avoir au minimum une ligne d'identification répétée en haut de chaque page.

**Piste technique** : utiliser les éléments `<thead>` dans un `<table>` wrapper ou `position: fixed` en print (supporté par Chrome). Alternative : `@page { @top-center { content: "..." } }` mais le support est limité et on ne peut pas y mettre de HTML dynamique.

La solution la plus fiable serait un `running header` via `position: fixed` :
```css
@media print {
    .print-header-compact {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        /* version allégée : juste Prénom/Nom/Classe + titre */
    }
    .md-content {
        margin-top: 12mm; /* espace pour le header fixe */
    }
}
```
À tester — le comportement de `position: fixed` en print varie selon les navigateurs.

### 2. Logo TechnoDocs

L'emplacement `.print-header__droite` contient actuellement un texte "TechnoDocs". Il pourrait accueillir un vrai logo SVG inline ou une petite image. Prévoir un conteneur de ~20×20mm.

### 3. Numérotation des pages

```css
@page {
    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-size: 7pt;
        color: #999;
    }
}
```
Support limité (Chrome OK, Firefox non). Progressive enhancement acceptable.

### 4. Variante "corrigé enseignant"

Ajouter une classe `.fiche-corrige` sur le `<body>` ou sur `<main>` qui :
- Affiche les réponses dans les zones de réponse (texte rouge/vert)
- Change le bandeau "Fiche d'activité" en "Corrigé enseignant"
- Utilise un fond légèrement teinté pour distinguer du document élève

Le Markdown pourrait utiliser des blocs conditionnels :
```html
<div class="correction-only">Réponse attendue ici</div>
```
Masqués par défaut, affichés quand `.fiche-corrige` est actif.

### 5. Styles des zones de réponse à l'écran

Les zones de réponse sont optimisées pour le papier mais assez ternes à l'écran (fond gris clair sur dark theme). On pourrait les rendre plus visibles avec une bordure accent ou un fond subtil adapté au dark theme.

### 6. Responsive du layout deux colonnes

Le `.fiche-deux-colonnes` pourrait passer en colonne unique sur mobile (les tablettes élèves) :
```css
@media (max-width: 768px) {
    .fiche-deux-colonnes {
        flex-direction: column;
    }
}
```

### 7. Ligne de titre séparatrice entre le print-header et le contenu

Une fine ligne horizontale ou un léger espacement visuel entre le header et le bloc OST rendrait la hiérarchie plus claire sur le papier.

---

## Conventions à respecter

- **CSS** : kebab-case pour les classes, BEM-like (`.bloc__element--modificateur`)
- **JS** : camelCase pour les IDs HTML et les variables
- **Commentaires** : en français
- **Fichiers** : ne modifier que `print.css` et `activite.css` pour le styling, `template-activite.html` pour la structure, `cours-loader.js` pour la logique de peuplement
- **Tests** : toujours vérifier l'écran (dark theme) ET le print (Ctrl+P Chrome) après chaque modification
- **Régression** : les fiches de révision (`pages/revisions/`) utilisent le même `cours.css` et `print.css` — vérifier qu'elles ne sont pas impactées