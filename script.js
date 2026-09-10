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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Log page load
console.log('Sherry Jennings Portfolio - Loaded Successfully');

// ========================================
// PDF LIGHTBOX FUNCTIONALITY
// ========================================

// Create PDF lightbox element
const createPdfLightbox = () => {
    const pdfLightbox = document.createElement('div');
    pdfLightbox.className = 'pdf-lightbox';
    pdfLightbox.innerHTML = `
        <div class="pdf-lightbox-content">
            <button class="pdf-lightbox-close" aria-label="Close PDF viewer">&times;</button>
            <iframe src="" title="PDF Viewer"></iframe>
        </div>
    `;
    document.body.appendChild(pdfLightbox);
    return pdfLightbox;
};

// Initialize PDF lightbox
const pdfLightbox = createPdfLightbox();
const pdfIframe = pdfLightbox.querySelector('iframe');
const pdfLightboxClose = pdfLightbox.querySelector('.pdf-lightbox-close');

// Open PDF lightbox
const openPdfLightbox = (pdfUrl) => {
    pdfIframe.src = pdfUrl;
    pdfLightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

// Close PDF lightbox
const closePdfLightbox = () => {
    pdfLightbox.classList.remove('active');
    pdfIframe.src = ''; // Clear iframe to stop loading
    document.body.style.overflow = ''; // Restore scrolling
};

// Add click handlers to all PDF links
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openPdfLightbox(link.href);
    });
});

// Close PDF lightbox on close button click
pdfLightboxClose.addEventListener('click', closePdfLightbox);

// Close PDF lightbox when clicking outside the iframe
pdfLightbox.addEventListener('click', (e) => {
    if (e.target === pdfLightbox) {
        closePdfLightbox();
    }
});

// Close PDF lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfLightbox.classList.contains('active')) {
        closePdfLightbox();
    }
});

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
// JavaScript Document