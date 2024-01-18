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

// function busquedaTexto(products, textoIngresado) {
//     return products.filter(articulo => articulo.producto.toLowerCase().includes(textoIngresado.toLowerCase()))
// }

//---Toggle del carrito
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
    let disp = "";
    let text = "";
    let button = "";
    let inputMax = `max="${products.disponibles}"`;
    let isOnStock = "";
    let marginStock = "ml-4";

    if (products.disponibles == 0) {
        text = "text-red-500 font-bold";
        disp = "No hay stock!";
        button = "hidden";
        inputMax = "disabled";
        isOnStock = "hidden";
        marginStock = ""


    } else if (products.disponibles <= 5) {
        text = "text-orange-500 font-bold";
        disp = "Últimas disponibles!";
    }

    return `<article href="#" class="group relative block overflow-hidden border border-gray-300 rounded-2xl bg-orange-100">
        <div class="w-[350px]">
            <img src="${products.imagen}" alt="" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />
        </div>

        <div class="relative  bg-orange-100 p-6">
            <a href="./productDetail.html?id=${products._id}" class="bg-[#e37826] text-white hover:scale-[1.03]  px-3 py-1.5 text-xs font-medium"> Más Info </a>

            <h3 class="mt-4 text-lg font-medium text-gray-900">${products.producto}</h3>

            <p class="mt-1.5 text-sm text-gray-700">$ ${products.precio.toLocaleString()}</p>
            <div class="flex w-[100%]"> 
            <p class="${button} mt-1.5 text-sm text-gray-700 font-semibold">Stock: ${products.disponibles} </p>
            <p class="mt-1.5 text-sm ${text} ${marginStock}">${disp}</p>
            </div>

            <div class="mt-4">
            <div class="form-container">
            <label class="${button}"for="quantity">Cantidad:</label>
            <input type="number" id="quantity" name="quantity" min="1" ${inputMax} value="1" class="${isOnStock} quantity-input mb-2 h-fit border rounded pl-1 w-10" />
            <button data-add-to-cart="${products._id}" class="block w-full ${button} text-white rounded bg-[#e37826] p-4 text-sm font-medium transition hover:scale-[1.03]">
                Add to Cart
            </button>
            </div> 
        </div>
    </article>`;
}


//---Productos Home >>>>> deprecated

// function getRandomIndex(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// function renderRandomProducts(products, containerId) {
//     const container = document.getElementById(containerId);
//     const randomProducts = Array.from({ length: 4 }, () => {
//         const randomIndex = getRandomIndex(0, products.length - 1);
//         return products[randomIndex];
//     });
//     container.innerHTML = '';
//     randomProducts.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.innerHTML = createCard(product);
//         container.appendChild(productCard);
//     });
// }


//----Renderizar productos en tienda----///

function renderCards(products, filterId,  contenDiv) {
    let $divContainer = document.getElementById(contenDiv);
    
    
    const data = products.filter((product) => product.categoria == filterId);
    for (const product of data) {
        if ($divContainer) {
            $divContainer.innerHTML += createCard(product);
        }
    }


    const $searchFilterInput = document.getElementById(`${filterId}-search`);
    const $priceRangeFilter = document.getElementById(`${filterId}-priceRange`);
    const $priceRangeOutput = document.getElementById(`${filterId}-priceOutput`);
    if ($searchFilterInput || $priceRangeFilter || $priceRangeOutput) {
    
   
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
    for (const product of filteredProducts) {
        if ($divContainer) {
            $divContainer.innerHTML += createCard(product);
        }

    }
}
}


renderCards(products, 'farmacia', 'pharmacy' );

renderCards(products, 'jugueteria', 'toys');



//----Añadir productos al carrito----//

const $product = document.getElementById('store');
if ($product){
$product.addEventListener('click', (e) => {
    const targetButton = e.target.closest('button[data-add-to-cart]');

    if (targetButton) {
        e.preventDefault();

        const productId = targetButton.getAttribute('data-add-to-cart');
        const productToAdd = products.find(product => product._id === productId);

        const quantityInput = targetButton.closest('.form-container').querySelector('.quantity-input');
        const quantityToAdd = parseInt(quantityInput.value) || 1;

        productToAdd.quantity = quantityToAdd;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Producto agregado al carrito:', productToAdd);


        renderCartProducts(cart);
        updateCartValues(cart);
    }
});
}

//-----Mostrar productos en el carrito----//
function renderCartProducts(cart) {
    const cartContainer = document.getElementById('cartProducts');
    if (cartContainer) {
        
    
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'El carrito está vacío';
        emptyCartMessage.style.fontWeight = '600'; // Semibold
        cartContainer.appendChild(emptyCartMessage);
        return {
            subtotal: 0,
            deliveryFee: 0,
            total: 0
        };
    }

    let subtotal = 0;

    const table = document.createElement('table');
    table.classList.add('w-full');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    cartContainer.appendChild(table);

    const tbody = table.querySelector('tbody');

    cart.forEach((product, index) => {
        const productPrice = product.precio * product.quantity;
        subtotal += productPrice;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center; font-weight: 600;">${product.producto}</td>
            <td style="text-align: center; font-weight: 600;">Cant: ${product.quantity}</td>
            <td style="text-align: center; font-weight: 600;">$${productPrice.toFixed(2)}</td>
            <td style="text-align: center;"><button class="delete-product" data-index="${index}" style="font-weight: 600;">&#10006;</button></td>
        `;
        tbody.appendChild(row);
    });
    const deleteButtons = document.querySelectorAll('.delete-product');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToRemove = parseInt(e.target.getAttribute('data-index'));
            cart.splice(indexToRemove, 1);
            renderCartProducts(cart); 
            updateCartValues(cart); 
        });
    });

    return {
        subtotal,
        deliveryFee: 4.00,
        total: subtotal + 4.00
    };
}
}

//----Actualizar productos en el carrito y local storage----//
function updateCartValues(cart) {
    const cartInfo = renderCartProducts(cart);

    document.getElementById('subtotalValue').textContent = `$${cartInfo.subtotal.toFixed(2)}`;
    document.getElementById('deliveryFeeValue').textContent = `$${cartInfo.deliveryFee.toFixed(2)}`;
    document.getElementById('totalValue').textContent = `$${cartInfo.total.toFixed(2)}`;

    const cartValues = {
        subtotal: cartInfo.subtotal.toFixed(2),
        total: cartInfo.total.toFixed(2)
    };
    localStorage.setItem('cartValues', JSON.stringify(cartValues));
    localStorage.setItem('cart', JSON.stringify(cart));
}

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

renderCartProducts(initialCart);
updateCartValues(initialCart);


renderRandomProducts(products, 'cardContainer');

