/**
 * Wizard Form - TechnoDocs
 * Module réutilisable pour formulaires multi-phases
 *
 * Usage:
 * import { WizardForm } from './wizard-form.js';
 * const wizard = new WizardForm({
 *     storageKey: 'mon_formulaire',
 *     requiredFields: { 1: ['field1', 'field2'], 2: ['field3'] }
 * });
 */

export class WizardForm {
    constructor(options = {}) {
        this.storageKey = options.storageKey || 'wizard_form_data';
        this.autosaveInterval = options.autosaveInterval || 15000;
        this.requiredFields = options.requiredFields || {};
        this.onComplete = options.onComplete || null;

        this.formData = {};
        this.currentPhase = 1;
        this.hasUnsavedChanges = false;
        this.totalPhases = 0;

        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.countPhases();
            this.loadFromStorage();
            this.setupEventListeners();
            this.startAutoSave();
            this.updateProgress();
            this.updatePhaseNavigation();
        });
    }

    countPhases() {
        this.totalPhases = document.querySelectorAll('.wizard__phase').length;
    }

    // ========================
    // Stockage
    // ========================

    saveToStorage() {
        try {
            this.collectFormData();
            this.formData._lastSaved = new Date().toISOString();
            this.formData._currentPhase = this.currentPhase;
            localStorage.setItem(this.storageKey, JSON.stringify(this.formData));
            this.showSaveIndicator('saved');
            this.hasUnsavedChanges = false;
            return true;
        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            this.showToast('Erreur de sauvegarde', 'error');
            return false;
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.formData = JSON.parse(saved);
                if (this.formData._currentPhase) {
                    this.currentPhase = this.formData._currentPhase;
                    this.goToPhase(this.currentPhase, false);
                }
                this.populateForm();
                this.showToast('Données restaurées', 'success');
            }
        } catch (error) {
            console.error('Erreur chargement:', error);
            this.formData = {};
        }
    }

    collectFormData() {
        document.querySelectorAll('[data-field]').forEach(el => {
            const field = el.dataset.field;
            if (el.type === 'checkbox') {
                this.formData[field] = el.checked;
            } else if (el.type === 'radio') {
                if (el.checked) this.formData[field] = el.value;
            } else {
                this.formData[field] = el.value;
            }
        });
    }

    populateForm() {
        document.querySelectorAll('[data-field]').forEach(el => {
            const field = el.dataset.field;
            const value = this.formData[field];
            if (value === undefined) return;

            if (el.type === 'checkbox') {
                el.checked = value;
                this.updateCheckboxStyle(el);
            } else if (el.type === 'radio') {
                el.checked = (el.value === value);
                if (el.checked) this.updateCheckboxStyle(el);
            } else {
                el.value = value;
            }
        });
    }

    updateCheckboxStyle(el) {
        const parent = el.closest('.wizard__checkbox-item');
        if (parent) {
            parent.classList.toggle('checked', el.checked);
        }
    }

    // ========================
    // Auto-sauvegarde
    // ========================

    startAutoSave() {
        setInterval(() => {
            if (this.hasUnsavedChanges) {
                this.showSaveIndicator('saving');
                setTimeout(() => this.saveToStorage(), 500);
            }
        }, this.autosaveInterval);
    }

    showSaveIndicator(state) {
        const indicator = document.getElementById('saveIndicator');
        if (!indicator) return;

        const text = indicator.querySelector('.wizard__save-text');
        indicator.classList.remove('saving', 'saved');

        if (state === 'saving') {
            indicator.classList.add('saving');
            if (text) text.textContent = 'Sauvegarde...';
        } else if (state === 'saved') {
            indicator.classList.add('saved');
            if (text) text.textContent = 'Sauvegardé';
            setTimeout(() => {
                indicator.classList.remove('saved');
                if (text) text.textContent = 'Auto-save';
            }, 2000);
        }
    }

    // ========================
    // Event Listeners
    // ========================

    setupEventListeners() {
        // Champs du formulaire
        document.querySelectorAll('[data-field]').forEach(el => {
            const eventType = (el.type === 'checkbox' || el.type === 'radio') ? 'change' : 'input';
            el.addEventListener(eventType, () => {
                this.hasUnsavedChanges = true;
                this.updateProgress();

                if (el.type === 'checkbox') {
                    this.updateCheckboxStyle(el);
                } else if (el.type === 'radio') {
                    document.querySelectorAll(`input[name="${el.name}"]`).forEach(radio => {
                        this.updateCheckboxStyle(radio);
                    });
                }
            });
        });

        // Boutons de navigation par phase
        document.querySelectorAll('.wizard__nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.goToPhase(parseInt(btn.dataset.phase));
            });
        });

        // Protection fermeture page
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        });

        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveToStorage();
                this.showToast('Sauvegardé', 'success');
            }
            if (e.key === 'Escape') {
                document.querySelectorAll('.wizard__modal-overlay.active').forEach(m => {
                    m.classList.remove('active');
                });
            }
        });
    }

    // ========================
    // Navigation
    // ========================

    goToPhase(phase, save = true) {
        if (save) this.saveToStorage();
        this.currentPhase = phase;

        document.querySelectorAll('.wizard__phase').forEach(s => {
            s.classList.remove('active');
        });

        const target = document.querySelector(`.wizard__phase[data-phase="${phase}"]`);
        if (target) target.classList.add('active');

        this.updatePhaseNavigation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updatePhaseNavigation() {
        document.querySelectorAll('.wizard__nav-btn').forEach(btn => {
            const phase = parseInt(btn.dataset.phase);
            btn.classList.remove('active', 'completed');

            if (phase === this.currentPhase) {
                btn.classList.add('active');
            } else if (this.isPhaseCompleted(phase)) {
                btn.classList.add('completed');
            }
        });
    }

    isPhaseCompleted(phase) {
        const required = this.requiredFields[phase] || [];
        return required.every(f => {
            const value = this.formData[f];
            return value && value.toString().trim() !== '';
        });
    }

    // ========================
    // Progression
    // ========================

    updateProgress() {
        this.collectFormData();

        const allFields = document.querySelectorAll('[data-field]');
        let filled = 0;
        let total = 0;
        const countedRadios = new Set();

        allFields.forEach(el => {
            if (el.type === 'radio') {
                if (!countedRadios.has(el.name)) {
                    countedRadios.add(el.name);
                    total++;
                    const radios = document.querySelectorAll(`input[name="${el.name}"]`);
                    if (Array.from(radios).some(r => r.checked)) filled++;
                }
            } else if (el.type === 'checkbox') {
                if (el.checked) filled++;
                total++;
            } else {
                total++;
                if (el.value && el.value.trim() !== '') filled++;
            }
        });

        const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;

        const percentageEl = document.getElementById('progressPercentage');
        const fillEl = document.getElementById('progressFill');

        if (percentageEl) percentageEl.textContent = `${percentage}%`;
        if (fillEl) fillEl.style.width = `${percentage}%`;

        this.updatePhaseNavigation();
    }

    // ========================
    // Export / Import
    // ========================

    exportJSON() {
        this.saveToStorage();

        const data = {
            ...this.formData,
            _exportDate: new Date().toISOString(),
            _version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const studentName = (this.formData.studentName || 'eleve')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_');
        const date = new Date().toISOString().split('T')[0];

        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.storageKey}_${studentName}_${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Fichier exporté', 'success');
    }

    importJSON(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.formData = JSON.parse(e.target.result);
                if (this.formData._currentPhase) {
                    this.currentPhase = this.formData._currentPhase;
                }
                this.populateForm();
                this.saveToStorage();
                this.updateProgress();
                this.goToPhase(this.currentPhase, false);
                this.showToast('Fichier importé', 'success');
            } catch (error) {
                this.showToast('Fichier invalide', 'error');
            }
        };
        reader.readAsText(file);
    }

    // ========================
    // Reset
    // ========================

    reset() {
        localStorage.removeItem(this.storageKey);
        this.formData = {};

        document.querySelectorAll('[data-field]').forEach(el => {
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.checked = false;
                this.updateCheckboxStyle(el);
            } else {
                el.value = '';
            }
        });

        this.currentPhase = 1;
        this.goToPhase(1, false);
        this.updateProgress();
        this.showToast('Formulaire réinitialisé', 'success');
    }

    // ========================
    // Modales
    // ========================

    showModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    }

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    }

    // ========================
    // Toast
    // ========================

    showToast(message, type = 'success') {
        const toast = document.getElementById('wizardToast');
        if (!toast) return;

        const icon = toast.querySelector('.wizard__toast-icon');
        const text = toast.querySelector('.wizard__toast-message');

        if (icon) icon.textContent = type === 'success' ? '✓' : '✕';
        if (text) text.textContent = message;

        toast.classList.remove('show', 'success', 'error');
        toast.classList.add('show', type);

        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ========================
    // Complétion
    // ========================

    complete() {
        this.saveToStorage();
        if (this.onComplete) {
            this.onComplete(this.formData);
        }
        this.showModal('completionModal');
    }
}

// Fonctions globales pour les onclick dans le HTML
window.wizardGoToPhase = (phase) => {
    if (window.wizardInstance) {
        window.wizardInstance.goToPhase(phase);
    }
};

window.wizardExportJSON = () => {
    if (window.wizardInstance) {
        window.wizardInstance.exportJSON();
    }
};

window.wizardImportJSON = (event) => {
    if (window.wizardInstance && event.target.files[0]) {
        window.wizardInstance.importJSON(event.target.files[0]);
        event.target.value = '';
    }
};

window.wizardReset = () => {
    if (window.wizardInstance) {
        window.wizardInstance.reset();
        window.wizardInstance.closeModal('resetModal');
    }
};

window.wizardShowModal = (id) => {
    if (window.wizardInstance) {
        window.wizardInstance.showModal(id);
    }
};

window.wizardCloseModal = (id) => {
    if (window.wizardInstance) {
        window.wizardInstance.closeModal(id);
    }
};

window.wizardComplete = () => {
    if (window.wizardInstance) {
        window.wizardInstance.complete();
    }
};
