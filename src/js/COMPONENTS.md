# Système de Composants Réutilisables

## Vue d'ensemble

Le footer a été compacté et un système de composants réutilisables a été mis en place pour faciliter la création de nouvelles pages avec un header et footer cohérents.

## Changements effectués

### 1. Footer compacté (dist/css/style.css)

Le footer a été réduit visuellement :
- **Padding** : `var(--space-12)` → `var(--space-6)` (de 3rem à 1.5rem)
- **Taille de la marque** : `var(--text-xl)` → `var(--text-lg)` (de 1.25rem à 1.125rem)
- **Espacement marque** : `var(--space-4)` → `var(--space-2)` (de 1rem à 0.5rem)
- **Espacement texte** : `var(--space-2)` → `var(--space-3)` (de 0.5rem à 0.75rem)
- **Taille liens** : `var(--text-sm)` → `var(--text-xs)` (de 0.875rem à 0.75rem)

### 2. Composants créés

#### dist/includes/header.html
Header réutilisable avec :
- Logo TechnoDocs
- Navigation (Cours, Révisions, Outils)
- Menu hamburger pour mobile
- Chemins absolus (commençant par `/`)

#### dist/includes/footer.html
Footer réutilisable avec :
- Logo TechnoDocs
- Texte descriptif
- Liens légaux (Mentions légales, Accessibilité)
- Chemins absolus

#### dist/js/components.js
Script de chargement dynamique qui :
- Charge le header via fetch
- Charge le footer via fetch
- Initialise la navigation mobile après l'injection du header
- Gère les erreurs de chargement

### 3. Page template

**dist/pages/template.html** : Page d'exemple montrant comment utiliser les composants.

## Utilisation dans une nouvelle page

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechnoDocs | Titre</title>
    <link rel="stylesheet" href="/dist/css/style.css">
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
    <script type="module" src="/dist/js/components.js"></script>
    <script type="module" src="/dist/js/app.js"></script>
</body>
</html>
```

## Points importants

1. **Ordre des scripts** : `components.js` DOIT être chargé AVANT `app.js`
2. **Chemins absolus** : Tous les chemins dans les includes commencent par `/` pour fonctionner depuis n'importe quel niveau de dossier
3. **IDs requis** :
   - `header-placeholder` pour le header
   - `footer-placeholder` pour le footer
4. **Google Fonts** : N'oubliez pas d'inclure les liens vers Google Fonts dans le `<head>`

## Avantages

- ✅ **Cohérence** : Header et footer identiques sur toutes les pages
- ✅ **Maintenance** : Modification centralisée dans `header.html` et `footer.html`
- ✅ **Simplicité** : Créer une nouvelle page en quelques lignes
- ✅ **Footer compact** : Moins d'espace vertical utilisé
- ✅ **Mobile-ready** : Navigation mobile fonctionnelle automatiquement

## Migration des pages existantes

Pour migrer une page existante vers ce système :

1. Remplacer le `<header>` par `<div id="header-placeholder"></div>`
2. Remplacer le `<footer>` par `<div id="footer-placeholder"></div>`
3. Ajouter `<script type="module" src="/dist/js/components.js"></script>` avant `app.js`
4. Vérifier que tous les liens utilisent des chemins absolus (`/dist/...` ou `/pages/...`)

## Fichiers du système

```
dist/
├── includes/
│   ├── header.html       # Composant header
│   ├── footer.html       # Composant footer
│   └── README.md         # Documentation
├── js/
│   ├── app.js            # Logique principale (navigation, animations)
│   └── components.js     # Chargement des composants
├── css/
│   └── style.css         # Styles (footer compacté)
└── pages/
    └── template.html     # Template de page
```
