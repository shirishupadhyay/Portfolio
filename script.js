// Theme toggle button logic
const toggleButton = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Apply saved or preferred theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    if (toggleButton) toggleButton.textContent = '☀️';
} else {
    if (toggleButton) toggleButton.textContent = '🌙';
}

// Toggle on button click
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggleButton.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}



document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Get the height of the fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Subtract 20px for extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal effect (optional, can be expanded with Intersection Observer API)
    const sections = document.querySelectorAll('section');

    const fadeInOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (sectionTop < screenHeight * 0.75) { // When 75% of the section is visible
                section.classList.add('fade-in');
            } else {
                section.classList.remove('fade-in'); // Remove if scrolled out of view
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Run once on load to check initial visibility

    // Add a class for fade-in effect to style.css
    // section.fade-in {
    //     opacity: 1;
    //     transform: translateY(0);
    // }
    // Add initial styles in CSS:
    // section {
    //     opacity: 0;
    //     transform: translateY(20px);
    //     transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    // }

    // Form submission (frontend only, needs backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a backend server.
            // For example, using fetch API:
            // fetch('your_form_submission_endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: document.getElementById('name').value,
            //         email: document.getElementById('email').value,
            //         subject: document.getElementById('subject').value,
            //         message: document.getElementById('message').value,
            //     }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Message sent successfully!');
            //     contactForm.reset();
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            //     alert('Failed to send message. Please try again later.');
            // });

            alert('Thank you for your message! (This is a frontend alert. A backend is needed for actual submission.)');
            contactForm.reset(); // Clear the form after "submission"
        });
    }
});
