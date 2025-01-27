import React, { useEffect, useState } from 'react';
import cibuni1 from '../../assets/kebun.jpeg';
import cibuni2 from '../../assets/tambang.jpeg';
import cibuni3 from '../../assets/bukit.png';
import cibuni4 from '../../assets/pos.jpg';
import customApi from '../../api';

const SejarahDesaUser = () => {
    const [sejarahs, setSejarahs] = useState([]);

    useEffect(() => {
        const fetchSejarah = async () => {
            try {
                const res = await customApi.get('/sejarahs');
                setSejarahs(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSejarah();
    }, []);

    return (
        <section className="px-6 lg:px-20 py-10 lg:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
            <div className="text-center mb-7">
                <h1 className="text-xl lg:text-3xl font-bold text-blue-700 font-montserrat">
                    Sejarah Desa
                </h1>
                <p className=" text-gray-600 text-sm max-w-2xl mx-auto">
                    Menelusuri sejarah Desa Karanglayung yang penuh dengan nilai-nilai budaya dan kearifan lokal.
                </p>
            </div>

            {sejarahs.map((sejarah) => (
                <div key={sejarah._id} className="mb-2">
                    {/* Gambar */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-2">
                        {[cibuni1, cibuni2, cibuni3, cibuni4].map((image, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                            >
                                <img
                                    src={image}
                                    alt={`Desa ${index + 1}`}
                                    className="w-full h-40 sm:h-48 md:h-56 object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Sejarah */}
                    <div className="bg-white shadow-xl rounded-2xl p-4 lg:p-10 border">
                        <h2 className="text-xl lg:text-3xl font-semibold text-blue-700">
                            {sejarah.judul}
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {sejarah.sejarahDesa}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SejarahDesaUser;
