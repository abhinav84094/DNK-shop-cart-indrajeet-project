const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const api = `http://localhost:3002/product/${productId}`;
const fakeApi = `https://fakestoreapi.com/products/${productId}`;

const buyBtn = document.getElementById("buy-now");
const editBtn = document.getElementById("edit-btn");
let deleteBtn;

const username = localStorage.getItem("username");
const mobile = localStorage.getItem("mobile");

// Show/hide buttons based on user type
if (username == "admin" ) {
  editBtn.style.display = "inline-block";

  // Create Delete button dynamically
  buyBtn.style.display = "none";
  deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.id = "delete-btn";
  document.querySelector(".product-info").appendChild(deleteBtn);
} else {
  // Hide edit for non-admins
  editBtn.style.display = "none";
  deleteBtn.style.display = "none";
}

fetch(api)
  .then(res => res.json())
  .then(product => {
    console.log(product);
    document.getElementById("product-image").src = `http://localhost:3002/uploads/${product.image}`;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-desc").textContent = product.description;
    document.getElementById("product-price").textContent = `$${product.price}`;

    buyBtn.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));

      // Optional: mark as bought
      let bought = JSON.parse(localStorage.getItem("bought")) || [];
      if (!bought.includes(product.id)) {
        bought.push(product.id);
        localStorage.setItem("bought", JSON.stringify(bought));
      }

      window.location.href = "./payment/payment.html";
    });

    editBtn.addEventListener("click", () => {
      window.location.href = `../adminFeatures/editProduct/index.html?id=${productId}`;
    });

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (confirmed) {
          fetch(api, {
            method: "DELETE",
          })
            .then(res => {
              if (res.ok) {
                alert("Product deleted successfully.");
                window.location.href = "../everything/index.html"; // Go back to homepage
              } else {
                alert("Failed to delete product.");
              }
            })
            .catch(err => console.error("Delete failed:", err));
        }
      });
    }
  })
  .catch(err => {
    console.error("Failed to load product", err);
  });
