import { getProducts, createProduct } from "./js/products.js";


window.addEventListener('load', () => {

    let products = getProducts();

    if (products.length < 1) {

        products = JSON.parse(localStorage.getItem('products'));
    }

    console.log(products);

    products.forEach(p => {
        createProduct(p);
    })

})