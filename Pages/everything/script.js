// const api = "https://fakestoreapi.com/products" ;

// const card_body = document.getElementById("card_body");

// var data;

// async function abc(){

//     try{
//         data = await fetch("https://fakestoreapi.com/products" )
//     .then(response =>{return response.json()})
//     }
//     catch(err){
//         console.log(err);
//     } 

//     console.log(data)

//     for(let i=0; i<data.length; i++){
//         console.log(data[i].category)


//         const card = document.createElement("a");
//         card.href = `../product_details/index.html?id=${data[i].id}`;
//         card.classList.add("card");

//         // const card = document.createElement("div");
//         card.classList.add("card");
    
//         card_body.appendChild(card);
    
    
//         const img = document.createElement("img");
//         const title = document.createElement("h4");
//         const price = document.createElement("div"); 
    
//         img.src = `${data[i].image}` ;
//         title.textContent = `${data[i].title}`;
//         price.textContent = `$ ${data[i].price}`;

//         img.classList.add("card_img");
    
//         card.appendChild(img);
//         card.appendChild(title);
//         card.appendChild(price);
//     }

// }

// abc();

// // Navbar toggle functionality
// const toggleBtn = document.getElementById("nav-toggle");
// const navCategory = document.querySelector(".nav-category");
// const userDetails = document.querySelector(".user-details");

// toggleBtn.addEventListener("click", () => {
//   navCategory.classList.toggle("show");
//   userDetails.classList.toggle("show");
// });




const api = "https://fakestoreapi.com/products";
const card_body = document.querySelector(".card_body");

async function loadProducts() {
    try {
        const data = await fetch(api).then(response => response.json());
        const boughtProducts = JSON.parse(localStorage.getItem("bought")) || [];
        
        // Loop through each product and display it only if it hasn't been bought
        data.forEach(product => {
            if (!boughtProducts.includes(product.id)) {
                // Create card for the product
                const card = document.createElement("div");
                card.classList.add("card");
                
                const img = document.createElement("img");
                const h4 = document.createElement("h4");
                img.src = product.image;
                h4.textContent = product.title;
                img.classList.add("card_img");

                card.appendChild(img);
                card.appendChild(h4);

                // Add "Add to Cart" and "Buy Now" buttons
                const addToCartBtn = document.createElement("button");
                addToCartBtn.textContent = "Add to Cart";
                addToCartBtn.classList.add("add-to-cart-btn");
                card.appendChild(addToCartBtn);
                
                addToCartBtn.addEventListener("click", () => {
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    cart.push(product);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("Added to cart!");
                    addToCartBtn.textContent = "Added to Cart";  // Change button text to indicate item was added
                });

                const buyNowBtn = document.createElement("button");
                buyNowBtn.textContent = "Buy Now";
                buyNowBtn.classList.add("buy-now-btn");
                card.appendChild(buyNowBtn);

                buyNowBtn.addEventListener("click", () => {
                    alert("Thank you! Your order will be processed soon.");
                    // Save this product as bought so it can be hidden on home page
                    let bought = JSON.parse(localStorage.getItem("bought")) || [];
                    bought.push(product.id);
                    localStorage.setItem("bought", JSON.stringify(bought));
                    window.location.href = "index.html";  // Redirect to home page
                });

                card_body.appendChild(card);
            }
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

loadProducts();
