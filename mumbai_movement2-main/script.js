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



