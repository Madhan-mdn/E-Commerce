let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    let cartCounts = document.querySelectorAll(".cart-count");

    let totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCounts.forEach((cartCount) => {
        cartCount.textContent = totalQuantity;
    });
}

let menuBtn = document.getElementById("menuBtn");
let mobileMenu = document.getElementById("mobileMenu");
let closeMenuBtn = document.getElementById("closeMenuBtn");

if (menuBtn && mobileMenu && closeMenuBtn) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("right-[-280px]");
        mobileMenu.classList.add("right-0");
    });
    closeMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("right-0");
        mobileMenu.classList.add("right-[-280px]");
    });
}

updateCartCount();