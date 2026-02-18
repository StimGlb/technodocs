# Essentials

## Architecture
- `wizard-firebase.js` : formulaires avec Firestore (autosave 5s debounced)
- `components.js` : header/footer injectés, nav dynamique depuis `navigation.json`
- `style.css` : CSS Variables, pas de framework CSS

## Points chauds
- Chemins relatifs calculés selon profondeur page
- CSP strict : zéro inline
- Flashcards : flip 3D, navigation clavier

## Focus actuel
Frontend statique stable. Backend en dev parallèle (hors scope frontend).
```

---

## 3. Prompt d'init (version finale)
```
@workspace Quick scan TechnoDocs :
1. Top 3 fichiers clés
2. 1 TODO critique si présent
3. État global (stable/à corriger)

Format court.
```

---

## 4. Séparation frontend/backend (important)

Quand tu bosses sur le **backend**, dis à Claude Code :
```
Context switch : backend uniquement.
Frontend TechnoDocs = stable, ne pas toucher.
```

Quand tu reviens sur le **frontend** :
```
Context switch : frontend TechnoDocs.
Rappel stack : Vanilla JS, Firebase v10+, Vite.
```

**Économie : évite les confusions entre les 2 projets**

---

## 5. Template questions (mis à jour)

### Frontend (TechnoDocs)
```
[fichier].js : [problème court]
Fix rapide ?
```

### Backend (nouveau projet)
```
Backend : [technologie] - [problème court]
Solution ?
```

**Exemple :**
```
Backend : Node.js + Express - authentification JWT
Structure recommandée ?
```

---

## 6. Cheat sheet finale
```
FRONTEND (TechnoDocs):
@workspace status        → état projet
@file.js review          → analyse rapide
Bug [fichier] : [desc]   → fix direct

BACKEND:
Backend : [tech] - [desc] → solution ciblée
```

---

## 7. Budget tokens optimisé

| Scénario | Tokens |
|----------|--------|
| Init session frontend | ~50 |
| Question frontend | ~40 |
| Switch backend | ~20 |
| Question backend | ~40 |

**Total session mixte : ~400-600 tokens** vs 3000+ avant

---

## Bonus : Garde ça sous les yeux
```
🎯 RÈGLE D'OR : 1 question = 1 fichier = 1 problème

❌ Évite : "Analyse components.js et wizard-firebase.js puis optimise la nav et fix le bug de sauvegarde"
✅ Fais : "wizard-firebase.js : bug autosave textarea. Fix ?"