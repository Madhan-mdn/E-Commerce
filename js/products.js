let products = [];

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
            filteredProducts = products.filter(
                product => product.category === "men's clothing"
            );
        } 
        else if (button.id === "womenBtn") {
            filteredProducts = products.filter(
                product => product.category === "women's clothing"
            );
        } 
        else if (button.id === "jewelBtn") {
            filteredProducts = products.filter(
                product => product.category === "jewelery"
            );
        } 
        else if (button.id === "electBtn") {
            filteredProducts = products.filter(
                product => product.category === "electronics"
            );
        }
        displayProducts(filteredProducts);
    });
});

function displayProducts(productsList) {
  let container = document.getElementById("products-container");
  container.innerHTML = "";
  productsList.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");

    let image = document.createElement("img");
    image.classList.add("product-image");
    image.setAttribute("src", product.image);
    image.setAttribute("alt", product.title);

    let title = document.createElement("h1");
    title.classList.add("product-title");
    let truncatedTitle = product.title.slice(0, 15) + "....";
    title.textContent =
      product.title.length > 15 ? truncatedTitle : product.title;

    let desc = document.createElement("p");
    desc.classList.add("product-desc");
    let truncatedDesc = product.description.slice(0, 80) + "....";
    desc.textContent =
      product.description.length > 80 ? truncatedDesc : product.description;

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

    buttonsDiv.append(detailsButton, cartButton);

    productCard.append(image, title, desc, price, buttonsDiv);

    container.appendChild(productCard);
  });
}

getProducts();