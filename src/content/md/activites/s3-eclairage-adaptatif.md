# Éclairage adaptatif jour/nuit

## 1. La situation de la famille Kiagi (OST 31)

Dans le salon de la maison Kiagi, la lampe LED est toujours réglée à **pleine puissance**, même en pleine journée quand le soleil entre par les fenêtres. La famille veut un **éclairage intelligent** qui s'adapte automatiquement : fort quand il fait sombre, faible quand il fait clair, éteint en plein soleil.

Un **capteur de luminosité** (photorésistance ou LDR) est un composant dont la résistance varie selon l'intensité lumineuse. Un signal **PWM** (Pulse Width Modulation) permet de faire varier la luminosité d'une LED de façon progressive, contrairement à un simple ON/OFF.

### Vocabulaire clé

| Terme | Définition |
| --- | --- |
| **Photorésistance (LDR)** | Capteur analogique dont la résistance diminue quand la lumière augmente |
| **Signal analogique** | Signal qui varie de façon continue (ici : de 0 à 1023 sur l'Arduino) |
| **PWM** | Technique qui fait varier rapidement un signal ON/OFF pour simuler une tension variable (0 à 255 sur Arduino) |
| **Pont diviseur** | Montage avec deux résistances qui permet de convertir une variation de résistance en variation de tension |

---

## 2. Construire le circuit sur Tinkercad Circuits (SFC 13)

Tu vas construire un prototype virtuel du système d'éclairage adaptatif sur Tinkercad Circuits.

### Composants à placer

| Composant | Où le trouver dans Tinkercad | Réglage |
| --- | --- | --- |
| **Arduino Uno** | Composants → Arduino | — |
| **Photorésistance** | Composants → Photoresistor | Une patte → 5V, l'autre → A0 |
| **Résistance 4.7 kΩ** | Composants → Resistor | Entre la patte A0 de la LDR et GND (pont diviseur) |
| **LED** | Composants → LED | Anode → pin 9 (PWM ~) |
| **Résistance 220 Ω** | Composants → Resistor | En série avec la LED |

### Le pont diviseur de tension

La photorésistance ne peut pas être branchée directement sur l'Arduino. Il faut un **pont diviseur** : la LDR est en série avec une résistance fixe de 4.7 kΩ, et l'Arduino lit la tension au point milieu.

```
5V ──── LDR ──┬── Résistance 4.7 kΩ ──── GND
              │
              └── Arduino pin A0 (lecture)
```

### 🔵 Version 5ème — Câblage guidé

Suis le schéma ci-dessous :

```
Arduino 5V     ──── Patte 1 (photorésistance)
Patte 2 (LDR)  ──┬── Résistance 4.7 kΩ ──── Arduino GND
                  └── Arduino A0

Arduino pin 9 (~) ── Résistance 220 Ω ── Anode LED
Arduino GND       ──────────────────────── Cathode LED
```

⚠️ **Attention** : La LED doit être branchée sur une pin **PWM** (marquée ~ sur l'Arduino : pins 3, 5, 6, 9, 10, 11). Sinon, la variation de luminosité ne fonctionnera pas.

### 🟠 Version 4ème — Câblage autonome

À partir du schéma du pont diviseur et du tableau des composants, réalise le câblage. Justifie le choix de la pin pour la LED :

> J'ai choisi la pin ____ parce que ________________________________________________

> ☑️ Validation professeur : ____________

---

## 3. Programmer le système (SFC 31 · SFC 13)

Le programme doit adapter la luminosité de la LED en fonction de la lumière ambiante.

### Le comportement attendu

- Quand il fait **sombre** → la LED brille **fort**
- Quand il fait **clair** → la LED brille **faiblement**
- Quand il fait **plein soleil** → la LED est **éteinte**

La relation est **inversée** : plus il y a de lumière, moins la LED doit éclairer.

### 🔵 Version 5ème — Programmation par blocs

Construis le programme suivant dans l'éditeur de blocs :

| Étape | Action | Réglage |
| --- | --- | --- |
| **1** | Lire la valeur analogique sur A0 | Stocker dans une variable `lumiere` (valeur de 0 à 1023) |
| **2** | Convertir la valeur | Utiliser le bloc `map` pour transformer [0–1023] en [255–0] (inversé !) |
| **3** | Écrire la valeur sur pin 9 | Utiliser le bloc `analogWrite` avec la valeur convertie |
| **4** | Attendre 100 ms | Pause entre deux lectures |

Lance la simulation. Clique sur la photorésistance et utilise le **curseur de luminosité** pour simuler le jour et la nuit.

### 🟠 Version 4ème — Programmation en code

Complète le programme ci-dessous :

```cpp
const int ldrPin = A0;
const int ledPin = ____;    // Quelle pin PWM ?

int valeurLumiere;
int luminositeLed;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  valeurLumiere = analogRead(____);   // Quel pin lire ?

  // Conversion inversée : sombre → LED forte, clair → LED faible
  luminositeLed = map(valeurLumiere, 0, 1023, ____, ____);
  //                                          ↑max  ↑min (inversé !)

  analogWrite(ledPin, luminositeLed);

  Serial.print("Lumiere : ");
  Serial.print(valeurLumiere);
  Serial.print(" → LED : ");
  Serial.println(luminositeLed);

  delay(100);
}
```

### Tester et valider

| Test | Curseur luminosité | Valeur A0 attendue | LED attendue | Conforme ? |
| --- | --- | --- | --- | --- |
| Nuit totale | À 0 % | ~ 0 | Pleine puissance (255) | |
| Pénombre | À 50 % | ~ 512 | Moyenne (~ 127) | |
| Plein soleil | À 100 % | ~ 1023 | Éteinte (0) | |

---

## 4. La chaîne d'information du système (SFC 13 · SFC 11)

### La chaîne d'information — Identifier les constituants

| Fonction | Rôle | Composant dans notre système |
| --- | --- | --- |
| **Acquérir** | Capter la luminosité ambiante | ________________ |
| **Traiter** | Calculer la luminosité de la LED (map inversé) | ________________ |
| **Communiquer** | Afficher les valeurs sur le moniteur série | ________________ |
| **Commander** | Envoyer le signal PWM à la LED | ________________ |

### Capteur analogique vs numérique

Le capteur ultrason de l'activité A1 donnait une information de type **tout ou rien** (personne présente ou absente). La photorésistance donne une information **continue** (toutes les nuances entre sombre et lumineux).

Complète le tableau comparatif :

| Caractéristique | Capteur ultrason (A1) | Photorésistance (A2) |
| --- | --- | --- |
| **Type de signal** | ________________ | ________________ |
| **Valeurs possibles** | Distance en cm | ________________ |
| **Type de commande LED** | ON / OFF (tout ou rien) | ________________ |
| **Fonction Arduino** | `digitalRead` / `digitalWrite` | ________________ / ________________ |

### La chaîne d'énergie — Le dosage de l'énergie

| Fonction | Composant | Particularité |
| --- | --- | --- |
| **Alimenter** | Câble USB / batterie | Énergie électrique constante |
| **Distribuer** | Arduino | — |
| **Convertir** | LED (via PWM) | Énergie électrique → lumineuse, **dosée** proportionnellement |

---

## 5. L'économie d'énergie réalisée (OST 31 · OST 32)

### Le principe de l'économie

Avec un éclairage classique (ON/OFF), la LED consomme **100 % de sa puissance** dès qu'elle est allumée. Avec un éclairage adaptatif (PWM), elle ne consomme que **ce qui est nécessaire**.

### 🔵 Version 5ème — Estimation simple

Si la LED du salon fonctionne 8 heures par jour et que l'éclairage adaptatif permet de réduire la puissance moyenne à **40 %** au lieu de 100 % :

| Situation | Puissance moyenne | Consommation / jour (8h) | Consommation / an |
| --- | --- | --- | --- |
| **Sans** adaptateur | 9 W (100 %) | ____ Wh | ____ kWh |
| **Avec** adaptateur | 3,6 W (40 %) | ____ Wh | ____ kWh |
| **Économie** | — | ____ Wh | ____ kWh |

### 🟠 Version 4ème — Estimation argumentée

En supposant que sur une journée type, la luminosité ambiante se répartit ainsi :

| Période | Durée | Luminosité ambiante | Puissance LED nécessaire |
| --- | --- | --- | --- |
| Nuit (volets fermés) | 2 h | Très faible | 9 W (100 %) |
| Matin / Soir | 4 h | Moyenne | 4,5 W (50 %) |
| Journée (soleil) | 2 h | Forte | 0 W (0 %) |

Calcule la consommation quotidienne avec le système adaptatif :

> E = (____W × ____h) + (____W × ____h) + (____W × ____h) = ________ Wh

Compare avec la consommation sans système (9 W × 8 h = 72 Wh). Calcule le pourcentage d'économie :

> Économie = (________ – ________) / ________ × 100 = ________ %

---

## ✅ L'essentiel en 5 points

1. Une **photorésistance** (LDR) est un capteur **analogique** dont la résistance varie en fonction de la lumière.
2. Le signal **PWM** permet de faire varier la luminosité d'une LED de façon **progressive** (0 à 255).
3. La fonction **`map()`** de l'Arduino convertit une plage de valeurs en une autre — ici en **inversant** le sens (sombre → LED forte).
4. Un éclairage **adaptatif** consomme uniquement la puissance nécessaire, contrairement à un éclairage ON/OFF.
5. La **chaîne d'information** (capteur → traitement → commande PWM) permet de **doser** l'énergie en fonction des conditions réelles.
