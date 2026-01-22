/**
 * Module de chargement dynamique des liens (Outils, Corrections, Cours)
 * Permet une gestion centralisée via links.json
 */

/**
 * Crée une tool-card pour la section Outils
 * @param {Object} tool - Données de l'outil
 * @returns {HTMLElement} - L'élément <a> créé
 */
function createToolCard(tool) {
    const link = document.createElement('a');
    link.href = tool.url;
    link.className = 'tool-card';

    if (tool.external) {
        link.target = '_blank';
        link.rel = 'noopener';
    }

    // Créer l'icône (image ou emoji)
    if (tool.icon.type === 'image') {
        const img = document.createElement('img');
        img.src = tool.icon.src;
        img.alt = tool.icon.alt;
        img.className = 'selector-icon';
        link.appendChild(img);
    } else if (tool.icon.type === 'emoji') {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'tool-card__logo';
        iconDiv.textContent = tool.icon.value;
        link.appendChild(iconDiv);
    }

    // Créer le nom
    const name = document.createElement('span');
    name.className = 'tool-card__name';
    name.textContent = tool.name;
    link.appendChild(name);

    // Créer le tag
    const tag = document.createElement('span');
    tag.className = 'tool-card__tag';
    tag.textContent = tool.tag;
    link.appendChild(tag);

    return link;
}

/**
 * Crée une correction-card pour la section Corrections
 * @param {Object} correction - Données de la correction
 * @returns {HTMLElement} - L'élément <a> créé
 */
function createCorrectionCard(correction) {
    const link = document.createElement('a');
    link.href = correction.url;
    link.className = `correction-card ${correction.class}`;

    // Icône
    const iconDiv = document.createElement('div');
    iconDiv.className = 'correction-card__icon';
    iconDiv.textContent = correction.icon;
    link.appendChild(iconDiv);

    // Titre
    const title = document.createElement('h3');
    title.className = 'correction-card__title';
    title.textContent = correction.name;
    link.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.className = 'correction-card__text';
    description.textContent = correction.description;
    link.appendChild(description);

    return link;
}

/**
 * Crée une card pour la section Cours
 * @param {Object} cours - Données du cours
 * @returns {HTMLElement} - L'élément <a> créé
 */
function createCoursCard(cours) {
    const link = document.createElement('a');
    link.href = cours.url;
    link.className = `card card--${cours.color}`;

    // Image (si présente)
    if (cours.image) {
        const img = document.createElement('img');
        img.src = cours.image;
        img.alt = cours.title;
        img.className = 'card__image';
        link.appendChild(img);
    }

    // Titre
    const title = document.createElement('h3');
    title.className = 'card__title';
    title.textContent = cours.title;
    link.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.className = 'card__text';
    description.textContent = cours.description;
    link.appendChild(description);

    return link;
}

/**
 * Charge et affiche les liens depuis links.json
 */
export async function loadLinks() {
    try {
        const response = await fetch('/dist/data/links.json');

        if (!response.ok) {
            throw new Error('Impossible de charger les liens');
        }

        const data = await response.json();

        // Charger les outils
        const toolsGrid = document.querySelector('.tools-grid');
        if (toolsGrid && data.outils) {
            toolsGrid.textContent = ''; // Vider le conteneur
            data.outils.forEach(tool => {
                toolsGrid.appendChild(createToolCard(tool));
            });
        }

        // Charger les corrections
        const correctionsGrid = document.querySelector('.correction-grid');
        if (correctionsGrid && data.corrections) {
            correctionsGrid.textContent = '';
            data.corrections.forEach(correction => {
                correctionsGrid.appendChild(createCorrectionCard(correction));
            });
        }

        // Charger les cours (si vous en ajoutez)
        const coursGrid = document.querySelector('.cours-grid');
        if (coursGrid && data.cours) {
            coursGrid.textContent = '';
            data.cours.forEach(cours => {
                coursGrid.appendChild(createCoursCard(cours));
            });
        }

    } catch (error) {
        console.error('Erreur chargement des liens:', error);
        // En cas d'erreur, le HTML statique reste affiché
    }
}
