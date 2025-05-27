const api = "http://localhost:3002/product";  // Local API

// Make sure this element exists in your HTML: <div class="card_body"></div>
const card_body = document.querySelector("#card_body");  // FIXED: defined this

async function abc() {
    try {
        const response = await fetch(api);
        const data = await response.json();  // Use await with fetch response

        console.log(data);

        for (let i = 0; i < data.length; i++) {
            if (data[i].category === "men's clothing") {

                // Create anchor card
                const card = document.createElement("a");
                card.href = `../product_details/index.html?id=${data[i].id}`;
                card.classList.add("card");

                // Image and title
                const img = document.createElement("img");
                const h4 = document.createElement("h4");

                img.src = `http://localhost:3002/uploads/${data[i].image}`;  // FIXED: use data[i]
                h4.textContent = data[i].title;
                img.classList.add("card_img");

                // Append children
                card.appendChild(img);
                card.appendChild(h4);

                // Append card to container
                card_body.appendChild(card);
            }
        }

    } catch (err) {
        console.error("Error fetching product data:", err);
    }
}

abc();
