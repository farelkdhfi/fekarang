import React, { useState } from 'react';
import Logo from '../assets/LogoKabupatenTasikmalaya.png';
import judul from '../assets/judul.png';
import { TbMenu2, TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className="px-6 lg:px-20 py-6 fixed top-0 w-full z-50 bg-white shadow-sm">
            <div className="flex justify-between items-center">
                {/* Logo dan Judul */}
                <div className="flex justify-center items-center gap-3">
                    <img
                        src={Logo}
                        alt="Logo Kabupaten Tasikmalaya"
                        className="w-8 h-8"
                    />
                    <img
                        src={judul}
                        alt="Desa Cibuniasih Tasikmalaya"
                        className="h-9"
                    />
                  
                </div>

                {/* Tombol Menu (Mobile) */}
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    className="md:hidden text-blue-700 text-3xl focus:outline-none"
                >
                    {isMenuOpen ? <TbX /> : <TbMenu2 />}
                </button>

                {/* Menu untuk Desktop */}
                <ul className="hidden md:flex gap-8 text-blue-700 text-base font-semibold">
                    <li>
                        <Link to="/" className="hover:text-blue-950 transition-colors">
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link to="/tentang" className="hover:text-blue-950 transition-colors">
                            Profil
                        </Link>
                    </li>
                    <li>
                        <Link to="/layanan" className="hover:text-blue-950 transition-colors">
                            Layanan
                        </Link>
                    </li>
                    <li>
                        <Link to="/potensi" className="hover:text-blue-950 transition-colors">
                            Potensi
                        </Link>
                    </li>
                    <li>
                        <Link to="/semua-berita" className="hover:text-blue-950 transition-colors">
                            Berita
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Menu untuk Mobile */}
            {isMenuOpen && (
                <ul className="md:hidden flex flex-col gap-4 mt-4 bg-white text-blue-700 w-full p-6 rounded-lg shadow-md transition-transform transform">
                    <li>
                        <Link to="/" className="hover:text-blue-950 transition-colors">
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link to="/layanan" className="hover:text-blue-950 transition-colors">
                            Layanan
                        </Link>
                    </li>
                    <li>
                        <Link to="/tentang" className="hover:text-blue-950 transition-colors">
                            Profil
                        </Link>
                    </li>
                    <li>
                        <Link to="/potensi" className="hover:text-blue-950 transition-colors">
                            Potensi
                        </Link>
                    </li>
                    <li>
                        <Link to="/semua-berita" className="hover:text-blue-950 transition-colors">
                            Berita
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
