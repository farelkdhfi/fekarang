import { useState } from "react";
import PreviewHomePage from "./PreviewHomePage";
import TentangDesaPreview from "./TentangDesaPreview";

const MenuPreview = () => {
  const [activeMenu, setActiveMenu] = useState("halaman1");
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { value: "halaman1", content: <PreviewHomePage /> },
    { value: "halaman2", content: <TentangDesaPreview /> },
  ];

  const currentContent = menus.find((menu) => menu.value === activeMenu)?.content;

  return (
    <div className="bg-white rounded-xl p-5">
      <h1 className="font-bold text-blue-700 text-xl">Hapus Akun</h1>
      <p className="mb-5">Anda bisa menghapus akun yang tidak sesuai</p>

      {/* Dropdown */}
      <div
        className="border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer flex justify-between items-center hover:border-gray-500 w-64"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeMenu}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {menus.map((menu) => (
            <div
              key={menu.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                activeMenu === menu.value ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setActiveMenu(menu.value);
                setIsOpen(false);
              }}
            >
              {menu.value}
            </div>
          ))}
        </div>
      )}

      {/* Konten */}
      <div className="mt-4 rounded-lg shadow">
        <p>{currentContent}</p>
      </div>
    </div>
  );
};

export default MenuPreview;
