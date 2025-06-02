const api = "https://fakestoreapi.com/products";
const card_body = document.querySelector(".card_body");
const addProductBtn = document.getElementById("addProductBtn");
const adminLink = document.getElementById("adminLink");

window.onload = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const mobile = localStorage.getItem("mobile");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Show Add Product if user is admin
  if (username != "admin" && mobile != "6299987191") {
    // if (addProductBtn) addProductBtn.style.display = "block";
    // if (adminLink) adminLink.style.display = "inline-block";
  } else {
    if (addProductBtn) addProductBtn.style.display = "none";
    if (adminLink) adminLink.style.display = "none";
  }

  fetchProducts();

};

async function fetchProducts() {
  try {
    const response = await fetch(api);
    const data = await response.json();

    // Filter out purchased items
    const purchased = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    const visibleProducts = data.filter(p => !purchased.includes(p.id));

    renderProducts(visibleProducts);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

function renderProducts(products) {
  card_body.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = product.image;
    img.classList.add("card_img");

    const title = document.createElement("h4");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `$${product.price.toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);

    card_body.appendChild(card);
  });
}



function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("mobile");
  localStorage.removeItem("cart");
  window.location.href = "./index.html";
}
