import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customApi from "../../api";

function EditSejarah() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sejarahDesa: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await customApi.get(`sejarahs/${id}`, {
          headers: { "x-auth-token": token },
        });
        setFormData({ sejarahDesa: response.data.sejarahDesa }); // Mengisi form dengan data dari server
      } catch (err) {
        console.error("Error fetching data", err);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await customApi.put(`sejarahs/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      alert("Sejarah Desa updated successfully");
      navigate("/adminpanel"); // Mengarahkan ke halaman daftar sejarah desa setelah update
    } catch (err) {
      console.error("Error updating content", err);
      alert("Error updating content");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Sejarah Desa</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sejarahDesa" className="block text-sm font-medium text-gray-700">
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSejarah;
