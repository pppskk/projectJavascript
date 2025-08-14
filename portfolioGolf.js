// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Global variables
    let isScrolling = false;
    let ticking = false;
    
    // Utility function for throttling
    function throttle(func, delay) {
        if (ticking) return;
        ticking = true;
        setTimeout(() => {
            func();
            ticking = false;
        }, delay);
    }

    // Smooth scroll behavior for navigation links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    };

    // Navigation scroll effect and back to top button
    const initScrollEffects = () => {
        const nav = document.querySelector('nav');
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            throttle(() => {
                const scrollY = window.scrollY;
                
                // Navigation background effect
                if (scrollY > 100) {
                    nav.style.background = 'rgba(255, 255, 255, 0.98)';
                    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.95)';
                    nav.style.boxShadow = 'none';
                }
                
                // Back to top button visibility
                if (scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            }, 10);
        });
    };

    // Scroll-triggered animations using Intersection Observer
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for stat counters
                    if (entry.target.classList.contains('stat-card')) {
                        animateStatCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.skill-category, .project-card, .stat-card, .contact-item, .about-text'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    };

    // Active navigation link highlighting
    const initActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            throttle(() => {
                let current = '';
                const scrollY = window.scrollY + 150; // Offset for better accuracy

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }, 50);
        });
    };

    // Animated counters for stats
    const animateStatCounter = (card) => {
        const statNumber = card.querySelector('.stat-number');
        if (!statNumber || statNumber.hasAttribute('data-animated')) return;
        
        statNumber.setAttribute('data-animated', 'true');
        const text = statNumber.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number && number > 0) {
            let current = 0;
            const increment = Math.max(1, Math.floor(number / 30));
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    statNumber.textContent = text; // Restore original text
                    clearInterval(timer);
                } else {
                    statNumber.textContent = current + (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
                }
            }, 50);
        }
    };

    // Enhanced skill tags hover effects
    const initSkillTagEffects = () => {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                this.style.zIndex = '10';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            });
            
            // Add click effect
            tag.addEventListener('click', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                }, 150);
            });
        });
    };

    // Enhanced project card effects
    const initProjectCardEffects = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-20px) scale(1.03)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Add subtle parallax effect to project headers
            const header = card.querySelector('.project-header');
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                if (header) {
                    header.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (header) {
                    header.style.transform = 'translate(0, 0) scale(1)';
                }
            });
        });
    };

    // Mobile menu functionality
    const initMobileMenu = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!mobileMenuBtn || !navLinks) return;

        window.toggleMobileMenu = () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('show');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navLinks.classList.contains('show')) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('show')) {
                closeMobileMenu();
            }
        });
    };

    // Close mobile menu helper function
    const closeMobileMenu = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    // Global scroll to top function
    window.scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Handle window resize
    const initResizeHandler = () => {
        window.addEventListener('resize', () => {
            throttle(() => {
                // Close mobile menu if window becomes wide
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
                
                // Reset any transforms that might break on resize
                document.querySelectorAll('.project-header').forEach(header => {
                    header.style.transform = '';
                });
            }, 100);
        });
    };

    // Keyboard navigation support
    const initKeyboardNavigation = () => {
        document.addEventListener('keydown', (e) => {
            // Focus management for better accessibility
            if (e.key === 'Tab') {
                // Let browser handle natural tab order
                return;
            }
            
            // Arrow key navigation for sections
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                scrollToNextSection();
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                scrollToPreviousSection();
            }
        });
    };

    // Section navigation helpers
    const scrollToNextSection = () => {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = getCurrentSectionIndex(sections);
        const nextIndex = (currentIndex + 1) % sections.length;
        
        sections[nextIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const scrollToPreviousSection = () => {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = getCurrentSectionIndex(sections);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        
        sections[prevIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const getCurrentSectionIndex = (sections) => {
        const scrollY = window.scrollY + 200;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                return i;
            }
        }
        return 0;
    };

    // Performance monitoring (development only)
    const initPerformanceMonitoring = () => {
        if (typeof performance !== 'undefined' && performance.mark) {
            performance.mark('portfolio-init-start');
            
            window.addEventListener('load', () => {
                performance.mark('portfolio-init-end');
                performance.measure('portfolio-init', 'portfolio-init-start', 'portfolio-init-end');
                
                if (console && console.log) {
                    const measures = performance.getEntriesByType('measure');
                    measures.forEach(measure => {
                        console.log(`${measure.name}: ${measure.duration.toFixed(2)}ms`);
                    });
                }
            });
        }
    };

    // Initialize all functionality
    const init = () => {
        try {
            initSmoothScroll();
            initScrollEffects();
            initScrollAnimations();
            initActiveNavigation();
            initSkillTagEffects();
            initProjectCardEffects();
            initMobileMenu();
            initResizeHandler();
            initKeyboardNavigation();
            initPerformanceMonitoring();
            
            // Add loaded class to body for any CSS transitions
            document.body.classList.add('loaded');
            
            console.log('🚀 Portfolio loaded successfully!');
            console.log('✨ Made with passion by Yodsaphak Panyapeng');
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    };

    // Start initialization
    init();

    // Add some nice console styling
    if (console && console.log) {
        const styles = [
            'color: #6366f1',
            'font-size: 16px',
            'font-weight: bold',
            'text-shadow: 2px 2px 0px rgba(0,0,0,0.1)'
        ].join(';');
        
        console.log('%c🌟 Welcome to Yodsaphak\'s Portfolio!', styles);
        console.log('Feel free to explore the code and reach out if you have any questions.');
    }

    // Easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 4000);
            
            console.log('🎉 Easter egg activated! You found the secret!');
            konamiCode = [];
        }
    });

    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

});