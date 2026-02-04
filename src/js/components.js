// TechnoDocs - Chargement des composants (Header/Footer)
// Charge dynamiquement les includes HTML

import { initNavigation } from "./app.js";
// Import static includes and navigation JSON as raw strings so they are
// bundled by Vite and available in production (no runtime fetch to /src/...)
import headerHtml from "../includes/header.html?raw";
import footerHtml from "../includes/footer.html?raw";
import navigationJsonRaw from "../data/navigation.json?raw";

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

/**
 * Calcule le préfixe de chemin relatif selon la profondeur de l'URL actuelle
 */
function getRelativePrefix() {
  // Retourne le préfixe relatif (``, `../`, `../../`, ...) selon la profondeur
  const path = window.location.pathname || "/";

  // Sur la racine ou index, on n'a pas besoin de ../
  if (
    path === "/" ||
    path.endsWith("/index.html") ||
    path.endsWith("index.html")
  )
    return "";

  // Retirer le slash de tête et éclater
  const parts = path.replace(/^\/+/, "").split("/").filter(Boolean);
  // Si la dernière partie ressemble à un fichier HTML, on la retire
  if (parts.length && parts[parts.length - 1].endsWith(".html")) parts.pop();

  // Le nombre de `../` correspond au nombre de dossiers restants
  const depth = Math.max(0, parts.length - 0);
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

    const prefix = getRelativePrefix();
    const currentPath = window.location.pathname || "/";
    const currentHash = window.location.hash || "";

    // --- Liste statique : ancres vers les sections de l'index (utilise '#anchor') ---
    const staticLinks = [
      { id: "idx-cours", name: "📚 Cours", href: "#cours" },
      { id: "idx-revisions", name: "🧠 Révisions", href: "#revisions" },
      { id: "idx-corrections", name: "✅ Corrections", href: "#corrections" },
      { id: "idx-outils", name: "🛠️ Outils", href: "#outils" },
    ];

    const ulStatic = document.createElement("ul");
    ulStatic.className = "nav__list nav__list--static";

    staticLinks.forEach((s) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "nav__link";
      a.setAttribute("data-nav-id", s.id);
      a.textContent = s.name;

      // Déterminer href intelligent :
      // - si on est sur l'index (/) => laisser l'ancre (#cours)
      // - sinon => préfixe relatif + 'index.html#anchor' (ex: ../../index.html#cours)
      const anchor = (s.href || "").startsWith("#")
        ? s.href
        : "#" + String(s.href || "").replace(/^#+/, "");
      let finalHref = anchor;
      const onIndex =
        currentPath === "/" ||
        currentPath.endsWith("/index.html") ||
        currentPath.endsWith("index.html");
      if (!onIndex) {
        // getRelativePrefix() renvoie '' ou '../' répétées
        const p = prefix || "";
        finalHref = (p || "") + "index.html" + anchor;
      }

      a.setAttribute("href", finalHref);

      // is-active: uniquement quand on est sur l'index et le hash correspond
      try {
        if (
          onIndex &&
          currentHash &&
          currentHash.includes(anchor.replace(/^#/, ""))
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

        // construire href : priorise `item.path` puis `item.url`
        const rawSource = item.path || item.url || "";
        const raw = String(rawSource || "");
        // Si c'est une URL absolue (http) ou un chemin absolu (/...), on l'utilise tel quel
        let href = raw;
        if (!href.match(/^https?:\/\//i) && !href.startsWith("/")) {
          href = prefix + raw;
        }
        a.setAttribute("href", href);
        a.setAttribute("data-nav-id", item.id || "");
        a.textContent =
          (item.icon && item.icon.value ? item.icon.value + " " : "") +
          (item.name || "");

        // Détection active : si le chemin courant contient la route de l'item
        try {
          const pagePath = currentPath.replace(/^\/+/, "");
          const normalizedRaw = normalizePath(raw);
          if (
            (normalizedRaw && pagePath.endsWith(normalizedRaw)) ||
            (pagePath && normalizedRaw && pagePath.includes(normalizedRaw))
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
    // Use bundled header HTML (Vite raw import)
    safeReplaceElement(placeholder, headerHtml);

    // Parse bundled navigation JSON and inject menu
    try {
      const navData = JSON.parse(navigationJsonRaw || "{}");
      await buildAndInjectNav(navData);
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
    // Use bundled footer HTML (Vite raw import)
    safeReplaceElement(placeholder, footerHtml);
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
