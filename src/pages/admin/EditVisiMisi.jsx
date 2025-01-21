import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customApi from "../../api";

function EditVisiMisi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    visi: "",
    misi: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await customApi.get(`visimisis/${id}`);
        setFormData({
          visi: res.data.visi,
          misi: res.data.misi,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")
    try {
      await customApi.put(`visimisis/${id}`, formData, {
        headers: {
          "x-auth-token": token
        }
      });
      alert("Visi misi updated successfully");
      navigate("/adminpanel");
    } catch (err) {
      console.error(err);
      alert("Error updating visi misi");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Visi Misi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Visi Desa</label>
            <input
              type="text"
              name="visi"
              value={formData.visi}
              onChange={handleChange}
              placeholder="Masukkan Visi Desa"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Misi Desa</label>
            <input
              type="text"
              name="misi"
              value={formData.misi}
              onChange={handleChange}
              placeholder="Masukkan Misi Desa"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Berita
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditVisiMisi;
