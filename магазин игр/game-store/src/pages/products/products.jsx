import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/product-card/product-card';
import { api, categories } from '../../const';
import { Message } from '../message/message';
import './products.css';

function Products({ cart, setCart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const promise = axios.get(`${api}/products/${category}`);

    promise
      .then((response) => response.data)
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [category]);

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  if (!products.length) {
    return <Message title="Здесь пусто" />;
  }

  return (
    <div className="products">
      <div className="container">
        <h1 className="title">{categories[category]}</h1>
        <div className="products__block">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Products };
