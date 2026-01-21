/**
 * TechnoDocs - Application principale
 * JavaScript ES6+ avec modules
 */

// ============================================
// Navigation Mobile
// ============================================
const initMobileNav = () => {
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');
    
    if (!menuBtn || !nav) return;
    
    menuBtn.addEventListener('click', () => {
        const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isOpen);
        nav.classList.toggle('is-open', !isOpen);
    });
    
    // Fermer le menu au clic sur un lien
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        });
    });
    
    // Fermer au clic en dehors
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
        }
    });
};

// ============================================
// Animation au scroll (Intersection Observer)
// ============================================
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
    
    // Observer les éléments avec animation
    document.querySelectorAll('.card, .tool-card, .revision-card, .resource-item')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
};

// Style pour les éléments visibles (ajouté via JS pour éviter le FOUC)
const style = document.createElement('style');
style.textContent = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// Header scroll effect
// ============================================
const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
};

// ============================================
// Initialisation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollAnimations();
    initHeaderScroll();

    console.log('🚀 TechnoDocs initialisé');
});

// Export pour utilisation modulaire future
export { initMobileNav, initScrollAnimations, initHeaderScroll };