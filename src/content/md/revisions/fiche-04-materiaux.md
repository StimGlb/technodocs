# Fiche 4 — Matériaux et procédés

## 1. Qu'est-ce qu'un matériau ?

Un **matériau** est la matière à partir de laquelle on fabrique un objet technique. Le choix du matériau dépend de la **fonction** que doit remplir la pièce, de ses **contraintes** (résistance, poids, coût…) et de son **impact environnemental**.

À ne pas confondre :
- **Matériau** : la substance elle-même (acier, PLA, bois…)
- **Matière première** : la ressource naturelle d'origine (minerai de fer, pétrole, arbre…)

---

## 2. Les familles de matériaux

Il existe **4 grandes familles** de matériaux :

| Famille | Caractéristiques principales | Exemples |
|---------|------------------------------|----------|
| **Métaux et alliages** | Conducteurs (électricité, chaleur), résistants, recyclables | Acier, aluminium, cuivre, laiton |
| **Plastiques (polymères)** | Légers, isolants, moulables, peu coûteux | PLA, ABS, PET, polycarbonate |
| **Céramiques et verres** | Très durs, résistants à la chaleur, fragiles | Verre, porcelaine, céramique technique |
| **Matériaux organiques** | D'origine naturelle (vivante), biodégradables | Bois, cuir, coton, caoutchouc naturel |

Il existe aussi les **matériaux composites** : ils combinent deux matériaux de familles différentes pour obtenir des propriétés supérieures. Exemple : la fibre de carbone (fibres + résine) est à la fois légère et très résistante.

---

## 3. Les propriétés des matériaux

Pour choisir un matériau adapté, on étudie ses **propriétés** :

### Propriétés mécaniques

| Propriété | Définition | Test / mesure |
|-----------|-----------|---------------|
| **Dureté** | Résistance à la rayure ou à la pénétration | Test de rayure, échelle de Mohs |
| **Résistance à la traction** | Capacité à supporter un étirement sans casser | Essai de traction (machine) |
| **Résistance à la compression** | Capacité à supporter un écrasement | Essai de compression |
| **Élasticité** | Capacité à se déformer puis revenir à sa forme initiale | Essai de flexion |
| **Résilience** | Résistance aux chocs | Essai de choc (mouton de Charpy) |

### Propriétés physiques et chimiques

| Propriété | Définition | Exemple d'application |
|-----------|-----------|----------------------|
| **Conductivité électrique** | Capacité à laisser passer le courant | Fils en cuivre (conducteur) vs gaine en plastique (isolant) |
| **Conductivité thermique** | Capacité à transmettre la chaleur | Poêle en métal (conducteur) vs manche en bois (isolant) |
| **Masse volumique** | Masse par unité de volume (kg/m³) | Aluminium (léger) vs acier (lourd) |
| **Résistance à la corrosion** | Capacité à ne pas s'oxyder | Inox pour les couverts, aluminium anodisé |

### Propriétés liées au développement durable

| Propriété | Question à se poser |
|-----------|---------------------|
| **Recyclabilité** | Le matériau peut-il être refondu / retransformé ? |
| **Biodégradabilité** | Se décompose-t-il naturellement ? |
| **Toxicité** | Est-il dangereux pour la santé ou l'environnement ? |
| **Origine** | Ressource renouvelable ou non ? Locale ou importée ? |

---

## 4. Choisir un matériau

Le choix d'un matériau est toujours un **compromis** entre plusieurs critères :

| Critère | Exemples de questions |
|---------|----------------------|
| **Fonction technique** | Le matériau résiste-t-il à l'effort demandé ? Est-il conducteur ou isolant ? |
| **Procédé de fabrication** | Le matériau est-il compatible avec l'impression 3D, le moulage, l'usinage ? |
| **Coût** | Le matériau est-il abordable pour la production prévue ? |
| **Esthétique** | La couleur, le toucher, la finition conviennent-ils ? |
| **Impact environnemental** | Le matériau est-il recyclable ? Sa production est-elle polluante ? |
| **Disponibilité** | Le matériau est-il facile à se procurer ? |

### Méthode de choix (niveau 3ème)

1. Identifier la **fonction** de la pièce (que doit-elle faire ?)
2. Lister les **contraintes** (résistance, poids, température, contact alimentaire…)
3. Comparer les matériaux candidats dans un **tableau comparatif**
4. Justifier le choix en argumentant sur les critères prioritaires

---

## 5. Les procédés de fabrication

Un **procédé de fabrication** est la méthode utilisée pour transformer un matériau en pièce finie.

### Les 3 grandes catégories

| Catégorie | Principe | Exemples de procédés |
|-----------|----------|---------------------|
| **Par enlèvement de matière** | On retire de la matière d'un bloc | Usinage, perçage, découpe laser, fraisage |
| **Par ajout de matière** | On ajoute de la matière couche par couche | Impression 3D (FDM, SLA), soudure |
| **Par déformation / moulage** | On change la forme sans ajouter ni retirer | Pliage, emboutissage, moulage par injection, thermoformage |

### L'impression 3D (FDM)

L'impression 3D par **dépôt de fil fondu** (FDM) est le procédé utilisé en classe avec les imprimantes Creality Ender 3.

**Principe** : un fil de plastique (PLA) est chauffé et déposé couche par couche pour construire un objet en 3D à partir d'un modèle numérique.

**Les étapes** :

| Étape | Outil | Description |
|-------|-------|-------------|
| 1. Modélisation | Tinkercad | Créer le modèle 3D sur ordinateur |
| 2. Export | Tinkercad → fichier STL | Exporter le modèle au format STL |
| 3. Tranchage (slicing) | Cura, PrusaSlicer | Découper le modèle en couches et générer le G-code |
| 4. Impression | Imprimante 3D (Ender 3) | L'imprimante dépose le fil fondu couche par couche |
| 5. Finition | Manuel | Retirer les supports, ébavurer si nécessaire |

**Paramètres importants du tranchage** :
- **Hauteur de couche** : plus elle est fine (0,1 mm), plus c'est précis mais plus c'est long
- **Remplissage (infill)** : pourcentage de matière à l'intérieur (20 % = léger, 100 % = plein et solide)
- **Supports** : structures temporaires pour les parties en porte-à-faux
- **Température** : de la buse (~200°C pour le PLA) et du plateau (~60°C)

### Avantages et limites de l'impression 3D

| Avantages | Limites |
|-----------|---------|
| Prototypage rapide | Lent pour la production en série |
| Formes complexes possibles | Résistance mécanique limitée (selon le matériau) |
| Personnalisation facile | Finition de surface (traces de couches) |
| Peu de déchets (fabrication additive) | Taille limitée par le volume d'impression |
| Réparation : fabriquer une pièce sur mesure | Choix de matériaux restreint |

---

## 6. La modélisation numérique

Avant de fabriquer, on **modélise** la pièce sur ordinateur. La modélisation permet de :

- Visualiser la pièce en 3D avant fabrication
- Vérifier les dimensions et les formes
- Détecter des erreurs de conception
- Simuler le comportement mécanique (résistance, déformation)
- Générer le fichier nécessaire à la fabrication (STL, DXF…)

**Tinkercad** est l'outil utilisé en classe : il permet de modéliser par **assemblage de formes primitives** (cubes, cylindres, sphères…) que l'on combine, groupe et perce.

---

## ✅ L'essentiel en 5 points

1. Il existe **4 familles** de matériaux : métaux, plastiques, céramiques, organiques — plus les **composites**.
2. Chaque matériau a des **propriétés** (mécaniques, physiques, environnementales) qui déterminent son usage.
3. Le choix d'un matériau est un **compromis** entre fonction technique, coût, procédé de fabrication et impact environnemental.
4. L'impression 3D (FDM) fabrique par **ajout de matière** couche par couche à partir d'un modèle numérique (Tinkercad → STL → Slicer → G-code).
5. La **modélisation numérique** permet de concevoir, vérifier et simuler avant de fabriquer.