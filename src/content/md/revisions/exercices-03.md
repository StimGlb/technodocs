## 🧪 Exercices type DNB

### Exercice 1 — Identifier les éléments d'une chaîne d'information

Un portail automatique de maison possède les éléments suivants : une télécommande radio, un récepteur radio, une carte électronique, un voyant LED (vert = ouvert, rouge = fermé), et un moteur électrique.

**a)** Place chaque élément dans la bonne fonction de la chaîne d'information : acquérir, traiter, communiquer, commander.

**b)** Quel est le capteur de ce système ? Quelle grandeur détecte-t-il ?

**c)** Comment la chaîne d'information commande-t-elle la chaîne d'énergie dans ce système ?

**Réponses :**

**a)** Acquérir : récepteur radio (capte le signal de la télécommande). Traiter : carte électronique (analyse le signal et décide d'ouvrir ou fermer). Communiquer : voyant LED (informe l'utilisateur de l'état du portail). Commander : la carte envoie un ordre au moteur.

**b)** Le capteur est le récepteur radio. Il détecte les ondes radio émises par la télécommande (signal électromagnétique).

**c)** La carte électronique (traiter) envoie un signal électrique au moteur (composant de la chaîne d'énergie) pour le faire tourner dans un sens (ouvrir) ou dans l'autre (fermer).

---

### Exercice 2 — Capteur analogique vs numérique

Un système d'éclairage automatique de jardin utilise un capteur de luminosité (LDR) et un capteur infrarouge de présence.

**a)** Lequel est analogique ? Lequel est numérique ? Justifie.

**b)** Le microcontrôleur reçoit la valeur 750 du capteur de luminosité (sur une échelle de 0 à 1023). Le programme allume les lampes si la valeur est inférieure à 400 ET qu'une présence est détectée. Avec cette valeur de 750, que se passe-t-il ?

**c)** La nuit tombe et la valeur passe à 280. Une personne passe devant le capteur infrarouge. Décris ce qui se passe dans chaque fonction de la chaîne d'information.

**Réponses :**

**a)** Le capteur de luminosité (LDR) est analogique : il renvoie une valeur continue qui varie avec l'intensité lumineuse (de 0 = très sombre à 1023 = très lumineux). Le capteur infrarouge de présence est numérique : il renvoie 0 (personne) ou 1 (présence détectée).

**b)** La valeur 750 est supérieure à 400 : il fait encore jour. La condition « inférieure à 400 » n'est pas remplie, donc les lampes restent éteintes même si une présence est détectée (les deux conditions doivent être vraies en même temps).

**c)** Acquérir : le LDR mesure 280 (nuit) et le capteur infrarouge détecte une présence (1). Traiter : le microcontrôleur vérifie les conditions — 280 < 400 (vrai) ET présence = 1 (vrai) → décision : allumer. Communiquer : (si IHM présente) un voyant pourrait indiquer le mode actif. Commander : le microcontrôleur envoie un signal pour activer le relais qui allume les lampes → la chaîne d'énergie s'active.

---

### Exercice 3 — Schéma complet des deux chaînes

Un aspirateur robot possède : une batterie, un moteur d'aspiration, un moteur de roues, des capteurs de choc (pare-chocs), un capteur infrarouge (détection de vide/escalier), un microprocesseur, un voyant LED de charge, et des roues.

**a)** Identifie les éléments qui appartiennent à la chaîne d'information et ceux qui appartiennent à la chaîne d'énergie.

**b)** Le robot détecte un obstacle avec son pare-chocs. Décris le trajet de l'information depuis la détection jusqu'au changement de direction.

**c)** Pourquoi dit-on que la chaîne d'information « pilote » la chaîne d'énergie ?

**Réponses :**

**a)** Chaîne d'information : capteurs de choc (acquérir), capteur infrarouge (acquérir), microprocesseur (traiter), voyant LED (communiquer). Chaîne d'énergie : batterie (alimenter), microprocesseur/relais (distribuer), moteur d'aspiration + moteur de roues (convertir), roues (transmettre).

Note : le microprocesseur apparaît dans les deux chaînes car il traite l'information ET commande la distribution d'énergie.

**b)** Le capteur de choc (pare-chocs) détecte le contact avec l'obstacle → il envoie un signal au microprocesseur → le programme décide de reculer puis de tourner → le microprocesseur commande les moteurs de roues : d'abord en marche arrière, puis un moteur tourne plus vite que l'autre pour changer de direction → le robot repart dans une nouvelle direction.

**c)** Sans la chaîne d'information, les moteurs fonctionneraient en permanence dans la même direction : le robot irait tout droit et se bloquerait contre le premier mur. C'est la chaîne d'information qui, grâce aux capteurs et au programme, décide quand démarrer, quand tourner, quand s'arrêter, et à quelle vitesse. Elle « pilote » la chaîne d'énergie en lui donnant des ordres adaptés à la situation.
