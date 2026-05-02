export function renderHeader() {
    return `
        <header>
            <span class="logo">
                <a href="anasayfa.html">Kafe Sistemim</a>
            </span>

            <div class="hava"></div>

            <a href="sepet.html" class="cart-link">
                <i class="fa-solid fa-cart-shopping"></i>
                <div id="cartInfo"></div>
            </a>
        </header>
    `;
}