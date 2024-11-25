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
                createCards(weapon.displayName,cost, weapon.displayIcon , category);
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
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        const card = event.target.closest(".card");
        if (card) {
            const titleElement = card.querySelector(".card-title");
            if (titleElement) {
                const title = titleElement.textContent;
                document.querySelector(".container").innerHTML = "";
                weaponData(title);
            }
        } else {
            console.log("Card not found!");
        }
    }
});
async function weaponData(title) {
    const weapon = info.find((w) => w.displayName === title);
    if (weapon) {
        createOpenCard();
        const skins = weapon.skins;
        skins.forEach((skin, index) => {
            //index is the position of the current item in the array (starting at 0)
            const slideId = `slide${index + 1}`;
            //index + 1 ensures IDs start from slide1 instead of slide0. 
            const prevSlideId = `slide${index === 0 ? skins.length : index}`;
            const nextSlideId = `slide${index === skins.length - 1 ? 1 : index + 2}`;
            createSkinPart(skin, slideId, prevSlideId, nextSlideId);
        });
    }
}

function createOpenCard() {
    const container = document.querySelector(".container");
    container.insertAdjacentHTML("beforeend", `
        <div class="carousel" style="width: 40rem;"></div>
    `);
}
function createSkinPart(skin, slideId, prevSlideId, nextSlideId, weapon) {
    const carousel = document.querySelector(".carousel");
    const skinIcon = skin.displayIcon || "https://via.placeholder.com/150"; 
    const backgroundColor = "lightblue"; 

    carousel.insertAdjacentHTML("beforeend", `
        <
        
        div id="${slideId}" class="carousel-item relative flex justify-center items-center w-full" style="background-color: ${backgroundColor};">
            <div class="flex justify-center items-center h-96">
                <img
                    src="${skinIcon}"
                    class="object-contain"
                    style="max-width: 80%; max-height: 80%; border-radius: 8px;" 
                    alt="${skin.displayName}" 
                />
            </div>
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#${prevSlideId}" class="btn btn-circle">❮</a>
                <a href="#${nextSlideId}" class="btn btn-circle">❯</a>
            </div>
        </div>
    `);
}




getData();

weaponData();