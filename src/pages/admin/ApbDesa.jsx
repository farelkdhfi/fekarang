import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Apbd from '../../assets/admin/EditApbd.png'
import customApi from '../../api';


const ApbDesa = () => {
    const [apbdesas, setApbdesa] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApbdesas = async () => {
            try {
                const res = await customApi.get('/apbdesas');
                console.log(res.data); // Log data untuk debugging
                setApbdesa(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApbdesas();
    }, []);

    const handleEdit = (apbdesaId) => {
        navigate(`/apbdesas/${apbdesaId}/edit`);
    };

    return (
        <div>
            {apbdesas.map((apbdesa) => (
                <div key={apbdesa._id} className='flex flex-col bg-white shadow-md w-fit p-3 rounded-xl justify-center items-center border border-gray-200'>
                    <h1 className='text-sm font-bold text-blue-700'>Apb Desa</h1>
                    <div className='w-52 h-40'>
                        <img src={Apbd} alt="" />
                    </div>
                    <div className='flex self-end'>
                        <button onClick={() => handleEdit(apbdesa._id)} className=' bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] p-2 px-4 rounded-xl text-white font-semibold text-sm'>Edit Data</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApbDesa;
