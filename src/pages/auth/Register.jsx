import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../assets/LogoKabupatenTasikmalaya.png';
import judul from '../../assets/judul.png';
import customApi from "../../api";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customApi.post("auth/register", formData);
      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || "Registration error");
      alert(err.response?.data?.message || "Registration error");
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

        {/* Form Register */}
        <div className="w-full lg:w-1/2 p-8 lg:border">
          <div className="hidden lg:flex lg:flex-col justify-center items-center mb-11">
            <h1 className="text-2xl font-bold mb-3 text-blue-700">Daftar untuk Membuat Akun</h1>
            <p className="text-center text-sm text-gray-700">Isi data diri Anda dengan lengkap untuk mendaftar.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-2 text-sm">
            <div>
              <input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password Anda"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200"
            >
              Daftar
            </button>
            <div className="flex items-center py-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-700">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className=" text-center">
              <Link to="/">
                <button className="w-full flex justify-center gap-2 items-center text-blue-600 py-2 rounded-xl font-medium hover:opacity-65 transition duration-200">
                  <FaArrowAltCircleLeft />
                  Kembali
                </button>
              </Link>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Sudah memiliki akun? <Link to="/login" className="text-blue-500 font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
