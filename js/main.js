// ===== HARRYZEDHUGHES.COM ARCHIVE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION HIGHLIGHTING =====
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link href matches current path
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add('active');
            }
            
            // Handle home page
            if ((currentPath === '/' || currentPath.endsWith('index.html')) && 
                (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/')) {
                link.classList.add('active');
            }
        });
    }

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== TIMELINE PERIOD ANIMATIONS =====
    function setupTimelineAnimations() {
        const timelinePeriods = document.querySelectorAll('.timeline-period');
        
        if (timelinePeriods.length === 0) return;

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

        timelinePeriods.forEach((period, index) => {
            period.style.opacity = '0';
            period.style.transform = 'translateY(30px)';
            period.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(period);
        });
    }

    // ===== CARD HOVER EFFECTS =====
    function setupCardEffects() {
        const cards = document.querySelectorAll('.archive-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // ===== EXTERNAL LINK HANDLING =====
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(link => {
            // Add external link indicator
            if (!link.textContent.includes('arized.art')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Special handling for arized.art links
            if (link.href.includes('arized.art')) {
                link.addEventListener('click', function(e) {
                    // Track transition to current site
                    console.log('Navigating to current site:', this.href);
                });
            }
        });
    }

    // ===== IMAGE LAZY LOADING =====
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }

    // ===== SEARCH FUNCTIONALITY (if search input exists) =====
    function setupSearch() {
        const searchInput = document.getElementById('archive-search');
        if (!searchInput) return;

        const searchableItems = document.querySelectorAll('[data-searchable]');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);
                
                item.style.display = isVisible ? '' : 'none';
            });
        });
    }

    // ===== MOBILE NAVIGATION TOGGLE =====
    function setupMobileNav() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // ===== BREADCRUMB GENERATION =====
    function generateBreadcrumbs() {
        const breadcrumbContainer = document.getElementById('breadcrumbs');
        if (!breadcrumbContainer) return;

        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment !== '');
        
        let breadcrumbHTML = '<a href="index.html">Archive Home</a>';
        
        if (segments.length > 0) {
            const currentPage = segments[segments.length - 1].replace('.html', '');
            const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
            breadcrumbHTML += ` <span>></span> <span>${pageTitle}</span>`;
        }
        
        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }

    // ===== FADE IN ANIMATION FOR CONTENT =====
    function setupContentFadeIn() {
        const contentSections = document.querySelectorAll('.content-section');
        
        contentSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }

    // ===== PRINT FUNCTIONALITY =====
    function setupPrintStyles() {
        const printBtn = document.getElementById('print-page');
        if (!printBtn) return;

        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // ===== INITIALIZE ALL FUNCTIONS =====
    highlightCurrentPage();
    setupSmoothScrolling();
    setupTimelineAnimations();
    setupCardEffects();
    setupExternalLinks();
    setupLazyLoading();
    setupSearch();
    setupMobileNav();
    generateBreadcrumbs();
    setupContentFadeIn();
    setupPrintStyles();

    // ===== PAGE LOAD TRACKING =====
    console.log('Archive page loaded:', document.title);
});

// ===== UTILITY FUNCTIONS =====

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Debounce function for search
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate any layout-dependent elements
    const cards = document.querySelectorAll('.archive-card');
    cards.forEach(card => {
        card.style.transform = 'translateY(0)';
    });
}, 250));
