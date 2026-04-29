export function initLightModeToggle() {
  const body = document.body;
  const toggle = document.getElementById("modeToggle");
  const urlParams = new URLSearchParams(window.location.search);
  let currentMode = urlParams.get("mode") === "light" ? "light" : "dark";

  if (currentMode === "light") {
    body.classList.add("light-mode");
    if (toggle) toggle.textContent = "☀️";
  } else {
    body.classList.remove("light-mode");
    if (toggle) toggle.textContent = "🌙";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        toggle.textContent = "🌙";
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("mode");
        window.history.replaceState({}, "", newUrl);
      } else {
        body.classList.add("light-mode");
        toggle.textContent = "☀️";
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("mode", "light");
        window.history.replaceState({}, "", newUrl);
      }
    });
  }
}
