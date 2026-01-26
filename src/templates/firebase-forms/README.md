# Template de Formulaire Firebase

Template réutilisable pour créer des formulaires HTML connectés à Firebase Firestore.

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Utilisation](#utilisation)
5. [Personnalisation](#personnalisation)
6. [Structure des fichiers](#structure-des-fichiers)
7. [Exemples](#exemples)
8. [FAQ](#faq)

---

## 🎯 Vue d'ensemble

Ce template fournit une base complète pour créer des formulaires d'activités pédagogiques avec :

- **Connexion Firebase** automatique
- **Validation** des champs obligatoires
- **Sauvegarde** dans Firestore
- **Export JSON** des données
- **Design responsive** et moderne
- **Messages de feedback** utilisateur
- **Confirmation** avant fermeture avec données non sauvegardées

---

## 📦 Installation

### Option 1 : Utilisation directe

1. Copiez le dossier `firebase-forms` dans votre projet
2. Modifiez `firebase-config.js` avec vos identifiants Firebase
3. Créez votre formulaire en copiant `firebase-form-template.html`

### Option 2 : Intégration dans un projet existant

```bash
# Copiez les fichiers dans votre structure
cp -r firebase-forms/ votre-projet/templates/
```

---

## ⚙️ Configuration

### 1. Configuration Firebase

Éditez `firebase-config.js` :

```javascript
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID"
};
```

**Où trouver ces informations ?**

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Cliquez sur ⚙️ > **Paramètres du projet**
4. Faites défiler jusqu'à **Vos applications**
5. Copiez la configuration

### 2. Configuration Firestore

Dans la console Firebase :

1. Accédez à **Firestore Database**
2. Créez une base de données
3. Définissez les règles de sécurité :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Exemple : autoriser l'écriture pour tous (à adapter selon vos besoins)
    match /{collection}/{document=**} {
      allow write: if true;
      allow read: if false; // Désactiver la lecture publique
    }
  }
}
```

⚠️ **Sécurité** : Adaptez ces règles selon vos besoins !

---

## 🚀 Utilisation

### Étape 1 : Créer votre formulaire

Copiez `firebase-form-template.html` et renommez-le :

```bash
cp firebase-form-template.html mon-formulaire.html
```

### Étape 2 : Personnaliser le contenu

Remplacez la section marquée `data-template="CUSTOM_CONTENT"` avec votre contenu :

```html
<div data-template="CUSTOM_CONTENT">
    <!-- Votre contenu ici -->
    <div class="section">
        <div class="section-title">
            📝 Ma section
        </div>

        <div class="form-group">
            <label>Ma question <span class="required">*</span></label>
            <textarea id="ma_question" required></textarea>
        </div>
    </div>
</div>
```

### Étape 3 : Configurer le formulaire

En bas du fichier HTML, modifiez la configuration :

```javascript
const formConfig = {
    // Nom de la collection Firestore
    collectionName: 'fiches_mon_activite',

    // Type de fiche
    ficheType: 'mon-activite',

    // Problématique
    problematique: 'Ma problématique',

    // Champs obligatoires
    requiredFields: [
        'prenom',
        'nom',
        'classe',
        'date',
        'ma_question'  // Ajoutez vos champs
    ],

    // Collecte des données personnalisées
    collectCustomData: function() {
        return {
            maQuestion: getFieldValue('ma_question')
            // Ajoutez vos champs personnalisés
        };
    },

    // Nom du fichier d'export
    exportFileName: function(data) {
        return `fiche-mon-activite-${data.nom || 'sans-nom'}.json`;
    }
};
```

### Étape 4 : Tester

Ouvrez votre formulaire dans un navigateur et testez :

1. ✅ Remplissez les champs
2. 💾 Cliquez sur "Enregistrer"
3. 🔍 Vérifiez dans Firestore Console que les données sont sauvegardées

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `firebase-form-styles.css` :

```css
/* Couleur principale */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Couleur des titres */
h1 {
    color: #2c3e50;
}

/* Couleur des sections */
.section {
    border-left: 5px solid #3498db;
}
```

### Ajouter des sections

Utilisez les classes CSS prédéfinies :

#### Section standard

```html
<div class="section">
    <div class="section-title">
        📝 Titre de la section
    </div>

    <div class="content-box">
        <h3>Sous-titre</h3>
        <p>Contenu...</p>
    </div>
</div>
```

#### Contenu en lecture seule

```html
<div class="read-only-content">
    <label>🔧 Titre</label>
    <p>Contenu informatif...</p>
</div>
```

#### Champ de formulaire

```html
<div class="form-group">
    <label>Ma question <span class="required">*</span></label>
    <textarea id="mon_champ" placeholder="Votre réponse..." required></textarea>
    <div class="help-text">Texte d'aide pour l'élève</div>
</div>
```

#### Tableau

```html
<table>
    <thead>
        <tr>
            <th>Colonne 1</th>
            <th>Colonne 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Donnée 1</td>
            <td>Donnée 2</td>
        </tr>
    </tbody>
</table>
```

---

## 📁 Structure des fichiers

```
firebase-forms/
├── README.md                      # Ce fichier
├── firebase-config.js             # Configuration Firebase
├── firebase-form-handler.js       # Logique réutilisable
├── firebase-form-styles.css       # Styles réutilisables
├── firebase-form-template.html    # Template de base
└── examples/
    └── example-machine-robot.html # Exemple complet
```

---

## 📚 Exemples

### Exemple complet

Voir `examples/example-machine-robot.html` pour un exemple complet basé sur le formulaire original "Machine vs Robot".

### Exemples de configuration

#### Formulaire simple

```javascript
const formConfig = {
    collectionName: 'questionnaires_simples',
    ficheType: 'questionnaire-simple',
    problematique: 'Questions simples',
    requiredFields: ['prenom', 'nom', 'classe', 'date', 'reponse1'],
    collectCustomData: function() {
        return {
            reponse1: getFieldValue('reponse1')
        };
    }
};
```

#### Formulaire complexe avec plusieurs champs

```javascript
const formConfig = {
    collectionName: 'fiches_complexes',
    ficheType: 'fiche-complexe',
    problematique: 'Problématique complexe',
    requiredFields: [
        'prenom', 'nom', 'classe', 'date',
        'question1', 'question2', 'question3'
    ],
    collectCustomData: function() {
        return {
            question1: getFieldValue('question1'),
            question2: getFieldValue('question2'),
            question3: getFieldValue('question3'),
            notePersonnelle: getFieldValue('note_personnelle') || 'Aucune'
        };
    },
    exportFileName: function(data) {
        const date = new Date().toISOString().split('T')[0];
        return `fiche-${data.classe}-${data.nom}-${date}.json`;
    }
};
```

---

## ❓ FAQ

### Comment ajouter un nouveau champ ?

1. Ajoutez le champ HTML :
```html
<div class="form-group">
    <label>Nouveau champ <span class="required">*</span></label>
    <input type="text" id="nouveau_champ" required>
</div>
```

2. Ajoutez l'ID dans `requiredFields` :
```javascript
requiredFields: ['prenom', 'nom', 'classe', 'date', 'nouveau_champ']
```

3. Collectez les données :
```javascript
collectCustomData: function() {
    return {
        nouveauChamp: getFieldValue('nouveau_champ')
    };
}
```

### Comment changer la collection Firestore ?

Modifiez `collectionName` dans la configuration :

```javascript
const formConfig = {
    collectionName: 'ma_nouvelle_collection',
    // ...
};
```

### Comment ajouter des images ?

Utilisez la zone d'upload prédéfinie ou ajoutez-en une nouvelle :

```html
<div class="upload-area" onclick="document.getElementById('mon_image').click()">
    <div class="upload-icon">📷</div>
    <p>Cliquez pour télécharger une image</p>
    <input type="file" id="mon_image" accept="image/*">
</div>
<img id="preview_mon_image" class="image-preview" style="display:none;">

<script>
document.getElementById('mon_image').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview_mon_image');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
</script>
```

### Comment personnaliser les messages ?

Modifiez les messages dans `firebase-form-handler.js` ou directement dans votre HTML :

```html
<div id="successMessage" class="success-message">
    ✅ Votre message personnalisé !
</div>
```

### Comment exporter en PDF ?

Ajoutez un bouton d'impression :

```html
<button type="button" onclick="window.print()" class="btn-action btn-pdf">
    📄 Imprimer / PDF
</button>
```

Le CSS d'impression est déjà configuré dans `firebase-form-styles.css`.

### Comment gérer plusieurs formulaires ?

Créez une copie du template pour chaque formulaire avec des configurations différentes :

```
mon-projet/
├── formulaire-activite1.html (collection: 'activite1')
├── formulaire-activite2.html (collection: 'activite2')
└── templates/
    └── firebase-forms/ (fichiers communs)
```

---

## 🔧 Fonctions utilitaires disponibles

### `getFieldValue(fieldId)`

Récupère la valeur d'un champ :

```javascript
const prenom = getFieldValue('prenom');
```

### `validateField(fieldId, fieldName)`

Valide qu'un champ n'est pas vide :

```javascript
if (!validateField('prenom', 'Prénom')) {
    return; // Arrête l'exécution
}
```

### `showMessage(type, message)`

Affiche un message :

```javascript
showMessage('success', 'Données enregistrées !');
showMessage('error', 'Une erreur est survenue');
```

### `hideMessages()`

Cache tous les messages :

```javascript
hideMessages();
```

---

## 📞 Support

Pour toute question ou problème :

1. Consultez la [documentation Firebase](https://firebase.google.com/docs/firestore)
2. Vérifiez les logs de la console navigateur (F12)
3. Vérifiez les règles Firestore dans la console Firebase

---

## 📝 Licence

Ce template est fourni tel quel pour une utilisation éducative.

---

## 🎓 Crédits

Template créé pour faciliter la création de fiches d'activités pédagogiques avec sauvegarde Firebase.

**Version** : 1.0.0
**Dernière mise à jour** : Janvier 2026
