import React from 'react';
import Checkout from '../components/Checkout';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
const CheckoutPage = () => {
  const { cartProducts, setCartProducts, cartOpen, setCartOpen } = useCart();
  function calculate_total(cartProducts) {
    let total = 0;
    cartProducts.forEach((product) => {
      // convert product price to int
      let price = parseInt(product.price);
      // console.log('Product price:', price);
      total += price;
    });
    return total + 50;
  }

  return (
    <div>
      <div className="mt-8 mx-6 sm:mx-72">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-12">
          order summary
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartProducts.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.name}
                    src={'../public/assets/' + product.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="ml-4">{product.price + ' EGP'}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">{/*  */}</p>
                  </div>
                </div>
              </li>
            ))}
            <div className="flex justify-between text-base align-middle  font-medium text-gray-700 sm:mx-6">
              <p>Shipping</p>
              <p>50 EGP</p>
            </div>
          </ul>
        </div>
        {/* add shipping and taxes */}

        <div className="border-t border-gray-200 px-4 py-12 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>total</p>
            <p>{calculate_total(cartProducts) + ' EGP'}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            taxed and shipping are included.
          </p>
        </div>
      </div>
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
