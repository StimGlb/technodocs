# Fiche 03 — La Programmation

## 1. L'algorithme et les variables

Un programme informatique repose sur un **algorithme** : une suite d'instructions précises et ordonnées qui permet de résoudre un problème. Avant d'écrire un programme, on rédige l'algorithme en **langage naturel** pour décrire ce que la machine doit faire, étape par étape.

Une **variable** est une case mémoire qui stocke une information utilisée ou modifiée par le programme. Elle possède un **nom**, une **valeur** et un **type**.

### Vocabulaire clé

| Terme | Définition |
| --- | --- |
| **Algorithme** | Suite d'instructions ordonnées pour résoudre un problème |
| **Variable** | Emplacement mémoire nommé qui stocke une valeur |
| **Affectation** | Instruction qui attribue une valeur à une variable (`vitesse ← 50`) |
| **Type** | Nature de la donnée stockée : **nombre**, **mot** (chaîne de caractères) ou **booléen** (vrai/faux) |
| **Entrée** | Donnée reçue par le programme (capteur, bouton, fichier…) |
| **Sortie** | Donnée produite par le programme (affichage, actionneur, fichier…) |
| **Opérateur arithmétique** | Symbole de calcul : `+`, `-`, `×`, `÷` |
| **Opérateur logique** | ET, OU, NON — combine des conditions booléennes |

---

## 2. Les structures de contrôle

Un programme ne s'exécute pas toujours en ligne droite. Les **structures de contrôle** permettent de prendre des décisions ou de répéter des actions.

### L'instruction conditionnelle — faire un choix

La structure **SI … ALORS … SINON** évalue une condition. Si la condition est vraie, le premier bloc s'exécute ; sinon, c'est le second.

```
SI température > 30 ALORS
    afficher "Il fait chaud"
SINON
    afficher "Température normale"
FIN SI
```

- La condition renvoie toujours un **booléen** (VRAI ou FAUX).
- On peut combiner plusieurs conditions avec **ET**, **OU**, **NON**.

### Les instructions itératives — répéter des actions

| Structure | Usage | Exemple |
| --- | --- | --- |
| **RÉPÉTER n fois** | Nombre de répétitions connu à l'avance | Faire clignoter une LED 10 fois |
| **TANT QUE … FAIRE** | On répète tant qu'une condition reste vraie | Avancer tant qu'aucun obstacle n'est détecté |
| **POUR chaque élément** | Parcourir tous les éléments d'une liste | Traiter chaque mesure d'une liste de capteurs |

⚠️ **Boucle infinie** : si la condition d'une boucle TANT QUE ne devient jamais fausse, le programme tourne indéfiniment et bloque le système. Il faut toujours s'assurer que la condition peut devenir fausse.

### La progression des attendus en 3ème

En 3ème, tu dois être capable de :

- **Élaborer** toi-même un algorithme répondant au besoin (et non juste le compléter)
- **Traduire** cet algorithme en programme structuré
- **Tester et corriger** le programme sur un système réel

---

<!-- ## 3. Les listes, les événements et les données

Un programme interagit avec son environnement grâce aux **entrées/sorties**, et peut stocker plusieurs valeurs dans une **liste**.

### Les listes

- Une **liste** (ou tableau) est une structure de données qui stocke plusieurs valeurs sous un même nom.
- Chaque valeur est repérée par son **indice** (sa position dans la liste).
- On peut **parcourir** une liste (lire chaque élément), **trier** ses éléments ou les **filtrer**.

```
mesures ← [18, 21, 24, 19, 22]   // liste de températures
POUR chaque valeur dans mesures
    afficher valeur
FIN POUR
```

### Les événements

- Un **événement** est un signal externe qui déclenche l'exécution d'un bloc d'instructions : appui sur un bouton, réception d'une donnée d'un capteur, fin d'une temporisation…
- **Déclenchement par événement** : le programme "attend" qu'un événement survienne pour exécuter la séquence associée.

### Entrées et sorties d'un programme

| Catégorie | Exemples |
| --- | --- |
| **Entrées** | Capteur de distance, bouton (IHM), fichier CSV, données réseau |
| **Sorties** | Actionneur (moteur, LED), affichage (écran, buzzer), écriture dans un fichier |

---

## 4. Les sous-programmes et les fonctions

En 3ème, la nouveauté majeure est la **programmation structurée** : on organise un programme complexe en blocs réutilisables appelés **sous-programmes** ou **fonctions**.

### Pourquoi structurer un programme ?

- **Lisibilité** : un programme découpé en blocs nommés est plus facile à comprendre
- **Réutilisabilité** : un sous-programme écrit une fois peut être appelé plusieurs fois
- **Débogage** : on peut tester chaque bloc indépendamment avant d'assembler le tout

### Sous-programme et fonction

- **Sous-programme** : bloc d'instructions nommé, qu'on peut appeler depuis n'importe où dans le programme.
- **Fonction** : sous-programme qui **renvoie une valeur** en résultat.

```
FONCTION calculer_moyenne(liste)
    somme ← 0
    POUR chaque valeur dans liste
        somme ← somme + valeur
    FIN POUR
    RETOURNER somme / taille(liste)
FIN FONCTION
```

### Structure d'un programme en 3ème

Un programme bien structuré doit contenir :

- Des **commentaires** : lignes de texte explicatives (non exécutées) qui décrivent le rôle de chaque bloc
- Des **noms de variables explicites** : `vitesse_moteur` plutôt que `v`
- Des **sous-programmes** pour chaque grande fonctionnalité
- Un **programme principal** court qui appelle les sous-programmes dans l'ordre

--- -->

## 3. De la programmation par blocs à la programmation textuelle

Tout au long du cycle 4, on passe progressivement d'une représentation visuelle (blocs) à une écriture textuelle du code.

### Comparaison blocs / textuel

| Critère | Programmation par blocs | Programmation textuelle |
| --- | --- | --- |
| **Outil** | Scratch, mBlock, MakeCode | Python, C (Arduino) |
| **Syntaxe** | Visuelle — les blocs s'emboîtent | Écrite — chaque instruction est une ligne de texte |
| **Avantage** | Pas d'erreur de frappe, logique visible | Plus puissante, modulaire, proche des langages professionnels |
| **Usage en cours** | 5ème et 4ème (prise en main, modification) | Introduit en fin de 3ème |

### La correspondance entre les deux formes

Les mêmes **structures algorithmiques** existent dans les deux formes : l'algorithme ne change pas, seule la façon de l'écrire change.

| Concept | Blocs (mBlock) | Textuel (Python) |
| --- | --- | --- |
| Affectation | Bloc *mettre \[var\] à \[valeur\]* | `vitesse = 50` |
| Condition | Bloc *si … alors … sinon* | `if condition: … else: …` |
| Boucle bornée | Bloc *répéter \[n\] fois* | `for i in range(n): …` |
| Boucle conditionnelle | Bloc *répéter jusqu'à* | `while condition: …` |
| Fonction | Bloc *définir \[nom\]* | `def nom(): …` |

⚠️ **En programmation textuelle**, une erreur de **syntaxe** (oubli de `:`, mauvaise indentation en Python) empêche le programme de s'exécuter. L'**analyse des messages d'erreur** fait partie des compétences attendues en fin de 3ème.

### La progression du cycle

- **5ème** : lire et modifier les paramètres d'un programme existant, traduire en langage naturel
- **4ème** : compléter un programme, tester dans un environnement simulé ou réel
- **3ème** : concevoir l'algorithme, programmer en structuré, tester et corriger sur système réel avec IHM

---

## ✅ L'essentiel en 5 points

1. Un **algorithme** est une suite ordonnée d'instructions. Avant de programmer, on le rédige en **langage naturel**. Les données sont stockées dans des **variables** qui ont un nom, une valeur et un **type** (nombre, mot, booléen).
2. Les **structures de contrôle** permettent de prendre des décisions (**SI … ALORS … SINON**) ou de répéter des actions (**TANT QUE**, **RÉPÉTER n fois**, **POUR chaque**). On combine les conditions avec les opérateurs logiques **ET**, **OU**, **NON**.
<!-- 3. Une **liste** stocke plusieurs valeurs sous un même nom. Un **événement** (bouton, capteur…) déclenche l'exécution d'un bloc d'instructions. Les **entrées** (capteurs, IHM) et les **sorties** (actionneurs, affichage) permettent au programme d'interagir avec le monde réel.
4. En 3ème, un programme est **structuré** en **sous-programmes** et **fonctions** réutilisables. Il doit contenir des **commentaires** et des noms explicites pour être lisible et facile à corriger. -->
3. La **programmation par blocs** (Scratch, mBlock) et la **programmation textuelle** (Python) reposent sur les mêmes structures algorithmiques. En fin de 3ème, on sait lire et écrire du code textuel simple, et analyser les **messages d'erreur**.
