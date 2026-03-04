# Fiche 5 — Les réseaux informatiques
## 1. Qu'est-ce qu'un réseau informatique ?

Un **réseau informatique** est un ensemble d'équipements (ordinateurs, imprimantes, serveurs, smartphones…) **reliés entre eux** pour échanger des données.

**Deux grandes échelles** :
- **LAN** (Local Area Network) : réseau local — dans un bâtiment, un collège, une maison
- **WAN** (Wide Area Network) : réseau étendu — relie des réseaux locaux entre eux. **Internet** est le plus grand WAN du monde.

---

## 2. Les composants d'un réseau local

![Schéma d'un réseau local (LAN)](../../assets/revisions/reseau-local-schema.svg)

| Composant | Rôle | Analogie |
|-----------|------|----------|
| **Terminal** | Appareil qui envoie ou reçoit des données (PC, smartphone, imprimante) | Les habitants d'un quartier |
| **Commutateur (switch)** | Relie les terminaux du réseau local et distribue les données au bon destinataire | Le facteur du quartier |
| **Routeur** | Relie le réseau local à d'autres réseaux (Internet). Choisit le meilleur chemin pour les données | La poste qui envoie le courrier vers d'autres villes |
| **Serveur** | Ordinateur qui fournit des services (fichiers, sites web, impression) aux autres terminaux | La bibliothèque du quartier |
| **Câble Ethernet (RJ45)** | Relie physiquement les équipements (connexion filaire) | Les routes entre les maisons |
| **Point d'accès Wi-Fi** | Permet la connexion sans fil | Les routes aériennes |

### Commutateur vs routeur — La différence clé

| | Commutateur (switch) | Routeur |
|---|---------------------|---------|
| **Échelle** | Réseau local uniquement | Entre réseaux différents |
| **Adresse utilisée** | Adresse MAC (physique) | Adresse IP (logique) |
| **Rôle** | Distribuer les données au bon terminal dans le LAN | Trouver le chemin vers un autre réseau |

---

## 3. L'adresse IP

Chaque appareil connecté à un réseau possède une **adresse IP** unique qui l'identifie, comme une adresse postale identifie une maison.

### Format IPv4

Une adresse IPv4 est composée de **4 nombres** séparés par des points, chacun compris entre 0 et 255.

**Exemple** : `192.168.1.10`

### Partie réseau et partie machine

L'adresse IP se décompose en deux parties :

| Partie | Ce qu'elle identifie | Analogie |
|--------|---------------------|----------|
| **Partie réseau** | Le réseau auquel appartient l'appareil | Le nom de la rue |
| **Partie machine** | L'appareil précis dans ce réseau | Le numéro de la maison |

C'est le **masque de sous-réseau** qui délimite les deux parties.

---

## 4. La communication dans un réseau local

### Comment les données circulent-elles ?

Quand un ordinateur envoie des données à un autre dans le même réseau local :

1. L'ordinateur **découpe** les données en **paquets** (petits morceaux numérotés)
2. Chaque paquet contient : l'**adresse IP de l'expéditeur**, l'**adresse IP du destinataire**, et les **données**
3. Le paquet arrive au **commutateur** qui lit l'adresse de destination
4. Le commutateur **transmet** le paquet uniquement au bon terminal (pas à tous)
5. Le destinataire **réassemble** les paquets dans le bon ordre

### Pourquoi découper en paquets ?

- **Efficacité** : plusieurs communications peuvent partager le même câble en même temps
- **Fiabilité** : si un paquet se perd, on ne renvoie que celui-là (pas tout le message)
- **Équité** : un gros fichier ne bloque pas le réseau pour les autres utilisateurs

---

## 5. La circulation sur Internet (routage)

Quand les données doivent sortir du réseau local pour aller sur Internet, c'est le **routeur** qui prend le relais.

![Circulation des données sur Internet (routage)](../../assets/revisions/routage-internet.svg)

### Le protocole de routage

1. Le paquet quitte le réseau local via le **routeur** (passerelle par défaut)
2. Le routeur consulte sa **table de routage** : un tableau qui associe des adresses de destination aux prochains routeurs à contacter
3. Le paquet est transmis de **routeur en routeur** (chaque étape s'appelle un **saut** ou *hop*)
4. Chaque routeur choisit le **meilleur chemin** selon ses informations (vitesse, disponibilité)
5. Le paquet arrive au routeur du réseau de destination, qui le transmet au bon terminal

**Point important** : les paquets d'un même message peuvent emprunter des **chemins différents** sur Internet et arriver dans le désordre. Le destinataire les réassemble grâce à leur numéro d'ordre.

---

## 6. Résoudre un problème de communication

Au DNB, on peut te demander de diagnostiquer pourquoi deux machines ne communiquent pas.

### Checklist de diagnostic

| Vérification | Commande / action | Ce qu'on cherche |
|-------------|-------------------|-----------------|
| Connexion physique | Vérifier le câble, le voyant du port | Le câble est-il branché ? Le voyant est-il allumé ? |
| Adresse IP | `ipconfig` (Windows) ou `ifconfig` (Linux) | L'appareil a-t-il une adresse IP valide ? |
| Même réseau | Comparer les parties réseau des 2 machines | Les parties réseau sont-elles identiques ? |
| Masque identique | Comparer les masques de sous-réseau | Les deux machines utilisent-elles le même masque ? |
| Passerelle | Vérifier l'adresse de la passerelle par défaut | La passerelle est-elle configurée pour accéder à Internet ? |
| Test de connectivité | `ping [adresse IP]` | Le paquet arrive-t-il à destination ? |

---

## ✅ L'essentiel en 5 points

1. Un réseau local (LAN) relie des terminaux via un **commutateur** ; un **routeur** connecte le LAN à Internet.
2. Chaque appareil a une **adresse IP** unique, composée d'une partie réseau et d'une partie machine, séparées par le **masque de sous-réseau**.
3. Les données circulent sous forme de **paquets** contenant les adresses de l'expéditeur et du destinataire.
4. Sur Internet, les paquets sont acheminés de **routeur en routeur** grâce aux **tables de routage** (protocole de routage).
5. Pour diagnostiquer une panne réseau : vérifier le câble, l'adresse IP, le masque, la passerelle, puis tester avec `ping`.