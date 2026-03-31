# Alerte qualité d'air

## 1. La situation de la famille Kiagi (OST 31)

La cuisine de la maison Kiagi est équipée d'une **VMC** (Ventilation Mécanique Contrôlée) qui tourne **en permanence** et consomme environ 30 W. La famille se demande s'il ne serait pas plus économique de ventiler **uniquement quand l'air est pollué**. Elle veut un système qui détecte la qualité de l'air et alerte les habitants pour qu'ils ouvrent les fenêtres au bon moment.

Un **capteur de gaz** (MQ-135) est un composant qui détecte la présence de polluants dans l'air (CO₂, fumée, ammoniac…). Il envoie un **signal analogique** proportionnel au niveau de pollution.

### Vocabulaire clé

| Terme | Définition |
| --- | --- |
| **Capteur de gaz (MQ-135)** | Capteur analogique qui détecte les gaz polluants et envoie une tension proportionnelle à la concentration |
| **Buzzer** | Actionneur qui convertit un signal électrique en son (alerte sonore) |
| **Seuil d'alerte** | Valeur au-delà de laquelle le système déclenche une action (ici : alerte pollution) |
| **VMC** | Ventilation Mécanique Contrôlée, système de ventilation permanent dans les logements |

---

## 2. Construire le circuit sur Tinkercad Circuits (SFC 13)

Tu vas construire un prototype virtuel du système d'alerte qualité d'air. Comme le capteur MQ-135 n'existe pas dans Tinkercad, on utilise un **potentiomètre** pour simuler son signal.

### Pourquoi un potentiomètre ?

Le capteur MQ-135 réel envoie une tension variable (0-5V) selon la pollution. Le potentiomètre fait exactement la même chose : il envoie une tension variable quand on tourne son curseur. En tournant le potentiomètre, tu simules un air plus ou moins pollué.

| Potentiomètre tourné à gauche | → | Valeur basse (0-600) | → | Air propre |
| --- | --- | --- | --- | --- |
| **Potentiomètre tourné à droite** | → | **Valeur haute (600-1023)** | → | **Air pollué** |

### Composants à placer

| Composant | Branchement |
| --- | --- |
| **Arduino Uno** | — |
| **Potentiomètre** (simule le MQ-135) | Patte gauche → GND, patte droite → 5V, curseur → A0 |
| **LED rouge** + résistance 220 Ω | Anode → pin 8, cathode → GND |
| **Buzzer piézo** | Borne + → pin 7, borne – → GND |

### 🔵 Version 5ème — Câblage guidé

```
Potentiomètre :
  Patte gauche ──── Arduino GND
  Patte droite ──── Arduino 5V
  Curseur      ──── Arduino A0

LED rouge :
  Arduino pin 8 ── Résistance 220 Ω ── Anode LED rouge
  Arduino GND   ────────────────────── Cathode LED rouge

Buzzer :
  Arduino pin 7 ──── Borne + (buzzer)
  Arduino GND   ──── Borne – (buzzer)
```

### 🟠 Version 4ème — Câblage autonome

À partir du tableau des composants, réalise le câblage. Le système doit avoir **deux actionneurs** (LED + buzzer) pour une alerte à la fois visuelle et sonore.

> ☑️ Validation professeur : ____________

---

## 3. Programmer le système (SFC 31 · SFC 13)

Le programme doit surveiller la qualité de l'air et déclencher une alerte quand la pollution dépasse un seuil.

### Le comportement attendu

- Si la valeur du capteur est **inférieure à 600** → air correct → LED éteinte, buzzer silencieux
- Si la valeur du capteur est **supérieure à 600** → air pollué → LED allumée, buzzer actif (bip à 1000 Hz)

### 🔵 Version 5ème — Programmation par blocs

| Étape | Bloc à utiliser | Réglage |
| --- | --- | --- |
| **1** | set pin 8 to OUTPUT | Configuration de la LED |
| **2** | set pin 7 to OUTPUT | Configuration du buzzer |
| **3** | read analog pin A0 | Stocker dans variable `qualiteAir` |
| **4** | if qualiteAir > 600 | Condition d'alerte |
| **5** | set pin 8 to HIGH (dans le if) | Allumer la LED rouge |
| **6** | tone on pin 7 frequency 1000 (dans le if) | Activer le buzzer |
| **7** | set pin 8 to LOW (dans le else) | Éteindre la LED |
| **8** | no tone on pin 7 (dans le else) | Couper le buzzer |
| **9** | wait 500 milliseconds | Pause entre deux mesures |

### 🟠 Version 4ème — Programmation en code

Complète le programme ci-dessous :

```cpp
const int capteurPin = ____;     // Quel pin analogique ?
const int ledPin = 8;
const int buzzerPin = 7;
const int seuil = ____;          // Quelle valeur seuil ?

int qualiteAir;

void setup() {
  pinMode(ledPin, ____);         // La LED est une sortie
  pinMode(buzzerPin, ____);      // Le buzzer est une sortie
  Serial.begin(9600);
}

void loop() {
  qualiteAir = ____(capteurPin); // Quelle fonction pour lire un capteur analogique ?

  if (qualiteAir ____ seuil) {   // Quel opérateur ? (> ou <)
    digitalWrite(ledPin, ____);  // Alerte → LED ?
    tone(buzzerPin, ____);       // Quelle fréquence en Hz ?
    Serial.println("ALERTE : air pollué !");
  } else {
    digitalWrite(ledPin, ____);  // OK → LED ?
    ____(buzzerPin);             // Quelle fonction pour arrêter le son ?
    Serial.println("OK : air correct");
  }

  delay(500);
}
```

### Tester et valider

| Test | Position potentiomètre | Valeur A0 | LED | Buzzer | Conforme ? |
| --- | --- | --- | --- | --- | --- |
| Air pur | Tourné à gauche | < 600 | | | |
| Air pollué | Tourné à droite | > 600 | | | |
| Limite | Au milieu | ≈ 600 | | | |

### 🟠 Défi 4ème — Modifier le seuil

Change la valeur du seuil à **400** puis à **800**. Observe l'effet et explique :

> Avec un seuil plus bas (400), le système est plus ____________ (sensible / tolérant).
>
> Avec un seuil plus haut (800), le système est plus ____________ (sensible / tolérant).
>
> Pour une cuisine, le seuil le plus adapté serait ________ parce que _________________________

---

## 4. La chaîne d'information du système (SFC 13 · SFC 11)

### La chaîne d'information — Identifier les constituants

| Fonction | Rôle | Composant dans notre système |
| --- | --- | --- |
| **Acquérir** | Détecter la pollution de l'air | ________________ |
| **Traiter** | Comparer la valeur au seuil | ________________ |
| **Communiquer** | Alerter l'utilisateur (vue + son) | ________________ et ________________ |
| **Commander** | Envoyer les signaux aux actionneurs | ________________ |

### La chaîne d'énergie — Deux actionneurs, deux conversions

Ce système a la particularité d'avoir **deux actionneurs** qui convertissent l'énergie sous deux formes différentes.

| Fonction | Composant | Conversion d'énergie |
| --- | --- | --- |
| **Alimenter** | USB / batterie | Énergie électrique |
| **Convertir (1)** | LED rouge | Électrique → ________________ |
| **Convertir (2)** | Buzzer | Électrique → ________________ |

### Comparaison des 3 systèmes (A1, A2, A3)

Complète ce tableau récapitulatif des 3 activités :

| | A1 — Couloir | A2 — Salon | A3 — Cuisine |
| --- | --- | --- | --- |
| **Capteur** | Ultrason | ________________ | ________________ |
| **Grandeur mesurée** | Distance | ________________ | ________________ |
| **Type de signal** | Numérique | ________________ | ________________ |
| **Actionneur(s)** | LED | ________________ | ________________ |
| **Type de commande** | ON / OFF | ________________ | ________________ |
| **Économie réalisée** | Éclairage ciblé | ________________ | ________________ |

---

## 5. L'économie d'énergie réalisée (OST 31 · OST 32)

### Le principe de l'économie

Plutôt que de faire tourner la VMC **24h/24** (consommation permanente), le système d'alerte permet de ventiler **uniquement quand c'est nécessaire**, en ouvrant les fenêtres aux moments critiques.

### 🔵 Version 5ème — Estimation simple

| Situation | Durée VMC / jour | Puissance | Consommation / jour | Consommation / an |
| --- | --- | --- | --- | --- |
| **VMC permanente** | 24 h | 30 W | ____ Wh | ____ kWh |
| **Ventilation ciblée** | 4 h | 30 W | ____ Wh | ____ kWh |
| **Économie** | — | — | ____ Wh | ____ kWh |

### 🟠 Version 4ème — Analyse coût/bénéfice

Calcule l'économie annuelle en euros (tarif 0,25 €/kWh) :

> Économie annuelle = ________ kWh × 0,25 € = ________ €

Le système d'alerte (Arduino + MQ-135 + LED + buzzer) coûte environ **15 €** en composants. En combien de temps est-il « rentabilisé » ?

> Temps de retour = 15 € / ________ €/an = ________ ans

Est-ce un investissement intéressant pour la famille Kiagi ? Justifie :

> ___________________________________________________________________________
>
> ___________________________________________________________________________

---

## ✅ L'essentiel en 5 points

1. Un **capteur de gaz** (MQ-135) détecte les polluants dans l'air et envoie un **signal analogique** proportionnel à la pollution.
2. Le programme compare la valeur du capteur à un **seuil** : au-dessus → alerte, en-dessous → tout va bien.
3. Un système peut avoir **plusieurs actionneurs** de natures différentes (LED = visuel, buzzer = sonore) pour une même alerte.
4. Le choix du **seuil d'alerte** influence la **sensibilité** du système : trop bas → fausses alertes, trop haut → détection tardive.
5. Un système automatique de surveillance permet de **réduire la consommation** d'appareils énergivores (VMC) en ne les activant que quand c'est nécessaire.
