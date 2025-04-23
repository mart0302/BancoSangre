document.addEventListener('DOMContentLoaded', function() {
    // Animación inicial de carga
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutQuad'
    });

    // Navbar scroll effect mejorado con Anime.js
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            anime({
                targets: navbar,
                backgroundColor: 'rgba(230, 57, 70, 0.95)',
                padding: '10px 0',
                backdropFilter: ['blur(0px)', 'blur(5px)'],
                easing: 'easeInOutQuad',
                duration: 300
            });
        } else {
            anime({
                targets: navbar,
                backgroundColor: 'rgba(230, 57, 70, 1)',
                padding: '15px 0',
                backdropFilter: ['blur(5px)', 'blur(0px)'],
                easing: 'easeInOutQuad',
                duration: 300
            });
        }
    });
    
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    anime({
        targets: heroContent,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 300,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: heroImage,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 600,
        easing: 'easeOutExpo'
    });
    
    // Animate stats counter mejorado con Anime.js
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat, index) => {
            const target = +stat.getAttribute('data-count');
            const obj = { count: 0 };
            
            anime({
                targets: obj,
                count: target,
                duration: 2000,
                delay: index * 200,
                round: 1,
                easing: 'easeOutExpo',
                update: function() {
                    stat.textContent = obj.count.toLocaleString();
                }
            });
        });
    };
    
    // Info Cards animations
    const animateCards = () => {
        anime({
            targets: '.card',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.card-icon',
            rotate: {
                value: ['-15deg', '0deg'],
                duration: 800,
                easing: 'easeOutElastic'
            },
            scale: [0.8, 1],
            delay: anime.stagger(200)
        });
    };
    
    // Process steps animation
    const animateSteps = () => {
        anime({
            targets: '.step',
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.step-number',
            scale: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutElastic'
        });
    };
    
    // Gallery animations
    const animateGallery = () => {
        anime({
            targets: '.gallery-item',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });
    };
    
    // Testimonials animation
    const animateTestimonials = () => {
        anime({
            targets: '.testimonial-item',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });
    };
    
    // CTA animation
    const animateCTA = () => {
        anime({
            targets: '.cta-content',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });
    };
    
    // Observador de intersección mejorado
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                
                if (entry.target.classList.contains('info-cards')) {
                    animateCards();
                }
                
                if (entry.target.classList.contains('process')) {
                    animateSteps();
                }
                
                if (entry.target.classList.contains('process-gallery')) {
                    animateGallery();
                }
                
                if (entry.target.classList.contains('testimonials')) {
                    animateTestimonials();
                }
                
                if (entry.target.classList.contains('cta')) {
                    animateCTA();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones importantes
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Testimonial carousel con animación mejorada
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('slide.bs.carousel', function (e) {
            const activeItem = e.relatedTarget.querySelector('.testimonial-item');
            const prevItem = document.querySelector('.carousel-item.active .testimonial-item');
            
            anime({
                targets: prevItem,
                opacity: 0,
                translateY: 50,
                duration: 300,
                easing: 'easeInQuad',
                complete: function() {
                    prevItem.classList.remove('active');
                }
            });
            
            anime({
                targets: activeItem,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 600,
                delay: 300,
                easing: 'easeOutExpo',
                begin: function() {
                    activeItem.classList.add('active');
                }
            });
        });
        
        // Activar el primer testimonio
        document.querySelector('.testimonial-item').classList.add('active');
    }
    
    // Efecto hover en botones mejorado con Anime.js
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -3,
                boxShadow: '0 7px 20px rgba(0,0,0,0.2)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Efecto hover en tarjetas de galería
    document.querySelectorAll('.gallery-photo').forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            anime({
                targets: this.querySelector('img'),
                scale: 1.05,
                duration: 500,
                easing: 'easeOutExpo'
            });
            
            anime({
                targets: this.querySelector('.photo-overlay'),
                opacity: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: this.querySelector('.photo-link'),
                scale: [0.8, 1],
                duration: 500,
                easing: 'easeOutElastic'
            });
        });
        
        photo.addEventListener('mouseleave', function() {
            anime({
                targets: this.querySelector('img'),
                scale: 1,
                duration: 500,
                easing: 'easeOutExpo'
            });
            
            anime({
                targets: this.querySelector('.photo-overlay'),
                opacity: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Smooth scrolling mejorado con Anime.js
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                anime({
                    targets: 'html, body',
                    scrollTop: targetElement.offsetTop - 80,
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
            }
        });
    });
    
    // Animación para el logo en el navbar
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                rotate: '1turn',
                duration: 800,
                easing: 'easeOutElastic'
            });
        });
    }
    
    // Animación para el botón "Quiero Donar"
    const donateBtn = document.querySelector('.btn-donar');
    if (donateBtn) {
        donateBtn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        donateBtn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    }
    
    // Inicializar partículas con configuración mejorada
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#e63946" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 4, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#e63946", 
                    opacity: 0.3, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 1.5, 
                    direction: "none", 
                    random: true, 
                    straight: false, 
                    out_mode: "out" 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.8 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
});
// Invoice functionality
document.addEventListener('DOMContentLoaded', function() {
    const invoiceForm = document.getElementById('invoiceForm');
    const invoicePreview = document.getElementById('invoicePreview');
    const downloadBtn = document.getElementById('downloadInvoice');
    
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate searching for invoice
            const invoiceNumber = document.getElementById('invoiceNumber').value;
            const rfc = document.getElementById('invoiceRFC').value || 'XAXX010101000';
            const email = document.getElementById('invoiceEmail').value || 'cliente@ejemplo.com';
            
            // Show loading animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Buscando...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(function() {
                // Update preview with "fetched" data
                document.getElementById('previewFolio').textContent = invoiceNumber || 'FAC-' + Math.floor(10000 + Math.random() * 90000);
                document.getElementById('previewDate').textContent = new Date().toLocaleDateString();
                document.getElementById('previewClientName').textContent = 'Cliente ' + (invoiceNumber || 'Ejemplo');
                document.getElementById('previewRFC').textContent = 'RFC: ' + rfc;
                document.getElementById('previewEmail').textContent = 'Email: ' + email;
                
                // Generate random items
                const items = [
                    { description: 'Donación de sangre', quantity: 1, price: 0, tax: 0 },
                    { description: 'Procesamiento de muestra', quantity: 1, price: 500, tax: 80 },
                    { description: 'Estudios de laboratorio', quantity: 1, price: 300, tax: 48 }
                ];
                
                const itemsContainer = document.getElementById('invoiceItems');
                itemsContainer.innerHTML = '';
                
                let subtotal = 0;
                let iva = 0;
                
                items.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.quantity}</td>
                        <td>${item.description}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    `;
                    itemsContainer.appendChild(row);
                    
                    subtotal += item.price * item.quantity;
                    iva += item.tax * item.quantity;
                });
                
                document.getElementById('subtotal').textContent = subtotal.toFixed(2);
                document.getElementById('iva').textContent = iva.toFixed(2);
                document.getElementById('total').textContent = (subtotal + iva).toFixed(2);
                
                // Generate random UUID for demo
                document.getElementById('uuid').textContent = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                
                // Show preview
                invoicePreview.style.display = 'block';
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to preview
                invoicePreview.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // In a real implementation, this would generate/download the PDF
            alert('En una implementación real, esto descargaría el PDF de la factura');
        });
    }
});