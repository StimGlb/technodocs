# Guide de rédaction — Fiches d'activité Markdown

## Structure type

Chaque fiche `.md` suit cette structure :

1. **Bandeau OST + Problématique** → `<div class="fiche-ost">`
2. **Travail demandé** → `<div class="fiche-travail">`
3. **Activités numérotées** → `<div class="fiche-activite">` (autant que nécessaire)
4. **Conclusion** → `<div class="fiche-conclusion">`

## Classes CSS disponibles

### Zones de réponse (espaces vides pour écriture au stylo)

| Classe | Hauteur écran | Hauteur print | Usage |
|--------|--------------|---------------|-------|
| `.zone-reponse` | 60px | 25mm | Réponse courte (1-2 lignes) |
| `.zone-reponse--compact` | 40px | 18mm | Très courte, compactage 2 pages |
| `.zone-reponse--medium` | 100px | 40mm | Réponse moyenne (3-5 lignes) |
| `.zone-reponse--large` | 150px | 55mm | Réponse longue, schéma, collage |
| `.zone-reponse--fill` | flex-grow | 30mm min | Remplit l'espace restant (fin de page) |
| `.zone-reponse--lignes` | (modificateur) | (modificateur) | Ajoute des lignes d'écriture |

Combinaison possible : `<div class="zone-reponse zone-reponse--medium zone-reponse--lignes"></div>`

Hauteur personnalisée via style inline : `style="min-height: 80px;"` (écran uniquement).

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

- **Numéroter les consignes** en Markdown : `**1.** Texte de la consigne`
- **Cases à cocher** : utiliser `- ☐ Option` (caractère Unicode ☐ U+2610)
- **Phrases à trous** : utiliser `\_\_\_\_\_\_\_\_\_\_\_\_\_\_`
- **Tableaux** : Markdown standard, supporté par Marked.js
- **Images** : `![alt](chemin)` — chemins relatifs depuis la racine du site
- **HTML inline** : toujours laisser une ligne vide avant et après un bloc HTML
- **Ne pas imbriquer** les blocs `.fiche-activite` les uns dans les autres
