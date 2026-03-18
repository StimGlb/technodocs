# TECHNOLOGIE — Durée 30 minutes — 25 points

**Les réponses sont à rédiger dans le sujet.**

---

## ÉCLAIRAGE AUTOMATIQUE CONNECTÉ

La famille Kiagi vient d'équiper sa maison d'un système d'éclairage automatique dans le couloir. Ce système s'allume automatiquement **lorsqu'une personne est détectée** et **lorsque la luminosité ambiante est insuffisante**. Il s'éteint seul après une durée réglable.

Le système est composé :
- d'un **capteur à ultrasons** (détection de présence par mesure de distance)
- d'un **capteur de luminosité** (photorésistance)
- d'un **microcontrôleur** (carte mBot) qui traite les informations
- d'une **ampoule LED** pilotée par le microcontrôleur

> 📷 *[Document 1 — Photo du système installé dans le couloir — à insérer]*

---

**Document 2 — Principe du capteur à ultrasons**

Le capteur à ultrasons émet une onde sonore à haute fréquence. Lorsqu'une personne est présente dans le couloir, l'onde se réfléchit sur elle et revient vers le capteur. Le délai mesuré entre l'émission et la réception permet de calculer la distance.

> 📷 *[Document 2 — Schéma émission/réception ultrason — à insérer]*

---

**Document 3 — Comportement du système**

| Distance mesurée | Luminosité | Comportement |
|-----------------|------------|--------------|
| ≤ 3 m | Faible (< 200 lux) | Ampoule allumée |
| ≤ 3 m | Suffisante (≥ 200 lux) | Ampoule éteinte |
| > 3 m | — | Ampoule éteinte |

---

### Question 1 — 2 points

**Donner la fonction d'usage du système d'éclairage automatique.**  
*(Rédiger la réponse sous la forme : « Le système permet de… »)*

&nbsp;

&nbsp;

&nbsp;

---

### Question 2 — 2 points

**Qu'est-ce qu'un capteur ? Identifier puis cocher la bonne définition.**

☐ Un composant qui stocke de l'énergie électrique.

☐ Un composant capable de prélever une information sur son environnement.

☐ Un composant qui transforme un mouvement en énergie.

☐ Un composant qui transmet des données vers Internet.

---

### Question 3 — 3 points

**a)** Compléter les deux affirmations ci-dessous en utilisant les mots : **court** et **long**.

- Plus la personne est proche du capteur, plus le délai émission/réception est ________________

- Plus la personne est éloignée du capteur, plus le délai émission/réception est ________________

**b)** Quel paramètre permet au système de savoir si une personne est présente dans le couloir ?

☐ La vitesse de déplacement de la personne.

☐ Le délai entre l'émission et la réception de l'onde ultrasonore.

☐ L'intensité lumineuse émise par l'ampoule LED.

---

### Question 4 — 6 points

**Compléter la chaîne d'information du système d'éclairage automatique.**

**a)** Compléter les 2 cases grises par une **fonction** (verbe à l'infinitif).

**b)** Replacer les solutions techniques sur les pointillés :  
`Ampoule LED` / `Capteur à ultrasons + capteur de luminosité` / `Carte mBot`

```
                          ┌─────────────────┐
  Présence d'une    ───►  │                 │  ───►  Présence détectée
  personne /              │  _ _ _ _ _ _ _  │        et luminosité faible
  Niveau de               │                 │
  luminosité              └─────────────────┘
                                   │
                          Solution : _ _ _ _ _ _ _ _ _ _
                                   │
                                   ▼
                          ┌─────────────────┐
                          │                 │
                          │  _ _ _ _ _ _ _  │
                          │                 │
                          └─────────────────┘
                                   │
                          Solution : _ _ _ _ _ _ _ _ _ _
                                   │
                                   ▼
                          ┌─────────────────┐
                          │                 │
                          │  _ _ _ _ _ _ _  │
                          │                 │
                          └─────────────────┘
                                   │
                          Solution : _ _ _ _ _ _ _ _ _ _
                                   │
                                   ▼
                           Éclairage activé
```

---

### Question 5 — 4 points

**Calcul d'économies d'énergie**

Avant l'installation du système automatique, l'ampoule du couloir restait allumée **8 heures par jour** en moyenne.

Avec le système automatique, elle n'est allumée que **2 heures par jour** (uniquement lorsqu'une présence est détectée la nuit).

L'ampoule LED a une puissance de **10 W**. Le prix de l'électricité est de **0,25 €/kWh**.

**a)** Calculer l'énergie consommée **sans** le système automatique, en 1 an (365 jours).  
*(Rappel : Énergie (kWh) = Puissance (kW) × Durée (h))*

&nbsp;

&nbsp;

Énergie sans système automatique = _____________ kWh/an

**b)** Calculer l'énergie consommée **avec** le système automatique, en 1 an.

&nbsp;

&nbsp;

Énergie avec système automatique = _____________ kWh/an

**c)** Calculer le **coût annuel économisé** grâce au système automatique.

&nbsp;

&nbsp;

Économie annuelle = _____________ €/an

---

### Question 6 — 8 points

**Compléter le programme en blocs mBot ci-dessous.**

Le programme doit respecter le comportement décrit dans le **Document 3** :
- Si une personne est détectée (distance ≤ 3 m) **ET** que la luminosité est faible (< 200 lux) → allumer la LED
- Sinon → éteindre la LED

**Document 4 — Système de codage des couleurs RVB**

| Couleur | Rouge | Vert | Bleu |
|---------|-------|------|------|
| Blanc (LED allumée) | 255 | 255 | 255 |
| Éteint | 0 | 0 | 0 |

**Compléter les 8 cases blanches du programme :**

```
┌──────────────────────────────────────────────────────────┐
│  mBot — générer le code                                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  répéter indéfiniment                              │  │
│  │                                                    │  │
│  │  mettre [Distance] à [distance mesurée - Port 3]   │  │
│  │  mettre [Luminosite] à [luminosité mesurée]        │  │
│  │                                                    │  │
│  │  si [Distance] < [  ①  ] et                       │  │
│  │     [Luminosite] < [  ②  ] alors                  │  │
│  │                                                    │  │
│  │     régler la DEL en rouge [  ③  ]                │  │
│  │                             vert [  ④  ]          │  │
│  │                             bleu [  ⑤  ]          │  │
│  │                                                    │  │
│  │  sinon                                             │  │
│  │                                                    │  │
│  │     régler la DEL en rouge [  ⑥  ]                │  │
│  │                             vert [  ⑦  ]          │  │
│  │                             bleu [  ⑧  ]          │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

| Case | Valeur |
|------|--------|
| ① |  |
| ② |  |
| ③ |  |
| ④ |  |
| ⑤ |  |
| ⑥ |  |
| ⑦ |  |
| ⑧ |  |

---

*Fin du sujet*