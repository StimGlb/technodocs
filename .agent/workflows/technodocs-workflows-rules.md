---
description: 
---

N'utilise jamais git commit directement. Utilise exclusivement le script de commit du projet via npm run commit (ou npm run commit:win sur Windows). Pour la branche main, si une divergence est détectée, demande confirmation avant toute opération de force push.

Avant de suggérer un push vers Netlify, vérifie si les changements sont purement documentaires (ex: modifications dans README.md ou .agentrules). Si c'est le cas, rappelle que le build sera ignoré par Netlify grâce à la règle ignore dans netlify.toml.

## Automated Workflow & Git
- **Commit Strategy**: Use `npm run commit`. Never bypass the commit scripts.
- **Branch Context**: Always verify you are on `dev` before modifying `src/js/`.
- **Pre-flight Check**: Run `node security-check.js` after any DOM manipulation to ensure no `innerHTML` has been re-introduced.
- **Build Awareness**: Group UI changes into a single "deployment batch" to preserve the remaining 105 Netlify build minutes.