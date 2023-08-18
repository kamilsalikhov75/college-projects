import axios from 'axios';

async function fetchProducts() {
  try {
    const responce = await axios.get('https://tat-wear.onrender.com/products');
    if (responce.status === 200) {
      return responce.data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchProduct(id) {
  try {
    const responce = await axios.get(
      `https://tat-wear.onrender.com/products/${id}`
    );
    if (responce.status === 200) {
      return responce.data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchCreateOrder(order) {
  try {
    const responce = await axios.post(
      'https://tat-wear.onrender.com/orders',
      order
    );
    if (responce.status === 200) {
      return responce;
    }
  } catch (error) {
    console.log(error);
  }
}

export { fetchProduct, fetchProducts, fetchCreateOrder };
