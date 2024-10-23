import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RecordForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    id: '',
    imageSrc: '',
    description: '',
    category: '',
  });
  const [file, setFile] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:5050/record/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate('/');
        return;
      }

      const { _id, ...rest } = record;
      setForm({
        ...rest,
        id: _id?.$oid || _id,
      });
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (file) {
      formData.append('imageSrc', file);
    }

    try {
      let response;
      if (isNew) {
        response = await fetch('http://localhost:5050/record', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: 'PATCH',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Record saved:', result);
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({
        name: '',
        price: '',
        id: '',
        imageSrc: '',
        description: '',
        category: '',
      });
      setFile(null);
      navigate('/');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold p-4 text-center">
          Create/Update Product
        </h3>
        <form onSubmit={onSubmit} className="border rounded-lg shadow-lg overflow-hidden p-6 bg-white">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 mx-auto">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 mx-auto">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-slate-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => updateForm({ price: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="imageSrc" className="block text-sm font-medium leading-6 text-slate-900">
                  Image Upload
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md py-2 px-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-slate-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    id="description"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Product Description"
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-slate-900">
                  Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => updateForm({ category: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="submit"
              value="Save Record"
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md h-10 px-4 transition duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
