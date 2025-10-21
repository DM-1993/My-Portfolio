// Professional Sidebar Portfolio - JavaScript

// Navigation State Management
let currentSection = 'overview';

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeAnimations();
    initializeInteractions();
    
    // Show default section
    showSection('overview');
});

// Navigation Functions
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

function showSection(sectionId) {
    // Hide all panels
    const panels = document.querySelectorAll('.content-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show target panel
    const targetPanel = document.getElementById(sectionId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });
    
    // Update current section
    currentSection = sectionId;
    
    // Trigger entrance animations
    animateContentEntrance();
}

// Mobile Menu Functions
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });
}

function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('active');
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe animatable elements
    const animatableElements = document.querySelectorAll(
        '.overview-card, .case-study-card, .project-card, .thought-card, .timeline-item, .interest-card'
    );
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

function animateContentEntrance() {
    const activePanel = document.querySelector('.content-panel.active');
    if (!activePanel) return;
    
    // Reset animations
    const animatedElements = activePanel.querySelectorAll(
        '.overview-card, .case-study-card, .project-card, .thought-card, .timeline-item, .interest-card'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Interactive Functions
function initializeInteractions() {
    // Hover effects for cards
    initializeCardHovers();
    
    // Copy to clipboard functionality
    initializeCopyToClipboard();
    
    // Smooth scrolling for internal navigation
    initializeSmoothScrolling();
    
    // Dynamic typing effect for overview
    initializeTypingEffect();
    
    // Status indicator animation
    initializeStatusIndicator();
}

function initializeCardHovers() {
    const cards = document.querySelectorAll(
        '.overview-card, .case-study-card, .project-card, .thought-card, .timeline-content, .interest-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initializeCopyToClipboard() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
                e.preventDefault();
                
                const valueElement = this.querySelector('.method-value');
                if (valueElement) {
                    const text = valueElement.textContent;
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyFeedback(valueElement);
                    }).catch(() => {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showCopyFeedback(valueElement);
                    });
                }
            }
        });
    });
}

function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.color = 'var(--success-color)';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
    }, 2000);
}

function initializeSmoothScrolling() {
    // Smooth scrolling within panels
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initializeTypingEffect() {
    const titleElement = document.querySelector('#overview .panel-title');
    if (titleElement) {
        const originalText = titleElement.textContent;
        let currentText = '';
        let charIndex = 0;
        
        function typeCharacter() {
            if (charIndex < originalText.length) {
                currentText += originalText.charAt(charIndex);
                titleElement.textContent = currentText;
                charIndex++;
                setTimeout(typeCharacter, 50);
            }
        }
        
        // Start typing effect when overview section is shown
        if (currentSection === 'overview') {
            titleElement.textContent = '';
            setTimeout(typeCharacter, 500);
        }
    }
}

function initializeStatusIndicator() {
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        // Add subtle pulse animation
        setInterval(() => {
            statusIndicator.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusIndicator.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
}

// Utility Functions
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

// Performance optimizations
function optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('paused-animations');
        } else {
            document.body.classList.remove('paused-animations');
        }
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Global navigation function for CTA buttons
window.showSection = showSection;

// Enhanced console message for developers
console.log(`
🎯 Welcome to Deepthi's Professional Portfolio!

📊 Portfolio Performance:
├── 9+ years PM experience
├── 200K+ users impacted  
├── 80% adoption increase achieved
└── ₹1.5L+ side business revenue

🔧 Technical Implementation:
├── Sidebar + Content Panel Layout
├── Professional Design System
├── Responsive & Accessible
└── Optimized Performance

💼 Ready to discuss opportunities!
📧 deepthimangipudi@gmail.com
🔗 linkedin.com/in/lakshmi-deepthi-mangipudi-96b77472/

Built with modern web standards and attention to detail.
`);

// Analytics and tracking (placeholder for future implementation)
function trackNavigation(section) {
    // Placeholder for analytics tracking
    console.log(`Navigation: ${section}`);
}

// Add tracking to navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            trackNavigation(section);
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for section navigation (optional enhancement)
    if (e.altKey) {
        const sections = ['overview', 'about', 'experience', 'portfolio', 'projects', 'thoughts', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    }
});

// Progressive Enhancement - Add advanced features if supported
if ('IntersectionObserver' in window) {
    // Enhanced scroll-based animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-viewport');
            }
        });
    });
    
    // Observe all major sections
    document.querySelectorAll('.content-panel').forEach(panel => {
        scrollObserver.observe(panel);
    });
}

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Placeholder for service worker registration
        console.log('Service Worker support detected');
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        initializeNavigation,
        initializeMobileMenu
    };
}