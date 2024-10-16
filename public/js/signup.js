const signupForm = document.querySelector('.signup-form');

const signupHandler = async (e) => {
    e.preventDefault();

    //Get the user inputs excluding any whitespace
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up')
        }
    }
};

signupForm.addEventListener('submit', signupHandler);
