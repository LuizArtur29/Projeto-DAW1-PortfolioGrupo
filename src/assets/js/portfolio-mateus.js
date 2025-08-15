/**
 * portfolio-mateus.js — filtros simples por tags usando DOM nativo
 * Usa botões .chip que controlam data-tags dos cards
 */
document.addEventListener("DOMContentLoaded", () => {
    const chips = Array.from(document.querySelectorAll("[data-filter]"));
    const cards = Array.from(document.querySelectorAll(".project-card"));
    let active = "all";

    function apply(){
        for(const c of cards){
            const tags = (c.dataset.tags || "").split(" ").filter(Boolean);
            const show = active === "all" || tags.includes(active);
            c.style.display = show ? "" : "none";
        }
    }

    chips.forEach(ch => {
        ch.addEventListener("click", () => {
            chips.forEach(x => x.setAttribute("aria-pressed", "false"));
            ch.setAttribute("aria-pressed", "true");
            active = ch.dataset.filter;
            apply();
        });
    });

    // default ativa "all"
    const all = document.querySelector('[data-filter="all"]');
    all?.setAttribute("aria-pressed", "true");
    apply();
});
