technodocs-vanilla/
│
├── docs/wizard/
│ └── STRUCTURE.md ★ Convention & architecture wizard (lire en premier)
│
├── src/
│ ├── js/
│ │ ├── wizard-firebase.js ⚙️ Moteur wizard (ancienne version — à remplacer)
│ │ ├── new-wizard-firebase.js ⚙️ Moteur wizard (version corrigée — sera le canonical)
│ │ ├── wizard-config.js 🔑 Mot de passe & constantes partagées
│ │ ├── wizard-config-5e.js 🔑 Config variante 5ème
│ │ ├── wizard-consommation-maison.js 📦 Logique métier spécifique (exemple existant)
│ │ ├── article-editor.js 🛡️ Anti copier-coller (optionnel)
│ │ ├── components.js 🧩 Chargement header/footer
│ │ └── services/ 🔥 Firebase SDK config
│ │
│ ├── css/
│ │ ├── wizard.css 🎨 Styles .wizard\_\__ (phases, nav, modales, champs)
│ │ ├── forms.css 🎨 Styles génériques formulaires
│ │ ├── activite.css 🎨 Styles fiches d'activité (.fiche-_, .zone-reponse)
│ │ └── print.css 🖨️ Styles d'impression
│ │
│ ├── pages/activites/
│ │ ├── \_templates/
│ │ │ └── README.md 📖 Mode d'emploi du dossier templates
│ │ │ ⚠️ tpl-wizard.html à déplacer ici (voir ci-dessous)
│ │ │
│ │ └── devoirs/ 📄 Pages wizard publiées
│ │ ├── tpl-wizard.html ★ TEMPLATE DE RÉFÉRENCE (→ à déplacer dans \_templates/)
│ │ ├── conception3d.html
│ │ ├── 3e-consommation-maison.html
│ │ ├── 4e-consommation-maison.html
│ │ ├── 5e-consommation-maison.html
│ │ ├── evaluation-3d-reparabilite-3eme.html
│ │ ├── evaluation-3d-reparabilite-4eme.html
│ │ ├── evaluation-3d-reparabilite-5eme.html
│ │ ├── modelisation3d.html
│ │ └── presentation-objet-technique.html
│ │
│ ├── content/md/activites/
│ │ ├── \_templates/
│ │ │ └── README.md 📖 Mode d'emploi
│ │ │ ⚠️ GUIDE + squelette à déplacer ici
│ │ │
│ │ ├── NEW-GUIDE-STRUCTURE.md ★ GUIDE DE RÉDACTION (→ à déplacer dans \_templates/)
│ │ ├── squelette-fiche-activite.md 📝 Squelette MD (→ à déplacer dans \_templates/)
│ │ ├── exemple-activite.md 📝 Exemple MD (→ à déplacer dans \_templates/)
│ │ ├── s1-3eme-consommation-maison.md
│ │ ├── s1-4eme-consommation-maison.md
│ │ ├── s1-5eme-consommation-maison.md
│ │ └── tinkercad-detecteur-presence.md
│ │
│ └── data/activites/
│ ├── \_templates/
│ │ └── README.md 📖 Mode d'emploi
│ │ ⚠️ exemple-activite.json à déplacer ici
│ │
│ ├── exemple-activite.json 📋 Schéma JSON de référence (→ à déplacer)
│ ├── 3e-activite-consommation-maison.json
│ ├── 4e-activite-consommation-maison.json
│ ├── activite-consommation-maison.json
│ └── activite-montage-tinkercad.json
│
└── scripts/firestore/
├── autofill-wizard-firestore.js 🧪 Seeding données de test
└── export-firestore.js 📤 Export des soumissions
