import { Link } from 'react-router-dom';
import './category-card.css';

function CategoryCard({ title, img, path }) {
  return (
    <Link to={path} className="category-card">
      <h3 className="category-card__title">{title}</h3>
      <img src={img} className="category-card__img" />
    </Link>
  );
}

export { CategoryCard };
