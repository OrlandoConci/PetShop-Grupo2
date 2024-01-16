const urlApi = "https://moviestack.onrender.com/api/petshop"

export let products = []

fetch (urlApi)
    .then(response => response.json())
    .then(data = products)
    .catch(err => console.log(err))
