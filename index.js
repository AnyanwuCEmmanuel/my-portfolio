// index.js - Portfolio Enhancements

// 1. Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav ul'); // ← changed to .nav ul (your HTML)

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link (very important on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 2. Active Nav Link on Scroll (improved + mobile friendly)
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]'); // only sections with id
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // increased offset for fixed nav + buffer
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Remove active from all, then add to current
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Also highlight "Home" when near top
    if (scrollPosition < 100) {
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
});

// 3. Skill Bars Animation (already good, just added safety)
const skillBars = document.querySelectorAll('.skill-progress');

if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const percent = bar.getAttribute('data-percent') || '0';
                    bar.style.width = `${percent}%`;
                    // Optional: only animate once
                    // skillObserver.unobserve(bar);
                }
            });
        },
        { threshold: 0.4 } // trigger a bit earlier
    );

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// 4. Contact Form Submission (fake + reset)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]')?.value.trim();
        const email = contactForm.querySelector('input[type="email"]')?.value.trim();

        // Very basic validation
        if (!name || !email) {
            alert("Please fill in your name and email!");
            return;
        }

        alert("Message sent! 🎉 Thanks for reaching out — I'll get back to you soon.");
        contactForm.reset();
    });
}

// 5. Optional: Smooth scrolling for anchor links (feels premium on mobile too)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerOffset = 80; // your nav height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});