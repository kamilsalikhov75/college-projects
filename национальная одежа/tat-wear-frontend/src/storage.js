function saveCartProducts(products) {
  try {
    localStorage.setItem('cart', JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

function getCartProducts() {
  try {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    if (cartProducts) {
      return cartProducts;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}

export { saveCartProducts, getCartProducts };
