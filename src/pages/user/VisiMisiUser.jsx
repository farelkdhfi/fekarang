import React, { useEffect, useState } from 'react';
import logo from '../../assets/LogoKabupatenTasikmalaya.png';
import customApi from '../../api';

const VisiMisiUser = () => {
    const [visis, setVisis] = useState([]);

    useEffect(() => {
        const fetchVisiMisi = async () => {
            try {
                const res = await customApi.get('/visimisis');
                setVisis(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchVisiMisi();
    }, []);

    return (
        <div className=" px-6 bg-white flex justify-center items-center py-10 lg:py-20">
            {visis.map((visi) => (
                <div
                    key={visi._id}
                    className="max-w-6xl w-full bg-white shadow-xl rounded-xl overflow-hidden border-4 border-gray-300"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 text-center">
                        <img
                            src={logo}
                            alt="Logo Kabupaten Tasikmalaya"
                            className="h-24 w-auto mx-auto mb-4"
                        />
                        <h1 className="font-bold text-xl">
                            Desa Karanglayung, Kec.Karangjaya, Kab.Tasikmalaya
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50">
                        {/* Visi */}
                        <div className="flex flex-col items-center lg:items-start">
                            <h2 className="text-xl font-bold text-blue-700 mb-4">
                                Visi
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed text-center lg:text-left">
                                {visi.visi}
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="flex flex-col items-center lg:items-start">
                            <h2 className="text-xl font-bold text-blue-700 mb-4">
                                Misi
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed text-center lg:text-left">
                                {visi.misi}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 text-center p-4">
                        <p className="text-sm">© 2025 Desa Karanglayung, Kec.Karangjaya, Kab.Tasikmalaya</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VisiMisiUser;
