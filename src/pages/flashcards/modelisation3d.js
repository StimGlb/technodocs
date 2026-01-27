// Flashcard data
const flashcardsData = [
    { q: "Quel est le nom de l'interface de travail de Tinkercad ?", a: "Il s'agit du Plan de construction, une grille bleue où l'on dépose les objets ." },
    { q: "À quoi sert le Cube de Vue en haut à gauche ?", a: "Il permet de faire pivoter la caméra pour voir l'objet sous tous les angles comme la Face, le Dessus ou la Droite ." },
    { q: "Où trouve-t-on les formes de base comme les cubes ou les sphères ?", a: "Elles se trouvent dans la Bibliothèque de Formes à droite de l'écran ." },
    { q: "Comment modifie-t-on la largeur et la longueur d'une forme ?", a: "On utilise les poignées représentées par des carrés noirs ou blancs sur les côtés ." },
    { q: "Quelle poignée permet de modifier la hauteur d'un objet ?", a: "C'est le carré blanc supérieur qui permet cette modification ." },
    { q: "Quelle est l'utilité de la flèche noire (cône) au-dessus d'un objet ?", a: "Elle sert à élever ou abaisser l'objet par rapport au plan de construction ." },
    { q: "Comment effectuer une rotation sur les trois axes ?", a: "Il faut utiliser les arcs de cercle fléchés qui apparaissent sur l'objet ." },
    { q: "Qu'est-ce que la méthode additive dans Tinkercad ?", a: "C'est l'assemblage de deux formes pleines pour créer une forme complexe, comme un cube et un toit pour une maison." },
    { q: "En quoi consiste la méthode soustractive ?", a: "On transforme une forme en 'Perçage' translucide pour retirer de la matière à une forme solide ." },
    { q: "Quelles sont les trois étapes pour réussir un projet ?", a: "Les étapes sont Placer (choisir une forme), Ajuster (redimensionner) et Combiner (grouper) ." },
    { q: "Comment peut-on zoomer sur l'interface ?", a: "On utilise la molette de la souris pour zoomer ." },
    { q: "Quelle est la méthode pour pivoter la vue rapidement ?", a: "Il faut maintenir le clic droit de la souris enfoncé ." },
    { q: "Comment déplacer la vue sans pivoter (Pan) ?", a: "On maintient le clic de la molette de la souris enfoncé ." },
    { q: "Que permet de faire la touche D sur Tinkercad ?", a: "Elle permet de poser instantanément un objet sur le plan de construction s'il flotte." },
    { q: "Pourquoi faut-il vérifier le contact avec le plateau avant l'impression ?", a: "Pour s'assurer que l'objet ne flotte pas dans l'air, ce qui ferait échouer l'impression ." },
    { q: "Quel conseil est donné pour la solidité des objets ?", a: "Il faut éviter les zones trop fines qui risquent de casser lors ou après l'impression." },
    { q: "Pourquoi le chevauchement des formes est-il important ?", a: "Il faut s'assurer que les formes s'imbriquent bien avant de les grouper pour une fusion propre ." },
    { q: "Quel est l'objectif du défi de la Maisonnette ?", a: "Apprendre à placer et aligner des formes de base ." },
    { q: "Comment centrer parfaitement un toit sur un cube ?", a: "On utilise l'outil Aligner (touche L) ." },
    { q: "Comment crée-t-on les points d'un dé à jouer ?", a: "On utilise de petites sphères transformées en 'Perçage' que l'on place sur les faces du cube ." },
    { q: "Quel outil utilise-t-on pour ajouter un prénom sur un porte-clés ?", a: "On utilise l'outil Texte disponible dans la bibliothèque ." },
    { q: "Quelle forme utilise-t-on pour faire l'attache d'un porte-clés ?", a: "On ajoute un petit Anneau (ou Tube) à une extrémité ." },
    { q: "Comment crée-t-on le creux d'une tasse de café ?", a: "On place un cylindre légèrement plus petit en mode 'Perçage' à l'intérieur d'un grand cylindre." },
    { q: "Quelle forme est utilisée pour faire l'anse d'une tasse ?", a: "On utilise un Torus (anneau) à moitié enfoncé dans le côté du cylindre." },
    { q: "Que contient l'étape 2 d'un projet de conception ?", a: "Elle contient le Cahier des Charges avec les contraintes de localisation et d'usage ." },
    { q: "Quel matériau est généralement utilisé pour l'impression au collège ?", a: "On utilise le plastique PLA ." },
    { q: "Quelle est la dimension maximale recommandée pour un projet élève ?", a: "L'objet ne doit pas dépasser 10 cm en longueur, largeur ou hauteur ." },
    { q: "Quelle est l'origine du plastique PLA ?", a: "C'est un plastique d'origine végétale ." },
    { q: "Quels sont les critères de réussite d'un objet ?", a: "Il doit remplir sa fonction, respecter les dimensions, être solide et être original ." },
    { q: "Que signifie l'action 'Combiner' dans Tinkercad ?", a: "Cela consiste à sélectionner plusieurs formes et à les grouper pour fusionner ou percer ." },
    { q: "Qu'est-ce que la mission d'un objet ?", a: "C'est la définition de qui a besoin de quoi et pour quelle raison ." },
    { q: "Que vérifie-t-on avec la solidité dans le cahier des charges ?", a: "On vérifie si l'objet est assez épais pour ne pas être trop fragile ." },
    { q: "Quelle est la fonction du bouton 'Supprimer' ?", a: "Il permet de retirer une forme sélectionnée du plan de travail ." },
    { q: "Comment garantit-on qu'un cylindre creuse bien un autre ?", a: "En transformant le cylindre intérieur en mode perçage avant de grouper." },
    { q: "Quelle unité de mesure est généralement utilisée pour les dimensions ?", a: "Les dimensions sont exprimées en millimètres (mm)." },
];

// State
let cards = [...flashcardsData];
let filteredCards = [...cards];
let currentIndex = 0;
let singleMode = false;
let allFlipped = false;

// Initialize DOM elements
let grid, searchInput, shuffleBtn, modeBtn, flipAllBtn, totalCardsEl, visibleCardsEl, currentCardEl, totalFilteredEl, prevBtn, nextBtn;

function initializeElements() {
    grid = document.getElementById('flashcardGrid');
    searchInput = document.getElementById('searchInput');
    shuffleBtn = document.getElementById('shuffleBtn');
    modeBtn = document.getElementById('modeBtn');
    flipAllBtn = document.getElementById('flipAllBtn');
    totalCardsEl = document.getElementById('totalCards');
    visibleCardsEl = document.getElementById('visibleCards');
    currentCardEl = document.getElementById('currentCard');
    totalFilteredEl = document.getElementById('totalFiltered');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
}

// Functions
function createFlashcard(card, index, originalIndex) {
    const delay = singleMode ? 0 : index * 0.05;
    return `
        <div class="flashcard-container" style="animation-delay: ${delay}s" data-index="${index}">
            <div class="flashcard" onclick="flipCard(this)">
                <div class="flashcard-face flashcard-front">
                    <span class="card-number">${originalIndex + 1}</span>
                    <div class="card-label">Question</div>
                    <div class="card-content">${card.q}</div>
                    <div class="flip-hint">👆 Cliquer pour voir la réponse</div>
                </div>
                <div class="flashcard-face flashcard-back">
                    <span class="card-number">${originalIndex + 1}</span>
                    <div class="card-label">Réponse</div>
                    <div class="card-content">${card.a}</div>
                    <div class="flip-hint">👆 Cliquer pour voir la question</div>
                </div>
            </div>
        </div>
    `;
}

function renderCards() {
    if (filteredCards.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <p>Aucune carte ne correspond à votre recherche</p>
            </div>
        `;
        return;
    }

    if (singleMode) {
        const card = filteredCards[currentIndex];
        const originalIndex = cards.indexOf(card);
        grid.innerHTML = createFlashcard(card, 0, originalIndex);
    } else {
        grid.innerHTML = filteredCards.map((card, i) => {
            const originalIndex = cards.indexOf(card);
            return createFlashcard(card, i, originalIndex);
        }).join('');
    }

    updateStats();
    updateNavigation();
}

function flipCard(el) {
    el.classList.toggle('flipped');
}

function updateStats() {
    totalCardsEl.textContent = cards.length;
    visibleCardsEl.textContent = filteredCards.length;
    currentCardEl.textContent = currentIndex + 1;
    totalFilteredEl.textContent = filteredCards.length;
}

function updateNavigation() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= filteredCards.length - 1;
}

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function filterCards(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        filteredCards = [...cards];
    } else {
        filteredCards = cards.filter(card =>
            card.q.toLowerCase().includes(q) ||
            card.a.toLowerCase().includes(q)
        );
    }
    currentIndex = 0;
    renderCards();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        filterCards(e.target.value);
    });

    shuffleBtn.addEventListener('click', () => {
        cards = shuffle(cards);
        filterCards(searchInput.value);
    });

    modeBtn.addEventListener('click', () => {
        singleMode = !singleMode;
        document.body.classList.toggle('single-card-mode', singleMode);
        modeBtn.textContent = singleMode ? '📋 Mode grille' : '📋 Mode carte unique';
        currentIndex = 0;
        renderCards();
    });

    flipAllBtn.addEventListener('click', () => {
        allFlipped = !allFlipped;
        document.querySelectorAll('.flashcard').forEach(card => {
            if (allFlipped) {
                card.classList.add('flipped');
            } else {
                card.classList.remove('flipped');
            }
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderCards();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < filteredCards.length - 1) {
            currentIndex++;
            renderCards();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (singleMode) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                renderCards();
            } else if (e.key === 'ArrowRight' && currentIndex < filteredCards.length - 1) {
                currentIndex++;
                renderCards();
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                const card = document.querySelector('.flashcard');
                if (card) flipCard(card);
            }
        }
    });

    // Initial render
    renderCards();
});
