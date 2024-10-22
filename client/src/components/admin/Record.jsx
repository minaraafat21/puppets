import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecordForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    id: "",
    imageSrc: "",
    description: "",
    category: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // To store the selected file

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
        navigate("/");
        return;
      }

      const { _id, ...rest } = record;
      setForm({
        ...rest,
        id: _id?.$oid || _id,
      });
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onImageUpload(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  async function uploadImage() {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5050/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    return data.imagePath; // Assuming the server responds with the image path
  }

  async function onSubmit(e) {
    e.preventDefault();
    const record = { ...form };
    delete record.id;

    try {
      let imagePath;

      // Upload image and get the path
      if (file) {
        imagePath = await uploadImage();
        record.imageSrc = imagePath; // Set the image path to the record
      }

      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });
      } else {
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    } finally {
      setForm({ name: "", price: "", id: "", imageSrc: "", description: "", category: "" });
      setFile(null); // Clear the file input
      navigate("/");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Record</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">Record Info</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly, so be careful what you share.
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            {/* Other input fields remain unchanged */}
            <div className="sm:col-span-4">
              <label htmlFor="imageSrc" className="block text-sm font-medium leading-6 text-slate-900">
                Upload Image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Other input fields remain unchanged */}
          </div>
        </div>
        <input
          type="submit"
          value="Save Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
