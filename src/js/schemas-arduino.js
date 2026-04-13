/**
 * Schemas Arduino - Gestion des schémas et modal
 * Externalité pour respecter la CSP et Netlify Dev
 */

// ============================================
// DONNÉES DES SCHÉMAS
// ============================================
// Pour ajouter un schéma : ajouter un objet dans ce tableau.
// Les images PNG doivent être dans /src/assets/schemas-arduino/
// ============================================
const SCHEMAS = [
  {
    id: "led-simple",
    title: "Allumer une LED",
    description: "Circuit de base : une LED avec sa résistance de protection, pilotée par une sortie numérique.",
    image: "/src/assets/schemas-arduino/led-double.png",
    difficulty: "debutant",      // debutant | intermediaire | avance
    niveaux: ["5eme", "4eme"],   // niveaux concernés
    composants: [
      "1× Arduino Uno",
      "1× Breadboard",
      "1× LED (rouge)",
      "1× LED (verte)",
      "1× Résistance 220Ω",
      "2× Fils de connexion"
    ],
    consignes: [
      "Place l'Arduino et la breadboard côte à côte sur le plan de travail Tinkercad.",
      "Insère la LED sur la breadboard : la patte longue (anode +) sur une ligne, la patte courte (cathode −) sur la ligne voisine.",
      "Branche la résistance de 220Ω entre la patte longue (anode) de la LED et une ligne libre.",
      "Relie la ligne de la résistance à la broche 12 de l'Arduino avec un fil.",
      "Relie le LED verte de la même manière : patte longue à une ligne, patte courte à la ligne GND, puis résistance 220Ω entre la patte longue et la broche 11.",
      "Relie la patte courte (cathode) de la LED à la ligne GND (−) de la breadboard.",
      "Connecte la ligne GND de la breadboard à une broche GND de l'Arduino.",
      "Lance la simulation et vérifie que la LED s'allume."
    ]
  },
  {
    id: "bouton-led",
    title: "Bouton-poussoir + LED",
    description: "Lecture d'un bouton-poussoir en entrée numérique pour commander l'allumage d'une LED.",
    image: "/src/assets/schemas-arduino/bouton-led.png",
    difficulty: "debutant",
    niveaux: ["5eme", "4eme"],
    composants: [
      "1× Arduino Uno",
      "1× Breadboard",
      "1× LED",
      "1× Résistance 220Ω (LED)",
      "1× Résistance 10kΩ (pull-down)",
      "1× Bouton-poussoir",
      "5× Fils de connexion"
    ],
    consignes: [
      "Ajoute une LED à la broche 7 de l'Arduino avec une résistance de 220Ω en série (comme dans le schéma précédent).",
      "Place le bouton-poussoir en haut à gauche.",
      "Branche une patte du bouton au +5V de l'Arduino.",
      "Branche l'autre patte du même côté à la broche 8 de l'Arduino (entrée numérique).",
      "Ajoute la résistance pull-down de 10kΩ entre l'autre patte du bouton et GND.",
      "Programme : si lire la broche 8 = 1 → allumer LED, sinon → éteindre.",
      "Lance la simulation et appuie sur le bouton pour tester."
    ]
  },
  {
    id: "pir-led",
    title: "Capteur de présence PIR + LED",
    description: "Détection de mouvement avec un capteur PIR : allumer une LED automatiquement quand une présence est détectée.",
    image: "/src/assets/schemas-arduino/pir-led.png",
    difficulty: "intermediaire",
    niveaux: ["4eme", "3eme"],
    composants: [
      "1× Arduino Uno",
      "1× Capteur de présence PIR",
      "1× LED (bleue)",
      "1× Résistance 220Ω",
      "5× Fils de connexion"
    ],
    consignes: [
      "Place le capteur PIR sur le plan de travail, face plate (dôme) orientée vers la zone à surveiller.",
      "Relie la broche VCC (rouge) du PIR à la broche 5V de l'Arduino.",
      "Relie la broche GND (blanc) du PIR à une broche GND de l'Arduino.",
      "Relie la broche Signal (vert) du PIR à la broche numérique 2 de l'Arduino.",
      "Insère la LED : la patte longue (anode +) reliée à une résistance de 220Ω, puis à la broche numérique 3 de l'Arduino. La patte courte (cathode −) reliée au GND.",
      "Programme : lire digitalRead(2) — si HIGH (mouvement détecté), allumer la LED sur la broche 3, sinon l'éteindre.",
      "Lance la simulation. Le capteur PIR a un délai de calibration d'environ 30 secondes au démarrage — attends avant de tester."
    ]
  },
  {
    id: "digicode-serrure",
    title: "Serrure à digicode",
    description: "Système de contrôle d'accès domotique : saisie d'un code sur clavier matriciel, affichage LCD et déverrouillage par servomoteur.",
    image: "/src/assets/schemas-arduino/digicode-serrure.png",
    difficulty: "avance",
    niveaux: ["4eme", "3eme"],
    composants: [
      "1× Arduino Uno",
      "1× Breadboard",
      "1× Clavier matriciel 4×4 (membrane, 8 broches)",
      "1× Écran LCD 16×2 avec module I2C",
      "1× Servomoteur SG90",
      "Fils de connexion"
    ],
    consignes: [
      // --- LCD I2C (4 fils) ---
      "Branche le LCD I2C : GND → GND Arduino, VCC → 5V Arduino, SDA → broche A4, SCL → broche A5.",

      // --- Servomoteur (3 fils) ---
      "Branche le servomoteur : fil rouge → 5V, fil marron/noir → GND, fil orange → broche 9 (PWM).",

      // --- Clavier 4×4 (8 fils) ---
      "Repère les 8 broches du clavier (de gauche à droite, nappe face à toi) : les 4 premières sont les LIGNES (R1–R4), les 4 suivantes sont les COLONNES (C1–C4).",
      "Branche les 4 lignes du clavier : R1 → broche 8, R2 → broche 7, R3 → broche 6, R4 → broche 5.",
      "Branche les 4 colonnes du clavier : C1 → broche 4, C2 → broche 3, C3 → broche 2, C4 → broche A0.",

      // --- Vérification ---
      "Vérifie qu'aucun fil ne se croise ou ne touche un voisin sur la breadboard.",

      // --- Programmation ---
      "Programme : utilise les bibliothèques Keypad.h, LiquidCrystal_I2C.h et Servo.h. Définis un code secret (ex: 1234 pour tester). À chaque touche pressée, affiche une étoile * sur le LCD. Si le code est correct, affiche « Accès OK » et tourne le servo à 90°. Sinon, affiche « Code faux » et garde le servo à 0°.",

      "Lance la simulation et teste avec le bon et le mauvais code."
    ]
    },
];

// ============================================
// RENDU DES CARDS
// ============================================
const grid = document.getElementById('schemasGrid');

const DIFFICULTY_LABELS = {
  debutant: '🟢 Débutant',
  intermediaire: '🟡 Intermédiaire',
  avance: '🔴 Avancé'
};

function renderCards(filter = 'all') {
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? SCHEMAS
    : SCHEMAS.filter(s => s.niveaux.includes(filter));

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--color-gray-400);grid-column:1/-1;padding:2rem;">Aucun schéma pour ce niveau.</p>';
    return;
  }

  filtered.forEach(schema => {
    const card = document.createElement('div');
    card.className = 'schema-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Voir le schéma : ${schema.title}`);
    card.dataset.schemaId = schema.id;

    card.innerHTML = `
      <div class="schema-card__img-wrapper">
        <img src="${schema.image}" alt="Schéma Tinkercad : ${schema.title}" loading="lazy" />
        <span class="schema-card__difficulty schema-card__difficulty--${schema.difficulty}">
          ${DIFFICULTY_LABELS[schema.difficulty]}
        </span>
        <div class="schema-card__zoom-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>
      <div class="schema-card__body">
        <h2 class="schema-card__title">${schema.title}</h2>
        <p class="schema-card__desc">${schema.description}</p>
        <div class="schema-card__tags">
          ${schema.niveaux.map(n => `<span class="schema-card__tag">${n.replace('eme', 'ème')}</span>`).join('')}
        </div>
      </div>
    `;

    // Ouverture du modal
    card.addEventListener('click', () => openModal(schema));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(schema);
      }
    });

    grid.appendChild(card);
  });
}

// ============================================
// FILTRES
// ============================================
const filterBtns = document.querySelectorAll('.schemas-filters__btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(btn.dataset.filter);
  });
});

// ============================================
// MODAL
// ============================================
const modal = document.getElementById('schemaModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDifficulty = document.getElementById('modalDifficulty');
const modalNiveaux = document.getElementById('modalNiveaux');
const modalComponents = document.getElementById('modalComponents');
const modalSteps = document.getElementById('modalSteps');
const modalClose = document.getElementById('modalClose');

const DIFFICULTY_CLASSES = {
  debutant: 'schema-card__difficulty--debutant',
  intermediaire: 'schema-card__difficulty--intermediaire',
  avance: 'schema-card__difficulty--avance'
};

const NIVEAU_CHIP_CLASSES = {
  '5eme': 'schema-modal__niveau-chip--5eme',
  '4eme': 'schema-modal__niveau-chip--4eme',
  '3eme': 'schema-modal__niveau-chip--3eme'
};

function openModal(schema) {
  // Image
  modalImg.src = schema.image;
  modalImg.alt = `Schéma : ${schema.title}`;

  // Titre + difficulté
  modalTitle.textContent = schema.title;
  modalDifficulty.textContent = DIFFICULTY_LABELS[schema.difficulty];
  modalDifficulty.className = 'schema-modal__difficulty-badge ' + (DIFFICULTY_CLASSES[schema.difficulty] || '');

  // Niveaux
  modalNiveaux.innerHTML = schema.niveaux.map(n =>
    `<span class="schema-modal__niveau-chip ${NIVEAU_CHIP_CLASSES[n] || ''}">${n.replace('eme', 'ème')}</span>`
  ).join('');

  // Composants
  modalComponents.innerHTML = schema.composants.map(c =>
    `<li>🔹 ${c}</li>`
  ).join('');

  // Consignes
  modalSteps.innerHTML = schema.consignes.map(s =>
    `<li>${s}</li>`
  ).join('');

  // Afficher avec animation
  modal.classList.add('show', 'entering');
  requestAnimationFrame(() => {
    modal.classList.remove('entering');
  });

  // Bloquer le scroll du body
  document.body.style.overflow = 'hidden';

  // Focus trap basique
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Fermeture : bouton ✕
modalClose.addEventListener('click', closeModal);

// Fermeture : clic sur l'overlay (pas sur le modal lui-même)
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Fermeture : touche Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

// ============================================
// INIT
// ============================================
renderCards();
