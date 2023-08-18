import './cart-product.css';
import product from '../../assets/product.jpg';
import minusIcon from '../../assets/minus.svg';
import plusIcon from '../../assets/plus.svg';
import { api } from '../../const';
import { addToCart, minusFromCart } from '../../cart';

function CartProduct({ product, cart, setCart, count }) {
  function addProduct() {
    const updatedCart = addToCart(product._id, cart);
    setCart(updatedCart);
  }

  function minusProduct() {
    const updatedCart = minusFromCart(product._id, cart);
    setCart(updatedCart);
  }

  return (
    <div className="cart-product">
      <img src={`${api}${product.imageUrl}`} className="cart-product__img" />
      <p className="cart-product__text">{product.title}</p>
      <div className="cart-product__block">
        <button onClick={minusProduct} className="cart-product__button">
          <img src={minusIcon} className="cart-product__button-img" />
        </button>
        <p className="cart-product__count">{count}</p>
        <button onClick={addProduct} className="cart-product__button">
          <img src={plusIcon} className="cart-product__button-img" />
        </button>
      </div>
      <p className="cart-product__price">{product.price} ₽</p>
    </div>
  );
}

export { CartProduct };
