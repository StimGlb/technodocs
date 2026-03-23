# Guide de rédaction — Fiches d'activité Markdown

## Structure type

Chaque fiche `.md` suit cette structure :

1. **Bandeau OST + Problématique** → `<div class="fiche-ost">`
2. **Travail demandé** → `<div class="fiche-travail">`
3. **Activités numérotées** → `<div class="fiche-activite">` (autant que nécessaire)
4. **Conclusion** → `<div class="fiche-conclusion">`

## Classes CSS disponibles

### Zones de réponse — Print (espaces vides pour écriture au stylo)

Ces zones sont destinées à l'**impression papier**. Elles apparaissent comme des espaces
vides lignés ou non, où l'élève écrit au stylo.

| Classe                   | Hauteur écran  | Hauteur print  | Usage                                  |
| ------------------------ | -------------- | -------------- | -------------------------------------- |
| `.zone-reponse`          | 60px           | 25mm           | Réponse courte (1-2 lignes)            |
| `.zone-reponse--compact` | 40px           | 18mm           | Très courte, compactage 2 pages        |
| `.zone-reponse--medium`  | 100px          | 40mm           | Réponse moyenne (3-5 lignes)           |
| `.zone-reponse--large`   | 150px          | 55mm           | Réponse longue, schéma, collage        |
| `.zone-reponse--fill`    | flex-grow      | 30mm min       | Remplit l'espace restant (fin de page) |
| `.zone-reponse--lignes`  | (modificateur) | (modificateur) | Ajoute des lignes d'écriture           |

Combinaison possible : `<div class="zone-reponse zone-reponse--medium zone-reponse--lignes"></div>`

Hauteur personnalisée via style inline : `style="min-height: 80px;"` (écran uniquement).

### Zones de réponse — Interactives (champs wizard pour saisie en ligne)

Ces champs utilisent le **système wizard** (`wizard.css`) et permettent à l'élève de
répondre directement à l'écran. Chaque champ **doit** porter un attribut `data-field`
unique qui sert d'identifiant pour la collecte et la sauvegarde des données.

> **Règle HTML inline** : laisser une ligne vide avant et après chaque bloc HTML dans le Markdown.

#### Champ texte court

```html
<div class="wizard__group">
  <label class="wizard__label required">Question posée à l'élève</label>
  <p class="wizard__hint">Aide contextuelle ou exemple attendu</p>
  <input
    type="text"
    class="wizard__input"
    data-field="nom-unique-du-champ"
    placeholder="Ex: ..."
    spellcheck="true"
    lang="fr"
  />
</div>
```

#### Champ texte long (textarea)

```html
<div class="wizard__group">
  <label class="wizard__label required">Question ouverte</label>
  <p class="wizard__hint">Aide contextuelle</p>
  <textarea
    class="wizard__textarea"
    data-field="nom-unique-du-champ"
    placeholder="Ex: ..."
    spellcheck="true"
    lang="fr"
    autocorrect="on"
    autocapitalize="sentences"
  ></textarea>
</div>
```

#### Liste déroulante (select)

```html
<div class="wizard__group">
  <label class="wizard__label required">Question à choix unique</label>
  <select class="wizard__input" data-field="nom-unique-du-champ">
    <option value="">— Sélectionner —</option>
    <option value="option-a">Option A</option>
    <option value="option-b">Option B</option>
  </select>
</div>
```

#### Cases à cocher (checkbox — choix multiples)

```html
<div class="wizard__group">
  <label class="wizard__label">Quels éléments sont concernés ?</label>
  <div class="wizard__checkbox-group">
    <label class="wizard__checkbox-item">
      <input type="checkbox" data-field="choix-a" />
      <span class="wizard__checkbox-label">🔹 Choix A</span>
    </label>
    <label class="wizard__checkbox-item">
      <input type="checkbox" data-field="choix-b" />
      <span class="wizard__checkbox-label">🔹 Choix B</span>
    </label>
  </div>
</div>
```

#### Boutons radio (radio — choix unique)

```html
<div class="wizard__group">
  <label class="wizard__label required">Quel est le bon résultat ?</label>
  <div class="wizard__checkbox-group">
    <label class="wizard__checkbox-item">
      <input
        type="radio"
        name="nom-du-groupe"
        data-field="nom-du-groupe"
        value="valeur-a"
      />
      <span class="wizard__checkbox-label">✨ Réponse A</span>
    </label>
    <label class="wizard__checkbox-item">
      <input
        type="radio"
        name="nom-du-groupe"
        data-field="nom-du-groupe"
        value="valeur-b"
      />
      <span class="wizard__checkbox-label">🔺 Réponse B</span>
    </label>
  </div>
</div>
```

#### Boîte conseil (tips)

```html
<div class="wizard__tips">
  <p class="wizard__tips-title">💡 Conseil</p>
  <div class="wizard__tips-content">
    <p>Texte d'aide ou rappel de cours utile pour cette question.</p>
  </div>
</div>
```

#### Boîte IA (zone de collage autorisée)

```html
<div class="wizard__ai-box">
  <p><strong>🤖 Aide IA :</strong> Consigne pour utiliser un outil IA</p>
  <textarea
    class="wizard__textarea"
    data-field="ai-prompt-nom"
    placeholder="Colle ici la réponse de l'IA..."
  ></textarea>
</div>
```

#### Résumé des classes wizard réutilisables

| Classe                    | Rôle                                                    |
| ------------------------- | ------------------------------------------------------- |
| `.wizard__group`          | Conteneur d'un champ (espacement vertical automatique)  |
| `.wizard__label`          | Libellé de la question                                  |
| `.wizard__label.required` | Ajoute un `*` rouge (champ obligatoire)                 |
| `.wizard__hint`           | Sous-texte d'aide (gris, plus petit)                    |
| `.wizard__input`          | Input texte ou select (largeur 100 %, focus bleu)       |
| `.wizard__textarea`       | Zone de texte multiligne (min 120 px, redimensionnable) |
| `.wizard__checkbox-group` | Conteneur flex pour checkboxes ou radios                |
| `.wizard__checkbox-item`  | Wrappeur individuel checkbox/radio (hover + checked)    |
| `.wizard__checkbox-label` | Label cliquable à côté du checkbox/radio                |
| `.wizard__tips`           | Encadré info/conseil (bordure orange)                   |
| `.wizard__ai-box`         | Encadré bleu pour prompt/réponse IA                     |

#### Convention `data-field`

- Utiliser des noms **kebab-case** : `fonction-principale`, `materiau-choisi`
- Chaque `data-field` doit être **unique dans la page entière**
- Pour les radios, le `data-field` et le `name` partagent la même valeur
- Pour les checkboxes, chaque case a son propre `data-field`

### Mode dual : Print + Interactif

Pour une fiche qui fonctionne **à la fois en impression et en saisie numérique**,
combiner les deux systèmes dans le même bloc `.fiche-activite` :

```html
<div class="fiche-activite">
  **1.** Décris le problème que ton objet doit résoudre.

  <!-- Version interactive (masquée à l'impression via .print-hide) -->
  <div class="wizard__group print-hide">
    <textarea
      class="wizard__textarea"
      data-field="probleme"
      placeholder="Décris le problème ici..."
      spellcheck="true"
      lang="fr"
    ></textarea>
  </div>

  <!-- Version papier (masquée à l'écran via .screen-hide) -->
  <div
    class="zone-reponse zone-reponse--medium zone-reponse--lignes screen-hide"
  ></div>
</div>
```

| Classe utilitaire | Effet                                                               |
| ----------------- | ------------------------------------------------------------------- |
| `.print-hide`     | Masque l'élément à l'impression (`display: none` en `@media print`) |
| `.screen-hide`    | Masque l'élément à l'écran, visible uniquement à l'impression       |

> **Astuce** : si la fiche est **exclusivement numérique** (pas de version papier),
> utiliser uniquement les champs wizard sans doublons `zone-reponse`.

### Layout deux colonnes

```html
<div class="fiche-deux-colonnes">
  <div class="fiche-deux-colonnes__gauche">
    <!-- Consignes et zones de réponse (60%) -->
  </div>
  <div class="fiche-deux-colonnes__droite">
    <!-- Illustration ou schéma (40%) -->
    <div class="zone-illustration">(description de l'image attendue)</div>
  </div>
</div>
```

### Indicateur travail sur ordinateur

`<span class="fiche-ordi">Sur ordinateur</span>` — affiche un badge 💻 pour signaler
que l'activité se fait sur un poste informatique.

### Encadré prise de notes (fin de fiche)

```html
<div class="fiche-notes">
  <div class="fiche-notes__titre">Notes</div>
  <div class="zone-reponse zone-reponse--fill zone-reponse--lignes"></div>
</div>
```

À placer en fin de fiche. L'espace s'adapte à la place restante sur la dernière page.

### Saut de page (impression)

`<div class="page-break"></div>` — force un saut de page entre deux activités si la fiche
dépasse une page A4.

## Bonnes pratiques

### Rédaction Markdown

- **Numéroter les consignes** en Markdown : `**1.** Texte de la consigne`
- **Cases à cocher statiques** (print) : utiliser `- ☐ Option` (caractère Unicode ☐ U+2610)
- **Phrases à trous** (print) : utiliser `\_\_\_\_\_\_\_\_\_\_\_\_\_\_`
- **Tableaux** : Markdown standard, supporté par Marked.js
- **Images** : `![alt](chemin)` — chemins relatifs depuis la racine du site
- **HTML inline** : toujours laisser une ligne vide avant et après un bloc HTML
- **Ne pas imbriquer** les blocs `.fiche-activite` les uns dans les autres

### Champs interactifs (wizard)

- **`data-field` obligatoire** sur chaque `<input>`, `<textarea>`, `<select>` et `<input type="checkbox/radio">`
- **Noms kebab-case** : `fonction-principale`, pas `fonctionPrincipale`
- **Unicité** : chaque `data-field` doit être unique dans toute la page
- **`spellcheck="true" lang="fr"`** sur les champs texte pour activer la correction
- **`placeholder`** : toujours fournir un exemple concret (`Ex: Support de téléphone...`)
- **`.required`** sur le `<label>` uniquement si le champ est listé dans `requiredFields` du wizard
- **Radios** : `name` et `data-field` identiques ; chaque `<input>` a une `value` distincte
- **Checkboxes** : chaque case a son propre `data-field` (valeur booléenne `true`/`false`)

### Choix du mode

| Contexte                             | Quoi utiliser                                                       |
| ------------------------------------ | ------------------------------------------------------------------- |
| Fiche **papier uniquement**          | `.zone-reponse` + cases `☐`                                         |
| Fiche **numérique uniquement**       | Champs `.wizard__*` + `data-field`                                  |
| Fiche **duale** (papier + numérique) | Doubler : `.wizard__group.print-hide` + `.zone-reponse.screen-hide` |
