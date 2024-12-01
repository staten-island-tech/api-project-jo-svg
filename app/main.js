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
            putAllCards();
            filtering();
            
        }
    } catch (error) {
        console.log(error);
        alert("no work")
    }
}
function putAllCards(){
    info.forEach((weapon)=>{
        const cost = weapon.shopData ? weapon.shopData.cost : 'no cost';
        const category = weapon.shopData ? weapon.shopData.category : 'no cat';
        createing(weapon.displayName, cost, weapon.displayIcon);
    }) 
}
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
function filtering(){
    const options = document.querySelectorAll('.join-item');
    options.forEach(option => {
        option.addEventListener('click', ()=>{
            let topic = capitalizeFirstLetter(option.ariaLabel);
            console.log(topic);
            document.querySelector('.container').innerHTML = '';
            if (topic === 'All'){
                putAllCards();
            }
            else if (topic === 'Smgs'){
                putFilterCards('SMGs');
            }
            else{
                putFilterCards(topic);
            }  
        })
    });
}
function searching(){
    const search = document.querySelector('.input');
    const cards = document.querySelectorAll('.card');
    const searchItem = search.value.toLowerCase();
    cards.forEach(card =>{
        const title = card.querySelector(".card-title").textContent.toLowerCase(); 
        if (title.includes(searchItem)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}
document.querySelector('.input').addEventListener('input', searching);
function putFilterCards(cat){
    info.forEach(weapon => {
        const category = weapon.shopData ? weapon.shopData.category : 'no cat'; 
        if (category === cat){
            const cost = weapon.shopData ? weapon.shopData.cost : 'no cost';
            createing(weapon.displayName, cost, weapon.displayIcon);
            
        }
    });
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
        </div>`);
}
function capitalizeFirstLetter(word) {
    return word
    .split(' ')
    .map(word=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    //the split thing splits it by the space
    //charAt gets the first letter of the word
    //slice separates the rest after the first letter n converts it to all lowercase
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
        stats(weapon)
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
function stats(weapon) {
    const container = document.querySelector('.container');
    const fireRate = weapon.weaponStats.fireRate || 0;
    const reloadTimeSeconds = weapon.weaponStats.reloadTimeSeconds || 0;
    const equipTimeSeconds = weapon.weaponStats.equipTimeSeconds || 0;
    const magazineSize = weapon.weaponStats.magazineSize || 0;
    container.insertAdjacentHTML("beforeend", `
        <div class="weapon-stats">
            <h1>${weapon.displayName} Stats</h1>
            <div class="stat">
                <label for="fireRate">Fire Rate</label>
                <div class="progress-container">
                    <span class="stat-value">${fireRate}</span>
                    <progress id="fire rate" value="${fireRate}" max="16"></progress>
                </div>
            </div>
            <div class="stat">
                <label for="reloadTimeSeconds">Reload Time</label>
                <div class="progress-container">
                    <span class="stat-value">${reloadTimeSeconds}</span>
                    <progress id="reload time seconds" value="${reloadTimeSeconds}" max="5"></progress>
                </div>
            </div>
            <div class="stat">
                <label for="equipTimeSeconds">Equip Time</label>
                <div class="progress-container">
                    <span class="stat-value">${equipTimeSeconds}</span>
                    <progress id="equip time seconds" value="${equipTimeSeconds}" max="1.25"></progress>
                </div>
            </div>
            <div class="stat">
                <label for="magazineSize">Magazine Size</label>
                <div class="progress-container">
                    <span class="stat-value">${magazineSize}</span>
                    <progress id="magazine size" value="${magazineSize}" max="100"></progress>
                </div>
            </div>
            
        </div>
    `);
}

getData();

weaponData();

