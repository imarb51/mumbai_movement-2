// Founder Modal Functions - Must be defined first for inline onclick handlers
function openFounderModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeFounderModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Make modal functions globally available
window.openFounderModal = openFounderModal;
window.closeFounderModal = closeFounderModal;

// FAQ Toggle Function
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Make FAQ function globally available
window.toggleFAQ = toggleFAQ;

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link (but NOT the dropdown toggle)
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if it's the dropdown toggle
        if (link.classList.contains('dropdown-toggle')) {
            e.stopPropagation();
            return;
        }
        // Don't close for dropdown menu sub-links — let the dropdown handler close the dropdown,
        // but DO close the sidebar
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(element => {
    observer.observe(element);
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Program cards hover effect - add glow
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(91, 157, 217, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Level cards animation - stagger effect
const levelItems = document.querySelectorAll('.level-item');
const levelObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);

levelItems.forEach(item => {
    levelObserver.observe(item);
});

// Add cursor effect on buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function(e) {
        this.style.transform = '';
    });
});

// Lazy loading for images (if you add more images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => imageObserver.observe(img));
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent scroll jank on mobile
let ticking = false;

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Perform scroll operations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll);

// Footer year update
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Mumbai Movement Academy. All rights reserved.`;
}

// Easter egg - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    highlightNavLink();
});

window.addEventListener('scroll', debouncedScroll);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Horizontal Scroll Functionality
function initHorizontalScroll() {
    const scrollContainers = document.querySelectorAll('.horizontal-scroll-container, .portrait-video-grid');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse drag scrolling
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch scrolling for mobile
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].pageX;
            const walk = (touchStartX - touchX) * 1.5;
            container.scrollLeft = touchScrollLeft + walk;
        }, { passive: true });
    });
    
    // Arrow button navigation
    const scrollArrows = document.querySelectorAll('.scroll-arrow');
    
    scrollArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const scrollId = arrow.getAttribute('data-scroll');
            const container = document.getElementById(scrollId);
            
            if (!container) return;
            
            const scrollAmount = 400;
            const direction = arrow.classList.contains('left') ? -1 : 1;
            
            container.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        });
    });
    
    // Update arrow visibility based on scroll position
    function updateArrowVisibility() {
        scrollContainers.forEach(container => {
            const id = container.id;
            if (!id) return;
            
            const leftArrow = document.querySelector(`.scroll-arrow.left[data-scroll="${id}"]`);
            const rightArrow = document.querySelector(`.scroll-arrow.right[data-scroll="${id}"]`);
            
            if (!leftArrow || !rightArrow) return;
            
            // Check if at start
            if (container.scrollLeft <= 10) {
                leftArrow.style.opacity = '0.3';
                leftArrow.style.pointerEvents = 'none';
            } else {
                leftArrow.style.opacity = '1';
                leftArrow.style.pointerEvents = 'auto';
            }
            
            // Check if at end
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft >= maxScroll - 10) {
                rightArrow.style.opacity = '0.3';
                rightArrow.style.pointerEvents = 'none';
            } else {
                rightArrow.style.opacity = '1';
                rightArrow.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Add scroll event listeners
    scrollContainers.forEach(container => {
        container.addEventListener('scroll', debounce(updateArrowVisibility, 50));
    });
    
    // Initial check
    updateArrowVisibility();
}

// Initialize horizontal scroll when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHorizontalScroll);
} else {
    initHorizontalScroll();
}

console.log('🥋 Mumbai Movement Academy - Website Loaded Successfully!');

// Auto-scroll testimonials on mobile
function initTestimonialAutoScroll() {
    // Only run on mobile devices
    if (window.innerWidth > 768) return;

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per interval
    const scrollInterval = 30; // milliseconds

    function autoScroll() {
        if (window.innerWidth > 768) {
            // Stop auto-scroll on desktop
            return;
        }

        const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;
        
        scrollPosition += scrollSpeed;
        
        // Reset to start when reaching the end
        if (scrollPosition >= maxScroll) {
            scrollPosition = 0;
        }
        
        testimonialsGrid.scrollLeft = scrollPosition;
    }

    // Start auto-scroll
    let autoScrollIntervalId = setInterval(autoScroll, scrollInterval);

    // Pause auto-scroll when user touches/drags
    let isUserInteracting = false;
    
    testimonialsGrid.addEventListener('touchstart', () => {
        isUserInteracting = true;
        clearInterval(autoScrollIntervalId);
    });

    testimonialsGrid.addEventListener('touchend', () => {
        setTimeout(() => {
            isUserInteracting = false;
            scrollPosition = testimonialsGrid.scrollLeft;
            autoScrollIntervalId = setInterval(autoScroll, scrollInterval);
        }, 3000); // Resume after 3 seconds
    });

    // Stop auto-scroll on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            clearInterval(autoScrollIntervalId);
        } else if (!isUserInteracting) {
            clearInterval(autoScrollIntervalId);
            autoScrollIntervalId = setInterval(autoScroll, scrollInterval);
        }
    });
}

// Initialize testimonial auto-scroll
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialAutoScroll);
} else {
    initTestimonialAutoScroll();
}

// ==========================================
// DROPDOWN MENU (Mobile)
// ==========================================
(function() {
    function initDropdown() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.closest('.nav-dropdown');
                
                // Close other dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(dd => {
                    if (dd !== parent) dd.classList.remove('active');
                });
                
                parent.classList.toggle('active');
            });
        });

        // Close dropdown when clicking outside (desktop only)
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown') && !e.target.closest('.nav-menu')) {
                document.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('active');
                });
            }
        });

        // Close dropdown + sidebar when a dropdown sub-link is clicked
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                document.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('active');
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdown);
    } else {
        initDropdown();
    }
})();


/* ========================================
   OFFER STRIP — Dismiss & localStorage
   ======================================== */
(function () {
    const strip = document.getElementById('offerStrip');
    if (!strip) return;

    // Check localStorage to see if already dismissed
    if (sessionStorage.getItem('offerStripDismissed') === 'true') {
        strip.style.display = 'none';
    } else {
        strip.style.display = 'flex';
        document.body.classList.add('offer-strip-visible');
    }

    const closeBtn = strip.querySelector('.offer-strip-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            strip.style.display = 'none';
            document.body.classList.remove('offer-strip-visible');
            sessionStorage.setItem('offerStripDismissed', 'true');
        });
    }
})();


/* ========================================
   HERO IMAGE SLIDER — Auto-play & Arrows
   ======================================== */
(function () {
    document.querySelectorAll('.hero').forEach(function (hero) {
        var slides = hero.querySelectorAll('.hero-slide');
        var leftBtn = hero.querySelector('.hero-arrow-left');
        var rightBtn = hero.querySelector('.hero-arrow-right');
        if (slides.length < 2) return;

        var current = 0;
        var total = slides.length;
        var autoInterval = 5000;
        var timer;

        function goTo(index) {
            slides[current].classList.remove('active');
            current = (index + total) % total;
            slides[current].classList.add('active');
        }

        function next() {
            goTo(current + 1);
        }

        function prev() {
            goTo(current - 1);
        }

        function startAuto() {
            clearInterval(timer);
            timer = setInterval(next, autoInterval);
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', function () {
                next();
                startAuto();
            });
        }

        if (leftBtn) {
            leftBtn.addEventListener('click', function () {
                prev();
                startAuto();
            });
        }

        // Start auto-play
        startAuto();
    });
})();


/* ========================================
   FOUNDER CARD — Popup Modal
   ======================================== */
(function () {
    var founderData = {
        rishi: {
            name: 'Dr. Rishi Prasad',
            role: 'Co-Founder & Head Coach',
            img: 'img/DrRishiPrasad.jpg',
            needsRotation: true,
            text: '<p>Dr. Rishi Prasad is a certified sports physiotherapist with over 15 years of experience in movement science. He pioneered the integration of parkour with rehabilitation techniques, creating a unique training methodology that emphasizes injury prevention and functional fitness.</p><p>Under his guidance, Mumbai Movement Academy has become a leading institution for movement education in India. His philosophy centers on making movement accessible to everyone, regardless of age or fitness level.</p><p><strong>Certifications:</strong> Sports Physiotherapy, Parkour Coaching Level 3, Movement & Mobility Specialist</p>'
        },
        cyrus: {
            name: 'Cyrus Khan',
            role: 'Co-Founder & Movement Director',
            img: 'img/CyrusKhan.jpg',
            needsRotation: true,
            text: '<p>Cyrus Khan is one of India\'s first professional parkour athletes and has represented the country at international competitions. With expertise in freerunning, calisthenics, and stunt coordination, he brings a creative and dynamic approach to movement training.</p><p>He has worked with major brands like Red Bull and Nike, and has coached elite performers including Bollywood stunt teams and Indian Army Special Forces. His innovative training methods blend athleticism with artistry.</p><p><strong>Achievements:</strong> International Parkour Champion, Red Bull Athlete, Bollywood Stunt Coordinator</p>'
        },
        krishna: {
            name: 'Krishna Mehta',
            role: 'Co-Founder & Business Development',
            img: 'img/KrishnaMehta.jpg',
            needsRotation: false,
            text: '<p>Krishna Mehta brings her MBA and corporate strategy background to scale Mumbai Movement Academy from a single studio to five locations across Mumbai. Her vision extends beyond just training facilities — she\'s building a movement culture.</p><p>She has established partnerships with schools, universities, and corporate organizations, making movement training accessible to thousands of individuals across different demographics. Her leadership has been instrumental in MMA\'s growth and community impact.</p><p><strong>Expertise:</strong> Business Strategy, Partnership Development, Community Building</p>'
        }
    };

    var modal = document.getElementById('founderModal');
    if (!modal) return;

    var modalImg = document.getElementById('founderModalImg');
    var modalName = document.getElementById('founderModalName');
    var modalRole = document.getElementById('founderModalRole');
    var modalText = document.getElementById('founderModalText');
    var closeBtn = modal.querySelector('.founder-modal-close');

    function openModal(key) {
        var data = founderData[key];
        if (!data) return;
        modalImg.src = data.img;
        modalImg.alt = data.name;
        modalName.textContent = data.name;
        modalRole.textContent = data.role;
        modalText.innerHTML = data.text;
        // Toggle rotation class for modal image
        var imgContainer = modalImg.closest('.founder-modal-image');
        if (imgContainer) {
            if (data.needsRotation) {
                imgContainer.classList.add('needs-rotation');
            } else {
                imgContainer.classList.remove('needs-rotation');
            }
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.founder-card').forEach(function (card) {
        card.addEventListener('click', function () {
            openModal(this.getAttribute('data-founder'));
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
})();


/* ========================================
   LEAD CAPTURE POPUP — Trigger & Close
   ======================================== */
(function () {
    const overlay = document.getElementById('leadPopup');
    if (!overlay) return;

    const closeBtn = overlay.querySelector('.lead-popup-close');
    const form = document.getElementById('leadPopupForm');
    let popupShown = false;

    function showPopup() {
        if (popupShown) return;
        popupShown = true;
        overlay.classList.add('active');
    }

    function hidePopup() {
        overlay.classList.remove('active');
    }

    // Show popup after 60 seconds
    setTimeout(showPopup, 60000);

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) hidePopup();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') hidePopup();
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const name = data.get('name') || form.querySelector('input[placeholder*="Name"]').value;

            // Build WhatsApp message
            let msg = 'Hi! I\'d like to claim the 20% new student offer.\n';
            msg += 'Name: ' + (name || 'Not provided') + '\n';

            const phone = form.querySelector('input[type="tel"]');
            if (phone && phone.value) msg += 'Phone: ' + phone.value + '\n';

            const email = form.querySelector('input[type="email"]');
            if (email && email.value) msg += 'Email: ' + email.value + '\n';

            const age = form.querySelector('select');
            if (age && age.value) msg += 'Age Group: ' + age.value + '\n';

            const location = form.querySelectorAll('select')[1] || form.querySelector('select[name="location"]');
            if (location && location.value) msg += 'Location: ' + location.value + '\n';

            const waLink = 'https://wa.me/919876543210?text=' + encodeURIComponent(msg);
            window.open(waLink, '_blank');
            hidePopup();
            form.reset();
        });
    }
})();


/* ========================================
   CAREERS FORM HANDLER
   ======================================== */
(function () {
    const form = document.getElementById('careersForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.querySelector('input[placeholder*="Full Name"]');
        const phone = form.querySelector('input[type="tel"]');
        const email = form.querySelector('input[type="email"]');
        const interest = form.querySelector('select');
        const message = form.querySelector('textarea');

        let msg = 'Hi, I\'m interested in joining the Mumbai Movement Academy team.\n\n';
        if (name && name.value) msg += 'Name: ' + name.value + '\n';
        if (phone && phone.value) msg += 'Phone: ' + phone.value + '\n';
        if (email && email.value) msg += 'Email: ' + email.value + '\n';
        if (interest && interest.value) msg += 'Area of Interest: ' + interest.value + '\n';
        if (message && message.value) msg += 'Message: ' + message.value + '\n';

        const waLink = 'https://wa.me/919876543210?text=' + encodeURIComponent(msg);
        window.open(waLink, '_blank');
        form.reset();
    });
})();


/* ========================================
   PHONE NUMBER FORMATTING
   ======================================== */
document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () {
        // Remove non-digits
        this.value = this.value.replace(/[^\d+\-\s()]/g, '');
    });
});