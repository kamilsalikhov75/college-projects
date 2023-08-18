import './header.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/index.html" className="header__link">
          <img src={logo} className="header__img" />
        </Link>
        <Link to="/catalog" className="header__link">
          Каталог
        </Link>
        <Link to="/about" className="header__link">
          О нас
        </Link>
        <Link to="/cart" className="header__link">
          Корзина
        </Link>
      </div>
    </header>
  );
}

export { Header };
