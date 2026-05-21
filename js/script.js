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

    // Email validation on blur
    const emailInput = document.getElementById('email');
    const emailGroup = document.getElementById('emailGroup');
    const emailError = document.getElementById('emailError');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                emailGroup.classList.add('error');
                emailError.textContent = 'Please enter a valid email address (e.g., name@example.com)';
            } else {
                emailGroup.classList.remove('error');
                emailError.textContent = '';
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (emailGroup.classList.contains('error')) {
                const email = this.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(email)) {
                    emailGroup.classList.remove('error');
                    emailError.textContent = '';
                }
            }
        });
    }
    
    // Phone number auto-formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, ''); // Remove all non-digits
            
            if (value.length > 10) {
                value = value.slice(0, 10); // Limit to 10 digits
            }
            
            // Format as XXX-XXX-XXXX
            if (value.length >= 6) {
                this.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else if (value.length >= 3) {
                this.value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                this.value = value;
            }
        });
    }

    // Contact Form Handling with Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailGroup.classList.add('error');
                emailError.textContent = 'Please enter a valid email address (e.g., name@example.com)';
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Submit to Formspree
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage('Thank you for your inquiry. Responses can be expected within 48 hours.', 'success');
                    contactForm.reset();
                    emailGroup.classList.remove('error');
                    emailError.textContent = '';
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Form submission failed');
                    });
                }
            })
            .catch(error => {
                showFormMessage('There was an error sending your message. Please try again or contact us directly.', 'error');
                console.error('Form submission error:', error);
            });
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
