// Flashcard data
const flashcardsData = [
    { q: "Qu'est-ce que l'Indice de Réparabilité ?", a: "C'est une note sur 10 qui évalue la facilité avec laquelle un produit peut être réparé." },
    { q: "Citez une raison pour laquelle la réparation a une bonne image en France.", a: "Elle participe à la préservation de l'environnement, contribue à l'économie locale ou permet de réaliser des économies." },
    { q: "Quel est le premier objectif de l'Indice de Réparabilité ?", a: "Atteindre un taux de réparation de 60% pour les produits électriques et électroniques d'ici 5 ans." },
    { q: "Le deuxième objectif de l'Indice de Réparabilité est de réduire les quantités de déchets et de préserver les _____.", a: "ressources" },
    { q: "Quel est le troisième objectif de l'Indice de Réparabilité envers les fabricants ?", a: "Les inciter à améliorer la conception de leurs produits pour plus de réparabilité." },
    { q: "La facilité de _____ du produit est un critère clé de l'Indice de Réparabilité.", a: "démontage" },
    { q: "Quel score a obtenu la lampe de poche pour le critère \"Spécificité des outils\" ?", a: "Elle a obtenu le score maximal de 1/1." },
    { q: "Quels services sont offerts pour justifier le score d'\"Assistance technique\" de la lampe ?", a: "Un support par email et des tutoriels vidéo en ligne." },
    { q: "Quelle est la toute première étape pour évaluer la réparabilité d'un appareil ?", a: "Rechercher les informations sur l'appareil testé (notices, schémas, etc.)." },
    { q: "Après avoir recueilli les informations, que fait-on pour chaque critère de l'indice ?", a: "On attribue une note selon le barème pour chaque critère." },
    { q: "Quel est le titre de la méthodologie de réparation proposée dans l'activité ?", a: "Méthodologie de diagnostic d'une panne." },
    { q: "La méthodologie de diagnostic d'une panne se déroule en combien d'étapes ?", a: "Elle se déroule en 5 étapes." },
    { q: "Quelle est la première étape de la méthodologie de diagnostic ?", a: "1. OBSERVER." },
    { q: "En quoi consiste l'étape \"OBSERVER\" pour une lampe qui ne s'allume pas ?", a: "Vérifier si le câble est abîmé ou si l'ampoule est cassée, sans toucher l'objet." },
    { q: "Quelle est la deuxième étape de la méthodologie de diagnostic ?", a: "2. TESTER." },
    { q: "Que doit-on faire lors de l'étape \"TESTER\" ?", a: "Vérifier l'alimentation électrique et les connexions." },
    { q: "La troisième étape de la méthodologie de diagnostic est _____.", a: "3. DÉMONTER" },
    { q: "Que signifie démonter de manière \"non destructive\" ?", a: "Ouvrir l'objet sans le casser, afin de pouvoir le remonter." },
    { q: "Quelle est la quatrième étape de la méthodologie de diagnostic ?", a: "4. IDENTIFIER." },
    { q: "Quelle est l'action à réaliser lors de l'étape \"IDENTIFIER\" ?", a: "Localiser les composants défaillants." },
    { q: "Quelle est la cinquième et dernière étape de la méthodologie de diagnostic ?", a: "5. DIAGNOSTIQUER." },
    { q: "Que doit-on faire lors de l'étape \"DIAGNOSTIQUER\" ?", a: "Établir la cause probable de la panne." },
    { q: "Quelle est la précaution de sécurité la plus essentielle avant de manipuler un appareil électrique ?", a: "Débrancher l'appareil de la prise de courant." },
    { q: "Citez au moins deux autres précautions de sécurité à prendre avec un appareil électrique.", a: "Travailler sur une surface sèche, ne pas avoir les mains mouillées, ne pas utiliser d'outils métalliques non isolés." },
    { q: "Parmi les pannes possibles d'une lampe, laquelle est la plus facile à réparer ?", a: "Le changement de l'ampoule." },
    { q: "Parmi les points \"À retenir\", la réparabilité est un enjeu _____ et _____ majeur.", a: "environnemental, économique" },
    { q: "Quel est le point \"À retenir\" concernant la sécurité ?", a: "La sécurité est primordiale lors de toute intervention sur un objet électrique." },
    { q: "Quel est le point \"À retenir\" concernant les documents techniques ?", a: "L'analyse des schémas et notices est essentielle avant toute réparation." },
    { q: "Quel est l'un des objectifs pédagogiques du schéma technique de la lampe de chevet ?", a: "Identifier les composants électriques, comprendre le circuit, ou localiser les points de panne potentiels." },
    { q: "Quels sont les cinq composants principaux d'une lampe de chevet simple ?", a: "Le socle, le câble d'alimentation, l'interrupteur, la douille et l'ampoule LED." },
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
