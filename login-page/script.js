document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
    }
    
    // Log in console (in real app, you'd send to a server)
    console.log('Login attempt:', {
        email: email,
        password: '***',
        remember: remember
    });
    
    // Show success message
    alert('Login successful!\n\nEmail: ' + email + '\nRemember me: ' + remember);
    
    // Clear form
    this.reset();
});

// Optional: Save email if "Remember me" is checked
document.getElementById('loginForm').addEventListener('change', function() {
    const email = document.getElementById('email').value;
    const remember = document.getElementById('remember').checked;
    
    if (remember && email) {
        localStorage.setItem('savedEmail', email);
    } else {
        localStorage.removeItem('savedEmail');
    }
});

// Load saved email on page load
window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
    }
});