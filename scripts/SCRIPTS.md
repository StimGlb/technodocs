# Guide des scripts - TechnoDocs

Ce document décrit tous les scripts disponibles pour faciliter le développement et le déploiement de TechnoDocs.

## 📝 Scripts de commit

### Windows

```bash
commit.bat "Votre message de commit"
# ou
npm run commit:win "Votre message de commit"
```

### Linux/Mac

```bash
./commit.sh "Votre message de commit"
# ou
npm run commit "Votre message de commit"
```

**Ce que fait le script :**
1. Affiche le statut Git
2. Demande confirmation
3. Ajoute tous les fichiers modifiés (`git add .`)
4. Crée le commit avec votre message
5. Push automatiquement vers GitHub

**Exemple :**
```bash
commit.bat "Add security improvements and automated testing"
```

## 🔒 Scripts de sécurité

### Vérification locale (serveur de dev)

```bash
npm run dev                # Terminal 1
npm run security-check     # Terminal 2
```

### Vérification en production

```bash
npm run security-check:prod
# ou avec URL personnalisée
node security-check.js https://votre-site.netlify.app
```

**Ce que vérifie le script :**
- ✅ Headers HTTP de sécurité (CSP, HSTS, X-Frame-Options)
- ✅ Code HTML (scripts inline, handlers, liens externes)
- ✅ Code JavaScript (eval, innerHTML, console.log)
- ✅ Dépendances npm
- ✅ Fichiers sensibles (.env, credentials)

**Interprétation du score :**
- **>= 80%** : Excellent
- **60-79%** : Bon
- **< 60%** : Problèmes critiques

## 🚀 Scripts de développement

### Développement local

```bash
npm run dev
```

Lance le serveur Vite en mode développement (http://localhost:5173).

### Build de production

```bash
npm run build
```

Compile le projet pour la production dans le dossier `dist/`.

### Preview du build

```bash
npm run preview
```

Prévisualise le build de production localement.

## 📤 Scripts de déploiement

### Windows

```bash
npm run deploy:win
# ou
deploy.bat
```

### Linux/Mac

```bash
npm run deploy
# ou
./deploy.sh
```

**Note :** Le déploiement se fait automatiquement via Netlify lors d'un push sur la branche `main`.

## 🔄 Workflow recommandé

### Pour un développement avec commit rapide

```bash
# 1. Développer
npm run dev

# 2. Vérifier la sécurité
npm run security-check

# 3. Committer et pusher
commit.bat "Description des changements"
```

### Pour un déploiement complet

```bash
# 1. Build de production
npm run build

# 2. Preview
npm run preview

# 3. Vérification de sécurité locale
npm run security-check

# 4. Commit et push
commit.bat "Release version X.Y.Z"

# 5. Après déploiement Netlify : vérifier la prod
npm run security-check:prod
```

## ⚙️ Configuration des scripts

Tous les scripts npm sont définis dans `package.json` :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "bash deploy.sh",
    "deploy:win": "deploy.bat",
    "security-check": "node security-check.js",
    "security-check:prod": "node security-check.js https://votre-site.netlify.app",
    "commit": "bash commit.sh",
    "commit:win": "commit.bat"
  }
}
```

## 🎓 Pour les élèves

Les élèves peuvent utiliser ces scripts pour :

1. **Apprendre Git** : Observer le processus de commit avec `commit.bat`
2. **Sécurité** : Découvrir les failles avec `security-check.js`
3. **DevOps** : Comprendre le workflow dev → build → deploy

## 🆘 Dépannage

### Le script commit ne fonctionne pas

**Windows :**
- Vérifier que Git est installé : `git --version`
- Utiliser Git Bash si nécessaire

**Linux/Mac :**
- Rendre le script exécutable : `chmod +x commit.sh`

### Le script de sécurité échoue

- Vérifier que Node.js est installé : `node --version`
- Pour les tests locaux, lancer `npm run dev` d'abord
- Les headers de sécurité ne sont actifs qu'en production (normal d'avoir des échecs en local)

### Erreur de push Git

- Vérifier les credentials : `git config --list`
- S'assurer d'avoir les droits sur le dépôt
- Vérifier la connexion internet

---

**Dernière mise à jour :** 2026-01-21
