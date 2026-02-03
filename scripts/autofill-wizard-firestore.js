/*
  Autofill helper for the Wizard Firestore form
  - Can be pasted into the browser console or loaded as a script for testing
  - Fills all fields that have a `data-field` attribute with sensible test values
  - Optionally triggers save to Firestore via `window.wizardInstance.saveToFirestore()`

  Usage (paste in console):
    autofillWizard({ studentName: 'Alice Dupont', studentClass: '4B', autoSave: true })

  Note: This script does NOT contain any Firebase keys and only manipulates DOM/testing flows.
*/

(function(){
  function formatDate(d){
    return d.toISOString().slice(0,10);
  }

  function autofillWizard(opts = {}){
    const prefix = opts.prefix || 'Test';
    const now = new Date();
    const fields = document.querySelectorAll('[data-field]');

    fields.forEach(field => {
      const name = field.dataset.field;

      // Student info
      if (name === 'studentName') {
        field.value = opts.studentName || `${prefix} Élève`;
        return;
      }
      if (name === 'studentClass') {
        field.value = opts.studentClass || '5A';
        return;
      }
      if (name === 'projectDate') {
        field.value = opts.projectDate || formatDate(now);
        return;
      }

      // Generic fields by element type
      const tag = field.tagName.toLowerCase();

      if (tag === 'input') {
        const t = field.type;
        if (t === 'checkbox') {
          field.checked = true;
        } else if (t === 'radio') {
          // check the first radio in the group
          const group = document.querySelectorAll(`input[name=\"${field.name}\"]`);
          if (group && group.length) group[0].checked = true;
        } else if (t === 'number') {
          field.value = opts.number || 42;
        } else if (t === 'date') {
          field.value = opts.projectDate || formatDate(now);
        } else {
          field.value = `${prefix} ${name}`;
        }
      } else if (tag === 'textarea') {
        field.value = `${prefix} texte pour ${name}`;
      } else if (tag === 'select') {
        // choose first non-empty option
        const opt = Array.from(field.options).find(o => o.value) || field.options[0];
        if (opt) field.value = opt.value;
      }
    });

    // update wizard state and optionally save
    if (window.wizardInstance) {
      try {
        window.wizardInstance.isDirty = true;
        window.wizardInstance.updateProgress();

        if (opts.autoSave !== false) {
          // saveToFirestore returns a Promise
          window.wizardInstance.saveToFirestore().then(() => {
            console.log('Autofill: saved to Firestore (if configured).');
          }).catch(err => {
            console.warn('Autofill: saveToFirestore failed (check Firebase config):', err);
          });
        }
      } catch (e) {
        console.warn('Autofill: wizardInstance methods not available yet.', e);
      }
    } else {
      console.log('Autofill completed. No wizardInstance detected (you can call wizardExportJSON() to export).');
    }
  }

  // Expose helper globally
  window.autofillWizard = autofillWizard;

  // Auto-run once if `AUTO_RUN_AUTOFILL` is present on the window (useful for quick tests)
  if (window.AUTO_RUN_AUTOFILL) {
    autofillWizard(window.AUTO_RUN_AUTOFILL);
  }

})();

autofillWizard({ studentName: 'Alice Dupont', studentClass: '4B', autoSave: true });