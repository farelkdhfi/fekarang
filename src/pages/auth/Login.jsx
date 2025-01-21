import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/LogoKabupatenTasikmalaya.png';
import judul from '../../assets/judul.png';
import { FaArrowCircleLeft  } from "react-icons/fa";
import customApi from "../../api";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await customApi.post("auth/login", {
        email,
        password,
      });
      const { token, role } = res.data;

      login(token, role);

      if (role === "admin") {
        navigate("/adminpanel");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.response?.data || "Login error");
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row justify-center items-center bg-white overflow-hidden w-full max-w-4xl">

        {/* Logo dan Judul */}
        <div className="flex flex-col justify-center items-center w-1/2">
          <img src={logo} alt="Logo Kabupaten" className="lg:w-64 w-24 mb-4" />
          <img src={judul} alt="Judul" className="w-48 lg:w-64" />
        </div>

        {/* Form Login */}
        <div className="w-full lg:w-1/2 p-8 lg:border">
          <div className="hidden lg:flex lg:flex-col justify-center items-center mb-11">
            <h1 className="text-2xl font-bold mb-3">Selamat Datang!</h1>
            <p className="text-center text-sm text-gray-700">Anda harus login terlebih dahulu untuk mengakses fitur layanan</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-2 text-sm">
            <div>

              <input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>

              <input
                id="password"
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200 mt-5"
            >
              Login
            </button>
            <div className="flex items-center py-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-700">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className=" text-center">
              <Link to="/">
                <button className="w-full flex justify-center gap-2 items-center text-blue-600 py-2 rounded-xl font-medium hover:opacity-65 transition duration-200">
                  <FaArrowCircleLeft />
                  Kembali
                </button>
              </Link>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Belum memiliki akun? <Link to="/register" className="text-blue-500 font-medium hover:underline">Daftar</Link>
          </p>
          <p className="mt-6 lg:hidden text-center text-sm text-gray-600">
            Dengan melanjutkan, Anda setuju dengan Ketentuan <strong>Penggunaan</strong> dan <strong>Kebijakan Privasi</strong> Website Desa Karanglayung
          </p>


        </div>

      </div>
    </section>
  );
}

export default Login;
