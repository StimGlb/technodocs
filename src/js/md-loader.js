// TechnoDocs - Correction Loader
// Charge et affiche les fichiers Markdown de correction de manière sécurisée (CSP compliant)

import { loadComponents } from './components.js';

// Charger header/footer
loadComponents();

// Configuration de Marked
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

/**
 * Injecte du HTML de manière sécurisée en utilisant DOMParser
 * @param {HTMLElement} container - L'élément cible
 * @param {string} htmlString - La chaîne HTML à injecter
 */
const safeInjectHTML = (container, htmlString) => {
    if (!container) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    container.textContent = '';
    Array.from(doc.body.childNodes).forEach(node => {
        container.appendChild(node.cloneNode(true));
    });
};

/**
 * Crée un message d'erreur de manière sécurisée
 * @param {string} message - Le message d'erreur
 * @returns {HTMLElement} - L'élément d'erreur
 */
const createErrorMessage = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'md-error';

    const strong = document.createElement('strong');
    strong.textContent = 'Erreur : ';

    const text = document.createTextNode(message);

    errorDiv.appendChild(strong);
    errorDiv.appendChild(text);

    return errorDiv;
};

/**
 * Génère une Table des Matières avec les Activités (h3) et Questions (h4)
 * @param {HTMLElement} container - Le conteneur avec le contenu Markdown
 */
const generateTOC = (container) => {
    const h3Elements = container.querySelectorAll('h3');

    if (h3Elements.length === 0) return; // Pas d'activités, pas de TOC

    // Créer le conteneur de la TOC
    const tocContainer = document.createElement('nav');
    tocContainer.className = 'md-toc';
    tocContainer.setAttribute('aria-label', 'Table des matières');

    const tocTitle = document.createElement('div');
    tocTitle.className = 'md-toc-title';
    tocTitle.textContent = 'Table des matières';

    const tocList = document.createElement('ul');
    tocList.className = 'md-toc-list';

    h3Elements.forEach((h3, index) => {
        // Créer un ID unique pour le h3 s'il n'en a pas
        if (!h3.id) {
            h3.id = `activite-${index + 1}`;
        }

        // Créer l'élément d'activité
        const activityItem = document.createElement('li');
        activityItem.className = 'md-toc-activity';

        const activityLink = document.createElement('a');
        activityLink.href = `#${h3.id}`;
        activityLink.textContent = h3.textContent;

        activityItem.appendChild(activityLink);

        // Trouver tous les h4 qui suivent ce h3 jusqu'au prochain h3
        const questions = [];
        let nextElement = h3.nextElementSibling;

        while (nextElement && nextElement.tagName !== 'H3') {
            if (nextElement.tagName === 'H4') {
                questions.push(nextElement);
            }
            nextElement = nextElement.nextElementSibling;
        }

        // Si des questions existent, créer une sous-liste
        if (questions.length > 0) {
            const questionsList = document.createElement('ul');
            questionsList.className = 'md-toc-questions';

            questions.forEach((h4, qIndex) => {
                // Créer un ID unique pour le h4 s'il n'en a pas
                if (!h4.id) {
                    h4.id = `activite-${index + 1}-question-${qIndex + 1}`;
                }

                const questionItem = document.createElement('li');
                const questionLink = document.createElement('a');
                questionLink.href = `#${h4.id}`;
                questionLink.textContent = h4.textContent;

                questionItem.appendChild(questionLink);
                questionsList.appendChild(questionItem);
            });

            activityItem.appendChild(questionsList);
        }

        tocList.appendChild(activityItem);
    });

    tocContainer.appendChild(tocTitle);
    tocContainer.appendChild(tocList);

    // Insérer la TOC après le premier h1 ou h2
    const firstHeading = container.querySelector('h1, h2');
    if (firstHeading && firstHeading.nextElementSibling) {
        firstHeading.parentNode.insertBefore(tocContainer, firstHeading.nextElementSibling);
    } else {
        container.insertBefore(tocContainer, container.firstChild);
    }
};

/**
 * Charge et affiche le fichier Markdown de correction
 * @param {string} markdownPath - Chemin vers le fichier Markdown
 */
async function loadCorrection(markdownPath) {
    const container = document.getElementById('markdown-container');

    try {
        const response = await fetch(markdownPath);

        if (!response.ok) {
            throw new Error('Impossible de charger la correction');
        }

        const mdText = await response.text();
        const htmlContent = marked.parse(mdText);

        // Injection sécurisée via DOMParser (Zéro innerHTML)
        safeInjectHTML(container, htmlContent);

        // Générer la Table des Matières
        generateTOC(container);

        // Met à jour le titre avec le premier H1
        const firstH1 = container.querySelector('h1');
        if (firstH1) {
            document.title = `${firstH1.textContent} | TechnoDocs`;
        }

    } catch (error) {
        container.textContent = '';
        container.appendChild(createErrorMessage(error.message));

        // Log uniquement en dev
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Erreur chargement correction:', error);
        }
    }
}

// Auto-initialisation : récupère le chemin depuis l'attribut data-markdown-path
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('markdown-container');
    const markdownPath = container?.dataset.markdownPath;

    if (markdownPath) {
        loadCorrection(markdownPath);
    } else {
        console.error('Aucun chemin de fichier Markdown spécifié (data-markdown-path manquant)');
    }
});
