import { Link } from 'react-router-dom';
import './catalog.css';
import maleCategoryImg from '../../assets/male.jpg';
import femaleCategoryImg from '../../assets/female.jpg';

function Catalog({ title }) {
  return (
    <div className="catalog content">
      <div className="container catalog__container">
        <h1 className="title">{title}</h1>
        <div className="catalog__block">
          <Link to="/female" className="catalog__category">
            <img src={femaleCategoryImg} className="catalog__img" />
            <p className="catalog__category-text">Женская одежда</p>
          </Link>
          <Link to="/male" className="catalog__category">
            <img src={maleCategoryImg} className="catalog__img" />
            <p className="catalog__category-text">Мужская одежда</p>
          </Link>
        </div>
        <div class="map">
          <div class="container">
            <h1 class="title">Наш адрес:</h1>
            <iframe
              className="home__map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A0eb87bb5dc1c6bb91b2db4304cda18b285eb91487da38fcda5826946d42827d9&amp;source=constructor"
              width="100%"
              height="400"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Catalog };
