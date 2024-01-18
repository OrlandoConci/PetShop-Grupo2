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

function busquedaTexto(products, textoIngresado) {
    return products.filter(articulo => articulo.producto.toLowerCase().includes(textoIngresado.toLowerCase()))
}


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
function createCard(products) {
    let disp = ""
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
    return `<article href="#" class="group relative block overflow-hidden border border-gray-300  rounded-2xl bg-orange-100">
    <div class="w-[350px]"> <img src="${products.imagen}" alt="" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"/>
    </div>

    <div class="relative  bg-orange-100 p-6">
      <a href="#" class="bg-[#e37826] text-white hover:scale-[1.03]  px-3 py-1.5 text-xs font-medium"> Más Info </a>

      <h3 class="mt-4 text-lg font-medium text-gray-900">${products.producto}</h3>

      <p class="mt-1.5 text-sm text-gray-700">$ ${products.precio.toLocaleString()}</p>
      <p class="mt-1.5 text-sm text-gray-700 font-semibold">Stock: ${products.disponibles}</p>
      <p class="mt-1.5 text-sm ${text}">${disp}</p>



      <form class="mt-4">
        <button
        id="${products._id}"
          class="block w-full ${button} text-white rounded bg-[#e37826] p-4 text-sm font-medium transition hover:scale-[1.03]"
        >
          Add to Cart
        </button>
      </form>
    </div>
  </article>`
}



function renderCards(products, filterId,  contenDiv) {

    let $divContainer = document.getElementById(contenDiv);

    const data = products.filter((product) => product.categoria == filterId);
    for (const product of data) {
        $divContainer.innerHTML += createCard(product);
    }


    const $searchFilterInput = document.getElementById(`${filterId}-search`);
    const $priceRangeFilter = document.getElementById(`${filterId}-priceRange`);
    const $priceRangeOutput = document.getElementById(`${filterId}-priceOutput`);

    function searchByText(products, searchText) {
        return products.filter(articulo => articulo.producto.toLowerCase().includes(searchText.toLowerCase()));
    }

    function filterByPriceRange(filteredProducts, priceRange) {
        return filteredProducts.filter(article => article.precio <= priceRange);
    }
      
    $searchFilterInput.addEventListener("input", () => {
        let filteredProducts = searchByText(data, $searchFilterInput.value);
        filteredProducts = filterByPriceRange(filteredProducts, $priceRangeFilter.value);
        renderFilteredCards(filteredProducts, contenDiv);
    });

    $priceRangeFilter.addEventListener("input", () => {
        $priceRangeOutput.value = `up To: ${$priceRangeFilter.value}$`;
        let filteredProducts = searchByText(data, $searchFilterInput.value);
        filteredProducts = filterByPriceRange(filteredProducts, $priceRangeFilter.value);
        renderFilteredCards(filteredProducts, contenDiv);
    });
}

function renderFilteredCards( filteredProducts, contenDiv) {
    console.log(contenDiv)
    let $divContainer = document.getElementById(contenDiv);
    $divContainer.innerHTML=''
    // cardElement.innerHTML = createCard(product);
    for (const product of filteredProducts) {
        $divContainer.innerHTML += createCard(product);
    }

}

// Llamada para renderizar los productos en el contenedor 'farmacia'
renderCards(products, 'farmacia', 'pharmacy' );
// Llamada para renderizar los productos en el contenedor 'jugueteria'
renderCards(products, 'jugueteria', 'toys');
