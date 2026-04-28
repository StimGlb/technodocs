---
tags:
  - index
  - moc
outils_ia: claude-lead-dev
---

# 🗺️ WorkSpace — Tableau de bord

---

# 🚀 Focus Session : Correction Navigation
**Problème** : Conflit entre `replaceWith()` dans `components.js` et l'initialisation de la navigation.
- [ ] Modifier `src/js/components.js` pour utiliser un événement personnalisé `components-loaded`.
- [ ] Nettoyer `src/includes/header.html` (supprimer le contenu statique redondant).
- [ ] Mettre à jour `src/js/app.js` pour écouter `components-loaded` avant d'initier la navigation.
- [ ] Lancer un build de test : `npm run build`.

---

# 📁 Projets en cours

### 🎯 Priorité Immédiate
- **Plan de Développement 3PM** : [[50_DEV/Page-prepa-metiers-dev-plan-3pm.md]]
- **Dossier des Artefacts** : [[50_DEV/Artefacts/_index|Accès Artefacts]]

### 📊 État des Sessions
```dataview
TABLE statut, outils_ia AS "🤖 IA", file.mtime AS "Modifié"
FROM "20_SESSIONS/21_En_cours" OR "50_DEV"
WHERE file.name != "_index"
SORT file.mtime DESC
LIMIT 5
```

---

# 🛠️ Monitoring OpenCode
> Cette section reçoit les logs automatiques du **Context Bridge**.

```dataview
TABLE 
    last_build_status as "Statut Build",
    blocking_phase as "Phase Bloquante",
    last_error as "Dernière Erreur",
    dateformat(date(last_build_attempt), "dd/MM HH:mm") as "Date"
FROM "50_DEV"
WHERE last_build_status != null
SORT last_build_attempt DESC
LIMIT 1
```

---

## 📅 Vue d'ensemble
### Aujourd'hui
```dataview
TABLE WITHOUT ID
	"📝 " + file.link AS "Entrée du jour",
	choice(file.mtime > date(today), "✅ Mise à jour", "⚠️ À compléter") AS "Statut"
FROM "40_JOURNAL"
WHERE file.day = date(today)
LIMIT 1
```

---

## ✅ Tâches & Actions
```dataview
TASK
FROM "70_TASKS" OR "50_DEV"
WHERE !completed AND (due <= date(today) OR priority = "high")
SORT due ASC
LIMIT 10
```

---

## 💻 Développement & Artefacts
```dataview
TABLE projet AS "Projet", outils_ia AS "🤖 IA", file.mtime AS "Modifié"
FROM "50_DEV/Artefacts"
WHERE file.name != "_index"
SORT file.mtime DESC
LIMIT 5
```

---

## 📥 Inbox à trier
```dataview
TABLE file.ctime AS "Créé", file.size AS "Taille"
FROM "60_INBOX"
WHERE file.name != "_index"
SORT file.ctime DESC
LIMIT 5
```

---

## 🔗 Navigation rapide
| Section | Lien |
|---|---|
| **Dev & Doc** | [[50_DEV/_index|50_DEV]] / [[50_DEV/Artefacts/_index|Artefacts]] |
| **Sessions** | [[20_SESSIONS/21_En_cours/_index|Actives]] / [[20_SESSIONS/22_En_attente/_index|En attente]] |
| **Journal** | [[40_JOURNAL/2026/03_Mars/_index|Journal]] |
| **Inbox** | [[60_INBOX/_index|60_INBOX]] |

*Dernière mise à jour : `= date(today)`*
