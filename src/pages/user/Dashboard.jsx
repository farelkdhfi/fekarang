import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import sku from "../../assets/sku.png";
import skdl from "../../assets/skdl.png";
import skdp from "../../assets/skdp.png";
import sktm from "../../assets/sktm.png";
import MyApplications from "./MyApplications";
import Footer from "../../components/Footer";
import customApi from "../../api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState("dashboard");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await customApi.get("auth/dashboard", {
          headers: { "x-auth-token": token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
        logout();
        navigate("/");
      }
    };

    fetchUser();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-950">
            Dashboard Layanan
          </h1>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            {user && (
              <span className="text-sm sm:text-base text-gray-700">
                Halo, {user.name}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigasi Menu */}
      <nav className="bg-gray-100 shadow-sm">
        <div className="container mx-auto flex justify-center space-x-4 p-4 flex-wrap">
          <button
            onClick={() => setMenu("dashboard")}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition ${
              menu === "dashboard"
                ? "bg-blue-700 text-white"
                : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setMenu("other")}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition ${
              menu === "other"
                ? "bg-blue-700 text-white"
                : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            Riwayat Pengajuan
          </button>
        </div>
      </nav>

      {/* Konten */}
      <main className="flex-grow container mx-auto p-4">
        {menu === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
            {[
              { to: "/sku", img: sku, title: "Surat Keterangan Usaha" },
              { to: "/sktm", img: sktm, title: "Surat Keterangan Tidak Mampu" },
              { to: "/skdp", img: skdp, title: "Surat Keterangan Domisili Perorangan" },
              { to: "/skdl", img: skdl, title: "Surat Keterangan Domisili Lembaga" },
            ].map(({ to, img, title }) => (
              <Link to={to} key={to}>
                <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition">
                  <img
                    src={img}
                    alt={title}
                    className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
                  />
                  <h2 className="text-blue-700 font-semibold text-center text-sm sm:text-base">
                    {title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}

        {menu === "other" && <MyApplications />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
