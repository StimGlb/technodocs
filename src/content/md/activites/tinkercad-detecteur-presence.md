# Tinkercad Circuits – Simuler un éclairage automatique

**Nom :** ………………………… **Prénom :** ………………………… **Classe :** ………… **Date :** …………

---

## 🏠 Mise en situation

La famille Kiagi veut installer un éclairage automatique dans leur entrée : la lumière s'allume quand quelqu'un arrive, et s'éteint toute seule après quelques secondes. Plus personne n'oublie d'éteindre !

> **Ta mission :** Simuler ce système dans Tinkercad Circuits, comprendre comment il fonctionne, puis modifier son comportement en complétant le programme.

---

## ✅ L'activité sera réussie si…

- Je sais identifier les constituants de la chaîne d'information du montage
- Je sais associer chaque composant à sa fonction dans la chaîne d'énergie
- Je sais compléter un programme Arduino pour modifier le comportement du système
- Je sais tester et valider mon programme dans le simulateur

---

## Partie 1 – Découvrir le montage

### Accès au circuit

Ouvre Tinkercad et charge le circuit partagé par ton professeur (**lien ou code de classe fourni**).

Tu dois voir apparaître le montage suivant :

```
        ┌─────────────────────────────────────┐
        │           ARDUINO UNO               │
        │                                     │
        │  ~9 ──────────────── Trig (HC-SR04) │
        │  ~10 ─────────────── Echo (HC-SR04) │
        │  ~11 ──── R 220Ω ──── LED (+)       │
        │  GND ──────────────── LED (-)        │
        │  5V  ──────────────── VCC (HC-SR04) │
        │  GND ──────────────── GND (HC-SR04) │
        └─────────────────────────────────────┘
```

> 💡 Le **HC-SR04** est un capteur ultrason : il envoie une impulsion sonore et mesure le temps qu'elle met à revenir après avoir rebondi sur un obstacle. Il calcule ainsi une **distance**.

---

### 1.1 – Identifier les composants

Complète le tableau en associant chaque composant à sa fonction dans le système.

| Composant | Rôle dans le système | Appartient à la chaîne… |
|-----------|---------------------|------------------------|
| Arduino Uno | | ☐ Énergie  ☐ Information  ☐ Les deux |
| Capteur HC-SR04 | | ☐ Énergie  ☐ Information |
| LED | | ☐ Énergie  ☐ Information |
| Résistance 220Ω | Protège la LED contre un excès de courant | ☐ Énergie  ☐ Information |

---

### 1.2 – Chaîne d'information du système

Complète le schéma bloc de la chaîne d'information :

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   CAPTEUR    │────▶│              │────▶│              │────▶│  ACTIONNEUR  │
│              │     │  TRAITEMENT  │     │   DÉCISION   │     │              │
│ HC-SR04 :    │     │              │     │              │     │ LED :        │
│ mesure la    │     │ Arduino :    │     │ Si distance  │     │              │
│ ………………………… │     │ ………………………… │     │ ………………………… │     │ ………………………… │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## Partie 2 – Comprendre le programme

Voici le programme Arduino déjà chargé dans le simulateur. **Lis-le attentivement** avant de répondre aux questions.

```cpp
// --- Déclaration des broches ---
int brocheEcho = 10;
int brocheTrig = 9;
int brocheLED  = 11;

// --- Déclaration des variables ---
long duree;
int distance;
int seuilPresence = 50;    // distance en cm
int tempsAllumage = 5000;  // durée d'allumage en millisecondes

void setup() {
  pinMode(brocheTrig, OUTPUT);
  pinMode(brocheEcho, INPUT);
  pinMode(brocheLED, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  // --- Étape 1 : envoyer une impulsion ultrason ---
  digitalWrite(brocheTrig, LOW);
  delayMicroseconds(2);
  digitalWrite(brocheTrig, HIGH);
  delayMicroseconds(10);
  digitalWrite(brocheTrig, LOW);

  // --- Étape 2 : mesurer le temps de retour ---
  duree = pulseIn(brocheEcho, HIGH);

  // --- Étape 3 : calculer la distance ---
  distance = duree * 0.034 / 2;
  Serial.print("Distance : ");
  Serial.println(distance);

  // --- Étape 4 : décision ---
  if (distance < seuilPresence) {
    digitalWrite(brocheLED, HIGH);   // allumer la LED
    delay(tempsAllumage);            // attendre
    digitalWrite(brocheLED, LOW);    // éteindre la LED
  }

}
```

---

### 2.1 – Lire et comprendre le programme

Réponds aux questions suivantes sans modifier le programme.

**a)** Quelle variable contient la distance mesurée par le capteur ?

> ………………………………………………………………………………………………………………………

**b)** À quelle distance (en cm) la LED s'allume-t-elle ?

> La LED s'allume quand la distance est **inférieure à ………… cm**.

**c)** Combien de temps la LED reste-t-elle allumée ? (Convertis en secondes)

> `tempsAllumage = 5000` millisecondes = **………… secondes**

**d)** Que se passe-t-il si personne ne passe devant le capteur ? La LED reste-t-elle allumée ?

> ………………………………………………………………………………………………………………………

---

### 2.2 – Tester le programme dans le simulateur

1. Clique sur **"Démarrer la simulation"** dans Tinkercad.
2. Clique sur le capteur HC-SR04 pour faire apparaître son curseur de distance.
3. Fais varier la distance et observe le comportement de la LED.

**Note tes observations :**

| Distance simulée | LED allumée ? | Correspond à ce que tu attendais ? |
|-----------------|--------------|-----------------------------------|
| 20 cm | | ☐ Oui  ☐ Non |
| 50 cm | | ☐ Oui  ☐ Non |
| 80 cm | | ☐ Oui  ☐ Non |

---

## Partie 3 – Compléter et modifier le programme

La famille Kiagi a deux demandes supplémentaires. Pour chacune, **complète le code à trous** correspondant.

---

### Modification 1 – Changer le seuil de détection

La famille veut que la lumière s'allume dès que quelqu'un est à **moins de 80 cm** (et non 50 cm), pour anticiper l'arrivée dans le couloir.

**Trouve et modifie la ligne concernée dans le programme :**

```cpp
// Ligne à modifier :
int seuilPresence = __________ ;  // nouvelle valeur en cm
```

> Valeur saisie : ………………………………

Teste dans le simulateur et note ce qui change :

> ………………………………………………………………………………………………………………………

---

### Modification 2 – Réduire la durée d'allumage

Pour économiser encore plus d'énergie, la LED ne doit rester allumée que **3 secondes** (au lieu de 5).

```cpp
// Ligne à modifier :
int tempsAllumage = __________ ;  // en millisecondes (1 seconde = 1000 ms)
```

> Valeur saisie : ………………………………

---

### Modification 3 – Ajouter un message dans le moniteur série *(défi)*

Complète le bloc `if` pour qu'un message s'affiche dans le moniteur série quand la LED s'allume.

```cpp
if (distance < seuilPresence) {
  digitalWrite(brocheLED, HIGH);
  Serial.println( __________ );  // message à afficher
  delay(tempsAllumage);
  digitalWrite(brocheLED, LOW);
  Serial.println( __________ );  // message à afficher quand la LED s'éteint
}
```

> Message choisi à l'allumage : ………………………………………………………………………………
> Message choisi à l'extinction : ………………………………………………………………………………

---

## Partie 4 – Lien avec la séquence

**4.1** Ce système utilise-t-il de l'énergie quand personne n'est présent ? Compare avec une lampe classique toujours allumée.

> ………………………………………………………………………………………………………………………
> ………………………………………………………………………………………………………………………

**4.2** Dans le tableau de consommation de la famille Kiagi (séance 1), quel poste ce système permet-il de réduire principalement ?

> ………………………………………………………………………………………………………………………

**4.3** Nomme **un avantage** et **une limite** de ce système par rapport à une simple minuterie mécanique.

| | Détecteur de présence (HC-SR04) | Minuterie mécanique |
|---|---|---|
| Avantage | | |
| Limite | | |

---

## 🔑 Ce que je retiens

Dans ce système, le capteur HC-SR04 appartient à la **chaîne d'………………………………** .

La LED appartient à la **chaîne d'………………………………** .

L'Arduino joue le rôle de **………………………………** : il reçoit une information du capteur et décide d'allumer ou d'éteindre la LED.

Ce type de système permet de réduire la consommation électrique en évitant la **………………………………** des appareils.
