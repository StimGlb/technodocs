/**
 * ═══════════════════════════════════════════════════════════════
 *  DEV PAGES REGISTRY — TechnoDocs
 *  Fichier externalisé pour conformité CSP (script-src 'self')
 *  status: "wip" | "ready" | "broken"
 *  tag: "new" | "wip" | "updated" | null
 * ═══════════════════════════════════════════════════════════════
 */
const PAGES = [
  // ── Cours ──────────────────────────────────────────────
  {
    section: "Cours",
    name: "Conception 3D",
    path: "/src/pages/cours/conception-3d.html",
    status: "ready",
  },
  {
    section: "Cours",
    name: "Modélisation 3D",
    path: "/src/pages/cours/modelisation3d.html",
    status: "ready",
  },
  {
    section: "Cours",
    name: "Réparabilité",
    path: "/src/pages/cours/reparabilite.html",
    status: "ready",
  },
  {
    section: "Cours",
    name: "Index général cours",
    path: "/src/pages/cours/index-cours.html",
    status: "ready",
    tag: "new",
  },

  // ── Activités ──────────────────────────────────────────
  {
    section: "Activités",
    name: "Devoirs (index)",
    path: "/src/pages/activites/devoirs.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "3ème (index)",
    path: "/src/pages/activites/3eme.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "4ème (index)",
    path: "/src/pages/activites/4eme.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "5ème (index)",
    path: "/src/pages/activites/5eme.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Devoirs — Présentation objet technique",
    path: "/src/pages/activites/devoirs/presentation-objet-technique.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Devoirs — Conception 3D",
    path: "/src/pages/activites/devoirs/conception3d.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Devoirs — Modélisation 3D",
    path: "/src/pages/activites/devoirs/modelisation3d.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Devoirs — Évaluation 3D réparabilité 3ème",
    path: "/src/pages/activites/devoirs/evaluation-3d-reparabilite-3eme.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Devoirs — Évaluation 3D réparabilité 4ème",
    path: "/src/pages/activites/devoirs/evaluation-3d-reparabilite-4eme.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Devoirs — Évaluation 3D réparabilité 5ème",
    path: "/src/pages/activites/devoirs/evaluation-3d-reparabilite-5eme.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Activité montage Tinkercad",
    path: "/src/pages/activites/activite-montage-tinkercad.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Tinkercad détecteur de présence - 4ème",
    path: "/src/pages/activites/4e-tinkercad-detecteur-presence.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "3e consommation maison",
    path: "/src/pages/activites/3eme/3e-consommation-maison.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "4e consommation maison",
    path: "/src/pages/activites/4eme/4e-consommation-maison.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "5e consommation maison",
    path: "/src/pages/activites/5eme/5e-consommation-maison.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "3e documents techniques habitat",
    path: "/src/pages/activites/3eme/3e-documents-techniques-habitat.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "5e documents techniques habitat",
    path: "/src/pages/activites/5eme/5e-documents-techniques-habitat.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Phase 3 - 3e habitat énergie",
    path: "/src/pages/activites/3eme/phase3-3e-habitat-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Phase 3 - 4e habitat énergie",
    path: "/src/pages/activites/4eme/phase3-4e-habitat-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Template activité",
    path: "/src/pages/activites/template-activite.html",
    status: "ready",
  },
  {
    section: "Activités",
    name: "Template wizard",
    path: "/src/pages/activites/tpl-wizard.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Artemis II simulateur (activité)",
    path: "/src/pages/activites/3eme/artemis-ii-simulateur.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Devoir conso maison",
    path: "/src/pages/activites/devoir-conso-maison.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Corr 3e simulateur conso wizard",
    path: "/src/pages/activites/3eme/corr-3e-simulateur-conso-wizard.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "3e simulateur conso wizard",
    path: "/src/pages/activites/3eme/3e-simulateur-conso-wizard.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "S3 éclairage couloir",
    path: "/src/pages/activites/habitat-energie/s3-eclairage-couloir.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "S3 éclairage adaptatif",
    path: "/src/pages/activites/habitat-energie/s3-eclairage-adaptatif.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "S3 alerte qualité air",
    path: "/src/pages/activites/habitat-energie/s3-alerte-qualite-air.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "3e mesure chaîne énergie",
    path: "/src/pages/activites/3eme/3e-mesure-chaine-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "4e mesure chaîne énergie",
    path: "/src/pages/activites/4eme/4e-mesure-chaine-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Phase 1 - 4e habitat énergie",
    path: "/src/pages/activites/4eme/phase1-4e-habitat-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Activités",
    name: "Documents techniques habitat",
    path: "/src/pages/activites/3eme/documents-techniques-habitat.html",
    status: "ready",
    tag: "new",
  },

  // ── Projets ────────────────────────────────────────────
  {
    section: "Projets",
    name: "Sélection projets impression 3D",
    path: "/src/pages/projets/selecteur-projets-impression3d.html",
    status: "ready",
  },
  {
    section: "Projets",
    name: "Bilan Conception 3D",
    path: "/src/pages/projets/bilan-conception3d.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Projets",
    name: "Cahier des charges interactif",
    path: "/src/pages/projets/cahier-des-charges-interactif.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Projets",
    name: "Conception objet technique",
    path: "/src/pages/projets/conception-objet-technique.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Projets",
    name: "Objet connecté (exemple)",
    path: "/src/pages/projets/objet-connecte-example.html",
    status: "ready",
    tag: "new",
  },

  // ── Corrections ────────────────────────────────────────
  {
    section: "Corrections",
    name: "Corrections",
    path: "/src/pages/corrections/corrections.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Corrections",
    name: "Corrections des activités",
    path: "/src/pages/corrections/corrections-activites.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Corrections",
    name: "Correction Impression 3D",
    path: "/src/pages/corrections/correction-impression3d.html",
    status: "ready",
  },
  {
    section: "Corrections",
    name: "Correction Réparabilité",
    path: "/src/pages/corrections/correction-reparabilite.html",
    status: "ready",
  },
  {
    section: "Corrections",
    name: "Correction Exercices de calculs",
    path: "/src/pages/corrections/correction-exercice-calcul.html",
    status: "ready",
  },
  {
    section: "Corrections",
    name: "Autocorrecteur exercices calcul",
    path: "/src/pages/corrections/autocorrecteur-exercice-calcul.html",
    status: "ready",
  },
  {
    section: "Corrections",
    name: "5e S1 correction habitat énergie",
    path: "/src/pages/corrections/5e-s1-correction-habitat-energie.html",
    status: "ready",
    tag: "new",
  },

  // ── Flashcards ─────────────────────────────────────────
  {
    section: "Flashcards",
    name: "Index Flashcards",
    path: "/src/pages/flashcards/flashcards.html",
    status: "ready",
  },
  {
    section: "Flashcards",
    name: "Réparabilité",
    path: "/src/pages/flashcards/reparabilite.html",
    status: "ready",
  },
  {
    section: "Flashcards",
    name: "Modélisation 3D",
    path: "/src/pages/flashcards/modelisation3d.html",
    status: "ready",
  },

  // ── Quiz ───────────────────────────────────────────────
  {
    section: "Quiz",
    name: "Quiz (index)",
    path: "/src/pages/quiz/quiz.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Quiz",
    name: "Quiz Modélisation 3D",
    path: "/src/pages/quiz/quiz-modelisation-3d.html",
    status: "ready",
  },
  {
    section: "Quiz",
    name: "Quiz Réparabilité",
    path: "/src/pages/quiz/quiz-reparabilite.html",
    status: "ready",
  },

  // ── Révisions ──────────────────────────────────────────
  {
    section: "Révisions",
    name: "Index Révisions",
    path: "/src/pages/revisions/index.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - OST",
    path: "/src/pages/revisions/fiche-ost.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Chaîne d'énergie",
    path: "/src/pages/revisions/fiche-chaine-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Chaîne d'information",
    path: "/src/pages/revisions/fiche-chaine-information.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Matériaux",
    path: "/src/pages/revisions/fiche-materiaux.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Réseaux",
    path: "/src/pages/revisions/fiche-reseaux.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Données numériques",
    path: "/src/pages/revisions/fiche-donnees-numerique.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Programmation",
    path: "/src/pages/revisions/fiche-programmation.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Fiche - Projet technique",
    path: "/src/pages/revisions/fiche-projet-technique.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Exercices DNB - Chaîne d'information",
    path: "/src/pages/revisions/exercices-dnb-chaine-information.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Exercices DNB - OST",
    path: "/src/pages/revisions/exercices-dnb-ost.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Exercices DNB - Programmation",
    path: "/src/pages/revisions/exercices-dnb-programmation.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Révisions",
    name: "Template de fiche",
    path: "/src/pages/revisions/fiche-revisions-template.html",
    status: "ready",
  },

  // ── Exercices ───────────────────────────────────────────
  {
    section: "Exercices",
    name: "Exercices de calculs",
    path: "/src/pages/exercices/exercices-calcul.html",
    status: "ready",
  },

  // ── Outils ─────────────────────────────────────────────
  {
    section: "Outils",
    name: "Tinkercad Classes",
    path: "/src/pages/outils/tinkercad-classes.html",
    status: "ready",
  },
  {
    section: "Outils",
    name: "Générateur de Graphiques",
    path: "/src/pages/outils/generateur-graphiques.html",
    status: "ready",
  },
  {
    section: "Outils",
    name: "Mini-Slicer 3D",
    path: "/src/pages/outils/mini-slicer-3d.html",
    status: "ready",
  },
  {
    section: "Outils",
    name: "Task Manager",
    path: "/src/pages/outils/task-manager.html",
    status: "ready",
  },

  // ── Ressources ─────────────────────────────────────────
  {
    section: "Ressources",
    name: "Ressources",
    path: "/src/pages/ressources/ressources.html",
    status: "ready",
  },
  {
    section: "Ressources",
    name: "Fiche Outil - Plume & Toupie",
    path: "/src/pages/ressources/outil-plume-et-toupie.html",
    status: "ready",
  },
  {
    section: "Ressources",
    name: "Guide ultra-simplifié Tinkercad",
    path: "/src/pages/ressources/guide-tinkercad-simplifie.html",
    status: "ready",
  },

  // ── Autres ─────────────────────────────────────────────
  {
    section: "Autres",
    name: "Article éditeur",
    path: "/src/pages/editeur/article.html",
    status: "ready",
  },
  {
    section: "Autres",
    name: "Évaluation habitat énergie - 3e",
    path: "/src/pages/evaluations/3e-evaluation-habitat-energie.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Autres",
    name: "Référentiel compétences cycle 4",
    path: "/src/pages/referentiels/referentiel-competences-cycle4.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Autres",
    name: "Artemis II — Simulateur de trajectoire",
    path: "/src/pages/simulateurs/artemis-ii-simulateur.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Autres",
    name: "Conso électrique",
    path: "/src/pages/simulateurs/conso-electrique.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Autres",
    name: "Simulateur conso électrique",
    path: "/src/pages/simulateurs/simulateur-conso-electrique.html",
    status: "ready",
    tag: "new",
  },
  {
    section: "Autres",
    name: "Conso électrique (variante)",
    path: "/src/pages/simulateurs/conso_electrique.html",
    status: "ready",
    tag: "new",
  },
];

// ── Render ─────────────────────────────────────────────────

function render(filter = "") {
  const container = document.getElementById("devContent");
  const lowerFilter = filter.toLowerCase();

  // Group by section
  const sections = {};
  PAGES.forEach((p) => {
    if (!sections[p.section]) sections[p.section] = [];
    sections[p.section].push(p);
  });

  container.innerHTML = "";

  let totalVisible = 0;

  Object.entries(sections).forEach(([sectionName, pages]) => {
    const filtered = pages.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerFilter) ||
        p.path.toLowerCase().includes(lowerFilter) ||
        sectionName.toLowerCase().includes(lowerFilter),
    );

    const sec = document.createElement("div");
    sec.className = "dev-section" + (filtered.length === 0 ? " hidden" : "");

    const title = document.createElement("div");
    title.className = "dev-section__title";
    title.textContent = `${sectionName} (${filtered.length})`;
    sec.appendChild(title);

    const list = document.createElement("ul");
    list.className = "dev-list";

    filtered.forEach((p) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "dev-link";
      a.href = p.path;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      // Status dot
      const dot = document.createElement("span");
      dot.className = `dev-link__status dev-link__status--${p.status || "ready"}`;
      a.appendChild(dot);

      // Name
      const name = document.createElement("span");
      name.textContent = p.name;
      a.appendChild(name);

      // Tag
      if (p.tag) {
        const tag = document.createElement("span");
        tag.className = `dev-link__tag dev-link__tag--${p.tag}`;
        tag.textContent = p.tag;
        a.appendChild(tag);
      }

      // Path
      const path = document.createElement("span");
      path.className = "dev-link__path";
      path.textContent = p.path;
      a.appendChild(path);

      li.appendChild(a);
      list.appendChild(li);
    });

    totalVisible += filtered.length;
    sec.appendChild(list);
    container.appendChild(sec);
  });

  // Stats
  const stats = document.getElementById("devStats");
  const wip = PAGES.filter((p) => p.status === "wip").length;
  const broken = PAGES.filter((p) => p.status === "broken").length;
  stats.innerHTML = "";

  const items = [
    { label: "Pages", value: PAGES.length },
    { label: "Sections", value: Object.keys(sections).length },
  ];
  if (wip) items.push({ label: "WIP", value: wip });
  if (broken) items.push({ label: "Broken", value: broken });
  if (filter) items.push({ label: "Filtrées", value: totalVisible });

  items.forEach((item) => {
    const span = document.createElement("span");
    span.className = "dev-stats__item";
    const strong = document.createElement("strong");
    strong.textContent = item.value;
    span.appendChild(strong);
    span.append(` ${item.label}`);
    stats.appendChild(span);
  });
}

// ── Filter & Keyboard ──────────────────────────────────────

const filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", () => render(filterInput.value));

let focusIdx = -1;

document.addEventListener("keydown", (e) => {
  const links = [...document.querySelectorAll(".dev-link:not(.hidden)")];
  if (!links.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    focusIdx = Math.min(focusIdx + 1, links.length - 1);
    links[focusIdx]?.focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusIdx = Math.max(focusIdx - 1, 0);
    links[focusIdx]?.focus();
  } else if (e.key === "Escape") {
    filterInput.value = "";
    filterInput.focus();
    focusIdx = -1;
    render();
  }
});

// ── Init ───────────────────────────────────────────────────
render();
