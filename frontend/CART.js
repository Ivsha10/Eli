import { updateItemQuantity, removeFromCart, getCart, createCartItem, calucalteCart } from "./js/cart.js";


window.addEventListener('load', () => {

    let cart = getCart();
    
    cart.map(item => createCartItem(item));

    const total = calucalteCart();


    const checkoutBtn = document.getElementById('checkoutBtn');

    checkoutBtn.addEventListener('click', async () => {

        if(total > 0) {

        

        let stripe  = Stripe('pk_test_51P4nTeDTLz3gKkkWZrnvSxopb9C73AOoexnMu1rc9BRp2OMdSWkLw4oPo1zwNZt3MZAGY3WY3fkTs67PMajVu3yy00iGvl8mju')
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:3500/checkout', JSON.stringify({total}), {
          headers: { 'Content-Type': 'application/json', 
            'Authorization' : `Bearer ${accessToken}`,
            withCredentials: true
         }
        });
      
        const sessionId = response.data.id;
      
        stripe.redirectToCheckout({sessionId: sessionId})

    } else { 

        window.alert('Your shopping cart is empty !');

    }


})


})