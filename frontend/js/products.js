// products.js
import { addToCart } from "./cart.js";

let products = [];

let product = {
    _id: '',
    name: '',
    price: '',
    picture: '',
    description: ''
};


export function getProducts() {
    return products;
}

export function setProducts(newProducts) {
    localStorage.setItem('products', JSON.stringify(newProducts));
    products = newProducts;
}


export function createProduct(product) {


    console.log(product);

    const productCard = document.createElement('div');
    productCard.classList.add('card');

    const productImage = document.createElement('img');
    productImage.src = `../images/${product.picture}`;

    const productName = document.createElement('div');
    productName.textContent = product.name;
    productName.classList.add('product-name');

    productName.addEventListener('click', () => {
        setCurrentProduct(product)
    })

    const productPrice = document.createElement('div');
    productPrice.textContent = `$${product.price}`;
    productPrice.style.width = '100%';


    const cartButton = document.createElement('button');
    cartButton.textContent = 'Add to cart';
    cartButton.addEventListener('click', (e)=>{
        e.preventDefault();
        let newItem = {
            name: product.name,
            price: product.price,
            picture: product.picture
        };
        addToCart(newItem);

    })


    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(cartButton);


    // Append the 'col' div to the parent container
    // You should target the specific element where you want to append the product cards
    document.querySelector('.cards').appendChild(productCard);


}


export function getCurrentProduct() {
    return product;
}

export function setCurrentProduct(product) {

    localStorage.setItem('currentProduct', JSON.stringify(product));
    product = product;
    window.location.href = '/product.html';

}
