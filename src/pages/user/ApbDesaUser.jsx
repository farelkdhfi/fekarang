import React, { useEffect, useState } from 'react'

import dompet from '../../assets/dompet.png';
import customApi from '../../api';

const ApbDesaUser = () => {

    const [apbdesas, setApbdesa] = useState([]);

    useEffect(() => {
        const fetchApbdesas = async () => {
            try {
                const res = await customApi.get('/apbdesas');
                setApbdesa(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApbdesas();
    }, []);

    return (
        <div className='py-10 lg:py-20 px-6 lg:px-20 text-sm'>
            {apbdesas.map((apbdesa) => {
                return (
                    <div key={apbdesa._id} className='flex flex-col lg:flex-row justify-center items-center lg:gap-5'>
                        <div className=''>
                            <img src={dompet} alt="" className='lg:h-80 h-40' />
                        </div>

                        <div className='lg:w-1/2'>
                            <div className='flex flex-col justify-center items-center lg:flex-none text-center'>
                                <h1 className='lg:text-3xl text-xl font-bold text-blue-700 font-montserrat'>APB Desa 2024</h1>
                                <p className='mb-5'>Akses cepat dan transparan terhadap APB Desa serta proyek pembangunan</p>
                                <div className='flex justify-center flex-col items-center lg:gap-3'>
                                    <div className=' bg-gradient-to-r from-blue-700 to-blue-500 text-white lg:p-6 p-3 px-10 rounded-full lg:rounded-xl'>
                                        <p className='lg:text-xl'>Pendapatan desa</p>
                                        <p className=' lg:text-4xl text-xl font-bold lg:mt-2'>Rp{apbdesa.pendapatanDesa}</p>
                                    </div>
                                    <div className=' bg-gradient-to-r from-red-700 to-red-500 text-white lg:p-6 p-3 px-10 rounded-full lg:rounded-xl mt-2 lg:mt-0'>
                                        <p className='lg:text-xl'>Pengeluaran desa</p>
                                        <p className=' lg:text-4xl text-xl font-bold lg:mt-2'>Rp{apbdesa.pengeluaranDesa}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ApbDesaUser