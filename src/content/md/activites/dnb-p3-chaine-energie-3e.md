---
titre: "DNB Habitat et énergie — Phase 3 : Chaîne d'énergie (3ème)"
sequence: habitat-energie
type: wizard-phase
wizard_phase: 3
wizard_fichiers:
  - 3e-habitat-energie.html
niveau: 3eme
competences:
  - SFC 11
data_fields:
  - energie-entree
  - energie-utile
  - energie-perdue
  - rendement-calcul-3e
statut: brouillon
tags:
  - techno/3eme
  - techno/dnb
  - techno/chaine-energie
date: "{{date}}"
---

# Phase 3 — Chaîne d'énergie *(version 3ème)*

> **Pour le Lead Dev**
> Ce fichier est exclusif à `3e-habitat-energie.html`.
> Le pendant 4ème est `dnb-p3-chaine-energie-4e.md`.
> `requiredFields` phase 3 : `energie-entree`, `energie-utile`,
> `energie-perdue`, `rendement-calcul-3e`.
> Seul `rendement-calcul-3e` diffère du fichier 4ème — les trois
> premiers `data-field` sont identiques.

---

<div class="fiche-ost">

## ⚡ Comprendre les transformations d'énergie

Une ampoule ne produit pas que de la lumière. Pour comprendre pourquoi certaines
ampoules consomment moins que d'autres, il faut analyser comment elles
transforment l'énergie électrique — c'est la **chaîne d'énergie**.

</div>

---

<div class="fiche-travail">

## Document 4 — Schéma bloc d'une ampoule

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────────────┐
│   ALIMENTATION  │       │   CONVERTISSEUR   │       │   ÉNERGIE PRODUITE  │
│                 │──────▶│                  │──────▶│                     │
│ Énergie         │       │  (filament ou    │       │  Utile :            │
│ électrique      │       │   diode LED)     │       │  → Lumineuse        │
│                 │       │                  │       │                     │
└─────────────────┘       └──────────────────┘       │  Perdue :           │
                                                      │  → Thermique        │
                                                      └─────────────────────┘
```

## Document 5 — Données de performance

| | Ampoule incandescente | Ampoule LED |
|---|---|---|
| Puissance absorbée | 60 W | 9 W |
| Puissance lumineuse produite | 6 W | 7,2 W |
| Puissance thermique dissipée | 54 W | 1,8 W |

> **Rappel :** Rendement (%) = (Puissance utile ÷ Puissance absorbée) × 100

</div>

---

<div class="fiche-activite">

## Question 1 — Identifier les formes d'énergie

<div class="wizard__group">
  <label class="wizard__label required">Dans la chaîne d'énergie d'une ampoule, quelle est la forme d'énergie en entrée ?</label>
  <input
    type="text"
    class="wizard__input"
    data-field="energie-entree"
    placeholder="Ex: Énergie électrique"
    spellcheck="true"
    lang="fr"
  />
</div>

<div class="wizard__group">
  <label class="wizard__label required">Quelle est la forme d'énergie utile produite par une ampoule ?</label>
  <input
    type="text"
    class="wizard__input"
    data-field="energie-utile"
    placeholder="Ex: Énergie lumineuse"
    spellcheck="true"
    lang="fr"
  />
</div>

<div class="wizard__group">
  <label class="wizard__label required">Quelle est la forme d'énergie perdue ?</label>
  <input
    type="text"
    class="wizard__input"
    data-field="energie-perdue"
    placeholder="Ex: Énergie thermique (chaleur)"
    spellcheck="true"
    lang="fr"
  />
</div>

</div>

---

<div class="fiche-activite">

## Question 2 — Élaborer le schéma bloc et analyser

<div class="wizard__tips">
  <p class="wizard__tips-title">💡 Rappel</p>
  <div class="wizard__tips-content">
    <p>Rendement (%) = (Puissance utile ÷ Puissance absorbée) × 100</p>
    <p>En 3ème, tu dois aussi être capable d'élaborer toi-même un schéma
    bloc à partir des données fournies.</p>
  </div>
</div>

<div class="wizard__group">
  <label class="wizard__label required">Calcule le rendement des deux ampoules, puis explique en quoi la différence de rendement se traduit concrètement dans la chaîne d'énergie. Indique quelle forme d'énergie est valorisée et laquelle est gaspillée dans chaque cas.</label>
  <p class="wizard__hint">
    Calcul rendement incandescente → calcul rendement LED → comparaison →
    lien avec les flux d'énergie utile et perdue dans chaque chaîne.
  </p>
  <textarea
    class="wizard__textarea"
    data-field="rendement-calcul-3e"
    placeholder="Incandescente : (6 ÷ 60) × 100 = 10 % → 90 % de l'énergie est perdue sous forme de chaleur.&#10;LED : (7,2 ÷ 9) × 100 = 80 % → seulement 20 % est perdu...&#10;Dans la chaîne d'énergie, cela signifie que..."
    spellcheck="true"
    lang="fr"
    autocorrect="on"
    autocapitalize="sentences"
  ></textarea>
</div>

</div>

---

<div class="fiche-conclusion">

Tu sais maintenant élaborer et analyser une chaîne d'énergie en lien avec
les données de performance d'un OST. Dans la phase suivante, tu vas analyser
la chaîne d'information du détecteur de présence installé par les Kiagi.

</div>