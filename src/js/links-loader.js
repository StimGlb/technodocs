// TechnoDocs - Chargeur de liens dynamiques
// Charge et affiche les liens depuis links.json

// ===========================
// Création de carte outil
// ===========================
function createToolCard(tool) {
    const card = document.createElement('a');
    card.href = tool.url;
    card.className = 'tool-card';

    if (tool.external) {
        card.target = '_blank';
        card.rel = 'noopener';
    }

    // Icône (image ou emoji)
    if (tool.icon.type === 'image') {
        const img = document.createElement('img');
        img.src = tool.icon.src;
        img.alt = tool.icon.alt;
        img.className = 'selector-icon';
        card.appendChild(img);
    } else if (tool.icon.type === 'emoji') {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'tool-card__logo';
        iconDiv.textContent = tool.icon.value;
        card.appendChild(iconDiv);
    }

    // Nom
    const name = document.createElement('span');
    name.className = 'tool-card__name';
    name.textContent = tool.name;
    card.appendChild(name);

    // Tag
    const tag = document.createElement('span');
    tag.className = 'tool-card__tag';
    tag.textContent = tool.tag;
    card.appendChild(tag);

    return card;
}

// ===========================
// Création de carte correction
// ===========================
function createCorrectionCard(correction) {
    const card = document.createElement('a');
    card.href = correction.url;
    card.className = `correction-card ${correction.class}`;

    // Icône
    const icon = document.createElement('div');
    icon.className = 'correction-card__icon';
    icon.textContent = correction.icon;
    card.appendChild(icon);

    // Titre
    const title = document.createElement('h3');
    title.className = 'correction-card__title';
    title.textContent = correction.name;
    card.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.className = 'correction-card__text';
    description.textContent = correction.description;
    card.appendChild(description);

    return card;
}

// ===========================
// Création de carte cours
// ===========================
function createCoursCard(cours) {
    const card = document.createElement('a');
    card.href = cours.url;
    card.className = `card card--${cours.color}`;

    // Image (optionnelle)
    if (cours.image) {
        const img = document.createElement('img');
        img.src = cours.image;
        img.alt = cours.title;
        img.className = 'card__image';
        card.appendChild(img);
    }

    // Titre
    const title = document.createElement('h3');
    title.className = 'card__title';
    title.textContent = cours.title;
    card.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.className = 'card__text';
    description.textContent = cours.description;
    card.appendChild(description);

    return card;
}

// ===========================
// Validation de lien
// ===========================
function isValidLink(link, type) {
    const requiredFields = {
        outils: ['name', 'url', 'tag', 'icon'],
        corrections: ['name', 'url', 'description', 'icon'],
        cours: ['title', 'url', 'description', 'color']
    };

    const fields = requiredFields[type];
    if (!fields) return false;

    return fields.every(field => link[field] !== undefined);
}

// ===========================
// Fetch avec timeout
// ===========================
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// ===========================
// Cache des liens
// ===========================
let linksCache = null;

// ===========================
// Chargement des liens
// ===========================
async function loadLinks() {
    try {
        // Utiliser le cache si disponible
        let links = linksCache;

        if (!links) {
            const response = await fetchWithTimeout('/data/links.json');

            if (!response.ok) {
                throw new Error('Impossible de charger les liens');
            }

            links = await response.json();
            linksCache = links; // Mettre en cache
        }

        // Charger les outils
        const toolsGrid = document.querySelector('.tools-grid');
        if (toolsGrid && links.outils) {
            toolsGrid.textContent = ''; // Vider le conteneur
            links.outils.forEach(tool => {
                if (isValidLink(tool, 'outils')) {
                    toolsGrid.appendChild(createToolCard(tool));
                } else {
                    console.warn('Lien outil invalide:', tool);
                }
            });
        }

        // Charger les corrections
        const correctionGrid = document.querySelector('.correction-grid');
        if (correctionGrid && links.corrections) {
            correctionGrid.textContent = ''; // Vider le conteneur
            links.corrections.forEach(correction => {
                if (isValidLink(correction, 'corrections')) {
                    correctionGrid.appendChild(createCorrectionCard(correction));
                } else {
                    console.warn('Lien correction invalide:', correction);
                }
            });
        }

        // Charger les cours
        const coursGrid = document.querySelector('.cours-grid');
        if (coursGrid && links.cours) {
            coursGrid.textContent = ''; // Vider le conteneur
            links.cours.forEach(cours => {
                if (isValidLink(cours, 'cours')) {
                    coursGrid.appendChild(createCoursCard(cours));
                } else {
                    console.warn('Lien cours invalide:', cours);
                }
            });
        }

    } catch (error) {
        console.error('Erreur chargement des liens:', error);
    }
}

// Exporter pour utilisation dans d'autres modules
export { loadLinks };
