import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CalendarIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import customApi from "../../api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [produkTerbaru, setProdukTerbaru] = useState([]);

  // Fetch detail produk berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await customApi.get(`products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch produk terbaru
  useEffect(() => {
    const fetchProdukTerbaru = async () => {
      try {
        const res = await customApi.get("/products");
        setProdukTerbaru(res.data.data.slice(0, 6)); // Ambil 6 produk terbaru
      } catch (err) {
        console.error(err);
      }
    };

    fetchProdukTerbaru();
  }, []);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-center text-gray-600 animate-pulse text-lg">
          Memuat data produk...
        </p>
      </div>
    );

  return (
    <section className="font-sans bg-gray-50 min-h-screen">
      <Navbar />
      <div className="py-16 lg:py-28 px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detail Produk */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-3xl overflow-hidden">
            <img
              src={product.image}
              alt={product.namaProduct}
              className="w-full h-72 lg:h-[450px] object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-8 lg:p-12">
              <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-6">
                {product.namaProduct}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-500 text-sm lg:text-base mb-8">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 text-gray-400" />
                  <p>
                    {new Date(product.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 text-gray-400" />
                  <p>
                    {new Date(product.createdAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} WIB
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-5 text-gray-400" />
                  <p>{product.views || 0} kali dilihat</p>
                </div>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>{product.deskripsiProduct}</p>
                <p className="text-lg font-semibold text-gray-900">
                  Harga: Rp {product.hargaProduct.toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Kontak:</strong> {product.kontak}
                </p>
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>

          {/* Produk Terbaru */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Produk Terbaru
            </h2>
            <div className="space-y-6">
              {produkTerbaru.map((produk) => (
                <div
                  key={produk._id}
                  className="flex items-start gap-4 bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={produk.image}
                    alt={produk.namaProduct}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-blue-700 cursor-pointer hover:underline capitalize"
                      onClick={() => navigate(`/products/${produk._id}`)}
                    >
                      {produk.namaProduct}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {produk.deskripsiProduct}
                    </p>
                    <p className="text-gray-900 font-bold mt-2">
                      Rp {produk.hargaProduct.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-9">
        <Footer />
      </div>
    </section>
  );
}

export default ProductDetails;
