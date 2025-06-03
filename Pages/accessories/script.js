// const api = "http://localhost:3002/product";  // Correct API

// const card_body = document.querySelector("#card_body");  // ✅ Add this line

// var data;

// async function abc() {
//     try {
//         const response = await fetch(api);
//         data = await response.json();
//     } catch (err) {
//         console.log("Fetch error:", err);
//         return;
//     }

//     console.log(data);

//     for (let i = 0; i < data.length; i++) {
//         if (data[i].category === "men") {
//             const card = document.createElement("a");
//             card.href = `../product_details/index.html?id=${data[i].id}`;
//             card.classList.add("card");

//             const img = document.createElement("img");
//             const h4 = document.createElement("h4");

//             img.src = `${data[i].image}`;
//             h4.textContent = data[i].title;
//             img.classList.add("card_img");

//             card.appendChild(img);
//             card.appendChild(h4);
//             card_body.appendChild(card);  // ✅ Moved here, after building the card
//         }
//     }
// }

// abc();



const api = "http://localhost:3002/product";
const card_body = document.querySelector("#card_body");

// ✅ Ensure DOM is loaded before running
document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        const boughtProducts = JSON.parse(localStorage.getItem("bought")) || [];

        data.forEach(product => {
            if (product.category =="accessories") {
                // ✅ Create product card
                const card = document.createElement("a");
                card.href = `../product_details/index.html?id=${product.id}`;
                card.classList.add("card");

                // ✅ Create image, title, and price
                const img = document.createElement("img");
                const title = document.createElement("h4");
                const price = document.createElement("div");

                // ✅ Set proper values
                img.src = `http://localhost:3002/uploads/${product.image}`;
                title.textContent = product.title;
                price.textContent = `₹${product.price}`;

                img.classList.add("card_img");

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(price);


                // ✅ Append card to container
                card_body.appendChild(card);
            }
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}
