
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
const $ingresoFilter = document.getElementById("filter")
const $contenedorFilter = document.getElementById("contenedorFilter")

$ingresoFilter.addEventListener("input", (e) => {
    let articulosFiltrados = busquedaTexto(products, e.target.value)
    console.log(articulosFiltrados)
    // crearArticles(articulosFiltrados, $contenedorFilter)
})

function busquedaTexto (products, textoIngresado) {
    return products.filter( articulo => articulo.producto.toLowerCase().includes(textoIngresado.toLowerCase()))
}
 
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
	})
})

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

const dropdownButton = document.getElementById('dropdown-button');
const dropdownMenu = document.getElementById('dropdown-menu');
let isDropdownOpen = true;


function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
        dropdownMenu.classList.remove('hidden');
    } else {
        dropdownMenu.classList.add('hidden');
    }
}


toggleDropdown();


dropdownButton.addEventListener('click', toggleDropdown);


window.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
        isDropdownOpen = false;
    }
});
