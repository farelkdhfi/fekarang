import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import HomePageEdit from './HomePageEdit';
import ControlUser from './ControlUser';
import Masingmasing from './Masingmasing';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MenuPreview from './MenuPreview';
import ProductAll from './ProductAll';
import Berita from './Berita';
import AdminWelcome from './AdminWelcome';
import Pengaturan from './Pengaturan';
import customApi from '../../api';

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const setUser = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await customApi.get("auth/adminpanel", {
          headers: { "x-auth-token": token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
        logout(); // Logout otomatis jika terjadi error
        navigate("/protect"); // Arahkan kembali ke halaman login
      }
    };

    fetchUser();
  }, [logout, navigate]);

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <AdminWelcome />;
      case 'Edit':
        return <HomePageEdit />;
      case 'Pengguna':
        return <ControlUser />;
      case 'Surat':
        return <Masingmasing />;
      case 'Preview':
        return <MenuPreview />;
      case 'Berita':
        return <Berita />;
      case 'UMKM':
        return <ProductAll />;
      case 'Pengaturan':
        return <Pengaturan />;
      default:
        return <HomePageEdit />;
    }
  };

  return (
    <div className="flex overflow-x-scroll">
      <Sidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <div className="flex-1 p-6 bg-white min-h-screen justify-center items-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
