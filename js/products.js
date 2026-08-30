let products = [];

async function getProducts(){
    let apiResponse = await fetch("https://fakestoreapi.com/products");
    products = await apiResponse.json();

    let reqProducts = products.slice(0,19);
    console.log(reqProducts);

    let container = document.getElementById("products-container");

    reqProducts.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");

        let image = document.createElement("img");
        image.classList.add("product-image");
        image.setAttribute("src", product.image);
        image.setAttribute("alt",  product.title);

        let title = document.createElement("h3");
        title.classList.add("product-title");
        let truncatedTitle = product.title.slice(0, 10) + "....";
        title.textContent = product.title.length > 10 ? truncatedTitle : product.title;
        
        let desc = document.createElement("p");
        desc.classList.add("product-desc");
        let truncatedDesc = product.description.slice(0, 50) + "....";
        desc.textContent = product.description.length > 50 ? truncatedDesc : product.description;

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