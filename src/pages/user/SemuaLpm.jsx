import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import customApi from "../../api";

function SemuaLpm() {
  const [beritas, setBeritas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBeritas = async (page) => {
    try {
      const res = await customApi.get(`/lpms?page=${page}&limit=4`);
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

  return (
    <section className="text-sm lg:text-base">
      <div className="py-10 lg:py-20 px-4 sm:px-6 lg:px-20 mt-10">
        <div className="flex justify-center items-center">
          <h1 className="text-xl lg:text-3xl font-bold text-blue-700 font-montserrat mb-10 text-center">
            Lembaga Pemberdayaan Masyarakat (LPM) Desa
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <h3 className="text-sm sm:text-xl font-semibold text-blue-600 uppercase">
                  {berita.nama}
                </h3>
                <p className="text-gray-700 mt-2 mb-4 line-clamp-3 text-sm sm:text-base">
                  {berita.jabatan}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            <FaArrowLeft />
          </button>
          <span className="text-gray-700 text-sm sm:text-base">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default SemuaLpm;
