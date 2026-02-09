/**
 * WizardFirebase - Gestion des formulaires wizard avec Firestore
 * TechnoDocs - SDK Firebase Modulaire v10+
 *
 * Structure Firestore :
 * wizards/{collectionName}/submissions/{uniqueId}
 *   - studentName: string
 *   - studentClass: string
 *   - projectDate: string
 *   - formData: object (toutes les réponses)
 *   - progress: number (0-100)
 *   - completedPhases: array
 *   - isComplete: boolean
 *   - createdAt: timestamp
 *   - updatedAt: timestamp
 */

import {
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "./services/firebase-config.js";

export class WizardFirebase {
  constructor(options = {}) {
    // Configuration
    this.collectionName = options.collectionName || "wizard_submissions";
    // this.autosaveInterval = options.autosaveInterval || 15000; // Supprimé, remplacé par debounce
    this.requiredFields = options.requiredFields || {};
    this.onComplete = options.onComplete || (() => {});
    this.onSaveSuccess = options.onSaveSuccess || (() => {});
    this.onSaveError = options.onSaveError || (() => {});

    // État interne
    this.docId = null;
    this.formData = {};
    this.currentPhase = 1;
    this.completedPhases = [];
    // this.autosaveTimer = null; // Supprimé, remplacé par autosaveTimeout
    this.autosaveTimeout = null; // Pour le debounce
    this.isDirty = false; // Indicateur de modification des données

    // Éléments DOM
    this.fields = document.querySelectorAll("[data-field]");
    this.phases = document.querySelectorAll(".wizard__phase");
    this.navButtons = document.querySelectorAll(".wizard__nav-btn");
    this.progressFill = document.getElementById("progressFill");
    this.progressPercentage = document.getElementById("progressPercentage");
    this.saveIndicator = document.getElementById("saveIndicator");
    // Firestore availability flag (services/firebase-config.js exports `db` or null)
    this.firestoreEnabled = typeof db !== "undefined" && db !== null;

    // Initialisation
    // Internal initialized flag to avoid double-init
    this._initialized = false;

    // autoInit: by default true, but defer init when a password overlay is present
    this.autoInit = options.autoInit !== undefined ? options.autoInit : true;

    if (this.autoInit) {
      if (document.getElementById("passwordOverlay")) {
        console.log(
          "WizardFirebase: init deferred (passwordOverlay detected). Call wizardInstance.init() after unlock.",
        );
      } else {
        this.init();
      }
    }
  }

  async init() {
    if (this._initialized) return;
    this._initialized = true;

    // Générer ou récupérer l'ID unique du document
    this.docId = this.getOrCreateDocId();

    // Afficher la date du jour automatiquement
    this.setTodayDate();

    // Charger les données existantes depuis Firestore (si configuré)
    if (this.firestoreEnabled) {
      await this.loadFromFirestore();
    } else {
      console.warn(
        "Firestore non configuré — fonctionnement en mode local (pas de sauvegarde distante).",
      );
    }

    // Attacher les événements
    this.attachEvents();

    // Démarrer l'autosave (via debounce, plus de timer fixe)
    // this.startAutosave(); // Supprimé

    // Mettre à jour l'affichage
    this.updateProgress();

    console.log("🔥 WizardFirebase initialisé - DocID:", this.docId);
  }

  /**
   * Affiche la date du jour dans le champ projectDate
   */
  setTodayDate() {
    const dateField = document.getElementById("projectDate");
    if (dateField) {
      const today = new Date();
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = today.toLocaleDateString("fr-FR", options);

      // Afficher la date formatée (ex: 03/02/2026)
      dateField.textContent = formattedDate;

      // Stocker au format ISO pour Firestore (ex: 2026-02-03)
      this.formData.projectDate = today.toISOString().split("T")[0];
    }
  }

  /**
   * Génère ou récupère un ID unique pour ce formulaire
   * Inclut une expiration après 1 heure d'inactivité
   */
  getOrCreateDocId() {
    const storageKey = `wizard_${this.collectionName}_session`;
    const sessionData = localStorage.getItem(storageKey);
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    // Tenter de récupérer l'ancienne clé simple (migration/compatibilité)
    const oldDocId = localStorage.getItem(
      `wizard_${this.collectionName}_docId`,
    );

    if (sessionData) {
      try {
        const { docId, timestamp } = JSON.parse(sessionData);
        // Si la session date de moins d'une heure, on la conserve
        if (now - timestamp < ONE_HOUR) {
          return docId;
        }
      } catch (e) {
        console.error("Erreur session localStorage:", e);
      }
    } else if (oldDocId) {
      // Si on a l'ancien format, on le convertit et on l'utilise
      this.updateSessionTimestamp(oldDocId);
      localStorage.removeItem(`wizard_${this.collectionName}_docId`);
      return oldDocId;
    }

    // Sinon, on crée une nouvelle session
    const newDocId = `${now}_${Math.random().toString(36).substr(2, 9)}`;
    this.updateSessionTimestamp(newDocId);
    return newDocId;
  }

  /**
   * Met à jour le timestamp de la session dans localStorage
   */
  updateSessionTimestamp(docId) {
    const storageKey = `wizard_${this.collectionName}_session`;
    const session = {
      docId: docId || this.docId,
      timestamp: Date.now(),
    };
    localStorage.setItem(storageKey, JSON.stringify(session));
  }

  /**
   * Charge les données depuis Firestore
   */
  async loadFromFirestore() {
    if (!this.firestoreEnabled) return;

    try {
      const docRef = doc(db, this.collectionName, this.docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.formData = data.formData || {};
        this.completedPhases = data.completedPhases || [];

        // Restaurer les valeurs dans les champs
        this.restoreFieldValues();

        this.showToast("📂 Données chargées", "success");
        console.log("✅ Données chargées depuis Firestore");
      } else {
        console.log("📝 Nouveau formulaire - aucune donnée existante");
      }
    } catch (error) {
      console.error("❌ Erreur chargement Firestore:", error);
      this.showToast("Erreur de chargement", "error");
    }
  }

  /**
   * Sauvegarde les données dans Firestore
   */
  async saveToFirestore() {
    if (!this.firestoreEnabled) {
      console.warn("saveToFirestore ignoré : Firestore non configuré.");
      return;
    }

    // Vérifier si des modifications ont été apportées
    if (!this.isDirty) {
      console.log("Pas de modifications à sauvegarder.");
      return;
    }

    this.showSaveIndicator("saving");

    try {
      const docRef = doc(db, this.collectionName, this.docId);

      // Collecter toutes les données actuelles
      this.collectAllFields();

      const saveData = {
        studentName: this.formData.studentName || "",
        studentClass: this.formData.studentClass || "",
        projectDate: this.formData.projectDate || "",
        formData: this.formData,
        progress: this.calculateProgress(),
        completedPhases: this.completedPhases,
        isComplete: this.isFormComplete(),
        updatedAt: serverTimestamp(),
      };

      // Vérifier si le document existe
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Mise à jour
        await updateDoc(docRef, saveData);
      } else {
        // Création avec timestamp de création
        saveData.createdAt = serverTimestamp();
        await setDoc(docRef, saveData);
      }

      this.isDirty = false; // Réinitialiser l'indicateur après une sauvegarde réussie
      this.updateSessionTimestamp(); // Prolonger la session locale
      this.showSaveIndicator("saved");
      this.onSaveSuccess(saveData);

      console.log("✅ Sauvegardé dans Firestore");
    } catch (error) {
      console.error("❌ Erreur sauvegarde Firestore:", error);
      this.showSaveIndicator("error");
      this.onSaveError(error);
      this.showToast("Erreur de sauvegarde", "error");
    }
  }

  /**
   * Collecte les valeurs de tous les champs
   */
  collectAllFields() {
    this.fields.forEach((field) => {
      const fieldName = field.dataset.field;

      // Ignorer le champ date (géré par setTodayDate)
      if (fieldName === "projectDate") return;

      if (field.type === "checkbox") {
        this.formData[fieldName] = field.checked;
      } else if (field.type === "radio") {
        if (field.checked) {
          this.formData[fieldName] = field.value;
        }
      } else {
        this.formData[fieldName] = field.value;
      }
    });
  }

  /**
   * Restaure les valeurs dans les champs DOM
   */
  restoreFieldValues() {
    this.fields.forEach((field) => {
      const fieldName = field.dataset.field;
      const value = this.formData[fieldName];

      if (value === undefined) return;

      // Ignorer le champ date (lecture seule)
      if (fieldName === "projectDate") return;

      if (field.type === "checkbox") {
        field.checked = value === true;
      } else if (field.type === "radio") {
        field.checked = field.value === value;
      } else {
        field.value = value;
      }
    });
  }

  /**
   * Attache les événements aux champs
   */
  attachEvents() {
    // Événements sur les champs
    this.fields.forEach((field) => {
      // Ignorer le champ date (lecture seule)
      if (field.dataset.field === "projectDate") return;

      const eventType =
        field.type === "checkbox" || field.type === "radio"
          ? "change"
          : "input";

      field.addEventListener(eventType, () => {
        this.isDirty = true; // Marquer les données comme modifiées
        this.updateProgress();
        this.scheduleAutosave(); // Planifier une sauvegarde après un délai
      });
    });

    // Événements sur les boutons de navigation
    this.navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const phase = parseInt(btn.dataset.phase);
        this.goToPhase(phase);
      });
    });

    // Sauvegarde avant fermeture de page
    window.addEventListener("beforeunload", (e) => {
      if (this.isDirty) {
        // Effectuer une sauvegarde synchrone ou bloquante si possible,
        // mais les navigateurs limitent cela. Le debounce aide à minimiser la perte.
        this.saveToFirestore(); // Appel direct pour tenter une dernière sauvegarde
        e.preventDefault();
        e.returnValue = ""; // Message standard pour confirmer la fermeture
      }
    });
  }

  /**
   * Planifie une sauvegarde automatique avec un debounce de 5 secondes.
   * Annule toute sauvegarde précédemment planifiée.
   */
  scheduleAutosave() {
    if (this.autosaveTimeout) {
      clearTimeout(this.autosaveTimeout);
    }
    this.autosaveTimeout = setTimeout(() => {
      this.saveToFirestore();
    }, 5000); // Sauvegarde après 5 secondes d'inactivité
  }

  // /**
  //  * Démarre l'autosave périodique (Supprimé, remplacé par scheduleAutosave)
  //  */
  // startAutosave() {
  //   if (this.autosaveTimer) {
  //     clearInterval(this.autosaveTimer);
  //   }
  //   this.autosaveTimer = setInterval(() => {
  //     this.saveToFirestore();
  //   }, this.autosaveInterval);
  // }

  /**
   * Navigation vers une phase
   */
  async goToPhase(phaseNumber) {
    // Sauvegarder immédiatement avant de changer de phase (sauvegarde de sécurité)
    await this.saveToFirestore();

    // Masquer toutes les phases
    this.phases.forEach((phase) => phase.classList.remove("active"));

    // Afficher la phase demandée
    const targetPhase = document.querySelector(
      `.wizard__phase[data-phase="${phaseNumber}"]`,
    );
    if (targetPhase) {
      targetPhase.classList.add("active");
      this.currentPhase = phaseNumber;
    }

    // Mettre à jour la navigation
    this.navButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (parseInt(btn.dataset.phase) === phaseNumber) {
        btn.classList.add("active");
      }
    });

    // Scroll en haut
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Calcule le pourcentage de progression
   */
  calculateProgress() {
    let filledFields = 0;
    let totalFields = 0;
    const countedRadios = new Set();

    this.fields.forEach((field) => {
      // Ignorer les champs dans les infos élève pour le calcul
      if (
        ["studentName", "studentClass", "projectDate"].includes(
          field.dataset.field,
        )
      ) {
        return;
      }

      if (field.type === "radio") {
        // Grouper les radios par name (un seul compte par groupe)
        if (!countedRadios.has(field.name)) {
          countedRadios.add(field.name);
          totalFields++;
          const checked = document.querySelector(
            `input[name="${field.name}"]:checked`,
          );
          if (checked) filledFields++;
        }
      } else if (field.type === "checkbox") {
        // Les checkboxes sont optionnelles, on les ignore dans le calcul
        // (elles ne bloquent pas la progression à 100%)
        return;
      } else {
        totalFields++;
        if (field.value && field.value.trim() !== "") {
          filledFields++;
        }
      }
    });

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  }

  /**
   * Met à jour l'affichage de la progression
   */
  updateProgress() {
    const progress = this.calculateProgress();

    if (this.progressFill) {
      this.progressFill.style.width = `${progress}%`;
    }

    if (this.progressPercentage) {
      this.progressPercentage.textContent = `${progress}%`;
    }

    // Mettre à jour les indicateurs de phases complétées
    this.updatePhaseIndicators();
  }

  /**
   * Met à jour les indicateurs visuels des phases
   */
  updatePhaseIndicators() {
    this.navButtons.forEach((btn) => {
      const phase = parseInt(btn.dataset.phase);
      const required = this.requiredFields[phase] || [];

      let isPhaseComplete = true;

      required.forEach((fieldName) => {
        const field = document.querySelector(`[data-field="${fieldName}"]`);
        if (!field) return;

        if (field.type === "checkbox" || field.type === "radio") {
          // Pour radio, vérifier si au moins un est coché dans le groupe
          if (field.type === "radio") {
            const groupName = field.name;
            const checked = document.querySelector(
              `input[name="${groupName}"]:checked`,
            );
            if (!checked) isPhaseComplete = false;
          } else {
            if (!field.checked) isPhaseComplete = false;
          }
        } else {
          if (!field.value || field.value.trim() === "") {
            isPhaseComplete = false;
          }
        }
      });

      // Ajouter/retirer la classe completed
      if (isPhaseComplete && required.length > 0) {
        btn.classList.add("completed");
        if (!this.completedPhases.includes(phase)) {
          this.completedPhases.push(phase);
        }
      } else {
        btn.classList.remove("completed");
        this.completedPhases = this.completedPhases.filter((p) => p !== phase);
      }
    });
  }

  /**
   * Vérifie si le formulaire est complet
   */
  isFormComplete() {
    const totalPhases = Object.keys(this.requiredFields).length;
    return this.completedPhases.length >= totalPhases;
  }

  /**
   * Affiche l'indicateur de sauvegarde
   */
  showSaveIndicator(status) {
    if (!this.saveIndicator) return;

    const dot = this.saveIndicator.querySelector(".wizard__save-dot");
    const text = this.saveIndicator.querySelector(".wizard__save-text");

    this.saveIndicator.className = "wizard__save-indicator";

    switch (status) {
      case "saving":
        this.saveIndicator.classList.add("saving");
        if (text) text.textContent = "Sauvegarde...";
        break;
      case "saved":
        this.saveIndicator.classList.add("saved");
        if (text) text.textContent = "Sauvegardé ✓";
        setTimeout(() => {
          if (text) text.textContent = "Auto-save";
          this.saveIndicator.classList.remove("saved");
        }, 2000);
        break;
      case "error":
        this.saveIndicator.classList.add("error");
        if (text) text.textContent = "Erreur !";
        break;
    }
  }

  /**
   * Affiche un toast de notification
   */
  showToast(message, type = "info") {
    const toast = document.getElementById("wizardToast");
    if (!toast) return;

    const icon = toast.querySelector(".wizard__toast-icon");
    const msg = toast.querySelector(".wizard__toast-message");

    const icons = {
      success: "✅",
      error: "❌",
      info: "ℹ️",
      warning: "⚠️",
    };

    if (icon) icon.textContent = icons[type] || icons.info;
    if (msg) msg.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  /**
   * Termine le formulaire
   */
  async complete() {
    // Sauvegarder immédiatement avant de marquer comme complet (sauvegarde de sécurité)
    await this.saveToFirestore();

    if (this.isFormComplete()) {
      this.onComplete(this.formData);
      this.showModal("completionModal");
    } else {
      this.showToast("Certains champs obligatoires sont vides", "warning");
    }
  }

  /**
   * Réinitialise le formulaire
   */
  async reset() {
    try {
      // On conserve les données existantes dans Firestore par sécurité.
      // On supprime uniquement l'ID local pour repartir sur un nouveau document.

      // Supprimer l'ancienne session
      localStorage.removeItem(`wizard_${this.collectionName}_session`);
      localStorage.removeItem(`wizard_${this.collectionName}_docId`);

      // Réinitialiser l'état
      this.formData = {};
      this.completedPhases = [];
      this.isDirty = false; // Réinitialiser l'indicateur dirty
      if (this.autosaveTimeout) {
        clearTimeout(this.autosaveTimeout); // Annuler tout debounce en cours
        this.autosaveTimeout = null;
      }

      // Vider les champs
      this.fields.forEach((field) => {
        // Ignorer le champ date
        if (field.dataset.field === "projectDate") return;

        if (field.type === "checkbox" || field.type === "radio") {
          field.checked = false;
        } else {
          field.value = "";
        }
      });

      // Générer un nouvel ID et créer une nouvelle session
      this.docId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.updateSessionTimestamp(this.docId);

      // Réinitialiser la date du jour
      this.setTodayDate();

      // Retourner à la phase 1
      this.goToPhase(1);
      this.updateProgress();

      this.closeModal("resetModal");
      this.showToast("Formulaire réinitialisé", "success");
    } catch (error) {
      console.error("❌ Erreur reset:", error);
      this.showToast("Erreur lors de la réinitialisation", "error");
    }
  }

  /**
   * Exporte les données en JSON
   */
  exportJSON() {
    this.collectAllFields();

    const exportData = {
      docId: this.docId,
      studentName: this.formData.studentName,
      studentClass: this.formData.studentClass,
      projectDate: this.formData.projectDate,
      formData: this.formData,
      progress: this.calculateProgress(),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wizard_${this.formData.studentName || "export"}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.showToast("Fichier exporté !", "success");
  }

  /**
   * Alias compatible (quelques pages appellent exportToJSON)
   */
  exportToJSON() {
    return this.exportJSON();
  }

  /**
   * Importe des données depuis un fichier JSON
   */
  async importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.formData) {
        this.formData = data.formData;
        this.restoreFieldValues();
        this.isDirty = true; // Marquer comme dirty après import pour forcer une sauvegarde
        await this.saveToFirestore();
        this.updateProgress();
        this.showToast("Données importées !", "success");
      }
    } catch (error) {
      console.error("❌ Erreur import:", error);
      this.showToast("Fichier invalide", "error");
    }

    // Reset l'input file
    event.target.value = "";
  }

  /**
   * Affiche une modale
   */
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("show");
  }

  /**
   * Ferme une modale
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("show");
  }
}

// Fonctions globales pour les onclick dans le HTML
window.wizardGoToPhase = (phase) => window.wizardInstance?.goToPhase(phase);
window.wizardComplete = () => window.wizardInstance?.complete();
window.wizardReset = () => window.wizardInstance?.reset();
window.wizardExportJSON = () => window.wizardInstance?.exportJSON();
window.wizardImportJSON = (e) => window.wizardInstance?.importJSON(e);
window.wizardShowModal = (id) => window.wizardInstance?.showModal(id);
window.wizardCloseModal = (id) => window.wizardInstance?.closeModal(id);
