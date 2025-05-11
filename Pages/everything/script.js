const api = "https://fakestoreapi.com/products" ;

const card_body = document.getElementById("card_body");

var data;

async function abc(){

    try{
        data = await fetch("https://fakestoreapi.com/products" )
    .then(response =>{return response.json()})
    }
    catch(err){
        console.log(err);
    } 

    console.log(data)

    for(let i=0; i<data.length; i++){
        console.log(data[i].category)


        const card = document.createElement("div");
        card.classList.add("card");
    
        card_body.appendChild(card);
    
    
        const img = document.createElement("img");
        const title = document.createElement("h4");
        const price = document.createElement("div"); 
    
        img.src = `${data[i].image}` ;
        title.textContent = `${data[i].title}`;
        price.textContent = `$ ${data[i].price}`;

        img.classList.add("card_img");
    
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
    }

}

abc();

// Navbar toggle functionality
const toggleBtn = document.getElementById("nav-toggle");
const navCategory = document.querySelector(".nav-category");
const userDetails = document.querySelector(".user-details");

toggleBtn.addEventListener("click", () => {
  navCategory.classList.toggle("show");
  userDetails.classList.toggle("show");
});
