// This is your test secret API key.
const stripe = require('stripe')('sk_test_51P4nTeDTLz3gKkkWSfj1s02spmDXvSwAh8g41OFW5C6UNRrWLYCTiviMQoHYSKYR8lBOqTqCxnqvjdgF0soP5Y6O00tZTt9how');
const express = require('express');
const router = express.Router();

const YOUR_DOMAIN = 'http://127.0.0.1:5501';

router.post('/', async (req, res) => {

    const total = (req.body.total);

    console.log(total);

    const session = await stripe.checkout.sessions.create({



        payment_method_types: ['card', 'klarna', 'cashapp'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Order for Eli Tech Warehouse', // Replace with your product name
                    },
                    unit_amount: total * 100, // Replace with the actual amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cart.html`,
    });

    res.json({id: session.id});
});

module.exports = router;
