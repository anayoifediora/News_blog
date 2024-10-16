const logoutLink = document.querySelector('#logout');

const logoutHanlder = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'applicaiton/json'}
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}

logoutLink.addEventListener('click', logoutHanlder);
