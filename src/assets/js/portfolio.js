document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os botões de filtro e os cards de projeto
    const filterChips = document.querySelectorAll(".chip[data-filter]");
    const projectCards = document.querySelectorAll(".project-card");

    // Se não houver filtros na página, o script não precisa rodar.
    if (filterChips.length === 0) {
        return;
    }

    // Função que aplica o filtro com base no botão ativo
    function applyFilter(activeFilter) {
        projectCards.forEach(card => {
            const cardTags = card.dataset.tags || ""; // Pega as tags do card

            // O card será visível se o filtro for "all" ou se suas tags incluírem o filtro ativo.
            const shouldBeVisible = activeFilter === "all" || cardTags.includes(activeFilter);

            card.style.display = shouldBeVisible ? "" : "none";
        });
    }

    // Adiciona o evento de clique a cada botão de filtro
    filterChips.forEach(chip => {
        chip.addEventListener("click", () => {
            // Remove o estado "pressionado" de todos os botões
            filterChips.forEach(c => c.setAttribute("aria-pressed", "false"));

            // Ativa o estado "pressionado" apenas no botão clicado
            chip.setAttribute("aria-pressed", "true");

            // Pega o valor do filtro a ser aplicado
            const activeFilter = chip.dataset.filter;

            applyFilter(activeFilter);
        });
    });

    // --- Inicialização ---
    // Ativa o filtro "Todos" por padrão ao carregar a página.
    const allFilterButton = document.querySelector('.chip[data-filter="all"]');
    if (allFilterButton) {
        allFilterButton.setAttribute("aria-pressed", "true");
        applyFilter("all");
    }
});