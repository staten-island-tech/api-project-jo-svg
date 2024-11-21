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

getData();
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
openCard();
function openCard(){
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (event)=>{
            const card = event.target.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            //gets the target closest to the event aka wtv button u click 
            console.log(title);
        })
    });
}

setTimeout(openCard, 1000);
//ensures that the DOM thing loads and then you can call the buttons 