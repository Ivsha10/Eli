
let cart = [];


export const getCart = () => {

    cart = JSON.parse(localStorage.getItem('cart'));
    return cart;

}


export const addToCart = (newItem) => {

    cart = getCart();
   
    if(cart) {
        cart.forEach(item => {

            if(item.name === newItem.name) {
            item.quantity = item.quantity + 1;
            }
            else {
                cart.push({...newItem, quantity: 1});    
            }
        
        })
    
    } else {
        cart = [{...newItem, quantity:1}]
    }
 
    
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart);

}

const setCart = (newCart) => {

    cart = [...newCart];

    localStorage.setItem('cart', JSON.stringify(cart));

    

}

export const updateItemQuantity = (updatedItem, quantity) => {

    cart = getCart();
    
    cart.forEach(item => {

            if(item.name === updatedItem.name) {
                item.quantity = quantity;
            }
    });

    
    setCart(cart);
    getCart();

    calucalteCart();
}


export const removeFromCart = (removeItem) => {

    let cart = getCart();


    setCart(cart.filter(item => item.name !== removeItem.name));

    calucalteCart();

}


export const createCartItem = (item) => {
    // Create a new cart item div
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    // Construct the inner HTML of the cart item
    cartItemDiv.innerHTML = `
        <div class="row" style="align-item:center;">
            <div class="col-md-3">
                <img src="images/${item.picture}" class="img-fluid" alt="${item.name}">
            </div>
            <div class="col-md-5">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="col-md-2">
                <label for="quantityInput">Quantity:</label>
                <input type="number" min="0" class="quantity-input" style="width:125px;" value='${item.quantity}'>
            </div>
            <div class="col-md-2">
                <button class="btn btn-danger removeBtn" style="height: 55px;">Remove</button>
            </div>
        </div>
    `;

    // Append the cart item to the cart container
    const cartItems = document.getElementById('cartItems');
    cartItems.appendChild(cartItemDiv);

    // Add event listener for quantity change
    const quantityInput = cartItemDiv.querySelector('.quantity-input');
    quantityInput.addEventListener('change', function() {
        updateItemQuantity(item, parseInt(quantityInput.value));
    });

    // Add event listener for remove button
    const removeBtn = cartItemDiv.querySelector('.removeBtn');
    
    removeBtn.addEventListener('click', function() {
        // Remove the cart item from the DOM
        cartItemDiv.remove();
        // Remove the item from the cart
        removeFromCart(item);
    });
};


export const calucalteCart = () => {

    let cart = getCart();

    let totals = [];

    cart.forEach(item => {

        totals.push(parseFloat(item.price) * item.quantity);

    })

    let subtotal = totals.reduce((acc, curr) => acc + curr, 0);
    let tax = subtotal * 0.06;
    let total = subtotal + tax;

    let subtotalSpan = document.getElementById('subtotal');
    subtotalSpan.textContent = `$${subtotal}`;

    let taxSpan = document.getElementById('tax');
    taxSpan.textContent = `$${tax.toFixed(2)}`;

    let totalSpan = document.getElementById('total');
    totalSpan.textContent = `$${total}`;

    return total;
}
