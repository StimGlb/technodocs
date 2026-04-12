/**
 * light-mode-toggle.js — TechnoDocs
 * Utilitaire partagé pour le bouton bascule clair/sombre.
 * Lit le paramètre URL ?mode=light au chargement.
 * Externalisé pour conformité CSP (script-src 'self').
 */
function initLightModeToggle() {
  const body = document.body;
  const toggle = document.getElementById("modeToggle");
  if (!toggle) return;

  const urlParams = new URLSearchParams(window.location.search);
  let currentMode = urlParams.get("mode") === "light" ? "light" : "dark";

  function applyMode(mode) {
    if (mode === "light") {
      body.classList.add("light-mode");
      toggle.textContent = "☀️";
    } else {
      body.classList.remove("light-mode");
      toggle.textContent = "🌙";
    }
  }

  applyMode(currentMode);

  toggle.addEventListener("click", () => {
    currentMode = currentMode === "dark" ? "light" : "dark";
    applyMode(currentMode);
    const newUrl = new URL(window.location);
    if (currentMode === "light") {
      newUrl.searchParams.set("mode", "light");
    } else {
      newUrl.searchParams.delete("mode");
    }
    window.history.replaceState({}, "", newUrl);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLightModeToggle);
} else {
  initLightModeToggle();
}
