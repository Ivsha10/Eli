import { getCurrentProduct } from "./products.js";
import { addToCart } from "./cart.js";

const createProduct = () => {

    let product = getCurrentProduct();

    if (!product.name) {
        product = JSON.parse(localStorage.getItem('currentProduct'));
    }

    const image = document.createElement('img');
    image.src = `../images/${product.picture}`;

    const name = document.createElement('div');
    name.textContent = product.name;
    name.style.fontSize = '24px'

    const price = document.createElement('div');
    price.textContent = `$${product.price}`;
    price.style.fontSize = '28px'

    const description = document.createElement('div');
    description.textContent = product.description;
    price.style.fontSize = '20px'
    description.style.marginBottom = '30px'


    const cartButton = document.createElement('button');
    cartButton.textContent = 'Add to Cart';

    cartButton.addEventListener('click', (e) => {

        e.preventDefault();

        const newItem = {
            name: product.name,
            price: product.price,
            picture: product.picture
        };

        addToCart(newItem);


    })

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    contentContainer.appendChild(name);
    contentContainer.appendChild(price);
    contentContainer.appendChild(description);
    contentContainer.appendChild(cartButton);



    document.querySelector('.product-container').appendChild(image);
    document.querySelector('.product-container').appendChild(contentContainer);


}

window.addEventListener('load', () => {


    createProduct();



})