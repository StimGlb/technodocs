1. Structure des données

Évite les lectures inutiles : Firestore facture par document lu. Si tu charges un document entier alors que tu n’as besoin que d’un champ, utilise des requêtes avec select() pour ne récupérer que les champs nécessaires.
Dénormalisation : Firestore n’a pas de jointures. Si tu as besoin de données liées, duplique-les intelligemment pour éviter plusieurs lectures.
Hiérarchie des collections : Organise tes collections pour minimiser les lectures. Par exemple, évite les sous-collections profondes si tu dois souvent lire tout le contenu.

2. Requêtes et index

Utilise des index composites : Firestore crée automatiquement des index pour les champs simples, mais pour les requêtes complexes (avec plusieurs filtres ou tris), crée des index composites manuellement.
Évite les requêtes non indexées : Firestore bloque les requêtes non indexées en production. Teste toujours tes requêtes en mode développement pour détecter les erreurs d’index.

3. Sécurité et règles

Règles de sécurité : Limite l’accès aux données sensibles ou inutiles pour l’utilisateur. Par exemple, utilise request.auth pour restreindre les lectures/écritures selon les rôles.
Validation des données : Utilise les règles pour valider la structure des données et éviter les écritures inutiles ou malformées.

4. Cache et optimisation côté client

Cache local : Active le cache côté client pour réduire le nombre de lectures réseau.
Écouteurs en temps réel : Désactive les écouteurs (onSnapshot) quand ils ne sont plus nécessaires pour éviter des lectures continues inutiles.

5. Surveillance et alertes

Tableau de bord Firebase : Surveille l’onglet “Usage” pour détecter les pics de lectures/écritures.
Alertes budgétaires : Configure des alertes dans Google Cloud pour être notifié en cas de dépassement de seuil.

6. Bonnes pratiques supplémentaires

Batch writes : Regroupe les écritures avec batch pour réduire le nombre d’opérations facturées.
Suppression des données inutiles : Nettoie régulièrement les données obsolètes ou inutilisées.
Utilise des fonctions cloud : Pour les opérations lourdes (comme les agrégations), utilise Cloud Functions plutôt que de tout faire côté client.
