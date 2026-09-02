let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    let cartCount = document.getElementById("cart-count");

    let totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

updateCartCount();