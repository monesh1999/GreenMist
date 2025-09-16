export const calculateCartTotals =(cartItems,quantities) =>{
    //cart items
        const cartItems = productList.filter(product => quantities[product.id] > 0);
        // calculating
        const subtotal = cartItems.reduce((acc,product) => acc + product.price * quantities[product.id],0);
        const shipping = subtotal === 0 ? 0.0 : 10;
        const Tax = subtotal * 0.1; //10% tax
        const total = subtotal + shipping + Tax;

        return{shipping,subtotal,Tax,total};
}