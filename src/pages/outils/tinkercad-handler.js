// Gestionnaire Tinkercad Classes
// Externalisation du script pour respecter la CSP (script-src 'self')

document.addEventListener('DOMContentLoaded', () => {
    // Configuration des classes
    const TINKERCAD_BASE_URL = 'https://www.tinkercad.com/joinclass/';
    
    // Éléments DOM
    const classSelect = document.getElementById('class-select');
    const joinBtn = document.getElementById('join-btn');
    const classForm = document.getElementById('class-form');

    if (!classSelect || !joinBtn || !classForm) {
        console.error('Éléments du formulaire Tinkercad non trouvés');
        return;
    }

    // Activer/désactiver le bouton selon la sélection
    classSelect.addEventListener('change', () => {
        const hasSelection = classSelect.value && classSelect.value !== 'XXXXXX';
        joinBtn.disabled = !hasSelection;
    });

    // Gestion de la soumission
    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const classCode = classSelect.value;
        
        if (classCode && classCode !== 'XXXXXX') {
            // Ouvrir Tinkercad dans un nouvel onglet
            window.open(TINKERCAD_BASE_URL + classCode, '_blank', 'noopener');
        }
    });
});
