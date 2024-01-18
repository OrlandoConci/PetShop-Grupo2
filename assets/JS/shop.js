import { renderCards } from "./index.js";
console.log(renderCards)

//............. Nav tabs .............

const targets = document.querySelectorAll('[data-target]')
const content = document.querySelectorAll('[data-content]')

targets.forEach(target => {
	target.addEventListener('click', () => {
		content.forEach(c => {
			c.classList.remove('active')
		})

		const t = document.querySelector(target.dataset.target)
		t.classList.add('active')
        mostrarContenido(t)
	}) 

});

function mostrarContenido(contenedorActivo) {
    const filteredProducts = products.filter(producto => producto.categoria == contenedorActivo.id)

    let divFilter = document.createElement("div");

    divFilter.setAttribute("id", "contenedorFilter")

    const filterToAdd = `
    <label from="filter">
    <input type="text" name="buscador" id="filter" placeholder="Search"></input>

    <label for="priceRange">Filter by Price Range:</label>
    <input type="range" id="priceRange" name="priceRange" min="0" max="5000" step="100">
    <output for="priceRange" id="priceOutput">up To: 5000$</output> 

    <link rel="stylesheet" href="style.css">
    </label>
    `
    divFilter.innerHTML = filterToAdd;

    contenedorActivo.appendChild(divFilter);

    renderCards(filteredProducts, contenedorActivo)
}

//............. Fin Nav tabs .............

// ------------Filtro------------
// const $searchFilterInput = document.getElementById("filter")
// const $priceRangeFilter = document.getElementById("priceRange")
// const $priceRangeOutput = document.getElementById("priceOutput")

// $searchFilterInput.addEventListener("input", (e) => {
//     let filteredArticles = searchByText(products, e.target.value)

//     console.log(filterByPriceRange(filteredArticles, $priceRangeFilter.value));

// })

// function searchByText (products, $searchFilterInput) {
//     return products.filter( articulo => articulo.producto.toLowerCase().includes($searchFilterInput.toLowerCase()));
// }

// $priceRangeFilter.addEventListener("input", (e) => {
//     $priceRangeOutput.value = `up To: ${e.target.value}$`

//     let filteredArticles = searchByText(products, $searchFilterInput.value)

//     console.log(filterByPriceRange(filteredArticles, e.target.value));

// })

// function filterByPriceRange(filteredProducts, priceRange) {

//     console.log(priceRange);

//     return filteredProducts.filter(article => article.precio <= priceRange)
// } ;

// ------------Fin Filtro------------