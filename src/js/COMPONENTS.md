# Systeme de Composants Reutilisables

## Vue d'ensemble

Header et footer sont charges dynamiquement via `components.js` en utilisant des imports Vite `?raw` (inclus dans le bundle, pas de fetch runtime). La navigation est construite dynamiquement a partir de `navigation.json`.

## Architecture

### Imports (build-time, bundles par Vite)

```js
import headerHtml from "../includes/header.html?raw";
import footerHtml from "../includes/footer.html?raw";
import navigationJsonRaw from "../data/navigation.json?raw";
```

Les fichiers HTML et JSON sont inlines dans le bundle JS a la compilation. Aucun fetch runtime n'est necessaire pour les composants.

### Chargement

`components.js` s'auto-initialise au `DOMContentLoaded` :

1. **Header** : injecte `header.html` dans `#header-placeholder` via `DOMParser` (pas de `innerHTML`)
2. **Navigation** : construit le menu dynamiquement depuis `navigation.json`
   - **Liens statiques** : ancres vers les sections de l'index (`#cours`, `#revisions`, `#corrections`, `#outils`)
   - **Liens dynamiques** : sous-pages (cours, devoirs, outils) depuis `navigation.json`
   - Gestion intelligente des chemins relatifs selon la profondeur de la page courante
   - Detection automatique du lien actif (`is-active`)
3. **Footer** : injecte `footer.html` dans `#footer-placeholder`
4. **Navigation mobile** : initialise le menu hamburger via `initNavigation()` (depuis `app.js`)

### Composants

#### src/includes/header.html
- Logo TechnoDocs
- Navigation noscript (liens statiques en fallback)
- Container `#main-nav` pour la navigation dynamique
- Menu hamburger pour mobile

#### src/includes/footer.html
- Logo TechnoDocs
- Texte descriptif
- Liens legaux (commentes pour l'instant)

### Donnees

#### src/data/navigation.json
Structure de navigation avec categories : `cours`, `devoirs`, `outils`, `corrections`, `flashcards`. Chaque item contient `id`, `name`, `path`, `icon`, et un flag `visible` optionnel.

## Utilisation dans une nouvelle page

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechnoDocs | Titre</title>
    <link rel="stylesheet" href="/src/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <div id="header-placeholder"></div>

    <main>
        <!-- Votre contenu -->
    </main>

    <!-- Footer -->
    <div id="footer-placeholder"></div>

    <!-- Scripts (dans cet ordre) -->
    <script type="module" src="/src/js/components.js"></script>
    <script type="module" src="/src/js/app.js"></script>
</body>
</html>
```

## Points importants

1. **Ordre des scripts** : `components.js` DOIT etre charge AVANT `app.js`
2. **IDs requis** :
   - `header-placeholder` pour le header
   - `footer-placeholder` pour le footer
3. **Chemins relatifs automatiques** : `components.js` calcule le prefixe relatif (`../`, `../../`, etc.) selon la profondeur de la page. Les ancres vers l'index sont transformees en `../../index.html#cours` si necessaire.
4. **Pas de fetch runtime** : les includes sont bundles par Vite via `?raw`, donc disponibles meme offline apres le chargement initial.
5. **Securite** : injection DOM via `DOMParser` + `replaceWith` (pas de `innerHTML` sur les placeholders).

## Fichiers du systeme

```
src/
├── includes/
│   ├── header.html          # Composant header (noscript nav incluse)
│   └── footer.html          # Composant footer
├── data/
│   └── navigation.json      # Structure de navigation (import ?raw)
└── js/
    ├── components.js         # Chargement composants + construction nav
    └── app.js                # Navigation mobile (initNavigation)
```
