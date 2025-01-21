import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus, FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import customApi from "../../api";

function AdminPerwakilanDesa() {
  const [beritas, setBeritas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchBeritas = async (page) => {
    try {
      const res = await customApi.get(`/perwakilans?page=${page}&limit=6`);
      setBeritas(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await customApi.delete(`perwakilans/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,

        },
      });
      setBeritas((prevBeritas) => prevBeritas.filter((berita) => berita._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  useEffect(() => {
    fetchBeritas(currentPage);
  }, [currentPage]);

  return (
    <section className="text-sm lg:text-base">
      <div className="py-10 px-6 lg:px-20">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold text-blue-700 font-montserrat mb-10">Badan Perwakilan Desa</h1>
        </div>
        <Link to="/uploadperwakilan" className="flex items-center pb-5 gap-3 text-xl font-bold">
          <h1 className="text-blue-700">Tambah Anggota</h1>
          <FaPlusCircle className="text-blue-700" />
        </Link>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beritas.map((berita) => (
            <div
              key={berita._id}
              className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl border transition-shadow duration-300"
            >
              <div className="w-full aspect-square">
                <img
                  src={berita.image}
                  alt={berita.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-600 uppercase">
                  {berita.nama}
                </h3>
                <p className="text-gray-700 mt-2 mb-4 line-clamp-3 text-sm">{berita.jabatan}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/perwakilans/${berita._id}/edit`)}
                    className="px-4 py-2 bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] text-white rounded-full hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(berita._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-600 text-white rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            <FaArrowLeft />
          </button>
          <span className="text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-600 text-white rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="lg:px-9"></div>
    </section>
  );
}

export default AdminPerwakilanDesa;
