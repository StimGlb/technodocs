# 📚 Système de rendu Markdown - TechnoDocs

## Vue d'ensemble

Le système de rendu Markdown de TechnoDocs permet de créer facilement des pages de contenu pédagogique (corrections, cours, fiches) à partir de simples fichiers `.md`. Il génère automatiquement des pages HTML stylisées avec navigation, tout en respectant les normes de sécurité CSP.

---

## ✨ Fonctionnalités

### 🎨 Style optimisé pour l'éducation
- **Police Lexend** : Conçue pour faciliter la lecture, notamment pour les élèves dyslexiques
- **Fond papier** : Teinte crème (#fefdfb) réduisant la fatigue oculaire
- **Grandes polices** : Texte de base à 1.125rem (18px)
- **Espacement généreux** : Line-height de 1.8 pour une lecture confortable

### 📑 Table des matières automatique
- Génération automatique à partir des titres `h3` (Activités) et `h4` (Questions)
- Navigation cliquable avec ancres
- Design moderne avec dégradé bleu/indigo
- Responsive et accessible (attribut `aria-label`)

### 🔒 Sécurité renforcée
- **Zéro `innerHTML`** : Utilisation de `DOMParser` pour injection sécurisée
- **Marked.js local** : Pas de dépendance CDN (fichier hébergé localement)
- **Conformité CSP** : Compatible avec `script-src 'self'`
- **Validation des réponses HTTP** : Gestion d'erreurs robuste

### 🎯 Mise en valeur du contenu
- Encadrés automatiques pour les paragraphes commençant par du gras (**Compétence évaluée :**, etc.)
- Tableaux stylisés avec alternance de couleurs et hover
- Blocs de code avec Fira Code et coloration
- Citations (blockquotes) avec bordure indigo

---

## 📁 Structure des fichiers

```
dist/
├── css/
│   └── markdown.css                    # Styles spécifiques au rendu MD
├── js/
│   └── libs/
│       └── marked.min.js              # Parser Markdown (v11.1.1, local)
├── pages/
│   ├── md-template.html               # Template générique avec paramètre ?doc=
│   ├── corrections/
│   │   ├── fiches_activites.html      # Index des corrections
│   │   ├── correction-impression3d.html   # Page dédiée
│   │   └── correction-reparabilite.html   # Page dédiée
│   └── content/
│       └── md/
│           ├── correction-impression3d.md  # Contenu Markdown
│           └── correction-reparabilite.md  # Contenu Markdown
```

---

## 🚀 Création d'une nouvelle page de cours

### Méthode 1 : Page dédiée (recommandée)

**Avantages :**
- URL propre et mémorisable
- Meilleure indexation SEO
- Titre et meta description personnalisés

**Étapes :**

#### 1. Créer le fichier Markdown

Créez votre fichier dans `dist/pages/content/md/` :

```bash
# Exemple : correction-reseaux.md
dist/pages/content/md/correction-reseaux.md
```

**Structure recommandée :**

```markdown
## **FICHE D'ACTIVITÉ : RÉSEAUX - CORRECTION**

---

### **ACTIVITÉ 1 : Les bases des réseaux**

#### **Question 1 : Qu'est-ce qu'une adresse IP ?**

**Réponse modèle :** Une adresse IP (Internet Protocol) est...

**Éléments clés attendus (minimum pour valider) :**

* ✅ Identifiant unique sur un réseau
* ✅ Format numérique (IPv4 ou IPv6)
* ✅ Permet la communication entre appareils

**Compétence évaluée :** Comprendre les fondamentaux des réseaux informatiques

**Critères de réussite :**

* 🟢 **Acquis** : Les 3 éléments clés sont présents
* 🟡 **En cours** : 1-2 éléments présents
* 🔴 **Non acquis** : Réponse hors sujet

**Barème : /1 pt**
```

#### 2. Créer la page HTML dédiée

Copiez `correction-impression3d.html` et adaptez-le :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Correction détaillée de l'activité Réseaux - TechnoDocs">
    <title>Correction Réseaux | TechnoDocs</title>
    <link rel="stylesheet" href="/dist/css/style.css">
    <link rel="stylesheet" href="/dist/css/markdown.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=Fira+Code:wght@400;500&family=Lexend:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="header-placeholder"></div>

    <main>
        <article class="md-content" id="markdown-container">
            <div class="md-loading">Chargement de la correction...</div>
        </article>
    </main>

    <div id="footer-placeholder"></div>

    <script src="/dist/js/libs/marked.min.js"></script>

    <script type="module">
        import { loadComponents } from '/dist/js/components.js';
        loadComponents();

        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });

        const safeInjectHTML = (container, htmlString) => {
            if (!container) return;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            container.textContent = '';
            Array.from(doc.body.childNodes).forEach(node => {
                container.appendChild(node.cloneNode(true));
            });
        };

        const createErrorMessage = (message) => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'md-error';
            const strong = document.createElement('strong');
            strong.textContent = 'Erreur : ';
            const text = document.createTextNode(message);
            errorDiv.appendChild(strong);
            errorDiv.appendChild(text);
            return errorDiv;
        };

        const generateTOC = (container) => {
            const h3Elements = container.querySelectorAll('h3');
            if (h3Elements.length === 0) return;

            const tocContainer = document.createElement('nav');
            tocContainer.className = 'md-toc';
            tocContainer.setAttribute('aria-label', 'Table des matières');

            const tocTitle = document.createElement('div');
            tocTitle.className = 'md-toc-title';
            tocTitle.textContent = 'Table des matières';

            const tocList = document.createElement('ul');
            tocList.className = 'md-toc-list';

            h3Elements.forEach((h3, index) => {
                if (!h3.id) {
                    h3.id = `activite-${index + 1}`;
                }

                const activityItem = document.createElement('li');
                activityItem.className = 'md-toc-activity';

                const activityLink = document.createElement('a');
                activityLink.href = `#${h3.id}`;
                activityLink.textContent = h3.textContent;

                activityItem.appendChild(activityLink);

                const questions = [];
                let nextElement = h3.nextElementSibling;

                while (nextElement && nextElement.tagName !== 'H3') {
                    if (nextElement.tagName === 'H4') {
                        questions.push(nextElement);
                    }
                    nextElement = nextElement.nextElementSibling;
                }

                if (questions.length > 0) {
                    const questionsList = document.createElement('ul');
                    questionsList.className = 'md-toc-questions';

                    questions.forEach((h4, qIndex) => {
                        if (!h4.id) {
                            h4.id = `activite-${index + 1}-question-${qIndex + 1}`;
                        }

                        const questionItem = document.createElement('li');
                        const questionLink = document.createElement('a');
                        questionLink.href = `#${h4.id}`;
                        questionLink.textContent = h4.textContent;

                        questionItem.appendChild(questionLink);
                        questionsList.appendChild(questionItem);
                    });

                    activityItem.appendChild(questionsList);
                }

                tocList.appendChild(activityItem);
            });

            tocContainer.appendChild(tocTitle);
            tocContainer.appendChild(tocList);

            const firstHeading = container.querySelector('h1, h2');
            if (firstHeading && firstHeading.nextElementSibling) {
                firstHeading.parentNode.insertBefore(tocContainer, firstHeading.nextElementSibling);
            } else {
                container.insertBefore(tocContainer, container.firstChild);
            }
        };

        async function loadCorrection() {
            const container = document.getElementById('markdown-container');

            try {
                // ⚠️ MODIFIER ICI LE CHEMIN VERS VOTRE FICHIER .md
                const response = await fetch('/dist/pages/content/md/correction-reseaux.md');

                if (!response.ok) {
                    throw new Error('Impossible de charger la correction');
                }

                const mdText = await response.text();
                const htmlContent = marked.parse(mdText);

                safeInjectHTML(container, htmlContent);
                generateTOC(container);

                const firstH1 = container.querySelector('h1');
                if (firstH1) {
                    document.title = `${firstH1.textContent} | TechnoDocs`;
                }

            } catch (error) {
                container.textContent = '';
                container.appendChild(createErrorMessage(error.message));
                console.error('Erreur chargement correction:', error);
            }
        }

        loadCorrection();
    </script>
</body>
</html>
```

**Points d'attention :**
- ✅ Modifier le chemin du fichier `.md` dans `fetch()`
- ✅ Adapter la `meta description`
- ✅ Adapter le `<title>`

#### 3. Ajouter à l'index

Éditez `dist/pages/corrections/fiches_activites.html` pour ajouter un lien :

```html
<div class="card">
    <h3>Réseaux informatiques</h3>
    <p>Correction de l'activité sur les réseaux : adresses IP, routage, protocoles...</p>
    <a href="correction-reseaux.html" class="btn-primary">
        Voir la correction
    </a>
</div>
```

---

### Méthode 2 : Template générique avec paramètre

**Avantages :**
- Pas besoin de créer une page HTML pour chaque fichier `.md`
- Flexible pour des contenus temporaires

**Utilisation :**

```
/dist/pages/md-template.html?doc=/dist/pages/content/md/mon-document.md
```

**Exemple de lien :**

```html
<a href="/dist/pages/md-template.html?doc=/dist/pages/content/md/correction-reseaux.md">
    Correction Réseaux
</a>
```

---

## 🎨 Guide de style Markdown

### Hiérarchie des titres

```markdown
## **TITRE PRINCIPAL (H2)**         # Pour le titre de la fiche

---

### **ACTIVITÉ X : Titre (H3)**    # Pour les grandes sections

#### **Question X : Titre (H4)**   # Pour les questions
```

### Emojis recommandés

```markdown
✅ Éléments clés / Points validés
🟢 Acquis
🟡 En cours
🔴 Non acquis
💎 Bonus / Élèves avancés
💡 Astuce / Attention
📌 Point important
⚠️ Avertissement
```

### Mise en forme automatique

Les paragraphes commençant par du **gras** sont automatiquement mis en valeur avec un fond dégradé et une bordure :

```markdown
**Réponse modèle :** Votre texte ici

**Éléments clés attendus :**

**Compétence évaluée :** Titre de la compétence

**Critères de réussite :**
```

### Tableaux

```markdown
| Colonne 1 | Colonne 2 |
| ----- | ----- |
| Contenu | Contenu |
```

Les tableaux bénéficient automatiquement de :
- Alternance de couleurs (lignes paires)
- Effet hover sur les lignes
- En-têtes avec fond indigo

### Listes

```markdown
* ✅ Item 1
* ✅ Item 2
  * Sous-item (indent avec 2 espaces)
```

### Code

**Code inline :**
```markdown
Utilisez `code inline` pour des commandes courtes
```

**Blocs de code :**
````markdown
```bash
npm run dev
```

```python
def hello():
    print("Hello World")
```
````

---

## 🔧 Personnalisation du style

### Modifier les couleurs

Éditez `dist/css/markdown.css` :

```css
.md-content {
    background: #fefdfb;  /* Fond papier */
    border: 1px solid var(--color-gray-200);
}

.md-toc {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
    border: 2px solid var(--color-indigo-200);
}
```

### Modifier la police

Remplacez `Lexend` par une autre police Google Fonts :

1. **Dans les fichiers HTML** :
```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice:wght@400;500;600;700&display=swap" rel="stylesheet">
```

2. **Dans `markdown.css`** :
```css
.md-content {
    font-family: 'VotrePolice', sans-serif;
}
```

**Polices recommandées pour l'accessibilité :**
- **Lexend** (actuelle) : Optimisée pour la lecture
- **Atkinson Hyperlegible** : Pour malvoyants
- **OpenDyslexic** : Spécifique dyslexie (moins esthétique)
- **Comic Sans MS** : Recommandée mais moins professionnelle

### Modifier les tailles de police

```css
.md-content {
    font-size: 1.125rem;  /* Texte de base (18px) */
}

.md-content h1 {
    font-size: 2.5rem;    /* 40px */
}

.md-content h2 {
    font-size: 2rem;      /* 32px */
}
```

---

## 🧪 Tests et validation

### 1. Tester localement

```bash
npm run dev
```

Accéder à :
- Template : `http://localhost:5173/dist/pages/md-template.html?doc=/dist/pages/content/md/correction-impression3d.md`
- Page dédiée : `http://localhost:5173/dist/pages/corrections/correction-impression3d.html`

### 2. Vérifier la sécurité

```bash
npm run security-check
```

**Score attendu :**
- JavaScript : 100% ✅
- Score global : 75%+ (headers HTTP manquants en local, normal)

**Points de contrôle :**
- ✅ Aucun `innerHTML` ou `outerHTML` dans le code
- ✅ Marked.js chargé depuis `/dist/js/libs/` (pas de CDN)
- ✅ Validation `if (!response.ok)` avant traitement
- ✅ Gestion d'erreurs avec `createErrorMessage()`

### 3. Valider l'accessibilité

**Points à vérifier :**
- Navigation au clavier dans la TOC fonctionne
- Attribut `aria-label` présent sur `<nav class="md-toc">`
- Contraste des couleurs suffisant (WCAG AA)
- Police lisible pour dyslexiques (Lexend)

---

## 📊 Checklist avant publication

- [ ] Fichier `.md` créé dans `dist/pages/content/md/`
- [ ] Structure Markdown conforme (h3 pour Activités, h4 pour Questions)
- [ ] Page HTML dédiée créée (ou utilisation du template)
- [ ] Lien ajouté à l'index `fiches_activites.html`
- [ ] Meta description personnalisée
- [ ] Tests locaux OK (`npm run dev`)
- [ ] Security check ≥ 75% (`npm run security-check`)
- [ ] Aucune erreur console JavaScript
- [ ] TOC générée correctement
- [ ] Ancres de navigation fonctionnelles
- [ ] Police Lexend chargée
- [ ] Commit et push vers GitHub

---

## 🚨 Problèmes courants

### La TOC ne s'affiche pas

**Cause :** Pas de titres `h3` dans le document Markdown

**Solution :** Vérifiez que vous utilisez bien `###` pour les Activités

### Les puces ne s'affichent pas

**Cause :** CSS manquant pour `list-style-type`

**Solution :** Vérifiez que `markdown.css` contient :
```css
.md-content ul > li {
    list-style-type: disc;
    display: list-item;
}
```

### Police Lexend non chargée

**Cause :** Lien Google Fonts manquant ou bloqué par CSP

**Solution :**
1. Vérifiez le `<link>` Google Fonts dans `<head>`
2. Vérifiez `netlify.toml` : `font-src 'self' https://fonts.gstatic.com`

### Fichier Markdown non trouvé

**Cause :** Chemin incorrect dans `fetch()`

**Solution :** Utilisez un chemin absolu depuis la racine :
```javascript
fetch('/dist/pages/content/md/mon-fichier.md')
```

### Encadrés "Compétence évaluée" non stylisés

**Cause :** Le paragraphe ne commence pas par du `**gras**`

**Solution :** Assurez-vous que le texte commence bien par `**Compétence évaluée :**`

---

## 📚 Ressources

### Documentation officielle

- **Marked.js** : https://marked.js.org/
- **DOMParser API** : https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
- **Google Fonts (Lexend)** : https://fonts.google.com/specimen/Lexend

### Fichiers clés du projet

- `.agent/rules/technodocs-project-rules.md` - Règles projet
- `.agent/workflows/technodocs-workflows-rules.md` - Workflows
- `docs/SECURITY.md` - Bonnes pratiques sécurité
- `netlify.toml` - Configuration headers CSP/HSTS

### Support

En cas de problème, consultez :
- Les logs console du navigateur (F12)
- Le fichier `docs/resume-md-template.md` (historique de la session)
- GitHub Issues : https://github.com/StimGlb/technodocs/issues

---

## 📝 Notes de version

**Version 1.0** (22 janvier 2026)
- ✅ Système de rendu Markdown opérationnel
- ✅ Table des matières automatique
- ✅ Style optimisé pour l'accessibilité (Lexend, fond papier)
- ✅ Sécurité renforcée (100% sans innerHTML)
- ✅ Marked.js localisé (v11.1.1)
- ✅ 2 pages de corrections créées (Impression 3D, Réparabilité)

---

*Documentation mise à jour le 22 janvier 2026 - TechnoDocs*
