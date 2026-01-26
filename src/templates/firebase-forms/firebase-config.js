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
*/
