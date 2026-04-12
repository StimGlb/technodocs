/**
 * Loaders pour pages d'activités
 * Évite les problèmes du HTML proxy de Netlify Dev avec les modules inline
 */

import { initCoursPage } from "../cours-loader.js";

export async function loadActivite(configPath) {
  try {
    await initCoursPage(configPath);
  } catch (error) {
    console.error("Erreur chargement activité:", error);
  }
}

/**
 * Exports spécifiques pour chaque activité
 * À utiliser: <script type="module" src="/src/js/loaders/s3-eclairage-couloir.js"></script>
 */
export async function loadS3EclairageCouloir() {
  await loadActivite("/src/data/activites/activite-s3-eclairage-couloir.json");
}

export async function loadS3EclairageAdaptatif() {
  await loadActivite("/src/data/activites/activite-s3-eclairage-adaptatif.json");
}

export async function loadS3AlerteQualiteAir() {
  await loadActivite("/src/data/activites/activite-s3-alerte-qualite-air.json");
}

export async function loadMontlageTinkercad() {
  await loadActivite("/src/data/activites/activite-montage-tinkercad.json");
}

export async function loadConsommationMaison() {
  await loadActivite("/src/data/activites/activite-consommation-maison.json");
}
