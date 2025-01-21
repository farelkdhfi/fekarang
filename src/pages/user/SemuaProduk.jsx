import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import customApi from "../../api";

function SemuaProduk() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await customApi.get("/products");
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <section className="">
        <Navbar />
    <div id="semua-produk" className="py-14 lg:py-24 px-6 lg:px-20 bg-gray-50">
      <div className="text-center">
        <h1 className="lg:text-4xl text-2xl font-bold text-blue-700 font-poppins mb-12">
          Semua Produk UMKM
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.namaProduct}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3
                className="text-lg font-semibold text-blue-700 cursor-pointer hover:underline"
                onClick={() => handleProductClick(product._id)}
              >
                {product.namaProduct}
              </h3>
              <p className="text-gray-600 mt-3 line-clamp-2 text-sm">
                {product.deskripsiProduct}
              </p>
              <p className="text-blue-700 font-medium mt-2">
                Rp.{product.hargaProduct}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <EyeIcon className="w-4 h-4" />
                <p>{product.views || 0} kali dilihat</p>
              </div>
              <button
                onClick={() => handleProductClick(product._id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </section>
  );
}

export default SemuaProduk;
