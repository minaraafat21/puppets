import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSpecialRequests = () => {
  const [specialRequests, setSpecialRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5050/specialRequests'); // Adjust the URL to your API endpoint
        setSpecialRequests(response.data);
      } catch (err) {
        setError('Error fetching special requests');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialRequests();
  }, []);

  if (loading) return <p>Loading special requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 sm:mx-32 mt-8">Special Requests</h1> 
      <ul role="list" className="divide-y divide-gray-100">
        {specialRequests.map((request) => (
          <li key={request._id} className="flex justify-around gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {request.imageSrc && (
                <div className="flex min-w-0 gap-x-4 items-center">
                  <img
                    alt={request.name}
                    src={"../public/assets/" + request.imageSrc} // Ensure this path is correct
                    className="h-auto w-28 flex-none rounded bg-gray-50"
                  />
                </div>
              )}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{request.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Message: {request.message}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Phone Number: {request.phoneNumber ? request.phoneNumber : 'Unknown'}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Date: <time dateTime={request.date}>{new Date(request.date).toLocaleString()}</time>
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Request ID: {request._id}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSpecialRequests;
