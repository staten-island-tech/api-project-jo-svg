import "./style.css";
async function getData(){
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
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