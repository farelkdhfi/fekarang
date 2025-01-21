import React, { useEffect, useState } from 'react';
import customApi from '../../api';

const PendudukUser = () => {
    const [penduduks, setPenduduk] = useState([]);

    useEffect(() => {
        const fetchPenduduks = async () => {
            try {
                const res = await customApi.get('/penduduks');
                setPenduduk(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPenduduks();
    }, []);


    return (

        <div className='py-10 lg:py-20 px-6 lg:px-20 text-sm'>
            {penduduks.map((penduduk) => {
                return (
                    <div key={penduduk._id} className='flex flex-col lg:flex-row lg:gap-5 justify-center items-center text-sm lg:text-base'>
                        <div className='lg:w-1/3 flex flex-col justify-center items-center lg:flex-none text-center lg:text-left'>
                            <h1 className='lg:text-3xl font-bold text-blue-700 text-xl font-montserrat'>Administrasi Penduduk</h1>
                            <p className='lg:mt-2'>Sistem digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan dan pendayagunaannya untuk pelayanan publik yang efektif dan efisien</p>
                        </div>

                        <div className='mt-2'>
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='grid grid-cols-2 justify-center items-center shadow-lg rounded-xl border'>
                                    <div className='flex justify-center items-center bg-gradient-to-r from-blue-700 to-blue-500 p-5 font-semibold text-white rounded-l-xl'>
                                        <h3 className='lg:text-2xl font-bold'>{penduduk.penduduk}</h3>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <h4 className='lg:p-5 p-2 font-semibold'>Penduduk</h4>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 justify-center items-center shadow-lg rounded-xl border'>
                                    <div className='flex justify-center items-center bg-gradient-to-r from-blue-700 to-blue-500 p-5 font-semibold text-white rounded-l-xl'>
                                        <h3 className='lg:text-2xl font-bold'>{penduduk.kepalaKeluarga}</h3>
                                    </div>
                                    <div className='flex justify-center items-center text-center lg:text-start'>
                                        <h4 className='lg:p-5 p-2 font-semibold'>Kepala Keluarga</h4>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 justify-center items-center shadow-lg rounded-xl border'>
                                    <div className='flex justify-center items-center bg-gradient-to-r from-blue-700 to-blue-500 p-5 font-semibold text-white rounded-l-xl'>
                                        <h3 className='lg:text-2xl font-bold'>{penduduk.laki}</h3>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <h4 className='lg:p-5 p-2 font-semibold'>Laki-laki</h4>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 justify-center items-center shadow-lg rounded-xl border'>
                                    <div className='flex justify-center items-center bg-gradient-to-r from-blue-700 to-blue-500 p-5 font-semibold text-white rounded-l-xl'>
                                        <h3 className='lg:text-2xl font-bold'>{penduduk.perempuan}</h3>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <h4 className='lg:p-5 p-2 font-semibold'>Perempuan</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

        </div>
    );
};

export default PendudukUser;
