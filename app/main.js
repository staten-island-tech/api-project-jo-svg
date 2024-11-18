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
        `<div class="card">
            <img src="${displayIcon}" alt="${displayName}">
            <h1>${displayName}</h1>
            <h2>UUID: ${uuid}</h2>
            <h3>${wallpaper}</h3>
        </div>`
    );
}
