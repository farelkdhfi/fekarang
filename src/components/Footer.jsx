import React from 'react';
import { TbBrandFacebook, TbBrandInstagram, TbBrandTwitter } from 'react-icons/tb';
import Logo from '../assets/LogoKabupatenTasikmalaya.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id='kontak' className="bg-blue-950 text-white py-8 lg:rounded-t-[4rem]">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Logo dan Informasi Desa */}
          <div className="text-center lg:text-left">
            <img src={Logo} alt="Logo Kabupaten Tasikmalaya" className="w-24 mx-auto lg:mx-0" />
            <h2 className="text-lg font-bold mt-4">Desa Karanglayung</h2>
            <p className="text-sm text-gray-400">Kec. Karangjaya, Kab. Tasikmalaya</p>
            <p className="text-sm text-gray-400">Email: infokaranglayung@gmail.com</p>
          </div>

          {/* Navigasi */}
          <div className="mt-8 lg:mt-0 text-center">
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/layanan" className="hover:text-white transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-white transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link to="/semua-berita" className="hover:text-white transition-colors">
                  Berita
                </Link>
              </li>
              <li>
                <a href="tel:+6285317388074" className="hover:text-white transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div className="mt-8 lg:mt-0 text-center">
            <h3 className="text-lg font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex justify-center space-x-6 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <TbBrandFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <TbBrandInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <TbBrandTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Desa Karanglayung. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
