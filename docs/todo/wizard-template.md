✅ État actuel fonctionnel
HTML :

3 phases avec navigation
Infos élève (nom, classe, date)
Types de champs variés : texte, textarea, checkbox, radio, number, select, tableau
Modales (completion, reset)
Toast notifications
Script de diagnostic Firestore (lignes 325-339)

JS (wizard-firebase.js) :

Import depuis ./services/firebase-config.js
Flag firestoreEnabled pour mode dégradé
Auto-save toutes les 15s
Gestion complète CRUD Firestore
Export/Import JSON local

🎯 Quels ajustements souhaites-tu ?
Quelques pistes possibles :

Sécurité — Ajouter une validation côté client avant envoi ?
UX — Indicateur de connexion Firestore visible pour l'élève ?
Sélecteur de classe — Remplacer l'input texte par un <select> avec tes classes (5-5, 5-6, 5-7, 4-1 à 4-5, 3-2 à 3-6) ?
Dashboard prof — Page admin pour voir les soumissions ?
Validation — Empêcher de passer à la phase suivante si champs requis vides ?
Offline — Fallback localStorage si Firestore indisponible ?