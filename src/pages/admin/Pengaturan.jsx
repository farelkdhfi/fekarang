import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Pengaturan = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Hapus token dan role
    navigate('/'); // Arahkan ke halaman login
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default Pengaturan;
