## TechnoDocs — Pre‑deploy Checklist

Suivre cette checklist avant de proposer un déploiement vers Netlify.

- **Branche**: Confirmer que vous travaillez sur `dev` et non `main`.
- **Commits**: Utiliser `npm run commit` (Linux/macOS) ou `npm run commit:win` (Windows).
- **Security checks**: Exécuter `node security-check.js` et corriger tout avertissement (notamment usages d`innerHTML`).
- **CSP / headers**: Vérifier `netlify.toml` pour HSTS, CSP et Permissions-Policy.
- **Netlify credits**: Vérifier le quota de minutes restants dans le tableau de bord Netlify.
- **Tests rapides**: Lancer les scripts de test locaux pertinents ou vérifier manuellement les pages modifiées.
- **Registre des changements**: Mettre à jour `CHANGELOG.md` ou la section pertinente de la documentation.
- **Mock → Prod**: Si vous avez utilisé des mocks (SQLite), valider la configuration Firebase avant bascule.
- **Regard final**: Vérifier accessibilité (`aria-label`), messages d'erreur utilisateur, et indicateurs de chargement.

Si vous avez besoin, ajouter ici les commandes ou captures d'écran pour étapes spécifiques.
