import { useState } from 'react';

export default function SpecialRequestForm() {
  const [form, setForm] = useState({
    name: '',
    message: '',
    phoneNumber: '',
  });
  const [image, setImage] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }
  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('message', form.message);
    formData.append('phoneNumber', form.phoneNumber);
    if (image) {
      formData.append('imageSrc', image);
    }

    // Log the FormData
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch('http://localhost:5050/specialRequests', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitSuccess(true);
      console.log('Special request sent:', await response.json());
    } catch (error) {
      console.error('A problem occurred while sending the request: ', error);
    } finally {
      setForm({ name: '', message: '', phoneNumber: '' });
      setImage(null);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold p-4 text-center">
          Special Request Form
        </h3>
        <form
          onSubmit={onSubmit}
          className="border rounded-lg shadow-lg overflow-hidden p-6 bg-white"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 mx-auto">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 mx-auto">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your Phone Number"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      updateForm({ phoneNumber: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    name="message"
                    id="message"
                    className="block flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your Message or Special Request"
                    value={form.message}
                    onChange={(e) => updateForm({ message: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Upload Image (optional)
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md py-2 px-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="submit"
              value="Send Request"
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium text-white bg-custom-green hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md h-10 px-4 transition duration-200"
            />
          </div>
          {submitSuccess && (
            <p className="mt-2 text-green-600 text-center">
              Your special request has been submitted!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
