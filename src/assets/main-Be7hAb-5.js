(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function r(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(t){if(t.ep)return;t.ep=!0;const l=r(t);fetch(t.href,l)}})();(async function(){try{const e=await fetch("/data/navigation.json");if(!e.ok)return;const n=await e.json(),r=n.cours||[],a=document.getElementById("flashcard-category-grid");if(!a)return;a.innerHTML="",r.filter(o=>o.visible!==!1).forEach(o=>{const s=document.createElement("a");s.className="card card--cours";const d=o.path||o.url||"";let i=d;if(!i.match(/^https?:\/\//i)&&!i.startsWith("/")&&(i=d),s.setAttribute("href",i||"#"),o.icon&&o.icon.value){const c=document.createElement("div");c.className="card__icon",c.textContent=o.icon.value,s.appendChild(c)}const p=document.createElement("h3");if(p.className="card__title",p.textContent=o.name||"",s.appendChild(p),o.description){const c=document.createElement("p");c.className="card__text",c.textContent=o.description,s.appendChild(c)}a.appendChild(s)});const t=n.corrections||[],l=document.querySelector(".correction-grid");l&&(l.innerHTML="",t.filter(o=>o.visible!==!1).forEach(o=>{const s=document.createElement("a");s.className="correction-card";const d=o.path||o.url||"";let i=d;if(!i.match(/^https?:\/\//i)&&!i.startsWith("/")&&(i=d),s.setAttribute("href",i||"#"),o.icon&&o.icon.value){const c=document.createElement("div");c.className="correction-card__icon",c.textContent=o.icon.value,s.appendChild(c)}const p=document.createElement("h3");if(p.className="correction-card__title",p.textContent=o.name||"",s.appendChild(p),o.description){const c=document.createElement("p");c.className="correction-card__text",c.textContent=o.description,s.appendChild(c)}l.appendChild(s)}));const m=n.outils||[],h=document.getElementById("tools-grid")||document.querySelector(".tools-grid");h&&(h.innerHTML="",m.filter(o=>o.visible!==!1).forEach(o=>{let d=o.path||o.url||""||"#";!d.match(/^https?:\/\//i)&&!d.startsWith("/")&&(d="/"+d);const i=document.createElement("a");if(i.className="tool-card",i.setAttribute("href",d||"#"),(o.external===!0||o.path&&o.path.startsWith("src/pages/outils"))&&(i.setAttribute("target","_blank"),i.setAttribute("rel","noopener")),o.id==="tinkercad-classes"){const c=document.createElement("img");c.className="selector-icon",c.src="/src/images/logo-tinkercad.png",c.alt=o.name||"Tinkercad",i.appendChild(c)}else if(o.icon&&o.icon.value){const c=document.createElement("div");c.className="tool-card__logo",c.textContent=o.icon.value,i.appendChild(c)}const p=document.createElement("span");if(p.className="tool-card__name",p.textContent=o.name||"",i.appendChild(p),o.description){const c=document.createElement("span");c.className="tool-card__tag",c.textContent=o.description,i.appendChild(c)}h.appendChild(i)}))}catch{}})();function N(e){const n=document.createElement("a");if(n.href=e.url,n.className="tool-card",e.external&&(n.target="_blank",n.rel="noopener"),e.icon.type==="image"){const t=document.createElement("img");t.src=e.icon.src,t.alt=e.icon.alt,t.className="selector-icon",n.appendChild(t)}else if(e.icon.type==="emoji"){const t=document.createElement("div");t.className="tool-card__logo",t.textContent=e.icon.value,n.appendChild(t)}const r=document.createElement("span");r.className="tool-card__name",r.textContent=e.name,n.appendChild(r);const a=document.createElement("span");return a.className="tool-card__tag",a.textContent=e.tag,n.appendChild(a),n}function k(e){const n=document.createElement("a");n.href=e.url,n.className=`correction-card ${e.class}`;const r=document.createElement("div");r.className="correction-card__icon",r.textContent=e.icon,n.appendChild(r);const a=document.createElement("h3");a.className="correction-card__title",a.textContent=e.name,n.appendChild(a);const t=document.createElement("p");return t.className="correction-card__text",t.textContent=e.description,n.appendChild(t),n}function A(e){const n=document.createElement("a");if(n.href=e.url,n.className=`card card--${e.color}`,e.image){const t=document.createElement("img");t.src=e.image,t.alt=e.title,t.className="card__image",n.appendChild(t)}const r=document.createElement("h3");r.className="card__title",r.textContent=e.title,n.appendChild(r);const a=document.createElement("p");return a.className="card__text",a.textContent=e.description,n.appendChild(a),n}function y(e,n){const a={outils:["name","url","tag","icon"],corrections:["name","url","description","icon"],cours:["title","url","description","color"]}[n];return a?a.every(t=>e[t]!==void 0):!1}async function L(e,n=5e3){const r=new AbortController,a=setTimeout(()=>r.abort(),n);try{const t=await fetch(e,{signal:r.signal});return clearTimeout(a),t}catch(t){throw clearTimeout(a),t}}let x=null;async function j(){try{let e=x;if(!e){const t=await L("/data/links.json");if(!t.ok)throw new Error("Impossible de charger les liens");e=await t.json(),x=e}const n=document.querySelector(".tools-grid");n&&e.outils&&(n.textContent="",e.outils.forEach(t=>{y(t,"outils")?n.appendChild(N(t)):console.warn("Lien outil invalide:",t)}));const r=document.querySelector(".correction-grid");r&&e.corrections&&(r.textContent="",e.corrections.forEach(t=>{y(t,"corrections")?r.appendChild(k(t)):console.warn("Lien correction invalide:",t)}));const a=document.querySelector(".cours-grid");a&&e.cours&&(a.textContent="",e.cours.forEach(t=>{y(t,"cours")?a.appendChild(A(t)):console.warn("Lien cours invalide:",t)}))}catch(e){console.error("Erreur chargement des liens:",e)}}const f=()=>{const e=document.querySelector(".header__menu-btn"),n=document.querySelector(".header__nav");!e||!n||(e.addEventListener("click",()=>{const r=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",!r),n.classList.toggle("is-open",!r)}),n.querySelectorAll(".nav__link").forEach(r=>{r.addEventListener("click",()=>{e.setAttribute("aria-expanded","false"),n.classList.remove("is-open")})}),document.addEventListener("click",r=>{!n.contains(r.target)&&!e.contains(r.target)&&(e.setAttribute("aria-expanded","false"),n.classList.remove("is-open"))}))},S=()=>{const e={root:null,rootMargin:"0px",threshold:.1},n=new IntersectionObserver(a=>{a.forEach(t=>{t.isIntersecting&&(t.target.classList.add("is-visible"),n.unobserve(t.target))})},e);document.querySelectorAll(".card, .tool-card, .revision-card, .resource-item").forEach(a=>{a.classList.add("animate-on-scroll"),n.observe(a)})},E=document.createElement("style");E.textContent=`
    /* Animation au scroll */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Header shadow au scroll */
    .header.scrolled {
        box-shadow: var(--shadow-md);
    }
`;document.head.appendChild(E);const T=()=>{const e=document.querySelector(".header");e&&window.addEventListener("scroll",()=>{window.pageYOffset>50?e.classList.add("scrolled"):e.classList.remove("scrolled")},{passive:!0})},I=()=>{const e=document.getElementById("typingText");if(!e)return;const n=["Explorez les différents domaines de la technologie","Accédez aux contenus de cours, aux activités et aux outils","Révisez et validez vos compétences"];let r=0,a=0,t=!1;const l=100,m=100,h=1500,o=200,s=()=>{const d=n[r];t?(e.textContent=d.substring(0,a-1),a--):(e.textContent=d.substring(0,a+1),a++);let i=t?m:l;!t&&a===d.length?(i=h,t=!0):t&&a===0&&(t=!1,r=(r+1)%n.length,i=o),setTimeout(s,i)};setTimeout(s,1e3)};document.addEventListener("DOMContentLoaded",async()=>{try{f(),S(),I(),setTimeout(()=>{T()},100),await j(),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&console.log("🚀 TechnoDocs initialisé")}catch(e){(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&console.error("Erreur initialisation:",e)}});const D=`<header class="header">\r
  <div class="header__container">\r
    <a href="/index.html" class="header__logo">\r
      <span class="logo__icon">⚙️</span>\r
      <span class="logo__text"><strong>TechnoDocs</strong></span>\r
    </a>\r
\r
    <button class="header__menu-btn" aria-label="Menu" aria-expanded="false">\r
      <span></span>\r
      <span></span>\r
      <span></span>\r
    </button>\r
\r
    <!-- Navigation container — links injected dynamically by components.js -->\r
    <nav class="header__nav header__nav--noscript" aria-label="Navigation">\r
      <ul class="nav__list nav__list--static">\r
        <li>\r
          <a class="nav__link" href="/index.html#cours" data-nav-anchor\r
            >📚 Cours</a\r
          >\r
        </li>\r
        <li>\r
          <a class="nav__link" href="/src/pages/activites/devoirs.html"\r
            >📋 Activités</a\r
          >\r
        </li>\r
        <li>\r
          <a class="nav__link" href="/index.html#corrections" data-nav-anchor\r
            >✅ Corrections</a\r
          >\r
        </li>\r
        <li>\r
          <a class="nav__link" href="/index.html#revisions" data-nav-anchor\r
            >🧠 Révisions</a\r
          >\r
        </li>\r
        <li>\r
          <a class="nav__link" href="/index.html#outils" data-nav-anchor\r
            >🛠️ Outils</a\r
          >\r
        </li>\r
      </ul>\r
    </nav>\r
  </div>\r
</header>\r
`,q=`<footer class="footer">\r
    <div class="footer__content">\r
        <div class="footer__brand">\r
            <span class="logo__icon">⚙️</span>\r
            <span>TechnoDocs</span>\r
        </div>\r
        <p class="footer__text">Ressources pédagogiques pour l'enseignement de la Technologie • Collège Moulin à Vent • © 2026 @glbprod</p>\r
        <!-- <div class="footer__links">\r
            <a href="/pages/mentions-legales.html">Mentions légales</a>\r
            <span>•</span>\r
            <a href="/pages/accessibilite.html">Accessibilité</a>\r
        </div> -->\r
    </div>\r
</footer>\r
`,W=`{\r
  "meta": {\r
    "generatedAt": "2026-02-04T00:00:00Z",\r
    "version": "1.1"\r
  },\r
  "cours": [\r
    {\r
      "id": "conception-3d",\r
      "name": "Conception 3D",\r
      "path": "src/pages/cours/conception-3d.html",\r
      "icon": { "type": "emoji", "value": "🏗️" },\r
      "description": "Conception et cahier des charges"\r
    },\r
    {\r
      "id": "reparabilite",\r
      "name": "Réparabilité",\r
      "path": "src/pages/cours/reparabilite.html",\r
      "icon": { "type": "emoji", "value": "🔌" },\r
      "description": "Indice de réparabilité et diagnostic"\r
    }\r
  ],\r
  "devoirs": [\r
    {\r
      "id": "conception3d",\r
      "name": "Conception de votre Objet Technique",\r
      "path": "src/pages/activites/devoirs/conception3d.html",\r
      "icon": { "type": "emoji", "value": "🔧" },\r
      "description": "Devoir guidé : conception et modélisation"\r
    },\r
    {\r
      "id": "modelisation3d",\r
      "name": "Modélisation et Impression 3D de votre Objet Technique",\r
      "path": "src/pages/activites/devoirs/modelisation3d.html",\r
      "icon": { "type": "emoji", "value": "🖨️" },\r
      "description": "Cahier des charges et étapes d'impression"\r
    }\r
  ],\r
  "corrections": [\r
    {\r
      "id": "index-corrections-fa",\r
      "name": "Index Corrections (FA)",\r
      "path": "src/pages/corrections/corrections-activites.html",\r
      "icon": { "type": "emoji", "value": "🗂️" },\r
      "description": "Index des corrections et ressources de type 'Fiches d'activité'"\r
    },\r
    {\r
      "id": "correction-reparabilite",\r
      "name": "Correction Réparabilité",\r
      "path": "src/pages/corrections/correction-reparabilite.html",\r
      "icon": { "type": "emoji", "value": "♻️" },\r
      "description": "Correction détaillée de l'activité Réparabilité"\r
    },\r
    {\r
      "id": "corrections-activites",\r
      "name": "Fiches d'activités",\r
      "path": "src/pages/corrections/corrections-activites.html",\r
      "icon": { "type": "emoji", "value": "📋" },\r
      "description": "Fiches de corrections des évaluations et TP"\r
    },\r
    {\r
      "id": "correction-impression3d",\r
      "name": "Correction Impression 3D",\r
      "path": "src/pages/corrections/correction-impression3d.html",\r
      "icon": { "type": "emoji", "value": "🏗️" },\r
      "description": "Correction de l'activité Impression 3D"\r
    }\r
  ],\r
  "outils": [\r
    {\r
      "id": "task-manager", "name": "Gestionnaire de tâches",\r
      "path": "src/pages/outils/task-manager.html",\r
      "icon": { "type": "emoji", "value": "📅" },\r
      "description": "Organisez vos devoirs et échéances"\r
    },\r
    {\r
      "id": "tinkercad-classes",\r
      "name": "Tinkercad — Classes",\r
      "path": "src/pages/outils/tinkercad-classes.html",\r
      "icon": { "type": "emoji", "value": "🛠️" },\r
      "description": "Connexion aux classes Tinkercad"\r
    },\r
    {\r
      "id": "scratch",\r
      "name": "Scratch",\r
      "url": "https://scratch.mit.edu/",\r
      "external": true,\r
      "icon": { "type": "emoji", "value": "🐱" },\r
      "description": "Programmation visuelle — Scratch"\r
    },\r
    {\r
      "id": "mblock",\r
      "name": "mBlock IDE",\r
      "url": "https://ide.mblock.cc/",\r
      "external": true,\r
      "icon": { "type": "emoji", "value": "🤖" },\r
      "description": "IDE en ligne pour robotique"\r
    },\r
    {\r
      "id": "vittascience",\r
      "name": "Vittascience",\r
      "url": "https://fr.vittascience.com/",\r
      "external": true,\r
      "icon": { "type": "emoji", "value": "🔬" },\r
      "description": "Ressources Arduino / micro:bit"\r
    },\r
    {\r
      "id": "trinket",\r
      "name": "Trinket — Python en ligne",\r
      "url": "https://trinket.io/",\r
      "external": true,\r
      "icon": { "type": "emoji", "value": "🐍" },\r
      "description": "Exécutez du Python dans le navigateur"\r
    }\r
  ],\r
\r
  "flashcards": [\r
    {\r
      "id": "flashcards-index",\r
      "name": "Flashcards",\r
      "path": "src/pages/flashcards/flashcards.html",\r
      "icon": { "type": "emoji", "value": "🗒️" },\r
      "description": "Sélectionne un thème pour réviser"\r
    },\r
    {\r
      "id": "modelisation3d",\r
      "name": "Modélisation 3D (Flashcards)",\r
      "path": "src/pages/flashcards/modelisation3d.html",\r
      "icon": { "type": "emoji", "value": "🏗️" },\r
      "description": "Cartes pour la modélisation 3D"\r
    },\r
    {\r
      "id": "flash-reparabilite",\r
      "name": "Réparabilité (Flashcards)",\r
      "path": "src/pages/flashcards/reparabilite.html",\r
      "icon": { "type": "emoji", "value": "🔌" },\r
      "description": "Cartes sur l'indice de réparabilité"\r
    }\r
  ],\r
  "activites": [\r
    {\r
      "id": "activites-index",\r
      "name": "Activités",\r
      "path": "src/pages/activites/index.html",\r
      "icon": { "type": "emoji", "value": "📋" },\r
      "description": "Devoirs en ligne et exercices pratiques"\r
    }\r
  ]\r
}\r
`;function b(){const e=window.location.pathname||"/";if(e==="/"||e.endsWith("/index.html")||e.endsWith("index.html"))return"";const n=e.replace(/^\/+/,"").split("/").filter(Boolean);n.length&&n[n.length-1].endsWith(".html")&&n.pop();const r=Math.max(0,n.length-0);return r===0?"":"../".repeat(r)}function O(e){return String(e||"").replace(/^\/+/,"")}function w(e,n){if(!e)return;const t=new DOMParser().parseFromString(n,"text/html").body.firstElementChild;t&&e.replaceWith(t)}async function M(e){try{const n=document.getElementById("main-nav");if(!n)return;const r=b(),a=window.location.pathname||"/",t=window.location.hash||"",l=[{id:"idx-cours",name:"📚 Cours",href:"#cours"},{id:"idx-revisions",name:"🧠 Révisions",href:"#revisions"},{id:"idx-corrections",name:"✅ Corrections",href:"#corrections"},{id:"idx-outils",name:"🛠️ Outils",href:"#outils"}],m=document.createElement("ul");m.className="nav__list nav__list--static",l.forEach(s=>{const d=document.createElement("li"),i=document.createElement("a");i.className="nav__link",i.setAttribute("data-nav-id",s.id),i.textContent=s.name;const p=(s.href||"").startsWith("#")?s.href:"#"+String(s.href||"").replace(/^#+/,"");let c=p;const v=a==="/"||a.endsWith("/index.html")||a.endsWith("index.html");v||(c=(r||""||"")+"index.html"+p),i.setAttribute("href",c);try{v&&t&&t.includes(p.replace(/^#/,""))&&i.classList.add("is-active")}catch{}d.appendChild(i),m.appendChild(d)});const h=document.createElement("ul");if(h.className="nav__list nav__list--dynamic",["cours","devoirs","outils"].forEach(s=>{(e[s]||[]).filter(i=>i.visible!==!1).forEach(i=>{const p=document.createElement("li"),c=document.createElement("a");c.className="nav__link";const v=i.path||i.url||"",u=String(v||"");let g=u;!g.match(/^https?:\/\//i)&&!g.startsWith("/")&&(g=r+u),c.setAttribute("href",g),c.setAttribute("data-nav-id",i.id||""),c.textContent=(i.icon&&i.icon.value?i.icon.value+" ":"")+(i.name||"");try{const _=a.replace(/^\/+/,""),C=O(u);(C&&_.endsWith(C)||_&&C&&_.includes(C))&&c.classList.add("is-active")}catch{}p.appendChild(c),h.appendChild(p)})}),n.innerHTML="",n.appendChild(m),h.children.length>0){const s=document.createElement("div");s.className="nav__divider",n.appendChild(s),n.appendChild(h)}typeof f=="function"&&f()}catch(n){(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&console.error("Erreur génération menu:",n)}}async function P(){const e=document.getElementById("header-placeholder");if(e)try{w(e,D);try{const n=b(),r=window.location.pathname||"/",a=r==="/"||r.endsWith("/index.html")||r.endsWith("index.html");Array.from(document.querySelectorAll("[data-nav-anchor]")).forEach(l=>{if(!l.dataset.navAnchorProcessed){try{const m=l.getAttribute("href")||"";if(m.startsWith("#")&&!a){const h=(n||"")+"index.html"+m;l.setAttribute("href",h)}}catch{}l.dataset.navAnchorProcessed="1"}})}catch(n){window.location.hostname==="localhost"&&console.warn("nav anchor processing failed",n)}try{const n=JSON.parse(W||"{}");await M(n)}catch{typeof f=="function"&&f()}}catch(n){const r=document.createElement("header");r.className="header";const a=document.createElement("div");a.className="header__container";const t=document.createElement("p");t.textContent="Erreur de chargement",a.appendChild(t),r.appendChild(a),e.replaceWith(r),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&console.error("Erreur header:",n)}}async function F(){const e=document.getElementById("footer-placeholder");if(e)try{w(e,q)}catch(n){const r=document.createElement("footer");r.className="footer";const a=document.createElement("p");a.textContent="Erreur de chargement",r.appendChild(a),e.replaceWith(r),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&console.error("Erreur footer:",n)}}async function H(){await Promise.all([P(),F()])}document.addEventListener("DOMContentLoaded",async()=>{await H()});
