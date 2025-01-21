import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


// gambar
import admns from '../../assets/2.png';
import health from '../../assets/3.png';
import parwst from '../../assets/4.png';
import umkm from '../../assets/5.png';
import Logo from '../../assets/landing.png';
import cibuni1 from '../../assets/kebun.jpeg';
import cibuni2 from '../../assets/tambang.jpeg';
import cibuni3 from '../../assets/bukit.png';
import cibuni4 from '../../assets/cibuni4.jpg';

import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBook, FaArrowDown } from 'react-icons/fa';
import PendudukUser from '../user/PendudukUser';
import ApbDesaUser from '../user/ApbDesaUser';
import BeritaUser from '../user/BeritaUser';
import ProductUser from '../user/ProductUser';
import customApi from '../../api';
import Navbar from '../../components/Navbar';

const HomePage = () => {
  const [websites, setWebsites] = useState([]);


  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await customApi.get("/websites");
        setWebsites(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWebsites();
  }, []);


  const [count, setCount] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const target = 100;
    const duration = 2000;
    const incrementTime = 10;
    const step = target / (duration / incrementTime);

    const interval = setInterval(() => {
      setCount((prev) => {
        const nextValue = Math.min(prev + step, target);
        if (nextValue === target) {
          clearInterval(interval);
          setTimeout(() => setShowGreeting(true), 500);
          setTimeout(() => setShowElements(true), 3000);
        }
        return nextValue;
      });
    }, incrementTime);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { image: admns, text: "Administrasi", route: "/layanan" },
    { image: health, text: "Kesehatan", route: "/layanan" },
    { image: parwst, text: "Potensi", route: "/potensi" },
    { image: umkm, text: "UMKM", route: "/umkm" },
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true, // Animasi hanya berjalan sekali
    threshold: 0.5, // 50% konten terlihat
  });
  return (
    <section>
      <Navbar />
      <div id='beranda' className=" bg-white">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-8 min-h-screen px-4">
          {showElements ? (
            <>
              {/* Image Section */}
              <motion.div
                className="lg:hidden flex justify-center lg:mt-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              >
                <img
                  src={Logo}
                  alt="Logo Desa Karanglayung"
                  className="w-64 sm:w-80 lg:w-96"
                />
              </motion.div>
              {/* Text Section */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.h1
                  className="text-3xl lg:text-6xl font-bold"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                >
                  Portal Layanan
                </motion.h1>
                <motion.h1
                  className="text-blue-700 font-bold text-3xl lg:text-6xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                >
                  Desa Karanglayung
                </motion.h1>
                <motion.h3
                  className="text-lg lg:text-xl mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                >
                  Kec. Karangjaya Kab. Tasikmalaya
                </motion.h3>
                <motion.div
                  className="flex justify-center items-center lg:justify-start flex-row gap-3 text-sm lg:text-lg mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                >
                  <Link
                    to="/login"
                    className="bg-blue-700 p-2 px-4 rounded-full text-white font-semibold text-center"
                  >
                    Login
                  </Link>
                  <a
                    href="tel:+6285317388074"
                    className="bg-white border border-gray-300 p-2 px-4 rounded-full text-blue-700 font-semibold text-center"
                  >
                    Call center
                  </a>
                </motion.div>
                <motion.div
                  className="animate-pulse flex flex-col gap-3 mt-8 justify-center items-center lg:hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                >
                  <h3 className="text-sm font-semibold text-blue-700">Scroll Kebawah</h3>
                  <FaArrowDown className="text-blue-700" />
                </motion.div>
              </motion.div>

              {/* Image Section */}
              <motion.div
                className="lg:flex hidden justify-center mt-5 lg:mt-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              >
                <img
                  src={Logo}
                  alt="Logo Desa Karanglayung"
                  className="w-64 sm:w-80 lg:w-96"
                />
              </motion.div>
            </>
          ) : showGreeting ? (
            <motion.div
              className="text-center text-blue-700 font-bold text-sm lg:text-4xl w-full max-w-3xl uppercase"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Selamat datang di website resmi Desa Karanglayung
            </motion.div>
          ) : (
            <motion.div
              className="text-blue-700 font-bold text-sm lg:text-5xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {count.toFixed(1)}%
            </motion.div>
          )}
        </div>

        {/* Introduction Section */}
        <div
          id="layanan"
          ref={sectionRef}
          className="px-6 py-10 lg:py-20 lg:px-20 flex flex-col lg:flex-row items-center gap-10"
        >
          {/* Text Section */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-sm font-light text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              Telah Hadir,
            </motion.p>
            <motion.h2
              className="text-xl lg:text-3xl font-bold text-blue-700 mt-4 font-montserrat"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              Ayo, Jelajahi Desa Kami!
            </motion.h2>
            <motion.p
              className="text-sm lg:text-base text-gray-700 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              Melalui website ini, Anda dapat mengeksplorasi berbagai informasi
              seputar Desa, mulai dari aspek pemerintahan, data penduduk, profil
              demografi, potensi lokal, hingga berita terbaru yang berkaitan dengan
              Desa.
            </motion.p>
            <motion.div
              className="flex justify-center items-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <div className="hidden mt-6 text-blue-700 font-medium rounded-lg hover:scale-105 transition-all lg:flex items-center gap-2 animate-pulse">
                Klik menu di sebelah <FaArrowRight />
              </div>
            </motion.div>
            <motion.div
              className="flex justify-center items-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            >
              <div className="lg:hidden mt-6 text-blue-700 font-medium rounded-lg hover:scale-105 transition-all flex items-center gap-2 animate-pulse">
                Klik menu dibawah <FaArrowDown />
              </div>
            </motion.div>
          </motion.div>

          {/* Categories Section */}
          <motion.div
            className="lg:w-1/2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  sectionInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <Link
                  to={category.route}
                  className="p-4 rounded-lg flex flex-col items-center shadow-xl text-white hover:scale-105 transition-all"
                >
                  <img
                    src={category.image}
                    alt={category.text}
                    className="w-28 h-28 lg:w-32 lg:h-32 mb-4"
                  />
                  <h3 className="text-sm lg:text-lg font-semibold text-black">
                    {category.text}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>


        {websites.map((website) => {
          return (
            <React.Fragment key={website._id}>
              {/* Sambutan Kades */}
              <div className="py-10 lg:py-20 bg-white px-6 lg:px-20">
                <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-9">
                  <div className="w-fit">
                    <img src={website.fotoKepalaDesa} alt="" className="h-56 lg:h-72 p-2 rounded-full bg-white lg:p-5 shadow-xl" />
                  </div>
                  <div className="lg:w-1/2 flex flex-col items-center justify-center lg:flex-none lg:items-start lg:justify-start text-center lg:text-start">
                    <h1 className="lg:text-3xl font-bold text-blue-700 font-montserrat mt-6 text-xl lg:mt-0">Sambutan Kepala Desa</h1>
                    <p className="text-lg font-bold uppercase">{website.namaKepalaDesa}</p>
                    <p className="text-sm lg:text-base">{website.sambutan}</p>
                  </div>
                </div>
              </div>

              {/* Struktur Desa Section */}
              <div className='py-10 lg:py-20 px-6 lg:px-20 text-sm lg:text-base'>
                <div className='flex flex-col justify-center items-center text-center'>
                  <h1 className='lg:text-3xl font-bold text-blue-700 font-montserrat text-xl'>Struktur Organisasi Desa</h1>
                  <p className='mt-2'>Struktur organisasi dan tata kerja Desa Cibuniasih</p>
                </div>
                <div className='grid grid-cols-2 gap-3 lg:gap-0 lg:flex lg:flex-row justify-center items-center mt-10 text-center'>
                  <div className='shadow-xl rounded-b-xl flex-col flex justify-center items-center'>
                    <img src={website.fotoKepalaDesa} alt="" className='lg:h-56 lg:w-56 w-32 aspect-square' />
                    <h3 className='font-semibold mt-2'>Kepala Desa</h3>
                    <h4 className='text-sm text-gray-600 mb-2'>{website.namaKepalaDesa}</h4>
                  </div>
                  <div className='shadow-xl rounded-b-xl flex-col flex justify-center items-center'>
                    <img src={website.fotoSekretarisDesa} alt="" className='lg:h-56 lg:w-56 w-32 aspect-square' />
                    <h3 className='font-semibold mt-2'>Sekretaris Desa</h3>
                    <h4 className='text-sm text-gray-600 mb-2'>{website.namaSekretarisDesa}</h4>
                  </div>
                  <div className='shadow-xl rounded-b-xl flex-col flex justify-center items-center'>
                    <img src={website.fotoKasiPemerintahan} alt="" className='lg:h-56 lg:w-56 aspect-square w-32' />
                    <h3 className='font-semibold mt-2'>Kasi Pemerintahan</h3>
                    <h4 className='text-sm text-gray-600 mb-2'>{website.namaKasiPemerintahan}</h4>
                  </div>
                  <div className='shadow-xl rounded-b-xl flex-col flex justify-center items-center'>
                    <img src={website.fotoKasiKesra} alt="" className='lg:h-56 lg:w-56 aspect-square w-32' />
                    <h3 className='font-semibold mt-2'>Kasi Kesra</h3>
                    <h4 className='text-sm text-gray-600 mb-2'>{website.namaKasiKesra}</h4>
                  </div>
                </div>
                <div className='flex justify-center items-center mt-7'>
                  <Link to="/tentang" className=' flex justify-center items-center space-x-2 px-6 py-3 bg-white text-blue-700 border border-blue-700 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-900'>
                    <p className='font-semibold '>Lihat selengkapnya</p>
                    <FaBook />
                  </Link>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {/* Administrasi Penduduk */}
        <PendudukUser />

        {/* Anggaran Desa */}
        <ApbDesaUser />






        {/* Sejarah Singka Desa */}
        <div id='tentang' className="py-10 lg:py-20">
          <h2 className="text-center text-xl lg:text-3xl font-bold text-blue-700 mb-2 lg:mb-10">Sejarah Singkat Desa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 lg:px-20">
            {[cibuni1, cibuni2, cibuni3, cibuni4].map((image, index) => (
              <img key={index} src={image} alt="Desa" className="w-full h-40 object-cover rounded-lg" />
            ))}
          </div>
          <p className="mt-6 px-6 lg:px-20 text-sm text-gray-700">
            Desa Karanglayung terletak di sebelah Timur Ibu Kota Kabupaten Tasikmalaya, dengan jarak Ibu Kota Kabupaten Tasikmalaya 36 km melalui jalan Kabupaten beraspal, sedangkan jalan ke Ibu Kota Kecamatan Karangjaya 2 km melalui jalan Kabupaten.
            Kemudian jarak ke Dusun yang paling jauh 5 km melalui jalan Desa, sebagian beraspal. Desa Karanglayung merupakan daerah perbukitan dengan ketinggian 297 m dari permukaan air laut dan curah hujan rata-rata 200-300 mm per tahun, dengan batas-batas wilayah sebagai berikut
          </p>
          <div>
            <Link to="/tentang" className='flex items-center justify-center mt-6'>
              <button className="px-6 py-3 bg-white text-blue-700 border border-blue-700 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-900">
                <h3 className='font-semibold'>Lihat Selengkapnya</h3>

              </button>
            </Link>
          </div>
        </div>



        <ProductUser />

        <BeritaUser />

      </div>
      {/* Google Maps Embed */}
      <div className="py-10 lg:py-20 px-6 lg:px-20 flex flex-col justify-center items-center">
        <h3 className="lg:text-3xl text-xl font-bold text-blue-700 mb-1">Lokasi Desa Karanglayung</h3>
        <p className='mb-4'>Peta jalan menuju Desa Karanglayung</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.17477597926!2d108.0736438!3d-7.3667436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65867b2cb19489%3A0x123456789abcdef!2sDesa%20Karanglayung%2C%20Kabupaten%20Tasikmalaya!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid"
          width="100%"
          height="300px"
          style={{ border: 0, borderRadius: 20 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Desa Karanglayung"
        ></iframe>
      </div>
      <div className='lg:px-9'>
        <Footer />

      </div>
    </section>
  );
};

export default HomePage;
