const api = "https://fakestoreapi.com/products" ;

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

        

        if(data[i].category == "electronics"){

            const card = document.createElement("a");
            card.href = `../product_details/index.html?id=${data[i].id}`;
            card.classList.add("card");
        
            card_body.appendChild(card);
        
        
            const img = document.createElement("img");
            const h4 = document.createElement("h4"); 
        
            img.src = `${data[i].image}` ;
            h4.textContent = `${data[i].title}`;
            img.classList.add("card_img");
        
            card.appendChild(img);
            card.appendChild(h4)
        }

    }

}

abc();

