export function addToCart(id, cart) {
  let updatedCart;
  if (cart.find((item) => item.id === id)) {
    updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
  } else {
    updatedCart = [...cart, { id, count: 1 }];
  }
  return updatedCart;
}

export function minusFromCart(id, cart) {
  let updatedCart;
  const product = cart.find((item) => item.id === id);
  if (product.count > 1) {
    updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
  } else {
    updatedCart = cart.filter((item) => item.id !== id);
  }
  return updatedCart;
}

export function sumOrder(cart, products) {
  const result = cart.reduce((sum, current) => {
    const currentProduct = products.find(
      (product) => product._id === current.id
    );
    return sum + currentProduct.price * current.count;
  }, 0);
  return result;
}
