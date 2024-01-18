
const urlApi = "https://moviestack.onrender.com/api/petshop";

export let products = [];

await fetch(urlApi)
.then(response => response.json())
.then(data => {
    products = data;
    return products;
})
.catch(err => console.log(err));

 console.log(products)

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

let checkout = document.getElementById("checkout");
let checdiv = document.getElementById("chec-div");
let flag3 = false;

window.checkoutHandler = function () {
    if (!flag3) {
        checkout.classList.add("translate-x-full");
        checkout.classList.remove("translate-x-0");
        setTimeout(function () {
            checdiv.classList.add("hidden");
        }, 300);
        flag3 = true;
    } else {
        setTimeout(function () {
            checkout.classList.remove("translate-x-full");
            checkout.classList.add("translate-x-0");
        }, 300);
        checdiv.classList.remove("hidden");
        flag3 = false;
    }
};

//............. cards  .............
function createCard(products){
    let disp = ""
    let text = ""
    let button =""
    if (products.disponibles == 0) {
        text = "text-red-500 font-bold"
        disp = "No hay stock!"
        button = "hidden"
    }else if(products.disponibles <= 5){
        text = "text-orange-500 font-bold"
        disp = "Últimas disponibles!" 
    }
    return `
    <div class="flex flex-col bg-orange-100 rounded w-[350px] max-h-[650px] border-2 border-orange-100">
        <div class="w-full">
            <img
            src="${products.imagen}"
            alt=""
            class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />
        </div>
    
        <div class="p-6 w-full">
            <a href="./productDetail.html?id=${products._id}" class="bg-[#e37826] whitespace-nowrap  px-3 py-1.5 text-xs font-medium"> Mas Info </a>
        
            <h3 class="mt-4 text-lg font-medium text-gray-900">${products.producto}</h3>
        
            <p class="mt-1.5 text-sm text-gray-700">$ ${products.precio.toLocaleString( 'en-US', { style:'currency', currency:'USD' } )}</p>
            <p class="mt-1.5 text-sm text-gray-700 font-semibold">Stock: ${products.disponibles}</p>
            <p class="mt-1.5 text-sm ${text}">${disp}</p>

            <button class="block w-full ${button} mt-4 rounded bg-[#e37826] p-4 text-sm font-medium transition hover:scale-[1.03]">Add to Cart</button>
        </div>
    </div>`
}

function renderCards(arrayReceived, $containerDiv){
    let $containerCards = $containerDiv;

    $containerCards.innerHTML = "";

    let crearCards = "";

    for (const product of arrayReceived){
        crearCards += createCard(product)
    }

    $containerCards.innerHTML += crearCards;    
}

//............. cards Home..............
const $cardContainer = document.getElementById("cardContainer")
console.log($cardContainer)
const arrayCardsHome = products.filter(producto => producto.disponibles <= 5).slice(0, 5)
console.log(arrayCardsHome)
renderCards(arrayCardsHome, $cardContainer)


// dropdownButton.addEventListener('click', toggleDropdown);


// window.addEventListener('click', (event) => {
//     if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
//         dropdownMenu.classList.add('hidden');
//         isDropdownOpen = false;
//     }
// });
