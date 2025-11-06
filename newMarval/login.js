// Login Page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.login-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // New elements for registration
    const newJoinBtn = document.getElementById('newJoinBtn');
    const showRegistrationLink = document.getElementById('showRegistration');
    const registrationOverlay = document.getElementById('registrationOverlay');
    const closeRegistrationBtn = document.getElementById('closeRegistration');
    const registrationForm = document.getElementById('registrationForm');
    const successOverlay = document.getElementById('successOverlay');
    const photoInput = document.getElementById('regPhoto');
    const photoPreview = document.getElementById('photoPreview');
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate form
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Simulate login process (replace with actual authentication)
        setTimeout(() => {
            // Simulate successful login
            if (email === 'admin@innovedge.com' && password === 'password') {
                showNotification('Login successful! Redirecting...', 'success');
                
                // Store login state if remember me is checked
                if (remember) {
                    localStorage.setItem('rememberedUser', email);
                }
                
                // Redirect to dashboard or main page
                setTimeout(() => {
                    window.location.href = 'homeground.html';
                }, 1500);
            } else {
                showNotification('Invalid email or password', 'error');
                hideLoadingState();
            }
        }, 2000);
    });
    
    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('email').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add enter key support for form submission
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    });
    
    // New Join Button functionality
    newJoinBtn.addEventListener('click', function() {
        registrationOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Show registration from signup link
    showRegistrationLink.addEventListener('click', function(e) {
        e.preventDefault();
        registrationOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close registration overlay
    closeRegistrationBtn.addEventListener('click', function() {
        registrationOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close registration when clicking outside
    registrationOverlay.addEventListener('click', function(e) {
        if (e.target === registrationOverlay) {
            registrationOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Registration form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.class || !data.branch) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidPhone(data.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.registration-submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Hide registration overlay
            registrationOverlay.classList.remove('active');
            
            // Show success overlay
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            registrationForm.reset();
            photoPreview.innerHTML = '';
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Store registration data (in real app, send to server)
            console.log('Registration data:', data);
            
        }, 2000);
    });
    
    // Photo upload preview
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Dynamic background effect
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', x + '%');
        document.documentElement.style.setProperty('--mouse-y', y + '%');
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Show loading state
function showLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
}

// Hide loading state
function hideLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
