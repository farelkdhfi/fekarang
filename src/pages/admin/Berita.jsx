import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPlusCircle } from "react-icons/fa";
import customApi from "../../api";

function SemuaBerita() {
  const [beritas, setBeritas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchBeritas = async (page) => {
    try {
      const res = await customApi.get(`/beritas?page=${page}&limit=6`);
      setBeritas(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBeritas(currentPage);
  }, [currentPage]);

  const handleBeritaClick = async (beritaId) => {
    try {
      navigate(`/beritas/${beritaId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (beritaId) => {
    navigate(`/beritas/${beritaId}/edit`);
  };

  const handleDelete = async (beritaId) => {
    const token = localStorage.getItem("token");

    try {
      await customApi.delete(`beritas/${beritaId}`, {
        headers: {
          "X-Auth-Token": token,
        },
      });
      // Refresh list after deletion
      fetchBeritas(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="text-sm lg:text-base bg-white p-5 rounded-xl">
      <h1 className="text-blue-700 font-bold text-xl">Berita Desa</h1>
      <p className="mb-5">Anda bisa mengedit, menghapus, dan menambah berita seputar desa.</p>
      <div className="h-[1px] bg-gray-200 mb-5"></div>
      <Link to="/uploadberita" className="flex  items-center pb-5 gap-3 text-xl font-bold">
        <h1 className="text-blue-700">Tambah Berita</h1>
        <FaPlusCircle className="text-blue-700" />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 self-start ">
        {beritas.map((berita) => (
          <div
            key={berita._id}
            className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl border transition-shadow duration-300"
          >
            <img
              src={berita.image}
              alt={berita.judulBerita}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3
                className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline uppercase"
                onClick={() => handleBeritaClick(berita._id)}
              >
                {berita.judulBerita}
              </h3>
              <p className="text-gray-700 mt-2 mb-4 line-clamp-3 text-sm">{berita.deskripsiBerita}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon className="w-4" />
                <p>
                  {new Date(berita.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <ClockIcon className="w-4" />
                <p>
                  {new Date(berita.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} WIB
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <EyeIcon className="w-4" />
                <p>{berita.views || 0} kali dilihat</p>
              </div>
              {/* Edit & Delete Buttons */}
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleEdit(berita._id)}
                  className="px-4 py-2 bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(berita._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
    </section>
  );
}

export default SemuaBerita;
