# Guide de sécurité - TechnoDocs

## Configuration de sécurité actuelle

### Headers HTTP de sécurité (netlify.toml)

Le site est protégé par les headers suivants :

1. **Content Security Policy (CSP)**
   - Bloque les scripts et styles non autorisés
   - Protection contre les attaques XSS (Cross-Site Scripting)
   - Autorise uniquement Google Fonts comme ressource externe

2. **HTTP Strict Transport Security (HSTS)**
   - Force l'utilisation de HTTPS
   - Valide pendant 2 ans
   - Inclut les sous-domaines

3. **X-Frame-Options: DENY**
   - Protection contre le clickjacking
   - Empêche l'intégration du site dans des iframes

4. **Permissions-Policy**
   - Désactive les fonctionnalités non nécessaires (caméra, micro, géolocalisation, etc.)
   - Réduit la surface d'attaque

5. **X-Content-Type-Options: nosniff**
   - Empêche le navigateur de deviner le type MIME
   - Protection contre les attaques basées sur les types de fichiers

### Code JavaScript sécurisé

- ✅ Pas d'utilisation de `innerHTML`, `eval()` ou `document.write()`
- ✅ Validation des réponses HTTP avec `response.ok`
- ✅ Gestion d'erreurs différenciée dev/production
- ✅ Logs de debug uniquement en environnement local

## Recommandations pour la production

### Avant le déploiement

1. **Tester la CSP**
   - Ouvrir la console du navigateur
   - Vérifier qu'aucune erreur CSP n'apparaît
   - Tester toutes les pages

2. **Vérifier les liens externes**
   - S'assurer que tous les liens ont `rel="noopener"` (déjà fait)
   - Confirmer que les CDN sont fiables

3. **Contrôle d'accès aux corrections**
   - Actuellement public dans `/dist/pages/corrections/`
   - Si nécessaire, ajouter une authentification simple (ex: Netlify Identity)

### Surveillance continue

1. **Monitoring**
   - Surveiller les logs Netlify pour détecter des activités suspectes
   - Vérifier régulièrement les en-têtes HTTP avec https://securityheaders.com/

2. **Mises à jour**
   - Maintenir Vite à jour : `npm update`
   - Vérifier les vulnérabilités : `npm audit`

3. **Tests de sécurité avec les élèves**
   - Encourager les élèves à tester la sécurité de manière éthique
   - Créer un formulaire de signalement de vulnérabilités

## Script de vérification automatique

Un script de sécurité automatisé a été créé : `security-check.js`

### Utilisation

**En local (serveur de dev) :**
```bash
npm run dev                    # Lancer le serveur Vite (port 5173)
npm run security-check         # Dans un autre terminal
```

**En production :**
```bash
npm run security-check:prod
# ou
node security-check.js https://votre-site.netlify.app
```

### Ce que le script vérifie

✅ **Headers HTTP** : CSP, HSTS, X-Frame-Options, etc.
✅ **Code HTML** : Scripts inline, handlers inline, liens externes
✅ **Code JavaScript** : eval(), innerHTML, console.log, etc.
✅ **Dépendances** : Nombre et package-lock.json
✅ **Fichiers sensibles** : .env, credentials, etc.

### Interprétation du rapport

- **Score >= 80%** : Excellent niveau de sécurité
- **Score 60-79%** : Bon niveau, quelques optimisations possibles
- **Score < 60%** : Problèmes critiques à corriger

**Note importante** : Les headers de sécurité (CSP, HSTS) ne sont actifs qu'en **production sur Netlify**, pas en développement local. C'est normal d'avoir des échecs en local pour ces tests.

## Checklist de déploiement

- [x] Headers de sécurité configurés (CSP, HSTS, X-Frame-Options)
- [x] Gestion d'erreurs sécurisée (pas d'exposition d'infos sensibles)
- [x] Code JavaScript sans vulnérabilités XSS (pas de innerHTML, eval)
- [x] Liens externes avec `rel="noopener"`
- [x] Script de vérification automatique créé
- [ ] Test de la CSP sur toutes les pages
- [ ] Scan de sécurité avec SecurityHeaders.com
- [ ] Décision sur l'authentification pour les corrections
- [ ] Exécuter `npm run security-check:prod` après déploiement

## Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Netlify Security Headers](https://docs.netlify.com/routing/headers/)

## Contact

Pour signaler une vulnérabilité de sécurité, contactez l'enseignant directement.

---

*Dernière mise à jour : 2026-01-21*
