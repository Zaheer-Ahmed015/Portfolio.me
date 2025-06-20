// Portfolio Website JavaScript
$(document).ready(function() {
    // Theme management
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on load
    applyTheme(currentTheme);
    
    // Theme toggle functionality
    $('#theme-toggle').on('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            $('body').addClass('dark');
            $('#theme-toggle i').removeClass('fa-moon').addClass('fa-sun');
        } else {
            $('body').removeClass('dark');
            $('#theme-toggle i').removeClass('fa-sun').addClass('fa-moon');
        }
    }
    
    // Mobile menu toggle
    $('#mobile-toggle').on('click', function() {
        $('#mobile-menu').toggleClass('active');
        const icon = $(this).find('i');
        icon.toggleClass('fa-bars fa-times');
    });
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            const offset = 80; // Account for fixed navbar
            const targetOffset = target.offset().top - offset;
            
            $('html, body').animate({
                scrollTop: targetOffset
            }, 800, 'swing');
            
            // Close mobile menu after clicking a link
            $('#mobile-menu').removeClass('active');
            $('#mobile-toggle i').removeClass('fa-times').addClass('fa-bars');
        }
    });
    
    // Scroll-based animations
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }
    
    // Skills animation
    let skillsAnimated = false;
    
    function animateSkills() {
        if (skillsAnimated) return;
        
        const skillsSection = $('#skills');
        if (skillsSection.length) {
            const skillsTop = skillsSection.offset().top;
            const skillsBottom = skillsTop + skillsSection.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (skillsBottom > viewportTop && skillsTop < viewportBottom) {
                skillsAnimated = true;
                
                // Animate progress bars
                setTimeout(function() {
                    $('.skill-progress').each(function() {
                        const width = $(this).data('width');
                        $(this).css('width', width);
                    });
                }, 200);
            }
        }
    }
    
    // Scroll to top button
    function toggleScrollTopButton() {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 300) {
            $('#scroll-top').addClass('visible');
        } else {
            $('#scroll-top').removeClass('visible');
        }
    }
    
    // Scroll event handler
    $(window).on('scroll', function() {
        animateOnScroll();
        animateSkills();
        toggleScrollTopButton();
    });
    
    // Scroll to top functionality
    $('#scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });
    
    // Contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('Contact form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
    
    // Newsletter form submission
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#newsletter-email').val();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Log newsletter subscription (in a real application, this would be sent to a server)
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to my newsletter!');
        
        // Reset form
        $('#newsletter-email').val('');
    });
    
    // Initialize animations on page load
    animateOnScroll();
    toggleScrollTopButton();
    
    // Add typing animation to hero text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }
    
    // Enhanced scroll animations with staggered delays
    function staggeredAnimation() {
        $('.animate-on-scroll').each(function(index) {
            const $this = $(this);
            const elementTop = $this.offset().top;
            const elementBottom = elementTop + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                setTimeout(function() {
                    $this.addClass('animated');
                }, index * 100); // Stagger animation by 100ms
            }
        });
    }
    
    // Enhanced scroll handler
    let scrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            staggeredAnimation();
            animateSkills();
            toggleScrollTopButton();
        }, 10);
    });
    
    // Particle animation for hero section (simple version)
    function createParticles() {
        const heroSection = $('.hero-section');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = $('<div class="particle"></div>');
            particle.css({
                position: 'absolute',
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + 's'
            });
            heroSection.append(particle);
        }
    }
    
    // Add floating animation CSS
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
            }
            .particle {
                pointer-events: none;
                z-index: 1;
            }
        `)
        .appendTo('head');
    
    // Initialize particles
    createParticles();
    
    // Counter animation for stats
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const target = parseInt($this.text().replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const suffix = $this.text().replace(/\d/g, '');
                $this.text(Math.floor(current) + suffix);
            }, 16);
        });
    }
    
    // Trigger counter animation when stats section is visible
    let statsAnimated = false;
    function checkStatsAnimation() {
        if (statsAnimated) return;
        
        const statsSection = $('.stats-grid');
        if (statsSection.length) {
            const statsTop = statsSection.offset().top;
            const statsBottom = statsTop + statsSection.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (statsBottom > viewportTop && statsTop < viewportBottom) {
                statsAnimated = true;
                animateCounters();
            }
        }
    }
    
    // Add stats animation to scroll handler
    $(window).on('scroll', function() {
        checkStatsAnimation();
    });
    
    // Lazy loading for images (placeholder functionality)
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            const $img = $(this);
            const rect = this.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                $img.attr('src', $img.data('src'));
                $img.removeAttr('data-src');
            }
        });
    }
    
    $(window).on('scroll', lazyLoadImages);
    lazyLoadImages(); // Initial check
    
    // Form enhancement - character counter for textarea
    $('#message').on('input', function() {
        const maxLength = 500;
        const currentLength = $(this).val().length;
        const remaining = maxLength - currentLength;
        
        let counter = $(this).siblings('.char-counter');
        if (counter.length === 0) {
            counter = $('<div class="char-counter" style="font-size: 0.75rem; color: var(--text-light); text-align: right; margin-top: 0.25rem;"></div>');
            $(this).after(counter);
        }
        
        counter.text(`${remaining} characters remaining`);
        
        if (remaining < 0) {
            counter.css('color', 'var(--danger-color)');
        } else if (remaining < 50) {
            counter.css('color', 'var(--warning-color)');
        } else {
            counter.css('color', 'var(--text-light)');
        }
    });
    
    // Testimonials slider functionality (simple version)
    let currentTestimonial = 0;
    const testimonials = $('.testimonial-card');
    
    function showTestimonial(index) {
        testimonials.removeClass('active').eq(index).addClass('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
    
    // Add testimonial styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .testimonial-card {
                opacity: 0.7;
                transform: scale(0.95);
                transition: all 0.3s ease;
            }
            .testimonial-card.active {
                opacity: 1;
                transform: scale(1);
            }
        `)
        .appendTo('head');
    
    // Initialize first testimonial
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
    
    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const navbar = $('.navbar');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.css('transform', 'translateY(-100%)');
        } else {
            // Scrolling up
            navbar.css('transform', 'translateY(0)');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add navbar transition style
    $('.navbar').css('transition', 'transform 0.3s ease');
    
    // Project cards hover effect enhancement
    $('.project-card, .certificate-card, .education-card').hover(
        function() {
            $(this).find('.project-placeholder, .cert-placeholder, .edu-placeholder').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-placeholder, .cert-placeholder, .edu-placeholder').css('transform', 'scale(1)');
        }
    );
    
    // Add placeholder transition
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .project-placeholder, 
            .cert-placeholder, 
            .edu-placeholder {
                transition: transform 0.3s ease;
            }
        `)
        .appendTo('head');
    
    // Loading animation
    function showLoader() {
        const loader = $(`
            <div id="page-loader" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-color);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid var(--border-color);
                    border-top: 3px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
            </div>
        `);
        
        $('body').append(loader);
        
        // Add spin animation
        $('<style>')
            .prop('type', 'text/css')
            .html(`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `)
            .appendTo('head');
        
        // Hide loader after page loads
        setTimeout(function() {
            loader.fadeOut(500, function() {
                loader.remove();
            });
        }, 1000);
    }
    
    // Show loader on page load
    showLoader();
    
    // Back to top smooth animation enhancement
    $('#scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, {
            duration: 1000,
            easing: 'easeInOutCubic'
        });
    });
    
    // Custom easing function
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    
    // Intersection Observer for better performance (if supported)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animation elements
        $('.animate-on-scroll').each(function() {
            observer.observe(this);
        });
    }
    
    // Social media share functionality
    function shareOnSocialMedia(platform, url, text) {
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }
    
    // Add share buttons to projects (if needed)
    $('.project-card').each(function() {
        const projectUrl = $(this).find('.project-link').attr('href');
        const projectTitle = $(this).find('h3').text();
        
        if (projectUrl && projectUrl !== '#') {
            const shareButtons = $(`
                <div class="share-buttons" style="margin-top: 1rem; display: none;">
                    <button class="share-btn" data-platform="twitter" style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: #1da1f2; color: white; border: none; border-radius: 4px; font-size: 0.75rem;">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="share-btn" data-platform="linkedin" style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: #0077b5; color: white; border: none; border-radius: 4px; font-size: 0.75rem;">
                        <i class="fab fa-linkedin"></i>
                    </button>
                </div>
            `);
            
            $(this).find('.project-content').append(shareButtons);
            
            shareButtons.find('.share-btn').on('click', function(e) {
                e.preventDefault();
                const platform = $(this).data('platform');
                shareOnSocialMedia(platform, projectUrl, `Check out this project: ${projectTitle}`);
            });
        }
    });
    
    // Show share buttons on project hover
    $('.project-card').hover(
        function() {
            $(this).find('.share-buttons').slideDown(200);
        },
        function() {
            $(this).find('.share-buttons').slideUp(200);
        }
    );
    
    // Print functionality
    function printPortfolio() {
        window.print();
    }
    
    // Add print button (optional)
    if ($('.print-btn').length === 0) {
        const printBtn = $(`
            <button class="print-btn" style="
                position: fixed;
                top: 50%;
                right: -40px;
                transform: translateY(-50%);
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 8px 0 0 8px;
                cursor: pointer;
                transition: right 0.3s ease;
                z-index: 999;
            ">
                <i class="fas fa-print"></i>
            </button>
        `);
        
        $('body').append(printBtn);
        
        printBtn.on('click', printPortfolio);
        
        // Show print button on scroll
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 500) {
                printBtn.css('right', '0');
            } else {
                printBtn.css('right', '-40px');
            }
        });
    }
    
    // Keyboard navigation
    $(document).on('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            $('#mobile-menu').removeClass('active');
            $('#mobile-toggle i').removeClass('fa-times').addClass('fa-bars');
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft') {
            currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
            showTestimonial(currentTestimonial);
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    });
    
    // Console welcome message
    console.log(`
        ╔══════════════════════════════════════╗
        ║          Welcome to                  ║
        ║      Zaheer Ahmed's Portfolio        ║
        ║                                      ║
        ║   AI & ML Enthusiast                 ║
        ║   Cybersecurity Specialist           ║
        ║   IT Engineer                        ║
        ║                                      ║
        ║   Contact: zaheerkhanzaheer015@gmail.com ║
        ╚══════════════════════════════════════╝
    `);
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }
    
    // Error handling for missing elements
    $(window).on('error', function(e) {
        console.warn('JavaScript error:', e.originalEvent.error);
    });
    
    // Final initialization
    console.log('Portfolio website initialized successfully!');
});