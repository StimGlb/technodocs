# Fiche 3 — La chaîne d'information
## 1. Le rôle de la chaîne d'information

Dans un système technique automatisé, **deux chaînes coexistent** :

- La **chaîne d'énergie** (voir fiche 2) fait circuler l'énergie pour réaliser une action physique.
- La **chaîne d'information** capte des données, les traite, et envoie des ordres à la chaîne d'énergie.

La chaîne d'information est le **cerveau** du système : elle décide **quand**, **comment** et **combien** d'énergie doit circuler.

---

## 2. La chaîne d'information : principe

La chaîne d'information se décompose en **4 fonctions** :

![Chaîne d'information — Schéma de principe](../../assets/revisions/chaine-information-principe.svg)

| Fonction | Rôle | Question à se poser |
|----------|------|---------------------|
| **Acquérir** | Capter une grandeur physique (température, lumière, distance, pression…) | Que mesure le système ? |
| **Traiter** | Analyser les données captées et prendre une décision selon un programme | Qui décide quoi faire ? |
| **Communiquer** | Afficher une information à l'utilisateur | Comment l'utilisateur est-il informé ? |
| **Commander** | Envoyer un ordre à la chaîne d'énergie | Quel signal déclenche l'action ? |

---

## 3. Les constituants de la chaîne d'information

### Acquérir — Les capteurs

Un **capteur** transforme une grandeur physique en **signal électrique** exploitable par le microcontrôleur.

| Capteur | Grandeur mesurée | Exemple d'objet |
|---------|-----------------|-----------------|
| Capteur de température | Température (°C) | Thermostat, station météo |
| Capteur ultrason | Distance (cm) | Robot éviteur d'obstacles, radar de recul |
| Capteur infrarouge | Présence, proximité | Distributeur de savon automatique |
| Capteur de luminosité (LDR) | Intensité lumineuse (lux) | Éclairage automatique |
| Accéléromètre | Accélération, inclinaison | Smartphone, manette de jeu |
| Capteur de vitesse | Vitesse de rotation (tr/min) | Trottinette, vélo |
| Bouton poussoir | Action de l'utilisateur (tout ou rien) | Télécommande, ascenseur |
| Microphone | Son (vibrations de l'air) | Enceinte connectée, assistant vocal |
| Capteur tactile | Pression du doigt | Écran de smartphone |

**Deux types de capteurs :**
- **Analogique** : le signal varie de façon continue (ex. : LDR, température) → nécessite une conversion analogique-numérique (CAN)
- **Numérique** : le signal est directement 0 ou 1 (ex. : bouton poussoir, capteur infrarouge)

### Traiter — Le microcontrôleur

Le **microcontrôleur** est un petit ordinateur intégré qui exécute un **programme**. Il reçoit les données des capteurs, les analyse, et décide de l'action à effectuer.

| Composant | Exemple | Usage courant |
|-----------|---------|---------------|
| Arduino (Uno, Nano) | Carte à microcontrôleur | Projets éducatifs, prototypage |
| Raspberry Pi | Micro-ordinateur | Projets plus complexes, serveur |
| Microcontrôleur intégré | Puce soudée dans l'objet | Lave-linge, voiture, jouet |

Le microcontrôleur contient :
- Une **mémoire** pour stocker le programme
- Un **processeur** pour exécuter les instructions
- Des **entrées** (branchement des capteurs)
- Des **sorties** (branchement des actionneurs et IHM)

### Communiquer — L'IHM (Interface Homme-Machine)

L'**IHM** est ce qui permet à l'utilisateur de **voir** ou **entendre** des informations, et parfois d'**agir** sur le système.

| Composant IHM | Type | Exemple |
|---------------|------|---------|
| Écran LCD / OLED | Affichage visuel | Trottinette (vitesse, batterie) |
| LED | Indicateur simple | Voyant de veille, témoin de charge |
| Buzzer | Signal sonore | Alarme, bip de confirmation |
| Haut-parleur | Son complexe | Assistant vocal, GPS |
| Écran tactile | Affichage + saisie | Smartphone, tablette |
| Clavier / boutons | Saisie | Micro-ondes, calculatrice |

L'IHM fonctionne dans **les deux sens** : elle affiche des informations (sortie) mais permet aussi à l'utilisateur d'entrer des commandes (entrée).

### Commander — L'ordre vers la chaîne d'énergie

La fonction **Commander** fait le lien entre la chaîne d'information et la chaîne d'énergie. Le microcontrôleur envoie un **signal électrique** qui active ou régule un composant de la chaîne d'énergie.

| Type de commande | Principe | Exemple |
|------------------|----------|---------|
| Tout ou rien | Le signal est ON ou OFF | Relais qui allume une lampe |
| PWM (modulation) | Le signal varie en intensité | Vitesse d'un moteur, luminosité d'une LED |
| Signal série | Données numériques | Communication Bluetooth, Wi-Fi |

---

<!-- ## 4. Le lien entre les deux chaînes

C'est un point essentiel à maîtriser pour le DNB : comprendre comment les deux chaînes **coopèrent** dans un système technique.

![Lien entre chaîne d'information et chaîne d'énergie](../../assets/revisions/lien-chaines-energie-information.svg)

**Règle fondamentale** : la chaîne d'information **pilote** la chaîne d'énergie. Sans information (pas de capteur, pas de programme), la chaîne d'énergie ne sait pas quand ni comment agir.

--- -->

## 4. Exemple complet — Trottinette électrique

![Chaîne d'information — Trottinette électrique](../../assets/revisions/chaine-information-trottinette.svg)

**Scénario** : le conducteur appuie sur la gâchette d'accélération.

1. **Acquérir** : le capteur de position de la gâchette détecte l'appui, le capteur de vitesse mesure la rotation de la roue.
2. **Traiter** : le contrôleur électronique compare la vitesse actuelle à la consigne demandée par la gâchette, et calcule la puissance à envoyer au moteur.
3. **Communiquer** : l'écran LCD affiche la vitesse en temps réel et le niveau de batterie.
4. **Commander** : le contrôleur envoie un signal PWM au moteur pour ajuster sa vitesse → la chaîne d'énergie entre en action.

---

## ✅ L'essentiel en 5 points

1. La chaîne d'information a **4 fonctions** : acquérir (capteurs), traiter (microcontrôleur), communiquer (IHM), commander (ordre vers la chaîne d'énergie).
2. Un **capteur** convertit une grandeur physique en signal électrique ; il peut être **analogique** ou **numérique**.
3. Le **microcontrôleur** (Arduino, Raspberry Pi…) exécute un programme qui décide des actions à réaliser.
4. L'**IHM** est l'interface entre l'Homme et la machine : elle affiche des informations et reçoit des commandes.
<!-- 5. La chaîne d'information **pilote** la chaîne d'énergie : elle décide quand, comment et combien d'énergie circule. -->