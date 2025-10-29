// Contact-specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFormValidation();
    initializeContactAnimations();
    initializeSocialLinks();
});

// Enhanced contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

// Real-time field validation
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${field.previousElementSibling.textContent} is required.`;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Apply validation classes
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('is-invalid');
    hideFieldError(field);
}

// Show field error message
function showFieldError(field, message) {
    hideFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    errorDiv.id = `${field.id}-error`;
    
    field.parentNode.appendChild(errorDiv);
}

// Hide field error message
function hideFieldError(field) {
    const existingError = document.getElementById(`${field.id}-error`);
    if (existingError) {
        existingError.remove();
    }
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Please correct the errors in the form.', 'danger');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real application, you would send the data to a server
        console.log('Form data:', Object.fromEntries(formData));
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        
        // Clear validation classes
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Track form submission (analytics)
        trackFormSubmission();
        
    }, 2000);
}

// Initialize form validation
function initializeFormValidation() {
    // Add custom validation messages
    const validationMessages = {
        valueMissing: 'This field is required.',
        typeMismatch: 'Please enter a valid value.',
        patternMismatch: 'Please match the requested format.',
        tooShort: 'Please enter at least {minlength} characters.',
        tooLong: 'Please enter no more than {maxlength} characters.',
        rangeUnderflow: 'Please enter a value greater than or equal to {min}.',
        rangeOverflow: 'Please enter a value less than or equal to {max}.',
        stepMismatch: 'Please enter a valid value.',
        badInput: 'Please enter a valid value.',
        customError: 'Please correct this field.'
    };
    
    // Override default validation messages
    Object.keys(validationMessages).forEach(key => {
        const input = document.createElement('input');
        input.setCustomValidity = function(message) {
            this.validationMessage = message || validationMessages[key];
        };
    });
}

// Initialize contact animations
function initializeContactAnimations() {
    // Animate contact items on scroll
    const contactItems = document.querySelectorAll('.contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// Initialize social links
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.querySelector('i').className.includes('github') ? 'GitHub' : 'LinkedIn';
            
            // Track social link click
            trackSocialClick(platform);
            
            // Show coming soon message for demo
            showNotification(`${platform} profile coming soon!`, 'info');
            
            // In a real application, you would redirect to the actual profile
            // window.open(this.href, '_blank');
        });
    });
}

// CV download functionality
function initializeCVDownload() {
    const cvButton = document.querySelector('.cv-download .btn');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Track CV download
            trackCVDownload();
            
            // Show message for demo
            showNotification('CV download will be available soon!', 'info');
            
            // In a real application, you would trigger the actual download
            // window.open('path/to/cv.pdf', '_blank');
        });
    }
}

// Initialize CV download
document.addEventListener('DOMContentLoaded', function() {
    initializeCVDownload();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle-fill',
        danger: 'exclamation-triangle-fill',
        warning: 'exclamation-triangle-fill',
        info: 'info-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}

// Analytics tracking functions
function trackFormSubmission() {
    // In a real application, you would send this to your analytics service
    console.log('Form submission tracked');
    
    // Example: Google Analytics
    // gtag('event', 'form_submit', {
    //     event_category: 'contact',
    //     event_label: 'contact_form'
    // });
}

function trackSocialClick(platform) {
    // In a real application, you would send this to your analytics service
    console.log(`Social link clicked: ${platform}`);
    
    // Example: Google Analytics
    // gtag('event', 'click', {
    //     event_category: 'social',
    //     event_label: platform
    // });
}

function trackCVDownload() {
    // In a real application, you would send this to your analytics service
    console.log('CV download tracked');
    
    // Example: Google Analytics
    // gtag('event', 'file_download', {
    //     event_category: 'contact',
    //     event_label: 'cv_download'
    // });
}

// Form data persistence (save draft)
function initializeFormPersistence() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const storageKey = 'contactFormDraft';
    
    // Load saved data
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.error('Error loading form data:', e);
        }
    }
    
    // Save data on input
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem(storageKey, JSON.stringify(data));
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', () => {
        setTimeout(() => {
            localStorage.removeItem(storageKey);
        }, 1000);
    });
}

// Initialize form persistence
document.addEventListener('DOMContentLoaded', function() {
    initializeFormPersistence();
});

// Export functions for external use
window.ContactManager = {
    initializeContactForm,
    validateField,
    showNotification,
    trackFormSubmission,
    trackSocialClick,
    trackCVDownload
};
