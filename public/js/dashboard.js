const postForm = document.querySelector('.custom-postform');
const newPostBtn = document.querySelector('.custom-createpost-btn');
const deleteBtn = document.querySelector('.custom-delete-btn');
const updateBtn = document.querySelector('.custom-update-btn');
const postsContainer = document.querySelector('.custom-userposts');
const updateForm = document.querySelector('.custom-updateForm');
const updatePostBtn = document.querySelector('.custom-updatepost-btn');

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
    //confirm the deletion of a post
    
    if(e.target.classList.contains('custom-delete-btn')) {
        e.stopPropagation();
        let confirmation = 'Are you sure you want to delete?';
        if (confirm(confirmation) == true) {
            const id = e.target.id;
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' } 
            })
            if(response.ok) {
                document.location.reload();
                alert('Post deleted !😊');
            } else {
                alert('Failed to delete post');
            }
        }
    } 

}

//Event handler to fetch a post's title and description to update
const getPostDetails = async (e) => {
    const id = e.target.id;
    if (e.target.classList.contains('custom-update-btn')) {
        try {
            const response = await fetch(`/api/posts/updates/${id}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json()
            const title = document.querySelector('#update-title');
            const description = document.querySelector('#update-description');
            console.log(data);
            title.value = data.title;
            description.textContent = data.description;
            //sets the id attribute of the "submit update btn equal to the post_id"
            updatePostBtn.setAttribute('id', id);
        } catch (err) {
            console.error(err)
        }

    }
}

//Event handler that updates a post.
const updateFormHandler = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#update-title').value.trim();
    const description = document.querySelector('#update-description').value.trim()
    const id = updatePostBtn.getAttribute('id');
    if(title && description) {
        
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
            alert('Successfully updated! 👍');
        } else {
            alert('Failed to update post');
        }
    }
    
};
postsContainer.addEventListener('click', getPostDetails)
postsContainer.addEventListener('click', deleteHandler)
postForm.addEventListener('submit', postFormHandler);
updateForm.addEventListener('submit', updateFormHandler);