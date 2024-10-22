import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductsContext';
import { Footer1 } from './components/Footer';

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <ProductProvider>
        <div>
          <Navbar />
          <Cart />
          <Outlet />
          {/* <Footer1 /> */}
        </div>
      </ProductProvider>
    </CartProvider>
  );
};
export default App;
