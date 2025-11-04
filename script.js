// Theme toggle button logic
const toggleButton = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Apply saved or preferred theme on initial load
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
   document.body.classList.add('dark-mode');
   if (toggleButton) toggleButton.textContent = '☀️';
} else {
   if (toggleButton) toggleButton.textContent = '🌙';
}

// Toggle theme on button click
if (toggleButton) {
   toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      toggleButton.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
   });
}

document.addEventListener('DOMContentLoaded', () => {
   document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const targetId = this.getAttribute('href');
         const targetSection = document.querySelector(targetId);
         if (targetSection) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20;
            window.scrollTo({
               top: offsetPosition,
               behavior: 'smooth'
            });
         }
      });
   });

   const hamburgerMenu = document.querySelector('.hamburger-menu');
   const navLinks = document.querySelector('.nav-links');
   if (hamburgerMenu && navLinks) {
      hamburgerMenu.addEventListener('click', () => {
         navLinks.classList.toggle('active');
         const icon = hamburgerMenu.querySelector('i');
         if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
         } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
         }
      });
      navLinks.querySelectorAll('a').forEach(link => {
         link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerMenu.querySelector('i').classList.remove('fa-times');
            hamburgerMenu.querySelector('i').classList.add('fa-bars');
         });
      });
   }

   const sections = document.querySelectorAll('section');
   const fadeInOnScroll = () => {
      sections.forEach(section => {
         const sectionTop = section.getBoundingClientRect().top;
         const screenHeight = window.innerHeight;
         if (sectionTop < screenHeight * 0.75) {
            section.classList.add('fade-in');
         } else {
            section.classList.remove('fade-in');
         }
      });
   };
   window.addEventListener('scroll', fadeInOnScroll);
   fadeInOnScroll();

   // Back to Top Button
   const backToTopButton = document.getElementById('back-to-top');
   
   // Show/hide back to top button based on scroll position
   window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
         backToTopButton.classList.add('visible');
      } else {
         backToTopButton.classList.remove('visible');
      }
   });
   
   // Scroll to top when button is clicked
   backToTopButton.addEventListener('click', () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   });

   const contactForm = document.querySelector('.contact-form');
   if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
         const submitButton = contactForm.querySelector('button[type="submit"]');
         if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
         }
      });
   }

   const urlParams = new URLSearchParams(window.location.search);
   if (urlParams.get('success') === 'true') {
      const successMessage = document.createElement('div');
      successMessage.innerHTML = '<div style="position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 20px 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999;"><strong>✓ Success!</strong> Your message has been sent successfully. I will get back to you soon!</div>';
      document.body.appendChild(successMessage);
      setTimeout(() => {
         successMessage.remove();
         window.history.replaceState({}, document.title, window.location.pathname);
      }, 5000);
   }

   // AI/ML Typing Animation Completion
   const typingText = document.querySelector('.typing-text');
   if (typingText) {
      // Remove the cursor after typing animation completes
      setTimeout(() => {
         typingText.classList.add('completed');
      }, 4500); // 3.5s typing + 1s delay
   }

   // Dynamic Binary Code Generation
   function generateBinaryCode() {
      return Math.random().toString(2).substr(2, 8).padStart(8, '0');
   }

   // Update binary codes periodically for variety
   const binaryCodes = document.querySelectorAll('.binary-code');
   setInterval(() => {
      binaryCodes.forEach(code => {
         code.textContent = generateBinaryCode();
      });
   }, 3000);
});
