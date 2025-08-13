// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior for navigation links
    const smoothScroll = () => {
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
    };

    // Navigation scroll effect
    const navigationScrollEffect = () => {
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });
    };

    // Scroll-triggered animations
    const scrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat-card, .contact-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    };

    // Active navigation link highlighting
    const activeNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    };

    // Typing animation for hero title
    const typingAnimation = () => {
        const heroTitle = document.querySelector('.hero-title');
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    };

    // Skill tags hover effects
    const skillTagEffects = () => {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateY(-3px)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        });
    };

    // Project card tilt effect
    const projectCardEffects = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02) rotateY(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            });
        });
    };

    // Animated counters for stats
    const animatedCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 50; // Animation steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            }, 30);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number && !entry.target.classList.contains('animated')) {
                        entry.target.classList.add('animated');
                        animateCounter(entry.target, number);
                    }
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    };

    
    const mobileMenuToggle = () => {
        const handleResize = () => {
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= 768) {
                
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
    };

    
    const parallaxEffect = () => {
        const hero = document.querySelector('#hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${parallax}px)`;
            }
        });
    };

    
    const init = () => {
        smoothScroll();
        navigationScrollEffect();
        scrollAnimations();
        activeNavigation();
        skillTagEffects();
        projectCardEffects();
        animatedCounters();
        mobileMenuToggle();
        
    };

    
    init();

    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('✨ Made with passion by Lumina AI');
});