Contexte lu

Vite indexe automatiquement tous les fichiers .html du repo via la fonction collectHtmlInputs dans vite.config.js.
Le header/footer sont injectés dynamiquement par components.js après un fetch de header.html et footer.html (components.js).
La page cours exemple charge des ressources par chemins relatifs et initialise le loader de cours avec initCoursPage('../../data/cours/reparabilite.json') (reparabilite.html).
wizard-firebase.js gère des formulaires wizard ; il dépend de sélecteurs DOM et d'IDs/data-attributes pour fonctionner (wizard-firebase.js).
Réponses aux questions

Comment components.js gère-t-il actuellement les chemins relatifs vers les assets (CSS/JS) selon la profondeur des dossiers ?

components.js utilise un fetch absolutisé sur le serveur : fetch('/src/includes/header.html'). L'include est récupérée avec un chemin root-anchored, donc l'opération de fetch elle-même n'est pas sensible à la profondeur des pages.
Par contre, il ne réécrit pas les URLs à l'intérieur du HTML inclus. Donc si header.html contient des liens relatifs (ex: href="css/header.css"), ces liens sont résolus par le navigateur relativement à l'URL de la page actuelle (ex: reparabilite.html), ce qui peut casser selon la profondeur. Conclusion : le fetch est robuste, mais les assets déclarés dans l'include doivent être absolus (ou root-anchored) pour être fiables partout.
Existe-t-il déjà un fichier JSON centralisant la liste des cours et des devoirs ?

Oui : le projet contient des fichiers JSON de cours sous src/data/cours/*.json (ex. reparabilite.json) et un système central links.json / links.json est déjà utilisé pour les liens. Les pages cours appellent explicitement les JSON de cours (ex. initCoursPage('../../data/cours/reparabilite.json')), donc la donnée est déjà partiellement centralisée.
Est-ce que le sélecteur #header-placeholder est présent de manière homogène sur toutes les pages ?

Oui. Recherche dans le repo montre des occurrences systématiques de <div id="header-placeholder"></div> sur les pages principales (index, pages cours, corrections, flashcards, outils, templates). Le pattern est appliqué de façon homogène.
Quelle est la meilleure stratégie pour injecter un menu dynamique sans casser le routing de Vite ?

Principes à suivre (robustes pour dev + build):
Fournir la navigation depuis un seul fichier JSON réutilisable et garanti dans le build (ex. src/data/navigation.json), mais rendre ce fichier importable/bundlable par Vite ou servi depuis public/ pour qu'il existe identiquement en dev et prod.
Option A (recommandée) : placer navigation.json dans src/data/navigation.json et l'importer depuis les modules JS (ex. import nav from '../data/navigation.json') — Vite bundle le JSON, pas de dépendance au copier manuellement.
Option B (alternative sûre) : placer navigation.json dans public/data/navigation.json et fetcher /data/navigation.json au runtime (fonctionne sans bundle).
Générer le menu via un loader JS (ex. links-loader.js / initNavigation) qui prend en charge :
URLs root-absolute (ex: /pages/cours/...) ou external: true pour liens externes.
Résolution d'icônes et attributs (title, tag, ordre).
Idempotence : effacer/ remplacer le contenu du container de nav au lieu d'append, et attacher listeners de façon non-duplicative.
Ne pas laisser d'assets relatifs dans header.html. Soit :
Utiliser des URLs absolues (ex. /src/css/header.css) ou mieux,
Déplacer tout CSS/JS partagé dans les bundles importés via modules (ex. import '/src/css/header.css' hors de l'include) pour éviter dépendances relatives.
Vérifier l'output build : si vous choisissez fetch runtime, stockez le JSON dans public/ ou importez-le pour qu'il soit inclus par Rollup.
Impact sur Vite routing :

Éviter reliance sur chemins relatifs dans les includes. Les imports ES (type=module) sont résolus par Vite et bundlés ; les fetch root-absolute ou import JSON assurent stabilité entre dev/prod.
Remarques sur l'impact possible sur wizard-firebase.js

wizard-firebase.js manipule des sélecteurs ([data-field], IDs) et ajoute listeners globaux. L'injection du header/menu ne doit pas :
introduire des IDs identiques déjà utilisés par les forms (ex. projectDate, progressFill, etc.), ni
ajouter des handlers globaux nommés qui pourraient entrer en conflit.
Recommandation : le menu generator doit cibler son propre container (#main-nav ou similaire) et ne pas ajouter d'éléments avec data-field ou IDs génériques. Init functions (ex. initNavigation) doivent être idempotentes.
Proposition concise pour la structure de src/data/navigation.json

Format recommandé (listes par section, objets légers) :
{
"cours": [
{
"id": "reparabilite",
"name": "Réparabilité",
"url": "/src/pages/cours/reparabilite.html",
"tag": "Cours",
"icon": { "type": "emoji", "value": "🛠️" },
"order": 10,
"visible": true
}
],
"devoirs": [
{
"id": "conception3d-devoir",
"name": "Conception 3D (Devoir)",
"url": "/src/pages/activites/devoirs/conception3d.html",
"tag": "Devoir",
"icon": { "type": "emoji", "value": "📐" },
"visible": true
}
],
"outils": [
{
"id": "tinkercad-classes",
"name": "Tinkercad - Classes",
"url": "/src/pages/outils/tinkercad-classes.html",
"external": false,
"icon": { "type": "emoji", "value": "🔧" },
"visible": true
}
],
"meta": {
"generatedAt": "2026-02-03T00:00:00Z",
"version": "1.0"
}
}

Champs utiles : id, name, url, tag, icon:{type,value}, external (bool), order (number), parent (string, optional), visible (bool).
Utiliser URLs root-absolute ou chemins resolvables par Vite (ou importer JSON) pour éviter casse.
Actions suivantes que je peux faire pour implémenter/prototyper :

Générer un src/data/navigation.json exemplaire à partir des src/data/cours/*.json et links.json.
Adapter components.js ou links-loader.js pour charger navigation.json (via import ou fetch) et rendre le menu de façon idempotente.
Vérifier header.html et remplacer tous les assets relatifs par des paths absolus ou les convertir en imports JS/CSS.