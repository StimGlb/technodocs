// TechnoDocs — Tableau de bord : rendu dynamique des cartes depuis navigation.json
// Module ES6 extrait de l'inline script de index.html
// Sécurité : utilise uniquement createElement/textContent/replaceChildren (pas de innerHTML)

import navRaw from "../data/navigation.json?raw";
import pagesConfigRaw from "../data/pages-config.json";

function loadPagesConfig() {
  try {
    if (pagesConfigRaw && typeof pagesConfigRaw === "object")
      return pagesConfigRaw;
  } catch {
    // fallback silencieux : toutes les cartes s'affichent, aucune featured
  }
  return {};
}

(function () {
  try {
    const nav = JSON.parse(navRaw);
    const pagesConfig = loadPagesConfig();

    // ── Cours ─────────────────────────────────────────────────────────────
    const container = document.getElementById("flashcard-category-grid");
    if (container) {
      const nodes = (nav.cours || [])
        .filter(
          (i) => i.visible !== false && pagesConfig[i.id]?.visible !== false,
        )
        .sort((itemA, itemB) => {
          const aF = pagesConfig[itemA.id]?.featured === true;
          const bF = pagesConfig[itemB.id]?.featured === true;
          return aF === bF ? 0 : aF ? -1 : 1;
        })
        .map((item) => {
          const isFeatured = pagesConfig[item.id]?.featured === true;
          const a = document.createElement("a");
          a.className = isFeatured
            ? "card card--cours card--featured"
            : "card card--cours";

          const raw = item.path || item.url || "";
          a.setAttribute("href", raw || "#");

          if (item.icon?.value) {
            const icon = document.createElement("div");
            icon.className = "card__icon";
            icon.textContent = item.icon.value;
            a.appendChild(icon);
          }

          const h3 = document.createElement("h3");
          h3.className = "card__title";
          h3.textContent = item.name || "";
          a.appendChild(h3);

          if (item.description) {
            const p = document.createElement("p");
            p.className = "card__text";
            p.textContent = item.description;
            a.appendChild(p);
          }

          return a;
        });

      container.replaceChildren(...nodes);
    }

    // ── Corrections ───────────────────────────────────────────────────────
    const correctionsContainer = document.querySelector(".correction-grid");
    if (correctionsContainer) {
      const nodes = (nav.corrections || [])
        .filter(
          (i) => i.visible !== false && pagesConfig[i.id]?.visible !== false,
        )
        .sort((itemA, itemB) => {
          const aF = pagesConfig[itemA.id]?.featured === true;
          const bF = pagesConfig[itemB.id]?.featured === true;
          return aF === bF ? 0 : aF ? -1 : 1;
        })
        .map((item) => {
          const isFeatured = pagesConfig[item.id]?.featured === true;
          const a = document.createElement("a");
          // Apply CSS variant + featured classes
          const variantClass = item.variant
            ? ` correction-card--${item.variant}`
            : "";
          const featuredClass = isFeatured ? " card--featured" : "";
          a.className = `correction-card${variantClass}${featuredClass}`;

          const raw = item.path || item.url || "";
          a.setAttribute("href", raw || "#");

          if (item.icon?.value) {
            const icon = document.createElement("div");
            icon.className = "correction-card__icon";
            icon.textContent = item.icon.value;
            a.appendChild(icon);
          }

          const h3 = document.createElement("h3");
          h3.className = "correction-card__title";
          h3.textContent = item.name || "";
          a.appendChild(h3);

          if (item.description) {
            const p = document.createElement("p");
            p.className = "correction-card__text";
            p.textContent = item.description;
            a.appendChild(p);
          }

          return a;
        });

      correctionsContainer.replaceChildren(...nodes);
    }

    // ── Devoirs ───────────────────────────────────────────────────────────
    const devoirsContainer = document.getElementById("devoirs-grid");
    if (devoirsContainer) {
      const nodes = (nav.devoirs || [])
        .filter(
          (i) => i.visible !== false && pagesConfig[i.id]?.visible !== false,
        )
        .sort((itemA, itemB) => {
          const aF = pagesConfig[itemA.id]?.featured === true;
          const bF = pagesConfig[itemB.id]?.featured === true;
          return aF === bF ? 0 : aF ? -1 : 1;
        })
        .map((item) => {
          const isFeatured = pagesConfig[item.id]?.featured === true;
          const a = document.createElement("a");
          const variantClass = item.variant
            ? ` correction-card--${item.variant}`
            : "";
          const featuredClass = isFeatured ? " card--featured" : "";
          a.className = `correction-card${variantClass}${featuredClass}`;

          const raw = item.path || item.url || "";
          a.setAttribute("href", raw || "#");

          if (item.icon?.value) {
            const icon = document.createElement("div");
            icon.className = "correction-card__icon";
            icon.textContent = item.icon.value;
            a.appendChild(icon);
          }

          const h3 = document.createElement("h3");
          h3.className = "correction-card__title";
          h3.textContent = item.name || "";
          a.appendChild(h3);

          if (item.description) {
            const p = document.createElement("p");
            p.className = "correction-card__text";
            p.textContent = item.description;
            a.appendChild(p);
          }

          return a;
        });

      devoirsContainer.replaceChildren(...nodes);
    }

    // ── Outils ────────────────────────────────────────────────────────────
    const outilsContainer =
      document.getElementById("tools-grid") ||
      document.querySelector(".tools-grid");
    if (outilsContainer) {
      const nodes = (nav.outils || [])
        .filter(
          (i) => i.visible !== false && pagesConfig[i.id]?.visible !== false,
        )
        .sort((itemA, itemB) => {
          const aF = pagesConfig[itemA.id]?.featured === true;
          const bF = pagesConfig[itemB.id]?.featured === true;
          return aF === bF ? 0 : aF ? -1 : 1;
        })
        .map((item) => {
          const isFeatured = pagesConfig[item.id]?.featured === true;
          const raw = item.path || item.url || "";
          let href = raw || "#";
          if (!href.match(/^https?:\/\//i) && !href.startsWith("/"))
            href = "/" + href;

          const a = document.createElement("a");
          a.className = isFeatured ? "tool-card card--featured" : "tool-card";
          a.setAttribute("href", href);

          if (
            item.external === true ||
            (item.path && item.path.startsWith("src/pages/outils"))
          ) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener");
          }

          // Tinkercad: logo image au lieu d'un emoji
          if (item.id === "tinkercad-classes") {
            const img = document.createElement("img");
            img.className = "selector-icon";
            img.src = "/src/assets/outils/logo-tinkercad.png";
            img.alt = item.name || "Tinkercad";
            a.appendChild(img);
          } else if (item.icon?.value) {
            const logo = document.createElement("div");
            logo.className = "tool-card__logo";
            logo.textContent = item.icon.value;
            a.appendChild(logo);
          }

          const name = document.createElement("span");
          name.className = "tool-card__name";
          name.textContent = item.name || "";
          a.appendChild(name);

          if (item.description) {
            const tag = document.createElement("span");
            tag.className = "tool-card__tag";
            tag.textContent = item.description;
            a.appendChild(tag);
          }

          return a;
        });

      outilsContainer.replaceChildren(...nodes);
    }
  } catch {
    // Parsing silencieux en prod ; erreur visible uniquement sur localhost
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      console.error("[index-loader] Erreur de chargement de navigation.json");
    }
  }
})();
