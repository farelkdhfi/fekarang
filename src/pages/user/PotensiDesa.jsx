import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import kebun from "../../assets/kebun.jpeg";
import tambang from "../../assets/tambang.jpeg";
import bukit from "../../assets/bukit.png";


function PotensiDesa() {
    const potensi = [
        {
            title: "Perkebunan Karet",
            description: `Nikmati pemandangan hijau yang menenangkan di tengah perkebunan karet yang luas. Anda dapat mempelajari cara penyadapan karet yang dilakukan secara tradisional oleh masyarakat setempat, sebuah proses yang telah berlangsung selama bertahun-tahun. Selain itu, perkebunan ini menawarkan pengalaman yang mendalam tentang kehidupan pedesaan dan interaksi dengan penduduk lokal yang ramah.`,
            image: kebun
        },
        {
            title: "Tambang Emas",
            description: `Kunjungi tambang emas tradisional yang menjadi saksi bisu sejarah desa kami. Di sini, Anda akan diajak untuk memahami bagaimana proses penambangan dilakukan secara manual oleh generasi terdahulu. Area tambang ini juga menyimpan cerita menarik tentang kehidupan masyarakat sekitar, yang sebagian besar menggantungkan hidup mereka pada tambang ini.`,
            image: tambang
        },
        {
            title: "Bukit Pangajar",
            description: `Daki Bukit Pangajar untuk menikmati pemandangan matahari terbit yang memukau dan udara yang segar. Perjalanan mendaki tidak hanya menyuguhkan panorama alam yang indah, tetapi juga memberi pengalaman yang menyenangkan bagi para pecinta alam. Di puncak bukit, Anda dapat menikmati waktu bersantai sambil mengagumi keindahan desa dari ketinggian.`,
            image: bukit
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <section className="bg-white text-blue-700 text-center pt-24 px-4 sm:px-6">
                <h1 className="text-xl lg:text-3xl font-bold">Potensi Alam</h1>
                <p className=" text-sm lg:text-xl font-light max-w-2xl mx-auto">
                    Desa Karanglayung Kec.Karangjaya Kabupaten Tasikmalaya
                </p>
            </section>

            {/* Blog Section */}
            <section className="py-10 pt-5 px-4 sm:px-6 lg:px-20">
                <div className="grid gap-8 lg:gap-16 sm:grid-cols-1 lg:grid-cols-2">
                    {potensi.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full aspect-[16/9] object-cover"
                            />
                            <div className="p-6 lg:p-8">
                                <h3 className="text-lg lg:text-3xl font-medium text-gray-800">{item.title}</h3>
                                <p className="text-gray-600 mt-4 leading-relaxed text-sm lg:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="lg:px-9">
                <Footer />
            </div>
        </div>
    );
}

export default PotensiDesa;
