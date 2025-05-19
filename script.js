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

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.classList.add("shop-now-btn");
        addToCartBtn.onclick = () => {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartIcon();
            addToCartBtn.textContent = "Added to Cart";
            addToCartBtn.disabled = true; // Disable the button once added
        };

        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Buy";
        buyBtn.classList.add("shop-now-btn");
        buyBtn.onclick = () => {
            alert("Thank you! Your order will be processed soon.");
            bought.push(product.id);
            localStorage.setItem("bought", JSON.stringify(bought));
            renderProducts(products); // Re-render without this item
        };

        card.appendChild(img);
        card.appendChild(h4);
        card.appendChild(addToCartBtn);
        card.appendChild(buyBtn);
        card_body.appendChild(card);
    });
}

fetchProducts();
