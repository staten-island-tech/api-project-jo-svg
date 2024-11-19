import "./style.css";
document.querySelector('.container').innerHTML = '';


async function getData(){
    try {
        const response = await fetch("https://valorant-api.com/v1/weapons/");
        //this is valorant weapon skins
        if (response.status != 200){
            throw new Error('failed to catch data');
        }
        else{
            const jsonResponse = await response.json();
            const info = jsonResponse.data;
            
            info.forEach((weapon)=>{
                console.log(weapon.shopData.cost);
                createCards(weapon.displayName, weapon.shopData.cost, weapon.displayIcon, weapon.shopData.category);
                //if the skin doesnt have an image it willl put a placehoklder image, ask whalen if he wants a image or na
                //document.querySelector('h1').textContent = skin.displayName;
            }) 
        }
    } catch (error) {
        console.log(error);
        alert("no work")
    }
}

//do weapons and then for each weapon you have the skins avaiuble wrdd 

getData();
function createCards(displayName, cost, displayIcon, type){
    const container = document.querySelector(".container");
    container.insertAdjacentHTML("beforeend",
        `<div class="card bg-base-100 w-96 shadow-xl">
            <figure class="px-10 pt-10">
                <div class="bg-cover bg-center p-6 rounded-xl" style="background: red;">
                    <img
                    src="${displayIcon}"
                    alt="${displayName}"
                    class="rounded-xl" />
                </div>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${displayName}</h2>
                <p>Cost: ${cost}</p>
                <p>${type}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>`
    );
}
