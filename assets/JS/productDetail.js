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

const articulo = articulos.find( articulo => articulo.id == id)
let disp = ""
if (articulo.disponibles <= 5) {
    disp = "Últimas disponibles!" 
} 

$productOnly.innerHTML = `
<article>
    <img src="${articulo.imagen} alt="Imágen ilustratica de un/a ">
    <h1>${articulo.producto}</h1>
    <div>
        <p>${articulo.precio.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</p>
        <div>
            <p>Stock: ${articulo.disponibles}</p>
            <p>${disp}</p>
        </div>
    </div>
    <p>${articulo.descripcion}
</article>`

