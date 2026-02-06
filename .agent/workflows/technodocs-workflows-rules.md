---
description:
---

N'utilise jamais `git commit` directement. Utilise exclusivement les scripts de commit du projet : `npm run commit` (Linux/macOS) ou `npm run commit:win` (Windows). Pour la branche `main`, si une divergence est détectée, demande confirmation avant toute opération de force push.

Avant de proposer un push vers Netlify, vérifie si les changements sont purement documentaires (ex: modifications dans `README.md` ou fichiers de documentation). Si oui, rappelle que Netlify peut ignorer le build selon la configuration dans `netlify.toml`.

## Automated Workflow & Git

- **Commit Strategy**: Use `npm run commit`. Never bypass the commit scripts.
- **Branch Context**: Always verify you are on `dev` before modifying `src/js/`.
- **Pre-flight Check**: Run `node security-check.js` after any DOM manipulation to ensure no `innerHTML` has been re-introduced.
  -- **Build Awareness**: Group UI changes into a single "deployment batch" and check current Netlify build credits before deploying (voir `docs/DEPLOY_CHECKLIST.md`). Avoid hardcoding minute counts in docs; link to Netlify dashboard for live values.

Spec First : Définir le nom des champs data-field avant de générer le formulaire.

Mock Test : Avant de brancher Firebase, tester l'envoi vers le serveur local SQLite pour valider la structure JSON.

Audit Security : Vérifier qu'aucune clé API n'a été réintroduite dans le HTML lors de la génération.
