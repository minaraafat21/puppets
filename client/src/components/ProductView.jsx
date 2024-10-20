'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Radio, RadioGroup } from '@headlessui/react';
import { useOutletContext } from 'react-router-dom';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import { useRecords } from '../context/ProductsContext';
import { useEffect } from 'react';

const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductView({ id }) {
  const { cartProducts, setCartProducts, cartOpen, setCartOpen } = useCart();
  const contextProducts = useRecords();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (contextProducts.length > 0) {
      setProducts(contextProducts);
    }
  }, [contextProducts]); // Run when contextProducts changes

  const stringId = id.id.replace(':', '');
  const idNumber = parseInt(stringId);

  // console.log('Product view products:', products);

  // Check if the product exists before using it
  const product = products.find((product) => product.id === idNumber);
  // console.log('Product img:', product.images);
  if (!product) {
    return <div>Product not found</div>;
  }

  function addToCart(event, product) {
    event.preventDefault(); // Prevent form submission
    setCartProducts([...cartProducts, product]);
    setCartOpen(true);
  }
  return (
    <div>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {/* First image */}

            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              {product?.images?.[0] && (
                <img
                  alt={product.name}
                  src={'../public/assets/' + product.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>

            {/* Second and third images */}
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                {product?.images?.[1] && (
                  <img
                    alt={'Image 2'}
                    src={'../public/assets/' + product.images[1]}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                {product?.images?.[2] && (
                  <img
                    alt={'Image 3'}
                    src={'../public/assets/' + product.images[2]}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
            </div>

            {/* Fourth image */}
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              {product?.images?.[3] && (
                <img
                  alt={product.images[3].alt || 'Image 4'}
                  src={'../public/assets/' + product.images[3]}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <button
                type="submit"
                onClick={(event) => addToCart(event, product)}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
