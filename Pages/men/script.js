const api = "http://localhost:3002/product";  // Correct API

const card_body = document.querySelector("#card_body");  // ✅ Add this line

var data;

async function abc() {
    try {
        const response = await fetch(api);
        data = await response.json();
    } catch (err) {
        console.log("Fetch error:", err);
        return;
    }

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (data[i].category === "men's clothing") {
            const card = document.createElement("a");
            card.href = `../product_details/index.html?id=${data[i].id}`;
            card.classList.add("card");

            const img = document.createElement("img");
            const h4 = document.createElement("h4");

            img.src = `${data[i].image}`;
            h4.textContent = data[i].title;
            img.classList.add("card_img");

            card.appendChild(img);
            card.appendChild(h4);
            card_body.appendChild(card);  // ✅ Moved here, after building the card
        }
    }
}

abc();
