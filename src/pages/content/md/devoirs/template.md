# 📝 Template - Questions Cahier des Charges

Ce template définit les questions à poser aux élèves pour leur projet de conception 3D.

---

## 🔧 Métadonnées du formulaire

```yaml
formulaire:
  id: "cahier-charges-v1"
  titre: "Mon Cahier des Charges"
  description: "Définis les caractéristiques de ton objet technique"
  storage: "localStorage"  # ou "firebase" si activé
  niveau: "cycle4"         # 5eme, 4eme, 3eme
```

---

## 📋 Structure des questions

Chaque question suit ce format :

```yaml
question:
  id: "identifiant-unique"
  type: "text | textarea | select | radio | checkbox | number"
  label: "Texte de la question"
  placeholder: "Exemple de réponse..."
  required: true | false
  help: "Aide contextuelle (optionnel)"
  options: []  # Pour select/radio/checkbox uniquement
  validation:
    min: 0
    max: 100
    pattern: "regex"
```

---

## 🎯 Questions du Cahier des Charges

### Section 1 : Identification du projet

```yaml
- id: "nom-projet"
  type: "text"
  label: "Quel est le nom de ton projet ?"
  placeholder: "Ex: Support de téléphone, Pot à crayons..."
  required: true
  help: "Choisis un nom court et descriptif"

- id: "auteur"
  type: "text"
  label: "Ton prénom et la première lettre de ton nom"
  placeholder: "Ex: Thomas D."
  required: true

- id: "classe"
  type: "select"
  label: "Ta classe"
  required: true
  options:
    - "5ème 5"
    - "5ème 6"
    - "5ème 7"
    - "4ème 1"
    - "4ème 2"
    - "4ème 3"
    - "4ème 4"
    - "4ème 5"
    - "3ème 2"
    - "3ème 3"
    - "3ème 4"
    - "3ème 5"
    - "3ème 6"
```

---

### Section 2 : Analyse du besoin

```yaml
- id: "probleme"
  type: "textarea"
  label: "Quel problème ton objet doit-il résoudre ?"
  placeholder: "Ex: Mon téléphone tombe souvent de mon bureau..."
  required: true
  help: "Décris la situation qui t'a donné l'idée de ce projet"
  validation:
    min: 20  # caractères minimum

- id: "utilisateur"
  type: "text"
  label: "Pour qui est destiné cet objet ?"
  placeholder: "Ex: Pour moi, pour ma famille, pour les élèves..."
  required: true

- id: "lieu-utilisation"
  type: "text"
  label: "Où sera utilisé cet objet ?"
  placeholder: "Ex: Sur un bureau, dans une salle de bain..."
  required: true

- id: "frequence"
  type: "select"
  label: "À quelle fréquence sera-t-il utilisé ?"
  required: true
  options:
    - "Tous les jours"
    - "Plusieurs fois par semaine"
    - "Occasionnellement"
    - "Rarement"
```

---

### Section 3 : Fonctions de l'objet

```yaml
- id: "fonction-principale"
  type: "textarea"
  label: "Quelle est la fonction principale de ton objet ?"
  placeholder: "Ex: Maintenir mon téléphone en position verticale"
  required: true
  help: "Commence par un verbe d'action : maintenir, ranger, protéger..."

- id: "fonctions-secondaires"
  type: "textarea"
  label: "Quelles sont les fonctions secondaires (optionnelles) ?"
  placeholder: "Ex: Permettre de charger le téléphone, avoir un espace pour les câbles..."
  required: false
  help: "Ce sont les fonctions 'bonus' qui améliorent l'objet"
```

---

### Section 4 : Contraintes techniques

```yaml
- id: "dimensions-max"
  type: "text"
  label: "Quelles sont les dimensions maximales souhaitées ?"
  placeholder: "Ex: 10 cm x 8 cm x 5 cm"
  required: true
  help: "Pense à la place disponible et aux limites de l'imprimante 3D (15x15x15 cm max)"

- id: "materiau"
  type: "select"
  label: "Quel matériau sera utilisé ?"
  required: true
  options:
    - "PLA (plastique standard)"
    - "PETG (plus résistant)"
    - "Autre (à préciser)"

- id: "couleur"
  type: "select"
  label: "Quelle couleur préfères-tu ?"
  required: false
  options:
    - "Blanc"
    - "Noir"
    - "Bleu"
    - "Rouge"
    - "Vert"
    - "Orange"
    - "Peu importe"

- id: "resistance"
  type: "checkbox"
  label: "Quelles résistances sont nécessaires ?"
  required: false
  options:
    - "Résistant aux chocs"
    - "Résistant à l'eau"
    - "Résistant à la chaleur"
    - "Flexible"
    - "Rigide"
```

---

### Section 5 : Contraintes esthétiques

```yaml
- id: "style"
  type: "radio"
  label: "Quel style souhaites-tu pour ton objet ?"
  required: true
  options:
    - "Minimaliste (formes simples)"
    - "Géométrique (angles, motifs)"
    - "Organique (courbes, naturel)"
    - "Personnalisé (avec texte/logo)"

- id: "personnalisation"
  type: "text"
  label: "Souhaites-tu ajouter un texte ou un motif ?"
  placeholder: "Ex: Mon prénom, un logo, un emoji..."
  required: false
```

---

### Section 6 : Contraintes de fabrication

```yaml
- id: "temps-impression"
  type: "select"
  label: "Combien de temps maximum pour l'impression ?"
  required: true
  options:
    - "Moins de 2 heures"
    - "2 à 4 heures"
    - "4 à 8 heures"
    - "Plus de 8 heures"
  help: "Plus l'objet est grand/détaillé, plus c'est long"

- id: "assemblage"
  type: "radio"
  label: "Ton objet sera-t-il en une seule pièce ?"
  required: true
  options:
    - "Oui, une seule pièce"
    - "Non, plusieurs pièces à assembler"

- id: "support-impression"
  type: "radio"
  label: "Acceptes-tu d'utiliser des supports d'impression ?"
  required: true
  options:
    - "Oui"
    - "Non, je préfère éviter"
    - "Je ne sais pas"
  help: "Les supports permettent d'imprimer des formes complexes mais demandent plus de travail de finition"
```

---

### Section 7 : Critères de validation

```yaml
- id: "criteres-reussite"
  type: "checkbox"
  label: "Comment sauras-tu que ton projet est réussi ?"
  required: true
  options:
    - "L'objet remplit sa fonction principale"
    - "Les dimensions correspondent au cahier des charges"
    - "L'objet est esthétiquement satisfaisant"
    - "L'impression s'est déroulée sans problème"
    - "L'objet est solide et durable"

- id: "ameliorations"
  type: "textarea"
  label: "Quelles améliorations envisages-tu pour une version 2 ?"
  placeholder: "Ex: Ajouter un compartiment, changer les proportions..."
  required: false
```

---

## 🚀 Utilisation

### Pour ajouter une nouvelle question :

1. Copier un bloc `yaml` existant
2. Modifier l'`id` (unique, en minuscules avec tirets)
3. Adapter le `type`, `label`, `placeholder`
4. Définir si `required: true` ou `false`
5. Ajouter des `options` si type select/radio/checkbox

### Types de champs disponibles :

| Type | Usage | Exemple |
|------|-------|---------|
| `text` | Réponse courte | Nom du projet |
| `textarea` | Réponse longue | Description du problème |
| `select` | Liste déroulante | Choix de classe |
| `radio` | Choix unique | Oui/Non |
| `checkbox` | Choix multiples | Résistances nécessaires |
| `number` | Valeur numérique | Dimensions en cm |

---

## 📁 Export des données

Le formulaire génère un objet JSON :

```json
{
  "metadata": {
    "id": "cahier-charges-v1",
    "date": "2026-02-03T10:30:00",
    "classe": "5ème 6"
  },
  "reponses": {
    "nom-projet": "Support téléphone",
    "probleme": "Mon téléphone tombe...",
    "fonction-principale": "Maintenir le téléphone...",
    ...
  }
}
```

---

*Template TechnoDocs - Cahier des Charges v1.0*