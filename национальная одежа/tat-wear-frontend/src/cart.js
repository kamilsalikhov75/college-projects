function addProduct(cartProducts, id) {
  if (cartProducts.length) {
    if (cartProducts.find((cartProduct) => cartProduct.id === id)) {
      const newCartProducts = cartProducts.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      });
      return newCartProducts;
    } else {
      return [...cartProducts, { id, count: 1 }];
    }
  } else {
    return [{ id, count: 1 }];
  }
}

function minusProduct(cartProducts, id) {
  const product = cartProducts.find((cartProduct) => cartProduct.id === id);
  if (product.count > 1) {
    const newCartProducts = cartProducts.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count - 1 };
      } else {
        return item;
      }
    });
    return newCartProducts;
  } else {
    return cartProducts.filter((cartProduct) => cartProduct.id !== id);
  }
}

function removeProduct(cartProducts, id) {
  return cartProducts.filter((cartProduct) => cartProduct.id !== id);
}

function sumPrice(products, cartProducts) {
  const result = cartProducts.reduce((sum, current) => {
    const currentProduct = products.find(
      (product) => product._id === current.id
    );
    return sum + currentProduct.price * current.count;
  }, 0);
  return result;
}

export { addProduct, minusProduct, removeProduct, sumPrice };
