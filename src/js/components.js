// TechnoDocs - Chargement des composants (Header/Footer)
// Charge dynamiquement les includes HTML

import { initNavigation } from './app.js';

// ===========================
// Fonction de remplacement sécurisé du DOM
// ===========================
const safeReplaceElement = (placeholder, htmlContent) => {
    if (!placeholder) return;

    // Parse le HTML de manière sécurisée avec DOMParser (évite innerHTML)
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const newElement = doc.body.firstElementChild;

    if (newElement) {
        placeholder.replaceWith(newElement);
    }
};

// ===========================
// Chargement du header
// ===========================
async function loadHeader() {
    const placeholder = document.getElementById('header-placeholder');

    if (!placeholder) return;

    try {
        const response = await fetch('/src/includes/header.html');

        if (!response.ok) {
            throw new Error('Impossible de charger le header');
        }

        const html = await response.text();
        safeReplaceElement(placeholder, html);

        // Réinitialiser la navigation après le chargement du header
        initNavigation();

    } catch (error) {
        // Fallback en cas d'erreur
        const fallbackHeader = document.createElement('header');
        fallbackHeader.className = 'header';

        const container = document.createElement('div');
        container.className = 'header__container';

        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Erreur de chargement';

        container.appendChild(errorMsg);
        fallbackHeader.appendChild(container);
        placeholder.replaceWith(fallbackHeader);

        // Log uniquement en dev
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Erreur header:', error);
        }
    }
}

// ===========================
// Chargement du footer
// ===========================
async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');

    if (!placeholder) return;

    try {
        const response = await fetch('/src/includes/footer.html');

        if (!response.ok) {
            throw new Error('Impossible de charger le footer');
        }

        const html = await response.text();
        safeReplaceElement(placeholder, html);

    } catch (error) {
        // Fallback en cas d'erreur
        const fallbackFooter = document.createElement('footer');
        fallbackFooter.className = 'footer';

        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Erreur de chargement';

        fallbackFooter.appendChild(errorMsg);
        placeholder.replaceWith(fallbackFooter);

        // Log uniquement en dev
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Erreur footer:', error);
        }
    }
}

// ===========================
// Chargement de tous les composants
// ===========================
async function loadComponents() {
    await Promise.all([
        loadHeader(),
        loadFooter()
    ]);
}

// Auto-initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
});

// Exporter pour utilisation modulaire
export { loadComponents, loadHeader, loadFooter };
