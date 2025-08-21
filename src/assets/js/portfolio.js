document.addEventListener("DOMContentLoaded", () => {
    const filterChips = document.querySelectorAll(".chip[data-filter]");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterChips.length === 0) {
        return;
    }

    function applyFilter(activeFilter) {
        projectCards.forEach(card => {
            const cardTags = card.dataset.tags || ""; // Pega as tags do card

            const shouldBeVisible = activeFilter === "all" || cardTags.includes(activeFilter);

            card.style.display = shouldBeVisible ? "" : "none";
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener("click", () => {
            filterChips.forEach(c => c.setAttribute("aria-pressed", "false"));

            chip.setAttribute("aria-pressed", "true");

            const activeFilter = chip.dataset.filter;

            applyFilter(activeFilter);
        });
    });

    const allFilterButton = document.querySelector('.chip[data-filter="all"]');
    if (allFilterButton) {
        allFilterButton.setAttribute("aria-pressed", "true");
        applyFilter("all");
    }
});