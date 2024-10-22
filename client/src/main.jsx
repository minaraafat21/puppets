import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Record from './components/admin/Record.jsx';
import RecordList from './components/RecordList';
import Hero from './components/Hero';
import './index.css';
import { useParams } from 'react-router';

// ///////////////////
import About from './pages/About.jsx';
import Cart from './components/Cart.jsx';
import Collection from './pages/Collection.jsx';
import Content from './pages/Content.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Product from './pages/Product.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import CheckoutPage from './pages/Checkout.jsx';
import Orders from './components/admin/Orders.jsx';
///////////////////////

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/create',
    element: <App />,
    children: [
      {
        path: '/create',
        element: <Record />,
      },
    ],
  },
  {
    path: '/edit/:id',
    element: <App />,
    children: [
      {
        path: '/edit/:id',
        element: <Record />,
      },
    ],
  },
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop',
        element: <RecordList />,
      },
    ],
  },
  {
    path: '/checkout',
    element: <App />,
    children: [
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
    ],
  },


  {
    path: '/admin/login',
    element: <App />,
    children: [
      {
        path: '/admin/login',
        element: <AdminLogin />,
      },
    ],
  },
  { path: '/admin/orders',
    element: <App />,
    children: [
      {
        path: '/admin/orders',
        element: <Orders />,
      },
    ],

  },
  {
    path: '/product/:productId',
    element: <App />,
    children: [
      {
        path: '/product/:productId',
        element: <ProductWrapper />,
      },
    ],
  },
]);

function ProductWrapper() {
  const { productId } = useParams();
  return <Product id={productId} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
