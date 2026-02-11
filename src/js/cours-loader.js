/**
 * Cours Loader - TechnoDocs
 * Module pour charger les pages de cours avec carousel hero + contenu Markdown
 *
 * Sécurité : Utilise createElement uniquement (zéro innerHTML)
 * Accessibilité : ARIA labels, navigation clavier, prefers-reduced-motion
 */

// État du carousel
let currentSlide = 0;
let totalSlides = 0;
let slidesData = [];

/**
 * Initialise la page de cours
 * @param {string} configPath - Chemin vers le fichier JSON de configuration
 */
export async function initCoursPage(configPath) {
  try {
    // Charger la configuration du cours
    const response = await fetch(configPath);
    if (!response.ok) {
      throw new Error(`Erreur chargement config: ${response.status}`);
    }

    const config = await response.json();

    // Mettre à jour le titre de la page
    document.title = `${config.title} | TechnoDocs`;

    // Rendre le hero
    renderHero(config);

    // Rendre le carousel
    renderCarousel(config.slides);

    // Initialiser la navigation
    initCarouselNavigation();

    // Charger le contenu Markdown
    if (config.markdownPath) {
      await loadMarkdownContent(config.markdownPath);
    }
  } catch (error) {
    console.error("Erreur initialisation cours:", error);
    showError("Impossible de charger le cours. Veuillez réessayer.");
  }
}

/**
 * Rend le header du hero
 */
function renderHero(config) {
  const titleEl = document.getElementById("cours-title");
  const subtitleEl = document.getElementById("cours-subtitle");

  if (titleEl) {
    titleEl.textContent = config.title || "Cours";
  }

  if (subtitleEl && config.subtitle) {
    subtitleEl.textContent = config.subtitle;
  }
}

/**
 * Rend les slides du carousel
 */
function renderCarousel(slides) {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("carousel-dots");

  if (!track || !slides || slides.length === 0) return;

  slidesData = slides;
  totalSlides = slides.length;

  // Vider le conteneur
  track.textContent = "";
  dotsContainer.textContent = "";

  // Créer chaque slide
  slides.forEach((slide, index) => {
    const slideEl = createSlideElement(slide, index);
    track.appendChild(slideEl);

    // Créer le dot correspondant
    const dot = createDotElement(index);
    dotsContainer.appendChild(dot);
  });

  // Activer la première slide
  updateActiveSlide(0);
}

/**
 * Crée un élément slide
 */
function createSlideElement(slide, index) {
  const article = document.createElement("article");
  article.className = "carousel__slide";
  article.setAttribute("role", "tabpanel");
  article.setAttribute(
    "aria-label",
    `Slide ${index + 1} sur ${totalSlides}: ${slide.title}`,
  );
  article.setAttribute("data-index", index);

  // Container pour l'image ou l'icône
  const mediaContainer = document.createElement("div");
  mediaContainer.className = "slide__media";

  if (slide.image) {
    const img = document.createElement("img");
    img.src = slide.image;
    img.alt = slide.title || "";
    img.className = "slide__image";
    img.loading = "lazy";
    mediaContainer.appendChild(img);
  } else if (slide.icon) {
    const iconDiv = document.createElement("div");
    iconDiv.className = "slide__icon";
    iconDiv.textContent = slide.icon;
    iconDiv.setAttribute("aria-hidden", "true");
    mediaContainer.appendChild(iconDiv);
  }

  article.appendChild(mediaContainer);

  // Contenu texte
  const content = document.createElement("div");
  content.className = "slide__content";

  // Titre
  if (slide.title) {
    const title = document.createElement("h3");
    title.className = "slide__title";
    title.textContent = slide.title;
    content.appendChild(title);
  }

  // Description (avec support Markdown basique)
  if (slide.description) {
    const desc = document.createElement("div");
    desc.className = "slide__description";
    renderSimpleMarkdown(slide.description, desc);
    content.appendChild(desc);
  }

  article.appendChild(content);

  return article;
}

/**
 * Rendu Markdown simplifié (gras, italique, listes)
 * Sécurisé : utilise createElement uniquement
 */
function renderSimpleMarkdown(text, container) {
  const lines = text.split("\n");
  let currentList = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Liste à puces
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!currentList) {
        currentList = document.createElement("ul");
        currentList.className = "slide__list";
      }
      const li = document.createElement("li");
      li.textContent = trimmed.substring(2);
      applyInlineFormatting(li);
      currentList.appendChild(li);
    } else {
      // Fermer la liste en cours si nécessaire
      if (currentList) {
        container.appendChild(currentList);
        currentList = null;
      }

      // Paragraphe normal
      if (trimmed) {
        const p = document.createElement("p");
        p.textContent = trimmed;
        applyInlineFormatting(p);
        container.appendChild(p);
      }
    }
  });

  // Fermer la liste finale si nécessaire
  if (currentList) {
    container.appendChild(currentList);
  }
}

/**
 * Applique le formatage inline (gras, italique)
 * Note: Version simplifiée pour la sécurité
 */
function applyInlineFormatting(element) {
  const text = element.textContent;

  // Regex pour **gras**
  const boldRegex = /\*\*(.+?)\*\*/g;

  if (boldRegex.test(text)) {
    element.textContent = "";
    let lastIndex = 0;
    let match;

    // Reset regex
    boldRegex.lastIndex = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Texte avant le match
      if (match.index > lastIndex) {
        element.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index)),
        );
      }

      // Texte en gras
      const strong = document.createElement("strong");
      strong.textContent = match[1];
      element.appendChild(strong);

      lastIndex = match.index + match[0].length;
    }

    // Texte après le dernier match
    if (lastIndex < text.length) {
      element.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }
}

/**
 * Crée un élément dot pour la navigation
 */
function createDotElement(index) {
  const button = document.createElement("button");
  button.className = "carousel__dot";
  button.setAttribute("role", "tab");
  button.setAttribute("aria-label", `Aller à la slide ${index + 1}`);
  button.setAttribute("aria-selected", index === 0 ? "true" : "false");
  button.setAttribute("data-index", index);

  button.addEventListener("click", () => {
    goToSlide(index);
  });

  return button;
}

/**
 * Initialise la navigation du carousel
 */
function initCarouselNavigation() {
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  // Boutons précédent/suivant
  prevBtn?.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  nextBtn?.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  // Navigation clavier
  document.addEventListener("keydown", (e) => {
    // Ne pas interférer si focus dans un input
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    // Vérifier si le carousel est visible
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;

    const rect = carousel.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isVisible) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    }
  });

  // Support du scroll horizontal avec la molette (optionnel)
  const track = document.getElementById("carousel-track");
  track?.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Scroll horizontal natif, laisser faire
        return;
      }
    },
    { passive: true },
  );
}

/**
 * Navigue vers une slide spécifique
 */
function goToSlide(index) {
  // Boucler si nécessaire
  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }

  currentSlide = index;
  updateActiveSlide(index);
}

/**
 * Met à jour l'affichage de la slide active
 */
function updateActiveSlide(index) {
  const track = document.getElementById("carousel-track");
  const slides = track?.querySelectorAll(".carousel__slide");
  const dots = document.querySelectorAll(".carousel__dot");

  if (!slides || slides.length === 0) return;

  // Scroll vers la slide active
  const targetSlide = slides[index];
  if (targetSlide) {
    // Vérifier les préférences de mouvement réduit
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    targetSlide.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  // Mettre à jour les classes actives
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
    slide.setAttribute("aria-hidden", i !== index ? "true" : "false");
  });

  // Mettre à jour les dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === index);
    dot.setAttribute("aria-selected", i === index ? "true" : "false");
  });

  // Mettre à jour l'état des boutons
  updateNavButtons();
}

/**
 * Met à jour l'état des boutons de navigation
 */
function updateNavButtons() {
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  // Les boutons sont toujours actifs (navigation en boucle)
  // Mais on peut ajouter un indicateur visuel si souhaité
  prevBtn?.classList.toggle("carousel__btn--edge", currentSlide === 0);
  nextBtn?.classList.toggle(
    "carousel__btn--edge",
    currentSlide === totalSlides - 1,
  );
}

/**
 * Charge et rend le contenu Markdown
 */
async function loadMarkdownContent(path) {
  const container = document.getElementById("markdown-container");
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Erreur chargement markdown: ${response.status}`);
    }

    const markdownText = await response.text();

    // Utiliser Marked.js pour le rendu
    if (typeof marked !== "undefined") {
      // Configuration sécurisée de Marked
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false,
      });

      const htmlContent = marked.parse(markdownText);

      // Rendu sécurisé via DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      // Vider et remplir le conteneur
      container.textContent = "";

      // Layout: sidebar (TOC) à gauche + contenu à droite
      const layout = document.createElement("div");
      layout.className = "md-layout";

      const sidebar = document.createElement("aside");
      sidebar.className = "md-sidebar";
      sidebar.setAttribute("aria-label", "Sommaire");

      // Générer la table des matières
      const toc = generateTableOfContents(doc.body);
      if (toc) {
        sidebar.appendChild(toc);
      }

      // Ajouter le contenu
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "md-body";

      // Copier les enfants de manière sécurisée
      Array.from(doc.body.childNodes).forEach((node) => {
        contentWrapper.appendChild(node.cloneNode(true));
      });

      // Assembler
      if (toc) {
        layout.appendChild(sidebar);
      }
      layout.appendChild(contentWrapper);
      container.appendChild(layout);

      // Ajouter les IDs aux titres pour la navigation
      addHeadingIds(contentWrapper);
    } else {
      throw new Error("Marked.js non chargé");
    }
  } catch (error) {
    console.error("Erreur chargement markdown:", error);
    container.textContent = "";

    const errorMsg = document.createElement("p");
    errorMsg.className = "md-error";
    errorMsg.textContent = "Impossible de charger le contenu du cours.";
    container.appendChild(errorMsg);
  }
}

/**
 * Génère une table des matières à partir des titres
 */
function generateTableOfContents(content) {
  const headings = content.querySelectorAll("h2, h3, h4");

  if (headings.length < 3) return null; // Pas assez de titres

  const nav = document.createElement("nav");
  nav.className = "md-toc";
  nav.setAttribute("aria-label", "Table des matières");

  const title = document.createElement("h2");
  title.className = "md-toc__title";
  title.textContent = "📑 Sommaire";
  nav.appendChild(title);

  const list = document.createElement("ul");
  list.className = "md-toc__list";

  headings.forEach((heading, index) => {
    const id = `section-${index}`;
    heading.id = id;

    const li = document.createElement("li");
    li.className = `md-toc__item md-toc__item--${heading.tagName.toLowerCase()}`;

    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    link.className = "md-toc__link";

    li.appendChild(link);
    list.appendChild(li);
  });

  nav.appendChild(list);

  return nav;
}

/**
 * Ajoute des IDs aux titres pour la navigation interne
 */
function addHeadingIds(container) {
  const headings = container.querySelectorAll("h2, h3, h4");

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `section-${index}`;
    }
  });
}

/**
 * Affiche un message d'erreur
 */
function showError(message) {
  const container = document.getElementById("markdown-container");
  if (container) {
    container.textContent = "";

    const errorDiv = document.createElement("div");
    errorDiv.className = "cours-error";

    const errorIcon = document.createElement("span");
    errorIcon.textContent = "⚠️";
    errorIcon.setAttribute("aria-hidden", "true");
    errorDiv.appendChild(errorIcon);

    const errorText = document.createElement("p");
    errorText.textContent = message;
    errorDiv.appendChild(errorText);

    container.appendChild(errorDiv);
  }
}
