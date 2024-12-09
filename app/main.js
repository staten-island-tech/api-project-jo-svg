import "./style.css";
document.querySelector('.container').innerHTML = '';
let info = [];
async function getData(){
    try {
        const response = await fetch("https://valorant-api.com/v1/weapons/");
        if (response.status != 200){
            throw new Error('failed to catch data');
        }
        else{
            const jsonResponse = await response.json();
            info = jsonResponse.data;
            putAllCards();
            filtering();
            weaponData('Odin');
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
function filtering(){
    const options = document.querySelectorAll('.join-item');
    
    options.forEach(option => {
        option.addEventListener('click', ()=>{
            let topic = capitalizeFirstLetter(option.ariaLabel);
            console.log(topic);
            
            document.querySelector('.container').innerHTML = '';
            if (topic === 'Melee'){
                putFilterCards('no cat');
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
function createing(displayName, cost, displayIcon){
    const container = document.querySelector(".container");
    
    container.insertAdjacentHTML("beforeend",
        ` <div class="card w-96 h-32 flex cursor-pointer rounded-none overflow-x-hidden bg-white/30 shadow-xl">
            <div class="cardText w-full flex items-center justify-center bg-black">
                <h2 class="card-title text-center text-gray-200">${displayName.toUpperCase()}</h2>
            </div>
            <div class="picture h-24 w-full flex justify-center items-center">
                <img
                    src="${displayIcon}"
                    alt="${displayName}"
                    class="object-contain max-h-full max-w-full" />
            </div>
        </div>`
    );
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
                document.querySelector(".imageStats").innerHTML = "";
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
        const validSkins = skins.filter(skin => skin && skin.displayIcon);
        if (validSkins.length === 0) {
            return; 
        }
        const badImages = [
            'https://media.valorant-api.com/weaponskins/f454efd1-49cb-372f-7096-d394df615308/displayicon.png',
            'https://media.valorant-api.com/weaponskins/9c134f41-4c29-1bd8-682e-178e7f349c9b/displayicon.png',
            'https://media.valorant-api.com/weaponskins/5305d9c4-4f46-fbf4-9e9a-dea772c263b5/displayicon.png',
            'https://media.valorant-api.com/weaponskins/9c808029-48f5-ce89-21c5-88bf4228d2ed/displayicon.png',
            'https://media.valorant-api.com/weaponskins/27f21d97-4c4b-bd1c-1f08-31830ab0be84/displayicon.png',
            'https://media.valorant-api.com/weaponskins/fff73ad4-4d46-a6d9-43f1-51b633845434/displayicon.png',
            'https://media.valorant-api.com/weaponskins/724a7f42-4315-eccf-0e76-77bdd3ec2e09/displayicon.png',
            'https://media.valorant-api.com/weaponskins/7baa9f5a-4ac3-804a-2e47-4da916de0b79/displayicon.png',
            'https://media.valorant-api.com/weaponskins/337cb216-4a6e-d85d-88c2-f29ab317784c/displayicon.png',
            'https://media.valorant-api.com/weaponskins/fff73ad4-4d46-a6d9-43f1-51b633845434/displayicon.png',
            'https://media.valorant-api.com/weaponskins/337cb216-4a6e-d85d-88c2-f29ab317784c/displayicon.png',
            'https://media.valorant-api.com/weaponskins/68f2e92e-4c94-8104-ed99-03925bbc71e8/displayicon.png',
            'https://media.valorant-api.com/weaponskins/acd26127-48ff-8b9e-7ba6-b989af8a4b24/displayicon.png',
            'https://media.valorant-api.com/weaponskins/ed407bc7-4949-3131-b84f-d6be83b63a15/displayicon.png',
            'https://media.valorant-api.com/weaponskins/70c97fb2-4d79-d4bb-5173-a1888cd4bfd9/displayicon.png',
            'https://media.valorant-api.com/weaponskins/7b82c605-44bb-aae9-55bf-a4afef323553/displayicon.png',
            'https://media.valorant-api.com/weaponskins/f06657f3-48b6-6314-7235-a9a2749df5b9/displayicon.png',
            'https://media.valorant-api.com/weaponskins/3e3ad47a-4383-73f1-4d92-1693059dae8f/displayicon.png',
            'https://media.valorant-api.com/weaponskins/24aee897-4cdc-b0fd-e596-1ba90fa6d1b2/displayicon.png',
            'https://media.valorant-api.com/weaponskins/b4903002-4687-1953-847a-e0b09a2b2726/displayicon.png',
            'https://media.valorant-api.com/weaponskins/1c63b43b-43c4-04e4-01c9-7aa1bffa5ac1/displayicon.png',
            'https://media.valorant-api.com/weaponskins/d26ce959-4ed2-7105-8f33-dea48e26de4a/displayicon.png',
            'https://media.valorant-api.com/weaponskins/1ef6ba68-4dbe-30c7-6bc8-93a6c6f13f04/displayicon.png',
            'https://media.valorant-api.com/weaponskins/075e4cf0-469b-25dc-8d6f-2995fbb093de/displayicon.png',
            'https://media.valorant-api.com/weaponskins/48ad078a-4dae-2b85-a945-f4b6d1efecbb/displayicon.png',
            'https://media.valorant-api.com/weaponskins/acdd29aa-44b5-0d78-dc54-8f92ed555559/displayicon.png',
            'https://media.valorant-api.com/weaponskins/d1f2920f-469a-3431-ad96-96afbd0017f2/displayicon.png',
            'https://media.valorant-api.com/weaponskins/2a049f35-4bcd-af25-21fd-ec942e2d5007/displayicon.png',
            'https://media.valorant-api.com/weaponskins/874025d8-4293-a38a-96ac-3d94954fb4b7/displayicon.png',
            'https://media.valorant-api.com/weaponskins/7122d78b-4e60-eb4d-5f65-738d7c1ce9ae/displayicon.png',
            'https://media.valorant-api.com/weaponskins/3bf1e8e0-47e8-f27a-6054-929575f41a54/displayicon.png',
            'https://media.valorant-api.com/weaponskins/bd9c41dd-42b1-8555-78c1-81a36016bc03/displayicon.png',
            'https://media.valorant-api.com/weaponskins/457fe5d2-40c8-4490-6834-53a74e709f4a/displayicon.png',
            'https://media.valorant-api.com/weaponskins/5211efa8-4efd-09bb-6cee-72b86a8a5972/displayicon.png',
            'https://media.valorant-api.com/weaponskins/fd44b2d5-49ee-77ab-fa56-588f3ac0c268/displayicon.png',
            'https://media.valorant-api.com/weaponskins/c79318a6-4ffd-a99f-f452-77947640f688/displayicon.png',
            'https://media.valorant-api.com/weaponskins/f01d1307-4299-42f5-2c5e-7dab7e69ab19/displayicon.png',
            'https://media.valorant-api.com/weaponskins/d25dfdc4-4fce-e121-88ef-66b5dadeee09/displayicon.png',
            'https://media.valorant-api.com/weaponskins/940fb417-4a9c-3004-41f5-3e8f1f4178b2/displayicon.png'
        ]
        const filteredSkins = validSkins.filter(skin => !badImages.includes(skin.displayIcon));
        filteredSkins.forEach((skin, index) => {
            const slideId = `slide${index + 1}`;
            const prevSlideId = `slide${index === 0 ? filteredSkins.length : index}`; 
            const nextSlideId = `slide${index === filteredSkins.length - 1 ? 1 : index + 2}`; 
            createSkinPart(skin, slideId, prevSlideId, nextSlideId);
        });
        const category = weapon.shopData ? weapon.shopData.category : 'no cat';
        if (category == 'no cat'){
            return;
        }
        else{
            stats(weapon);
        }
        
    }
}
function createOpenCard() {
    const imageStats = document.querySelector(".imageStats");
    imageStats.insertAdjacentHTML("beforeend", `
        <div class="carousel w-full"</div>
    `);
}
function createSkinPart(skin, slideId, prevSlideId, nextSlideId) {
    if (!skin || !skin.displayIcon) {
        return; 
    }
    const carousel = document.querySelector(".carousel");
    const skinIcon = skin.displayIcon || "https://via.placeholder.com/150"; 
    carousel.insertAdjacentHTML("beforeend", `
        <div id="${slideId}" class="carousel-item relative flex flex-col justify-center items-center w-full">
            <div class="flex items-center justify-center w-full h-10">
                <h2 class="font-bold text-orange-500 uppercase tracking-wide text-lg leading-none text-center">
                    ${skin.displayName}
                </h2>
            </div>
            <div class="flex justify-center items-center h-48">
                <img
                    src="${skinIcon}"
                    class="object-cover rounded-lg w-full max-h-40"
                    alt="${skin.displayName}"
                    />
            </div>
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between items-center">
                <a href="#${prevSlideId}" class="btn btn-circle bg-transparent border-0 text-white mr-[1rem]">❮</a>
                <a href="#${nextSlideId}" class="btn btn-circle bg-transparent border-0 text-white ml-[1rem]">❯</a>
            </div>

        </div>
    `);
}
function stats(weapon) {
    const imageStats = document.querySelector('.imageStats');
    const fireRate = weapon.weaponStats.fireRate || 0;
    const reloadTimeSeconds = weapon.weaponStats.reloadTimeSeconds || 0;
    const equipTimeSeconds = weapon.weaponStats.equipTimeSeconds || 0;
    const magazineSize = weapon.weaponStats.magazineSize || 0;
    imageStats.insertAdjacentHTML("beforeend", `
       <div class="weapon-stats flex flex-col gap-y-0.5 ml-10">
            <div class="stat flex flex-col text-white h-8">
                <label for="fireRate" class="w-28 text-left">Fire Rate</label>
                <div class="progress-container flex items-center">
                    <progress id="fire-rate" value="${fireRate}" max="16" class="w-72 h-2"></progress>
                </div>
            </div>
            <div class="stat flex flex-col text-white h-8">
                <label for="reloadTimeSeconds" class="w-28 text-left">Reload Time</label>
                <div class="progress-container flex items-center">
                    <progress id="reload-time-seconds" value="${reloadTimeSeconds}" max="5" class="w-72 h-2"></progress>
                </div>
            </div>
            <div class="stat flex flex-col text-white h-8">
                <label for="equipTimeSeconds" class="w-28 text-left">Equip Time</label>
                <div class="progress-container flex items-center">
                    <progress id="equip-time-seconds" value="${equipTimeSeconds}" max="1.25" class="w-72 h-2"></progress>
                </div>
            </div>
            <div class="stat flex flex-col text-white h-8">
                <label for="magazineSize" class="w-28 text-left">Magazine Size</label>
                <div class="progress-container flex items-center ">
                    <progress id="magazine-size" value="${magazineSize}" max="100" class="w-72 h-2"></progress>
                </div>  
            </div>
        </div>
    `);
}

getData();

weaponData();

