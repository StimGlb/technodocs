/*
  Autofill helper for the Wizard Firestore form
  - Can be pasted into the browser console or loaded as a script for testing
  - Fills all fields that have a `data-field` attribute with sensible test values
  - Optionally triggers save to Firestore via `window.wizardInstance.saveToFirestore()`

  Usage (paste in console):
    autofillWizard({ studentName: 'Alice Dupont', studentClass: '4B', autoSave: true })

  Note: This script does NOT contain any Firebase keys and only manipulates DOM/testing flows.
*/

(function () {
  function formatDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function safeText(node, value) {
    if (node.isContentEditable) node.innerText = value;
    else node.value = value;
  }

  /**
   * Autofill helper - Promise-based and configurable
   * opts:
   *  - prefix
   *  - fieldSelector
   *  - map { fieldName: value }
   *  - radioValues { groupName: value }
   *  - defaultsFromDataAttrs (bool)
   *  - checkboxChecked (bool) default true when no explicit map
   *  - autoSave (bool)
   *  - saveTimeout (ms)
   *  - onProgress (fn(detail))
   */
  async function autofillWizard(opts = {}) {
    const prefix = opts.prefix || "Test";
    const now = new Date();
    const selector = opts.fieldSelector || "[data-field]";
    const fields = Array.from(document.querySelectorAll(selector));
    const details = [];

    for (const field of fields) {
      const name = field.dataset.field;
      let applied = false;
      let val;

      try {
        // priority: explicit map -> data-value/data-default (if allowed) -> sensible default
        if (opts.map && Object.prototype.hasOwnProperty.call(opts.map, name)) {
          val = opts.map[name];
        } else if (
          opts.defaultsFromDataAttrs &&
          (field.dataset.value || field.dataset.default)
        ) {
          val = field.dataset.value || field.dataset.default;
        } else if (name === "studentName") {
          val =
            opts.map && opts.map.studentName !== undefined
              ? opts.map.studentName
              : opts.studentName || `${prefix} Élève`;
        } else if (name === "studentClass") {
          val =
            opts.map && opts.map.studentClass !== undefined
              ? opts.map.studentClass
              : opts.studentClass || "5A";
        } else if (name === "projectDate") {
          val =
            opts.map && opts.map.projectDate !== undefined
              ? opts.map.projectDate
              : opts.projectDate || formatDate(now);
        }

        const tag = field.tagName.toLowerCase();

        if (tag === "input") {
          const t = (field.type || "").toLowerCase();
          if (t === "checkbox") {
            if (typeof val === "boolean") {
              field.checked = val;
              applied = true;
            } else if (
              opts.map &&
              Object.prototype.hasOwnProperty.call(opts.map, name)
            ) {
              field.checked = Boolean(val);
              applied = true;
            } else if (opts.checkboxChecked !== undefined) {
              field.checked = !!opts.checkboxChecked;
              applied = true;
            } else {
              // default behavior: leave as-is to avoid surprising toggles
              applied = false;
            }
          } else if (t === "radio") {
            const groupName = field.name;
            let chosenValue;
            if (
              opts.map &&
              Object.prototype.hasOwnProperty.call(opts.map, groupName)
            )
              chosenValue = opts.map[groupName];
            else if (
              opts.radioValues &&
              Object.prototype.hasOwnProperty.call(opts.radioValues, groupName)
            )
              chosenValue = opts.radioValues[groupName];

            if (chosenValue !== undefined) {
              const group = document.querySelectorAll(
                `input[name="${groupName}"]`,
              );
              const match = Array.from(group).find(
                (r) => r.value == chosenValue,
              );
              if (match) {
                match.checked = true;
                applied = true;
                val = chosenValue;
              } else {
                // if no match, do not auto-check any radio
                applied = false;
              }
            }
          } else if (t === "number") {
            if (val === undefined)
              val = opts.number !== undefined ? opts.number : 42;
            field.value = val;
            applied = true;
          } else if (t === "date") {
            if (val === undefined) val = opts.projectDate || formatDate(now);
            field.value = val;
            applied = true;
          } else {
            if (val === undefined) val = `${prefix} ${name}`;
            safeText(field, val);
            applied = true;
          }
        } else if (tag === "textarea") {
          if (val === undefined) val = `${prefix} texte pour ${name}`;
          safeText(field, val);
          applied = true;
        } else if (tag === "select") {
          if (val !== undefined) {
            field.value = val;
            applied = true;
          } else {
            const opt =
              Array.from(field.options).find((o) => o.value) ||
              field.options[0];
            if (opt) {
              field.value = opt.value;
              applied = true;
              val = opt.value;
            }
          }
        } else {
          // handle contenteditable or other elements
          if (field.isContentEditable) {
            if (val === undefined) val = `${prefix} ${name}`;
            field.innerText = val;
            applied = true;
          }
        }

        details.push({
          field: name,
          selector: selector,
          value: val,
          status: applied ? "applied" : "skipped",
        });
        if (typeof opts.onProgress === "function")
          opts.onProgress(details[details.length - 1]);
      } catch (err) {
        details.push({
          field: name,
          selector: selector,
          error: String(err),
          status: "error",
        });
        if (typeof opts.onProgress === "function")
          opts.onProgress(details[details.length - 1]);
      }
    }

    // update wizard state if present
    if (window.wizardInstance) {
      try {
        if (window.wizardInstance.isDirty !== undefined)
          window.wizardInstance.isDirty = true;
        if (typeof window.wizardInstance.updateProgress === "function")
          window.wizardInstance.updateProgress();
      } catch (e) {
        // non-fatal
      }
    }

    // Optionally save and respect timeout
    let saved = null;
    if (
      opts.autoSave &&
      window.wizardInstance &&
      typeof window.wizardInstance.saveToFirestore === "function"
    ) {
      const savePromise = window.wizardInstance.saveToFirestore();
      if (opts.saveTimeout && typeof opts.saveTimeout === "number") {
        const timeout = new Promise((_, rej) =>
          setTimeout(
            () => rej(new Error("saveToFirestore timeout")),
            opts.saveTimeout,
          ),
        );
        try {
          await Promise.race([savePromise, timeout]);
          saved = true;
        } catch (e) {
          saved = false;
          details.push({
            field: "__save__",
            status: "error",
            error: String(e),
          });
        }
      } else {
        try {
          await savePromise;
          saved = true;
        } catch (e) {
          saved = false;
          details.push({
            field: "__save__",
            status: "error",
            error: String(e),
          });
        }
      }
    }

    return { saved, details };
  }

  // Expose helper globally (non-invasive)
  window.autofillWizard = autofillWizard;

  // Backwards-compatible: if page sets AUTO_RUN_AUTOFILL, call it
  if (window.AUTO_RUN_AUTOFILL) {
    try {
      autofillWizard(window.AUTO_RUN_AUTOFILL).catch(() => {});
    } catch (e) {}
  }
})();
