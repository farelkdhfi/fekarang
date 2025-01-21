import { useState } from "react";
import customApi from "../../api";
import { useNavigate } from "react-router-dom";

function UploadProduct() {
  const [formData, setFormData] = useState({
    namaProduct: "",
    deskripsiProduct: "",
    hargaProduct: "",
    kontak: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("namaProduct", formData.namaProduct);
    data.append("deskripsiProduct", formData.deskripsiProduct);
    data.append("hargaProduct", formData.hargaProduct);
    data.append("kontak", formData.kontak);
    if (formData.image) data.append("image", formData.image);

    const token = localStorage.getItem("token");

    try {
      await customApi.post("products/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      });
      alert("Product uploaded successfully");
      navigate("/adminpanel")
      setFormData({
        namaProduct: "",
        deskripsiProduct: "",
        hargaProduct: "",
        kontak: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      {loading && (
         <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
         <div className="flex flex-col items-center">
           {/* Spinner */}
           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-black mt-4 text-lg font-medium">Mengunggah...</p>
         </div>
       </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Upload Produk Desa</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="namaProduct">
              Nama Produk
            </label>
            <textarea
              id="namaProduct"
              name="namaProduct"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.namaProduct}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="deskripsiProduct">
              Deskripsi Produk
            </label>
            <textarea
              id="deskripsiProduct"
              name="deskripsiProduct"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              value={formData.deskripsiProduct}
              onChange={handleChange}
              placeholder="Masukkan deskripsi produk"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="hargaProduct">
              Harga Produk
            </label>
            <textarea
              id="hargaProduct"
              name="hargaProduct"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.hargaProduct}
              onChange={handleChange}
              placeholder="Masukkan harga produk"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="kontak">
              Kontak Pemilik
            </label>
            <textarea
              id="kontak"
              name="kontak"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.kontak}
              onChange={handleChange}
              placeholder="085xxxx"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload Foto</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Pratinjau Gambar:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg font-medium hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              Upload Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadProduct;
