/**
 * Scroll-triggered animations using Intersection Observer API
 * Provides smooth fade-in and slide-in animations as elements enter viewport
 */

(function() {
    'use strict';

    // ============================================
    // Animation Configuration
    // ============================================
    
    const animationConfig = {
        // Root margin for triggering animations before element enters viewport
        rootMargin: '0px 0px -100px 0px',
        // Threshold for triggering animation (0 = as soon as any part enters)
        threshold: 0.1,
        // Animation classes
        classes: {
            base: 'animate-on-scroll',
            animated: 'animated',
            fadeInUp: 'animate-fade-in-up',
            fadeInDown: 'animate-fade-in-down',
            slideInLeft: 'animate-slide-in-left',
            slideInRight: 'animate-slide-in-right',
            scaleIn: 'animate-scale-in'
        }
    };

    // ============================================
    // Check for Reduced Motion Preference
    // ============================================
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================
    // Initialize Animations
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        if (!prefersReducedMotion) {
            initScrollAnimations();
            initStaggerAnimations();
        }
    });

    // ============================================
    // Scroll Animations with Intersection Observer
    // ============================================
    
    function initScrollAnimations() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
                el.classList.add('animated');
            });
            return;
        }

        // Create Intersection Observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animated class
                    element.classList.add(animationConfig.classes.animated);
                    
                    // Determine animation type based on data attribute or default
                    const animationType = element.getAttribute('data-animation') || 'fadeInUp';
                    
                    // Apply appropriate animation class
                    switch(animationType) {
                        case 'fadeInUp':
                            element.classList.add(animationConfig.classes.fadeInUp);
                            break;
                        case 'fadeInDown':
                            element.classList.add(animationConfig.classes.fadeInDown);
                            break;
                        case 'slideInLeft':
                            element.classList.add(animationConfig.classes.slideInLeft);
                            break;
                        case 'slideInRight':
                            element.classList.add(animationConfig.classes.slideInRight);
                            break;
                        case 'scaleIn':
                            element.classList.add(animationConfig.classes.scaleIn);
                            break;
                        default:
                            element.classList.add(animationConfig.classes.fadeInUp);
                    }
                    
                    // Stop observing once animated
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: animationConfig.rootMargin,
            threshold: animationConfig.threshold
        });

        // Observe elements with animation classes
        const elementsToAnimate = document.querySelectorAll(`
            .about__content,
            .about__expertise-item,
            .about__skills,
            .portfolio__item,
            .service-card,
            .testimonial,
            .contact__content,
            .section-heading,
            .section-subtitle
        `);

        elementsToAnimate.forEach((element, index) => {
            // Add base animation class
            element.classList.add(animationConfig.classes.base);
            
            // Add stagger delay for grid items
            if (element.classList.contains('portfolio__item') || 
                element.classList.contains('service-card') || 
                element.classList.contains('testimonial')) {
                const delayClass = `animate-delay-${(index % 6) + 1}`;
                element.classList.add(delayClass);
            }
            
            // Observe element
            observer.observe(element);
        });
    }

    // ============================================
    // Stagger Animations for Grid Items
    // ============================================
    
    function initStaggerAnimations() {
        // Add stagger delays to portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        portfolioItems.forEach((item, index) => {
            const delay = (index % 3) * 0.1; // Stagger by 0.1s for each column
            item.style.animationDelay = `${delay}s`;
        });

        // Add stagger delays to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            const delay = index * 0.15;
            card.style.animationDelay = `${delay}s`;
        });

        // Add stagger delays to testimonials
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, index) => {
            const delay = (index % 2) * 0.1;
            testimonial.style.animationDelay = `${delay}s`;
        });
    }

    // ============================================
    // Parallax Effect (Subtle)
    // ============================================
    
    function initParallax() {
        if (prefersReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16)); // ~60fps
    }

    // ============================================
    // Utility Functions
    // ============================================
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Initialize parallax if needed
    // Uncomment to enable subtle parallax effects
    // initParallax();

})();

