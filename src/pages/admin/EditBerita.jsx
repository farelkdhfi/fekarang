import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customApi from "../../api";

function EditBerita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judulBerita: "",
    deskripsiBerita: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await customApi.get(`beritas/${id}`);
        setFormData({
          judulBerita: res.data.judulBerita,
          deskripsiBerita: res.data.deskripsiBerita,
          image: null,
        });
        setPreviewImage(res.data.image);
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

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("judulBerita", formData.judulBerita);
    data.append("deskripsiBerita", formData.deskripsiBerita);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const token = localStorage.getItem("token")
    try {
      await customApi.put(`beritas/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token
        },
      });
      alert("Berita updated successfully");
      navigate("/adminpanel");
    } catch (err) {
      console.error(err);
      alert("Error updating berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="flex flex-col items-center">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-black mt-4 text-lg font-medium">Mengunggah...</p>
          </div>
        </div>
      )}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Berita</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
            <input
              type="text"
              name="judulBerita"
              value={formData.judulBerita}
              onChange={handleChange}
              placeholder="Masukkan judul berita"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Berita</label>
            <textarea
              name="deskripsiBerita"
              value={formData.deskripsiBerita}
              onChange={handleChange}
              placeholder="Masukkan deskripsi berita"
              rows="4"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gambar Berita</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>
          <button
            disabled={loading}
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

export default EditBerita;
