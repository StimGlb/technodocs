# 🔗 Système de gestion des liens modulaire - TechnoDocs

## Vue d'ensemble

Ce système permet de gérer **tous les liens de l'index** (Outils, Corrections, Cours, Révisions) via un fichier JSON centralisé. Plus besoin de modifier le HTML pour ajouter/modifier un lien !

---

## ✨ Avantages

✅ **Centralisation** : Tous les liens dans un seul fichier `links.json`
✅ **Modularité** : Ajout/suppression sans toucher au HTML
✅ **Maintenabilité** : Modification facile des URLs, icônes, descriptions
✅ **Sécurité** : Génération sécurisée via `createElement` (pas d'`innerHTML`)
✅ **Évolutivité** : Facile d'ajouter de nouveaux types de cartes
✅ **Fallback** : Si JSON non chargé, le HTML statique reste affiché

---

## 📁 Structure des fichiers

```
dist/
├── data/
│   └── links.json                # Configuration centralisée
├── js/
│   ├── links-loader.js          # Module de rendu des liens
│   └── app.js                   # Appel au loader
└── pages/
    ├── outils/
    │   └── tinkercad-classes.html
    └── corrections/
        └── fiches_activites.html
```

---

## 🚀 Utilisation

### 1. Ajouter un nouvel outil

Éditez `dist/data/links.json` :

```json
{
  "outils": [
    {
      "name": "Nouveau Tool",
      "url": "/dist/pages/outils/mon-outil.html",
      "tag": "Description courte",
      "icon": {
        "type": "emoji",
        "value": "⚙️"
      },
      "external": false
    }
  ]
}
```

**Paramètres :**
- `name` : Nom affiché sur la carte
- `url` : Lien (absolu ou relatif)
- `tag` : Tag descriptif affiché sous le nom
- `icon.type` : `"emoji"` ou `"image"`
- `icon.value` : Emoji (si type = emoji)
- `icon.src` / `icon.alt` : Chemin et alt (si type = image)
- `external` : `true` pour ouvrir dans un nouvel onglet

### 2. Ajouter une correction

```json
{
  "corrections": [
    {
      "name": "Nouvelle correction",
      "url": "/dist/pages/corrections/ma-correction.html",
      "description": "Description de la correction",
      "icon": "📄",
      "class": "correction-card--custom"
    }
  ]
}
```

### 3. Ajouter un cours (section Cours)

```json
{
  "cours": [
    {
      "title": "Nouveau cours",
      "url": "/dist/pages/cours/mon-cours.html",
      "description": "Description du cours",
      "image": "/dist/images/mon-cours.svg",
      "color": "blue"
    }
  ]
}
```

**Couleurs disponibles :** `blue`, `green`, `purple`, `orange`, `red`

---

## 🎨 Types d'icônes

### Emoji (recommandé)

```json
"icon": {
  "type": "emoji",
  "value": "🐍"
}
```

**Avantages :** Léger, pas de chargement d'image, accessible

### Image

```json
"icon": {
  "type": "image",
  "src": "/dist/images/logo-tinkercad.png",
  "alt": "Tinkercad"
}
```

**Avantages :** Logo personnalisé, branding

---

## 🔧 Personnalisation

### Ajouter un nouveau type de section

1. **Ajouter la clé dans `links.json`** :

```json
{
  "outils": [...],
  "corrections": [...],
  "revisions": [
    {
      "name": "Flashcards",
      "url": "/dist/pages/flashcards/flashcards.html",
      "description": "Révise en t'amusant",
      "icon": "🗒️",
      "class": "revision-card--flashcards"
    }
  ]
}
```

2. **Créer la fonction de rendu dans `links-loader.js`** :

```javascript
function createRevisionCard(revision) {
    const link = document.createElement('a');
    link.href = revision.url;
    link.className = `revision-card ${revision.class}`;

    const iconDiv = document.createElement('div');
    iconDiv.className = 'revision-card__icon';
    iconDiv.textContent = revision.icon;
    link.appendChild(iconDiv);

    const title = document.createElement('h3');
    title.className = 'revision-card__title';
    title.textContent = revision.name;
    link.appendChild(title);

    const description = document.createElement('p');
    description.className = 'revision-card__text';
    description.textContent = revision.description;
    link.appendChild(description);

    return link;
}
```

3. **Ajouter le chargement dans `loadLinks()`** :

```javascript
// Charger les révisions
const revisionsGrid = document.querySelector('.revision-grid');
if (revisionsGrid && data.revisions) {
    revisionsGrid.textContent = '';
    data.revisions.forEach(revision => {
        revisionsGrid.appendChild(createRevisionCard(revision));
    });
}
```

4. **Ajouter le conteneur HTML dans `index.html`** :

```html
<section id="revisions" class="section">
    <div class="section__header">
        <h2 class="section__title">🧠 Révisions</h2>
    </div>

    <div class="revision-grid">
        <!-- Les cartes seront injectées ici par JavaScript -->
        <!-- Contenu statique de fallback (optionnel) -->
    </div>
</section>
```

---

## 🧪 Tests

### 1. Vérifier le chargement

Ouvrez la console du navigateur (F12) et vérifiez :

```
🚀 TechnoDocs initialisé
```

En cas d'erreur :

```
Erreur chargement des liens: ...
```

### 2. Tester le fallback

Si `links.json` ne charge pas, le HTML statique reste affiché.

Pour tester, renommez temporairement `links.json` :

```bash
mv dist/data/links.json dist/data/links.json.bak
```

Rechargez la page → Les liens statiques du HTML s'affichent.

### 3. Valider le JSON

Utilisez un validateur JSON en ligne :
- https://jsonlint.com/
- https://jsonformatter.curiousconcept.com/

---

## 🚨 Problèmes courants

### Les liens ne s'affichent pas

**Cause 1 :** Erreur dans `links.json` (syntaxe invalide)

**Solution :** Validez votre JSON avec JSONLint

**Cause 2 :** Chemin du fichier incorrect

**Solution :** Vérifiez que `fetch('/dist/data/links.json')` pointe vers le bon fichier

**Cause 3 :** Sélecteur CSS incorrect

**Solution :** Vérifiez que `.tools-grid`, `.correction-grid` existent dans le HTML

### Les icônes ne s'affichent pas

**Cause :** Type d'icône mal défini

**Solution :** Vérifiez que `icon.type` est bien `"emoji"` ou `"image"`

### Erreur CORS en local

**Cause :** `fetch()` bloqué par le navigateur en mode `file://`

**Solution :** Utilisez un serveur local :

```bash
npm run dev
```

---

## 📊 Schema JSON complet

```json
{
  "outils": [
    {
      "name": "string (requis)",
      "url": "string (requis)",
      "tag": "string (requis)",
      "icon": {
        "type": "emoji | image (requis)",
        "value": "string (si emoji)",
        "src": "string (si image)",
        "alt": "string (si image)"
      },
      "external": "boolean (optionnel, défaut: false)"
    }
  ],
  "corrections": [
    {
      "name": "string (requis)",
      "url": "string (requis)",
      "description": "string (requis)",
      "icon": "string (emoji, requis)",
      "class": "string (optionnel, classes CSS additionnelles)"
    }
  ],
  "cours": [
    {
      "title": "string (requis)",
      "url": "string (requis)",
      "description": "string (requis)",
      "image": "string (optionnel, chemin vers image)",
      "color": "blue | green | purple | orange | red (requis)"
    }
  ]
}
```

---

## 🔐 Sécurité

### ✅ Bonnes pratiques respectées

- **Pas d'`innerHTML`** : Tout est créé via `createElement()`
- **Validation des données** : Vérification de l'existence des propriétés
- **textContent** : Utilisé pour injecter du texte (pas d'injection XSS)
- **Fallback HTML** : Si JavaScript échoue, le HTML statique reste
- **Gestion d'erreurs** : `try/catch` avec log en développement uniquement

### ⚠️ Attention

- Validez toujours les URLs avant de les ajouter à `links.json`
- N'ajoutez jamais de code JavaScript dans les propriétés JSON
- Les URLs externes doivent être de confiance (risque de phishing)

---

## 📝 Checklist ajout d'un lien

- [ ] Ouvrir `dist/data/links.json`
- [ ] Ajouter l'objet dans la bonne section (`outils`, `corrections`, `cours`)
- [ ] Vérifier la syntaxe JSON (pas de virgule finale)
- [ ] Tester en local (`npm run dev`)
- [ ] Vérifier l'affichage sur mobile
- [ ] Vérifier l'accessibilité (navigation au clavier)
- [ ] Commit et push

---

## 🎯 Exemple complet

**Scénario :** Ajouter un outil "Canva" et une correction "Réseaux"

**`dist/data/links.json` :**

```json
{
  "outils": [
    {
      "name": "Accède à ta classe",
      "url": "/dist/pages/outils/tinkercad-classes.html",
      "tag": "3D / Circuits",
      "icon": {
        "type": "image",
        "src": "/dist/images/logo-tinkercad.png",
        "alt": "Tinkercad"
      },
      "external": false
    },
    {
      "name": "Canva",
      "url": "https://www.canva.com/",
      "tag": "Design graphique",
      "icon": {
        "type": "emoji",
        "value": "🎨"
      },
      "external": true
    }
  ],
  "corrections": [
    {
      "name": "Fiches d'activités",
      "url": "/dist/pages/corrections/fiches_activites.html",
      "description": "Corrections des fiches d'activités en classe",
      "icon": "📋",
      "class": "correction-card--fiches"
    },
    {
      "name": "Réseaux informatiques",
      "url": "/dist/pages/corrections/correction-reseaux.html",
      "description": "Correction de l'activité sur les réseaux",
      "icon": "🌐",
      "class": "correction-card--reseaux"
    }
  ]
}
```

**Résultat :** Les nouvelles cartes apparaissent automatiquement sur l'index !

---

## 📚 Ressources

### Fichiers clés du projet

- `dist/data/links.json` - Configuration des liens
- `dist/js/links-loader.js` - Module de rendu
- `dist/js/app.js` - Point d'entrée de l'application
- `index.html` - Structure HTML de base

### Documentation complémentaire

- `docs/MARKDOWN_SYSTEM.md` - Système de rendu Markdown
- `docs/SECURITY.md` - Bonnes pratiques sécurité
- `.agent/rules/technodocs-project-rules.md` - Règles du projet

---

## 📝 Notes de version

**Version 1.0** (22 janvier 2026)
- ✅ Système de liens modulaire opérationnel
- ✅ Support des outils, corrections et cours
- ✅ Icônes emoji et images
- ✅ Sécurité renforcée (createElement)
- ✅ Fallback HTML si JSON non chargé
- ✅ Documentation complète

---

*Documentation mise à jour le 22 janvier 2026 - TechnoDocs*
