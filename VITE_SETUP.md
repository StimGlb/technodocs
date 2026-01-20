# Configuration Vite pour TechnoDocs

Ce guide explique comment utiliser Vite pour le développement local de TechnoDocs.

## 📋 Prérequis

- Node.js installé (version 18 ou supérieure recommandée)
- npm ou yarn installé

Pour vérifier :
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Installer les dépendances

À la racine du projet, exécutez :

```bash
npm install
```

Cela installera Vite et toutes les dépendances nécessaires.

## 💻 Commandes disponibles

### Démarrer le serveur de développement

```bash
npm run dev
```

- Ouvre automatiquement votre navigateur sur `http://localhost:3000`
- Hot Module Replacement (HMR) : les changements sont visibles instantanément
- Serveur accessible sur le réseau local

### Construire pour la production

```bash
npm run build
```

- Crée une version optimisée dans le dossier `dist/`
- Minification et optimisation automatiques
- Prêt pour le déploiement

### Preview du build de production

```bash
npm run preview
```

- Lance un serveur local pour tester le build de production
- Accessible sur `http://localhost:4173`
- Utile pour vérifier avant le déploiement

## 🎯 Workflow de développement

### 1. Développement local

```bash
# Démarrer le serveur de dev
npm run dev

# Le navigateur s'ouvre sur http://localhost:3000
# Modifiez vos fichiers (index.html, CSS, etc.)
# Les changements apparaissent instantanément dans le navigateur
```

### 2. Tester avant déploiement

```bash
# Construire le projet
npm run build

# Prévisualiser le build
npm run preview

# Vérifier que tout fonctionne correctement
```

### 3. Déployer

Une fois satisfait du résultat :

```bash
# Windows
npm run deploy:win

# Linux/macOS
npm run deploy
```

## 📁 Structure du projet

```
TechnoDocs/
├── index.html          # Point d'entrée de l'application
├── vite.config.js      # Configuration Vite
├── package.json        # Dépendances et scripts
├── dist/               # Build de production (généré)
└── node_modules/       # Dépendances npm (généré)
```

## ⚙️ Configuration Vite

Le fichier `vite.config.js` contient :

- **Port du serveur de dev** : 3000
- **Port du serveur de preview** : 4173
- **Ouverture automatique du navigateur** : Activée
- **Source maps** : Activées pour le debugging
- **Minification** : Terser pour une optimisation maximale

### Modifier le port

Éditez `vite.config.js` :

```javascript
server: {
  port: 8080, // Changez ici
  open: true
}
```

## 🔥 Hot Module Replacement (HMR)

Vite utilise le HMR pour un développement ultra-rapide :

- Les modifications CSS sont appliquées sans rechargement
- Les modifications JavaScript rechargent la page automatiquement
- Feedback instantané lors du développement

## 🌐 Accès depuis le réseau local

Le serveur est accessible depuis d'autres appareils sur votre réseau :

```bash
npm run dev
```

Vous verrez :
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
```

Utilisez l'URL Network pour accéder depuis un téléphone ou une tablette.

## 📦 Build de production

### Optimisations automatiques

Quand vous exécutez `npm run build`, Vite :

- ✅ Minifie le code HTML, CSS et JavaScript
- ✅ Optimise les images
- ✅ Génère des bundles optimisés
- ✅ Crée des source maps pour le debugging
- ✅ Hash les fichiers pour le cache-busting

### Taille du build

Après le build, vous verrez un résumé :

```
dist/index.html                   2.45 kB
dist/assets/index-abc123.css     12.34 kB │ gzip: 4.56 kB
dist/assets/index-def456.js      45.67 kB │ gzip: 15.23 kB
```

## 🐛 Résolution de problèmes

### Le serveur ne démarre pas

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port déjà utilisé

Si le port 3000 est occupé, Vite utilisera automatiquement le port suivant (3001, 3002, etc.)

Ou modifiez le port dans `vite.config.js`.

### Erreur lors du build

```bash
# Nettoyer le dossier dist
rm -rf dist
npm run build
```

### HMR ne fonctionne pas

1. Vérifiez que vous n'avez pas de proxy ou VPN qui bloque les websockets
2. Essayez de redémarrer le serveur
3. Videz le cache du navigateur (Ctrl+Shift+R)

## 🚢 Déploiement

### Netlify

Netlify détectera automatiquement Vite si vous avez :

**netlify.toml** (à créer à la racine) :
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Vercel

Vercel détecte automatiquement Vite. Assurez-vous juste que :
- Build Command: `npm run build`
- Output Directory: `dist`

### GitHub Pages

Pour déployer sur GitHub Pages :

1. Modifiez `vite.config.js` :
```javascript
export default defineConfig({
  base: '/TechnoDocs/', // Nom de votre repo
  // ... reste de la config
})
```

2. Créez `.github/workflows/deploy.yml` :
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 💡 Conseils

### Développement

- Gardez le serveur de dev ouvert pendant que vous codez
- Utilisez deux écrans : code d'un côté, navigateur de l'autre
- Les DevTools de Chrome/Firefox fonctionnent parfaitement avec Vite

### Performance

- Vite est extrêmement rapide en développement (démarrage < 1s)
- Le build de production est optimisé automatiquement
- Les images lourdes peuvent ralentir le build (optimisez-les au préalable)

### Multi-appareils

- Testez sur mobile en utilisant l'URL Network
- Le HMR fonctionne aussi sur mobile
- Pratique pour tester la responsive

## 📚 Ressources

- [Documentation Vite](https://vitejs.dev/)
- [Guide de configuration](https://vitejs.dev/config/)
- [Guide des fonctionnalités](https://vitejs.dev/guide/features.html)

## 🎓 Exemple de session de développement

```bash
# 1. Installer (première fois seulement)
npm install

# 2. Démarrer le serveur de dev
npm run dev
  ➜ Local: http://localhost:3000/

# 3. Modifier index.html
# Les changements apparaissent instantanément

# 4. Tester le build
npm run build
npm run preview

# 5. Déployer
npm run deploy:win  # Windows
```

Et voilà ! Vous êtes prêt à développer avec Vite ! 🚀
