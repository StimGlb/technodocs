// TechnoDocs - Chargement des composants (Header/Footer)
// Charge dynamiquement les includes HTML

import { initNavigation } from "./app.js";

// ===========================
// Fonctions pures utilitaires
// ===========================

// Calcule le préfixe relatif en fonction de l'URL courante (ex: "", ".. /", "../../")
function computeRelativePrefix(pathname) {
  if (!pathname) return "";
  const parts = pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  // Si la dernière partie ressemble à un index ou un fichier, on compte tous les segments sauf le fichier
  const depth = Math.max(0, parts.length - 1);
  return depth === 0 ? "" : "../".repeat(depth);
}

// Normalise un chemin pour comparaison (retire slash de tête)
function normalizePath(p) {
  return String(p || "").replace(/^\/+/, "");
}

// Fonction de remplacement sécurisé du DOM (évite innerHTML)
function safeReplaceElement(placeholder, htmlContent) {
  if (!placeholder) return;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const newElement = doc.body.firstElementChild;
  if (newElement) placeholder.replaceWith(newElement);
}

async function buildAndInjectNav(navData) {
  try {
    const navContainer = document.getElementById("main-nav");
    if (!navContainer) return;

    const prefix = computeRelativePrefix(window.location.pathname || "/");
    const currentPath = window.location.pathname || "/";
    const currentHash = window.location.hash || "";

    // --- Liste statique : ancres vers index.html (toujours présentes) ---
    const staticLinks = [
      { id: "idx-cours", name: "📚 Cours", href: "/index.html#cours" },
      {
        id: "idx-revisions",
        name: "🧠 Révisions",
        href: "/index.html#revisions",
      },
      {
        id: "idx-corrections",
        name: "✅ Corrections",
        href: "/index.html#corrections",
      },
      { id: "idx-outils", name: "🛠️ Outils", href: "/index.html#outils" },
    ];

    const ulStatic = document.createElement("ul");
    ulStatic.className = "nav__list nav__list--static";

    staticLinks.forEach((s) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "nav__link";
      a.setAttribute("href", s.href);
      a.setAttribute("data-nav-id", s.id);
      a.textContent = s.name;

      // is-active for index anchors: active when on index with matching hash
      try {
        const anchor = s.href.split("#")[1] || "";
        if (
          (currentPath.endsWith("/index.html") ||
            currentPath === "/" ||
            currentPath === "/index") &&
          currentHash &&
          currentHash.includes(anchor)
        ) {
          a.classList.add("is-active");
        }
      } catch (e) {
        /* ignore */
      }

      li.appendChild(a);
      ulStatic.appendChild(li);
    });

    // --- Liste dynamique : sous-index (cours, devoirs, outils) ---
    const ulDynamic = document.createElement("ul");
    ulDynamic.className = "nav__list nav__list--dynamic";

    const sections = ["cours", "devoirs", "outils"];
    sections.forEach((section) => {
      const items = (navData[section] || []).filter((i) => i.visible !== false);
      items.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = "nav__link";

        // construire href : si url commence par '/' on l'utilise telle quelle, sinon on applique prefix
        const raw = normalizePath(item.url || "");
        const href = raw.startsWith("/") ? raw : prefix ? prefix + raw : raw;
        a.setAttribute("href", href);
        a.setAttribute("data-nav-id", item.id || "");
        a.textContent =
          (item.icon && item.icon.value ? item.icon.value + " " : "") +
          (item.name || "");

        // Détection active : si le chemin courant contient la route de l'item
        try {
          const pagePath = currentPath.replace(/^\/+/, "");
          if (
            pagePath.endsWith(raw) ||
            raw.endsWith(pagePath) ||
            pagePath.includes(raw)
          ) {
            a.classList.add("is-active");
          }
        } catch (e) {
          /* ignore */
        }

        li.appendChild(a);
        ulDynamic.appendChild(li);
      });
    });

    // Vider et injecter : statique en premier, dynamique ensuite
    navContainer.innerHTML = "";
    navContainer.appendChild(ulStatic);
    if (ulDynamic.children.length > 0) {
      const divider = document.createElement("div");
      divider.className = "nav__divider";
      navContainer.appendChild(divider);
      navContainer.appendChild(ulDynamic);
    }

    if (typeof initNavigation === "function") initNavigation();
  } catch (e) {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.error("Erreur génération menu:", e);
    }
  }
}
async function loadHeader() {
  const placeholder = document.getElementById("header-placeholder");

  if (!placeholder) return;

  try {
    const response = await fetch("/src/includes/header.html");

    if (!response.ok) {
      throw new Error("Impossible de charger le header");
    }

    const html = await response.text();
    safeReplaceElement(placeholder, html);

    // Charger le JSON de navigation et injecter le menu dynamiquement
    try {
      const navResp = await fetch("/src/data/navigation.json");
      if (navResp && navResp.ok) {
        const navData = await navResp.json();
        await buildAndInjectNav(navData);
      } else {
        // si fetch échoue, tenter d'appeler initNavigation pour maintenir le comportement
        if (typeof initNavigation === "function") initNavigation();
      }
    } catch (e) {
      if (typeof initNavigation === "function") initNavigation();
    }
  } catch (error) {
    // Fallback en cas d'erreur
    const fallbackHeader = document.createElement("header");
    fallbackHeader.className = "header";

    const container = document.createElement("div");
    container.className = "header__container";

    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Erreur de chargement";

    container.appendChild(errorMsg);
    fallbackHeader.appendChild(container);
    placeholder.replaceWith(fallbackHeader);

    // Log uniquement en dev
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.error("Erreur header:", error);
    }
  }
}

// ===========================
// Chargement du footer
// ===========================
async function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");

  if (!placeholder) return;

  try {
    const response = await fetch("/src/includes/footer.html");

    if (!response.ok) {
      throw new Error("Impossible de charger le footer");
    }

    const html = await response.text();
    safeReplaceElement(placeholder, html);
  } catch (error) {
    // Fallback en cas d'erreur
    const fallbackFooter = document.createElement("footer");
    fallbackFooter.className = "footer";

    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Erreur de chargement";

    fallbackFooter.appendChild(errorMsg);
    placeholder.replaceWith(fallbackFooter);

    // Log uniquement en dev
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.error("Erreur footer:", error);
    }
  }
}

// ===========================
// Chargement de tous les composants
// ===========================
async function loadComponents() {
  await Promise.all([loadHeader(), loadFooter()]);
}

// Auto-initialisation au chargement du DOM
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
});

// Exporter pour utilisation modulaire
export { loadComponents, loadHeader, loadFooter };
