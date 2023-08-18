import './product.css';
import product from '../../assets/product.jpg';
import cartIcon from '../../assets/cart-icon.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../const';
import { Message } from '../message/message';
import { addToCart } from '../../cart';

function Product({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const promise = axios.get(`${api}/product/${id}`);

    promise
      .then((response) => response.data)
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  function addProduct() {
    const updatedCart = addToCart(product._id, cart);
    setCart(updatedCart);
  }

  return (
    <div className="product">
      <div className="container">
        <img src={`${api}${product.imageUrl}`} className="product__img" />
        <div className="product__block">
          <h1 className="product__title">{product.title}</h1>
          <p className="product__price">{product.price} ₽</p>
          <button onClick={addProduct} className="button">
            В корзину
            <img src={cartIcon} className="button__img" />
          </button>
          <p className="product__text">{product.desc}</p>
        </div>
      </div>
    </div>
  );
}

export { Product };
