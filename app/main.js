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
                createing(weapon.displayName, cost, weapon.displayIcon);
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

function createing(displayName,cost , displayIcon){
    const container = document.querySelector(".container");
    container.insertAdjacentHTML("beforeend",
        `<div class="card bg-base-100 w-96 shadow-xl h-32 flex cursor-pointer rounded-none overflow-x-hidden rounded-tl-lg border-2 border-black">
          
            <div class="picture absolute h-24 z-10">
                <img
                    src="${displayIcon}"
                    alt="${displayName}"
                    class="object-contain max-h-full max-w-full" />
            </div>
            <div class="w-20 h-20 absolute bottom-0 " style="background-color: rgb(255, 70, 86);">
                <h3 class="z-0">${cost}</h3>
            </div>
            <div class="cardText w-full flex items-center justify-center mt-auto">
                <h2 class="card-title text-center text-gray-200">${displayName.toUpperCase()}</h2>
            </div>
        </div>

        `
    );
}
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
document.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
        const card = event.target.closest(".card");
        if (card) {
            const titleElement = card.querySelector(".card-title");
            if (titleElement) {
                const title = capitalizeFirstLetter(titleElement.textContent);
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
        <div id="${slideId}" class="carousel-item relative flex justify-center items-center w-full" style="background-color: ${backgroundColor};">
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