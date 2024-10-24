const viewCommentBtn = document.querySelector('.custom-viewcomment-btn');
const comments = document.querySelector('.custom-comments');
const postCommentForm = document.querySelector('.custom-commentform');

const postCommentHandler = async (e) => {
    e.preventDefault();
    const description = document.querySelector('#comment').value.trim();
    const post_id = window.location.href.split('/').pop()
    if(comment) {

        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ description, post_id }),
            headers: { 'Content-type': 'application/json' }
        });
        if(response.ok) {
            document.location.reload();
            comments.setAttribute('style', 'display: block');
        } else {
            alert('Failed to add comment');
        }
    } else {
        console.log(err)
    }
}

const displayComments = () => {
    comments.setAttribute('style', 'display: block');
}
postCommentForm.addEventListener('submit', postCommentHandler);
viewCommentBtn.addEventListener('click', displayComments);