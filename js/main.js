/**
 * Main JavaScript for Pauline Portfolio Website
 * Handles navigation, mobile menu, smooth scrolling, and form handling
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contact-form');
    const currentYear = document.getElementById('current-year');
    
    // ============================================
    // Initialize
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initSmoothScroll();
        initHeaderScroll();
        initForm();
        initCurrentYear();
        initPortfolioFilters();
        initPortfolioModal();
    });
    
    // ============================================
    // Navigation Functions
    // ============================================
    
    function initNavigation() {
        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                const isActive = navMenu.classList.contains('active');
                
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', !isActive);
                
                // Prevent body scroll when menu is open
                if (!isActive) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 767) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                });
            });
        }
    }
    
    // ============================================
    // Smooth Scroll
    // ============================================
    
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle anchor links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        updateActiveNavLink(targetId);
                    }
                }
            });
        });
    }
    
    // ============================================
    // Active Navigation Link
    // ============================================
    
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll
    function initHeaderScroll() {
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', debounce(function() {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class to header
            if (header) {
                if (currentScroll > scrollThreshold) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Update active nav link based on scroll position
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const headerHeight = header ? header.offsetHeight : 0;
                
                if (currentScroll >= sectionTop - headerHeight - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            if (currentSection) {
                updateActiveNavLink(currentSection);
            }
            
            lastScroll = currentScroll;
        }, 100));
    }
    
    // ============================================
    // Portfolio Filters
    // ============================================
    
    function initPortfolioFilters() {
        const filters = document.querySelectorAll('.portfolio__filter');
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        
        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active filter
                filters.forEach(f => {
                    f.classList.remove('portfolio__filter--active');
                    f.setAttribute('aria-selected', 'false');
                });
                this.classList.add('portfolio__filter--active');
                this.setAttribute('aria-selected', 'true');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = '';
                        // Trigger animation
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        }, 0);
                    } else {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ============================================
    // Portfolio Modal
    // ============================================
    
    function initPortfolioModal() {
        const modal = document.getElementById('portfolio-modal');
        const modalOverlay = modal?.querySelector('.modal__overlay');
        const modalClose = modal?.querySelector('.modal__close');
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        const viewButtons = document.querySelectorAll('.portfolio__view-btn');
        
        // Portfolio item data (in a real app, this would come from a data source)
        const portfolioData = {
            'modern-ecommerce-platform': {
                title: 'Modern E-commerce Platform',
                category: 'Web Design',
                description: 'A fully responsive e-commerce website featuring modern design principles, intuitive user experience, and seamless checkout process. Built with attention to detail and optimized for conversions.'
            },
            'corporate-website-redesign': {
                title: 'Corporate Website Redesign',
                category: 'Web Design',
                description: 'Complete redesign of a corporate website with focus on brand identity, user experience, and accessibility. The new design improved engagement metrics by 40%.'
            },
            'creative-professional-portfolio': {
                title: 'Creative Professional Portfolio',
                category: 'Web Design',
                description: 'A minimalist portfolio website for a creative professional, showcasing their work with elegant animations and clean typography. The design emphasizes the work while maintaining visual harmony.'
            },
            'saas-product-landing-page': {
                title: 'SaaS Product Landing Page',
                category: 'Web Design',
                description: 'High-converting landing page for a SaaS product, featuring clear value proposition, social proof, and strategic call-to-action placement. Increased sign-ups by 35%.'
            },
            'marketing-campaign-localization': {
                title: 'Marketing Campaign Localization',
                category: 'Translation',
                description: 'Complete localization of a marketing campaign from English to French, ensuring cultural relevance and maintaining brand voice. The campaign achieved strong engagement in the French market.'
            },
            'technical-documentation-translation': {
                title: 'Technical Documentation Translation',
                category: 'Translation',
                description: 'Accurate translation of technical documentation from French to English, maintaining technical precision while ensuring clarity for English-speaking developers.'
            },
            'multilingual-website-content': {
                title: 'Multilingual Website Content',
                category: 'Translation',
                description: 'Translation and localization of website content for a bilingual audience, ensuring consistent tone and messaging across both languages while respecting cultural nuances.'
            },
            'literary-translation-project': {
                title: 'Literary Translation Project',
                category: 'Translation',
                description: 'Translation of literary content with careful attention to style, tone, and cultural context. Preserved the author\'s voice while making the text accessible to English readers.'
            }
        };
        
        function openModal(itemData) {
            if (!modal) return;
            
            const modalTitle = modal.querySelector('.modal__title');
            const modalCategory = modal.querySelector('.modal__category');
            const modalImage = modal.querySelector('.modal__image');
            const modalDescription = modal.querySelector('.modal__description');
            
            if (modalTitle) modalTitle.textContent = itemData.title;
            if (modalCategory) modalCategory.textContent = itemData.category;
            if (modalDescription) modalDescription.textContent = itemData.description;
            
            // Update modal image (show placeholder gradient if no image)
            if (modalImage) {
                if (itemData.image) {
                    modalImage.innerHTML = `<img src="${itemData.image}" alt="${itemData.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">`;
                } else {
                    // Show placeholder gradient
                    modalImage.style.background = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)';
                }
            }
            
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
            if (!modal) return;
            
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        
        // Open modal on portfolio item click
        portfolioItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.classList.contains('portfolio__view-btn')) return;
                
                const title = this.querySelector('.portfolio__title')?.textContent;
                const key = title?.toLowerCase().replace(/\s+/g, '-');
                const itemData = portfolioData[key] || {
                    title: title || 'Project',
                    category: this.querySelector('.portfolio__category')?.textContent || 'Portfolio',
                    description: 'Project details coming soon.'
                };
                
                openModal(itemData);
            });
            
            // Keyboard support
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Open modal on view button click
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = this.closest('.portfolio__item');
                const title = item?.querySelector('.portfolio__title')?.textContent;
                const key = title?.toLowerCase().replace(/\s+/g, '-');
                const itemData = portfolioData[key] || {
                    title: title || 'Project',
                    category: item?.querySelector('.portfolio__category')?.textContent || 'Portfolio',
                    description: 'Project details coming soon.'
                };
                
                openModal(itemData);
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal?.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // ============================================
    // Contact Form
    // ============================================
    
    function initForm() {
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formMessage = document.getElementById('form-message');
            
            // Basic validation
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            if (!name || !email || !service || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (in production, this would send to a server)
            showFormMessage('Sending...', 'success');
            
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 1000);
        });
    }
    
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('form-message');
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form__message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Clear message after 5 seconds for success
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ============================================
    // Current Year
    // ============================================
    
    function initCurrentYear() {
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }
    
    // ============================================
    // Utility Functions
    // ============================================
    
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
    
})();

