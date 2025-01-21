import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Mendapatkan lokasi saat ini

  useEffect(() => {
    window.scrollTo(0, 0); // Mengatur scroll ke atas
  }, [pathname]); // Jalankan setiap kali pathname berubah

  return null;
};

export default ScrollToTop;
