/**
 * TechnoDocs - Chargement des composants réutilisables
 * Header et Footer dynamiques
 */

// Import de la fonction d'initialisation de la navigation
import { initMobileNav } from './app.js';

// Fonction pour charger le header
async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    try {
        const response = await fetch('/dist/includes/header.html');
        if (!response.ok) {
            throw new Error('Impossible de charger le header');
        }
        const html = await response.text();
        headerPlaceholder.outerHTML = html;

        // Réinitialiser la navigation mobile après l'injection du header
        initMobileNav();
    } catch (error) {
        // En production : afficher un message utilisateur générique (sans innerHTML pour sécurité)
        const fallbackHeader = document.createElement('header');
        fallbackHeader.className = 'header';
        const container = document.createElement('div');
        container.className = 'header__container';
        const message = document.createElement('p');
        message.textContent = 'Erreur de chargement';
        container.appendChild(message);
        fallbackHeader.appendChild(container);
        headerPlaceholder.replaceWith(fallbackHeader);

        // Log uniquement en développement
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Erreur header:', error);
        }
    }
}

// Fonction pour charger le footer
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    try {
        const response = await fetch('/dist/includes/footer.html');
        if (!response.ok) {
            throw new Error('Impossible de charger le footer');
        }
        const html = await response.text();
        footerPlaceholder.outerHTML = html;
    } catch (error) {
        // En production : afficher un message utilisateur générique (sans innerHTML pour sécurité)
        const fallbackFooter = document.createElement('footer');
        fallbackFooter.className = 'footer';
        const message = document.createElement('p');
        message.textContent = 'Erreur de chargement';
        fallbackFooter.appendChild(message);
        footerPlaceholder.replaceWith(fallbackFooter);

        // Log uniquement en développement
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Erreur footer:', error);
        }
    }
}

// Charger les composants au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([loadHeader(), loadFooter()]);
});

// Export pour utilisation modulaire
export { loadHeader, loadFooter };
