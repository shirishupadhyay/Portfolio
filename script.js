// Theme toggle button logic
const toggleButton = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Apply saved or preferred theme on initial load
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
   document.body.classList.add('dark-mode');
   if (toggleButton) toggleButton.textContent = '☀️'; // Sun icon for dark mode
} else {
   if (toggleButton) toggleButton.textContent = '🌙'; // Moon icon for light mode
}

// Toggle theme on button click
if (toggleButton) {
   toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      toggleButton.textContent = isDark ? '☀️' : '🌙'; // Update icon based on theme
      localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference
   });
}


document.addEventListener('DOMContentLoaded', () => {
   // Smooth scrolling for navigation links
   document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault(); // Prevent default anchor link behavior

         const targetId = this.getAttribute('href');
         const targetSection = document.querySelector(targetId);

         if (targetSection) {
            // Get the height of the fixed header to offset scroll position
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            // Subtract header height and an additional 20px for extra padding
            const offsetPosition = elementPosition - headerOffset - 20;

            window.scrollTo({
               top: offsetPosition,
               behavior: 'smooth' // Smooth scroll animation
            });
         }
      });
   });

   // Mobile Navigation Toggle Logic
   const hamburgerMenu = document.querySelector('.hamburger-menu');
   const navLinks = document.querySelector('.nav-links');

   if (hamburgerMenu && navLinks) {
      hamburgerMenu.addEventListener('click', () => {
         navLinks.classList.toggle('active'); // Toggle 'active' class on nav links
         // Optionally, change the hamburger icon (e.g., bars to times)
         const icon = hamburgerMenu.querySelector('i');
         if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Change to 'X' icon
         } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Change back to hamburger icon
         }
      });

      // Close nav menu when a link is clicked (for improved mobile UX)
      navLinks.querySelectorAll('a').forEach(link => {
         link.addEventListener('click', () => {
            navLinks.classList.remove('active'); // Hide the navigation menu
            // Reset hamburger icon to bars
            hamburgerMenu.querySelector('i').classList.remove('fa-times');
            hamburgerMenu.querySelector('i').classList.add('fa-bars');
         });
      });
   }


   // Simple scroll reveal effect (can be expanded with Intersection Observer API for better performance)
   const sections = document.querySelectorAll('section');

   const fadeInOnScroll = () => {
      sections.forEach(section => {
         const sectionTop = section.getBoundingClientRect().top;
         const screenHeight = window.innerHeight;

         // Trigger fade-in when 75% of the section is visible
         if (sectionTop < screenHeight * 0.75) {
            section.classList.add('fade-in');
         } else {
            // Remove the class if scrolled out of view (optional, for re-animation on scroll up)
            section.classList.remove('fade-in');
         }
      });
   };

   // Listen for scroll events to trigger fade-in
   window.addEventListener('scroll', fadeInOnScroll);
   fadeInOnScroll(); // Run once on load to check initial visibility of sections


   // Form submission (frontend only - needs a backend service for actual email sending)
   const contactForm = document.querySelector('.contact-form');
   if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
         e.preventDefault(); // Prevent default form submission (page reload)

         // In a real application, you would send this data to a backend server
         // or a third-party form service (e.g., Formspree, Netlify Forms).
         // Example using fetch API (requires a backend endpoint to receive the data):
         /*
         const formData = {
             name: document.getElementById('name').value,
             email: document.getElementById('email').value,
             subject: document.getElementById('subject').value,
             message: document.getElementById('message').value,
         };

         fetch('YOUR_FORM_SUBMISSION_ENDPOINT_HERE', { // Replace with your actual endpoint
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json' // Often required by form services
             },
             body: JSON.stringify(formData),
         })
         .then(response => {
             if (response.ok) { // Check if the response status is 2xx
                 return response.json(); // Or response.text() if your backend doesn't return JSON
             }
             throw new Error('Network response was not ok.');
         })
         .then(data => {
             alert('Thank you for your message! Your message has been sent successfully.');
             contactForm.reset(); // Clear the form
         })
         .catch((error) => {
             console.error('Error submitting form:', error);
             alert('Failed to send message. Please try again later.');
         });
         */

         // Frontend-only alert for demonstration purposes:
         alert('Thank you for your message! (Note: This is a frontend alert. A backend service is required for actual email submission.)');
         contactForm.reset(); // Clear the form after "submission"
      });
   }
});
