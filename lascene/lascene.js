document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. SCROLL ANIMATIONS (FADE IN)
       ========================================= */
    // Target elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .reason-block, .portfolio-item, .stat-item, .hero-content'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        // Set initial state via JS to ensure no flash of unstyled content
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        scrollObserver.observe(el);
    });

    /* =========================================
       3. NUMBER COUNTER ANIMATION
       ========================================= */
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = 200; // The lower the slower
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* =========================================
       4. PORTFOLIO FILTER
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    // Small timeout to allow display change before opacity transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* =========================================
       5. WHATSAPP FORM SUBMISSION
       ========================================= */
    const form = document.getElementById('whatsappForm');
    const whatsappNumber = "213657197463";

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const sector = document.getElementById('sector').value;
        const message = document.getElementById('message').value.trim();

        // Validate
        if (!name || !email || !sector) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Construct Message
        const text = `Bonjour La Scène, je souhaite réserver un appel.%0A%0A` +
                     `👤 *Nom:* ${name}%0A` +
                     `📧 *Email:* ${email}%0A` +
                     `🏢 *Secteur:* ${sector}%0A` +
                     `💬 *Message:* ${message}`;

        // Create URL
        const url = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Open WhatsApp
        window.open(url, '_blank');

        // Optional: Reset form
        // form.reset();
    });

    /* =========================================
       6. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});