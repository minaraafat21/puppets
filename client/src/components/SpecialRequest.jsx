import { useState } from "react";

export default function SpecialRequestForm() {
  const [form, setForm] = useState({
    name: "",
    message: "",
    phoneNumber: "", // Add phoneNumber to the form state
  });
  const [image, setImage] = useState(null); // State for the uploaded image
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle image upload
  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Create FormData to send the image along with the other form data
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("message", form.message);
    formData.append("phoneNumber", form.phoneNumber); // Append the phone number
    if (image) {
      formData.append("imageSrc", image); // Append the image file
    }

    try {
      const response = await fetch("http://localhost:5050/special-request", {
        method: "POST",
        body: formData, // Send formData, not JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the request was successful, you can show a success message
      setSubmitSuccess(true);
      console.log("Special request sent:", await response.json());
    } catch (error) {
      console.error("A problem occurred while sending the request: ", error);
    } finally {
      setForm({ name: "", message: "", phoneNumber: "" }); // Reset the form
      setImage(null); // Reset the image
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Special Request Form</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">Request Info</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Please provide your details and any special requests you have.
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">Name</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-slate-900">Phone Number</label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your Phone Number"
                  value={form.phoneNumber}
                  onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-slate-900">Message</label>
              <div className="mt-2">
                <textarea
                  name="message"
                  id="message"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your Message or Special Request"
                  value={form.message}
                  onChange={(e) => updateForm({ message: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-slate-900">Upload Image (optional)</label>
              <div className="mt-2">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  accept="image/*" // Restrict to image files
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Send Request"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
        {submitSuccess && <p className="mt-2 text-green-600">Your special request has been submitted!</p>}
      </form>
    </>
  );
}
