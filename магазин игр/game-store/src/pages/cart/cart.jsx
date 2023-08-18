import './cart.css';
import { CartProduct } from '../../components/cart-product/cart-product';
import { Message } from '../message/message';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../const';
import { sumOrder } from '../../cart';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart, token }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length) {
      setIsLoading(true);

      const promise = axios.get(`${api}/products/all`);

      promise
        .then((response) => response.data)
        .then((data) => setProducts(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!cart.length) {
    return <Message title="Корзина пуста" />;
  }

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  async function createOrder() {
    if (!address.trim()) {
      return alert('Нужно заполнить все поля!');
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${api}/orders`,
        {
          products: cart,
          address,
          price: sumOrder(cart, products),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCart([]);
        navigate('/user');
      }
    } catch (error) {
      console.log(error);
      alert('Ошибка при создании заказа');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="cart">
      <div className="container">
        <h1 className="title">Корзина</h1>
        <div className="cart__inner">
          <div className="cart__block">
            {cart.map((item) => {
              const currentProduct = products.find(
                (product) => product._id === item.id
              );
              return (
                <CartProduct
                  key={item.id}
                  product={currentProduct}
                  cart={cart}
                  setCart={setCart}
                  count={item.count}
                />
              );
            })}
          </div>
          <div className="checkout__block">
            <h3 className="checkout__block-title">
              Итого: <span>{sumOrder(cart, products)}₽</span>
            </h3>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                createOrder();
              }}
              className="checkout__form"
            >
              <input
                type="text"
                className="input"
                placeholder="Адрес доставки"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <button type="submit" className="button">
                Оформить заказ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Cart };
