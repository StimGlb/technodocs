# Éclairage automatique de couloir

## 1. La situation de la famille Kiagi (OST 31)

Le couloir de la maison Kiagi est éclairé **24h/24** avec une lampe LED de 9 W. Même quand personne ne passe, la lumière reste allumée. La famille veut un **système automatique** qui allume la lumière uniquement quand quelqu'un est présent dans le couloir.

Un **capteur** est un composant qui détecte une grandeur physique (distance, lumière, mouvement…) et la convertit en signal électrique. Un **actionneur** est un composant qui réalise une action physique (éclairer, tourner, chauffer…). Exemple : un capteur ultrason détecte une personne → la LED s'allume.

### Vocabulaire clé

| Terme | Définition |
| --- | --- |
| **Capteur ultrason** | Composant qui mesure une distance en envoyant des ondes sonores et en mesurant le temps de retour |
| **LED** | Diode électroluminescente, actionneur qui convertit l'énergie électrique en lumière |
| **Microcontrôleur** | Petit ordinateur (Arduino) qui exécute un programme pour traiter les données des capteurs |
| **Seuil** | Valeur limite au-delà de laquelle le système change de comportement (ici : distance de détection) |

---

## 2. Construire le circuit sur Tinkercad Circuits (SFC 13)

Tu vas construire un prototype virtuel du système d'éclairage automatique sur Tinkercad Circuits.

### Composants à placer

| Composant | Où le trouver dans Tinkercad | Réglage |
| --- | --- | --- |
| **Arduino Uno** | Composants → Arduino | — |
| **Capteur ultrason** | Composants → Ultrasonic | Trig → pin 9, Echo → pin 10 |
| **LED** | Composants → LED | Anode → pin 13 (via résistance 220 Ω) |
| **Résistance 220 Ω** | Composants → Resistor | En série avec la LED |

### Câblage

Relie les composants à l'Arduino en respectant les branchements du tableau. N'oublie pas de connecter le **VCC** du capteur au **5V** de l'Arduino et le **GND** au **GND**.

⚠️ **Attention** : La LED doit toujours être protégée par une résistance. Sans résistance, elle grille (Tinkercad affiche un symbole d'avertissement).

### 🔵 Version 5ème — Câblage guidé

Suis le schéma ci-dessous pour câbler ton circuit :

```
Arduino pin 9  ──────── Trig (capteur ultrason)
Arduino pin 10 ──────── Echo (capteur ultrason)
Arduino 5V     ──────── VCC  (capteur ultrason)
Arduino GND    ──────── GND  (capteur ultrason)

Arduino pin 13 ── Résistance 220 Ω ── Anode LED
Arduino GND    ──────────────────────── Cathode LED
```

### 🟠 Version 4ème — Câblage autonome

À partir du tableau des composants, réalise le câblage toi-même. Avant de lancer la simulation, fais valider ton montage par le professeur.

> ☑️ Validation professeur : ____________

---

## 3. Programmer le système (SFC 31 · SFC 13)

Le programme doit faire fonctionner le système selon cette logique :

### Le comportement attendu

- Si une personne est détectée à **moins de 100 cm** → la LED **s'allume**
- Si personne n'est détecté → la LED **s'éteint**

### 🔵 Version 5ème — Programmation par blocs

Ouvre l'éditeur de blocs dans Tinkercad (bouton « Code » → « Blocs »). Construis le programme suivant :

| Étape | Bloc à utiliser | Réglage |
| --- | --- | --- |
| **1** | set pin 13 to OUTPUT | Configuration de la LED |
| **2** | read ultrasonic distance (trig 9, echo 10) | Lire la distance |
| **3** | if distance < 100 | Condition de détection |
| **4** | set pin 13 to HIGH (dans le if) | Allumer la LED |
| **5** | set pin 13 to LOW (dans le else) | Éteindre la LED |
| **6** | wait 200 milliseconds | Pause entre deux mesures |

Lance la simulation (▶️). Clique sur le capteur ultrason et déplace l'objet pour simuler une personne qui s'approche.

### 🟠 Version 4ème — Programmation en code

Bascule en vue « Code » → « Texte ». Complète le programme ci-dessous en remplaçant les `____` :

```cpp
const int trigPin = 9;
const int echoPin = 10;
const int ledPin = ____;     // Quelle pin pour la LED ?

long duree;
int distance;

void setup() {
  pinMode(trigPin, ____);    // Le trig envoie un signal : INPUT ou OUTPUT ?
  pinMode(echoPin, ____);    // L'echo reçoit un signal : INPUT ou OUTPUT ?
  pinMode(ledPin, ____);     // La LED reçoit un ordre : INPUT ou OUTPUT ?
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duree = pulseIn(echoPin, HIGH);
  distance = duree * 0.034 / 2;    // Conversion en cm

  if (distance ____ 100) {          // Quel opérateur : < ou > ?
    digitalWrite(ledPin, ____);     // Personne détectée → ON ou OFF ?
  } else {
    digitalWrite(ledPin, ____);     // Personne absente → ON ou OFF ?
  }

  delay(200);
}
```

### Tester et valider

Lance la simulation et vérifie que le système fonctionne en déplaçant l'objet devant le capteur. Note tes observations :

| Test | Distance simulée | LED allumée ? | Conforme ? |
| --- | --- | --- | --- |
| Personne proche | ~ 50 cm | | |
| Personne éloignée | ~ 150 cm | | |
| Personne à la limite | ~ 100 cm | | |

---

## 4. La chaîne d'information du système (SFC 13 · SFC 11)

Le système d'éclairage automatique utilise une **chaîne d'information** pour décider quand allumer la lumière, et une **chaîne d'énergie** pour alimenter la LED.

### La chaîne d'information — Identifier les constituants

Complète le tableau en indiquant quel composant remplit chaque fonction :

| Fonction | Rôle | Composant dans notre système |
| --- | --- | --- |
| **Acquérir** | Capter une grandeur physique | ________________ |
| **Traiter** | Analyser les données et décider | ________________ |
| **Communiquer** | Informer l'utilisateur | ________________ |
| **Commander** | Envoyer un ordre à la chaîne d'énergie | ________________ |

### La chaîne d'énergie — Identifier les formes d'énergie

| Fonction | Composant | Forme d'énergie |
| --- | --- | --- |
| **Alimenter** | Câble USB / batterie | Énergie ____________ |
| **Distribuer** | Arduino | — |
| **Convertir** | LED | Énergie ____________ → Énergie ____________ |

---

## 5. L'économie d'énergie réalisée (OST 31 · OST 32)

### Calculer l'économie

La lampe LED du couloir consomme **9 W**. Le couloir est traversé en moyenne **2 heures par jour** (passages cumulés). Sans le système automatique, la lampe reste allumée **24h/24**.

| Situation | Durée d'éclairage / jour | Consommation / jour | Consommation / an (365 j) |
| --- | --- | --- | --- |
| **Sans** système automatique | 24 h | ____ Wh | ____ kWh |
| **Avec** système automatique | 2 h | ____ Wh | ____ kWh |
| **Économie réalisée** | — | ____ Wh | ____ kWh |

### L'impact sur la facture

Au tarif de **0,25 € par kWh**, calcule l'économie annuelle en euros :

> Économie annuelle = ________ kWh × 0,25 € = ________ €

### Le système automatique est-il un bon choix ?

Rédige 2 à 3 phrases pour expliquer pourquoi ce système est intéressant pour la famille Kiagi. Appuie-toi sur tes calculs.

> ___________________________________________________________________________
>
> ___________________________________________________________________________
>
> ___________________________________________________________________________

---

## ✅ L'essentiel en 5 points

1. Un **capteur ultrason** mesure une distance en envoyant des ondes sonores et en mesurant leur temps de retour.
2. Le **microcontrôleur** (Arduino) exécute un **programme** qui compare la distance mesurée à un **seuil** pour décider d'allumer ou d'éteindre la LED.
3. La **chaîne d'information** (acquérir → traiter → communiquer → commander) **pilote** la chaîne d'énergie.
4. Un système automatique permet de réduire la consommation en n'éclairant que **lorsque c'est nécessaire**.
5. Le choix d'un système technique doit prendre en compte son **impact énergétique** et son **coût** sur la durée.
