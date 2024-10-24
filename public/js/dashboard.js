const postForm = document.querySelector('.custom-postform');
const newPostBtn = document.querySelector('.custom-createpost-btn');
const deleteBtn = document.querySelector('.custom-delete-btn');
const updateBtn = document.querySelector('.custom-update-btn');
const postsContainer = document.querySelector('.custom-userposts');

//Event listener that displays the new post form when the "new post" button is clicked.
newPostBtn.addEventListener('click', () => {
    postForm.setAttribute('style', 'display: block;')
})

//Event handler that creates a new post.
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
            document.location.reload();
        } else {
            alert('Failed to create post');
        }
    }
    
};

//Event handler to delete a post
const deleteHandler = async (e) => {
    if(e.target.classList.contains('custom-delete-btn')) {
        e.stopPropagation();
        
        const id = e.target.id
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' } 
        })
        if(response.ok) {
            document.location.reload()
        } else {
            alert('Failed to delete post')
        }
    }

}

//Event handler to update a post

postsContainer.addEventListener('click', deleteHandler)
postForm.addEventListener('submit', postFormHandler);