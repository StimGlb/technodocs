/**
 * Projets Impression 3D - Sélecteur de projets élèves
 * TechnoDocs | Vanilla JS + Firebase v9 modulaire
 *
 * Firestore path: wizards/{COLLECTION}/submissions/{docId}
 * Champs attendus : studentName, studentClass, progress, isComplete,
 *                   completedPhases, formData, createdAt, updatedAt
 */

import { db, collection, getDocs } from "./services/firebase-config.js";
import { loadComponents } from "./components.js";

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIG = {
  // Collections Firestore à agréger (ajouter/retirer librement)
  collections: [
    "presentation_objet_technique",
    "devoir_conception_impression_3d",
    "devoir_cahier_charges_impression_3d",
  ],
  // false → collection racine (pattern wizard-firebase.js réel)
  nested: false,
  // Champ de formData utilisé comme "catégorie" sur la carte
  categoryField: "objetCategorie",
};

// Groupes de champs connus pour la modal
const FIELD_GROUPS = [
  {
    title: "L'objet",
    fields: [
      { key: "objetNom", label: "Nom" },
      { key: "objetCategorie", label: "Catégorie" },
      { key: "objetDescription", label: "Description" },
      { key: "objetUtilisateur", label: "Utilisateur cible" },
      { key: "objetProbleme", label: "Problème résolu" },
    ],
  },
  {
    title: "Présentation orale",
    fields: [
      { key: "oralIntroduction", label: "Introduction" },
      { key: "oralDeveloppement", label: "Développement" },
      { key: "oralConclusion", label: "Conclusion" },
      { key: "oralQuestion", label: "Question" },
    ],
  },
];

const POINTS_CLES = [
  { key: "pointsCles_probleme", label: "Problème" },
  { key: "pointsCles_solution", label: "Solution" },
  { key: "pointsCles_conception", label: "Conception" },
  { key: "pointsCles_materiaux", label: "Matériaux" },
  { key: "pointsCles_difficultes", label: "Difficultés" },
  { key: "pointsCles_ameliorations", label: "Améliorations" },
];

// ─── Favoris (localStorage) ──────────────────────────────────────────────────

const FAVORITES_KEY = "projets_impression3d_favorites";
const SORT_KEY = "projets_impression3d_sort";
const favorites = new Set(
  JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"),
);
let filterFavoritesOnly = false;
let currentSort = localStorage.getItem(SORT_KEY) || "progress-desc";

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
}

function toggleFavorite(id, btnEl) {
  if (favorites.has(id)) {
    favorites.delete(id);
    btnEl.textContent = "☆";
    btnEl.classList.remove("is-active");
    btnEl.setAttribute("aria-label", "Ajouter aux favoris");
  } else {
    favorites.add(id);
    btnEl.textContent = "★";
    btnEl.classList.add("is-active");
    btnEl.setAttribute("aria-label", "Retirer des favoris");
  }
  saveFavorites();
  // Si le filtre favoris est actif, rafraîchir la grille
  if (filterFavoritesOnly) applyFilters();
}

// ─── State ───────────────────────────────────────────────────────────────────

let allProjects = [];
let filteredProjects = [];

// ─── DOM refs ────────────────────────────────────────────────────────────────

const grid = document.getElementById("projects-grid");
const stateLoading = document.getElementById("state-loading");
const stateError = document.getElementById("state-error");
const stateEmpty = document.getElementById("state-empty");
const stateErrorMsg = document.getElementById("state-error-msg");
const btnRetry = document.getElementById("btn-retry");

const searchInput = document.getElementById("search-input");
const filterClasse = document.getElementById("filter-classe");
const filterCategorie = document.getElementById("filter-categorie");
const filterProgression = document.getElementById("filter-progression");
const filterSort = document.getElementById("filter-sort");
const filtersReset = document.getElementById("filters-reset");
const filtersCount = document.getElementById("filters-count");

const statTotal = document.getElementById("stat-total");
const statComplete = document.getElementById("stat-complete");
const statInProgress = document.getElementById("stat-in-progress");
const btnFavorites = document.getElementById("btn-favorites");
const btnExport = document.getElementById("btn-export");

const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

// ─── Init ────────────────────────────────────────────────────────────────────

loadComponents();
bindEvents();
loadProjects();

// ─── Data fetching ───────────────────────────────────────────────────────────

async function loadProjects() {
  showState("loading");

  if (!db) {
    showState(
      "error",
      "Firebase non configuré. Vérifie les variables d'environnement VITE_FIREBASE_*.",
    );
    return;
  }

  try {
    const snapshots = await Promise.all(
      CONFIG.collections.map((col) => {
        const colRef = CONFIG.nested
          ? collection(db, "wizards", col, "submissions")
          : collection(db, col);
        return getDocs(colRef);
      }),
    );

    allProjects = snapshots.flatMap((snap) =>
      snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    );

    // Restaurer le tri sauvegardé
    filterSort.value = currentSort;

    updateHeroStats(allProjects);
    populateFilterOptions(allProjects);
    applyFilters();
  } catch (err) {
    console.error("[Projets 3D] Erreur Firestore :", err);
    showState("error", err.message || "Erreur inconnue.");
  }
}

// ─── Filtering ───────────────────────────────────────────────────────────────

function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const classe = filterClasse.value;
  const categorie = filterCategorie.value;
  const prog = filterProgression.value;

  filteredProjects = allProjects.filter((p) => {
    // Filtre favoris
    if (filterFavoritesOnly && !favorites.has(p.id)) return false;

    // Recherche nom
    if (search && !normalize(p.studentName).includes(normalize(search)))
      return false;

    // Filtre classe
    if (classe && p.studentClass !== classe) return false;

    // Filtre catégorie (depuis formData)
    if (categorie) {
      const cat = getCategoryValue(p);
      if (normalize(cat) !== normalize(categorie)) return false;
    }

    // Filtre progression
    if (prog === "complete" && !p.isComplete) return false;
    if (prog === "in-progress" && (p.isComplete || (p.progress ?? 0) === 0))
      return false;
    if (prog === "not-started" && (p.progress ?? 0) > 0) return false;

    return true;
  });

  renderGrid(filteredProjects);
  updateCount(filteredProjects.length, allProjects.length);
}

// ─── Render ──────────────────────────────────────────────────────────────────

function renderGrid(projects) {
  // Tri les projets selon la sélection
  const sortedProjects = sortProjects(projects, currentSort);

  // Gère l'état du bouton d'export (s'il existe)
  if (btnExport) btnExport.disabled = sortedProjects.length === 0;

  // Vide le grid sans innerHTML
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  if (sortedProjects.length === 0) {
    showState("empty");
    return;
  }

  showState("grid");

  const fragment = document.createDocumentFragment();
  sortedProjects.forEach((p) => fragment.appendChild(createProjectCard(p)));
  grid.appendChild(fragment);
}

// ─── Tri ──────────────────────────────────────────────────────────────────────

function sortProjects(projects, sortBy) {
  const copy = [...projects];

  switch (sortBy) {
    case "name-asc":
      copy.sort((a, b) =>
        normalize(a.studentName).localeCompare(normalize(b.studentName), "fr"),
      );
      break;
    case "name-desc":
      copy.sort((a, b) =>
        normalize(b.studentName).localeCompare(normalize(a.studentName), "fr"),
      );
      break;
    case "date-recent":
      copy.sort((a, b) => {
        const dateA = parseDate(a.projectDate || a.createdAt);
        const dateB = parseDate(b.projectDate || b.createdAt);
        return dateB - dateA;
      });
      break;
    case "date-old":
      copy.sort((a, b) => {
        const dateA = parseDate(a.projectDate || a.createdAt);
        const dateB = parseDate(b.projectDate || b.createdAt);
        return dateA - dateB;
      });
      break;
    case "progress-asc":
      copy.sort((a, b) => (a.progress ?? 0) - (b.progress ?? 0));
      break;
    case "progress-desc":
      copy.sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0));
      break;
    default:
      break;
  }

  return copy;
}

function parseDate(value) {
  if (!value) return 0;
  // Timestamp Firestore { seconds, nanoseconds }
  if (value?.seconds) return value.seconds * 1000;
  // String ISO ou date classique
  const d = new Date(value);
  return !isNaN(d) ? d.getTime() : 0;
}

function createProjectCard(project) {
  const progress = project.progress ?? 0;
  const isComplete = project.isComplete ?? false;
  const category = getCategoryValue(project);

  // Wrapper
  const article = document.createElement("article");
  article.className = "project-card";
  article.setAttribute("role", "listitem");
  article.setAttribute("tabindex", "0");
  article.setAttribute("aria-label", `Projet de ${project.studentName}`);

  // ── Header (catégorie + badge progression) ──
  const header = document.createElement("div");
  header.className = "project-card__header";

  const catEl = document.createElement("span");
  catEl.className = "project-card__category";
  catEl.textContent = category || "Non définie";

  const badge = createProgressBadge(progress, isComplete);

  header.appendChild(catEl);
  header.appendChild(badge);

  // ── Nom élève ──
  const nameEl = document.createElement("h3");
  nameEl.className = "project-card__name";
  nameEl.textContent = project.studentName || "—";

  // ── Nom de l'objet (optionnel) ──
  const objetNomValue = project.formData?.objetNom;
  const objetEl = document.createElement("p");
  objetEl.className = "project-card__object";
  objetEl.textContent = objetNomValue || "";
  if (!objetNomValue) objetEl.hidden = true;

  // ── Méta (classe + date) ──
  const meta = document.createElement("div");
  meta.className = "project-card__meta";

  const classeEl = document.createElement("span");
  classeEl.textContent = project.studentClass || "—";

  const sep = document.createElement("span");
  sep.className = "project-card__meta-sep";
  sep.textContent = "·";
  sep.setAttribute("aria-hidden", "true");

  const dateEl = document.createElement("span");
  dateEl.textContent = formatDate(project.projectDate || project.createdAt);

  meta.appendChild(classeEl);
  meta.appendChild(sep);
  meta.appendChild(dateEl);

  // ── Barre de progression ──
  const progressBar = createProgressBar(progress, isComplete);

  // ── Assemblage ──
  article.appendChild(header);
  article.appendChild(nameEl);
  article.appendChild(objetEl);
  article.appendChild(meta);
  article.appendChild(progressBar);

  // ── Étoile favorite ──
  const favBtn = document.createElement("button");
  favBtn.type = "button";
  favBtn.className =
    "project-card__fav" + (favorites.has(project.id) ? " is-active" : "");
  favBtn.textContent = favorites.has(project.id) ? "★" : "☆";
  favBtn.setAttribute(
    "aria-label",
    favorites.has(project.id) ? "Retirer des favoris" : "Ajouter aux favoris",
  );
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(project.id, favBtn);
  });
  article.appendChild(favBtn);

  // ── Événements ──
  article.addEventListener("click", () => openModal(project));
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(project);
    }
  });

  return article;
}

function createProgressBadge(progress, isComplete) {
  const span = document.createElement("span");

  if (isComplete) {
    span.className = "badge badge--complete";
    span.setAttribute("aria-label", "Projet complet");
  } else if (progress > 0) {
    span.className = "badge badge--in-progress";
    span.setAttribute("aria-label", `En cours - ${progress}%`);
  } else {
    span.className = "badge badge--not-started";
    span.setAttribute("aria-label", "Non démarré");
  }

  const dot = document.createElement("span");
  dot.className = "badge__dot";
  dot.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.textContent = isComplete
    ? "Complet"
    : progress > 0
      ? "En cours"
      : "Non démarré";

  span.appendChild(dot);
  span.appendChild(label);
  return span;
}

function createProgressBar(progress, isComplete) {
  const wrapper = document.createElement("div");
  wrapper.className = "progress-bar";

  const barHeader = document.createElement("div");
  barHeader.className = "progress-bar__header";

  const labelEl = document.createElement("span");
  labelEl.textContent = "Progression";

  const valueEl = document.createElement("span");
  valueEl.textContent = `${progress}%`;

  barHeader.appendChild(labelEl);
  barHeader.appendChild(valueEl);

  const track = document.createElement("div");
  track.className = "progress-bar__track";
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-valuenow", progress);
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", "100");

  const fill = document.createElement("div");
  fill.className =
    "progress-bar__fill" + (isComplete ? " progress-bar__fill--complete" : "");
  fill.style.width = `${progress}%`;

  track.appendChild(fill);
  wrapper.appendChild(barHeader);
  wrapper.appendChild(track);
  return wrapper;
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function openModal(project) {
  const progress = project.progress ?? 0;
  const isComplete = project.isComplete ?? false;

  // Titre / sous-titre
  modalTitle.textContent = project.studentName || "Projet";
  modalSubtitle.textContent = [
    project.studentClass,
    formatDate(project.projectDate || project.createdAt),
  ]
    .filter(Boolean)
    .join(" · ");

  // Vide le body
  while (modalBody.firstChild) modalBody.removeChild(modalBody.firstChild);

  // ── Section progression ──
  const progSection = document.createElement("div");
  progSection.className = "modal__progress";

  const progHeader = document.createElement("div");
  progHeader.className = "modal__progress-header";

  const progLabel = document.createElement("span");
  progLabel.className = "modal__progress-label";
  progLabel.textContent = "Progression globale";

  const progBadge = createProgressBadge(progress, isComplete);

  progHeader.appendChild(progLabel);
  progHeader.appendChild(progBadge);

  const progTrack = document.createElement("div");
  progTrack.className = "modal__progress-track";
  progTrack.setAttribute("role", "progressbar");
  progTrack.setAttribute("aria-valuenow", progress);
  progTrack.setAttribute("aria-valuemin", "0");
  progTrack.setAttribute("aria-valuemax", "100");

  const progFill = document.createElement("div");
  progFill.className =
    "modal__progress-fill" +
    (isComplete ? " modal__progress-fill--complete" : "");
  progFill.style.width = `${progress}%`;

  progTrack.appendChild(progFill);
  progSection.appendChild(progHeader);
  progSection.appendChild(progTrack);
  modalBody.appendChild(progSection);

  // ── Phases complètes ──
  if (
    Array.isArray(project.completedPhases) &&
    project.completedPhases.length > 0
  ) {
    const phasesTitle = document.createElement("p");
    phasesTitle.className = "modal__section-title";
    phasesTitle.textContent = "Phases validées";

    const phasesList = document.createElement("div");
    phasesList.className = "phases-list";

    project.completedPhases.forEach((phase) => {
      const tag = document.createElement("span");
      tag.className = "phase-tag";
      tag.textContent = `Phase ${phase}`;
      phasesList.appendChild(tag);
    });

    modalBody.appendChild(phasesTitle);
    modalBody.appendChild(phasesList);
  }

  // ── Sections structurées (FIELD_GROUPS) ──
  const formData = project.formData ?? {};

  FIELD_GROUPS.forEach(({ title, fields }) => {
    const hasData = fields.some(({ key }) => {
      const v = formData[key];
      return v !== null && v !== undefined && v !== "";
    });
    if (!hasData) return;

    const sectionTitle = document.createElement("p");
    sectionTitle.className = "modal__section-title";
    sectionTitle.textContent = title;

    const dataGrid = document.createElement("div");
    dataGrid.className = "form-data-grid";

    fields.forEach(({ key, label }) => {
      const value = formData[key];
      if (value === null || value === undefined || value === "") return;

      const item = document.createElement("div");
      item.className = "form-data-item";

      const keyEl = document.createElement("div");
      keyEl.className = "form-data-item__key";
      keyEl.textContent = label;

      const valEl = document.createElement("div");
      valEl.className = "form-data-item__value";
      valEl.textContent = String(value);

      item.appendChild(keyEl);
      item.appendChild(valEl);
      dataGrid.appendChild(item);
    });

    modalBody.appendChild(sectionTitle);
    modalBody.appendChild(dataGrid);
  });

  // ── Points clés (booléens) ──
  const checkedPoints = POINTS_CLES.filter(({ key }) => formData[key] === true);
  if (checkedPoints.length > 0) {
    const pointsTitle = document.createElement("p");
    pointsTitle.className = "modal__section-title";
    pointsTitle.textContent = "Points clés abordés";

    const pointsList = document.createElement("div");
    pointsList.className = "phases-list";

    checkedPoints.forEach(({ label }) => {
      const tag = document.createElement("span");
      tag.className = "phase-tag";
      tag.textContent = "✓ " + label;
      pointsList.appendChild(tag);
    });

    modalBody.appendChild(pointsTitle);
    modalBody.appendChild(pointsList);
  }

  // Affichage
  modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = "";
}

// ─── Export CSV ──────────────────────────────────────────────────────────────

function exportCSV() {
  if (filteredProjects.length === 0) return;

  // En-têtes
  const headers = [
    "Nom",
    "Classe",
    "Catégorie",
    "Progression (%)",
    "État",
    "Date projet",
    "Objet créé",
    "Mis à jour",
  ];

  // Lignes de données
  const rows = filteredProjects.map((p) => {
    const progress = p.progress ?? 0;
    const state = p.isComplete
      ? "Complet"
      : progress > 0
        ? "En cours"
        : "Non démarré";
    const category = getCategoryValue(p) || "—";
    const objetNom = p.formData?.objetNom || "—";
    const projectDate = formatDate(p.projectDate || p.createdAt) || "—";
    const createdAt = formatDate(p.createdAt) || "—";
    const updatedAt = formatDate(p.updatedAt) || "—";

    return [
      escapeCSV(p.studentName || "—"),
      escapeCSV(p.studentClass || "—"),
      escapeCSV(category),
      progress,
      escapeCSV(state),
      escapeCSV(projectDate),
      escapeCSV(objetNom),
      escapeCSV(createdAt),
      escapeCSV(updatedAt),
    ];
  });

  // Construction du CSV
  const csvLines = [headers.join(";"), ...rows.map((r) => r.join(";"))];
  const csvContent = csvLines.join("\n");

  // UTF-8 BOM pour Excel/Calc
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Téléchargement
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `projets-impression3d_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function escapeCSV(value) {
  const str = String(value ?? "");
  // Échappe les guillemets et entoure si contient séparateur ou guillemets
  if (str.includes(";") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// ─── Options dynamiques des selects ─────────────────────────────────────────

function populateFilterOptions(projects) {
  const classes = [
    ...new Set(projects.map((p) => p.studentClass).filter(Boolean)),
  ].sort();
  const categories = [
    ...new Set(projects.map(getCategoryValue).filter(Boolean)),
  ].sort();

  appendOptions(filterClasse, classes);
  appendOptions(filterCategorie, categories);
}

function appendOptions(select, values) {
  values.forEach((val) => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    select.appendChild(opt);
  });
}

// ─── Stats hero ──────────────────────────────────────────────────────────────

function updateHeroStats(projects) {
  const complete = projects.filter((p) => p.isComplete).length;
  const inProgress = projects.filter(
    (p) => !p.isComplete && (p.progress ?? 0) > 0,
  ).length;

  statTotal.textContent = projects.length;
  statComplete.textContent = complete;
  statInProgress.textContent = inProgress;
}

function updateCount(shown, total) {
  filtersCount.textContent =
    shown === total
      ? `${total} projet${total > 1 ? "s" : ""}`
      : `${shown} / ${total} projet${total > 1 ? "s" : ""}`;
}

// ─── États UI ────────────────────────────────────────────────────────────────

function showState(state, errorMsg = "") {
  stateLoading.hidden = state !== "loading";
  stateError.hidden = state !== "error";
  stateEmpty.hidden = state !== "empty";
  grid.hidden = state !== "grid";

  if (state === "error" && errorMsg) {
    stateErrorMsg.textContent = errorMsg;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCategoryValue(project) {
  return project?.formData?.[CONFIG.categoryField] ?? "";
}

function normalize(str) {
  return String(str ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatDate(value) {
  if (!value) return "";

  // Timestamp Firestore { seconds, nanoseconds }
  if (value?.seconds) {
    return new Date(value.seconds * 1000).toLocaleDateString("fr-FR");
  }

  // String ISO ou date classique
  const d = new Date(value);
  if (!isNaN(d)) return d.toLocaleDateString("fr-FR");

  return String(value);
}

// ─── Events ──────────────────────────────────────────────────────────────────

function bindEvents() {
  // Filtres — debounce sur le champ texte
  let debounceTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyFilters, 250);
  });

  filterClasse.addEventListener("change", applyFilters);
  filterCategorie.addEventListener("change", applyFilters);
  filterProgression.addEventListener("change", applyFilters);

  filterSort.addEventListener("change", () => {
    currentSort = filterSort.value;
    localStorage.setItem(SORT_KEY, currentSort);
    renderGrid(filteredProjects);
  });

  if (filtersReset) filtersReset.addEventListener("click", resetFilters);
  btnRetry.addEventListener("click", loadProjects);

  btnFavorites.addEventListener("click", () => {
    filterFavoritesOnly = !filterFavoritesOnly;
    btnFavorites.classList.toggle("is-active", filterFavoritesOnly);
    btnFavorites.setAttribute("aria-pressed", filterFavoritesOnly);
    btnFavorites.textContent = filterFavoritesOnly ? "★ Favoris" : "☆ Favoris";
    applyFilters();
  });

  if (btnExport) btnExport.addEventListener("click", exportCSV);

  // Modal
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
  });
}

function resetFilters() {
  searchInput.value = "";
  filterClasse.value = "";
  filterCategorie.value = "";
  filterProgression.value = "";
  filterSort.value = "progress-desc";
  currentSort = "progress-desc";
  filterFavoritesOnly = false;
  btnFavorites.classList.remove("is-active");
  btnFavorites.setAttribute("aria-pressed", "false");
  btnFavorites.textContent = "☆ Favoris";
  localStorage.setItem(SORT_KEY, currentSort);
  applyFilters();
  searchInput.focus();
}
