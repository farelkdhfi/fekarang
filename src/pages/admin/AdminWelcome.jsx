import React, { useState } from 'react';

const pages = [
  {
    title: "Selamat Datang di Halaman Admin",
    content: "Buku ini akan membantu Anda memahami cara menggunakan website admin kami secara efektif.",
  },
  {
    title: "Langkah 1: Login",
    content: "Masuk ke halaman admin dengan menggunakan email dan kata sandi yang telah diberikan. Pastikan informasi login Anda aman.",
  },
  {
    title: "Langkah 2: Navigasi Dashboard",
    content: "Setelah login, Anda akan diarahkan ke dashboard utama. Di sini Anda dapat mengelola data dan fitur website.",
  },
  {
    title: "Langkah 3: Pengelolaan Data",
    content: "Gunakan menu navigasi untuk mengakses fitur seperti menambah, mengedit, atau menghapus data sesuai kebutuhan.",
  },
  {
    title: "Terima Kasih",
    content: "Semoga panduan ini membantu Anda dalam mengelola website. Jangan ragu untuk menghubungi tim kami jika membutuhkan bantuan lebih lanjut.",
  },
];

const AdminWelcome = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {pages[currentPage].title}
          </h2>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            {pages[currentPage].content}
          </p>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
              currentPage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
            }`}
          >
            Sebelumnya
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
              currentPage === pages.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
