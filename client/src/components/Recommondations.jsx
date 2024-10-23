import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecords } from '../context/ProductsContext';
  
  export default function Recommondations() {

    const contextRecords = useRecords(); 
    const [records, setRecords] = useState([]);
  
    
    useEffect(() => {
      if (Array.isArray(contextRecords)) {
        setRecords(contextRecords);
      }
    }, [contextRecords]);
  
    if (records.length === 0) {
      return <div>No Products found.</div>;
    }

    function RandomProducts(arr, num) {
        // Shuffle the array
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      }
    
    const randomProducts = RandomProducts(records, 4); // Get 5 random products

    return (
      <div className="bg-blue-100">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Reccomondations</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {randomProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.imageAlt}
                    src={"./public/assets/"+product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  