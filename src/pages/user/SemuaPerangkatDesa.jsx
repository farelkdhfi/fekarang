import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import customApi from "../../api";

function SemuaPerangkatDesa() {
  const [beritas, setBeritas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBeritas = async (page) => {
    try {
      const res = await customApi.get(`/perangkats?page=${page}&limit=4`);
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
      <div className="py-10 lg:py-20 px-4 sm:px-6 lg:px-20 mt-10 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="flex justify-center items-center">
          <h1 className="text-xl lg:text-3xl font-bold text-blue-700 font-montserrat mb-7 tracking-wide">
            Perangkat Desa
          </h1>
        </div>

        {/* Grid for Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {beritas.map((berita) => (
            <div
              key={berita._id}
              className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl border transition-all duration-300 transform hover:scale-105"
            >
              {/* Image Section */}
              <div className="w-full aspect-square bg-gray-200">
                <img
                  src={berita.image}
                  alt={berita.nama}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-md font-bold text-blue-700 uppercase">
                  {berita.nama}
                </h3>
                <p className="text-gray-600 text-sm">
                  {berita.jabatan}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            <FaArrowLeft />
          </button>
          <span className="text-gray-700 font-medium text-sm sm:text-base">
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

export default SemuaPerangkatDesa;
