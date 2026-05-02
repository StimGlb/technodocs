---
titre: Fiche élève 4ème — Des systèmes automatisés pour économiser l'énergie
sequence: habitat-energie
niveau: 4eme
type: activite
seance: 3
duree: 1h30
competences:
  - OST 31
  - SFC 11
  - SFC 13
  - SFC 31
themes:
  - Usages et Interactions
  - Structure et Fonctionnement
materiel:
  - Ordinateur avec Tinkercad Circuits
  - Compte élève Tinkercad
differentiation: 4eme-autonome
statut: brouillon
tags:
  - techno/4eme
  - techno/habitat-energie
  - techno/tinkercad
  - techno/arduino
  - techno/programmation
  - techno/capteurs
  - techno/intercalaire
date: "{{date}}"
---

<div class="intercalaire">

# 🏠⚡ Des systèmes automatisés pour économiser l'énergie

### Niveau 4ème — Séance 3 · 1h30 · Travail individuel ou binôme

</div>

---

## 🎯 Mission de la séance

> La famille Kiagi a installé des LED dans toute la maison, mais elle perd encore de l'énergie : les lumières restent allumées sans personne, on ne sait pas quand aérer la cuisine, et la lampe du salon ne s'adapte pas à la luminosité.
>
> **Aujourd'hui, tu vas concevoir, tester et comparer 3 systèmes automatiques sur Tinkercad Circuits pour aider la famille Kiagi à choisir lequel installer en priorité.**

### Ce que tu vas savoir faire à la fin

À la fin de la séance, tu seras capable de :

- **Identifier** les constituants d'une chaîne d'information et **les associer à leurs fonctions** (SFC 13)
- **Compléter** un programme Arduino pour répondre à une fonctionnalité précise (SFC 31)
- **Repérer** les transformations et les flux d'énergie dans un système (SFC 11)
- **Comparer** qualitativement et quantitativement plusieurs systèmes pour arrêter un choix (OST 31)

### Matériel par poste

- 1 ordinateur connecté à Tinkercad Circuits
- Ton compte élève Tinkercad (`prenom.nom@college-mav`)
- Cette fiche, un crayon, une calculatrice

---

<div class="page-break"></div>

## 📋 Sommaire des 3 activités

| Activité | Système Kiagi | Capteur | Actionneur | Page |
|:---:|:---|:---:|:---:|:---:|
| **A1** | Éclairage automatique du couloir | 📏 Ultrason | 💡 LED | 3 |
| **A2** | Lampe adaptative du salon | ☀️ Photorésistance | 💡 LED variable | 5 |
| **A3** | Alerte qualité de l'air en cuisine | 🌬️ Capteur (potentiomètre) | 🔊 Buzzer + 💡 LED | 7 |

> 🟠 **Niveau 4ème — version autonome** : tu reçois moins d'aides. Tu dois compléter du code, justifier tes choix, comparer les systèmes. À la fin de la séance, tu devras dire à la famille Kiagi **quel système installer en priorité** et **pourquoi**.

---

<div class="page-break"></div>

# Activité A1 — Éclairage automatique du couloir 📏💡

> **Le problème Kiagi** : Dans le couloir, la lampe LED de 12 W reste allumée en moyenne 6 h par jour alors que les enfants ne passent que 1 h cumulée. La famille perd ainsi **22 kWh par an** à éclairer un couloir vide.
>
> **L'idée** : un capteur qui détecte la présence et une lumière qui s'allume **uniquement quand c'est nécessaire**.

## 🔧 Vocabulaire à maîtriser

| Mot | Définition à retenir |
|:---|:---|
| **Capteur ultrason** | Mesure une **distance** par émission/réception d'ondes. Précision ~1 cm, portée jusqu'à 4 m. |
| **Microcontrôleur** | Carte programmable (**Arduino**) qui acquiert les signaux des capteurs et pilote les actionneurs. |
| **Seuil** | Valeur **limite** de référence dans un programme : la condition `if` compare la mesure à ce seuil. |
| **Constituant** | Élément matériel **identifiable** dans un système, associé à une **fonction** précise. |

## 🛠️ Étape 1 — Analyser le montage

1. Connecte-toi à Tinkercad et ouvre le montage **A1-eclairage-couloir-4e**
2. **Identifie chaque constituant** et associe-le à sa fonction :

> ✏️ **Tableau d'analyse** :

| Constituant repéré | Fonction technique | Position dans la chaîne |
|:---|:---|:---:|
| _________________________ | Mesurer la distance | Acquérir |
| _________________________ | Décider de l'action à mener | _____________ |
| _________________________ | Émettre la lumière | _____________ |

## 🔍 Étape 2 — Élaborer la chaîne d'information

> ✏️ **Construis** la chaîne d'information du système (sans aide) :

```

  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │              │      │              │      │              │
  │              │  →   │              │  →   │              │
  │              │      │              │      │              │
  │  ........... │      │  ........... │      │  ........... │
  │              │      │              │      │              │
  └──────────────┘      └──────────────┘      └──────────────┘

```

> ✏️ **Justifie** : pourquoi le capteur ne peut-il pas commander directement la LED, sans Arduino entre les deux ?
>
> _______________________________________________________________________________________
>
> _______________________________________________________________________________________

<div class="page-break"></div>

## 💻 Étape 3 — Compléter le programme

Voici le programme **incomplet** installé :

```c
// Programme A1 — éclairage automatique du couloir
const int trigPin = 9;
const int echoPin = 10;
const int ledPin = 13;
const int seuil = ______;  // (1) à choisir, en cm

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  long distance = mesurerDistance();
  if (distance ______ seuil) {     // (2) opérateur à compléter
    digitalWrite(ledPin, ______);  // (3) HIGH ou LOW ?
  } else {
    digitalWrite(ledPin, ______);  // (4) HIGH ou LOW ?
  }
  delay(100);
}
```

> ✏️ **Complète les 4 trous** :
>
> (1) Seuil choisi : __________ cm
>
> (2) Opérateur : __________ (parmi : `<`, `>`, `==`, `!=`)
>
> (3) Quand la condition est **vraie** : __________
>
> (4) Quand la condition est **fausse** : __________

> ✏️ **Justifie ton choix de seuil** : pourquoi as-tu choisi cette valeur plutôt qu'une autre ?
>
> _______________________________________________________________________________________

## 🧪 Étape 4 — Tester et calibrer

Lance la simulation et **teste 3 valeurs de seuil différentes** :

> ✏️ **Tableau de mesures** :

| Seuil testé (cm) | Distance d'allumage observée | Distance d'extinction observée | Adapté à un couloir ? (oui/non) |
|:---:|:---:|:---:|:---:|
| 30 | __________ | __________ | __________ |
| _____ (le tien) | __________ | __________ | __________ |
| 200 | __________ | __________ | __________ |

> ✏️ **Conclusion** : quelle valeur de seuil retiens-tu pour la famille Kiagi, et pourquoi ?
>
> _______________________________________________________________________________________

## ⚡ Étape 5 — Bilan énergétique chiffré

Données : LED de **12 W**, tarif électricité **0,25 €/kWh**, allumage moyen **1 h/jour** avec le système (vs 6 h sans).

> ✏️ **Calcule** :
>
> Conso **sans** système : 12 W × 6 h × 365 j = __________ Wh/an = __________ kWh/an
>
> Conso **avec** système : 12 W × 1 h × 365 j = __________ Wh/an = __________ kWh/an
>
> **Économie annuelle** : __________ kWh/an, soit __________ € d'économie/an

---

<div class="page-break"></div>

# Activité A2 — Lampe adaptative du salon ☀️💡

> **Le problème Kiagi** : Dans le salon, la lampe LED de 15 W est allumée à pleine puissance dès qu'elle est en marche, même quand le soleil entre par la fenêtre.
>
> **L'idée** : une lampe qui **dose son intensité** en fonction de la luminosité ambiante (faible le jour, forte la nuit).

## 🔧 Vocabulaire à maîtriser

| Mot | Définition à retenir |
|:---|:---|
| **Photorésistance (LDR)** | Capteur dont la **résistance électrique** varie avec la lumière reçue. Donne un signal **analogique**. |
| **Signal analogique** | Signal qui prend une **valeur continue** (ex : entre 0 et 1023 sur Arduino), contrairement à un signal numérique (0 ou 1). |
| **PWM (Pulse Width Modulation)** | Technique de **modulation** : Arduino simule un signal analogique en envoyant des impulsions rapides. Valeur de 0 à 255. |
| **Conversion d'énergie** | Transformation d'une **forme d'énergie** en une autre par un constituant : moteur (élec → cinétique), LED (élec → lumineuse), buzzer (élec → sonore). |

## 🔍 Étape 1 — Repérer les flux d'énergie

> ✏️ **Complète** la chaîne d'énergie de la lampe adaptative :

```

   220V secteur     transformateur     Arduino + résistance     LED
       │                  │                     │                │
       ▼                  ▼                     ▼                ▼
  ALIMENTER  →  ___________________  →  _________________  →  CONVERTIR
                                                             (en lumière)

```

> ✏️ **Réponds** :
>
> Quelle est la **conversion d'énergie** réalisée par la LED ?
>
> Énergie d'entrée : ______________________ → Énergie de sortie : ______________________

## 💻 Étape 2 — Compléter le programme avec map()

```c
// Programme A2 — éclairage adaptatif
const int ldrPin = A0;
const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int luminosite = analogRead(ldrPin);
  int puissanceLed = map(luminosite, 0, 1023, ______, ______);  // (1) (2)
  analogWrite(ledPin, puissanceLed);
  delay(50);
}
```

> ✏️ **Réfléchis** : on veut que la LED brille **fort quand il fait sombre**, et **faiblement quand il fait clair**.
>
> (1) Quand la luminosité = 0 (très sombre), la LED doit recevoir : __________ (sur 255)
>
> (2) Quand la luminosité = 1023 (très lumineux), la LED doit recevoir : __________ (sur 255)
>
> ✏️ **Justifie** : pourquoi parle-t-on d'une **conversion inversée** dans cette ligne ?
>
> _______________________________________________________________________________________

<div class="page-break"></div>

## 🧪 Étape 3 — Mesurer le comportement

Lance la simulation. Déplace le curseur de la photorésistance et **complète le tableau** :

| Luminosité simulée | Valeur lue (analogRead) | Puissance LED (analogWrite) | Visible à l'œil ? |
|:---:|:---:|:---:|:---:|
| Sombre | __________ | __________ | __________ |
| Pénombre | __________ | __________ | __________ |
| Lumière du jour | __________ | __________ | __________ |
| Soleil direct | __________ | __________ | __________ |

> ✏️ **Décris** : que se passe-t-il quand tu varies progressivement la luminosité ? Le changement est-il brutal ou progressif ? Pourquoi ?
>
> _______________________________________________________________________________________
>
> _______________________________________________________________________________________

## ⚡ Étape 4 — Économie énergétique chiffrée

Données : LED de **15 W**, allumée **5 h/jour** (soir), tarif **0,25 €/kWh**.

> ✏️ **Calcule** :
>
> Conso **sans** adaptation (pleine puissance toujours) :
>
> 15 W × 5 h × 365 j = __________ kWh/an = __________ €/an
>
> Conso **avec** adaptation (puissance moyenne ≈ 8 W au lieu de 15 W) :
>
> ____ W × 5 h × 365 j = __________ kWh/an = __________ €/an
>
> **Économie annuelle** : __________ €/an

> ✏️ **Question critique** : la lampe A2 économise-t-elle plus que la lampe A1 ? Justifie en comparant les économies en €/an.
>
> _______________________________________________________________________________________

---

<div class="page-break"></div>

# Activité A3 — Alerte qualité de l'air en cuisine 🌬️🔊

> **Le problème Kiagi** : La VMC tourne en permanence à **30 W** et consomme **40 kWh par an**, même quand l'air de la cuisine est parfaitement propre.
>
> **L'idée** : un capteur de qualité d'air qui **alerte** la famille (lumière rouge + son) **uniquement** quand il faut aérer ou activer la VMC.

## 🔧 Vocabulaire à maîtriser

| Mot | Définition à retenir |
|:---|:---|
| **Capteur MQ-135** | Capteur de **qualité d'air** : détecte CO₂, fumée, ammoniac. Sortie analogique sur A0. En classe, **simulé** par un potentiomètre. |
| **Buzzer** | Actionneur qui émet un **son** par vibration d'une membrane. Conversion : électrique → sonore. |
| **Système redondant** | Système qui utilise **plusieurs actionneurs** pour la même alerte, augmentant sa **fiabilité**. |
| **Calibration** | Ajustement du **seuil** d'un système pour obtenir le bon compromis entre sensibilité et fausses alertes. |

## 🔍 Étape 1 — Repérer la chaîne d'information complète

> ✏️ **Complète** :

```

  ENTRÉE                  TRAITEMENT                   SORTIES
                                                  ┌─────────────┐
                                                  │             │
  ┌──────────┐      ┌──────────────┐         ┌──→ │   ........  │
  │          │      │              │         │    │             │
  │  ......  │  →   │  ........... │  ────→  │    └─────────────┘
  │          │      │              │         │    ┌─────────────┐
  └──────────┘      └──────────────┘         │    │             │
                                              └──→ │   ........  │
                                                   │             │
                                                   └─────────────┘

```

> ✏️ **Pourquoi** ce système a-t-il **deux actionneurs** au lieu d'un seul ?
>
> _______________________________________________________________________________________

## 💻 Étape 2 — Compléter le programme

```c
// Programme A3 — alerte qualité de l'air
const int gazPin = A0;
const int ledPin = 8;
const int buzzerPin = 12;
const int seuilAlerte = ______;  // (1) à calibrer

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  int qualiteAir = analogRead(gazPin);
  if (qualiteAir ______ seuilAlerte) {  // (2) opérateur
    digitalWrite(ledPin, ______);       // (3)
    tone(buzzerPin, 1000);
  } else {
    digitalWrite(ledPin, ______);       // (4)
    noTone(buzzerPin);
  }
  delay(200);
}
```

> ✏️ **Complète et justifie** :
>
> (1) Seuil d'alerte choisi : __________ (entre 0 et 1023)
>
> Pourquoi cette valeur ? __________________________________________________________
>
> (2) Opérateur : __________
>
> (3) En alerte, la LED rouge est : __________ (HIGH/LOW)
>
> (4) Hors alerte, la LED rouge est : __________ (HIGH/LOW)

<div class="page-break"></div>

## 🧪 Étape 3 — Calibrer le seuil

Teste **3 valeurs de seuil** en simulation pour trouver la meilleure calibration :

| Seuil testé | Comportement observé | Inconvénient principal |
|:---:|:---|:---|
| 200 | _____________________________________________ | _________________________________ |
| _____ (le tien) | _____________________________________________ | _________________________________ |
| 950 | _____________________________________________ | _________________________________ |

> ✏️ **Justifie ton choix final** de seuil :
>
> _______________________________________________________________________________________

## ⚡ Étape 4 — Bilan VMC asservie

Données : VMC **30 W**, tarif **0,25 €/kWh**.

| Mode de fonctionnement | Heures/jour | kWh/an | €/an |
|:---|:---:|:---:|:---:|
| VMC permanente (sans système) | 24 h | __________ | __________ |
| VMC asservie au capteur (avec système) | 4 h | __________ | __________ |
| **Économie** | — | __________ | __________ |

> ✏️ **Question d'investissement** : le système (Arduino + MQ-135 + LED + buzzer) coûte environ **15 €**. En combien de temps est-il rentabilisé par les économies réalisées ?
>
> Temps de retour = 15 € ÷ __________ €/an = __________ ans

---

<div class="page-break"></div>

## ⚖️ Synthèse — Comparer les 3 systèmes pour conseiller la famille Kiagi

> 🎯 **Mission finale** : la famille Kiagi a un budget pour installer **un seul système** cette année. Compare les 3 systèmes et conseille-la.

### Tableau de comparaison qualitative

| Critère | A1 — Éclairage couloir | A2 — Lampe adaptative | A3 — Alerte air |
|:---|:---:|:---:|:---:|
| Complexité du programme | __________ | __________ | __________ |
| Coût des composants | ~10 € | ~10 € | ~15 € |
| Confort apporté | __________ | __________ | __________ |
| Impact sur la santé | __________ | __________ | __________ |
| Économie d'énergie estimée (€/an) | __________ | __________ | __________ |

### Tableau de comparaison quantitative

> ✏️ **Reporte les économies calculées** dans chaque activité :

| Système | Économie kWh/an | Économie €/an | Coût (€) | Retour sur investissement (années) |
|:---|:---:|:---:|:---:|:---:|
| A1 — Couloir | __________ | __________ | 10 | __________ |
| A2 — Salon | __________ | __________ | 10 | __________ |
| A3 — Cuisine | __________ | __________ | 15 | __________ |

### 🎯 Ton conseil à la famille Kiagi

> ✏️ **Quel système installer en priorité ?**
>
> Système choisi : __________
>
> **Justifie en 3 arguments** (économie, confort, santé, simplicité, etc.) :
>
> 1. _______________________________________________________________________________________
>
> 2. _______________________________________________________________________________________
>
> 3. _______________________________________________________________________________________

---

<div class="page-break"></div>

## ✅ L'essentiel en 5 points — à retenir

À la fin de la séance, tu sais que :

1. Une **chaîne d'information** se compose de **trois fonctions** : acquérir (capteur), traiter (microcontrôleur), communiquer (actionneur). Chaque constituant a une **fonction précise**.

2. Un système peut combiner **plusieurs actionneurs** (LED + buzzer en A3) pour assurer la **fiabilité** d'une alerte (système redondant).

3. La **calibration d'un seuil** est un **compromis** : trop sensible = fausses alertes, pas assez sensible = détection tardive. Le bon seuil dépend de l'usage.

4. Un **actionneur** réalise toujours une **conversion d'énergie** : LED (élec → lumineuse), buzzer (élec → sonore), moteur (élec → cinétique). La forme d'énergie change.

5. **Choisir un système** dépend de plusieurs critères : économie chiffrée, confort, coût, simplicité. Comparer **qualitativement et quantitativement** permet d'arrêter un choix argumenté.

---

## 🏠 Pour aller plus loin (à la maison)

> Identifie un système automatisé **chez toi ou dans ta vie quotidienne** (école, supermarché, transport).
>
> - **Quel est ce système** ? __________________________________________________________
>
> - **Quel capteur** utilise-t-il ? _______________________________________________________
>
> - **Quel actionneur** commande-t-il ? __________________________________________________
>
> - **Quel est l'avantage** apporté (énergie, sécurité, confort) ? _________________________
>
> - **Quel inconvénient** ou limite peux-tu identifier ? __________________________________

---

<div class="bilan-competences">

## 🎯 Auto-évaluation des compétences

| Je suis capable de… | 🔴 Pas encore | 🟡 Avec aide | 🟢 Tout seul |
|:---|:---:|:---:|:---:|
| Identifier les constituants d'une chaîne d'info et leurs fonctions (SFC 13) | ☐ | ☐ | ☐ |
| Compléter un programme Arduino pour qu'il réponde au besoin (SFC 31) | ☐ | ☐ | ☐ |
| Repérer les transformations d'énergie d'un actionneur (SFC 11) | ☐ | ☐ | ☐ |
| Calibrer le seuil d'un système et justifier mon choix | ☐ | ☐ | ☐ |
| Comparer plusieurs OST quantitativement et choisir (OST 31) | ☐ | ☐ | ☐ |

</div>

---

*Fiche élève 4ème — Séquence Habitat & Énergie — Séance 3 · Famille Kiagi · Tinkercad Circuits*
