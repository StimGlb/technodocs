// ============================================
// CONFIGURATION FIREBASE
// ============================================
// ⚠️ Adapter collectionName et requiredFields
// ============================================
import { WizardFirebase } from "/src/js/new-wizard-firebase.js";
import { CORRECT_PASSWORD } from "/src/js/wizard-config.js";

window.wizardInstance = new WizardFirebase({
  // Nom unique de la collection Firestore pour ce wizard
  collectionName: "{{COLLECTION_NAME}}",

  // Champs obligatoires par phase (data-field values)
  requiredFields: {
    1: [
      "studentName",
      "studentClass",
      // '{{FIELD_NAME}}',
    ],
    2: [
      // '{{FIELD_NAME}}',
    ],
    3: [
      // '{{FIELD_NAME}}',
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
// OPTIONNEL : ArticleEditor (anti copier-coller)
// Décommenter si des champs doivent être protégés
// ============================================
import("/src/js/article-editor.js").then((module) => {
  window.articleEditor = new module.ArticleEditor({
    protectedFields: [
      // '[data-field="{{FIELD_NAME}}"]',
    ],
    allowPasteFields: [
      // '[data-field="aiPrompt"]',
    ],
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
// LOGIQUE D'ACCÈS PAR MOT DE PASSE
// ============================================
function checkPassword() {
  const passwordInput = document.getElementById("passwordInput");
  const errorMessage = document.getElementById("errorMessage");
  const passwordOverlay = document.getElementById("passwordOverlay");
  const mainContent = document.querySelector("main.wizard");

  if (passwordInput.value === CORRECT_PASSWORD) {
    passwordOverlay.style.display = "none";
    mainContent.style.display = "block";
    errorMessage.style.display = "none";
    window.wizardInstance?.init();
  } else {
    errorMessage.style.display = "block";
    passwordInput.value = "";
  }
}

// ============================================
// EVENT LISTENERS
// ============================================
document
  .getElementById("passwordSubmitBtn")
  .addEventListener("click", checkPassword);
document.getElementById("passwordInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkPassword();
  }
});

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
