import { useState } from "react";
import customApi from "../../api";

function UploadSejarah() {
  const [formData, setFormData] = useState({
    sejarahDesa: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      sejarahDesa: formData.sejarahDesa,
    };
    const token = localStorage.getItem("token");
    try {
      await customApi.post("sejarahs/add", data, {
        headers: { 
            "Content-Type": "application/json",
            "x-auth-token": token, 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        sejarahDesa: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error uploading content");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Sejarah Desa</h1>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div>
              <label htmlFor="misi" className="block text-sm font-medium text-gray-700">
                Sejarah Desa
              </label>
              <input
                type="text"
                id="sejarahDesa"
                name="sejarahDesa"
                value={formData.sejarahDesa}
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

export default UploadSejarah;
