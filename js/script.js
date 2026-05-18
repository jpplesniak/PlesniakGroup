// Plesniak Group - JavaScript Functionality

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value,
                confidential: document.getElementById('confidential').checked
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.message || !formData.confidential) {
                showFormMessage('Please fill in all required fields and agree to the confidentiality statement.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (in production, this would send to a server)
            // For now, we'll just show a success message
            showFormMessage('Thank you for your message! We will respond within 24-48 hours. All information is kept strictly confidential.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real implementation, you would send this data to your email service or backend
            // Example with a form service like Formspree or your own backend:
            /*
            fetch('YOUR_FORM_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showFormMessage('Thank you for your message! We will respond within 24-48 hours.', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showFormMessage('There was an error sending your message. Please try again or email us directly.', 'error');
            });
            */
        });
    }
});

// Function to show form messages
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 8000);
        }
    }
}

// Smooth scrolling for anchor links (if needed in future)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll (optional enhancement)
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Trigger animation when element is 20% into the viewport (more aggressive)
    return (
        rect.top <= windowHeight * 0.85 &&
        rect.bottom >= 0
    );
}

// Fade in elements on scroll
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.value-card, .step, .criteria-card, .value-item, .approach-point');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.value-card, .step, .criteria-card, .value-item, .approach-point');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
});
