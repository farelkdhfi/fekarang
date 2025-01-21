import { useState } from "react";
import customApi from "../../api";

function UploadVisimisi() {
  const [formData, setFormData] = useState({
    visi: "",
    misi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      visi: formData.visi,
      misi: formData.misi,
    };

    const token = localStorage.getItem("token")
    try {
      await customApi.post("visimisis/add", data, {
        headers: { 
          "Content-Type": "application/json",
          "x-auth-token": token 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        visi: "",
        misi: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error uploading content");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Visi Misi Desa</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="visi" className="block text-sm font-medium text-gray-700">
                Visi Desa
              </label>
              <input
                type="text"
                id="visi"
                name="visi"
                value={formData.visi}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="misi" className="block text-sm font-medium text-gray-700">
                Misi Desa
              </label>
              <input
                type="text"
                id="misi"
                name="misi"
                value={formData.misi}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVisimisi;
