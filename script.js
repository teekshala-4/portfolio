document.addEventListener("DOMContentLoaded", function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Initialize skill animations
    initSkillAnimations();
    
    // Initialize project animations
    initProjectAnimations();
    
    // Initialize form handling
    initContactForm();
    
    // Project filtering (only on projects page)
    if (document.querySelector('.filter-btn')) {
        initProjectFilters();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Skills Animation
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (skillItems.length === 0) return;
    
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    
    // Animate on scroll
    function animateSkills() {
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPoint && !skillsAnimated) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100); // Staggered animation
            });
            skillsAnimated = true;
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Check on page load
    animateSkills();
}

// Project Animations
function initProjectAnimations() {
    const projects = document.querySelectorAll('.project');
    
    if (projects.length === 0) return;
    
    // Create intersection observer
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Setup each project
    projects.forEach(project => {
        project.style.opacity = 0;
        project.style.transform = 'translateY(30px)';
        project.style.transition = 'all 0.8s ease-out';
        projectObserver.observe(project);
    });
    
    // For project cards on the projects page
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        projectCards.forEach((card, index) => {
            card.style.setProperty('--i', index);
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Form validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        if (!validateEmail(formData.email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (in a real scenario, this would be an API call)
        showFormMessage('Thanks for reaching out! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Form message helper
function showFormMessage(message, type) {
    const contactForm = document.getElementById('contactForm');
    
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert after form
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Remove after delay
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Project Filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                card.classList.remove('appearing');
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Use setTimeout to create a staggered reveal effect
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.classList.add('appearing');
                    }, 50 * Math.random() * 10); // Random delay for natural effect
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}
