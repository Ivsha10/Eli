import { getProducts, setProducts, createProduct, setCurrentProduct } from './products.js';





const handleProducts = async () => {

    const url = 'http://localhost:3500/products'

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });


        setProducts(response.data);

    } catch (error) {
        console.log(error);
    }


}



window.addEventListener('load', async () => {
    await handleProducts();

    let products = getProducts().filter((p, index) => index < 4);



    products.forEach(p => {
        createProduct(p);
    })

})


