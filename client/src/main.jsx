import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Hero from "./components/Hero"; 
import "./index.css";

// ///////////////////
import About from './pages/About.jsx'
import Cart from './components/Cart.jsx'
import Collection from './pages/Collection.jsx'
import Content from './pages/Content.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Orders from './pages/Orders.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Product from './pages/Product.jsx'
///////////////////////

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path:"/shop",
    element: <App />,
    children: [
      {
        path: "/shop",
        element: <RecordList />,

  }
  ]
  },
  {
    path: '/product/:productId',
    element: <App />,
    children: [
      {
        path: '/product/:productId',
        element: <Product />,  
  }]}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
