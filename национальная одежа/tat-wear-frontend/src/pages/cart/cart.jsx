import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sumPrice } from '../../cart';
import { CartProduct } from '../../components/cart-product/cart-product';
import { CustomButton } from '../../components/custom-button/custom-button';
import { fetchProducts } from '../../server';
import './cart.css';

function Cart({ setCartProducts, cartProducts }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('Корзина пуста');

  useEffect(() => {
    if (cartProducts.length) {
      setMessage('Идет загрузка');
      const promise = fetchProducts();
      promise
        .then((responce) => setProducts(responce))
        .then(() => setMessage('Корзина пуста'));
    }
  }, []);

  return (
    <div className="cart content">
      <div className="container cart__container">
        {cartProducts.length && products.length ? (
          <>
            <h1 className="title">Корзина</h1>
            <div className="cart__products">
              {cartProducts.map((cartProduct) => {
                const product = products.find(
                  (item) => item._id === cartProduct.id
                );
                return (
                  <CartProduct
                    key={cartProduct.id}
                    id={cartProduct.id}
                    count={cartProduct.count}
                    product={product}
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                  />
                );
              })}
            </div>
            <div className="cart__block">
              <p className="cart__price">
                Итого: {sumPrice(products, cartProducts)} руб.
              </p>
              <CustomButton
                text="К оформлению заказа"
                handle={() => {
                  navigate('/checkout');
                }}
              />
            </div>
          </>
        ) : (
          <h1 className="title">{message}</h1>
        )}
      </div>
    </div>
  );
}

export { Cart };
