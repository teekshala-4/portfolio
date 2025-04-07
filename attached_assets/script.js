document.addEventListener("DOMContentLoaded", function() {
    // Skills Animation
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    function animateSkills() {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;

        if (sectionTop < triggerPoint && !skillsAnimated) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 150);
            });
            skillsAnimated = true;
        }
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observers
    const observers = [];

    // Skills Observer
    const skillsObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.1
    });
    skillsObserver.observe(skillsSection);

    // Project Animation
    const projects = document.querySelectorAll('.project');
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    projects.forEach(project => {
        project.style.opacity = 0;
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'all 0.6s ease-out';
        projectObserver.observe(project);
    });

    // Initial animations
    animateSkills();
    window.addEventListener('scroll', animateSkills);
});
