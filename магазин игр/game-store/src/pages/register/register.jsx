import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../const';
import { Message } from '../message/message';

function Register({ setToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return alert('Нужно заполнить все поля!');
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${api}/register`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        window.localStorage.setItem('token', token);
        navigate('/user');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  return (
    <div className="auth">
      <div className="container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            register();
          }}
          className="auth__form"
        >
          <input
            type="text"
            className="input"
            placeholder="Имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="Электронная почта"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="button">Зарегистрироваться</button>
          <Link to="/login" className="auth__link">
            Перейти к авторизации
          </Link>
        </form>
      </div>
    </div>
  );
}

export { Register };
