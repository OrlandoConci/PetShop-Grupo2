const $productOnly = document.getElementById("productOnly")

const queryParams = new URLSearchParams(location.search)
const id = queryParams.get("id")

fetch("https://moviestack.onrender.com/api/petshop")
    .then( respuesta => respuesta.json())
    .then( articuloApi => {
        const articulo = articuloApi.find( articulo => articulo.id == id)
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


    })
    .catch(error => error)
