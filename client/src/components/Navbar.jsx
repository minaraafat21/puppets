import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { assets } from '../../public/assets/assets';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import { useOutletContext } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRecords } from '../context/ProductsContext';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'puppets', href: '/shop', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { setCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const contextProducts = useRecords();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (contextProducts.length > 0) {
      setProducts(contextProducts);
    }
  }, [contextProducts]);
  console.log('Products:', products);

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // dynamic searching
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log('Search Query:', products);

    if (value) {
      // Filter suggestions based on the search query
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()),
      );
      console.log('Filtered Suggestions:', filteredSuggestions);
      setSuggestions(filteredSuggestions);
      setShowDropdown(true); // Show the dropdown when there's input
    } else {
      setShowDropdown(false); // Hide the dropdown if there's no input
    }
  };
  return (
    <Disclosure as="nav" className="bg-custom-green">
      <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className='flex items-center'>
            <div className=" inset-y-0 left-0 flex items-center  ">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-start justify-center rounded-md p-2 text-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>

              <div className="flex items-center justify-center sm:items-stretch sm:justify-start sm:mr-2">
                <img
                  alt=" puppets"
                  src={assets.logo}
                  className="h-auto w-20 "
                />
              </div>
            </div>

            {/* <div className="flex flex-2 items-center justify-center sm:items-stretch sm:justify-start"></div> */}

            <div className="flex flex-2 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white '
                          : 'text-gray-100 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                  {/* categories */}
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ">
                        categories
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-gray-400"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Account settings
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Support
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            License
                          </a>
                        </MenuItem>
                        <form action="#" method="POST">
                          <MenuItem>
                            <button
                              type="submit"
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Sign out
                            </button>
                          </MenuItem>
                        </form>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <div className="inset-y-0 right-0 flex items-center pr-0 sm:inset-auto sm:pr-0">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="block w-full sm:w-80 bg-transparent rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-200  sm:text-sm sm:leading-6"
                placeholder="Search..."
                value={searchQuery} // Controlled input value
                onChange={(e) => handleInputChange(e)} // Pass the event object properly
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>

              {/* Search Suggestions Dropdown */}
              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                  {suggestions.length > 0 ? (
                    suggestions.map((product) => (
                      <div
                        key={product.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
                        onClick={() => {
                          setSearchQuery(product.name);
                          setShowDropdown(false);
                        }}
                      >
                        {product.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </form>

            <button
              type="button"
              className="relative rounded-full p-1 text-white hover:text-white focus:outline-none sm:ml-4"
              onClick={() => setCartOpen(true)}
            >
              {/* cart btn */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-custom-green text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
