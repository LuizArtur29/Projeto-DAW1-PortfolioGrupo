document.addEventListener('DOMContentLoaded', () => {

    const commentForm = document.getElementById('comment-form');
    const authorInput = document.getElementById('author');
    const textInput = document.getElementById('text');
    const commentsList = document.getElementById('comments-list');

    // Chave para salvar os comentários no localStorage
    const COMMENTS_KEY = 'app_comments';

    function renderComments() {
        const comments = getData(COMMENTS_KEY) || [];
        commentsList.innerHTML = '';

        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="empty-list-message">Nenhum comentário ainda. Seja o primeiro!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.dataset.id = comment.id;

            commentElement.innerHTML = `
                <div class="comment-header">
                    <strong>${escapeHTML(comment.author)}</strong>
                    <span>${new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p>${escapeHTML(comment.text)}</p>
                <div class="comment-actions">
                    <button class="like-btn">👍 Curtir (${comment.likes})</button>
                    <button class="remove-btn">🗑️ Remover</button>
                </div>
            `;
            commentsList.appendChild(commentElement);
        });
    }

    function addComment(author, text) {
        const comments = getData(COMMENTS_KEY) || [];
        const newComment = {
            id: crypto.randomUUID(), // Gera um ID único e seguro
            author: author,
            text: text,
            likes: 0,
            createdAt: new Date().toISOString()
        };

        comments.push(newComment);
        setData(COMMENTS_KEY, comments);
    }

    function likeComment(id) {
        const comments = getData(COMMENTS_KEY) || [];
        const comment = comments.find(c => c.id === id);
        if (comment) {
            comment.likes++;
        }
        setData(COMMENTS_KEY, comments);
    }

    function removeComment(id) {
        let comments = getData(COMMENTS_KEY) || [];
        comments = comments.filter(c => c.id !== id);
        setData(COMMENTS_KEY, comments);
    }

    function escapeHTML(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const author = authorInput.value.trim();
        const text = textInput.value.trim();

        if (author && text) {
            addComment(author, text);
            authorInput.value = '';
            textInput.value = '';
            renderComments();
        }
    });

    commentsList.addEventListener('click', (event) => {
        const target = event.target;
        const commentElement = target.closest('.comment-item');

        if (!commentElement) return;

        const commentId = commentElement.dataset.id;

        if (target.classList.contains('like-btn')) {
            likeComment(commentId);
            renderComments();
        }

        if (target.classList.contains('remove-btn')) {
            removeComment(commentId);
            renderComments();
        }
    });

    renderComments();
});