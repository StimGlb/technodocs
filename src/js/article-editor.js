/**
 * Article Editor Enhancements
 * - Anti-copier/coller pédagogique
 * - Spellcheck natif activé
 * 
 * @module article-editor
 */

export class ArticleEditor {
    constructor(options = {}) {
        this.options = {
            // Sélecteurs des champs à protéger
            protectedFields: ['[data-field="articleText"]', '[data-field="articleTitle"]'],
            // Callback pour afficher les messages
            onPasteBlocked: null,
            // Activer le logging des tentatives
            logAttempts: true,
            ...options
        };

        this.pasteAttempts = [];
        this.init();
    }

    init() {
        this.setupAntiPaste();
        this.setupSpellcheck();
        console.log('✍️ ArticleEditor initialisé');
    }

    /**
     * Configure le blocage du copier-coller avec message pédagogique
     */
    setupAntiPaste() {
        this.options.protectedFields.forEach(selector => {
            const fields = document.querySelectorAll(selector);
            
            fields.forEach(field => {
                // Bloquer le paste
                field.addEventListener('paste', (e) => this.handlePaste(e, field));
                
                // Optionnel : bloquer aussi le drag & drop de texte
                field.addEventListener('drop', (e) => this.handleDrop(e, field));
            });
        });
    }

    /**
     * Gère une tentative de collage
     */
    handlePaste(e, field) {
        e.preventDefault();
        
        // Récupérer le texte collé pour le log (sans l'insérer)
        const pastedText = e.clipboardData?.getData('text') || '';
        
        // Logger la tentative
        if (this.options.logAttempts) {
            this.logPasteAttempt(field, pastedText);
        }

        // Afficher le message pédagogique
        this.showBlockedMessage();
    }

    /**
     * Gère une tentative de drag & drop
     */
    handleDrop(e, field) {
        // Autoriser le drop interne (réorganisation de texte)
        if (e.dataTransfer?.effectAllowed === 'move') return;
        
        e.preventDefault();
        this.showBlockedMessage();
    }

    /**
     * Affiche un message expliquant pourquoi le paste est bloqué
     */
    showBlockedMessage() {
        const message = "📋 Le copier-coller est désactivé.\nReformule les informations avec tes propres mots !";
        
        if (this.options.onPasteBlocked) {
            this.options.onPasteBlocked(message);
        } else if (window.wizardInstance?.showToast) {
            window.wizardInstance.showToast(message, 'warning');
        } else {
            // Fallback : alert stylisé
            this.showFallbackToast(message);
        }
    }

    /**
     * Toast de fallback si le wizard n'est pas disponible
     */
    showFallbackToast(message) {
        // Vérifie si un toast existe déjà
        let toast = document.getElementById('articleEditorToast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'articleEditorToast';
            toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                background: #f59e0b;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                max-width: 90%;
                text-align: center;
                white-space: pre-line;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }

    /**
     * Log les tentatives de paste (pour analyse pédagogique)
     */
    logPasteAttempt(field, text) {
        const attempt = {
            timestamp: new Date().toISOString(),
            fieldName: field.dataset.field || field.name || 'unknown',
            textLength: text.length,
            textPreview: text.substring(0, 50) + (text.length > 50 ? '...' : '')
        };

        this.pasteAttempts.push(attempt);
        console.log('🚫 Tentative de paste bloquée:', attempt);

        // Optionnel : sauvegarder dans Firestore via le wizard
        this.savePasteAttemptToFirestore(attempt);
    }

    /**
     * Sauvegarde la tentative dans Firestore (si wizard disponible)
     */
    savePasteAttemptToFirestore(attempt) {
        if (window.wizardInstance?.formData) {
            // Ajouter aux données du formulaire
            if (!window.wizardInstance.formData.pasteAttempts) {
                window.wizardInstance.formData.pasteAttempts = [];
            }
            window.wizardInstance.formData.pasteAttempts.push(attempt);
        }
    }

    /**
     * Configure le spellcheck natif du navigateur
     */
    setupSpellcheck() {
        // Sélectionner tous les champs de texte
        const textFields = document.querySelectorAll(
            'textarea, input[type="text"], [contenteditable="true"]'
        );

        textFields.forEach(field => {
            // Activer le spellcheck en français
            field.setAttribute('spellcheck', 'true');
            field.setAttribute('lang', 'fr');
            
            // Pour les textarea, ajouter aussi autocorrect (Safari/iOS)
            if (field.tagName === 'TEXTAREA') {
                field.setAttribute('autocorrect', 'on');
                field.setAttribute('autocapitalize', 'sentences');
            }
        });

        console.log('📝 Spellcheck français activé sur', textFields.length, 'champs');
    }

    /**
     * Retourne les statistiques de tentatives de paste
     */
    getStats() {
        return {
            totalAttempts: this.pasteAttempts.length,
            attempts: this.pasteAttempts
        };
    }
}

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.articleEditor = new ArticleEditor();
    });
} else {
    window.articleEditor = new ArticleEditor();
}