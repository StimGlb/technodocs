# \_templates/

Dossier de **référence** pour la création de nouveaux wizards.
Ces fichiers ne sont pas des pages publiées.

## Contenu

| Fichier           | Usage                                                           |
| ----------------- | --------------------------------------------------------------- |
| `tpl-wizard.html` | Template HTML complet — copier et remplir les `{{PLACEHOLDER}}` |

## Workflow

1. Copier `tpl-wizard.html` → `../devoirs/{niveau}-{nom}.html`
2. Remplacer les placeholders
3. Configurer `collectionName` et `requiredFields` dans le `<script>`
4. Voir `docs/wizard/STRUCTURE.md` pour les conventions complètes
