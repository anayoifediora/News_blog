const postForm = document.querySelector('.custom-postform');
const postFormHandler = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    
    if(title && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to create post');
        }
    }
    
};

postForm.addEventListener('submit', postFormHandler);