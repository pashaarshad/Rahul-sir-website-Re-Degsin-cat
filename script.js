// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

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

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        fullname: document.getElementById('fullname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };
    
    // Validate form
    if (!formData.fullname || !formData.phone || !formData.email) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you! We will contact you soon.', 'success');
        document.querySelector('.contact-form').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Action button handlers
document.querySelectorAll('.action-btn, .cta-btn, .section-btn, .tracker-btn, .insights-cta-btn, .get-started-btn, .journey-cta-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const btnText = this.textContent.trim();
        
        switch(btnText) {
            case 'CAT Syllabus':
                showNotification('CAT Syllabus will be available soon!', 'info');
                break;
            case 'View Pricing':
                showNotification('Pricing details will be shared shortly!', 'info');
                break;
            case 'Book Session':
                document.querySelector('.consultation-form').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Free Demo':
                showNotification('Free demo registration coming soon!', 'info');
                break;
            case 'Talk to Expert':
                document.querySelector('.consultation-form').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Live Webinar':
                showNotification('Live webinar schedule will be announced!', 'info');
                break;
            case 'Start Your Journey':
            case 'Start Your CAT Journey with Rahul Sir':
                document.querySelector('.consultation-form').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Past Year Papers':
                showNotification('Past year papers will be available in resources section!', 'info');
                break;
            case "Join Rahul Sir's VARC Mastery":
                showNotification('VARC Mastery program enrollment opening soon!', 'success');
                break;
            case "Join Rahul Sir's DILR Program":
                showNotification('DILR program enrollment opening soon!', 'success');
                break;
            case "Join Rahul Sir's QA Bootcamp":
                showNotification('QA Bootcamp enrollment opening soon!', 'success');
                break;
            case "Join Rahul Sir's Mastery Program":
                showNotification('Mastery program enrollment opening soon!', 'success');
                break;
            case 'Join Rahul Sir for Expert Guidance':
                document.querySelector('.consultation-form').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Get Started':
                document.querySelector('.consultation-form').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid;
        }
        
        .notification.success {
            border-left-color: #00ff88;
            color: #0f1419;
        }
        
        .notification.error {
            border-left-color: #ff4757;
            color: #0f1419;
        }
        
        .notification.info {
            border-left-color: #00d4ff;
            color: #0f1419;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-icon {
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .notification-message {
            flex: 1;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: inherit;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Journey step animation
function animateJourneySteps() {
    const steps = document.querySelectorAll('.journey-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
        }, index * 500);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('journey-section')) {
                animateJourneySteps();
            }
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.hero-title, .journey-section, .action-grid, .instructor-card, .consultation-form');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Parallax effect for background circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-circle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add hover effects to cards
document.querySelectorAll('.exam-card, .instructor-card, .consultation-form, .exam-section, .mastery-tracker, .exam-overview, .course-features, .expert-insights').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('exam-section')) {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('exam-section')) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        }
    });
});

// Dynamic typing effect for hero title
function typeEffect() {
    const title = document.querySelector('.hero-title');
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid #00d4ff';
    
    let i = 0;
    const timer = setInterval(() => {
        title.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 500);
});

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .journey-step {
        transition: all 0.5s ease;
        opacity: 0.5;
        transform: scale(0.9);
    }
    
    .journey-step.active {
        opacity: 1;
        transform: scale(1);
    }
`;

document.head.appendChild(animationStyles);

console.log('CAT Coaching Website - JavaScript Loaded Successfully!');

// Journey Timeline Navigation
let currentJourneyStep = 0;
const journeySteps = document.querySelectorAll('.timeline-step');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function updateJourneyStep(stepIndex) {
    journeySteps.forEach((step, index) => {
        step.classList.toggle('active', index <= stepIndex);
    });
    
    // Update buttons
    if (prevBtn && nextBtn) {
        prevBtn.disabled = stepIndex === 0;
        nextBtn.disabled = stepIndex === journeySteps.length - 1;
        
        prevBtn.style.opacity = stepIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = stepIndex === journeySteps.length - 1 ? '0.5' : '1';
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentJourneyStep > 0) {
            currentJourneyStep--;
            updateJourneyStep(currentJourneyStep);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentJourneyStep < journeySteps.length - 1) {
            currentJourneyStep++;
            updateJourneyStep(currentJourneyStep);
        }
    });
}

// Auto-advance journey steps
function autoAdvanceJourney() {
    const interval = setInterval(() => {
        if (currentJourneyStep < journeySteps.length - 1) {
            currentJourneyStep++;
            updateJourneyStep(currentJourneyStep);
        } else {
            currentJourneyStep = 0;
            updateJourneyStep(currentJourneyStep);
        }
    }, 3000);
    
    // Stop auto-advance when user interacts
    if (prevBtn && nextBtn) {
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(interval);
            });
        });
    }
}

// Start auto-advance when journey section is visible
const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            autoAdvanceJourney();
            journeyObserver.unobserve(entry.target);
        }
    });
});

const journeySection = document.querySelector('.success-journey');
if (journeySection) {
    journeyObserver.observe(journeySection);
}

// Progress bar animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .progress-remaining');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Topic cards interaction
document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', function() {
        const topicName = this.querySelector('span').textContent;
        showNotification(`${topicName} - Detailed content coming soon!`, 'info');
    });
});

// Exam section expand/collapse
document.querySelectorAll('.exam-section').forEach(section => {
    const header = section.querySelector('.section-header-card');
    const content = section.querySelector('.topics-grid');
    
    header.addEventListener('click', function() {
        const isExpanded = section.classList.contains('expanded');
        
        // Close all other sections
        document.querySelectorAll('.exam-section').forEach(otherSection => {
            if (otherSection !== section) {
                otherSection.classList.remove('expanded');
            }
        });
        
        section.classList.toggle('expanded', !isExpanded);
    });
});

// Add expanded state styles
const expandStyles = document.createElement('style');
expandStyles.textContent = `
    .exam-section:not(.expanded) .topics-grid {
        display: none;
    }
    
    .exam-section:not(.expanded) .section-cta {
        display: none;
    }
    
    .exam-section .section-header-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .exam-section .section-header-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 1rem;
        margin: -1rem;
    }
    
    .exam-section.expanded {
        border-color: rgba(0, 212, 255, 0.7);
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
    }
`;

document.head.appendChild(expandStyles);

// Initialize first section as expanded
const firstExamSection = document.querySelector('.exam-section');
if (firstExamSection) {
    firstExamSection.classList.add('expanded');
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#courses') {
            const target = document.querySelector('.exam-structure-section');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Intersection Observer for progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
        }
    });
}, { threshold: 0.5 });

const masteryTracker = document.querySelector('.mastery-tracker');
if (masteryTracker) {
    progressObserver.observe(masteryTracker);
}
