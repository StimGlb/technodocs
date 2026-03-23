---
titre: "DNB Habitat et énergie — Phase 3 : Chaîne d'énergie (4ème)"
sequence: habitat-energie
type: wizard-phase
wizard_phase: 3
wizard_fichiers:
  - 4e-habitat-energie.html
niveau: 4eme
competences:
  - SFC 11
data_fields:
  - energie-entree
  - energie-utile
  - energie-perdue
  - rendement-calcul-4e
statut: brouillon
tags:
  - techno/4eme
  - techno/dnb
  - techno/chaine-energie
date: "{{date}}"
---

# Phase 3 — Chaîne d'énergie *(version 4ème)*

> **Pour le Lead Dev**
> Ce fichier est exclusif à `4e-habitat-energie.html`.
> Le pendant 3ème est `dnb-p3-chaine-energie-3e.md`.
> `requiredFields` phase 3 : `energie-entree`, `energie-utile`,
> `energie-perdue`, `rendement-calcul-4e`.

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

## Question 2 — Calculer et comparer les rendements

<div class="wizard__tips">
  <p class="wizard__tips-title">💡 Rappel</p>
  <div class="wizard__tips-content">
    <p>Rendement (%) = (Puissance utile ÷ Puissance absorbée) × 100</p>
    <p>Un rendement élevé signifie que l'appareil perd peu d'énergie.</p>
  </div>
</div>

<div class="wizard__group">
  <label class="wizard__label required">Calcule le rendement de l'ampoule incandescente et celui de l'ampoule LED. Montre tes calculs et indique quelle ampoule est la plus efficace.</label>
  <p class="wizard__hint">
    Incandescente : (6 ÷ 60) × 100 = ? %
    LED : (7,2 ÷ 9) × 100 = ? %
    Conclure en une phrase.
  </p>
  <textarea
    class="wizard__textarea"
    data-field="rendement-calcul-4e"
    placeholder="Incandescente : (6 ÷ 60) × 100 = 10 %&#10;LED : (7,2 ÷ 9) × 100 = 80 %&#10;L'ampoule LED est plus efficace car..."
    spellcheck="true"
    lang="fr"
    autocorrect="on"
    autocapitalize="sentences"
  ></textarea>
</div>

</div>

---

<div class="fiche-conclusion">

Tu sais maintenant repérer les transformations d'énergie et calculer un
rendement. Dans la phase suivante, tu vas analyser la chaîne d'information
du détecteur de présence installé par les Kiagi.

</div>
