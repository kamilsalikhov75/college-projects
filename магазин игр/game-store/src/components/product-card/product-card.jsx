import { Link } from 'react-router-dom';
import './product-card.css';
import cartIcon from '../../assets/cart-icon.svg';
import { api } from '../../const';
import { addToCart } from '../../cart';

function ProductCard({ product, cart, setCart }) {
  function addProduct() {
    const updatedCart = addToCart(product._id, cart);
    setCart(updatedCart);
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-card__img-link">
        <img src={`${api}${product.imageUrl}`} className="product-card__img" />
      </Link>
      <Link to="/product" className="product-card__link">
        {product.title}
      </Link>
      <p className="product-card__price">{product.price} ₽</p>
      <button onClick={addProduct} className="button">
        В корзину
        <img src={cartIcon} className="button__img" />
      </button>
    </div>
  );
}

export { ProductCard };
