
## 🧪 Exercices type DNB

### Exercice 1 — Choisir un matériau

On conçoit un support de smartphone à imprimer en 3D. Trois matériaux sont envisagés :

| Critère | PLA | ABS | PETG |
|---------|-----|-----|------|
| Résistance mécanique | Moyenne | Bonne | Bonne |
| Facilité d'impression | Très facile | Difficile (warping) | Facile |
| Résistance à la chaleur | Faible (60°C) | Bonne (100°C) | Moyenne (80°C) |
| Biodégradable | Oui | Non | Non |
| Prix (kg) | 20 € | 22 € | 25 € |

**a)** Le support sera posé sur un bureau, sans contrainte de chaleur. Quel matériau recommandes-tu ? Justifie avec au moins deux critères.

**b)** Si le support devait être utilisé dans une voiture en été (température intérieure pouvant atteindre 80°C), ton choix changerait-il ? Pourquoi ?

**c)** En termes de développement durable, quel argument supplémentaire favorise le PLA ?

**Réponses :**

**a)** Le PLA est le meilleur choix : il est très facile à imprimer (moins de risques d'échec), il a une résistance mécanique suffisante pour un support posé sur un bureau (pas de choc ni de forte contrainte), et il est le moins cher. Sa faible résistance à la chaleur n'est pas un problème dans cet usage.

**b)** Oui, le choix changerait. Le PLA se déforme à partir de 60°C, donc il ramollirait dans une voiture en été. Le PETG serait le meilleur compromis : il résiste jusqu'à 80°C, reste facile à imprimer (contrairement à l'ABS), et a une bonne résistance mécanique.

**c)** Le PLA est **biodégradable** et fabriqué à partir d'amidon de maïs (ressource renouvelable), contrairement à l'ABS et au PETG qui sont issus du pétrole (ressource non renouvelable).

---

### Exercice 2 — Procédés de fabrication

Un fabricant de vélos produit le même garde-boue en deux versions :

- Version A : en aluminium, fabriquée par **emboutissage** (déformation d'une tôle dans un moule)
- Version B : en plastique ABS, fabriquée par **moulage par injection**

**a)** À quelle catégorie de procédé appartient l'emboutissage ? Et le moulage par injection ?

**b)** Les deux procédés nécessitent un moule. Pourquoi sont-ils adaptés à la production en **grande série** mais pas au prototypage ?

**c)** Pour fabriquer un prototype unique de garde-boue avant la production en série, quel procédé serait plus adapté ? Justifie.

**Réponses :**

**a)** L'emboutissage appartient à la catégorie « par déformation » (on change la forme d'une tôle sans ajouter ni retirer de matière). Le moulage par injection appartient aussi à la catégorie « par déformation / moulage » (le plastique fondu est injecté dans un moule et prend sa forme).

**b)** La fabrication du moule est très coûteuse (plusieurs milliers d'euros) et prend du temps. Ce coût est rentabilisé uniquement si on produit un grand nombre de pièces identiques. Pour un prototype unique, le coût du moule serait disproportionné.

**c)** L'impression 3D serait plus adaptée : pas besoin de moule, on fabrique directement à partir du modèle numérique. C'est rapide, peu coûteux pour une seule pièce, et cela permet de tester et modifier le design avant d'investir dans un moule de série.

---

### Exercice 3 — De la modélisation à la fabrication

Un élève conçoit sur Tinkercad une pièce de remplacement pour un tiroir de réfrigérateur. La pièce mesure 12 cm × 3 cm × 2 cm.

**a)** Remets dans l'ordre les étapes de fabrication : tranchage dans Cura, modélisation dans Tinkercad, impression sur l'Ender 3, export en STL, retrait des supports.

**b)** L'élève choisit une hauteur de couche de 0,2 mm et un remplissage de 40 %. La pièce doit résister à un effort de traction (on tire sur le tiroir). Le remplissage de 40 % est-il suffisant ? Argumente.

**c)** Pourquoi l'élève ne choisit-il pas le PLA pour cette pièce située dans un réfrigérateur ? Ou est-ce un bon choix ?

**Réponses :**

**a)** Ordre correct : 1. Modélisation dans Tinkercad → 2. Export en STL → 3. Tranchage dans Cura → 4. Impression sur l'Ender 3 → 5. Retrait des supports.

**b)** Pour une pièce soumise à un effort de traction régulier (ouverture/fermeture quotidienne du tiroir), un remplissage de 40 % pourrait être insuffisant, surtout aux points d'accroche. Il serait préférable de monter à 60-80 % pour garantir la solidité, ou bien de renforcer localement les zones de fixation. On peut aussi orienter l'impression pour que les couches soient perpendiculaires à l'effort de traction (les couches sont le point faible en traction).

**c)** Contrairement à ce qu'on pourrait penser, le PLA est un bon choix ici : un réfrigérateur est froid (environ 4°C), bien en dessous de la température de déformation du PLA (60°C). Le PLA convient donc parfaitement, et c'est même le meilleur choix car il est facile à imprimer, suffisamment résistant, et biodégradable.