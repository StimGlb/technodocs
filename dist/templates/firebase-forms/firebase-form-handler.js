/* ============================================
   FIREBASE FORM HANDLER - SCRIPT RÉUTILISABLE
   ============================================ */

/**
 * Initialise le formulaire Firebase avec la configuration fournie
 * @param {Object} config - Configuration du formulaire
 * @param {string} config.collectionName - Nom de la collection Firestore
 * @param {string} config.ficheType - Type de fiche
 * @param {string} config.problematique - Problématique de l'activité
 * @param {Array<string>} config.requiredFields - Liste des IDs des champs obligatoires
 * @param {Function} config.collectCustomData - Fonction pour collecter les données personnalisées
 * @param {Function} config.exportFileName - Fonction pour générer le nom du fichier d'export
 */
function initFirebaseForm(config) {
    console.log('🔧 Initialisation du formulaire Firebase...');

    // Vérifier que Firebase est initialisé
    if (!firebase.apps.length) {
        console.error('❌ Firebase n\'est pas initialisé. Vérifiez firebase-config.js');
        return;
    }

    const db = firebase.firestore();
    console.log('✅ Firebase Firestore connecté');

    // Définir la date par défaut
    const dateField = document.getElementById('date');
    if (dateField) {
        dateField.valueAsDate = new Date();
    }

    // ============================================
    // SAUVEGARDE DANS FIREBASE
    // ============================================
    document.getElementById('saveBtn').addEventListener('click', async function() {
        console.log('📝 Tentative de sauvegarde...');

        // Validation des champs requis
        const requiredFields = config.requiredFields || ['prenom', 'nom', 'classe', 'date'];

        for (let field of requiredFields) {
            const element = document.getElementById(field);
            if (!element) {
                console.warn(`⚠️ Champ non trouvé: ${field}`);
                continue;
            }
            if (!element.value.trim()) {
                alert('⚠️ Veuillez remplir tous les champs obligatoires (*)');
                element.focus();
                return;
            }
        }

        // Désactiver le bouton pendant le traitement
        const btn = this;
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = '⏳ Enregistrement en cours...';

        try {
            // Générer un timestamp unique
            const timestamp = Date.now();
            const dateStr = new Date().toISOString();

            // Collecter les données de base
            const ficheData = {
                // Informations élève
                prenom: document.getElementById('prenom')?.value.trim() || '',
                nom: document.getElementById('nom')?.value.trim() || '',
                classe: document.getElementById('classe')?.value.trim() || '',
                date: document.getElementById('date')?.value || '',

                // Type de fiche
                typeFiche: config.ficheType || 'fiche-generique',
                problematique: config.problematique || '',

                // Métadonnées
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                dateSoumission: dateStr,
                timestampLocal: timestamp
            };

            // Ajouter les données personnalisées
            if (config.collectCustomData && typeof config.collectCustomData === 'function') {
                const customData = config.collectCustomData();
                Object.assign(ficheData, customData);
            }

            console.log('📦 Données à enregistrer:', ficheData);

            // Enregistrer dans Firestore
            const collectionName = config.collectionName || 'fiches_generiques';
            const docRef = await db.collection(collectionName).add(ficheData);

            console.log('✅ Fiche enregistrée avec ID:', docRef.id);

            // Afficher le message de succès
            showMessage('success', '✅ <strong>Succès !</strong> Ta fiche a été enregistrée avec succès dans la base de données.');

            // Désactiver le flag de modification
            formModified = false;

        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde:', error);
            showMessage('error', `❌ <strong>Erreur !</strong> ${error.message}`);
        } finally {
            // Réactiver le bouton
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });

    // ============================================
    // EXPORT JSON
    // ============================================
    document.getElementById('exportJsonBtn').addEventListener('click', function() {
        console.log('📦 Export JSON...');

        // Collecter les données de base
        const data = {
            prenom: document.getElementById('prenom')?.value || '',
            nom: document.getElementById('nom')?.value || '',
            classe: document.getElementById('classe')?.value || '',
            date: document.getElementById('date')?.value || '',
            typeFiche: config.ficheType || 'fiche-generique',
            problematique: config.problematique || '',
            exportDate: new Date().toISOString()
        };

        // Ajouter les données personnalisées
        if (config.collectCustomData && typeof config.collectCustomData === 'function') {
            const customData = config.collectCustomData();
            Object.assign(data, customData);
        }

        // Créer et télécharger le fichier JSON
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;

        // Nom du fichier
        if (config.exportFileName && typeof config.exportFileName === 'function') {
            link.download = config.exportFileName(data);
        } else {
            link.download = `fiche-${data.nom || 'sans-nom'}.json`;
        }

        link.click();
        URL.revokeObjectURL(url);

        console.log('✅ JSON exporté');
    });

    // ============================================
    // RÉINITIALISATION
    // ============================================
    document.getElementById('resetBtn').addEventListener('click', function() {
        if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données non sauvegardées seront perdues.')) {
            console.log('🔄 Réinitialisation du formulaire...');

            // Réinitialiser tous les champs
            document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="email"], textarea').forEach(field => {
                if (field.id !== 'date') {
                    field.value = '';
                }
            });

            // Remettre la date du jour
            if (dateField) {
                dateField.valueAsDate = new Date();
            }

            // Réinitialiser les images
            document.querySelectorAll('input[type="file"]').forEach(input => {
                input.value = '';
            });

            document.querySelectorAll('.image-preview, .logo-preview').forEach(img => {
                img.style.display = 'none';
                img.src = '';
            });

            hideMessages();
            formModified = false;

            console.log('✅ Formulaire réinitialisé');
        }
    });

    // ============================================
    // CONFIRMATION AVANT FERMETURE
    // ============================================
    window.formModified = false;

    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', () => {
            formModified = true;
        });
    });

    window.addEventListener('beforeunload', function(e) {
        if (formModified) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });

    console.log('✅ Formulaire Firebase initialisé avec succès');
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Affiche un message de feedback
 * @param {string} type - Type de message ('success' ou 'error')
 * @param {string} message - Message à afficher
 */
function showMessage(type, message) {
    hideMessages();

    if (type === 'success') {
        const successMsg = document.getElementById('successMessage');
        successMsg.innerHTML = message;
        successMsg.style.display = 'block';

        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    } else if (type === 'error') {
        const errorMsg = document.getElementById('errorMessage');
        errorMsg.innerHTML = message;
        errorMsg.style.display = 'block';
    }
}

/**
 * Cache tous les messages de feedback
 */
function hideMessages() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

/**
 * Valide un champ de formulaire
 * @param {string} fieldId - ID du champ à valider
 * @param {string} fieldName - Nom du champ pour les messages d'erreur
 * @returns {boolean} - True si le champ est valide
 */
function validateField(fieldId, fieldName) {
    const element = document.getElementById(fieldId);
    if (!element) {
        console.warn(`⚠️ Champ non trouvé: ${fieldId}`);
        return false;
    }
    if (!element.value.trim()) {
        alert(`⚠️ Le champ "${fieldName}" est obligatoire`);
        element.focus();
        return false;
    }
    return true;
}

/**
 * Fonction helper pour collecter facilement des données de champs
 * @param {string} fieldId - ID du champ
 * @returns {string} - Valeur du champ ou chaîne vide
 */
function getFieldValue(fieldId) {
    const element = document.getElementById(fieldId);
    return element ? element.value.trim() : '';
}

// Export des fonctions utilitaires
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFirebaseForm,
        showMessage,
        hideMessages,
        validateField,
        getFieldValue
    };
}
