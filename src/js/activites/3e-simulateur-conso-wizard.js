// ============================================
// CONFIGURATION FIREBASE
// ============================================
import { WizardFirebase } from "/src/js/new-wizard-firebase.js";

window.wizardInstance = new WizardFirebase({
  collectionName: "wizard_3e_simulateur_conso",

  requiredFields: {
    1: [
      "studentName",
      "studentClass",
      "q1PourcentageChauffage",
      "q2PourcentageEclairage",
      "q3PourcentageVeille",
      "q4PosteMax",
      "q5VeilleSurprise",
      "q6ConsoHiver",
    ],
    2: [
      "q7ConsoInitiale",
      "q8FactureInitiale",
      "q9ScenarioA",
      "q10ScenarioB",
      "q11ScenarioC",
      "q12ScenarioD",
      "q13MeilleurScenario",
      "q14ScenarioPerso",
    ],
    3: [
      "q15PlanAction",
      "q16FacileInvestissement",
      "q17Rentabilite",
      "q18Synthese",
    ],
  },

  onComplete: (data) => {
    console.log("🎉 Formulaire complété:", data);
  },
  onSaveSuccess: () => {
    console.log("✅ Sauvegarde Firestore OK");
  },
  onSaveError: (error) => {
    console.error("❌ Erreur Firestore:", error);
  },
});

// ============================================
// ArticleEditor (anti copier-coller)
// ============================================
import("/src/js/article-editor.js").then((module) => {
  window.articleEditor = new module.ArticleEditor({
    protectedFields: [
      '[data-field="q4PosteMax"]',
      '[data-field="q5VeilleSurprise"]',
      '[data-field="q6ConsoHiver"]',
      '[data-field="q13MeilleurScenario"]',
      '[data-field="q14ScenarioPerso"]',
      '[data-field="q15PlanAction"]',
      '[data-field="q16FacileInvestissement"]',
      '[data-field="q17Rentabilite"]',
      '[data-field="q18Synthese"]',
    ],
    allowPasteFields: [],
    onPasteBlocked: (msg) => window.wizardInstance?.showToast(msg, "warning"),
  });
});

// ============================================
// RÉINITIALISATION SÉCURISÉE
// ============================================
function handleSafeReset() {
  if (typeof wizardExportJSON === "function") {
    wizardExportJSON();
  } else if (window.wizardInstance) {
    window.wizardInstance.exportToJSON();
  }
  window.wizardInstance?.showToast?.(
    "Sauvegarde de secours téléchargée !",
    "success",
  );
  wizardShowModal("resetModal");
}

// ============================================
// EVENT LISTENERS
// ============================================

// Navigation inter-phases (data-goto-phase="N")
document.querySelectorAll("[data-goto-phase]").forEach((btn) => {
  btn.addEventListener("click", () => wizardGoToPhase(+btn.dataset.gotoPhase));
});

document
  .getElementById("wizardCompleteBtn")
  .addEventListener("click", wizardComplete);
document
  .getElementById("wizardExportBtn")
  .addEventListener("click", wizardExportJSON);
document
  .getElementById("wizardImportTriggerBtn")
  .addEventListener("click", () => {
    document.getElementById("importInput").click();
  });
document
  .getElementById("importInput")
  .addEventListener("change", (e) => wizardImportJSON(e));
document
  .getElementById("wizardResetBtn")
  .addEventListener("click", handleSafeReset);
document
  .getElementById("wizardPrintBtn")
  .addEventListener("click", () => window.print());

document
  .getElementById("completionModalClose")
  .addEventListener("click", () => wizardCloseModal("completionModal"));
document
  .getElementById("completionModalExport")
  .addEventListener("click", () => {
    wizardExportJSON();
    wizardCloseModal("completionModal");
  });
document
  .getElementById("resetModalCancel")
  .addEventListener("click", () => wizardCloseModal("resetModal"));
document
  .getElementById("resetModalConfirm")
  .addEventListener("click", wizardReset);
