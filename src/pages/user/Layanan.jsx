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

                        <div className='lg:px-20'>
                <div className="container mx-auto px-4  py-10 bg-gray-100">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8"></h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Posyandu Section */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informasi Posyandu</h2>
                            <p className="text-gray-600">
                                Posyandu (Pos Pelayanan Terpadu) adalah layanan kesehatan berbasis masyarakat yang berfokus pada kesehatan ibu dan anak. Layanan ini bertujuan untuk memberikan edukasi, pemantauan kesehatan, dan tindakan preventif yang penting bagi keluarga.
                            </p>
                            <p className="mt-4 text-gray-600">
                                Layanan posyandu meliputi:
                            </p>
                            <ul className="list-disc list-inside mt-4 text-gray-600">
                                <li><span className="font-semibold">Imunisasi:</span> Memberikan vaksin kepada bayi dan balita untuk mencegah berbagai penyakit menular.</li>
                                <li><span className="font-semibold">Penimbangan Balita:</span> Pemantauan berat badan balita secara rutin untuk memastikan pertumbuhan yang sehat.</li>
                                <li><span className="font-semibold">Konsultasi Kesehatan:</span> Memberikan informasi dan solusi atas masalah kesehatan ibu dan anak.</li>
                                <li><span className="font-semibold">Pemberian Vitamin:</span> Distribusi vitamin A dan suplemen lain yang dibutuhkan anak.</li>
                            </ul>
                        </div>

                        {/* Jadwal Posyandu Section */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Jadwal Posyandu</h2>
                            <p className="text-gray-600">
                                Posyandu di desa ini dilakukan secara rutin setiap bulan. Berikut adalah jadwal posyandu yang telah ditetapkan:
                            </p>
                            <div className="mt-4 text-gray-600">
                            <table className="table-auto w-full border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border px-4 py-2 text-left">Tanggal</th>
                                            <th className="border px-4 py-2 text-left">Waktu</th>
                                            <th className="border px-4 py-2 text-left">Lokasi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-gray-100">
                                            <td className="border px-4 py-2">Sabtu, Minggu ke-1</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Sukaharja</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Senin, Minggu ke-2</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Karangsirna</td>
                                        </tr>
                                        <tr className="bg-gray-100">
                                            <td className="border px-4 py-2">Kamis, Minggu ke-2</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Karangpaningal</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Sabtu, Minggu ke-2</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Pananjung</td>
                                        </tr>
                                        <tr className="bg-gray-100">
                                            <td className="border px-4 py-2">Selasa, Minggu ke-3</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Citambal</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Kamis, Minggu ke-3</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Ciherang</td>
                                        </tr>
                                        <tr className="bg-gray-100">
                                            <td className="border px-4 py-2">Sabtu, Minggu ke-3</td>
                                            <td className="border px-4 py-2">09:00 WIB</td>
                                            <td className="border px-4 py-2">Kertajaya</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-gray-600">
                                Pastikan untuk datang tepat waktu dan membawa KMS (Kartu Menuju Sehat) bagi yang memiliki balita.
                            </p>
                        </div>
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
