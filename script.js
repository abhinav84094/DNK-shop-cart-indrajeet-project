const api = "https://fakestoreapi.com/products";
const card_body = document.querySelector(".card_body");
const cartIcon = document.querySelector(".bi-bag-fill");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let bought = JSON.parse(localStorage.getItem("bought")) || [];

function updateCartIcon() {
    cartIcon.textContent = cart.length;
}

async function fetchProducts() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        
        // Render products except those already bought
        renderProducts(data);
        updateCartIcon(); // Update the cart icon on page load
    } catch (err) {
        console.log("Error fetching data:", err);
    }
}

function renderProducts(products) {
    card_body.innerHTML = ""; // Clear old content

    products.forEach(product => {
        // If the product is bought, skip it
        if (bought.includes(product.id)) return;

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = product.image;
        img.classList.add("card_img");

        const h4 = document.createElement("h4");
        h4.textContent = product.title;

       
        card.appendChild(img);
        card.appendChild(h4);
        
        card_body.appendChild(card);
    });
}

fetchProducts();
