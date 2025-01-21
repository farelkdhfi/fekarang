import React from 'react';
import { HomeIcon, UsersIcon, ChartBarIcon, CogIcon, PaintBrushIcon, EyeIcon, NewspaperIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/LogoKabupatenTasikmalaya.png'

const Sidebar = ({ setActiveMenu, activeMenu }) => {
    const menuItems = [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Edit', icon: PaintBrushIcon },
        { name: 'Surat', icon: ChartBarIcon },
        { name: 'Berita', icon: NewspaperIcon },
        { name: 'UMKM', icon: BuildingStorefrontIcon },
        { name: 'Preview', icon: EyeIcon },
        { name: 'Pengguna', icon: UsersIcon },
        { name: 'Pengaturan', icon: CogIcon },
    ];

    return (
        <div className="w-64 bg-white shadow-lg min-h-screen p-4 pr-0 lg:relative">
            <div className=' font-bold text-xl flex justify-center items-center gap-2 pt-6 lg:fixed'>
            <img src={Logo} alt="" className='w-9 h-9 ml-[-5px]' />
            <div className="text-xl font-bold text-blue-700">Admin Dashboard</div>

            </div>
            <nav className="lg:mt-20 lg:fixed lg:w-60">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveMenu(item.name)}
                        className={`flex items-center w-full px-4 py-3 mt-3 font-semibold hover:bg-gray-200 focus:outline-none transition-all rounded-full hover:rounded-r-full rounded-r-none ${activeMenu === item.name ? 'bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#10b981,_#7d089b)] text-white' : 'text-blue-700 scale-90'}`}
                    >
                        <item.icon className="h-6 w-6 mr-3" />
                        {item.name}
                    </button>
                ))}

            </nav>
        </div>
    );
};

export default Sidebar;
