/**
 * Export Firestore Collection to JSON
 *
 * Exporte tous les documents de la collection 'devoir_cahier_charges_impression3d'
 * vers un fichier local pour analyse pédagogique.
 *
 * Prérequis :
 * 1. npm install firebase-admin
 * 2. Télécharger la clé de service depuis Firebase Console :
 *    - Aller dans Paramètres du projet > Comptes de service
 *    - Cliquer sur "Générer une nouvelle clé privée"
 *    - Enregistrer le fichier JSON dans le dossier racine (ex: serviceAccountKey.json)
 * 3. Ajouter "serviceAccountKey.json" au .gitignore
 *
 * Usage : node scripts/export-firestore.js
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Configuration
const SERVICE_ACCOUNT_PATH = join(rootDir, 'serviceAccountKey.json');
const COLLECTION_NAME = 'devoir_cahier_charges_impression3d';
const OUTPUT_FILE = join(rootDir, 'data_eleves_3d.json');

async function main() {
  // Vérifier que le fichier de clé de service existe
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('❌ Fichier de clé de service introuvable:', SERVICE_ACCOUNT_PATH);
    console.error('\nPour obtenir ce fichier :');
    console.error('1. Aller sur https://console.firebase.google.com');
    console.error('2. Sélectionner votre projet');
    console.error('3. Paramètres du projet > Comptes de service');
    console.error('4. Cliquer sur "Générer une nouvelle clé privée"');
    console.error('5. Enregistrer le fichier sous "serviceAccountKey.json" à la racine du projet');
    process.exit(1);
  }

  // Charger la clé de service
  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

  // Initialiser Firebase Admin
  initializeApp({
    credential: cert(serviceAccount)
  });

  const db = getFirestore();

  console.log(`📚 Récupération des documents de la collection "${COLLECTION_NAME}"...`);

  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();

    if (snapshot.empty) {
      console.warn('⚠️  Aucun document trouvé dans la collection.');
      writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf8');
      console.log(`📄 Fichier vide créé: ${OUTPUT_FILE}`);
      return;
    }

    const documents = [];
    snapshot.forEach(doc => {
      documents.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Enregistrer dans le fichier JSON
    writeFileSync(OUTPUT_FILE, JSON.stringify(documents, null, 2), 'utf8');

    console.log(`✅ Export réussi!`);
    console.log(`   - ${documents.length} document(s) exporté(s)`);
    console.log(`   - Fichier: ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error.message);
    process.exit(1);
  }
}

main();
