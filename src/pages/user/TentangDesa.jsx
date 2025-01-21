import React from 'react';
import Navbar from '../../components/Navbar';
import VisiMisiUser from './VisiMisiUser';
import SejarahDesaUser from './SejarahDesaUser';
import SemuaPerangkatDesa from './SemuaPerangkatDesa';
import Footer from '../../components/Footer';
import SemuaPerwakilanDesa from './SemuaPerwakilanDesa';
import SemuaLpm from './SemuaLpm';
import PendidikanUser from './PendidikanUser';
import PekerjaanUser from './PekerjaanUser';
import KasUser from './KasUser';
import PendudukUser from './PendudukUser';
import ApbDesaUser from './ApbDesaUser';
import Video from './Video';
import TabelKasUser from './TabelKasUser';
import TabelPendidikanUser from './TabelPendidikanUser';

const TentangDesa = () => {
    return (
        <section className=' bg-white'>
            <Navbar />
            <div className='mt-10'>
                <Video />
                <VisiMisiUser />
                <SejarahDesaUser />
                <PendudukUser />
                <ApbDesaUser />
                <KasUser />
                <TabelKasUser />
                <PendidikanUser />
                <TabelPendidikanUser />
                <PekerjaanUser />
                <SemuaPerangkatDesa />
                <SemuaPerwakilanDesa />
                <SemuaLpm />
                {/* Google Maps Embed */}
                <div className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col justify-center items-center gap-3 max-w-screen-lg mx-auto">
                    <div>
                        <h3 className="text-xl lg:text-3xl font-bold text-blue-700 text-center">
                            Lokasi Desa Karanglayung
                        </h3>
                    </div>
                    <div className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.17477597926!2d108.0736438!3d-7.3667436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65867b2cb19489%3A0x123456789abcdef!2sDesa%20Karanglayung%2C%20Kabupaten%20Tasikmalaya!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid"
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Desa Karanglayung"
                        ></iframe>
                    </div>
                </div>

            </div>
            <div className='lg:px-9'>
                <Footer />
            </div>
        </section>
    );
};

export default TentangDesa;
