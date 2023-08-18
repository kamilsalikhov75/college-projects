import { Link } from 'react-router-dom';
import './product-card.css';
import { CustomButton } from '../custom-button/custom-button';
import { addProduct } from '../../cart';
import { useState } from 'react';

function ProductCard({ id, title, price, img, setCartProducts, cartProducts }) {
  const [buttonText, setButtonText] = useState('В корзину');

  function handleClick() {
    const newCartProducts = addProduct(cartProducts, id);
    setCartProducts(newCartProducts);
    setButtonText('Товар добавлен в корзину');
    setTimeout(() => {
      setButtonText('В корзину');
    }, 1000);
  }

  return (
    <div className="product__card">
      <Link to={`/product/${id}`} className="product__card-link">
        <img
          src={`https://tat-wear.onrender.com${img}`}
          className="product__card-img"
        />
        <h3 className="product__card-title">{title}</h3>
      </Link>
      <p className="product__card-price">{price} руб.</p>
      <CustomButton
        text={buttonText}
        handle={handleClick}
        isDisabled={buttonText === 'Товар добавлен в корзину'}
      />
    </div>
  );
}

export { ProductCard };
