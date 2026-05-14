// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (in production, this would send to a backend)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            showFormMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formNote.textContent = '';
                formNote.className = '';
            }, 5000);
        }, 1000);
    });
}

function showFormMessage(message, type) {
    formNote.textContent = message;
    formNote.className = type;
}

// Add scroll spy for navigation (optional enhancement)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent) !important;
        font-weight: 700;
    }
`;
document.head.appendChild(style);

// Performance: Lazy loading for images (if any are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS for active link animation
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: var(--accent);
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(activeStyle);

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Escape key to close any modals (if added later)
    if (e.key === 'Escape') {
        formNote.textContent = '';
        formNote.className = '';
    }
});

// Announce page load completion for accessibility
window.addEventListener('load', function() {
    console.log('Portfolio loaded successfully');
});

// Simple dark mode toggle (optional feature)
function initDarkModeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && !localStorage.getItem('theme')) {
        // Optional: Add dark mode support
        // For this minimalist design, we'll keep light mode as default
    }
}

initDarkModeToggle();

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfTiming = window.performance.timing;
        const pageLoadTime = perfTiming.loadEventEnd - perfTiming.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}
