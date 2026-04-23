// ==========================================
// SCROLL ANIMATIONS
// ==========================================

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR BEHAVIOR ON SCROLL
// ==========================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide nav on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// PROJECT CARD TILT EFFECT (subtle)
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');
const sectionPositions = [];

// Calculate section positions
function calculateSectionPositions() {
    sectionPositions.length = 0;
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionPositions.push({
            id: section.id,
            offset: section.offsetTop - 150
        });
    });
}

// Update active nav link
function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset;
    
    let currentSection = '';
    
    sectionPositions.forEach(section => {
        if (scrollPosition >= section.offset) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize
window.addEventListener('load', calculateSectionPositions);
window.addEventListener('resize', calculateSectionPositions);
window.addEventListener('scroll', updateActiveNavLink);

// ==========================================
// TYPING ANIMATION FOR HERO (optional)
// ==========================================

const heroAccent = document.querySelector('.hero-accent');
if (heroAccent) {
    const originalText = heroAccent.textContent;
    heroAccent.textContent = '';
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroAccent.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ==========================================
// CURSOR TRAIL EFFECT (subtle)
// ==========================================

const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
};

// Add cursor trail CSS
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
        pointer-events: none;
        opacity: 0.3;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    body:hover .cursor-trail {
        opacity: 0.5;
    }
`;
document.head.appendChild(cursorStyle);

// Initialize cursor trail (only on desktop)
if (window.innerWidth > 768) {
    createCursorTrail();
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler for resize
window.addEventListener('resize', debounce(() => {
    calculateSectionPositions();
}, 250));

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #ff9f40;');
console.log('%cSi vous regardez ici, vous êtes probablement un recruteur curieux ou un développeur.', 'font-size: 14px; color: #a0a0a0;');
console.log('%cN\'hésitez pas à me contacter ! 🚀', 'font-size: 14px; color: #4a9eff;');
