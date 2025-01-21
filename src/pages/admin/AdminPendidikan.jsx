import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pendu from '../../assets/admin/pendidikan.png'
import customApi from '../../api';

const AdminPendidikan = () => {
    const [penduduks, setPenduduk] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPenduduks = async () => {
            try {
                const res = await customApi.get('/pendidikans');
                console.log(res.data); // Log data untuk debugging
                setPenduduk(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPenduduks();
    }, []);

    const handleEdit = (pendudukId) => {
        navigate(`/pendidikans/${pendudukId}/edit`);
    };

    return (

        <div className=''>
            {penduduks.map((penduduk) => {
                return (
                    <div key={penduduk._id} className='flex flex-col bg-white shadow-md w-fit p-3 rounded-xl justify-center items-center border border-gray-200'>
                        <h1 className='text-sm font-bold text-blue-700'>Pendidikan Penduduk</h1>
                        <div className='w-52 h-40'>
                            <img src={Pendu} alt="" />
                        </div>
                        <div className='flex self-end'>
                            <button onClick={() => handleEdit(penduduk._id)} className=' bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] p-2 px-4 rounded-xl text-white font-semibold text-sm'>Edit Data</button>
                        </div>
                    </div>
                );
            })}

        </div>
    );
};

export default AdminPendidikan;
