import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from 'react'; 
import Cart from "./components/Cart";

const App = () => {

  const [cartProducts, setCartProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);


  return (
    <div>
      <Navbar Open={cartOpen} setOpen={setCartOpen} />
      <Outlet context={{ cartProducts, setCartProducts, cartOpen , setCartOpen}}/>
    </div>
  );
};
export default App;
