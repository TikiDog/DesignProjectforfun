// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('id', 'scrollToTop');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.backgroundColor = '#2980b9';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.backgroundColor = '#3498db';
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and sections
document.querySelectorAll('.project-card, .project-showcase').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (for future enhancement)
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('class', 'menu-toggle');
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    `;

    const navbar = document.querySelector('.navbar .container');
    navbar.insertBefore(menuToggle, navMenu);

    // Show menu toggle on mobile
    const checkWidth = () => {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);

    menuToggle.addEventListener('click', () => {
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });
};

// Initialize mobile menu
createMobileMenu();

// Log page load
console.log('Sherry Jennings Portfolio - Loaded Successfully');

// ========================================
// IMAGE LIGHTBOX FUNCTIONALITY
// ========================================

// Create lightbox element
const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
};

// Initialize lightbox
const lightbox = createLightbox();
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// Open lightbox
const openLightbox = (imgSrc, imgAlt) => {
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = imgAlt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

// Close lightbox
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
};

// Add click handlers to all portfolio images
document.querySelectorAll('.portfolio-image').forEach(img => {
    img.addEventListener('click', (e) => {
        // Skip if image is inside a link (for PDF links)
        if (img.closest('a[href$=".pdf"]')) {
            return;
        }
        // Only open if image loaded successfully
        if (!img.parentElement.classList.contains('no-image')) {
            e.preventDefault();
            openLightbox(img.src, img.alt);
        }
    });
});

// Close lightbox on close button click
lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
