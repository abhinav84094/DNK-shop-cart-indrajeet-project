const api = "http://localhost:3002/product";
const card_body = document.getElementById("card_body");

async function abc() {
  try {
    const response = await fetch(api);
    const data = await response.json();

    console.log(data);

    data.forEach(product => {
      if (product.category === "Electronics") {
        const card = document.createElement("a");
        card.href = `../product_details/index.html?id=${product.id}`;
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = `http://localhost:3002/uploads/${product.image}`;
        img.classList.add("card_img");

        const h4 = document.createElement("h4");
        h4.textContent = product.title;

        card.appendChild(img);
        card.appendChild(h4);
        card_body.appendChild(card);
      }
    });

  } catch (err) {
    console.error("Error fetching product data:", err);
  }
}

abc();
