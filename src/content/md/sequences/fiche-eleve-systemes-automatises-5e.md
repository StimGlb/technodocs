---
titre: Fiche élève 5ème — Des systèmes automatisés pour économiser l'énergie
sequence: habitat-energie
niveau: 5eme
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
differentiation: 5eme-guide
statut: brouillon
tags:
  - techno/5eme
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

### Niveau 5ème — Séance 3 · 1h30 · Travail individuel ou binôme

</div>

---

## 🎯 Mission de la séance

> La famille Kiagi a installé des LED dans toute la maison, mais elle perd encore de l'énergie : les lumières restent allumées sans personne, on ne sait pas quand aérer la cuisine, et la lampe du salon ne s'adapte pas à la luminosité.
>
> **Aujourd'hui, tu vas prototyper 3 systèmes automatiques sur Tinkercad Circuits pour aider la famille Kiagi à économiser de l'énergie sans y penser.**

### Ce que tu vas savoir faire à la fin

À la fin de la séance, tu seras capable de :

- **Identifier** les éléments d'une chaîne d'information : capteur, microcontrôleur, actionneur (SFC 13)
- **Modifier les paramètres** d'un programme Arduino simple (SFC 31)
- **Comparer** trois systèmes pour choisir le plus adapté à un usage (OST 31)
- **Décrire** la conversion d'énergie d'un actionneur (SFC 11)

### Matériel par poste

- 1 ordinateur connecté à Tinkercad Circuits
- Ton compte élève Tinkercad (`prenom.nom@college-mav`)
- Cette fiche, un crayon, une gomme

---

<div class="page-break"></div>

## 📋 Sommaire des 3 activités

| Activité | Système Kiagi | Capteur | Actionneur | Page |
|:---:|:---|:---:|:---:|:---:|
| **A1** | Éclairage automatique du couloir | 📏 Ultrason | 💡 LED | 3 |
| **A2** | Lampe adaptative du salon | ☀️ Photorésistance | 💡 LED variable | 5 |
| **A3** | Alerte qualité de l'air en cuisine | 🌬️ Capteur (potentiomètre) | 🔊 Buzzer + 💡 LED | 7 |

> 🔵 **Niveau 5ème — version guidée** : tu es guidé étape par étape. Toutes les valeurs et tous les blocs de programmation sont fournis. Tu modifies les paramètres pour voir l'effet.

---

<div class="page-break"></div>

# Activité A1 — Éclairage automatique du couloir 📏💡

> **Le problème Kiagi** : Dans le couloir, les enfants oublient d'éteindre la lumière quand ils passent. La famille consomme **20 kWh par an** rien que pour ce couloir.
>
> **L'idée** : un capteur qui détecte quelqu'un, et une lumière qui s'allume **uniquement quand c'est nécessaire**.

## 🔧 Vocabulaire de l'activité

| Mot | Définition simple |
|:---|:---|
| **Capteur ultrason** | Composant qui mesure la **distance** entre lui et un obstacle, en envoyant un son très aigu (inaudible) qui rebondit. |
| **LED** | Composant qui transforme l'**énergie électrique en énergie lumineuse**. |
| **Seuil** | Valeur **limite** que l'on choisit dans un programme (ex : « si distance < 100 cm »). |
| **Microcontrôleur** | Petit ordinateur (la carte **Arduino**) qui lit les capteurs et commande les actionneurs. |

## 🛠️ Étape 1 — Ouvrir le montage

1. Connecte-toi à Tinkercad Circuits avec ton compte
2. Ouvre le montage partagé : **A1-eclairage-couloir-5e**
3. Observe le câblage : repère le **capteur ultrason** (HC-SR04), la **LED** rouge, l'**Arduino Uno**

> ✏️ **Note ce que tu vois** :
>
> - Combien de fils relient le capteur à l'Arduino ? __________
> - De quelle couleur est la LED ? __________
> - Sur quelle broche est branchée la LED ? __________

## 🔍 Étape 2 — Comprendre la chaîne d'information

Complète le schéma de la chaîne d'information de ce système :

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │              │      │              │
│  ............ │  →  │  ............ │  →  │  ............ │
│              │      │              │      │              │
│   ACQUÉRIR   │      │   TRAITER    │      │ COMMUNIQUER  │
│              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
```

> Choisis parmi : **LED**, **Arduino**, **Capteur ultrason**

## 💻 Étape 3 — Lire le programme

Voici le programme Arduino installé :

```c
// Programme A1 — éclairage automatique du couloir
const int trigPin = 9;
const int echoPin = 10;
const int ledPin = 13;
const int seuil = 100;  // distance en cm

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  long distance = mesurerDistance();
  if (distance < seuil) {
    digitalWrite(ledPin, HIGH);  // allume la LED
  } else {
    digitalWrite(ledPin, LOW);   // éteint la LED
  }
  delay(100);
}
```

> 🔍 **Réponds aux questions** :
>
> 1. Quel est le **seuil** choisi ? __________ cm
>
> 2. Que se passe-t-il quand la distance est **inférieure** au seuil ? ____________________________________________
>
> 3. Que se passe-t-il quand la distance est **supérieure** au seuil ? ____________________________________________

<div class="page-break"></div>

## 🧪 Étape 4 — Tester et modifier

**Lance la simulation** sur Tinkercad et déplace l'obstacle devant le capteur ultrason.

> ✏️ **Observe** :
>
> - À partir de combien de cm la LED s'allume-t-elle ? __________ cm
> - Que se passe-t-il quand tu éloignes l'obstacle au-delà du seuil ? ______________________________________

**Maintenant modifie le seuil** : remplace `const int seuil = 100;` par `const int seuil = 50;`

> ✏️ **Que se passe-t-il ?** ______________________________________________________________________
>
> ____________________________________________________________________________________________

> 💡 **Conclusion** : le seuil contrôle la **sensibilité** du système. Plus il est petit, plus il faut s'approcher pour déclencher la lumière.

## ⚡ Étape 5 — Bilan énergétique

| Situation | Durée allumée / jour | Conso / jour | Conso / an |
|:---|:---:|:---:|:---:|
| Lampe **toujours allumée** | 24 h | 12 × 24 = **288 Wh** | ≈ **105 kWh** |
| Lampe **classique** (sans capteur) | 6 h | 12 × 6 = **72 Wh** | ≈ **26 kWh** |
| Lampe **automatique** (avec capteur) | 1 h | 12 × 1 = **12 Wh** | ≈ **____ kWh** |

> ✏️ **Calcule** : 12 × 365 = __________ Wh/an = __________ kWh/an
>
> ✏️ **Économie** par rapport à la lampe classique : 26 − ____ = ______ kWh/an

---

<div class="page-break"></div>

# Activité A2 — Lampe adaptative du salon ☀️💡

> **Le problème Kiagi** : Dans le salon, la lampe est toujours allumée à pleine puissance, même quand le soleil entre par la fenêtre. C'est du gaspillage.
>
> **L'idée** : une lampe qui **adapte son intensité** à la luminosité ambiante (faible le jour, forte la nuit).

## 🔧 Vocabulaire de l'activité

| Mot | Définition simple |
|:---|:---|
| **Photorésistance (LDR)** | Composant qui mesure la **luminosité**. Sa valeur change avec la lumière reçue. |
| **PWM** | Technique pour **doser** la puissance envoyée à un actionneur (valeur de 0 à 255). |
| **Signal analogique** | Signal qui peut prendre **plusieurs valeurs** (pas seulement allumé/éteint). |
| **Conversion d'énergie** | Quand un composant **change** la forme de l'énergie : électrique → lumineuse pour une LED. |

## 🛠️ Étape 1 — Ouvrir le montage

1. Sur Tinkercad, ouvre le montage **A2-eclairage-adaptatif-5e**
2. Observe le câblage : la **photorésistance**, la **LED** branchée sur la broche **9** (pourquoi pas 13 ?)
3. Lance la simulation et **clique sur la photorésistance** : un curseur apparaît, tu peux changer la luminosité.

## 🔍 Étape 2 — Comprendre la chaîne d'énergie

La LED transforme l'énergie électrique en énergie lumineuse.

> ✏️ **Complète** :
>
> Énergie d'entrée : ___________________________
>
> Énergie de sortie : ___________________________
>
> Cette transformation s'appelle une **conversion d'énergie**.

## 💻 Étape 3 — Lire le programme

```c
// Programme A2 — éclairage adaptatif
const int ldrPin = A0;
const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int luminosite = analogRead(ldrPin);  // valeur de 0 à 1023
  int puissanceLed = map(luminosite, 0, 1023, 255, 0);
  analogWrite(ledPin, puissanceLed);    // dose la LED
  delay(50);
}
```

> 🔍 **Comprends ce programme** :
>
> 1. La photorésistance donne une valeur entre __________ et __________.
>
> 2. Le bloc `map(...)` transforme cette valeur. Que devient une luminosité de **0** ? La LED reçoit __________ (LED brille fort).
>
> 3. Que devient une luminosité de **1023** ? La LED reçoit __________ (LED éteinte).
>
> 4. Pourquoi cette **conversion inversée** ? ____________________________________________________________

<div class="page-break"></div>

## 🧪 Étape 4 — Expérimenter

Lance la simulation et déplace le curseur de la photorésistance de gauche à droite.

> ✏️ **Note tes observations** :

| Luminosité ambiante | Valeur lue (analogRead) | Puissance LED (0-255) | LED visible ? |
|:---:|:---:|:---:|:---:|
| Très sombre (curseur à gauche) | environ ____ | environ ____ | ___________ |
| Moyen | environ ____ | environ ____ | ___________ |
| Très lumineux (curseur à droite) | environ ____ | environ ____ | ___________ |

## ⚡ Étape 5 — Avantage énergétique

> ✏️ **Compare les 3 lampes du salon** :
>
> - Lampe classique (toujours pleine puissance) : **100 %** de la consommation
> - Lampe avec interrupteur on/off : **70 %** de la consommation (l'utilisateur l'oublie souvent)
> - Lampe **adaptative** (notre système) : **30 à 50 %** de la consommation selon la météo

> 💡 **Pourquoi cette économie ?** : la lampe ne brille **jamais plus que nécessaire**. Quand il fait jour, elle consomme presque rien.

---

<div class="page-break"></div>

# Activité A3 — Alerte qualité de l'air en cuisine 🌬️🔊

> **Le problème Kiagi** : Dans la cuisine, la VMC tourne en permanence et consomme **40 kWh par an**, même quand l'air est propre. Personne ne sait quand c'est vraiment nécessaire de ventiler.
>
> **L'idée** : un capteur qui mesure la pollution de l'air et **alerte** la famille (lumière rouge + son) quand il faut aérer.

## 🔧 Vocabulaire de l'activité

| Mot | Définition simple |
|:---|:---|
| **Capteur de gaz (MQ-135)** | Mesure les **polluants** dans l'air (CO₂, fumée, etc.). En classe, on le simule avec un **potentiomètre**. |
| **Buzzer** | Composant qui transforme l'énergie **électrique en énergie sonore**. |
| **Alerte** | Signal **fort** envoyé à l'utilisateur : visuel (LED rouge) + sonore (buzzer). |
| **Potentiomètre** | Composant à curseur qui simule en classe une grandeur variable (gaz, lumière, etc.). |

## 🛠️ Étape 1 — Ouvrir le montage

1. Sur Tinkercad, ouvre le montage **A3-alerte-air-5e**
2. Observe le câblage : **potentiomètre** (= capteur de gaz simulé), **LED rouge**, **buzzer**, **Arduino**
3. Lance la simulation. **Tourne le potentiomètre** : c'est comme si la pollution augmentait dans la cuisine.

## 🔍 Étape 2 — Deux actionneurs pour une alerte

Ce système est différent : il a **deux actionneurs** pour la **même alerte**.

> ✏️ **Complète le tableau** :

| Actionneur | Type d'énergie en sortie | Pourquoi cet actionneur ? |
|:---:|:---:|:---|
| 💡 LED rouge | __________________ | Pour qu'on **voie** l'alerte de loin |
| 🔊 Buzzer | __________________ | Pour qu'on l'**entende** dans une autre pièce |

> 💡 **Pourquoi deux actionneurs ?** Parce qu'une seule alerte (visuelle ou sonore) peut être ratée. Combiner les deux **augmente la fiabilité**.

<div class="page-break"></div>

## 💻 Étape 3 — Le programme

```c
// Programme A3 — alerte qualité d'air
const int gazPin = A0;
const int ledPin = 8;
const int buzzerPin = 12;
const int seuilAlerte = 600;  // sur 1023

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  int qualiteAir = analogRead(gazPin);
  if (qualiteAir > seuilAlerte) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 1000);     // bip à 1000 Hz
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
  delay(200);
}
```

> 🔍 **Réponds** :
>
> 1. Quel est le **seuil d'alerte** ? __________ (sur 1023)
>
> 2. Que se passe-t-il **au-dessus** du seuil ? ___________________________________________________
>
> 3. Que se passe-t-il **en-dessous** du seuil ? ___________________________________________________

## 🧪 Étape 4 — Tester avec différents seuils

| Seuil testé | Réaction du système | Gênant ? Adapté ? |
|:---:|:---|:---|
| 200 (très sensible) | Alerte tout le temps | ___________________ |
| 600 (par défaut) | Alerte raisonnable | ___________________ |
| 950 (peu sensible) | Alerte rare | ___________________ |

> ✏️ **Conclusion** : un seuil **trop bas** déclenche des **fausses alertes**. Un seuil **trop haut** détecte la pollution **trop tard**. Le bon seuil est un **compromis**.

## ⚡ Étape 5 — Économie réalisée

> Sans système : VMC en permanence = **40 kWh/an**
>
> Avec système : VMC seulement quand alerte = environ **8 kWh/an** (4 h/jour au lieu de 24 h)
>
> ✏️ **Économie** : 40 − 8 = ______ kWh/an, soit environ ______ €/an (au tarif de 0,25 €/kWh)

---

<div class="page-break"></div>

## ✅ L'essentiel en 5 points — à retenir

À la fin de la séance, tu sais que :

1. **Un système automatisé** repose sur **3 éléments** : un **capteur** qui mesure, un **microcontrôleur** (Arduino) qui décide, un **actionneur** qui agit.

2. La **chaîne d'information** suit toujours la même logique : **acquérir → traiter → communiquer**.

3. Un programme contient un **seuil** qui définit **quand** le système réagit. Modifier le seuil change la **sensibilité** du système.

4. Un **actionneur** réalise une **conversion d'énergie** : électrique → lumineuse (LED), électrique → sonore (buzzer).

5. **Automatiser** un système permet d'économiser de l'énergie en n'utilisant les appareils que **quand c'est utile**, pas en permanence.

---

## 🏠 Pour aller plus loin (à la maison)

> Repère **dans ta propre maison** un appareil qui pourrait être automatisé pour économiser de l'énergie. Décris-le en quelques lignes :
>
> - **Quel appareil** ? ________________________________________________________________________
>
> - **Quel capteur** utiliser ? ________________________________________________________________
>
> - **Quel actionneur** commander ? ____________________________________________________________
>
> - **Quelle économie** d'énergie estimée ? _____________________________________________________

---

<div class="bilan-competences">

## 🎯 Auto-évaluation des compétences

| Je suis capable de… | 🔴 Pas encore | 🟡 Avec aide | 🟢 Tout seul |
|:---|:---:|:---:|:---:|
| Identifier un capteur, un microcontrôleur, un actionneur | ☐ | ☐ | ☐ |
| Compléter une chaîne d'information | ☐ | ☐ | ☐ |
| Modifier un seuil dans un programme et observer l'effet | ☐ | ☐ | ☐ |
| Décrire la conversion d'énergie d'un actionneur | ☐ | ☐ | ☐ |
| Comparer 3 systèmes pour choisir le plus adapté | ☐ | ☐ | ☐ |

</div>

---

*Fiche élève 5ème — Séquence Habitat & Énergie — Séance 3 · Famille Kiagi · Tinkercad Circuits*
