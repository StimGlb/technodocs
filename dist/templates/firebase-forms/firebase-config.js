/* ============================================
   CONFIGURATION FIREBASE
   ============================================ */

/**
 * Configuration de votre projet Firebase
 *
 * INSTRUCTIONS :
 * 1. Remplacez les valeurs ci-dessous par celles de votre projet Firebase
 * 2. Ces informations se trouvent dans la console Firebase :
 *    - Allez sur https://console.firebase.google.com/
 *    - Sélectionnez votre projet
 *    - Cliquez sur l'icône d'engrenage > Paramètres du projet
 *    - Faites défiler jusqu'à "Vos applications"
 *    - Copiez la configuration Firebase
 */

const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID"
};

// Initialiser Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialisé avec succès');
} catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de Firebase:', error);
}

/* ============================================
   EXEMPLE DE CONFIGURATION
   ============================================ */

/*
const firebaseConfig = {
    apiKey: "AIzaSyDIvzEk0xKVdRC0r9D_tBGnKPX29Fqkem4",
    authDomain: "form-results-b285b.firebaseapp.com",
    projectId: "form-results-b285b",
    storageBucket: "form-results-b285b.firebasestorage.app",
    messagingSenderId: "662462446647",
    appId: "1:662462446647:web:0fe6315cc0c189185513b2"
};
*/
