/**
 * Quiz OST 5e/4e/3e — TechnoDocs
 * Collection Firestore : quiz_submissions
 * wizard_id : ost-quiz-5e-4e-3e
 *
 * Règle des tentatives (stockée en localStorage) :
 *   - Tentative 1 : score sauvegardé normalement
 *   - Tentative 2 : score × 0,5 sauvegardé (coefficient pénalisant)
 *   - Tentative 3+ : quiz bloqué au démarrage
 */

import {
  db,
  doc,
  setDoc,
  serverTimestamp,
} from '/src/js/services/firebase-config.js';

// ─── Données ──────────────────────────────────────────────────────────────────

const CORRECT_ANSWERS = {
  q1: 'C',
  q2: 'C',
  q3: 'B',
  q4: 'B',
  q5: 'C',
  q6: 'C',
  q7: 'C',
  q8: 'D',
};

// Phase 1 = accueil · Phases 2–9 = questions · Phase 10 = bilan
const QUESTION_PHASE = {
  q1: 2, q2: 3, q3: 4, q4: 5,
  q5: 6, q6: 7, q7: 8, q8: 9,
};
const ATTEMPT_KEY = 'quiz_ost-5e4e3e_attempts';
const MAX_ATTEMPTS = 2;

// ─── État ─────────────────────────────────────────────────────────────────────

const state = {
  answers: {},
  score: 0,
  saved: false,
};

// ─── Tentatives ───────────────────────────────────────────────────────────────

function getAttempts() {
  return parseInt(localStorage.getItem(ATTEMPT_KEY) ?? '0', 10);
}

function incrementAttempts() {
  localStorage.setItem(ATTEMPT_KEY, String(getAttempts() + 1));
}

// ─── Navigation ───────────────────────────────────────────────────────────────

let currentPhase = 1;

function goToPhase(n) {
  document.querySelectorAll('.wizard__phase').forEach((el) => {
    el.classList.remove('active');
  });
  const target = document.querySelector(`.wizard__phase[data-phase="${n}"]`);
  if (target) {
    target.classList.add('active');
    currentPhase = n;
  }
  updateProgressDots(n);

  // Scrolle vers la card question, pas vers le haut de page
  const container = document.querySelector('.wizard__container');
  if (container) {
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '70',
      10,
    );
    const y = container.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }
}

function updateProgressDots(phase) {
  document.querySelectorAll('.wizard__quiz-step').forEach((dot) => {
    const step = parseInt(dot.dataset.step, 10);
    dot.classList.remove('wizard__quiz-step--done', 'wizard__quiz-step--current');
    if (step < phase - 1) {
      dot.classList.add('wizard__quiz-step--done');
    } else if (step === phase - 1) {
      dot.classList.add('wizard__quiz-step--current');
    }
  });
}

// ─── Phase 1 — Accueil ────────────────────────────────────────────────────────

function handleStart() {
  const nameInput = document.getElementById('student-name');
  const classSelect = document.getElementById('student-class');

  if (!nameInput || !nameInput.value.trim()) {
    showToast('Saisis ton prénom et nom avant de commencer.', 'warning');
    nameInput?.focus();
    return;
  }
  if (!classSelect || !classSelect.value) {
    showToast('Sélectionne ta classe avant de commencer.', 'warning');
    classSelect?.focus();
    return;
  }

  const attempts = getAttempts();
  if (attempts >= MAX_ATTEMPTS) {
    showToast('Tu as déjà utilisé tes 2 tentatives pour ce quiz.', 'error');
    return;
  }

  goToPhase(2);
}

// ─── Logique quiz ─────────────────────────────────────────────────────────────

function initQuestion(questionId) {
  const optionsEl = document.querySelector(`.wizard__options[data-question="${questionId}"]`);
  const validateBtn = document.querySelector(`.wizard__validate-btn[data-question="${questionId}"]`);
  if (!optionsEl || !validateBtn) return;

  optionsEl.querySelectorAll('.wizard__option').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;

      optionsEl.querySelectorAll('.wizard__option').forEach((b) => {
        b.classList.remove('wizard__option--selected');
      });
      btn.classList.add('wizard__option--selected');
      state.answers[questionId] = btn.dataset.value;

      validateBtn.disabled = false;
    });
  });

  validateBtn.addEventListener('click', () => validateQuestion(questionId));
}

function validateQuestion(questionId) {
  const phaseNum = QUESTION_PHASE[questionId];
  const optionsEl = document.querySelector(`.wizard__options[data-question="${questionId}"]`);
  const validateBtn = document.querySelector(`.wizard__validate-btn[data-question="${questionId}"]`);
  const feedbackEl = document.querySelector(`.wizard__feedback[data-feedback="${questionId}"]`);
  const phaseEl = document.querySelector(`.wizard__phase[data-phase="${phaseNum}"]`);
  const nextBtn = phaseEl?.querySelector('.wizard__next-btn');

  if (!state.answers[questionId]) return;

  const selected = state.answers[questionId];
  const correct = CORRECT_ANSWERS[questionId];
  const isCorrect = selected === correct;

  if (isCorrect) state.score++;

  optionsEl.querySelectorAll('.wizard__option').forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove('wizard__option--selected');
    if (btn.dataset.value === correct) {
      btn.classList.add('wizard__option--correct');
    } else if (btn.dataset.value === selected && !isCorrect) {
      btn.classList.add('wizard__option--incorrect');
    }
  });

  validateBtn.hidden = true;

  if (feedbackEl) {
    feedbackEl.classList.add('wizard__feedback--visible');
    feedbackEl.classList.add(
      isCorrect ? 'wizard__feedback--correct' : 'wizard__feedback--incorrect',
    );
    feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (nextBtn) nextBtn.hidden = false;

  const dot = document.querySelector(`.wizard__quiz-step[data-step="${phaseNum - 1}"]`);
  if (dot) {
    dot.classList.remove('wizard__quiz-step--current');
    dot.classList.add('wizard__quiz-step--done');
  }
}

// ─── Bilan ────────────────────────────────────────────────────────────────────

function showBilan() {
  const scoreEl = document.getElementById('quiz-score');
  const messageEl = document.getElementById('quiz-message');
  const penaltyEl = document.getElementById('quiz-penalty-notice');

  const attemptNumber = getAttempts() + 1;
  const isSecondAttempt = attemptNumber === 2;
  const savedScore = isSecondAttempt ? state.score * 0.5 : state.score;

  if (scoreEl) scoreEl.textContent = state.score;

  let message;
  if (state.score === 8) {
    message = '🏆 Excellent ! Tu maîtrises les notions sur les objets et systèmes techniques.';
  } else if (state.score >= 6) {
    message = '✅ Très bien ! Quelques notions à consolider — relis la fiche de synthèse.';
  } else if (state.score >= 4) {
    message = "⚠️ Notions à revoir. Reprends la fiche avant d'aller plus loin.";
  } else {
    message = '🔄 À reprendre. Relis attentivement la fiche de synthèse et refais le quiz.';
  }

  if (messageEl) messageEl.textContent = message;

  if (penaltyEl) {
    if (isSecondAttempt) {
      penaltyEl.hidden = false;
      const savedEl = penaltyEl.querySelector('#quiz-saved-score');
      if (savedEl) savedEl.textContent = savedScore;
    } else {
      penaltyEl.hidden = true;
    }
  }

  goToPhase(10);
  saveToFirestore(savedScore, attemptNumber);
}

// ─── Firestore ────────────────────────────────────────────────────────────────

async function saveToFirestore(savedScore, attemptNumber) {
  if (state.saved || !db) {
    if (!db) console.warn('Firestore non disponible — score non sauvegardé.');
    return;
  }
  state.saved = true;

  const nameInput = document.getElementById('student-name');
  const classSelect = document.getElementById('student-class');

  try {
    const docId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const docRef = doc(db, 'quiz_submissions', docId);
    await setDoc(docRef, {
      wizard_id: 'ost-quiz-5e-4e-3e',
      id_eleve: nameInput?.value.trim() ?? '',
      classe: classSelect?.value ?? '',
      score_brut: state.score,
      score: savedScore,
      tentative: attemptNumber,
      date_passage: new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp(),
    });
    incrementAttempts();
    console.log(`✅ Score sauvegardé (tentative ${attemptNumber}, score retenu : ${savedScore})`);
    showToast('Score sauvegardé !', 'success');
  } catch (err) {
    console.error('❌ Erreur Firestore (quiz OST):', err);
    state.saved = false; // Permettre une nouvelle tentative de sauvegarde
    showToast('Erreur lors de la sauvegarde. Vérifie ta connexion.', 'error');
  }
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function showToast(message, type = 'info') {
  const toast = document.getElementById('wizardToast');
  if (!toast) return;
  const icon = toast.querySelector('.wizard__toast-icon');
  const msg = toast.querySelector('.wizard__toast-message');
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  if (icon) icon.textContent = icons[type] ?? icons.info;
  if (msg) msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('quiz-start-btn');
  if (startBtn && getAttempts() >= MAX_ATTEMPTS) {
    startBtn.disabled = true;
    startBtn.textContent = '🚫 Quota de tentatives atteint (2/2)';
  }

  startBtn?.addEventListener('click', handleStart);

  Object.keys(CORRECT_ANSWERS).forEach((qId) => initQuestion(qId));

  document.querySelectorAll('.wizard__next-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.gotoPhase, 10);
      if (target === 10) {
        showBilan();
      } else {
        goToPhase(target);
      }
    });
  });

  document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
    if (getAttempts() >= MAX_ATTEMPTS) {
      showToast('Tu as déjà utilisé tes 2 tentatives pour ce quiz.', 'error');
      return;
    }
    window.location.reload();
  });

  goToPhase(1);
});
