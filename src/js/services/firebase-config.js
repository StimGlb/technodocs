// When serving the site directly (no bundler), browsers cannot resolve
// bare specifiers like "firebase/app". Use Firebase CDN ES module URLs
// so the module loads both in development (Vite) and when opened statically.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config: prefer Vite env (import.meta.env) but allow a runtime
// fallback via `window.FIREBASE_CONFIG` so the page can be opened directly
// (no bundler) for testing. Example to set before loading modules:
// <script>window.FIREBASE_CONFIG = { apiKey: '...', authDomain: '...', projectId: '...' }</script>
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const globalCfg = (typeof window !== 'undefined' && window.FIREBASE_CONFIG) ? window.FIREBASE_CONFIG : {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || globalCfg.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || globalCfg.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || globalCfg.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || globalCfg.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || globalCfg.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || globalCfg.appId,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || globalCfg.measurementId
};

let app = null;
let db = null;

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('Firebase config missing. To enable Firestore, set Vite env vars or `window.FIREBASE_CONFIG` before loading modules.');
} else {
  // Initialisation Firebase
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

// Export des fonctions Firestore nécessaires
export { 
    db, 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    deleteDoc,
    serverTimestamp,
    query,
    where,
    getDocs
};
