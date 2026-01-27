document.addEventListener('DOMContentLoaded', () => {
    const classSelect = document.getElementById('class-select');
    const joinBtn = document.getElementById('join-btn');
    const classForm = document.getElementById('class-form');

    if (classSelect && joinBtn && classForm) {
        // Activer/désactiver le bouton
        classSelect.addEventListener('change', () => {
            joinBtn.disabled = !classSelect.value;
        });

        // Gestion de la redirection
        classForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const classCode = classSelect.value;
            if (classCode) {
                window.open('https://www.tinkercad.com/joinclass/' + classCode, '_blank', 'noopener');
            }
        });
    }
});