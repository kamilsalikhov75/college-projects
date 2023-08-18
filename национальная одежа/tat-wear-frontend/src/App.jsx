import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { About } from './pages/about/about';
import { Cart } from './pages/cart/cart';
import { Catalog } from './pages/catalog/catalog';
import { Checkout } from './pages/checkout/checkout';
import { Product } from './pages/product/product';
import { Products } from './pages/products/products';
import { getCartProducts, saveCartProducts } from './storage';
function App() {
  const [cartProducts, setCartProducts] = useState(getCartProducts());

  useEffect(() => {
    saveCartProducts(cartProducts);
  }, [cartProducts]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/index.html"
          element={<Catalog title="Продажа татарской национальной одежды" />}
        />
        <Route path="/catalog" element={<Catalog title="Каталог одежды" />} />
        <Route
          path="/male"
          element={
            <Products
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              title="Мужская одежда"
              gender="male"
            />
          }
        />
        <Route
          path="/female"
          element={
            <Products
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              title="Женская одежда"
              gender="female"
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <Product
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
