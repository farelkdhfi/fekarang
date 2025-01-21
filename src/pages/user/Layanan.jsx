import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Layanan = () => {
    const services = [
        { title: 'Surat Keterangan Tidak Mampu (SKTM)', description: 'Ajukan surat keterangan tidak mampu untuk keperluan bantuan sosial atau pendidikan.' },
        { title: 'Surat Keterangan Usaha (SKU)', description: 'Ajukan surat keterangan usaha sebagai bukti legalitas usaha Anda.' },
        { title: 'Surat Domisili', description: 'Ajukan surat domisili untuk keperluan administrasi lainnya.' },
    ];

    return (
        <section className="min-h-screen bg-white">
            <Navbar />

            <div className="py-10 pt-24 lg:pt-28 px-6 lg:px-20 bg-white text-sm">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-6">Pengajuan Surat</h2>
                    <ul className="space-y-4 mb-8">
                        {services.map((service, index) => (
                            <li key={index} className="flex items-start space-x-3">
                                <span className="font-semibold text-gray-900">{service.title}:</span>
                                <span className="text-gray-700">{service.description}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex">
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out">
                            Ajukan Sekarang
                        </Link>
                    </div>
                </div>
            </div>

            <div className='lg:px-9'>
                <Footer />
            </div>
        </section>
    );
};

export default Layanan;
