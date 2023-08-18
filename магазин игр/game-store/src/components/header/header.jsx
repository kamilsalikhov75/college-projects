import './header.css';
import logo from '../../assets/logo.svg';
import userIcon from '../../assets/user-icon.svg';
import cartIcon from '../../assets/cart-icon.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <Link to="/index.html" className="logo__link">
            <img src={logo} className="logo__img" />
          </Link>
          <div className="header__top-block">
            <Link to="/user" className="header__top-link">
              Личный кабинет
              <div className="header__top-img-block">
                <img src={userIcon} className="header__top-img" />
              </div>
            </Link>
            <Link to="/cart" className="header__top-link">
              Корзина
              <div className="header__top-img-block">
                <img src={cartIcon} className="header__top-img" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="container">
          <nav className="header__navigation">
            <Link to="/products/ps5" className="header__navigation-link">
              PS5
            </Link>
            <Link to="/products/ps4" className="header__navigation-link">
              PS4
            </Link>
            <Link to="/products/xbox" className="header__navigation-link">
              XBOX
            </Link>
            <Link to="/products/switch" className="header__navigation-link">
              SWITCH
            </Link>
            <Link to="/products/pc" className="header__navigation-link">
              PC
            </Link>
            <Link to="/products/tablegames" className="header__navigation-link">
              Настольные игры
            </Link>
            <Link to="/products/comics" className="header__navigation-link">
              Комиксы
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
