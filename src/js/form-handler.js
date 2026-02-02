/**
 * Form Handler - TechnoDocs
 * Gère la soumission des formulaires de devoirs en ligne
 */

// Initialisation automatique au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initFormHandlers();
});

/**
 * Initialise les gestionnaires de formulaires
 */
function initFormHandlers() {
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

/**
 * Gère la soumission d'un formulaire
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');

    // Désactiver le bouton pendant le traitement
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
    }

    // Collecter les données
    const data = {};
    formData.forEach((value, key) => {
        // Gérer les champs multiples (checkboxes)
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    });

    // Ajouter les métadonnées
    data._timestamp = new Date().toISOString();
    data._formId = form.id;
    data._pageUrl = window.location.href;

    try {
        // Simuler un délai d'envoi (à remplacer par l'appel API réel)
        await simulateSubmit(data);

        // Afficher le message de succès
        showSuccessMessage(form, data);

        // Réinitialiser le formulaire
        form.reset();

    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        showErrorMessage(form, error.message);

    } finally {
        // Réactiver le bouton
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Soumettre le devoir';
        }
    }
}

/**
 * Simule l'envoi du formulaire (à remplacer par l'appel réel)
 */
function simulateSubmit(data) {
    return new Promise((resolve, reject) => {
        // Simuler un délai réseau
        setTimeout(() => {
            // Log des données pour debug
            console.log('Données du formulaire:', data);

            // Stocker localement (backup)
            saveToLocalStorage(data);

            resolve({ success: true, data });
        }, 1000);
    });
}

/**
 * Sauvegarde les données en localStorage (backup)
 */
function saveToLocalStorage(data) {
    const key = `technodocs_form_${data._formId}_${Date.now()}`;

    try {
        const existing = JSON.parse(localStorage.getItem('technodocs_submissions') || '[]');
        existing.push({ key, data, savedAt: new Date().toISOString() });

        // Garder uniquement les 50 dernières soumissions
        if (existing.length > 50) {
            existing.shift();
        }

        localStorage.setItem('technodocs_submissions', JSON.stringify(existing));
    } catch (e) {
        console.warn('Impossible de sauvegarder en localStorage:', e);
    }
}

/**
 * Affiche un message de succès
 */
function showSuccessMessage(form, data) {
    // Supprimer les anciens messages
    removeMessages(form);

    const message = document.createElement('div');
    message.className = 'form__message form__message--success';
    message.setAttribute('role', 'alert');

    const icon = document.createElement('span');
    icon.className = 'form__message-icon';
    icon.textContent = '✅';
    icon.setAttribute('aria-hidden', 'true');

    const text = document.createElement('div');
    text.className = 'form__message-text';

    const title = document.createElement('strong');
    title.textContent = 'Devoir soumis avec succès !';

    const details = document.createElement('p');
    details.textContent = `Merci ${data.prenom || ''} ! Ton devoir a bien été enregistré.`;

    text.appendChild(title);
    text.appendChild(details);
    message.appendChild(icon);
    message.appendChild(text);

    // Insérer avant le formulaire
    form.parentNode.insertBefore(message, form);

    // Scroll vers le message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Supprimer après 10 secondes
    setTimeout(() => {
        message.remove();
    }, 10000);
}

/**
 * Affiche un message d'erreur
 */
function showErrorMessage(form, errorText) {
    // Supprimer les anciens messages
    removeMessages(form);

    const message = document.createElement('div');
    message.className = 'form__message form__message--error';
    message.setAttribute('role', 'alert');

    const icon = document.createElement('span');
    icon.className = 'form__message-icon';
    icon.textContent = '❌';
    icon.setAttribute('aria-hidden', 'true');

    const text = document.createElement('div');
    text.className = 'form__message-text';

    const title = document.createElement('strong');
    title.textContent = 'Erreur lors de l\'envoi';

    const details = document.createElement('p');
    details.textContent = errorText || 'Une erreur est survenue. Veuillez réessayer.';

    text.appendChild(title);
    text.appendChild(details);
    message.appendChild(icon);
    message.appendChild(text);

    // Insérer avant le formulaire
    form.parentNode.insertBefore(message, form);

    // Scroll vers le message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Supprime les messages existants
 */
function removeMessages(form) {
    const parent = form.parentNode;
    const messages = parent.querySelectorAll('.form__message');
    messages.forEach(msg => msg.remove());
}

// Export pour utilisation modulaire
export { initFormHandlers, handleFormSubmit };
