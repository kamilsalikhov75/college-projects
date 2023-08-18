import './cart-product.css';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import trash from '../../assets/trash.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../../server';
import { addProduct, minusProduct, removeProduct } from '../../cart';

function CartProduct({
  count,
  id,
  isCheckout = false,
  setCartProducts,
  cartProducts,
  product,
}) {
  function handlePlusClick() {
    const newCartProducts = addProduct(cartProducts, id);
    setCartProducts(newCartProducts);
  }

  function handleMinusClick() {
    const newCartProducts = minusProduct(cartProducts, id);
    setCartProducts(newCartProducts);
  }

  function handleDeleteClick() {
    const newCartProducts = removeProduct(cartProducts, id);
    setCartProducts(newCartProducts);
  }

  return (
    <div className="cart__product">
      <img
        src={product.img ? `https://tat-wear.onrender.com${product.img}` : null}
        className="cart__product-img"
      />
      <Link to="/product" className="cart__product-link">
        {product.title}
      </Link>
      <p className="cart__product-price">{product.price} руб.</p>
      {isCheckout ? (
        <p className="cart__product-count">{count} шт.</p>
      ) : (
        <div className="cart__product-counter">
          <button onClick={handleMinusClick} className="cart__product-button">
            <img src={minus} className="cart__product-button-icon" />
          </button>
          <p className="cart__product-count">{count}</p>
          <button onClick={handlePlusClick} className="cart__product-button">
            <img src={plus} className="cart__product-button-icon" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="cart__product-button cart__product-button--trash"
          >
            <img src={trash} className="cart__product-button-icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export { CartProduct };
