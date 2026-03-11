## 🧪 Exercices type DNB

### Exercice 1 — Identifier les composants

Le réseau du CDI d'un collège est composé de : 8 ordinateurs, 1 imprimante réseau, 1 commutateur 16 ports, 1 routeur relié à la box Internet, et des câbles Ethernet.

**a)** Combien de terminaux ce réseau comporte-t-il ?

**b)** Quel est le rôle du commutateur dans ce réseau ?

**c)** Un élève veut accéder à un site web depuis un PC du CDI. Par quels équipements le paquet de données va-t-il transiter, dans l'ordre ?

**Réponses :**

**a)** 9 terminaux : 8 ordinateurs + 1 imprimante réseau. Le commutateur et le routeur ne sont pas des terminaux, ce sont des équipements d'interconnexion.

**b)** Le commutateur relie tous les terminaux du réseau local entre eux. Quand un ordinateur envoie des données, le commutateur lit l'adresse de destination et transmet le paquet uniquement au bon terminal, sans encombrer les autres.

**c)** PC → commutateur → routeur → Internet (routeurs intermédiaires) → serveur web du site. La réponse fait le chemin inverse.

---

### Exercice 2 — Adressage IP

Dans un réseau local, trois ordinateurs sont configurés ainsi :

| Machine | Adresse IP | Masque |
|---------|-----------|--------|
| PC1 | 192.168.1.10 | 255.255.255.0 |
| PC2 | 192.168.1.25 | 255.255.255.0 |
| PC3 | 192.168.2.10 | 255.255.255.0 |

**a)** Quelle est la partie réseau de l'adresse de PC1 ? Et sa partie machine ?

**b)** PC1 et PC2 peuvent-ils communiquer directement (sans routeur) ? Justifie.

**c)** PC1 et PC3 peuvent-ils communiquer directement ? Justifie. Que faudrait-il faire pour qu'ils communiquent ?

**Réponses :**

**a)** Avec le masque 255.255.255.0, les 3 premiers octets sont la partie réseau et le dernier est la partie machine. PC1 : partie réseau = 192.168.1, partie machine = 10.

**b)** Oui. PC1 (192.168.**1**.10) et PC2 (192.168.**1**.25) ont la même partie réseau (192.168.1) et le même masque. Ils sont dans le même réseau local et peuvent communiquer directement via le commutateur.

**c)** Non. PC1 (192.168.**1**.10) et PC3 (192.168.**2**.10) ont des parties réseau différentes (192.168.1 vs 192.168.2). Ils ne sont pas dans le même réseau. Pour communiquer, il faudrait un routeur qui connecte les deux réseaux, ou bien modifier l'adresse IP de PC3 pour qu'il soit dans le réseau 192.168.1.x.

---

### Exercice 3 — Routage

Un paquet est envoyé depuis l'ordinateur A (192.168.1.10) vers le serveur B (82.45.12.3). Voici la table de routage simplifiée du routeur R1 :

| Destination | Prochain saut |
|-------------|---------------|
| 192.168.1.0/24 | Directement connecté |
| 82.45.0.0/16 | Routeur R2 (10.0.0.2) |
| 0.0.0.0 (défaut) | Routeur R3 (10.0.0.1) |

**a)** Le routeur R1 reçoit le paquet destiné à 82.45.12.3. Quelle ligne de la table de routage utilise-t-il ? Vers quel routeur transmet-il le paquet ?

**b)** Si la destination avait été 172.16.5.8 (adresse qui ne correspond à aucune ligne spécifique), que ferait le routeur ?

**c)** Explique pourquoi les paquets d'un même message peuvent emprunter des chemins différents sur Internet.

**Réponses :**

**a)** L'adresse 82.45.12.3 correspond au réseau 82.45.0.0/16 (les deux premiers octets correspondent). Le routeur utilise la deuxième ligne et transmet le paquet au routeur R2 (10.0.0.2).

**b)** L'adresse 172.16.5.8 ne correspond ni à 192.168.1.0/24 ni à 82.45.0.0/16. Le routeur utilise la route par défaut (0.0.0.0) et transmet le paquet au routeur R3 (10.0.0.1), qui saura peut-être le faire suivre.

**c)** Internet est composé de nombreux routeurs interconnectés. Chaque routeur choisit le meilleur chemin au moment où il reçoit le paquet, en fonction de l'état du réseau (charge, pannes). Si un lien est saturé ou coupé, les routeurs redirigent les paquets par un autre chemin. Comme les paquets arrivent à des moments différents, l'état du réseau peut avoir changé entre deux paquets successifs, d'où des chemins différents. Le destinataire se charge de les remettre dans l'ordre.