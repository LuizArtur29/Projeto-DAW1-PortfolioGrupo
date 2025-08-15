/**
 * portfolio.js — filtros simples por tecnologia usando data-tags
 * - Clique nos botões de filtro para exibir/ocultar cards por tag
 * - Barras de progresso para "nível" animadas on-load
 */
document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(".project");
    const bars = document.querySelectorAll(".progress > span");

    function applyFilters(){
        const active = [...filters].filter(b => b.getAttribute("aria-pressed") === "true").map(b => b.dataset.filter);
        if(active.length === 0){
            cards.forEach(c => c.hidden = false);
            return;
        }
        cards.forEach(card => {
            const tags = (card.dataset.tags || "").split(",").map(s=>s.trim());
            card.hidden = !active.every(tag => tags.includes(tag));
        });
    }

    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            const pressed = btn.getAttribute("aria-pressed") === "true";
            btn.setAttribute("aria-pressed", String(!pressed));
            applyFilters();
        });
    });

    // animate progress bars
    bars.forEach(b => {
        const v = Number(b.dataset.value || "0");
        requestAnimationFrame(() => {
            b.style.width = Math.max(0, Math.min(100, v)) + "%";
        });
    });
});
