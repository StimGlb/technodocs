# Composants réutilisables

Ce dossier contient les composants HTML réutilisables (header et footer) pour toutes les pages du site TechnoDocs.

## Utilisation

### Dans une nouvelle page HTML

Pour utiliser le header et footer dynamiques dans une nouvelle page :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechnoDocs | Titre de la page</title>
    <link rel="stylesheet" href="/dist/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header dynamique -->
    <div id="header-placeholder"></div>

    <main>
        <!-- Votre contenu ici -->
    </main>

    <!-- Footer dynamique -->
    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script type="module" src="/dist/js/components.js"></script>
    <script type="module" src="/dist/js/app.js"></script>
</body>
</html>
```

### Points importants

1. **Placeholders** : Utilisez `<div id="header-placeholder"></div>` et `<div id="footer-placeholder"></div>`
2. **Scripts** : Chargez `components.js` AVANT `app.js` pour que le header soit injecté avant l'initialisation de la navigation
3. **Chemins absolus** : Utilisez des chemins commençant par `/` pour que ça fonctionne depuis n'importe quelle profondeur de dossier

## Fichiers

- `header.html` : Header avec navigation
- `footer.html` : Footer avec liens légaux
- `../js/components.js` : Script de chargement dynamique

## Modification

Pour modifier le header ou footer sur tout le site, éditez simplement les fichiers `header.html` et `footer.html`. Les changements seront automatiquement appliqués à toutes les pages qui utilisent le système de composants.
