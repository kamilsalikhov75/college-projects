import { CategoryCard } from '../../components/category-card/category-card';
import './home.css';
import ps5Img from '../../assets/ps5.png';
import ps4Img from '../../assets/ps4.png';
import tablegameImg from '../../assets/tablegame.jpeg';
import xboxImg from '../../assets/xbox.png';
import switchImg from '../../assets/switch.png';
import comicsImg from '../../assets/comics.png';
import { ProductCard } from '../../components/product-card/product-card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api, categories } from '../../const';
import { Message } from '../message/message';

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const promise = axios.get(`${api}/products/last`);

    promise
      .then((response) => response.data)
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Message title="Загрузка" />;
  }

  return (
    <div className="home">
      <div className="container">
        <div className="home__categories">
          <h1 className="title">Популярные категории</h1>
          <div className="home__categories-block">
            <CategoryCard
              title={categories.ps5}
              path="/products/ps5"
              img={ps5Img}
            />
            <CategoryCard
              title={categories.ps4}
              path="/products/ps4"
              img={ps4Img}
            />
            <CategoryCard
              title={categories.xbox}
              path="/products/xbox"
              img={xboxImg}
            />
            <CategoryCard
              title={categories.switch}
              path="/products/switch"
              img={switchImg}
            />
            <CategoryCard
              title={categories.tablegames}
              path="/products/tablegames"
              img={tablegameImg}
            />
            <CategoryCard
              title={categories.comics}
              path="/products/comics"
              img={comicsImg}
            />
          </div>
        </div>
        <div className="home__products">
          <h1 className="title">Новинки</h1>
          <div className="home__products-block">
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
    </div>
  );
}

export { Home };
