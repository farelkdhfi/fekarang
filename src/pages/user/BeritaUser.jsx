import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import customApi from "../../api";

function BeritaUser() {
  const [beritas, setBeritas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeritas = async () => {
      try {
        const res = await customApi.get("/beritas");
        setBeritas(res.data.data); // Gunakan res.data.data untuk mendapatkan array berita
      } catch (err) {
        console.error(err);
      }
    };

    fetchBeritas();
  }, []);

  const handleBeritaClick = async (beritaId) => {
    try {
      // Panggil endpoint untuk mendapatkan berita (dan memperbarui views)
      await customApi.get(`beritas/${beritaId}`);
      navigate(`/beritas/${beritaId}`); // Navigasi ke detail berita
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleLihatSemuaBerita = () => {
    navigate("/semua-berita");
  };

  return (
    <div className="py-10 lg:py-20 px-6 lg:px-20">
      <div className="flex justify-center items-center">
        <h1 className="lg:text-3xl text-xl font-bold text-blue-700 font-montserrat mb-7">Berita Desa</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritas.slice(0, 6).map((berita) => (
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
                className="text-lg lg:text-xl font-semibold text-blue-600 cursor-pointer hover:underline uppercase"
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

      {/* Tombol Lihat Semua Berita */}
      {beritas.length > 5 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLihatSemuaBerita}
            className="px-6 py-3 bg-white text-blue-700 border border-blue-700 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-900"
          >
            Lihat Semua Berita
          </button>
        </div>
      )}
    </div>
  );
}

export default BeritaUser;
