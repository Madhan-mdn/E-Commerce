let cart = JSON.parse(localStorage.getItem("cart")) || [];

let itemDiv = document.getElementById("item-div");

function updateCartCount() {
    let cartCounts = document.querySelectorAll(".cart-count");

    let totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCounts.forEach((cartCount) => {
        cartCount.textContent = totalQuantity;
    });
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  itemDiv.innerHTML = "";

  if (cart.length === 0) {
    itemDiv.innerHTML = `
            <div class="bg-gray-100 h-[240px] flex flex-col justify-center items-center">
                <h1 class="text-[50px] font-light">Your Cart is Empty</h1>

                <a href="index.html"
                class="border border-gray-600 px-[12px] py-[8px] rounded-[10px] mt-[20px] hover:bg-gray-700 hover:text-white transition">
                    <i class="fa-solid fa-arrow-left"></i>
                    Continue Shopping
                </a>
            </div>
        `;

    return;
  }

  let cartSection = document.createElement("section");
  cartSection.classList.add("cart-section");

  let itemsContainer = document.createElement("div");
  itemsContainer.classList.add("items-container");

  let heading = document.createElement("h2");
  heading.textContent = "Item List";
  heading.classList.add("cart-heading");

  itemsContainer.appendChild(heading);

  cart.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    let image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.classList.add("cart-image");

    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("cart-details");

    let title = document.createElement("h3");
    title.textContent = item.title;
    title.classList.add("cart-title");

    detailsDiv.appendChild(title);

    let rightDiv = document.createElement("div");
    rightDiv.classList.add("cart-right");

    let quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantity-div");

    let minusButton = document.createElement("button");
    minusButton.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    minusButton.classList.add("quantity-button");

    let quantity = document.createElement("span");
    quantity.textContent = item.quantity;
    quantity.classList.add("quantity");

    let plusButton = document.createElement("button");
    plusButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    plusButton.classList.add("quantity-button");

    minusButton.addEventListener("click", () => {
      decreaseQuantity(item.id);
    });

    plusButton.addEventListener("click", () => {
      increaseQuantity(item.id);
    });

    quantityDiv.append(minusButton, quantity, plusButton);

    let price = document.createElement("p");
    price.textContent = `${item.quantity} x $${item.price}`;
    price.classList.add("cart-price");

    rightDiv.append(quantityDiv, price);

    cartItem.append(image, detailsDiv, rightDiv);

    itemsContainer.appendChild(cartItem);
  });

  let summaryDiv = document.createElement("div");
  summaryDiv.classList.add("summary-div");

  let summaryHeading = document.createElement("h2");
  summaryHeading.textContent = "Order Summary";
  summaryHeading.classList.add("cart-heading");

  let summaryContent = document.createElement("div");
  summaryContent.classList.add("summary-content");

  let totalProducts = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  let subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  let shipping = 30;
  let totalAmount = subtotal + shipping;

  summaryContent.innerHTML = `
    <div class="summary-row">
        <span>Products (${totalProducts})</span>
        <span>$${subtotal}</span>
    </div>

    <div class="summary-row shipping-row">
        <span>Shipping</span>
        <span>$${shipping}</span>
    </div>

    <div class="summary-row total-row">
        <span>Total amount</span>
        <span>$${totalAmount}</span>
    </div>

    <button class="checkout-button">
        Go to checkout
    </button>
`;

  summaryDiv.append(summaryHeading, summaryContent);

  cartSection.append(itemsContainer, summaryDiv);

  itemDiv.appendChild(cartSection);
}

function increaseQuantity(productId) {
  let product = cart.find((item) => {
    return item.id === productId;
  });

  if (!product) {
    return;
  }

  product.quantity++;

  saveCart();
  updateCartCount();
  displayCart();
}

function decreaseQuantity(productId) {
  let product = cart.find((item) => {
    return item.id === productId;
  });

  if (!product) {
    return;
  }

  if (product.quantity > 1) {
    product.quantity--;
  } else {
    cart = cart.filter((item) => {
      return item.id !== productId;
    });
  }

  saveCart();
  updateCartCount();
  displayCart();
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
displayCart();
