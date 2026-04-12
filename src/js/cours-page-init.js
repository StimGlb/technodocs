/**
 * cours-page-init.js — TechnoDocs
 * Initialise une page de cours en lisant le chemin JSON
 * depuis l'attribut data-config de #markdown-container.
 *
 * Usage dans le HTML :
 *   <article id="markdown-container" data-config="../../data/cours/mon-cours.json">
 *   <script type="module" src="../../js/cours-page-init.js"></script>
 *
 * Externalisé pour conformité CSP (script-src 'self').
 */
import { initCoursPage } from "./cours-loader.js";

const container = document.getElementById("markdown-container");
const configPath = container?.dataset?.config;

if (configPath) {
  initCoursPage(configPath);
} else {
  console.error(
    "[cours-page-init] Attribut data-config manquant sur #markdown-container",
  );
}
