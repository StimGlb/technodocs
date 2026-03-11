import { WizardFirebase } from "/src/js/wizard-firebase.js";
import { CORRECT_PASSWORD } from "/src/js/wizard-config.js";

const wizardInstance = new WizardFirebase({
  collectionName: "s1_3eme_consommation_maison",
  autoInit: false,
  requiredFields: {
    1: [
      "q1_chauffage_source",
      "q1_ecs_source",
      "q1_cuisson_source",
      "q1_eclairage_source",
      "q1_usage_principal",
    ],
    2: [
      "q2_conso_valeur",
      "q2_conso_unite",
      "q2_montant_ht",
      "q2_montant_ht_unite",
      "q2_montant_ttc",
      "q2_montant_ttc_unite",
      "q2_periode",
      "q2_calcul_kwh",
      "q2_abonnement_explication",
    ],
    3: [
      "q3_chauffage_kwh",
      "q3_chauffage_pct",
      "q3_ecs_kwh",
      "q3_ecs_pct",
      "q3_electromenager_kwh",
      "q3_electromenager_pct",
      "q3_eclairage_kwh",
      "q3_eclairage_pct",
      "q3_total_kwh",
      "q3_total_pct",
      "q3_comparaison_nationale",
      "q3_conseil_poste",
    ],
    4: ["q4_bilan_synthese", "q4_actions_proposees"],
  },
});

window.wizardInstance = wizardInstance;

function unlockWizard() {
  const passwordInput = document.getElementById("passwordInput");
  const errorMessage = document.getElementById("errorMessage");
  const overlay = document.getElementById("passwordOverlay");

  if (!passwordInput || !errorMessage || !overlay) {
    return;
  }

  if (passwordInput.value === CORRECT_PASSWORD) {
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

bindEvents();
