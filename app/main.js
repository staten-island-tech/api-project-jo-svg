import "./style.css";
document.querySelector('.container').innerHTML = '';
let info = [];

async function getData(){
    try {
        const response = await fetch("https://valorant-api.com/v1/weapons/");
        //this is valorant weapon skins
        if (response.status != 200){
            throw new Error('failed to catch data');
        }
        else{
            const jsonResponse = await response.json();
            info = jsonResponse.data;
            
            info.forEach((weapon)=>{
                const cost = weapon.shopData ? weapon.shopData.cost : 'no cost';
                const category = weapon.shopData ? weapon.shopData.category : 'no cat';
             
                /* console.log(weapon.shopData.category); */
                createCards(weapon.displayName,cost, weapon.displayIcon , category);
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


function createCards(displayName, cost, displayIcon, type){
    const container = document.querySelector(".container");
    container.insertAdjacentHTML("beforeend",
        `<div class="card bg-base-100 w-96 shadow-xl h-96">
            <figure class="px-10 pt-10">
                <div class="p-6 rounded-xl" style="background: red; display: flex; justify-content: center; align-items: center; height: 100%;">
                    <img
                        src="${displayIcon}"
                        alt="${displayName}"
                        class="rounded-xl object-contain max-h-full max-w-full" />
                </div>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${displayName}</h2>
                <p>Cost: ${cost}</p>
                <p>${type}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Learn More</button>
                </div>
            </div>
        </div>`
    );
}
document.querySelector(".container").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        const card = event.target.closest(".card");
        const title = card.querySelector(".card-title").textContent;
        document.querySelector(".container").innerHTML = ""; // Clear container
        weaponData(title);
    }
});
async function weaponData(title) {
    const weapon = info.find((w) => w.displayName === title);
    if (weapon) {
        createOpenCard();
        weapon.skins.forEach(createSkinPart);
    }
}
function createOpenCard() {
    const container = document.querySelector(".container");
    container.insertAdjacentHTML("beforeend", `
        <div class="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4"></div>
    `);
}
function createSkinPart(skin) {
    const carousel = document.querySelector(".carousel");
    const skinIcon = skin.displayIcon || "https://via.placeholder.com/150";
    carousel.insertAdjacentHTML("beforeend", `
        <div class="carousel-item">
            <img src="${skinIcon}" alt="${skin.displayName}" class="rounded-box" />
        </div>
    `);
}


getData();
