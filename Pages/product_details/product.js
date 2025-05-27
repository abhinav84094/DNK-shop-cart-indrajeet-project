const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const api = `http://localhost:3002/product/${productId}` ;

const fakeApi = `https://fakestoreapi.com/products/${productId}`;

fetch(api)
  .then(res => res.json())
  .then(product => {
    console.log(product);
    document.getElementById("product-image").src =`http://localhost:3002/uploads/${product.image}`;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-desc").textContent = product.description;
    document.getElementById("product-price").textContent = `$${product.price}`;
    // document.getElementById("product-rating").textContent = product.rating.rate;
    // document.getElementById("product-rating-count").textContent = product.rating.count;

    // Add to cart
    // document.getElementById("add-to-cart").addEventListener("click", () => {
    //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //   cart.push(product);
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   alert("Added to cart!");
    //   window.location.href = "../../home.html";

    // });

    // Buy now
    // Buy now button functionality
    document.getElementById("buy-now").addEventListener("click", () => {
        alert("Thank you! Your order will be processed soon.");
        
        // Save this product as bought so it can be hidden on the homepage
        let bought = JSON.parse(localStorage.getItem("bought")) || [];
        bought.push(product.id);
        localStorage.setItem("bought", JSON.stringify(bought));
        
        // Redirect to the homepage
        window.location.href = "../../home.html";  // Ensure this is the correct path on your GitHub Pages
    });

    document.getElementById("edit-btn").addEventListener("click", () => {
  window.location.href = `../adminFeatures/editProduct/index.html?id=${productId}`;
});



  })
  .catch(err => {
    console.error("Failed to load product", err);
  });
