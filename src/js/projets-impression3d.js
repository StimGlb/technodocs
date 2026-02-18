/**
 * Projets Impression 3D - Sélecteur de projets élèves
 * TechnoDocs | Vanilla JS + Firebase v9 modulaire
 *
 * Firestore path: wizards/{COLLECTION}/submissions/{docId}
 * Champs attendus : studentName, studentClass, progress, isComplete,
 *                   completedPhases, formData, createdAt, updatedAt
 */

import {
  db,
  collection,
  getDocs,
} from "./services/firebase-config.js";
import { initComponents } from "./components.js";

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIG = {
  // Nom de la collection Firestore
  collection: "presentation_objet_technique",
  // true  → wizards/{collection}/submissions/{docId}  (wizard-firebase.js pattern)
  // false → {collection}/{docId}                      (collection racine)
  nested: true,
  // Champ de formData utilisé comme "catégorie" sur la carte
  categoryField: "objetCategorie",
};

// Groupes de champs connus pour la modal
const FIELD_GROUPS = [
  {
    title: "L'objet",
    fields: [
      { key: "objetNom",         label: "Nom" },
      { key: "objetCategorie",   label: "Catégorie" },
      { key: "objetDescription", label: "Description" },
      { key: "objetUtilisateur", label: "Utilisateur cible" },
      { key: "objetProbleme",    label: "Problème résolu" },
    ],
  },
  {
    title: "Présentation orale",
    fields: [
      { key: "oralIntroduction",  label: "Introduction" },
      { key: "oralDeveloppement", label: "Développement" },
      { key: "oralConclusion",    label: "Conclusion" },
      { key: "oralQuestion",      label: "Question" },
    ],
  },
];

const POINTS_CLES = [
  { key: "pointsCles_probleme",      label: "Problème" },
  { key: "pointsCles_solution",      label: "Solution" },
  { key: "pointsCles_conception",    label: "Conception" },
  { key: "pointsCles_materiaux",     label: "Matériaux" },
  { key: "pointsCles_difficultes",   label: "Difficultés" },
  { key: "pointsCles_ameliorations", label: "Améliorations" },
];

// ─── State ───────────────────────────────────────────────────────────────────

let allProjects = [];
let filteredProjects = [];

// ─── DOM refs ────────────────────────────────────────────────────────────────

const grid          = document.getElementById("projects-grid");
const stateLoading  = document.getElementById("state-loading");
const stateError    = document.getElementById("state-error");
const stateEmpty    = document.getElementById("state-empty");
const stateErrorMsg = document.getElementById("state-error-msg");
const btnRetry      = document.getElementById("btn-retry");

const searchInput       = document.getElementById("search-input");
const filterClasse      = document.getElementById("filter-classe");
const filterCategorie   = document.getElementById("filter-categorie");
const filterProgression = document.getElementById("filter-progression");
const filtersReset      = document.getElementById("filters-reset");
const filtersCount      = document.getElementById("filters-count");

const statTotal      = document.getElementById("stat-total");
const statComplete   = document.getElementById("stat-complete");
const statInProgress = document.getElementById("stat-in-progress");

const modalOverlay = document.getElementById("modal-overlay");
const modalTitle   = document.getElementById("modal-title");
const modalSubtitle= document.getElementById("modal-subtitle");
const modalBody    = document.getElementById("modal-body");
const modalClose   = document.getElementById("modal-close");

// ─── Init ────────────────────────────────────────────────────────────────────

initComponents();
bindEvents();
loadProjects();

// ─── Data fetching ───────────────────────────────────────────────────────────

async function loadProjects() {
  showState("loading");

  if (!db) {
    showState("error", "Firebase non configuré. Vérifie les variables d'environnement VITE_FIREBASE_*.");
    return;
  }

  try {
    const colRef = CONFIG.nested
      ? collection(db, "wizards", CONFIG.collection, "submissions")
      : collection(db, CONFIG.collection);
    const snapshot = await getDocs(colRef);

    allProjects = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

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
  const search    = searchInput.value.trim().toLowerCase();
  const classe    = filterClasse.value;
  const categorie = filterCategorie.value;
  const prog      = filterProgression.value;

  filteredProjects = allProjects.filter((p) => {
    // Recherche nom
    if (search && !normalize(p.studentName).includes(normalize(search))) return false;

    // Filtre classe
    if (classe && p.studentClass !== classe) return false;

    // Filtre catégorie (depuis formData)
    if (categorie) {
      const cat = getCategoryValue(p);
      if (normalize(cat) !== normalize(categorie)) return false;
    }

    // Filtre progression
    if (prog === "complete"    && !p.isComplete)                           return false;
    if (prog === "in-progress" && (p.isComplete || (p.progress ?? 0) === 0)) return false;
    if (prog === "not-started" && (p.progress ?? 0) > 0)                  return false;

    return true;
  });

  renderGrid(filteredProjects);
  updateCount(filteredProjects.length, allProjects.length);
}

// ─── Render ──────────────────────────────────────────────────────────────────

function renderGrid(projects) {
  // Vide le grid sans innerHTML
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  if (projects.length === 0) {
    showState("empty");
    return;
  }

  showState("grid");

  const fragment = document.createDocumentFragment();
  projects.forEach((p) => fragment.appendChild(createProjectCard(p)));
  grid.appendChild(fragment);
}

function createProjectCard(project) {
  const progress  = project.progress ?? 0;
  const isComplete = project.isComplete ?? false;
  const category   = getCategoryValue(project);

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
  label.textContent = isComplete ? "Complet" : progress > 0 ? "En cours" : "Non démarré";

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
  fill.className = "progress-bar__fill" + (isComplete ? " progress-bar__fill--complete" : "");
  fill.style.width = `${progress}%`;

  track.appendChild(fill);
  wrapper.appendChild(barHeader);
  wrapper.appendChild(track);
  return wrapper;
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function openModal(project) {
  const progress   = project.progress ?? 0;
  const isComplete = project.isComplete ?? false;

  // Titre / sous-titre
  modalTitle.textContent   = project.studentName || "Projet";
  modalSubtitle.textContent = [project.studentClass, formatDate(project.projectDate || project.createdAt)]
    .filter(Boolean).join(" · ");

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
  progFill.className = "modal__progress-fill" + (isComplete ? " modal__progress-fill--complete" : "");
  progFill.style.width = `${progress}%`;

  progTrack.appendChild(progFill);
  progSection.appendChild(progHeader);
  progSection.appendChild(progTrack);
  modalBody.appendChild(progSection);

  // ── Phases complètes ──
  if (Array.isArray(project.completedPhases) && project.completedPhases.length > 0) {
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

// ─── Options dynamiques des selects ─────────────────────────────────────────

function populateFilterOptions(projects) {
  const classes    = [...new Set(projects.map((p) => p.studentClass).filter(Boolean))].sort();
  const categories = [...new Set(projects.map(getCategoryValue).filter(Boolean))].sort();

  appendOptions(filterClasse,    classes);
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
  const complete   = projects.filter((p) => p.isComplete).length;
  const inProgress = projects.filter((p) => !p.isComplete && (p.progress ?? 0) > 0).length;

  statTotal.textContent      = projects.length;
  statComplete.textContent   = complete;
  statInProgress.textContent = inProgress;
}

function updateCount(shown, total) {
  filtersCount.textContent = shown === total
    ? `${total} projet${total > 1 ? "s" : ""}`
    : `${shown} / ${total} projet${total > 1 ? "s" : ""}`;
}

// ─── États UI ────────────────────────────────────────────────────────────────

function showState(state, errorMsg = "") {
  stateLoading.hidden = state !== "loading";
  stateError.hidden   = state !== "error";
  stateEmpty.hidden   = state !== "empty";
  grid.hidden         = state !== "grid";

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

  filterClasse.addEventListener("change",      applyFilters);
  filterCategorie.addEventListener("change",   applyFilters);
  filterProgression.addEventListener("change", applyFilters);

  filtersReset.addEventListener("click", resetFilters);
  btnRetry.addEventListener("click",     loadProjects);

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
  searchInput.value       = "";
  filterClasse.value      = "";
  filterCategorie.value   = "";
  filterProgression.value = "";
  applyFilters();
  searchInput.focus();
}
