document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const closeModal = document.querySelector('.close');

    const auth = firebase.auth();

    // Show modal
    function showModal() {
        modal.style.display = 'flex';
    }

    // Hide modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Switch between login and register forms
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        document.getElementById('modal-title').textContent = 'Register';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
        document.getElementById('modal-title').textContent = 'Login';
    });

    // Close modal when 'x' is clicked
    closeModal.addEventListener('click', hideModal);

    // Show modal after a few seconds on homepage
    if (window.location.pathname === '/index.html') {
        setTimeout(showModal, 5000); // Show modal after 5 seconds
    }

    // Show modal when login icon is clicked
    document.querySelector('.login-icon').addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });

    // Handle login
    document.getElementById('login-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Login successful:', userCredential.user);
                hideModal();
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('Login failed: ' + error.message);
            });
    });

    // Handle registration
    document.getElementById('register-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('register-firstname').value;
        const lastName = document.getElementById('register-lastname').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Registration successful:', userCredential.user);
                hideModal();
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Registration failed:', error);
                alert('Registration failed: ' + error.message);
            });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
});
