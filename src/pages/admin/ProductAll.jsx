import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FaPlusCircle } from "react-icons/fa";
import customApi from "../../api";

function ProductAll() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await customApi.get("/products");
                setProducts(res.data.data); // Gunakan res.data.data untuk mendapatkan array product
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = async (productId) => {
        try {
            // Panggil endpoint untuk mendapatkan product (dan memperbarui views)
            await customApi.get(`products/${productId}`);
            navigate(`/products/${productId}`); // Navigasi ke detail product
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (productId) => {
        navigate(`/products/${productId}/edit`);
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
        const token = localStorage.getItem("token");

        if (confirmDelete) {
            try {
                await customApi.delete(`products/${productId}`, {
                    headers: {
                        "X-Auth-Token": token,
                    },
                });
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleLihatSemuaProduct = () => {
        navigate("/semua-produk");
    };

    return (
        <div className="bg-white p-5 rounded-xl">
            <h1 className="text-blue-700 font-bold text-xl">UMKM Desa</h1>
            <p className="mb-5">Anda bisa mengedit, menghapus, dan menambah UMKM yang ada di desa.</p>
            <div className="h-[1px] bg-gray-200 mb-5"></div>
            <Link to="/uploadproduct" className="flex  items-center pb-5 gap-3 text-xl font-bold">
                <h1 className="text-blue-700">Tambah Produk</h1>
                <FaPlusCircle className="text-blue-700" />
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl border transition-shadow duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.namaProduct}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3
                                className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline uppercase"
                                onClick={() => handleProductClick(product._id)}
                            >
                                {product.namaProduct}
                            </h3>
                            <p className="text-gray-700 mt-2 mb-4 line-clamp-3 text-sm">{product.deskripsiproduct}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CalendarIcon className="w-4" />
                                <p>
                                    {new Date(product.createdAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <ClockIcon className="w-4" />
                                <p>
                                    {new Date(product.createdAt).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })} WIB
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                <EyeIcon className="w-4" />
                                <p>{product.views || 0} kali dilihat</p>
                            </div>
                            {/* Tombol Edit dan Delete */}
                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    onClick={() => handleEdit(product._id)}
                                    className="px-4 py-2 bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] text-white rounded-lg hover:bg-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tombol Lihat Semua product */}
            {products.length > 5 && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleLihatSemuaProduct}
                        className="px-6 py-3 bg-white text-blue-700 border border-blue-700 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-900"
                    >
                        Lihat Semua product
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductAll;
