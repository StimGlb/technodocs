// TechnoDocs - Application principale
// Gestion de la navigation, animations et interactions

import { loadLinks } from './links-loader.js';

// ===========================
// 1. Gestion de la navigation mobile
// ===========================
const initNavigation = () => {
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');

    if (!menuBtn || !nav) return;

    // Toggle menu mobile
    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('is-open', !isExpanded);
    });

    // Fermer le menu au clic sur un lien
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        }
    });
};

// ===========================
// 2. Animations au scroll (Intersection Observer)
// ===========================
const initScrollAnimations = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments avec animation au scroll
    // Utilise les classes CSS au lieu de styles inline pour respecter la CSP
    const elements = document.querySelectorAll('.card, .tool-card, .revision-card, .resource-item');
    elements.forEach(el => {
        // Ajouter la classe 'animate-on-scroll' au lieu de styles inline
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
};

// Injecter les styles CSS pour les animations (au lieu de styles inline)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
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
`;
document.head.appendChild(styleSheet);

// ===========================
// 3. Effet d'ombre sur le header au scroll
// ===========================
const initHeaderScroll = () => {
    const header = document.querySelector('.header');

    // Vérifier que le header existe avant d'ajouter l'événement
    if (!header) {
        // Le header n'est pas encore chargé, on réessaiera après le chargement des composants
        return;
    }

    window.addEventListener('scroll', () => {
        // Utilise une classe CSS au lieu de style inline pour respecter la CSP
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
};

// ===========================
// 4. Initialisation principale
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialiser la navigation
        initNavigation();

        // Initialiser les animations au scroll
        initScrollAnimations();

        // Initialiser l'effet de scroll sur le header
        // On réessaie après un court délai pour s'assurer que le header est chargé
        setTimeout(() => {
            initHeaderScroll();
        }, 100);

        // Charger les liens dynamiques
        await loadLinks();

        // Log de succès en dev uniquement
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('🚀 TechnoDocs initialisé');
        }
    } catch (error) {
        // Log d'erreur en dev uniquement
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Erreur initialisation:', error);
        }
    }
});

// Exporter les fonctions pour utilisation modulaire
export { initNavigation, initScrollAnimations, initHeaderScroll };
