# Exécution — Corrections et améliorations print fiches d'activité

## Contexte

Tu as produit un excellent audit. Voici les items validés pour implémentation immédiate. Exécute-les tous dans cette session. L'ordre de traitement est important pour éviter les conflits.

---

## Ordre d'exécution

### Phase 1 — Nettoyage (A1, A2, A3)

Commencer par le nettoyage pour partir d'une base propre.

#### A1 — Fusionner la double définition `.zone-reponse` dans `activite.css`

- Supprimer la 1ère définition (code mort, ~ligne 19)
- Conserver la 2ème définition comme référence unique
- S'assurer que le résultat final contient :

```css
.zone-reponse {
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 60px;
    margin: 0.75rem 0;
    padding: 0.5rem;        /* ← ajouter — était perdu */
    background: #fafafa;
}
```

- Vérifier que `.zone-reponse--medium` (100px) et `.zone-reponse--large` (150px) n'ont qu'une seule définition chacune
- Supprimer aussi tout doublon de `.zone-reponse--large` (160px vs 150px → garder 150px)

#### A2 — Supprimer le bloc legacy `.fiche-identite`

**Dans `template-activite.html`** :
- Supprimer entièrement le `<div class="fiche-identite ...">` et tout son contenu

**Dans `activite.css`** :
- Supprimer la règle `.fiche-identite { display: none; }`

**Dans `print.css`** :
- Supprimer la règle `.fiche-identite { display: none !important; }`

#### A3 — Supprimer le style inline dans `exemple-activite.md`

Remplacer :
```html
<div class="zone-reponse zone-reponse--lignes" style="min-height: 80px;"></div>
```
Par :
```html
<div class="zone-reponse zone-reponse--medium zone-reponse--lignes"></div>
```

Le `--medium` (100px écran / 45mm print) est plus approprié qu'un 80px arbitraire pour une réponse de 3 parties à identifier.

---

### Phase 2 — Améliorations print.css (B1, B2, B3, B4, B6)

Toutes ces modifications sont dans `css/print.css`, à l'intérieur du `@media print`.

#### B1 — Ajouter padding aux zones de réponse

Modifier la règle `.zone-reponse` existante dans la section 5 :

```css
.zone-reponse {
    min-height: 30mm !important;
    margin: 2mm 0 !important;
    padding: 2mm 3mm !important;       /* ← ajouter */
    border: 0.5pt solid #bbb !important;
    background: #fff !important;
}
```

#### B2 — Ajouter h4 à la typographie print

Dans la section 6, après la règle `.md-content h3`, ajouter :

```css
.md-content h4 {
    font-size: 10pt !important;
    font-weight: 600;
    margin: 1.5mm 0 1mm 0 !important;
    page-break-after: avoid;
}
```

#### B3 — Supprimer la redondance border-color

Supprimer le bloc en fin de section 6 :

```css
/* SUPPRIMER ce bloc entier — redondant avec section 5 */
/* Bordures restaurées (après reset *) */
.fiche-ost,
.fiche-activite,
.fiche-conclusion {
    border-color: #999 !important;
}

.zone-reponse {
    border-color: #bbb !important;
}

.zone-illustration {
    border-color: #aaa !important;
}
```

#### B4 — Séparateur entre print-header et contenu

Modifier la règle `.print-header` dans la section 3 :

```css
.print-header {
    display: block !important;
    margin-bottom: 5mm;                /* ← augmenté de 3mm à 5mm */
    border: 1pt solid #333 !important;
}
```

#### B6 — min-height sur le bandeau central

Modifier `.print-header__bandeau` dans la section 3 :

```css
.print-header__bandeau {
    display: flex;
    align-items: center;
    min-height: 12mm;                  /* ← ajouter */
    border-bottom: 0.5pt solid #999 !important;
    background: #f0f0f0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}
```

---

### Phase 3 — Amélioration écran activite.css (B5)

#### B5 — Fond `.fiche-travail` compatible dark theme

Remplacer dans `activite.css` :

```css
/* AVANT */
.fiche-travail {
    background: var(--accent-bg, #e8f0fe);
}
```

Par :

```css
/* APRÈS — compatible dark/light theme */
.fiche-travail {
    background: var(--bg-subtle, rgba(255, 255, 255, 0.06));
}
```

Le `rgba(255, 255, 255, 0.06)` est un fallback qui fonctionne sur fond sombre (léger éclaircissement) et sur fond clair (quasi invisible, le fond de la page prend le relais). Si `--bg-subtle` est déjà défini dans le dark theme, c'est encore mieux.

Vérifier visuellement que le bloc "Travail demandé" se distingue du reste sans créer de conflit de contraste.

---

### Phase 4 — Nouvelles fonctionnalités (C1, C3)

#### C1 — Numérotation des pages

Ajouter dans `print.css`, **après** le bloc `@page` existant dans la section 4 :

```css
@page {
    size: A4 portrait;
    margin: 10mm;

    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-size: 7pt;
        color: #999;
    }
}
```

Note : fusionner avec le `@page` existant s'il y en a déjà un. Il ne peut y avoir qu'un seul bloc `@page` non qualifié.

> Progressive enhancement : fonctionne dans Chrome, pas dans Firefox. Acceptable.

#### C3 — Responsive mobile layout deux colonnes

Ajouter dans `activite.css`, **en fin de fichier** :

```css
/* ── Responsive : colonnes → empilé sur tablette/mobile ── */
@media (max-width: 768px) {
    .fiche-deux-colonnes {
        flex-direction: column;
    }

    .fiche-deux-colonnes__droite {
        order: -1;              /* illustration au-dessus des consignes sur mobile */
        margin-bottom: 0.75rem;
    }
}
```

Le `order: -1` place l'illustration au-dessus des consignes sur mobile — l'élève voit d'abord le schéma/photo avant de lire les questions. Si ce n'est pas le comportement souhaité, retirer cette ligne.

---

## Fichiers modifiés (récapitulatif)

| Fichier | Modifications |
|---------|--------------|
| `css/activite.css` | A1 (fusion zone-reponse), A2 (suppression .fiche-identite), B5 (fond fiche-travail), C3 (responsive) |
| `css/print.css` | A2 (suppression .fiche-identite), B1 (padding zones), B2 (h4), B3 (suppression redondance), B4 (séparateur), B6 (min-height bandeau), C1 (numérotation pages) |
| `pages/activites/template-activite.html` | A2 (suppression bloc .fiche-identite) |
| `content/md/activites/exemple-activite.md` | A3 (suppression style inline) |

---

## Validation

Après toutes les modifications, vérifier :

### Écran (dark theme)
- [ ] Le bandeau meta est visible avec toutes ses valeurs
- [ ] Le print-header est invisible
- [ ] Le hero est visible
- [ ] Le bloc "Travail demandé" a un fond subtil lisible sur dark theme
- [ ] Les zones de réponse ont un padding visible
- [ ] Sur mobile (DevTools → responsive 768px) : les deux colonnes s'empilent

### Print (Ctrl+P Chrome)
- [ ] Le print-header est visible avec les 3 rangées bien structurées
- [ ] Le bandeau central a une hauteur minimale stable (12mm)
- [ ] L'espacement entre le header et le contenu est suffisant (~5mm)
- [ ] Les zones de réponse ont un padding intérieur (le texte ne colle pas à la bordure)
- [ ] La numérotation "1 / 2" apparaît en bas à droite
- [ ] La fiche tient sur 2 pages A4
- [ ] Pas de titre orphelin en bas de page
- [ ] Pas de bloc `.fiche-identite` fantôme

### Régression
- [ ] Les fiches de révision (`pages/revisions/`) s'affichent correctement à l'écran
- [ ] Les fiches de révision s'impriment correctement (pas de numérotation parasite ni de header print)

---

## Ce qu'on ne fait PAS dans cette session

- C2 (header compact page 2) — reporté, nécessite des tests `position: fixed` en print
- C4 (corrigé enseignant) — scope séparé, effort élevé
- Tout refactoring non listé ci-dessus
