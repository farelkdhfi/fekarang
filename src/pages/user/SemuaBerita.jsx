import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
      await customApi.get(`beritas/${beritaId}`);
      navigate(`/beritas/${beritaId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="">
      <Navbar />
      <div className="py-10 lg:py-20 px-6 lg:px-20 mt-10">
        <div className="flex justify-center items-center">
          <h1 className="lg:text-3xl text-xl font-bold text-blue-700 font-montserrat my-7">Semua Berita</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
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
                  className="text-base font-semibold text-blue-600 cursor-pointer hover:underline uppercase"
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
      <div className="lg:px-9">
        <Footer />
      </div>
    </section>
  );
}

export default SemuaBerita;
