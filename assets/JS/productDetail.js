const $productOnly = document.getElementById("productOnly")

const queryParams = new URLSearchParams(location.search)
const id = queryParams.get("id")

const urlApi = "https://moviestack.onrender.com/api/petshop";

export let articulos = [];

await fetch(urlApi)
.then(response => response.json())
.then(data => {
    articulos = data;
    return articulos; 
})
.catch(err => console.log(err));

 console.log(articulos)

const articulo = articulos.find( articulo => articulo._id == id)
let disp = ""
let cambioColor = ""

if (articulo.disponibles == 0) {
    cambioColor = "italic font-bold text-red-500"
    disp = "No hay stock!"
}  
else if (articulo.disponibles <= 5) {
    cambioColor = "italic font-bold text-orange-500"
    disp = "Últimas disponibles!" 
}

$productOnly.innerHTML = `
<article class = "flex flex-col bg-orange-100 m-20 w-[600px] border text-gray-700 rounded-2xl shadow-2xl border-solid">
    <img class = "rounded-2xl h-[500px] w-full" src="${articulo.imagen} alt="Imágen ilustrativa de ${articulo.producto} ">
    <h1 class = "text-3xl text-center font-bold m-5 justify-center">${articulo.producto}</h1>
    <div class = "">
        <p class = "m-3"><span class = "font-bold">Coste: </span>${articulo.precio.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</p>
        <div class = "m-3">
            <p><span class = "font-bold">Stock: </span>${articulo.disponibles}</p>
            <p class = "${cambioColor}">${disp}</p>
        </div>
    </div>
    <p class = "m-3">${articulo.descripcion}
</article>`

