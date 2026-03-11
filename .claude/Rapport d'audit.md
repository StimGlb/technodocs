Rapport d'audit — Impression fiches d'activité TechnoDocs
Analyse des fichiers
activite.css — Problème majeur : double définition de .zone-reponse
La classe .zone-reponse est définie deux fois dans le même fichier, avec des valeurs contradictoires :

Propriété 1ère définition (ligne ~19) 2ème définition (ligne ~76) Résultat
border 1px dashed var(--color-gray-400) 1px solid #ccc 2ème gagne — le tiret disparaît
min-height 80px 60px 2ème gagne
padding var(--space-2) (absent) Perdu — aucun padding
background var(--color-gray-50) #fafafa 2ème gagne
La 1ère définition est du code mort. De plus, .zone-reponse--large est défini dans les deux blocs (160px vs 150px), le second l'emporte. .zone-reponse--medium est absent de la 1ère définition.

activite.css — .fiche-travail : fond incohérent sur dark theme

background: var(--color-primary-lighter, #e8f0fe);
Si --color-primary-lighter n'est pas défini dans le dark theme, le fallback #e8f0fe (bleu très clair) s'applique sur fond sombre — contraste visuellement cassé.

activite.css — Responsive incomplet
.fiche-deux-colonnes n'a pas de breakpoint mobile. Sur tablette ou smartphone élève, les deux colonnes restent côte à côte, la colonne illustration devient trop étroite.

print.css — Section 6 : redondance des border-color
En fin de section 6, trois sélecteurs redéfinissent leur border-color :

/_ Bordures restaurées (après reset _) \*/.fiche-ost, .fiche-activite, .fiche-conclusion {    border-color:  #999 !important;}
Ces couleurs sont déjà définies dans la section 5 via border: 1pt solid #999 !important. La section 6 est un doublon sans effet.

print.css — Section 2 : masquage partiellement redondant

body > *:not(main) { display: none !important; }  /* couvre header/footer directs */header, footer, nav, .header, .footer { display: none !important; }  /* idem + classes \*/
Si <header> et <footer> sont des enfants directs de <body> (ce qui est le cas dans le template), la 2ème règle ne fait que doubler la première pour les éléments sémantiques. Elle reste utile uniquement pour les classes .header/.footer ou des structures imbriquées.

print.css — Section 6 : h4 non stylé
Les règles typographiques print couvrent h2 (12pt) et h3 (11pt) mais pas h4. Tout contenu markdown utilisant #### hérite du body à 9pt sans réduction de marge.

print.css — Zones de réponse sans padding
.zone-reponse en print n'a pas de padding défini. La zone d'écriture commence au bord de la bordure — inconfortable pour écrire au stylo, et peu professionnel.

template-activite.html — .fiche-identite : bloc legacy sans utilité
Le bloc .fiche-identite est masqué à l'écran (activite.css) et en impression (print.css). Il n'est jamais visible. C'est du code mort qui a été remplacé par .print-header\_\_identite mais n'a pas été supprimé.

cours-loader.js — Code carousel mort pour les fiches activité
Les fonctions renderCarousel(), initCarouselNavigation(), goToSlide(), etc. cherchent des IDs (carousel-track, carousel-prev, carousel-next, carousel-dots) qui n'existent pas dans template-activite.html. Le code ne plante pas (garde if (!track || ...) return) mais il s'exécute inutilement à chaque chargement de fiche.

exemple-activite.md — Inline style incohérent

<div class="zone-reponse zone-reponse--lignes" style="min-height: 80px;"></div>
Un min-height en px est injecté inline, contournant le système de classes (zone-reponse = 30mm print, 60px écran). En print, !important gagne donc le rendu est préservé, mais c'est une incohérence de convention — les tailles doivent passer par les classes modificatrices, pas par des styles inline.

A. Corrections (bugs ou problèmes de rendu)
A1 — Double définition .zone-reponse dans activite.css
Quoi : Fusionner les deux blocs en une seule définition cohérente
Pourquoi : Le padding est actuellement perdu, la bordure dashed voulue en première définition est écrasée, les hauteurs sont incohérentes entre les deux blocs
Comment : Supprimer la 1ère définition (code mort) ou fusionner les propriétés utiles dans la 2ème. Vérifier que padding est explicitement ajouté pour les zones de saisie
Effort : faible
A2 — .fiche-identite legacy à supprimer
Quoi : Supprimer le bloc .fiche-identite du HTML et ses règles CSS
Pourquoi : Jamais visible, jamais utile. La division identité est assurée par .print-header**identite. Présence trompeuse pour tout développeur qui lirait le template
Comment : Supprimer le <div class="fiche-identite"> du template, et les règles .fiche-identite dans activite.css et print.css
Effort : faible
A3 — Inline style min-height: 80px dans le markdown
Quoi : Remplacer le style inline par une classe modificatrice
Pourquoi : Incohérence avec le système de classes ; comportement imprévisible à l'écran si la valeur est différente de la classe par défaut
Comment : Créer une classe .zone-reponse--petite (ou utiliser la valeur par défaut sans modificateur) et remplacer le style inline dans le .md
Effort : faible
B. Améliorations de mise en forme (quick wins)
B1 — Zones de réponse sans padding en print
Quoi : Ajouter padding: 2mm 3mm aux .zone-reponse dans print.css
Pourquoi : L'élève écrit au stylo dans la zone ; sans padding, le texte commence au bord de la bordure → illisible et non professionnel
Comment : Ajouter dans la section 5 de print.css, règle .zone-reponse
Effort : faible
B2 — Ajouter h4 aux styles typographie print
Quoi : Ajouter .md-content h4 { font-size: 10pt; margin: 1.5mm 0 1mm 0 } en section 6
Pourquoi : un h4 non stylé hérite du body 9pt sans marge, indiscernable du corps de texte
Comment : Section 6 de print.css, après la règle h3
Effort : faible
B3 — Supprimer la redondance border-color section 6
Quoi : Supprimer le bloc "Bordures restaurées" en fin de section 6
Pourquoi : Code mort — les bordures sont déjà correctement définies en section 5
Comment : Supprimer les 5 lignes concernées dans print.css
Effort : faible
B4 — Ligne séparatrice entre print-header et le contenu
Quoi : Ajouter un espacement ou une ligne fine entre .print-header et le premier bloc de contenu (.fiche-ost)
Pourquoi : La hiérarchie header → contenu n'est pas assez marquée visuellement sur le papier. Le margin-bottom: 3mm du print-header est insuffisant si .fiche-ost commence immédiatement
Comment : Augmenter le margin-bottom de .print-header à 4–5mm, ou ajouter une border-bottom visible sur .print-header avant le contenu
Effort : faible
B5 — Fond de .fiche-travail à corriger pour le dark theme (écran)
Quoi : Remplacer var(--color-primary-lighter, #e8f0fe) par une couleur compatible dark theme, ou définir la variable dans le thème sombre
Pourquoi : Bleu clair sur fond sombre = mauvais contraste à l'écran. En print c'est déjà #eee donc aucun risque côté impression
Comment : Modifier activite.css ou définir --color-primary-lighter dans :root pour le dark theme
Effort : faible
B6 — min-height explicite sur .print-header**bandeau
Quoi : Ajouter un min-height (ex. 12mm) sur .print-header**bandeau
Pourquoi : Si le titre est court, la colonne gauche (séquence/séance) et la colonne droite (logo) occupent plus de hauteur verticale que le centre — le bandeau s'aplatit asymétriquement
Comment : Section 3 de print.css, règle .print-header**bandeau
Effort : faible
C. Fonctionnalités nouvelles
C1 — Numérotation des pages
Quoi : Ajouter la numérotation "1 / 2" en bas à droite de chaque page imprimée
Pourquoi : Sur un document élève 2 pages recto-verso, sans numérotation les pages peuvent être confondues ou désordonnées
Comment : Règle @page { @bottom-right { content: counter(page) " / " counter(pages) } } dans print.css. Support Chrome OK, Firefox non — acceptable en progressive enhancement
Effort : faible
C2 — Header compact répété en haut de la page 2
Quoi : Ajouter une version allégée du print-header (Prénom / Nom / Classe + titre uniquement) qui apparaît en tête de la page 2
Pourquoi : Sur un document 2 pages distribué à 25 élèves, si les feuilles se séparent la page 2 est sans identification
Comment : Créer un .print-header-compact avec position: fixed; top: 0 et ajouter margin-top: 10mm au .md-content pour compenser. À tester — comportement de position: fixed en print varie selon les navigateurs. Alternative: duplication de l'élément avec display: none à l'écran
Effort : moyen
C3 — Responsive mobile du layout deux colonnes
Quoi : Passer .fiche-deux-colonnes en colonne unique sous 768px
Pourquoi : Sur tablette élève ou smartphone, les colonnes sont trop étroites. La zone illustration se retrouve à ~40% de largeur inutilisable
Comment : Ajouter dans activite.css : @media (max-width: 768px) { .fiche-deux-colonnes { flex-direction: column; } }
Effort : faible
C4 — Variante "corrigé enseignant"
Quoi : Classe .fiche-corrige sur <body> qui révèle les réponses attendues et change le bandeau "Fiche d'activité" → "Corrigé enseignant"
Pourquoi : L'enseignant a besoin d'une version imprimable avec les réponses pour corriger ou projeter. Actuellement, deux documents séparés seraient nécessaires
Comment : Ajouter des <div class="correction-only"> dans les .md, masqués par défaut, visibles quand .fiche-corrige est actif. Paramètre URL ?corrige pour activer via JS
Effort : élevé
Synthèse des priorités
Priorité Item Effort
🔴 Bug A1 — Double définition .zone-reponse faible
🔴 Bug A2 — .fiche-identite legacy faible
🔴 Bug A3 — Inline style .md faible
🟡 Quick win B1 — Padding zones de réponse print faible
🟡 Quick win B3 — Redondance border-color section 6 faible
🟡 Quick win B2 — h4 print faible
🟡 Quick win B4 — Séparateur header/contenu faible
🟡 Quick win B5 — Fond fiche-travail dark theme faible
🟡 Quick win B6 — min-height bandeau faible
🟢 Nouveau C1 — Numérotation pages faible
🟢 Nouveau C3 — Responsive mobile faible
🟢 Nouveau C2 — Header compact page 2 moyen
🟢 Nouveau C4 — Corrigé enseignant élevé
Tous les items A et B peuvent être traités dans la même session sans risque de régression. Je n'ai rien modifié — dis-moi lesquels tu veux implémenter et dans quel ordre.
