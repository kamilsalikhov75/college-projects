import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../../const';
import { Message } from '../message/message';
import './user.css';

function User({ token, user }) {
  const isAuth = user._id;
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isAuth) {
      const promise = axios.get(`${api}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      promise
        .then((response) => response.data)
        .then((data) => setOrders(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  return (
    <div className="user">
      <div className="container">
        <div className="user__block">
          <h1 className="title">Личные данные</h1>
          <p className="user__text">{user.name}</p>
          <p className="user__text">{user.email}</p>
        </div>
        <div className="user__block">
          <h1 className="title">Заказы</h1>
          {orders.length ? (
            orders.map((order, index) => (
              <div key={order._id} className="user__order">
                <p className="user__text">Заказ №{index + 1}</p>
                <p className="user__text">
                  Создан: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="user__text">Адрес доставки: {order.address}</p>
                <p className="user__text">Статус: {order.status}</p>
                <p className="user__text">Сумма: {order.price} ₽</p>
              </div>
            ))
          ) : (
            <h1 className="title">Заказов нет</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export { User };
