import './products.css';
import { ProductCard } from '../../components/product-card/product-card';
import { useEffect, useState } from 'react';

import { fetchProducts } from '../../server';


function Products({ title, gender, cartProducts, setCartProducts }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const promise = fetchProducts();
    promise.then((productsArray) =>
      setProducts(productsArray.filter((product) => product.gender === gender))
    );
  }, []);

  return (
    <div className="products content">
      <div className="container products__container">
        <h1 className="title">{title}</h1>
        <div className="products__block">
          {products.length
            ? products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  price={product.price}
                  img={product.img}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export { Products };
