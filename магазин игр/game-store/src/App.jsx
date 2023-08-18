import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { api } from './const';
import { Cart } from './pages/cart/cart';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Message } from './pages/message/message';
import { Product } from './pages/product/product';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';
import { User } from './pages/user/user';

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem('game-cart')) || []
  );

  useEffect(() => {
    if (token === '') {
      window.localStorage.removeItem('token');
      setUser({});
      setIsLoading(false);
    } else if (token) {
      const promise = axios.get(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      promise
        .then((response) => response.data)
        .then((data) => setUser(data.userData))
        .catch((error) => console.log(error))
        .finally(setIsLoading(false));
    }
  }, [token]);

  useEffect(() => {
    window.localStorage.setItem('game-cart', JSON.stringify(cart));
  }, [cart]);

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/index.html"
          element={<Home cart={cart} setCart={setCart} />}
        />
        <Route
          path="/product/:id"
          element={<Product cart={cart} setCart={setCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} token={token} />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/user" element={<User token={token} user={user} />} />
        <Route
          path="/products/:category"
          element={<Products cart={cart} setCart={setCart} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
