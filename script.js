const api = "https://fakestoreapi.com/products" ;

var data;
const card_body = document.querySelector(".card_body");

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

        if(i<10){
        
            const card = document.createElement("div");
            card.classList.add("card");
            
            card_body.appendChild(card);
        
        
            const img = document.createElement("img");
            const h4 = document.createElement("h4"); 
        
            img.src = `${data[i].image}` ;
            h4.textContent = `${data[i].title}`;
            img.classList.add("card_img");
        
            card.appendChild(img);
            card.appendChild(h4);

        }

        

    }

}

abc();

const navToggle = document.querySelector('.nav-toggle');
const navCategory = document.querySelector('.nav-category');
const userDetails = document.querySelector('.user-details');

navToggle.addEventListener('click', () => {
    navCategory.classList.toggle('active');
    userDetails.classList.toggle('active');
});
