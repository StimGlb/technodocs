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
        const html = await response.text();
        headerPlaceholder.outerHTML = html;

        // Réinitialiser la navigation mobile après l'injection du header
        initMobileNav();
    } catch (error) {
        console.error('Erreur lors du chargement du header:', error);
    }
}

// Fonction pour charger le footer
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    try {
        const response = await fetch('/dist/includes/footer.html');
        const html = await response.text();
        footerPlaceholder.outerHTML = html;
    } catch (error) {
        console.error('Erreur lors du chargement du footer:', error);
    }
}

// Charger les composants au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([loadHeader(), loadFooter()]);
});

// Export pour utilisation modulaire
export { loadHeader, loadFooter };
