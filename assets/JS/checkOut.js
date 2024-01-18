const cart = JSON.parse(localStorage.getItem('cart'));

function renderCartProducts(cart) {
    const cartContainer = document.getElementById('checkOutProducts');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        // Manejar el carrito vacío
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

    cart.forEach((product) => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('flex', 'flex-col', 'rounded-lg', 'bg-white', 'sm:flex-row');

        // Crear elementos HTML para cada producto
        const productImage = document.createElement('img');
        productImage.classList.add('m-2', 'h-24', 'w-28', 'rounded-md', 'border', 'object-cover', 'object-center');
        productImage.src = product.imagen; // Reemplaza 'imagen' con la propiedad real en tu objeto de producto
        productImage.alt = '';

        const productDetails = document.createElement('div');
        productDetails.classList.add('flex', 'w-full', 'flex-col', 'px-4', 'py-4');

        const productName = document.createElement('span');
        productName.classList.add('font-semibold');
        productName.textContent = product.producto; // Reemplaza 'producto' con la propiedad real en tu objeto de producto

        const productPrice = document.createElement('p');
        productPrice.classList.add('mt-auto', 'text-lg', 'font-bold');
        productPrice.textContent = `$${(product.precio * product.quantity).toFixed(2)}`;

        // Agregar elementos al contenedor del producto
        productDetails.appendChild(productName);
        productDetails.appendChild(productPrice);

        productContainer.appendChild(productImage);
        productContainer.appendChild(productDetails);

        cartContainer.appendChild(productContainer);

        // Calcular subtotal
        subtotal += product.precio * product.quantity;
    });

    // Actualizar los valores en el HTML
// Después de calcular los valores
const subtotalValue = document.getElementById('subtotalValue');
const shippingValue = document.getElementById('shippingValue');
const totalValue = document.getElementById('totalValue');

subtotalValue.textContent = `$${subtotal.toFixed(2)}`;
shippingValue.textContent = `$4.00`; 
totalValue.textContent = `$${(subtotal + 4.00).toFixed(2)}`;


    return {
        subtotal,
        deliveryFee: 4.00,
        total: subtotal + 4.00
    };
}

// Llamada a la función para renderizar y actualizar los valores en el HTML
renderCartProducts(cart);
