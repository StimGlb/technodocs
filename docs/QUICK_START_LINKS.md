# 🚀 Quick Start - Ajouter un lien

## Pour ajouter un outil (Tinkercad, Scratch, etc.)

**Fichier :** `dist/data/links.json`

```json
{
  "outils": [
    {
      "name": "Mon outil",
      "url": "https://example.com",
      "tag": "Description",
      "icon": {
        "type": "emoji",
        "value": "⚙️"
      },
      "external": true
    }
  ]
}
```

---

## Pour ajouter une correction

```json
{
  "corrections": [
    {
      "name": "Ma correction",
      "url": "/dist/pages/corrections/ma-correction.html",
      "description": "Description courte",
      "icon": "📄",
      "class": "correction-card--custom"
    }
  ]
}
```

---

## Pour ajouter un cours

```json
{
  "cours": [
    {
      "title": "Mon cours",
      "url": "/dist/pages/cours/mon-cours.html",
      "description": "Description du cours",
      "image": "/dist/images/mon-cours.svg",
      "color": "blue"
    }
  ]
}
```

---

## Emojis recommandés

| Catégorie | Emoji |
|-----------|-------|
| 3D | 🖨️ 📐 🔷 |
| Programmation | 🐍 💻 ⚙️ 🤖 |
| Robotique | 🤖 🦾 ⚡ |
| Design | 🎨 ✏️ 🖌️ |
| Réseaux | 🌐 📡 🔗 |
| Sécurité | 🔒 🛡️ 🔐 |
| Documents | 📄 📋 📝 |

---

## Tester

```bash
npm run dev
```

Ouvrir : `http://localhost:5173`

---

**Documentation complète :** `docs/LINKS_SYSTEM.md`
