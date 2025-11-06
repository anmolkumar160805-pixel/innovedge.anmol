// Homeground JavaScript functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the enter world button
    const enterWorldBtn = document.getElementById('enterWorldBtn');
    
    // Add click event listener to the button
    enterWorldBtn.addEventListener('click', function() {
        // Prevent multiple clicks during animation
        if (this.classList.contains('animating')) {
            return;
        }
        
        // Add animation classes
        this.classList.add('animating', 'animate');
        
        // Wait for animation to complete, then navigate to login page
        setTimeout(() => {
            // Navigate to login page
            window.location.href = 'login.html';
        }, 600); // Match the animation duration
    });
    
    // Reset animation classes after animation completes
    enterWorldBtn.addEventListener('animationend', function() {
        this.classList.remove('animate');
    });
    
    // Reset animating class after a delay to allow for navigation
    enterWorldBtn.addEventListener('transitionend', function() {
        setTimeout(() => {
            this.classList.remove('animating');
        }, 100);
    });
});

// Function to close popup (if it exists)
function closePopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    
    if (overlay && popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 300);
    }
}

// Smooth scrolling for footer links
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
