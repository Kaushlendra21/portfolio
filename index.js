// Typing Animation for Hero Section
const textElement = document.querySelector('.text-animation');
// Professions based on your input
const professions = ["Web Developer", "Front-end Developer", "Responsive Designer", "Code Enthusiast"];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // milliseconds per character
const deletingSpeed = 60; // milliseconds per character
const delayBetweenProfessions = 2000; // milliseconds before typing next profession

function typeEffect() {
    const currentProfession = professions[professionIndex];
    const currentChar = currentProfession.substring(0, charIndex);
    textElement.textContent = currentChar;

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentProfession.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenProfessions);
        } else {
            setTimeout(typeEffect, typingSpeed);
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            setTimeout(typeEffect, 500); // Small delay before typing next profession
        } else {
            setTimeout(typeEffect, deletingSpeed);
        }
    }
}

// Ensure the typing effect starts after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', typeEffect);

// Responsive Navbar Toggle for mobile devices
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    // Toggles the 'active' class on the navbar to show/hide it
    navbar.classList.toggle('active');
    // Toggles hamburger icon between bars and times (X)
    hamburger.querySelector('i').classList.toggle('fa-times');
    hamburger.querySelector('i').classList.toggle('fa-bars');
});

// Closes the navbar when a navigation link is clicked (especially useful for mobile)
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        // Removes 'active' class to hide the navbar
        navbar.classList.remove('active');
        // Resets hamburger icon to bars
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Smooth Scrolling and Active Navbar Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header'); // Get the header element

window.addEventListener('scroll', () => {
    let current = '';

    // Loop through sections to determine which one is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for fixed header height
        const sectionHeight = section.clientHeight;
        // Check if the current scroll position is within the section
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Add 'active' class to the corresponding navbar link and remove from others
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });

    // Add/remove 'scrolled' class to header based on scroll position
    if (window.scrollY > 50) { // Add 'scrolled' class after scrolling 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Ensure 'scrolled' class is applied if user refreshes page while scrolled down
document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});


// Intersection Observer for Scroll Animations
// This will animate sections (excluding the hero, which uses CSS animations on load)
// as they enter the viewport.

// Options for the observer
const sectionObserverOptions = {
    root: null, // observe in relation to the viewport
    rootMargin: "0px",
    threshold: 0.15 // trigger when 15% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the section is intersecting (visible)
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add 'show' class to trigger animation
        } else {
            // Optional: Remove 'show' class if section is out of view
            // This allows re-animation if user scrolls back and forth.
            // Remove this 'else' block if you only want animations to happen once.
            entry.target.classList.remove('show');
        }
    });
}, sectionObserverOptions);

// Select all sections to observe, excluding the hero section
document.querySelectorAll('section:not(#home)').forEach(section => {
    // Add an initial 'hidden' class to these sections
    section.classList.add('hidden');
    // Start observing each section
    sectionObserver.observe(section);
});


// Basic form submission (alert message as placeholder)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission to handle it via JS

    // In a real application, you would send this data to a backend server
    // using fetch API or XMLHttpRequest.
    // Example:
    /*
    const formData = new FormData(contactForm);
    fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Message sent successfully!');
        contactForm.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
    */

    // For demonstration, we'll just show an alert
    alert('Thank you for your message, Kaushlendra! (This form is for demonstration. A backend service is needed for actual email functionality.)');
    contactForm.reset(); // Clear the form fields after submission
});
