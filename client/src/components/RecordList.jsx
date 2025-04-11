import { useEffect, useState } from 'react';
import { useRecords } from '../context/ProductsContext';

export default function RecordList() {
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

  return (
    <div className="bg-blue-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">records</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {records.map((record) => (
            <a key={record.id} href={record.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={record.imageAlt}
                  src={'public/assets/' + record.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{record.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {'EGP' + record.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
