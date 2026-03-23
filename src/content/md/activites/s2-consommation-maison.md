---
titre: "DNB Habitat et énergie — Phase 2 : Documents techniques"
sequence: habitat-energie
type: wizard-phase
wizard_phase: 2
wizard_fichiers:
  - 4e-habitat-energie.html
  - 3e-habitat-energie.html
niveaux:
  - 4eme
  - 3eme
competences:
  - OST 31
  - OST 32
data_fields:
  - doc-puissance-led
  - doc-duree-vie-led
  - doc-critere-choix
  - doc-indice-rep
statut: brouillon
tags:
  - techno/4eme
  - techno/3eme
  - techno/dnb
  - techno/habitat
  - techno/energie
date: "{{date}}"
---

# Phase 2 — Documents techniques

> **Pour le Lead Dev**
> Phase commune aux deux niveaux. Mêmes champs, mêmes `data-field` dans
> `4e-habitat-energie.html` et `3e-habitat-energie.html`.
> `requiredFields` phase 2 : `doc-puissance-led`, `doc-duree-vie-led`,
> `doc-critere-choix`.

---

<div class="fiche-ost">

## 📄 Analyser les équipements de la maison Kiagi

La famille Kiagi envisage de remplacer tous ses éclairages et d'installer un
thermostat connecté. Avant d'acheter, ils comparent les caractéristiques
techniques des équipements disponibles.

</div>

---

<div class="fiche-travail">

## Document 2 — Comparatif des ampoules

| Caractéristique | Ampoule incandescente | Ampoule fluocompacte | Ampoule LED |
|---|---|---|---|
| Puissance (W) | 60 | 15 | 9 |
| Flux lumineux (lm) | 800 | 800 | 800 |
| Durée de vie (h) | 1 000 | 8 000 | 25 000 |
| Prix unitaire (€) | 1 | 4 | 6 |
| Recyclage | Poubelle ordinaire | Point collecte DEEE | Point collecte DEEE |
| Indice de réparabilité | — | — | — |

## Document 3 — Fiche technique thermostat connecté

| Caractéristique | Valeur |
|---|---|
| Marque / modèle | ThermoPilot Connect |
| Alimentation | 230 V — 50 Hz |
| Consommation propre | 2 W |
| Économies estimées | 20 à 30 % sur le chauffage |
| Connectivité | WiFi 2,4 GHz |
| Durée de vie annoncée | 10 ans |
| Indice de réparabilité | 6,2 / 10 |
| Matériaux principaux | ABS, PCB, cuivre |
| Fin de vie | Collecte DEEE obligatoire |

</div>

---

<div class="fiche-activite">

## Question 1 — Extraire des données

<div class="wizard__group">
  <label class="wizard__label required">D'après le Document 2, quelle est la puissance de l'ampoule LED ?</label>
  <p class="wizard__hint">Reporte la valeur exacte avec son unité.</p>
  <input
    type="text"
    class="wizard__input"
    data-field="doc-puissance-led"
    placeholder="Ex: 9 W"
    spellcheck="true"
    lang="fr"
  />
</div>

<div class="wizard__group">
  <label class="wizard__label required">Quelle est la durée de vie de l'ampoule LED ?</label>
  <p class="wizard__hint">Reporte la valeur exacte avec son unité.</p>
  <input
    type="text"
    class="wizard__input"
    data-field="doc-duree-vie-led"
    placeholder="Ex: 25 000 h"
    spellcheck="true"
    lang="fr"
  />
</div>

</div>

---

<div class="fiche-activite">

## Question 2 — Comparer et argumenter

<div class="wizard__tips">
  <p class="wizard__tips-title">💡 Méthode</p>
  <div class="wizard__tips-content">
    <p>Pour comparer des OST, on prend en compte plusieurs critères : économique
    (prix, coût d'usage), environnemental (cycle de vie, recyclage, indice de
    réparabilité) et technique (performances, durée de vie).</p>
  </div>
</div>

<div class="wizard__group">
  <label class="wizard__label required">En te basant sur les Documents 2 et 3, cite deux critères qui justifient le choix de l'ampoule LED plutôt que l'ampoule incandescente pour la famille Kiagi.</label>
  <p class="wizard__hint">Appuie-toi sur des valeurs chiffrées du tableau. Ex: "La durée de vie est 25 fois plus longue..."</p>
  <textarea
    class="wizard__textarea"
    data-field="doc-critere-choix"
    placeholder="Critère 1 : ...&#10;Critère 2 : ..."
    spellcheck="true"
    lang="fr"
    autocorrect="on"
    autocapitalize="sentences"
  ></textarea>
</div>

</div>

---

<div class="fiche-activite">

## Question 3 — Indice de réparabilité

<div class="wizard__group">
  <label class="wizard__label">Le thermostat ThermoPilot Connect a un indice de réparabilité de 6,2/10. Qu'est-ce que cela signifie concrètement pour la famille Kiagi ?</label>
  <p class="wizard__hint">L'indice va de 0 (irréparable) à 10 (très facilement réparable). Que dit-il sur la durée de vie et l'impact environnemental ?</p>
  <textarea
    class="wizard__textarea"
    data-field="doc-indice-rep"
    placeholder="Ex: Un indice de 6,2/10 signifie que cet appareil est moyennement réparable..."
    spellcheck="true"
    lang="fr"
    autocorrect="on"
    autocapitalize="sentences"
  ></textarea>
</div>

</div>

---

<div class="fiche-conclusion">

Tu sais maintenant extraire et comparer des données techniques issues de
documents. Dans la phase suivante, tu vas analyser comment ces équipements
transforment l'énergie électrique.

</div>
