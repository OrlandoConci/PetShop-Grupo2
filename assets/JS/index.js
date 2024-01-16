const urlApi = "https://moviestack.onrender.com/api/petshop"

export let products = []

fetch (urlApi)
    .then(response => response.json())
    .then(products => {
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
    })
    .catch(err => console.log(err))




