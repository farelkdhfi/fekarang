import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Struk from '../../assets/admin/EditStruktur.png'
import customApi from '../../api';

const StrukturOrganisasi = () => {
    const [websites, setWebsites] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const res = await customApi.get("/websites");
                console.log(res.data); // Tambahkan log ini
                setWebsites(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWebsites();
    }, []);

    const handleEdit = (websiteId) => {
        navigate(`/websites/${websiteId}/edit`);
    };

    return (
        <div>
            {websites.map((website) => (
                <div key={website._id} className='flex flex-col bg-white shadow-md w-fit p-3 rounded-xl justify-center items-center border border-gray-200'>
                    <h1 className='text-sm font-bold text-blue-700'>Struktur Organisasi Desa</h1>
                    <div className='w-52 h-40'>
                        <img src={Struk} alt="" />
                    </div>
                    <div className='flex self-end'>
                        <button onClick={() => handleEdit(website._id)} className=' bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] p-2 px-4 rounded-xl text-white font-semibold text-sm'>Edit Data</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StrukturOrganisasi