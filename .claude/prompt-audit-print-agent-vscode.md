# Audit et propositions d'amélioration — Impression fiches d'activité

## Ta mission

Analyser la fonctionnalité d'impression des fiches d'activité TechnoDocs et proposer des améliorations concrètes. **Tu ne modifies rien** — tu analyses, tu testes, tu proposes.

## Contexte rapide

Les fiches d'activité ont un double rendu : écran (dark theme) et impression (A4, 2 pages recto-verso). Le print est géré par `css/print.css` (chargé via `media="print"`). Un en-tête dédié `.print-header` remplace le hero et le bandeau meta en impression.

Consulte le fichier `briefing-agent-print-fiches-activite.md` dans le projet pour le détail complet de l'architecture.

## Étape 1 — Analyse du code

Lis attentivement ces fichiers et note les incohérences, redondances ou problèmes potentiels :

1. `css/print.css` — le `@media print` complet
2. `css/activite.css` — les styles écran des composants de fiche
3. `pages/activites/template-activite.html` — la structure HTML
4. `js/cours-loader.js` — le peuplement des champs (section `printFields` et `metaFields`)
5. `content/md/activites/exemple-activite.md` — le contenu Markdown avec HTML inline

Pour chaque fichier, note :
- Les règles CSS orphelines (qui ne ciblent rien dans le HTML actuel)
- Les `!important` qui pourraient être évités
- Les incohérences de nommage ou de structure
- Le code mort ou legacy (ex: `.no-screen` si elle traîne encore)

## Étape 2 — Test du rendu print

Ouvre `pages/activites/template-activite.html` dans Chrome et fais Ctrl+P. Analyse le rendu :

### En-tête print (`.print-header`)
- Les 3 rangées sont-elles bien structurées et alignées ?
- Le fond gris du bandeau central s'imprime-t-il ? (dépend de `print-color-adjust`)
- Les lignes de saisie Prénom/Nom/Classe sont-elles assez longues ?
- Le logo "TechnoDocs" est-il bien positionné ?
- La hiérarchie visuelle est-elle claire (titre "Fiche d'activité" dominant) ?

### Contenu
- Le bloc OST / Problématique est-il lisible et compact ?
- Le "Travail demandé" se distingue-t-il visuellement du reste ?
- Les zones de réponse ont-elles des bordures visibles et une hauteur suffisante pour écrire au stylo ?
- Les lignes d'écriture (`.zone-reponse--lignes`) s'impriment-elles ?
- Le layout deux colonnes (consignes / illustration) fonctionne-t-il ?
- Le badge "💻 Sur ordinateur" est-il lisible en noir et blanc ?

### Mise en page globale
- La fiche tient-elle sur 2 pages A4 ?
- Y a-t-il des coupures malheureuses (titre orphelin en bas de page, tableau séparé de sa consigne) ?
- Les marges sont-elles équilibrées ?
- Le contraste est-il suffisant partout (pas de texte gris clair sur blanc) ?

## Étape 3 — Propositions

Sur la base de ton analyse, propose des améliorations classées en 3 catégories :

### A. Corrections (bugs ou problèmes de rendu constatés)
Tout ce qui ne fonctionne pas correctement — à corriger en priorité.

### B. Améliorations de mise en forme (quick wins)
Ce qui fonctionne mais pourrait être plus propre, plus pro, plus lisible. Par exemple :
- Espacement entre les blocs
- Taille/style des bordures
- Hiérarchie typographique
- Alignement des éléments dans le print-header

### C. Fonctionnalités nouvelles (si pertinent)
Des idées qui ajouteraient de la valeur, par exemple :
- Numérotation des pages
- Header allégé répété en haut de la page 2
- Variante corrigé enseignant
- Meilleur responsive mobile des fiches à l'écran

Pour chaque proposition, indique :
- **Quoi** : ce que tu proposes
- **Pourquoi** : le problème que ça résout ou le gain attendu
- **Comment** : la direction technique (quel fichier, quelle approche)
- **Effort** : faible / moyen / élevé

## Format de rendu

Produis un rapport structuré en Markdown. Pas de code — uniquement de l'analyse et des propositions. Le code viendra après validation des propositions.
