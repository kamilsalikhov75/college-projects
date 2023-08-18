import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sumPrice } from '../../cart';
import { CartProduct } from '../../components/cart-product/cart-product';
import { CustomButton } from '../../components/custom-button/custom-button';
import { fetchCreateOrder, fetchProducts } from '../../server';
import './checkout.css';

function Checkout({ setCartProducts, cartProducts }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (cartProducts.length) {
      const promise = fetchProducts();
      promise.then((responce) => setProducts(responce));
    } else {
      navigate('/index.html');
    }
  }, []);

  function handleSumit() {
    if (name.trim() && phone.trim() && address.trim()) {
      const order = {
        products: [...cartProducts],
        name,
        phone,
        address,
      };
      const promise = fetchCreateOrder(order);
      promise.then((responce) => {
        if (responce.status === 200) {
          setMessage({
            title: 'Заказ',
            text: 'Ваш заказ оформлен. В ближайшее время с вами свяжется менеджер для уточнения деталей',
          });
          setCartProducts([]);
        }
      });
    } else {
      setMessage({
        title: 'Обратите внимание',
        text: 'Заполните все поля для ввода!',
      });
    }
  }

  function closeMessage() {
    setMessage('');
  }

  return (
    <div className="checkout content">
      {message ? (
        <div className="message">
          <div className="message__block">
            <h3 className="message__title">{message.title}</h3>
            <p className="message__text">{message.text}</p>
            <button onClick={closeMessage} className="message__button">
              Закрыть сообщение
            </button>
          </div>
        </div>
      ) : null}
      <div className="container checkout__container">
        <h1 className="title">Оформление заказа</h1>
        <div className="checkout__products">
          {products.length
            ? cartProducts.map((cartProduct) => {
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
                    isCheckout={true}
                  />
                );
              })
            : null}
        </div>
        <form
          className="checkout__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSumit();
          }}
        >
          <div className="checkout__inputs">
            <input
              type="text"
              className="checkout__input"
              placeholder="Имя"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              className="checkout__input"
              placeholder="Номер телефона"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
            <input
              type="text"
              className="checkout__input"
              placeholder="Адрес доставки"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div className="checkout__block">
            <p className="checkout__price">
              Итого: {products.length && sumPrice(products, cartProducts)} руб.
            </p>
            <CustomButton text="Оформить заказ" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export { Checkout };
