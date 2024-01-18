
const urlApi = "https://moviestack.onrender.com/api/petshop";

export let products = [];

await fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        products = data;
        return products;
    })
    .catch(err => console.log(err));

//............. Nav tabs .............

mostrarContenido("farmacia")

const $divsContainer = document.getElementById("divsContainer")
$divsContainer.addEventListener("click", e => {
    let categoria = ""
    if (e.target.id == "farmacia") {
        categoria = "farmacia"
    } else if (e.target.id == "jugueteria") {
        categoria = "jugueteria"
    }
    if (categoria != "") {
        mostrarContenido(categoria)
    }

})

function mostrarContenido(categoria) {
    const $contenedorCards = document.getElementById("contenedorCards")
    const $searchFilterInput = document.getElementById("filter")
    const $priceRangeFilter = document.getElementById("priceRange")
    const $priceRangeOutput = document.getElementById("priceOutput")

    $searchFilterInput.value = "";
    $priceRangeFilter.value = 5000;
    $priceRangeOutput.value = `up to: ${$priceRangeFilter.value}`

    $contenedorCards.innerHTML = ""
    let arrayCategorias = products.filter(producto => producto.categoria == categoria)

    renderCards(arrayCategorias, $contenedorCards)
    filtrarArticulos(arrayCategorias, $contenedorCards)
}

//............. Fin Nav tabs .............

// ------------Filtro------------

function filtrarArticulos(arrayCategorias, contenedor) {
    const $searchFilterInput = document.getElementById("filter")
    const $priceRangeFilter = document.getElementById("priceRange")
    const $priceRangeOutput = document.getElementById("priceOutput")

    $searchFilterInput.addEventListener("input", (e) => {
        let filteredArticles = searchByText(arrayCategorias, e.target.value)
        let filteredRange = filterByPriceRange(filteredArticles, $priceRangeFilter.value);
        if (filteredRange.length != 0) {
            renderCards(filteredRange, contenedor)
        } else {
            contenedor.innerHTML = "<p class='text-center'>without results</p>"
        }

    })

    $priceRangeFilter.addEventListener("input", (e) => {
        $priceRangeOutput.value = `up To: ${e.target.value}$`

        let filteredArticles = searchByText(arrayCategorias, $searchFilterInput.value)
        console.log("filteredArticles", filteredArticles)
        let filteredRange = filterByPriceRange(filteredArticles, e.target.value);
        console.log("filteredRange", filteredRange)
        if (filteredRange.length != 0) {
            renderCards(filteredRange, contenedor)
        } else {
            contenedor.innerHTML = "<p class='text-center text-gray-600 font-bold text-2xl'>without results</p>"
        }

    })
}

function searchByText(products, $searchFilterInput) {
    return products.filter(articulo => articulo.producto.toLowerCase().includes($searchFilterInput.toLowerCase()));
}

function filterByPriceRange(filteredProducts, priceRange) {
    return filteredProducts.filter(article => article.precio <= priceRange)
};

// ------------Fin Filtro------------

//------------- carrito -----------------

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
        }, 100);
        checdiv.classList.remove("hidden");
        flag3 = false;
    }
};

//............. cards  .............
function createCard(products) {
    let disp = "."
    let text = ""
    let button = ""
    if (products.disponibles == 0) {
        text = "text-red-500 font-bold"
        disp = "No hay stock!"
        button = "hidden"
    } else if (products.disponibles <= 5) {
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
        
            <p class="mt-1.5 text-sm text-gray-700">${products.precio.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <p class="mt-1.5 text-sm text-gray-700 font-semibold">Stock: ${products.disponibles} unidades.</p>
            <p class="mt-1.5 text-sm ${text}">${disp}</p>

            <button class="block w-full ${button} mt-4 rounded bg-[#e37826] p-4 text-sm font-medium transition hover:scale-[1.03]">Add to Cart</button>
        </div>
    </div>`
}

function renderCards(arrayReceived, $container) {
    let acumulador = "";
    for (const product of arrayReceived) {
        acumulador += createCard(product)
    }
    $container.innerHTML = acumulador;
}

// ............. cards Home..............

const $cardContainer = document.getElementById("cardContainer")
console.log($cardContainer)
const arrayCardsHome = products.filter(producto => producto.disponibles <= 5).slice(0, 5)
renderCards(arrayCardsHome, $cardContainer)

// dropdownButton.addEventListener('click', toggleDropdown);


// window.addEventListener('click', (event) => {
//     if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
//         dropdownMenu.classList.add('hidden');
//         isDropdownOpen = false;
//     }
// });
