let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function getProducts() {
    let apiResponse = await fetch("https://fakestoreapi.com/products");

    products = await apiResponse.json();

    displayProducts(products);
}

let filterButtons = document.querySelectorAll(
    "#allBtn, #menBtn, #womenBtn, #jewelBtn, #electBtn"
);

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("bg-gray-700", "text-white");
        });

        button.classList.add("bg-gray-700", "text-white");

        let filteredProducts;

        if (button.id === "allBtn") {
            filteredProducts = products;
        }

        else if (button.id === "menBtn") {
            filteredProducts = products.filter((product) => {
                return product.category === "men's clothing";
            });
        }

        else if (button.id === "womenBtn") {
            filteredProducts = products.filter((product) => {
                return product.category === "women's clothing";
            });
        }

        else if (button.id === "jewelBtn") {
            filteredProducts = products.filter((product) => {
                return product.category === "jewelery";
            });
        }

        else if (button.id === "electBtn") {
            filteredProducts = products.filter((product) => {
                return product.category === "electronics";
            });
        }

        displayProducts(filteredProducts);
    });
});

function displayProducts(productsList) {
    let container = document.getElementById("products-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    productsList.forEach((product) => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");

        let image = document.createElement("img");
        image.classList.add("product-image");
        image.src = product.image;
        image.alt = product.title;

        let title = document.createElement("h1");
        title.classList.add("product-title");

        title.textContent =
            product.title.length > 15
                ? product.title.slice(0, 15) + "...."
                : product.title;

        let desc = document.createElement("p");
        desc.classList.add("product-desc");

        desc.textContent =
            product.description.length > 80
                ? product.description.slice(0, 80) + "...."
                : product.description;

        let price = document.createElement("p");
        price.classList.add("product-price");
        price.textContent = `$${product.price}`;

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons-div");

        let detailsButton = document.createElement("button");
        detailsButton.classList.add("details-button");
        detailsButton.textContent = "Details";

        let cartButton = document.createElement("button");
        cartButton.classList.add("cart-button");
        cartButton.textContent = "Add to Cart";

        cartButton.addEventListener("click", () => {
            addToCart(product);
        });

        buttonsDiv.append(detailsButton, cartButton);

        productCard.append(
            image,
            title,
            desc,
            price,
            buttonsDiv
        );

        container.appendChild(productCard);
    });
}

function addToCart(product) {
    let existingProduct = cart.find((item) => {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    }

    else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

function updateCartCount() {
    let cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

getProducts();
updateCartCount();