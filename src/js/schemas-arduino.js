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
    id: 'led-simple',
    title: 'Allumer une LED',
    description:
      'Circuit de base : une LED avec sa résistance de protection, pilotée par une sortie numérique.',
    image: '/src/assets/schemas-arduino/led-double.png',
    difficulty: 'debutant', // debutant | intermediaire | avance
    niveaux: ['5eme', '4eme'], // niveaux concernés
    composants: [
      '1× Arduino Uno',
      '1× Breadboard',
      '1× LED (rouge)',
      '1× LED (verte)',
      '1× Résistance 220Ω',
      '2× Fils de connexion',
    ],
    consignes: [
      "Place l'Arduino et la breadboard côte à côte sur le plan de travail Tinkercad.",
      'Insère la LED sur la breadboard : la patte longue (anode +) sur une ligne, la patte courte (cathode −) sur la ligne voisine.',
      'Branche la résistance de 220Ω entre la patte longue (anode) de la LED et une ligne libre.',
      "Relie la ligne de la résistance à la broche 12 de l'Arduino avec un fil.",
      'Relie le LED verte de la même manière : patte longue à une ligne, patte courte à la ligne GND, puis résistance 220Ω entre la patte longue et la broche 11.',
      'Relie la patte courte (cathode) de la LED à la ligne GND (−) de la breadboard.',
      "Connecte la ligne GND de la breadboard à une broche GND de l'Arduino.",
      "Lance la simulation et vérifie que la LED s'allume.",
    ],
  },
  {
    id: 'bouton-led',
    title: 'Bouton-poussoir + LED',
    description:
      "Lecture d'un bouton-poussoir en entrée numérique pour commander l'allumage d'une LED.",
    image: '/src/assets/schemas-arduino/bouton-led.png',
    difficulty: 'debutant',
    niveaux: ['5eme', '4eme'],
    composants: [
      '1× Arduino Uno',
      '1× Breadboard',
      '1× LED',
      '1× Résistance 220Ω (LED)',
      '1× Résistance 10kΩ (pull-down)',
      '1× Bouton-poussoir',
      '5× Fils de connexion',
    ],
    consignes: [
      "Ajoute une LED à la broche 7 de l'Arduino avec une résistance de 220Ω en série (comme dans le schéma précédent).",
      'Place le bouton-poussoir en haut à gauche.',
      "Branche une patte du bouton au +5V de l'Arduino.",
      "Branche l'autre patte du même côté à la broche 8 de l'Arduino (entrée numérique).",
      "Ajoute la résistance pull-down de 10kΩ entre l'autre patte du bouton et GND.",
      'Programme : si lire la broche 8 = 1 → allumer LED, sinon → éteindre.',
      'Lance la simulation et appuie sur le bouton pour tester.',
    ],
  },
  {
    id: 'pir-led',
    title: 'Capteur de présence PIR + LED',
    description:
      'Détection de mouvement avec un capteur PIR : allumer une LED automatiquement quand une présence est détectée.',
    image: '/src/assets/schemas-arduino/pir-led.png',
    difficulty: 'intermediaire',
    niveaux: ['4eme', '3eme'],
    composants: [
      '1× Arduino Uno',
      '1× Capteur de présence PIR',
      '1× LED (bleue)',
      '1× Résistance 220Ω',
      '5× Fils de connexion',
    ],
    consignes: [
      'Place le capteur PIR sur le plan de travail, face plate (dôme) orientée vers la zone à surveiller.',
      "Relie la broche VCC (rouge) du PIR à la broche 5V de l'Arduino.",
      "Relie la broche GND (blanc) du PIR à une broche GND de l'Arduino.",
      "Relie la broche Signal (vert) du PIR à la broche numérique 2 de l'Arduino.",
      "Insère la LED : la patte longue (anode +) reliée à une résistance de 220Ω, puis à la broche numérique 3 de l'Arduino. La patte courte (cathode −) reliée au GND.",
      "Programme : lire digitalRead(2) — si HIGH (mouvement détecté), allumer la LED sur la broche 3, sinon l'éteindre.",
      "Lance la simulation. Le capteur PIR a un délai de calibration d'environ 30 secondes au démarrage — attends avant de tester.",
    ],
  },
    {
    id: 'ldr-led-rgb',
    title: 'Éclairage adaptatif (LDR + LED RGB)',
    description:
      'Éclairage ambiant automatique : la couleur et l\'intensité de la LED RGB s\'adaptent à la luminosité captée par la photorésistance.',
    image: '/src/assets/schemas-arduino/ldr-led-rgb.png',
    difficulty: 'avance',
    niveaux: ['3eme'],
    composants: [
      '1× Arduino Uno',
      '1× Breadboard',
      '1× Photorésistance (LDR)',
      '1× Résistance 10kΩ (diviseur de tension LDR)',
      '1× LED RGB (cathode commune)',
      '3× Résistance 220Ω (une par couleur R, G, B)',
      'Fils de connexion',
    ],
    consignes: [
      'Place la photorésistance (LDR) sur la breadboard. Branche une patte au +5V.',
      "Branche l'autre patte de la LDR à l'entrée analogique A0 de l'Arduino ET à une résistance de 10kΩ reliée au GND (diviseur de tension).",
      'Place la LED RGB sur la breadboard. Identifie la patte la plus longue : c\'est la cathode commune (GND).',
      "Relie la cathode commune au GND de l'Arduino.",
      'Branche chaque patte couleur via une résistance de 220Ω : Rouge → broche 9 (PWM), Vert → broche 10 (PWM), Bleu → broche 11 (PWM).',
      "Programme : lis analogRead(A0) pour obtenir le niveau de luminosité (0–1023). Utilise map() pour convertir en intensité PWM (0–255).",
      'Définis des seuils : forte luminosité → LED éteinte ou blanc froid (R+G+B bas), luminosité moyenne → blanc chaud (R fort, G moyen, B faible), obscurité → veilleuse bleue douce.',
      'Utilise analogWrite() sur les broches 9, 10, 11 pour mixer les couleurs.',
      'Lance la simulation et fais varier la luminosité sur la LDR pour voir la LED changer de couleur.',
    ],
    code: `// ============================================
// ÉCLAIRAGE ADAPTATIF — Arduino Uno
// Photorésistance (LDR) + LED RGB
// TechnoDocs — Domotique & Systèmes embarqués
// ============================================

// --- Broches LED RGB (PWM obligatoire) ---
const int BROCHE_ROUGE = 9;
const int BROCHE_VERT  = 10;
const int BROCHE_BLEU  = 11;

// --- Broche capteur LDR ---
const int BROCHE_LDR = A0;

// --- Seuils de luminosité (à calibrer selon ta LDR) ---
const int SEUIL_JOUR = 700;    // au-dessus → forte luminosité
const int SEUIL_MOYEN = 400;   // entre moyen et jour → mi-ombre
                                 // en dessous → obscurité

void setup() {
  pinMode(BROCHE_ROUGE, OUTPUT);
  pinMode(BROCHE_VERT, OUTPUT);
  pinMode(BROCHE_BLEU, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  int luminosite = analogRead(BROCHE_LDR);

  Serial.print("LDR : ");
  Serial.println(luminosite);

  if (luminosite > SEUIL_JOUR) {
    // --- Forte luminosité → LED éteinte (économie) ---
    allumerRGB(0, 0, 0);

  } else if (luminosite > SEUIL_MOYEN) {
    // --- Luminosité moyenne → blanc chaud ---
    int intensite = map(luminosite, SEUIL_MOYEN, SEUIL_JOUR, 200, 20);
    allumerRGB(intensite, intensite / 2, intensite / 5);

  } else {
    // --- Obscurité → veilleuse bleue douce ---
    int intensite = map(luminosite, 0, SEUIL_MOYEN, 150, 30);
    allumerRGB(0, 0, intensite);
  }

  delay(200);
}

// Fonction utilitaire pour allumer la LED RGB
void allumerRGB(int rouge, int vert, int bleu) {
  analogWrite(BROCHE_ROUGE, constrain(rouge, 0, 255));
  analogWrite(BROCHE_VERT,  constrain(vert, 0, 255));
  analogWrite(BROCHE_BLEU,  constrain(bleu, 0, 255));
}`,
  },
  {
    id: 'digicode-serrure',
    title: 'Serrure à digicode',
    description:
      "Système de contrôle d'accès domotique : saisie d'un code sur clavier matriciel, affichage LCD et déverrouillage par servomoteur.",
    image: '/src/assets/schemas-arduino/digicode-serrure.png',
    difficulty: 'avance',
    niveaux: ['3eme'],
    composants: [
      '1× Arduino Uno',
      '1× Breadboard',
      '1× Clavier matriciel 4×4 (membrane, 8 broches)',
      '1× Écran LCD 16×2 avec module I2C',
      '1× Servomoteur SG90',
      'Fils de connexion',
    ],
    consignes: [
      // --- LCD I2C (4 fils) ---
      'Branche le LCD I2C : GND → GND Arduino, VCC → 5V Arduino, SDA → broche A4, SCL → broche A5.',

      // --- Servomoteur (3 fils) ---
      'Branche le servomoteur : fil rouge → 5V, fil marron/noir → GND, fil orange → broche 9 (PWM).',

      // --- Clavier 4×4 (8 fils) ---
      'Repère les 8 broches du clavier (de gauche à droite, nappe face à toi) : les 4 premières sont les LIGNES (R1–R4), les 4 suivantes sont les COLONNES (C1–C4).',
      'Branche les 4 lignes du clavier : R1 → broche 8, R2 → broche 7, R3 → broche 6, R4 → broche 5.',
      'Branche les 4 colonnes du clavier : C1 → broche 4, C2 → broche 3, C3 → broche 2, C4 → broche A0.',

      // --- Vérification ---
      "Vérifie qu'aucun fil ne se croise ou ne touche un voisin sur la breadboard.",

      // --- Programmation ---
      'Programme : utilise les bibliothèques Keypad.h, LiquidCrystal_I2C.h et Servo.h. Définis un code secret (ex: 1234 pour tester). À chaque touche pressée, affiche une étoile * sur le LCD. Si le code est correct, affiche « Accès OK » et tourne le servo à 90°. Sinon, affiche « Code faux » et garde le servo à 0°.',

      'Lance la simulation et teste avec le bon et le mauvais code.',
    ],
    code: `// ============================================
    // SERRURE À DIGICODE — Arduino Uno
    // Clavier 4x4 + LCD I2C + Servomoteur
    // TechnoDocs — Domotique & Systèmes embarqués
    // ============================================

    #include <Keypad.h>
    #include <LiquidCrystal_I2C.h>
    #include <Servo.h>

    // --- Configuration du clavier 4x4 ---
    const byte LIGNES = 4;
    const byte COLONNES = 4;

    char touches[LIGNES][COLONNES] = {
      {'1', '2', '3', 'A'},
      {'4', '5', '6', 'B'},
      {'7', '8', '9', 'C'},
      {'*', '0', '#', 'D'}
    };

    byte brochesFils[LIGNES] = {8, 7, 6, 5};
    byte brochesColonnes[COLONNES] = {4, 3, 2, A0};

    Keypad clavier = Keypad(makeKeymap(touches), brochesFils, brochesColonnes, LIGNES, COLONNES);

    // --- Configuration LCD I2C (adresse 0x27 standard) ---
    LiquidCrystal_I2C lcd(0x27, 16, 2);

    // --- Configuration Servo ---
    Servo verrou;
    const int BROCHE_SERVO = 9;
    const int ANGLE_FERME = 0;
    const int ANGLE_OUVERT = 90;

    // --- Code secret ---
    const char CODE_SECRET[] = "1234";
    const int LONGUEUR_CODE = 4;

    // --- Variables ---
    char codeSaisi[5];
    int position = 0;
    bool porteOuverte = false;

    // --- Temporisation ---
    unsigned long tempoDebut = 0;
    const unsigned long DUREE_MESSAGE = 3000;
    bool enAttente = false;

    void setup() {
      lcd.init();
      lcd.backlight();
      verrou.attach(BROCHE_SERVO);
      verrou.write(ANGLE_FERME);
      afficherAccueil();
    }

    void loop() {
      if (enAttente) {
        if (millis() - tempoDebut >= DUREE_MESSAGE) {
          enAttente = false;
          if (porteOuverte) {
            verrou.write(ANGLE_FERME);
            porteOuverte = false;
          }
          reinitialiserSaisie();
          afficherAccueil();
        }
        return;
      }

      char touche = clavier.getKey();

      if (touche) {
        if (touche == '*') {
          reinitialiserSaisie();
          afficherAccueil();
          return;
        }

        if (touche == '#' || touche == 'A' || touche == 'B' ||
            touche == 'C' || touche == 'D') {
          return;
        }

        codeSaisi[position] = touche;
        position++;

        lcd.setCursor(position - 1, 1);
        lcd.print('*');

        if (position == LONGUEUR_CODE) {
          codeSaisi[position] = '\\0';
          verifierCode();
        }
      }
    }

    void afficherAccueil() {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Tapez le code :");
      lcd.setCursor(0, 1);
      lcd.print("                ");
      lcd.setCursor(0, 1);
    }

    void verifierCode() {
      if (strcmp(codeSaisi, CODE_SECRET) == 0) {
        lcd.clear();
        lcd.setCursor(2, 0);
        lcd.print("Acces OK !");
        lcd.setCursor(1, 1);
        lcd.print("Porte ouverte");
        verrou.write(ANGLE_OUVERT);
        porteOuverte = true;
      } else {
        lcd.clear();
        lcd.setCursor(2, 0);
        lcd.print("Code faux !");
        lcd.setCursor(1, 1);
        lcd.print("Reessayez...");
      }
      tempoDebut = millis();
      enAttente = true;
    }

    void reinitialiserSaisie() {
      position = 0;
      codeSaisi[0] = '\\0';
    }`,
  },
];

// ============================================
// RENDU DES CARDS
// ============================================
const grid = document.getElementById('schemasGrid');

const DIFFICULTY_LABELS = {
  debutant: '🟢 Débutant',
  intermediaire: '🟡 Intermédiaire',
  avance: '🔴 Avancé',
};

function renderCards(filter = 'all') {
  grid.innerHTML = '';

  const filtered = filter === 'all' ? SCHEMAS : SCHEMAS.filter((s) => s.niveaux.includes(filter));

  if (filtered.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center;color:var(--color-gray-400);grid-column:1/-1;padding:2rem;">Aucun schéma pour ce niveau.</p>';
    return;
  }

  filtered.forEach((schema) => {
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
          ${schema.niveaux.map((n) => `<span class="schema-card__tag">${n.replace('eme', 'ème')}</span>`).join('')}
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
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
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
const modalTabCode = document.getElementById('modalTabCode');
const panelConsignes = document.getElementById('panelConsignes');
const panelCode = document.getElementById('panelCode');
const modalCodeBlock = document.getElementById('modalCodeBlock');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const modalTabs = document.getElementById('modalTabs');

const DIFFICULTY_CLASSES = {
  debutant: 'schema-card__difficulty--debutant',
  intermediaire: 'schema-card__difficulty--intermediaire',
  avance: 'schema-card__difficulty--avance',
};

const NIVEAU_CHIP_CLASSES = {
  '5eme': 'schema-modal__niveau-chip--5eme',
  '4eme': 'schema-modal__niveau-chip--4eme',
  '3eme': 'schema-modal__niveau-chip--3eme',
};

// Gestion des onglets
modalTabs.addEventListener('click', (e) => {
  const tabBtn = e.target.closest('.schema-modal__tab');
  if (!tabBtn) return;

  const tabName = tabBtn.dataset.tab;

  // Activer le bon onglet
  modalTabs.querySelectorAll('.schema-modal__tab').forEach((t) => t.classList.remove('active'));
  tabBtn.classList.add('active');

  // Afficher le bon panel
  document
    .querySelectorAll('.schema-modal__tab-panel')
    .forEach((p) => p.classList.remove('active'));
  document.querySelector(`[data-tab-panel="${tabName}"]`).classList.add('active');
});

// Bouton copier le code
copyCodeBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(modalCodeBlock.textContent);
    copyCodeBtn.innerHTML = '✅ Copié !';
    copyCodeBtn.classList.add('copied');
    setTimeout(() => {
      copyCodeBtn.innerHTML = '📋 Copier le code';
      copyCodeBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    // Fallback pour les navigateurs sans Clipboard API
    const range = document.createRange();
    range.selectNodeContents(modalCodeBlock);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    copyCodeBtn.innerHTML = '✅ Copié !';
    copyCodeBtn.classList.add('copied');
    setTimeout(() => {
      copyCodeBtn.innerHTML = '📋 Copier le code';
      copyCodeBtn.classList.remove('copied');
    }, 2000);
  }
});

function openModal(schema) {
  // Image
  modalImg.src = schema.image;
  modalImg.alt = `Schéma : ${schema.title}`;

  // Titre + difficulté
  modalTitle.textContent = schema.title;
  modalDifficulty.textContent = DIFFICULTY_LABELS[schema.difficulty];
  modalDifficulty.className =
    'schema-modal__difficulty-badge ' + (DIFFICULTY_CLASSES[schema.difficulty] || '');

  // Niveaux
  modalNiveaux.innerHTML = schema.niveaux
    .map(
      (n) =>
        `<span class="schema-modal__niveau-chip ${NIVEAU_CHIP_CLASSES[n] || ''}">${n.replace('eme', 'ème')}</span>`,
    )
    .join('');

  // Composants
  modalComponents.innerHTML = schema.composants.map((c) => `<li>🔹 ${c}</li>`).join('');

  // Consignes
  modalSteps.innerHTML = schema.consignes.map((s) => `<li>${s}</li>`).join('');

  // Onglet Code : afficher/masquer selon la présence de code
  if (schema.code) {
    modalTabCode.style.display = '';
    modalCodeBlock.textContent = schema.code;
  } else {
    modalTabCode.style.display = 'none';
  }

  // Reset : toujours revenir à l'onglet Consignes à l'ouverture
  modalTabs.querySelectorAll('.schema-modal__tab').forEach((t) => t.classList.remove('active'));
  modalTabs.querySelector('[data-tab="consignes"]').classList.add('active');
  document
    .querySelectorAll('.schema-modal__tab-panel')
    .forEach((p) => p.classList.remove('active'));
  panelConsignes.classList.add('active');

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
