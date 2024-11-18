import "./style.css";
document.querySelector('.container').innerHTML = '';


async function getData(){
    try {
        const response = await fetch("https://valorant-api.com/v1/weapons/skins");
        //this is valorant weapon skins
        if (response.status != 200){
            throw new Error('failed to catch data');
        }
        else{
            const jsonResponse = await response.json();
            const info = jsonResponse.data;
            info.forEach((skin)=>{
                createCards(skin.displayName, skin.uuid, skin.displayIcon || "https://via.placeholder.com/150", skin.wallpaper || "No wallpaper available");
                //if the skin doesnt have an image it willl put a placehoklder image, ask whalen if he wants a image or na
                //document.querySelector('h1').textContent = skin.displayName;
            }) 
        }
    } catch (error) {
        console.log(error);
        alert("no work")
    }
}
getData();
function createCards(displayName, uuid, displayIcon, wallpaper){
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
                <p>${uuid}</p>
                <p>${wallpaper}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>`
    );
}
