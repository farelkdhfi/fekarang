import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CalendarIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import customApi from "../../api";

function BeritaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [beritaTerbaru, setBeritaTerbaru] = useState([]); // State untuk berita terbaru

  // Fetch berita detail
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await customApi.get(`beritas/${id}`);
        setBerita(res.data);
      } catch (err) {
        console.error("Error fetching berita detail:", err);
      }
    };

    fetchBerita();
  }, [id]);

  // Fetch berita terbaru
  useEffect(() => {
    const fetchBeritaTerbaru = async () => {
      try {
        const res = await customApi.get("beritas?limit=5");
        setBeritaTerbaru(res.data.data || []); // Gunakan default array jika data tidak tersedia
      } catch (err) {
        console.error("Error fetching berita terbaru:", err);
      }
    };

    fetchBeritaTerbaru();
  }, []);

  // Handle navigasi ke detail berita lain
  const handleBeritaClick = (beritaId) => {
    navigate(`/beritas/${beritaId}`);
  };

  if (!berita) return <p className="text-center py-20 text-gray-600">Loading...</p>;

  return (
    <section className="text-sm lg:text-base">
      <Navbar />
      <div className="py-16 lg:py-28 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Detail Berita */}
          <div className="flex-1">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
              <img
                src={berita.image}
                alt={berita.judulBerita}
                className="w-full h-72 lg:h-96 object-cover"
              />
              <div className="p-6 lg:p-10">
                <h1 className="text-lg lg:text-3xl font-bold text-blue-700 mb-6 uppercase">
                  {berita.judulBerita}
                </h1>
                <div className="flex flex-col lg:flex-row gap-4 text-gray-600 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5" />
                    <p>
                      {new Date(berita.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5" />
                    <p>
                      {new Date(berita.createdAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} WIB
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <EyeIcon className="w-5" />
                    <p>{berita.views || 0} kali dilihat</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{berita.deskripsiBerita}</p>
                <button
                  onClick={() => navigate(-1)}
                  className="mt-10 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>

          {/* Berita Terbaru */}
          <aside className="w-full lg:w-1/3">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Berita Terbaru</h2>
            <div className="space-y-6">
              {beritaTerbaru.length > 0 ? (
                beritaTerbaru.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-md rounded-lg overflow-hidden flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleBeritaClick(item._id)}
                  >
                    <img
                      src={item.image}
                      alt={item.judulBerita}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-blue-600 line-clamp-2">
                        {item.judulBerita}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Tidak ada berita terbaru saat ini.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default BeritaDetail;
