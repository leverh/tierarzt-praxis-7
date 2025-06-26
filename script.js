document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const rootElement = document.documentElement;
    const modal = document.getElementById('portfolioModal');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('modalCancel');
    const exploreBtn = document.getElementById('modalExplore');
    const body = document.body;
    const copyrightElement = document.querySelector('.footer-bottom p');

    if (copyrightElement) {
        const startYear = 2025;
        const currentYear = new Date().getFullYear();
        
        let yearText;
        if (currentYear > startYear) {
            yearText = `${startYear}-${currentYear}`;
        } else {
            yearText = startYear;
        }
        
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace(
            '2024',
            yearText
        );
    } 

    // Modal on page load
    setTimeout(() => {
        showModal();
    }, 800);
    
    function showModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        body.classList.add('modal-open');
        
        // Focus management - accessibility
        modal.querySelector('.portfolio-modal').focus();
    }
    
    function hideModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');

        // Session storage preference
        sessionStorage.setItem('portfolioModalSeen', 'true');
    }
    
    // Close button events
    closeBtn.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);
    exploreBtn.addEventListener('click', hideModal);
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
    
    // Trap focus within modal when open
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    if (sessionStorage.getItem('portfolioModalSeen')) {
        return;
    }

    // Show/hide button
    function handleScroll() {
        const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        const scrolled = rootElement.scrollTop;
        
        // Button after scrolling 300px
        if (scrolled > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Progress indicator - to be implemented in the future
        if (scrollToTopBtn.classList.contains('progress')) {
            const scrollProgress = (scrolled / scrollTotal) * 100;
            rootElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
        }
    }
    
    // Scroll to top
    function scrollToTop() {
        rootElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    scrollToTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard accessibility
    scrollToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking overlay
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Existing smooth scroll and navbar scroll effects...
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observeElements = document.querySelectorAll('.service-card, .team-member, .feature');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});