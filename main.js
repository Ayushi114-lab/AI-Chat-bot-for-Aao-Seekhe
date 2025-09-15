// Main Website JavaScript - js/main.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const course = this.querySelector('select').value;
            
            // Simple validation
            if (!name || !email || !phone || !course) {
                alert('Please fill in all required fields marked with *');
                return;
            }
            
            // Success message
            alert(`Thank you ${name}! We have received your request for ${course} consultation. Our expert counselor will contact you within 24 hours at ${phone}. Get ready to achieve your global dreams!`);
            
            // Reset form
            this.reset();
        });
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        header.style.background = 'rgba(255,255,255,0.98)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.background = 'white';
    }
});

// Animate stats on scroll
let statsAnimated = false;
const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const suffix = stat.textContent.includes('%') ? '%' : '+';
            stat.textContent = Math.floor(current) + suffix;
        }, 50);
    });
};

// Intersection Observer for stats animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Hero slider functionality
let currentSlide = 0;
const heroSlides = [
    {
        tagline: "🏆 CRACK THE EXAM, CONQUER THE WORLD!",
        title: "Expert-Led Coaching To Turn Your Global Dreams Into Reality",
        subtitle: "Unlock your potential with Aao Seekhe, Lucknow's best coaching institute for GRE, GMAT, SAT, and IELTS, ensuring your global success."
    },
    {
        tagline: "🎯 ACHIEVE YOUR TARGET SCORES!",
        title: "23 Years of Excellence in Test Preparation",
        subtitle: "Join thousands of successful students who achieved their dream scores and got admitted to top universities worldwide."
    },
    {
        tagline: "🌟 PERSONALIZED LEARNING APPROACH!",
        title: "One-on-One Mentorship For Guaranteed Results",
        subtitle: "Get personalized study plans, expert guidance, and continuous support to maximize your potential and achieve outstanding results."
    }
];

const updateHeroContent = () => {
    const tagline = document.querySelector('.hero-tagline');
    const title = document.querySelector('.hero-content h1');
    const subtitle = document.querySelector('.hero-subtitle');
    
    if (tagline && title && subtitle) {
        const slide = heroSlides[currentSlide];
        tagline.textContent = slide.tagline;
        title.textContent = slide.title;
        subtitle.textContent = slide.subtitle;
    }
};

// Navigation arrows functionality
document.addEventListener('DOMContentLoaded', function() {
    const prevArrow = document.querySelector('.nav-arrow.prev');
    const nextArrow = document.querySelector('.nav-arrow.next');
    
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : heroSlides.length - 1;
            updateHeroContent();
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            currentSlide = currentSlide < heroSlides.length - 1 ? currentSlide + 1 : 0;
            updateHeroContent();
        });
    }
    
    // Auto-slide functionality
    setInterval(() => {
        currentSlide = currentSlide < heroSlides.length - 1 ? currentSlide + 1 : 0;
        updateHeroContent();
    }, 8000);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                navMenu.style.zIndex = '1001';
            }
        });
    }
});

// Add fade-in animation for service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards and testimonial cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu && !mobileMenuBtn.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.style.display = 'none';
    }
});

// Contact info click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle phone number clicks
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', function(e) {
            // Allow default behavior but could add tracking here
            console.log('Phone call initiated:', this.href);
        });
    });
    
    // Handle email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(email => {
        email.addEventListener('click', function(e) {
            // Allow default behavior but could add tracking here
            console.log('Email initiated:', this.href);
        });
    });
});

// Performance optimization - lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});