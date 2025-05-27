const api = "http://localhost:3002/product";

const card_body = document.querySelector("#card_body"); // ✅ Select the container

var data;

async function abc() {
    try {
        data = await fetch(api).then(response => response.json());
    } catch (err) {
        console.log(err);
        return;
    }

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (data[i].category === "women's clothing") {
            const card = document.createElement("a");
            card.href = `../product_details/index.html?id=${data[i].id}`;
            card.classList.add("card");

            const img = document.createElement("img");
            const h4 = document.createElement("h4");

            img.src = data[i].image;
            h4.textContent = data[i].title;
            img.classList.add("card_img");

            card.appendChild(img);
            card.appendChild(h4);

            card_body.appendChild(card); // ✅ Now it's safe to use
        }
    }
}

abc();
