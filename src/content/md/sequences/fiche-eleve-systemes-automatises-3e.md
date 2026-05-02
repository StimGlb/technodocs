---
titre: Fiche élève 3ème — Concevoir des systèmes automatisés intelligents
sequence: habitat-energie
niveau: 3eme
type: activite
seance: 3
duree: 1h30
competences:
  - OST 31
  - SFC 11
  - SFC 13
  - SFC 31
  - CCRI 31
themes:
  - Usages et Interactions
  - Structure et Fonctionnement
  - Création et Innovation
materiel:
  - Ordinateur avec Tinkercad Circuits
  - Compte élève Tinkercad
  - Carte Arduino Uno (passage matériel réel)
  - Capteurs HC-SR04, MQ-135 ou potentiomètre, photorésistance
  - LEDs, buzzer, résistances, breadboard, câbles
differentiation: 3eme-concepteur
statut: brouillon
tags:
  - techno/3eme
  - techno/habitat-energie
  - techno/tinkercad
  - techno/arduino
  - techno/programmation
  - techno/capteurs
  - techno/intercalaire
  - techno/dnb-revision
date: "{{date}}"
---

<div class="intercalaire">

# 🏠⚡ Concevoir des systèmes automatisés intelligents

### Niveau 3ème — Séance 3 · 1h30 · Travail en binôme

</div>

---

## 🎯 Mission de la séance

> La famille Kiagi a déjà installé des LED. Mais maintenant, elle veut aller plus loin : avoir des systèmes **structurés, réutilisables, robustes**, qu'elle pourra installer dans **plusieurs pièces** sans tout reprogrammer à chaque fois.
>
> **Aujourd'hui, tu vas concevoir 3 systèmes automatisés professionnels** : code modulaire (sous-programmes/fonctions), gestion d'historiques (listes), interface utilisateur (IHM), protocole de test mesurable, et **transposition du virtuel au réel** (Tinkercad → Arduino physique).

### Ce que tu vas savoir faire à la fin

À la fin de la séance, tu seras capable de :

- **Décrire** une chaîne d'information en associant grandeurs analogiques et données exploitables (SFC 13)
- **Élaborer** un schéma bloc complet de la chaîne d'énergie d'un OST (SFC 11)
- **Programmer** un algorithme structuré (sous-programmes, fonctions) lié à une nouvelle fonctionnalité (SFC 31)
- **Concevoir et mettre au point** un programme commandant un système réel avec IHM (CCRI 31)
- **Évaluer** un OST selon des critères mesurables (performance, coût, indice de réparabilité) (OST 31)

### Matériel par poste

- 1 ordinateur connecté à Tinkercad Circuits
- 1 carte Arduino Uno + capteurs + breadboard (étape de transposition)
- Cette fiche, calculatrice, crayon

---

<div class="page-break"></div>

## 📋 Sommaire des 3 activités

| Activité | Système Kiagi                          |   Capteur(s)    | Fonctionnalité avancée             | Page |
| :------: | :------------------------------------- | :-------------: | :--------------------------------- | :--: |
|  **A1**  | Éclairage couloir intelligent          |   📏 Ultrason   | Sous-programmes + temporisation    |  3   |
|  **A2**  | Lampe adaptative avec mémoire          | ☀️ LDR + bouton | Listes + hystérésis + IHM          |  6   |
|  **A3**  | Station qualité d'air multi-capteurs   |    🌬️ + 🌡️    | Fusion de données + journalisation |  9   |
|  **🔧**  | Transposition Tinkercad → Arduino réel |        —        | Recalibration et protocole de test |  12  |

> 🔴 **Niveau 3ème — version concepteur** : tu reçois un cahier des charges, tu **conçois** la solution. Le code n'est pas fourni, tu le **structures** toi-même avec des sous-programmes nommés. À la fin, tu **transposes** ton montage virtuel sur Arduino réel et tu **mesures la performance** de ton système.

---

<div class="page-break"></div>

# Activité A1 — Éclairage couloir intelligent 📏💡

## 📋 Cahier des charges

> **Demande Kiagi** : Système d'éclairage du couloir avec **3 améliorations** par rapport à un simple détecteur on/off :
>
> 1. La LED doit **s'allumer immédiatement** quand quelqu'un est détecté.
> 2. La LED doit **rester allumée** au moins **5 secondes** après la dernière détection (pour les pas lents).
> 3. Le code doit être **réutilisable** : on doit pouvoir copier les fonctions pour les utiliser dans d'autres pièces sans tout reprendre.

## 🔧 Vocabulaire à maîtriser

| Mot | Définition à retenir |
|:---|:---|
| **Sous-programme / fonction** | Bloc de code **nommé**, **paramétrable**, qui réalise une **tâche précise**. On l'**appelle** depuis le programme principal. Permet la **modularité**. |
| **Modularité** | Qualité d'un programme **découpé** en blocs indépendants. Facilite la **lecture**, le **test** et la **réutilisation**. |
| **Temporisation** | Délai programmé pendant lequel le système maintient un état (ex : LED allumée 5 s après la dernière détection). |
| **Variable d'état** | Variable qui mémorise une **information dans le temps** (ex : `dernierePresence` = horodatage de la dernière détection). |

## 🔍 Étape 1 — Concevoir la chaîne d'information complète

> ✏️ **Élabore** un schéma bloc complet de la chaîne d'information du système, en précisant les **grandeurs** échangées :

```


  Phénomène       Capteur          Signal           Microcontrôleur     Signal           Actionneur       Effet
   physique                       (grandeur)                            (commande)                       physique
                                                                                                                
  ............    ............    ............    ............         ............    ............    ............
                                                                                                                
                                  (préciser :                            (préciser :                                
                                  analogique ou                          numérique ou                                
                                  numérique ?                            PWM ?)                                      
                                  unité ?)                                                                           


```

> ✏️ **Précise les grandeurs et leurs natures** :
>
> - Grandeur acquise par le capteur : ____________________________________________________
>
> - Type de signal envoyé à l'Arduino (analogique/numérique) : __________________________
>
> - Type de signal envoyé à la LED : ____________________________________________________
>
> - Donnée exploitable produite par l'Arduino : __________________________________________

## 💻 Étape 2 — Concevoir l'algorithme en pseudo-code

> ✏️ **Avant d'écrire le code C, rédige l'algorithme** que ton programme doit suivre :

```
Algorithme ÉCLAIRAGE_COULOIR_INTELLIGENT

  Variables : ___________________________________________________________________________
              ___________________________________________________________________________

  Sous-programme lireDistance() :
    ____________________________________________________________________________________
    Retourne : ________________________________________________________________________

  Sous-programme gererEclairage(seuil, dureeMaintien) :
    ____________________________________________________________________________________
    ____________________________________________________________________________________

  Programme principal :
    Répéter :
      ____________________________________________________________________________________
      ____________________________________________________________________________________
    Fin répéter
```

<div class="page-break"></div>

## 💻 Étape 3 — Implémenter le programme structuré

> ✏️ **Écris** le programme Arduino correspondant (utilise tes sous-programmes) :

```c
// Programme A1 v3 — éclairage couloir intelligent
// Fonctions modulaires réutilisables

const int trigPin = 9;
const int echoPin = 10;
const int ledPin = 13;

unsigned long ___________________ = 0;  // variable d'état

void setup() {
  // ____________________________________________________
  // ____________________________________________________
  // ____________________________________________________
}

// ───────────── SOUS-PROGRAMME 1 ─────────────
long lireDistance() {
  // ____________________________________________________
  // ____________________________________________________
  // ____________________________________________________
}

// ───────────── SOUS-PROGRAMME 2 ─────────────
void gererEclairage(int seuil, unsigned long dureeMaintien) {
  long d = lireDistance();
  if (d < seuil) {
    // ____________________________________________________
    // ____________________________________________________
  }
  if (___________________________________________________) {
    digitalWrite(ledPin, LOW);
  }
}

// ───────────── PROGRAMME PRINCIPAL ─────────────
void loop() {
  gererEclairage(_____, _____);  // appel avec paramètres
  delay(50);
}
```

> ✏️ **Justifie deux choix de conception** :
>
> 1. Pourquoi avoir séparé `lireDistance()` du reste du code ?
>
> _______________________________________________________________________________________
>
> 2. Pourquoi `gererEclairage` reçoit-il **deux paramètres** au lieu d'avoir des constantes en dur ?
>
> _______________________________________________________________________________________

## 🧪 Étape 4 — Protocole de test mesurable

> ✏️ **Conçois un protocole** pour évaluer la **performance** de ton système. Tu dois mesurer le **taux de fausses extinctions** (LED qui s'éteint alors qu'on est encore dans le couloir).

| # | Étape du protocole | Résultat mesuré |
|:---:|:---|:---:|
| 1 | _____________________________________________ | _________________________ |
| 2 | _____________________________________________ | _________________________ |
| 3 | _____________________________________________ | _________________________ |

> ✏️ **Critère de validation** : ton système est validé si moins de **____ %** des passages provoquent une extinction prématurée.
>
> ✏️ **Résultat de tes tests** : Taux de fausses extinctions mesuré = ______ %. Système validé ? **OUI / NON**

---

<div class="page-break"></div>

# Activité A2 — Lampe adaptative avec mémoire ☀️💡⚙️

## 📋 Cahier des charges

> **Demande Kiagi** : Lampe du salon avec **3 améliorations professionnelles** :
>
> 1. **Anti-clignotement** : la lampe ne doit pas papillonner quand la luminosité oscille autour du seuil (problème **d'hystérésis**).
> 2. **Mémoire des conditions récentes** : le système calcule la **moyenne** sur les **10 dernières mesures** pour stabiliser la décision.
> 3. **IHM** : un **bouton-poussoir** permet à l'utilisateur de basculer entre **3 modes** : `AUTO` (asservi à la luminosité), `JOUR_FORCE` (LED éteinte), `NUIT_FORCE` (LED 100 %).

## 🔧 Vocabulaire à maîtriser

| Mot | Définition à retenir |
|:---|:---|
| **Hystérésis** | Différence entre le **seuil d'allumage** (seuilHaut) et le **seuil d'extinction** (seuilBas). Évite le clignotement quand la mesure oscille. |
| **Liste / tableau** | Structure de données qui **stocke plusieurs valeurs** dans une seule variable. On accède aux éléments par leur **indice** (0, 1, 2...). |
| **Moyenne glissante** | Moyenne calculée sur les **N dernières mesures**. Permet de **lisser** un signal bruité. |
| **IHM (Interface Homme-Machine)** | Ensemble des éléments permettant à l'utilisateur **d'interagir** avec le système (bouton, écran, voyant). |
| **Variable d'état** | Variable qui mémorise le **mode courant** du système (`AUTO`, `JOUR_FORCE`, `NUIT_FORCE`). |

## 🔍 Étape 1 — Comprendre l'hystérésis

> ✏️ **Schéma à compléter** : trace deux seuils sur le graphique de luminosité.

```
   Luminosité
        ▲
   1023 ┤
        │
        │     seuilHaut  ──╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  (allume si on dépasse)
        │
        │
        │     seuilBas   ──╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  (éteint si on descend)
        │
      0 └──────────────────────────────────────────►  Temps

   ZONE DE STABILITÉ entre seuilBas et seuilHaut
   → la LED garde son état actuel, pas de clignotement
```

> ✏️ **Réponds** :
>
> Si seuilHaut = 700 et seuilBas = 400, que se passe-t-il quand luminosité = 500 ?
>
> _______________________________________________________________________________________
>
> Pourquoi un système **sans hystérésis** (un seul seuil) provoquerait un **clignotement** quand la lumière oscille autour de 600 ?
>
> _______________________________________________________________________________________

<div class="page-break"></div>

## 💻 Étape 2 — Algorithme avec listes et IHM

> ✏️ **Conçois** l'algorithme général :

```
Algorithme LAMPE_ADAPTATIVE_INTELLIGENTE

  Variables :
    historique[10] : liste de mesures (initialisée à 0)
    indexMesure : entier (0 à 9, position courante dans la liste)
    modeCourant : "AUTO" / "JOUR_FORCE" / "NUIT_FORCE"

  Sous-programme ajouterMesure(valeur) :
    historique[indexMesure] = valeur
    indexMesure = ____________________________________________________

  Sous-programme moyenneHistorique() :
    Retourne : __________________________________________________________

  Sous-programme gererBouton() :
    Si bouton appuyé alors
      Passer modeCourant au mode suivant (AUTO → JOUR → NUIT → AUTO...)
    Fin si

  Sous-programme appliquerMode() :
    Selon modeCourant :
      "AUTO"        → utiliser la moyenne et l'hystérésis
      "JOUR_FORCE"  → __________________________________________________________
      "NUIT_FORCE"  → __________________________________________________________

  Programme principal :
    Acquérir mesure, ajouter à l'historique, gérer bouton, appliquer mode
```

## 💻 Étape 3 — Implémenter (extrait)

> ✏️ **Complète** les parties critiques du programme C :

```c
// Programme A2 v3 — lampe adaptative avec mémoire
const int ldrPin = A0;
const int ledPin = 9;
const int boutonPin = 2;

const int seuilHaut = ______;   // (1)
const int seuilBas  = ______;   // (2)

int historique[10] = {0,0,0,0,0,0,0,0,0,0};
int indexMesure = 0;

enum Mode { AUTO, JOUR_FORCE, NUIT_FORCE };
Mode modeCourant = AUTO;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(boutonPin, INPUT_PULLUP);
}

// Ajoute une mesure dans l'historique (liste circulaire)
void ajouterMesure(int valeur) {
  historique[indexMesure] = valeur;
  indexMesure = ___________________________;  // (3)
}

// Calcule la moyenne des 10 mesures
int moyenneHistorique() {
  long somme = 0;
  for (int i = 0; i < 10; i++) {
    somme += __________________;  // (4)
  }
  return somme / 10;
}

void loop() {
  ajouterMesure(analogRead(ldrPin));
  int moy = moyenneHistorique();
  // ... logique d'hystérésis et de mode à compléter
  delay(100);
}
```

> ✏️ **Choix justifiés** :
>
> (1) seuilHaut : __________  Justification : ______________________________________________
>
> (2) seuilBas : __________  Justification : _______________________________________________
>
> (3) Compléter pour que `indexMesure` revienne à 0 après 9 (liste circulaire) : ___________________________
>
> (4) Compléter : ___________________________

## 🧪 Étape 4 — Tester l'IHM

> ✏️ **Vérifie le comportement de chaque mode** en simulation :

| Mode | LED en plein jour | LED en pleine nuit | Validation |
|:---|:---:|:---:|:---:|
| `AUTO` | _________________ | _________________ | ☐ |
| `JOUR_FORCE` | _________________ | _________________ | ☐ |
| `NUIT_FORCE` | _________________ | _________________ | ☐ |

---

<div class="page-break"></div>

# Activité A3 — Station qualité d'air multi-capteurs 🌬️🌡️📊

## 📋 Cahier des charges

> **Demande Kiagi** : Station de surveillance de la cuisine **bien plus complète** que la simple alerte :
>
> 1. **Deux capteurs simultanés** : qualité de l'air (MQ-135 ou potentiomètre simulé) **ET** température (TMP36 ou potentiomètre 2).
> 2. **Fusion de données** : décision intelligente basée sur **les deux capteurs** :
>    - Air mauvais + température basse → **Aérer** (alerte VMC, pas chauffage)
>    - Air mauvais + température haute → **VMC + ouvrir fenêtre** (alerte priorité maximale)
>    - Air bon → **Pas d'alerte**
> 3. **Journalisation série** : envoi des mesures sur le **moniteur série** au format **CSV** (exploitable en tableur ensuite).

## 🔧 Vocabulaire à maîtriser

| Mot | Définition à retenir |
|:---|:---|
| **Fusion de données** | Combinaison de **plusieurs sources** d'information pour produire une décision plus **fiable** que chaque source isolée. |
| **CSV (Comma-Separated Values)** | Format de fichier texte où les **valeurs sont séparées par des virgules**. Lisible par tout tableur (LibreOffice, Excel). |
| **Moniteur série** | Outil Arduino IDE / Tinkercad qui affiche les données envoyées par la carte. Permet le **debug** et la **journalisation**. |
| **Architecture modulaire** | Programme dans lequel **chaque capteur est géré par sa propre fonction**, ce qui permet d'**ajouter facilement** un nouveau capteur. |

## 🔍 Étape 1 — Concevoir la chaîne d'information complète

> ✏️ **Schéma à élaborer** : la chaîne d'information du système multi-capteurs.

```


   Capteur 1                                                   Actionneur 1
   .........                                                   .........
            \                                                /
             \                                              /
              ▼                                            ▼
              ┌──────────────────────────────────┐
   Capteur 2  │      MICROCONTRÔLEUR ARDUINO     │     Actionneur 2
   .........  │   • acquérir les 2 mesures       │     .........
              │   • décider selon les 2 valeurs  │
              │   • envoyer au moniteur série    │     Sortie 3
              │                                  │     .........
              └──────────────────────────────────┘     (moniteur série)


```

> ✏️ **Identifie chaque élément** :
>
> Capteur 1 (air) : ___________________________________________________________________
>
> Capteur 2 (température) : ___________________________________________________________
>
> Actionneur 1 : _____________________________________________________________________
>
> Actionneur 2 : _____________________________________________________________________

## 💻 Étape 2 — Table de décision (fusion)

> ✏️ **Complète la table de décision** : que doit faire le système selon les valeurs des 2 capteurs ?

| Air (analogRead) | Température (°C) | Décision système | LED rouge | LED bleue | Buzzer | Message série |
|:---:|:---:|:---|:---:|:---:|:---:|:---|
| < 600 | _____ | Air bon, rien à faire | OFF | OFF | OFF | "OK,___,___" |
| > 600 | < 18 | Aérer + chauffer | ___ | ___ | bip court | "AERER,___,___" |
| > 600 | > 18 | **Priorité max** : VMC + fenêtre | ___ | ___ | bip continu | "URGENT,___,___" |
| > 600 | 18-22 | Aérer simple | ___ | ___ | bip court | "AERER,___,___" |

<div class="page-break"></div>

## 💻 Étape 3 — Architecture modulaire du programme

> ✏️ **Conçois** l'architecture en sous-programmes (un par capteur, un par décision) :

```c
// Programme A3 v3 — station multi-capteurs
const int gazPin = A0;
const int tempPin = A1;
const int ledRouge = 8;
const int ledBleue = 7;
const int buzzerPin = 12;

void setup() {
  Serial.begin(9600);
  Serial.println("etat,air,tempC");  // en-tête CSV
  // pinMode des sorties...
}

// ─── ACQUISITION ───────────────────────────────
int lireQualiteAir() {
  return analogRead(gazPin);
}

float lireTemperature() {
  int valeur = analogRead(tempPin);
  // Conversion TMP36 ou potentiomètre simulé → °C
  float tensionMv = valeur * (5000.0 / 1023.0);
  float tempC = ____________________________;  // (1) à compléter
  return tempC;
}

// ─── FUSION DE DONNÉES ─────────────────────────
String decider(int air, float temp) {
  if (air < 600) return "OK";
  if (temp > 22)  return "URGENT";
  if (temp < 18)  return "AERER";
  return "AERER";
}

// ─── ACTION ────────────────────────────────────
void agir(String etat) {
  // ... logique des actionneurs selon l'état
}

// ─── JOURNALISATION ────────────────────────────
void journaliser(String etat, int air, float temp) {
  Serial.print(etat);   Serial.print(",");
  Serial.print(air);    Serial.print(",");
  Serial.println(temp);
}

void loop() {
  int air = lireQualiteAir();
  float temp = lireTemperature();
  String etat = decider(air, temp);
  agir(etat);
  journaliser(etat, air, temp);
  delay(1000);
}
```

> ✏️ **Justifie l'architecture** : pourquoi avoir 4 catégories de sous-programmes (acquisition / fusion / action / journalisation) plutôt qu'un gros bloc ?
>
> _______________________________________________________________________________________
>
> _______________________________________________________________________________________

## 🧪 Étape 4 — Exploiter les données journalisées

Lance la simulation, **fais varier les capteurs**, et copie le contenu du moniteur série.

> ✏️ **Coller un extrait CSV de 5 lignes** :
>
> ```
> ___________________________________________________________________________________
> ___________________________________________________________________________________
> ___________________________________________________________________________________
> ___________________________________________________________________________________
> ___________________________________________________________________________________
> ```
>
> ✏️ **Que pourrais-tu faire avec ces données dans un tableur** ?
>
> - Calcul possible 1 : ________________________________________________________________
>
> - Graphique possible : ________________________________________________________________

---

<div class="page-break"></div>

# 🔧 Étape transversale — Tinkercad → Matériel réel

> Ton système A1 (ou A2 ou A3) fonctionne en simulation. **Tu vas maintenant le transposer sur Arduino réel** au laboratoire.

## ⚠️ Pourquoi simulation ≠ réel

| Phénomène | En simulation Tinkercad | En matériel réel |
|:---|:---|:---|
| **Bruit du capteur** | Aucun, valeurs parfaites | Présent : valeurs qui oscillent légèrement |
| **Tension d'alimentation** | Toujours 5,00 V | 4,7 à 5,1 V selon USB / pile |
| **Comportement HC-SR04** | Plage idéale 2-400 cm | Échec sur surfaces molles ou angles |
| **Capteur MQ-135** | Simulé par potentiomètre linéaire | **Temps de chauffe** 24-48 h pour calibration stable |

## 🛠️ Protocole de transposition

> ✏️ **Suis ce protocole** au laboratoire :

| # | Action | Validation |
|:---:|:---|:---:|
| 1 | Câbler le montage **identique** au schéma Tinkercad | ☐ |
| 2 | Téléverser le programme **sans modification** | ☐ |
| 3 | **Mesurer 10 valeurs** du capteur sans rien faire (capteur au repos) | ☐ |
| 4 | Calculer la **valeur moyenne au repos** + **écart maximal** | ☐ |
| 5 | **Recalibrer le seuil** en tenant compte du bruit (seuil = repos + 1,5 × écart_max) | ☐ |
| 6 | Tester 5 fois, mesurer le **taux de fausses détections** | ☐ |
| 7 | Mesurer le **temps de réaction** (chrono) | ☐ |

## 📊 Tableau de mesures réelles

| Mesure | Tinkercad (simulé) | Arduino réel | Écart |
|:---|:---:|:---:|:---:|
| Valeur du capteur au repos | __________ | __________ | __________ |
| Valeur du capteur stimulé | __________ | __________ | __________ |
| Seuil retenu après calibration | __________ | __________ | — |
| Taux de fausses détections | 0 % (parfait) | __________ | __________ |
| Temps de réaction | __________ ms | __________ ms | __________ |

> ✏️ **Conclusion** : ton système réel est-il aussi performant que la simulation ? **Justifie** :
>
> _______________________________________________________________________________________
>
> _______________________________________________________________________________________

---

<div class="page-break"></div>

## ⚖️ Synthèse — Évaluer et choisir un OST

> 🎯 **Mission DNB** : la famille Kiagi a un budget de **30 €** et veut installer **un seul système**. **Évalue** les 3 systèmes selon des critères précis et **argumente ton choix**.

### Tableau d'évaluation multicritères

| Critère | Pondération | A1 (couloir) | A2 (lampe) | A3 (station) |
|:---|:---:|:---:|:---:|:---:|
| Économie €/an | × 3 | _____ /5 | _____ /5 | _____ /5 |
| Coût d'installation | × 2 | _____ /5 | _____ /5 | _____ /5 |
| Indice de réparabilité | × 1 | _____ /5 | _____ /5 | _____ /5 |
| Confort apporté | × 2 | _____ /5 | _____ /5 | _____ /5 |
| Impact santé | × 3 | _____ /5 | _____ /5 | _____ /5 |
| **TOTAL** (somme pondérée) | | **____ /55** | **____ /55** | **____ /55** |

### Indice de réparabilité estimé

> Rappel : indice sur 10 = (documentation × 2) + (démontabilité × 2) + (disponibilité pièces × 2) + (prix pièces × 2) + (assistance × 2)

> ✏️ **Tes systèmes sont-ils réparables** ? Pour A3 par exemple :
>
> - Un capteur MQ-135 cassé peut-il être remplacé sans changer toute la carte Arduino ? **OUI / NON**. Justifie : ____________________________________________________________
>
> - Estime l'indice de réparabilité de A3 : ______ /10

### 🎯 Conseil argumenté à la famille Kiagi

> ✏️ **Système choisi** : __________
>
> **Argumente en 4 points** (économie, santé, faisabilité, durabilité) :
>
> 1. _______________________________________________________________________________________
>
> 2. _______________________________________________________________________________________
>
> 3. _______________________________________________________________________________________
>
> 4. _______________________________________________________________________________________

---

<div class="page-break"></div>

## ✅ L'essentiel en 5 points — à retenir

À la fin de la séance, tu sais que :

1. **Un programme structuré** se découpe en **sous-programmes (fonctions)** nommés et paramétrables. Chaque fonction réalise une **tâche unique**, ce qui permet la **réutilisation**, la **lecture facile** et le **test isolé**.

2. Les **listes (tableaux)** permettent de **mémoriser plusieurs mesures** dans le temps. La **moyenne glissante** lisse un signal bruité et stabilise la décision.

3. L'**hystérésis** (deux seuils différents pour allumer/éteindre) **évite le clignotement** quand la mesure oscille autour d'un seuil unique. C'est une **technique professionnelle** utilisée dans les thermostats, les détecteurs, etc.

4. Un système peut **fusionner les données de plusieurs capteurs** pour produire une décision **plus fiable** qu'avec un seul. La **journalisation CSV** permet d'**exploiter** ces données en post-analyse.

5. **Simulation ≠ réel** : un système doit toujours être **recalibré** au passage du virtuel au matériel (bruit du capteur, tension réelle, conditions ambiantes). Le **protocole de test** mesure objectivement la performance.

---

## 🏠 Pour aller plus loin (révision DNB)

> Cette séance mobilise des compétences évaluables au DNB. Voici 3 questions de type DNB :

> ✏️ **Q1 (chaîne d'information)** : Pour le système A1, identifie sur ton schéma les 3 fonctions de la chaîne d'information et associe-les à un constituant matériel précis.
>
> _______________________________________________________________________________________

> ✏️ **Q2 (programmation)** : Explique en 2 phrases pourquoi on utilise des **sous-programmes** plutôt qu'un seul gros bloc dans le programme A3.
>
> _______________________________________________________________________________________

> ✏️ **Q3 (choix d'un OST)** : Donne un argument **quantitatif** et un argument **qualitatif** pour justifier le choix d'un système automatisé plutôt qu'un système manuel.
>
> Quantitatif : ___________________________________________________________________________
>
> Qualitatif : ____________________________________________________________________________

---

<div class="bilan-competences">

## 🎯 Auto-évaluation des compétences

| Je suis capable de… | 🔴 Pas encore | 🟡 Avec aide | 🟢 Tout seul |
|:---|:---:|:---:|:---:|
| Élaborer un schéma bloc complet d'une chaîne d'information (SFC 13) | ☐ | ☐ | ☐ |
| Programmer un algorithme structuré avec sous-programmes (SFC 31) | ☐ | ☐ | ☐ |
| Utiliser des listes / tableaux pour mémoriser des données | ☐ | ☐ | ☐ |
| Concevoir une IHM (bouton de mode, journalisation série) (CCRI 31) | ☐ | ☐ | ☐ |
| Mettre au point un programme commandant un système réel (CCRI 31) | ☐ | ☐ | ☐ |
| Définir et mettre en œuvre un protocole de test mesurable (OST 32) | ☐ | ☐ | ☐ |
| Évaluer un OST selon des critères pondérés (OST 31) | ☐ | ☐ | ☐ |

</div>

---

*Fiche élève 3ème — Séquence Habitat & Énergie — Séance 3 · Famille Kiagi · Tinkercad Circuits + matériel réel · Compétences DNB*
