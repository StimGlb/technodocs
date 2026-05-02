---
titre: Parcours Arduino — 5 montages pour devenir Maître des systèmes automatisés
sequence: systemes-automatises
type: activite-parcours
niveaux:
  - 5eme
  - 4eme
  - 3eme
type_pedagogique: gamification-progression
duree: 2 à 4 séances
competences:
  - SFC 13
  - SFC 31
  - CCRI 31
  - OST 31
themes:
  - Structure et Fonctionnement
  - Création et Innovation
materiel:
  - Ordinateur avec Tinkercad Circuits
  - Compte élève Tinkercad
  - Crayons de couleurs (vert, orange, rouge, or)
  - Site TechnoDocs (page Schémas de montages)
modals_associes:
  - allumer-une-led
  - bouton-led
  - capteur-pir-led
  - eclairage-adaptatif-rgb
  - serrure-digicode
statut: brouillon
tags:
  - techno/parcours
  - techno/arduino
  - techno/tinkercad
  - techno/gamification
  - techno/multi-niveaux
  - techno/intercalaire
date: "{{date}}"
---

<div class="intercalaire">

# 🎮 Parcours Arduino

### 5 montages · 5 niveaux · 5 grades à débloquer

> **Mission** : devenir **Maître des systèmes automatisés** en réalisant les 5 montages dans l'ordre.

</div>

---

## 🏆 Ta carte de progression

> ✏️ **Colorie les badges au fur et à mesure** que tu valides chaque montage. Chaque grade débloqué = un cap franchi !

```
   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
   │    🟢    │  │    🟢    │  │    🟡    │  │    🔴    │  │    🔴    │
   │ APPRENTI │→ │PRATICIEN │→ │  EXPERT  │→ │  MAÎTRE  │→ │ LÉGENDE  │
   │   M1     │  │   M2     │  │    M3    │  │    M4    │  │    M5    │
   │  10 pts  │  │  15 pts  │  │  25 pts  │  │  40 pts  │  │  60 pts  │
   └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘

       ☐            ☐            ☐            ☐            ☐
    Validé       Validé       Validé       Validé       Validé
    par prof     par prof     par prof     par prof     par prof
```

> 💎 **Total possible** : 150 points + bonus = jusqu'à **200 points** avec les défis optionnels.

### Tableau de scores

| Étape | Mon grade | Mes points | ☑ Validé prof | Bonus tentés ? |
|:---|:---|:---:|:---:|:---:|
| **M1** — Allumer une LED | _Apprenti_ | _____ /10 | ☐ | ☐ ☐ |
| **M2** — Bouton + LED | _Praticien_ | _____ /15 | ☐ | ☐ ☐ |
| **M3** — Capteur PIR | _Expert_ | _____ /25 | ☐ | ☐ ☐ |
| **M4** — Éclairage RGB adaptatif | _Maître_ | _____ /40 | ☐ | ☐ ☐ |
| **M5** — Serrure à digicode | _Légende_ | _____ /60 | ☐ | ☐ ☐ |
| | | **____ /150** | | |

---

<div class="page-break"></div>

## 🎯 Avant de commencer

### Comment ça marche ?

> 🔵 **Niveau requis** : à partir de la 5ème pour M1-M2, 4ème pour M3, 3ème pour M4-M5.
>
> 📍 **Où trouver les schémas de câblage ?** Sur le site **TechnoDocs**, dans la rubrique **Cours → Schémas de montages**. Chaque montage a sa **fiche détaillée** avec toutes les connexions composant par composant.
>
> ⚙️ **Outil** : Tinkercad Circuits, mode **simulation**.
>
> 🧠 **Ton défi** : on te donne le **pseudo-code** (algorithme en langage naturel). À toi de le **traduire** en blocs (mBlock, programmation visuelle) ou en code textuel (Arduino IDE).

### Les compétences que tu vas valider (BO 2024)

| Code | Tu vas savoir… |
|:---:|:---|
| **SFC 13** | Identifier les constituants de la chaîne d'information et leurs fonctions |
| **SFC 31** | Comprendre, modifier ou écrire un programme Arduino |
| **CCRI 31** | Concevoir, tester et mettre au point un programme commandant un OST |
| **OST 31** | Choisir un système technique selon des critères |

### Vocabulaire de base à maîtriser

| Mot | Définition rapide |
|:---|:---|
| **Capteur** | Composant qui **mesure** une grandeur physique (lumière, distance, mouvement…) |
| **Actionneur** | Composant qui **agit** sur le monde physique (LED, moteur, buzzer…) |
| **Microcontrôleur** | Petit ordinateur (carte **Arduino**) qui acquiert et commande |
| **Pseudo-code** | Algorithme écrit en **langage naturel**, indépendant du langage de programmation |
| **Pin (broche)** | Point de connexion **numéroté** sur l'Arduino (D2, D9, A0…) |
| **Signal numérique** | Signal qui ne prend que **2 valeurs** : `HIGH` (1) ou `LOW` (0) |
| **Signal analogique** | Signal qui prend une **valeur continue** (0 à 1023 en lecture, 0 à 255 en écriture PWM) |

---

<div class="page-break"></div>

# 🟢 M1 — Allumer une LED · *Apprenti* · 10 pts

> 💡 **Cas concret** : tu installes un **témoin de fonctionnement** sur un appareil. Quand l'appareil est sous tension, le témoin s'allume.

📍 **Schéma de câblage** : `TechnoDocs → Schémas de montages → "Allumer une LED"`

## 📋 Mission

Allumer une LED en continu, contrôlée par l'Arduino.

## 🧩 Composants à utiliser

- 1 carte Arduino Uno
- 1 LED (couleur libre)
- 1 résistance de **220 Ω** (protection de la LED)
- Câbles de connexion
- 1 breadboard

## 🔍 Identifier la chaîne d'information

> ✏️ **Complète** : pour M1, la chaîne d'information est très simple, **il n'y a pas de capteur**.

| Fonction | Constituant | Présent dans M1 ? |
|:---|:---|:---:|
| **Acquérir** | _________________ | NON |
| **Traiter** | _________________ | OUI |
| **Communiquer** | _________________ | OUI |

## 🧠 Pseudo-code à traduire

```
DÉBUT
   Configurer la pin 13 en SORTIE

   RÉPÉTER indéfiniment :
       Mettre la pin 13 à HIGH (LED allumée)
   FIN RÉPÉTER
FIN
```

> ✏️ **Traduis** ce pseudo-code en blocs (mBlock) ou en texte (Arduino IDE). Coche le langage utilisé :
>
> ☐ Blocs (mBlock / Tinkercad block) ☐ Texte (Arduino IDE / Tinkercad textuel)

## ✅ Validation — pour toucher tes 10 points

> Coche au fur et à mesure :

- ☐ Le montage est correctement câblé sur Tinkercad (résistance bien placée)
- ☐ Le programme s'exécute sans erreur
- ☐ La LED reste **allumée** durant toute la simulation
- ☐ Je peux expliquer le rôle de la **résistance de 220 Ω**

> 🏆 **Validé par le prof** : signature ou tampon → 🟢 **APPRENTI**

## 🎁 Défi bonus (+5 pts)

> ✏️ **Modifie le programme** pour faire **clignoter** la LED (1 seconde allumée, 1 seconde éteinte). Quel mot-clé ajoutes-tu ? __________

---

<div class="page-break"></div>

# 🟢 M2 — Bouton-poussoir + LED · *Praticien* · 15 pts

> 💡 **Cas concret** : tu équipes une **sonnette** d'entrée. Quand un visiteur appuie sur le bouton, une LED s'allume à l'intérieur de la maison.

📍 **Schéma de câblage** : `TechnoDocs → Schémas de montages → "Bouton-poussoir + LED"`

## 📋 Mission

La LED s'allume **uniquement quand le bouton est pressé**.

## 🧩 Composants à utiliser

- 1 carte Arduino Uno
- 1 LED + résistance 220 Ω
- 1 bouton-poussoir + résistance pull-down 10 kΩ (ou config `INPUT_PULLUP`)
- Câbles, breadboard

## 🔍 Identifier la chaîne d'information

> ✏️ **Pour la première fois, tu utilises un capteur**. Complète :

| Fonction | Constituant | Type de signal |
|:---|:---|:---:|
| **Acquérir** | Bouton-poussoir | Numérique : ___ ou ___ |
| **Traiter** | _________________ | — |
| **Communiquer** | _________________ | Numérique |

> ✏️ **Question de réflexion** : si on relâche le bouton, que devrait faire la LED ? Pourquoi ?
>
> ____________________________________________________________________________________

## 🧠 Pseudo-code à traduire

```
DÉBUT
   Configurer la pin 2  en ENTRÉE_PULLUP   (bouton)
   Configurer la pin 13 en SORTIE          (LED)

   RÉPÉTER indéfiniment :
       SI lecture_pin(2) == LOW ALORS         (bouton pressé)
           Mettre la pin 13 à HIGH             (LED allumée)
       SINON
           Mettre la pin 13 à LOW              (LED éteinte)
       FIN SI
   FIN RÉPÉTER
FIN
```

> ⚠️ **Attention au piège** : avec `INPUT_PULLUP`, le bouton **pressé renvoie LOW**, et **relâché renvoie HIGH** (c'est l'inverse de ce qu'on imagine).

> ✏️ **Traduis** en blocs ou en texte.

## ✅ Validation — pour toucher tes 15 points

- ☐ Le câblage du bouton est correct (résistance pull-up ou pull-down)
- ☐ La structure `SI / SINON` est bien présente dans le code
- ☐ La LED s'allume **uniquement** quand le bouton est pressé
- ☐ Je peux expliquer pourquoi pressé = LOW avec `INPUT_PULLUP`

> 🏆 **Validé par le prof** → 🟢 **PRATICIEN**

## 🎁 Défis bonus

| Défi | Points |
|:---|:---:|
| **B1** : faire en sorte qu'**un appui court** allume la LED **3 secondes**, puis qu'elle s'éteigne toute seule | +5 pts |
| **B2** : ajouter un **second bouton** qui éteint la LED (premier bouton = ON, second bouton = OFF) | +5 pts |

---

<div class="page-break"></div>

# 🟡 M3 — Capteur PIR + LED · *Expert* · 25 pts

> 💡 **Cas concret** : tu installes un **éclairage automatique** dans le couloir. Quand quelqu'un passe, la lumière s'allume seule pendant quelques secondes, puis s'éteint.

📍 **Schéma de câblage** : `TechnoDocs → Schémas de montages → "Capteur de présence PIR + LED"`

## 📋 Mission

Détection de mouvement par capteur PIR → LED allumée pendant **5 secondes**, puis extinction automatique.

## 🧩 Composants à utiliser

- 1 carte Arduino Uno
- 1 capteur PIR (HC-SR501 ou équivalent Tinkercad)
- 1 LED + résistance 220 Ω
- Câbles, breadboard

## 🔍 Identifier la chaîne d'information

> ✏️ **Complète intégralement** la chaîne d'information du système :

```
   Phénomène       ┌──────────┐    ┌──────────┐    ┌──────────┐    Effet
   physique     →  │          │ →  │          │ →  │          │ →  physique
                   │  ......  │    │  ......  │    │  ......  │
                   └──────────┘    └──────────┘    └──────────┘
                    ACQUÉRIR        TRAITER         COMMUNIQUER

```

> ✏️ **Le capteur PIR est-il analogique ou numérique** ? __________
>
> Justifie : ______________________________________________________________________

## 🧠 Pseudo-code à traduire

```
DÉBUT
   Configurer la pin 2  en ENTRÉE     (capteur PIR)
   Configurer la pin 13 en SORTIE     (LED)

   RÉPÉTER indéfiniment :
       SI lecture_pin(2) == HIGH ALORS    (mouvement détecté)
           Mettre la pin 13 à HIGH
           Attendre 5000 ms                (5 secondes)
           Mettre la pin 13 à LOW
       FIN SI
   FIN RÉPÉTER
FIN
```

> ⚠️ **Discussion technique** : ce code a un **défaut**. Si quelqu'un repasse devant le capteur **pendant** les 5 secondes d'attente, le système ne le voit pas (`Attendre 5000 ms` bloque tout). Comment résoudre ce problème ?

## 🎓 Concept-clé : la **temporisation non bloquante** (3e bonus)

> 🟡 **Pour les Experts ambitieux** : utilise une **variable d'horodatage** (`millis()` en Arduino) au lieu de `Attendre`. Ça permet de continuer à surveiller le capteur pendant l'allumage.

```
SI mouvement détecté ALORS
    Mettre LED à HIGH
    horodatage_dernier_mouvement ← millis()
FIN SI

SI millis() - horodatage_dernier_mouvement > 5000 ALORS
    Mettre LED à LOW
FIN SI
```

> ✏️ **Traduis** la version simple (avec `Attendre`) en code/blocs.

## ✅ Validation — pour toucher tes 25 points

- ☐ Le capteur PIR est correctement câblé (V+, GND, signal sur D2)
- ☐ La LED s'allume bien à la détection
- ☐ La LED s'éteint **automatiquement** après 5 secondes
- ☐ Je peux expliquer la **chaîne d'information complète** à l'oral
- ☐ J'ai identifié le **défaut** du code à attente bloquante

> 🏆 **Validé par le prof** → 🟡 **EXPERT**

## 🎁 Défis bonus

| Défi | Points |
|:---|:---:|
| **B1** : implémenter la version **non bloquante** avec `millis()` | +10 pts |
| **B2** : ajouter un **buzzer** qui bipe à chaque détection (alarme) | +5 pts |

---

<div class="page-break"></div>

# 🔴 M4 — Éclairage adaptatif RGB · *Maître* · 40 pts

> 💡 **Cas concret** : tu conçois une **veilleuse intelligente** pour une chambre d'enfant. Le jour, elle est éteinte. Au crépuscule, elle s'allume en **bleu doux**. La nuit profonde, elle bascule en **rouge** très faible (qui ne perturbe pas le sommeil).

📍 **Schéma de câblage** : `TechnoDocs → Schémas de montages → "Éclairage adaptatif (LDR + LED RGB)"`

## 📋 Mission

Une LED RGB change de **couleur** ET d'**intensité** selon la luminosité ambiante mesurée par une photorésistance (LDR).

## 🧩 Composants à utiliser

- 1 carte Arduino Uno
- 1 LED RGB (anode commune ou cathode commune — vérifier le schéma)
- 3 résistances 220 Ω (une par canal R, G, B)
- 1 photorésistance (LDR)
- 1 résistance 10 kΩ (diviseur de tension pour LDR)
- Câbles, breadboard

## 🔍 Identifier les nouveaux concepts

| Concept | Définition |
|:---|:---|
| **PWM (analogWrite)** | Permet de **doser** un signal entre 0 et 255 (et donc l'intensité d'une LED, le mélange de couleurs RGB) |
| **Lecture analogique** | `analogRead(A0)` renvoie une valeur de 0 à 1023 selon la tension reçue |
| **map()** | Fonction qui convertit une plage de valeurs en une autre (ex : 0-1023 → 0-255) |
| **LED RGB** | Trois LEDs (Rouge, Vert, Bleu) dans un seul boîtier. En les mélangeant, on crée toutes les couleurs |

## 🧠 Pseudo-code à traduire

```
DÉBUT
   Configurer la pin A0 en ENTRÉE   (LDR)
   Configurer les pins 9, 10, 11 en SORTIE   (R, G, B)

   RÉPÉTER indéfiniment :
       luminosité ← lecture_analogique(A0)

       SI luminosité > 700 ALORS                  (jour)
           Allumer R=0, G=0, B=0                  (LED éteinte)

       SINON SI luminosité > 300 ALORS            (crépuscule)
           Allumer R=0, G=0, B=80                 (bleu doux)

       SINON                                       (nuit profonde)
           Allumer R=30, G=0, B=0                  (rouge faible)
       FIN SI

       Attendre 200 ms
   FIN RÉPÉTER
FIN
```

> ✏️ **Réfléchis** : pourquoi a-t-on choisi des valeurs **basses** (80, 30) plutôt que 255 pour les couleurs ?
>
> ____________________________________________________________________________________

## 🧪 Étape de test

> ✏️ **Sur Tinkercad**, déplace le curseur de la LDR et complète :

| Luminosité | Valeur lue (0-1023) | Couleur affichée |
|:---:|:---:|:---:|
| Sombre | __________ | __________ |
| Pénombre | __________ | __________ |
| Plein jour | __________ | __________ |

## ✅ Validation — pour toucher tes 40 points

- ☐ Le câblage RGB est correct (3 résistances, anode/cathode bien identifiée)
- ☐ La LDR est branchée avec son diviseur de tension
- ☐ Les **3 zones de luminosité** déclenchent **3 comportements** différents
- ☐ Le programme utilise correctement la structure `SI / SINON SI / SINON`
- ☐ Je peux expliquer comment fonctionne `map()` (même si je ne l'utilise pas ici)

> 🏆 **Validé par le prof** → 🔴 **MAÎTRE**

## 🎁 Défis bonus

| Défi | Points |
|:---|:---:|
| **B1** : utiliser `map()` pour faire varier la couleur **en continu** (transition fluide bleu→rouge) | +15 pts |
| **B2** : ajouter un **bouton** pour basculer en **mode manuel** (couleur fixe choisie par l'utilisateur) | +10 pts |

---

<div class="page-break"></div>

# 🔴 M5 — Serrure à digicode · *Légende* · 60 pts

> 💡 **Cas concret** : tu installes un **système de contrôle d'accès domotique** sur un coffre-fort, une porte de cave ou un boîtier de stockage. L'utilisateur saisit un code à 4 chiffres, et un **servomoteur** déverrouille mécaniquement la porte si le code est bon.

📍 **Schéma de câblage** : `TechnoDocs → Schémas de montages → "Serrure à digicode"`

## 📋 Mission

Système complet de saisie + vérification + déverrouillage avec retour utilisateur.

## 🧩 Composants à utiliser

- 1 carte Arduino Uno
- 1 clavier matriciel **4×4** (16 touches)
- 1 écran LCD **I2C 16×2**
- 1 servomoteur SG90
- (Optionnel) 1 LED rouge + 1 LED verte
- Câbles, breadboard

## 🔍 Concepts avancés mobilisés

> ⚠️ **Attention, ce montage utilise plusieurs nouveautés simultanées** :

| Concept | Pourquoi c'est nouveau |
|:---|:---|
| **Clavier matriciel** | Plusieurs entrées qui se partagent les pins (économie de broches) |
| **Bibliothèque externe** | On utilise `Keypad.h` et `LiquidCrystal_I2C.h` (à importer dans l'IDE) |
| **Stockage de chaînes** | Le code saisi est stocké dans une **variable de type chaîne** |
| **Comparaison de chaînes** | On compare la saisie au code attendu |
| **Servomoteur (PWM)** | Position angulaire commandée en degrés (0° à 180°) |
| **Affichage LCD** | Communication I2C, méthode `lcd.print()` |

## 🧠 Pseudo-code à traduire

```
DÉBUT
   code_attendu ← "1234"
   saisie ← ""

   Initialiser clavier (4×4)
   Initialiser écran LCD
   Initialiser servomoteur sur pin 9

   Servomoteur en position 0°  (porte verrouillée)
   Afficher "Code ?" sur LCD

   RÉPÉTER indéfiniment :

       touche ← lire_clavier()

       SI touche est un chiffre ALORS
           saisie ← saisie + touche
           Afficher saisie sur LCD
       FIN SI

       SI longueur(saisie) == 4 ALORS
           SI saisie == code_attendu ALORS
               Afficher "OUVERT" sur LCD
               Servomoteur en position 90°    (déverrouillage)
               Attendre 5000 ms
               Servomoteur en position 0°     (re-verrouillage)
               Afficher "Code ?" sur LCD
               saisie ← ""
           SINON
               Afficher "REFUSE" sur LCD
               Attendre 2000 ms
               Afficher "Code ?" sur LCD
               saisie ← ""
           FIN SI
       FIN SI

       SI touche == '*' ALORS    (bouton effacer)
           saisie ← ""
           Afficher "Code ?" sur LCD
       FIN SI

   FIN RÉPÉTER
FIN
```

> ⚠️ **Conseil de structure (3e)** : ce programme est long. **Découpe-le en sous-programmes** :
>
> - `gererTouche(touche)` : ajoute le chiffre à la saisie
> - `verifierCode()` : compare et déclenche ouverture/refus
> - `ouvrirServo()` / `fermerServo()` : actions servomoteur

## 🔍 Identifier la chaîne d'information

> ✏️ **Cette chaîne est plus complexe**. Identifie chaque élément :

| Fonction | Constituant(s) | Type de donnée |
|:---|:---|:---:|
| **Acquérir** | _________________ | _________________ |
| **Traiter** | _________________ | chaîne de caractères |
| **Communiquer** | _________________ | texte |
| **Commander** | _________________ | angle (0° ou 90°) |

> 💡 **Note importante** : ici, la chaîne d'information a **4 fonctions** au lieu de 3, parce qu'on **commande** un actionneur (servomoteur). C'est la chaîne complète selon le BO 2024.

## ✅ Validation — pour toucher tes 60 points

- ☐ Le clavier matriciel renvoie bien la touche pressée (test affichage série)
- ☐ L'écran LCD affiche correctement la saisie
- ☐ Un **bon code** déverrouille (servo à 90°) puis reverrouille après 5 s
- ☐ Un **mauvais code** affiche "REFUSE" puis revient à l'écran d'accueil
- ☐ La touche `*` permet d'**effacer** la saisie
- ☐ Mon code est **structuré en sous-programmes** nommés
- ☐ Je peux expliquer pourquoi on parle ici d'une chaîne d'information à **4 fonctions**

> 🏆 **Validé par le prof** → 🔴 **LÉGENDE**

## 🎁 Défis bonus du Maître

| Défi | Points |
|:---|:---:|
| **B1** : ajouter une **LED verte** (code accepté) et une **LED rouge** (code refusé) en plus de l'affichage | +5 pts |
| **B2** : implémenter un **compteur d'erreurs** : après 3 mauvais codes, le système se bloque 30 secondes | +15 pts |
| **B3** : permettre à l'utilisateur de **changer le code** via une touche spéciale (`#` par exemple) | +20 pts |

---

<div class="page-break"></div>

## 🎯 Synthèse — Ce que j'ai appris

### Tableau de progression personnelle

> ✏️ **Pour chaque montage**, note **un mot-clé** que tu as découvert et que tu retiens :

| Montage | Mot-clé que je retiens | Difficulté ressentie (/5) |
|:---|:---|:---:|
| M1 — LED simple | _________________________ | _____ |
| M2 — Bouton + LED | _________________________ | _____ |
| M3 — Capteur PIR | _________________________ | _____ |
| M4 — Éclairage RGB adaptatif | _________________________ | _____ |
| M5 — Serrure à digicode | _________________________ | _____ |

### Vocabulaire technique consolidé

> ✏️ **Coche ce que tu maîtrises maintenant** :

- ☐ Différencier **capteur** et **actionneur**
- ☐ Identifier les **4 fonctions** de la chaîne d'information : Acquérir, Traiter, Communiquer, Commander
- ☐ Distinguer signal **numérique** (HIGH/LOW) et signal **analogique** (0-1023)
- ☐ Utiliser une structure conditionnelle `SI / SINON SI / SINON`
- ☐ Comprendre la différence entre `delay()` (bloquant) et `millis()` (non bloquant)
- ☐ Utiliser `analogRead()` et `analogWrite()` (PWM)
- ☐ Lire un schéma de câblage avec breadboard et résistances
- ☐ Traduire un **pseudo-code** en blocs OU en code textuel

### Pour aller plus loin (à la maison)

> 💡 **Choisis un cas concret** que tu aimerais réaliser, et imagine son montage :
>
> - **Idée d'objet** : __________________________________________________________
>
> - **Capteur(s) nécessaire(s)** : _____________________________________________
>
> - **Actionneur(s)** : _________________________________________________________
>
> - **Quel montage du parcours s'en rapproche le plus** ? M___

---

<div class="page-break"></div>

## 🏆 Tableau d'honneur de la classe

> 📌 **À afficher en classe** — votre prof reportera ici les Maîtres et Légendes du parcours.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              🏆 MAÎTRES DES SYSTÈMES AUTOMATISÉS 🏆          │
│                                                             │
│   🟢 Apprentis : ............................................   │
│                  ............................................   │
│                                                             │
│   🟡 Experts   : ............................................   │
│                  ............................................   │
│                                                             │
│   🔴 Maîtres   : ............................................   │
│                                                             │
│   ⭐ Légendes  : ............................................   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📜 Mon diplôme du parcours

> ✏️ **À remplir quand tu as validé au minimum M1, M2 et M3** :

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                    DIPLÔME DU PARCOURS ARDUINO                ║
║                                                               ║
║                                                               ║
║   Décerné à : ............................................   ║
║                                                               ║
║   Classe   : .....................                            ║
║                                                               ║
║   Total de points obtenus : ............... / 200             ║
║                                                               ║
║   Grade atteint : 🟢 Apprenti  🟢 Praticien  🟡 Expert         ║
║                   🔴 Maître   ⭐ Légende                       ║
║                                                               ║
║                                                               ║
║   Date : ................        Signature prof : ............║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*Parcours Arduino · 5 montages · Multi-niveaux 5e/4e/3e · Tinkercad Circuits + TechnoDocs · BO 2024*
