import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div>
        <Navbar />
        <Cart />
        <Outlet />
      </div>
    </CartProvider>
  );
};
export default App;
