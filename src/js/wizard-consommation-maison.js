import { WizardFirebase } from "/src/js/wizard-firebase.js";
import { checkPasswordHash } from "/src/js/wizard-config.js";

const wizardInstance = new WizardFirebase({
  collectionName: "s1_4eme_consommation_maison",
  autoInit: false,
  requiredFields: {
    1: [
      "q2_conso_valeur",
      "q2_conso_unite",
      "q2_montant_ttc",
      "q2_montant_ttc_unite",
      "q2_periode",
      "q2_calcul_kwh",
      "q2_abonnement_explication",
    ],
    2: ["q3_comparaison_nationale", "q3_conseil_poste"],
    3: ["q4_bilan_synthese", "q4_actions_proposees"],
  },
});

window.wizardInstance = wizardInstance;

async function unlockWizard() {
  const passwordInput = document.getElementById("passwordInput");
  const errorMessage = document.getElementById("errorMessage");
  const overlay = document.getElementById("passwordOverlay");

  if (!passwordInput || !errorMessage || !overlay) {
    return;
  }

  if (await checkPasswordHash(passwordInput.value)) {
    errorMessage.hidden = true;
    overlay.style.display = "none";
    wizardInstance.init();
    return;
  }

  errorMessage.hidden = false;
  passwordInput.value = "";
  passwordInput.focus();
}

function bindEvents() {
  const unlockButton = document.getElementById("unlockButton");
  const passwordInput = document.getElementById("passwordInput");

  if (unlockButton) {
    unlockButton.addEventListener("click", unlockWizard);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        unlockWizard();
      }
    });
  }

  document.querySelectorAll("[data-go-phase]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const phase = Number(button.dataset.goPhase);
      if (Number.isFinite(phase) && phase > 0) {
        wizardInstance.goToPhase(phase);
      }
    });
  });

  document.querySelectorAll('[data-action="complete"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      wizardInstance.complete();
    });
  });
}

// Expose global functions for onclick handlers
window.wizardGoToPhase = (phase) => window.wizardInstance?.goToPhase(phase);
window.wizardComplete = () => window.wizardInstance?.complete();

bindEvents();
