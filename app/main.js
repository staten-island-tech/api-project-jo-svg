import "./style.css";
async function getData(){
    try {
        const response = await fetch("https://api.waifu.im/kamisato-ayaka");
        if (response.status != 200){
            throw new Error(response);
        }
        else{
            const data = await response.json();
            document.querySelector('h1').textContent = data.name
            console.log(data.name)
        }
    } catch (error) {
        console.log(error);
        alert("yesh")
    }
}

getData();

function createSongCards(){
    document.querySelector('.container').innerHTML = '';
    const container = document.querySelector(".container");
    yes.forEach((song)=>{
        const { title, artist, genre, price, releaseDate: release, imageUrl: img, altText: des } = song;
        container.insertAdjacentHTML("beforeend",
            `<div class="card">
                <img src="${img}" alt="${des}">
                <h1>${title}</h1>
                <h2>${artist}</h2>
                <h3>${genre}</h3>
                <p>${release}</p>
                <p class="price">Cost: ${price}</p>
            </div>`
        );
    });
}
