import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5050/orders'); // Adjust the URL to your API endpoint
        setOrders(response.data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
    <h1 className="text-2xl font-semibold text-gray-900 sm:mx-32 mt-8">Orders</h1> 
    <ul role="list" className="divide-y divide-gray-100">
      {orders.map((order) => (
        <li key={order._id} className="flex justify-around  gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {order.products.map((product) => (
              <div key={product._id} className="flex min-w-0 gap-x-4 items-center">
                <img
                  alt={product.name}
                  src={"../public/assets/"+product.imageSrc}
                  className="h-auto w-28 flex-none rounded bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">Price: EGP{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              Customer: {order.customerDetails ? `${order.customerDetails.firstName} ${order.customerDetails.lastName}` : 'Unknown Customer'}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">Total Amount: EGP{order.totalAmount}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Date: <time dateTime={order.date}>{new Date(order.date).toLocaleString()}</time>
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
                Order ID: {order._id}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
                address: {order.customerDetails ? order.customerDetails.address : 'Unknown address'}
            </p>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Orders;
