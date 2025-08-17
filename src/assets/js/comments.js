document.addEventListener('DOMContentLoaded', () => {

    // --- Seleção dos Elementos do DOM ---
    const commentForm = document.getElementById('comment-form');
    const authorInput = document.getElementById('author');
    const textInput = document.getElementById('text');
    const commentsList = document.getElementById('comments-list');

    // Chave para salvar os comentários no localStorage, conforme o prompt [cite: 29]
    const COMMENTS_KEY = 'app_comments';

    /**
     * Função principal para renderizar os comentários na tela.
     * Ela lê do localStorage e monta o HTML. [cite: 42]
     */
    function renderComments() {
        const comments = getData(COMMENTS_KEY) || [];
        commentsList.innerHTML = ''; // Limpa a lista antes de renderizar

        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="empty-list-message">Nenhum comentário ainda. Seja o primeiro!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            // Adiciona um data-id para sabermos qual comentário é qual
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

    /**
     * Adiciona um novo comentário.
     * @param {string} author - O nome do autor.
     * @param {string} text - O texto do comentário.
     */
    function addComment(author, text) {
        const comments = getData(COMMENTS_KEY) || [];
        const newComment = {
            id: crypto.randomUUID(), // Gera um ID único e seguro
            author: author,
            text: text,
            likes: 0,
            createdAt: new Date().toISOString()
        }; // Modelo de dados conforme o prompt [cite: 31, 32]

        comments.push(newComment);
        setData(COMMENTS_KEY, comments); // Sincroniza com o localStorage [cite: 41]
    }

    /**
     * Incrementa o like de um comentário específico.
     * @param {string} id - O ID do comentário a ser curtido.
     */
    function likeComment(id) {
        const comments = getData(COMMENTS_KEY) || [];
        const comment = comments.find(c => c.id === id);
        if (comment) {
            comment.likes++; // Apenas incrementa [cite: 14]
        }
        setData(COMMENTS_KEY, comments); // Sincroniza com o localStorage [cite: 41]
    }

    /**
     * Remove um comentário específico.
     * @param {string} id - O ID do comentário a ser removido.
     */
    function removeComment(id) {
        let comments = getData(COMMENTS_KEY) || [];
        // Filtra o array, mantendo apenas os comentários com ID diferente
        comments = comments.filter(c => c.id !== id);
        setData(COMMENTS_KEY, comments); // Sincroniza com o localStorage [cite: 41]
    }

    /**
     * Função simples para evitar a injeção de HTML nos comentários.
     * @param {string} str - A string a ser "limpa".
     */
    function escapeHTML(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // --- Event Listeners ---

    // 1. Ouvinte para o envio do formulário
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o recarregamento da página [cite: 39]

        const author = authorInput.value.trim();
        const text = textInput.value.trim();

        // Validação simples dos campos [cite: 39]
        if (author && text) {
            addComment(author, text);
            authorInput.value = '';
            textInput.value = '';
            renderComments(); // Re-renderiza a lista para mostrar o novo comentário [cite: 39]
        }
    });

    // 2. Ouvinte para os cliques na lista de comentários (Event Delegation) [cite: 40]
    commentsList.addEventListener('click', (event) => {
        const target = event.target;
        // Encontra o elemento .comment-item mais próximo do clique
        const commentElement = target.closest('.comment-item');

        if (!commentElement) return; // Se não clicou em nada dentro de um comentário, ignora

        const commentId = commentElement.dataset.id;

        if (target.classList.contains('like-btn')) {
            likeComment(commentId);
            renderComments(); // Atualiza a UI
        }

        if (target.classList.contains('remove-btn')) {
            removeComment(commentId);
            renderComments(); // Atualiza a UI
        }
    });

    // --- Inicialização ---
    // Renderiza os comentários existentes assim que a página carrega.
    renderComments();
});