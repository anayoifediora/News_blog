const loginForm = document.querySelector('.login-form');

const formHandler = async (e) => {
    e.preventDefault();
    
    //Get the user inputs excluding any whitespace
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to login');
        }
    }
};

loginForm.addEventListener('submit', formHandler);