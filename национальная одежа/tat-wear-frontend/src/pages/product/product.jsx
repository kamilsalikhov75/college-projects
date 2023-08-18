import './product.css';
import { CustomButton } from '../../components/custom-button/custom-button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addProduct } from '../../cart';
import { fetchProduct } from '../../server';

const initialProduct = {
  title: '',
  img: '',
  price: '',
};

function Product({ cartProducts, setCartProducts }) {
  const { id } = useParams();
  const [product, setProduct] = useState(initialProduct);
  const [buttonText, setButtonText] = useState('В корзину');

  useEffect(() => {
    const promise = fetchProduct(id);
    promise.then((responce) => setProduct(responce));
  });

  function handleClick() {
    const newCartProducts = addProduct(cartProducts, id);
    setCartProducts(newCartProducts);
    setButtonText('Товар добавлен в корзину');
    setTimeout(() => {
      setButtonText('В корзину');
    }, 1000);
  }

  return (
    <div className="product content">
      <div className="container product__container">
        <h1 className="title">{product.title}</h1>
        <div className="product__content">
          <img
            src={
              product.img ? `https://tat-wear.onrender.com${product.img}` : null
            }
            className="product__img"
          />
          <div className="product__block">
            <p className="product__price">{product.price} руб.</p>
            <CustomButton
              text={buttonText}
              handle={handleClick}
              isDisabled={buttonText === 'Товар добавлен в корзину'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Product };
