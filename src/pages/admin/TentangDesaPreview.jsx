import React from 'react';
import VisiMisiUser from '../user/VisiMisiUser';
import SejarahDesaUser from '../user/SejarahDesaUser';
import SemuaPerangkatDesa from '../user/SemuaPerangkatDesa';
import Footer from '../../components/Footer';
import SemuaPerwakilanDesa from '../user/SemuaPerwakilanDesa';
import SemuaLpm from '../user/SemuaLpm';
import PendidikanUser from '../user/PendidikanUser';
import PekerjaanUser from '../user/PekerjaanUser';
import KasUser from '../user/KasUser';
import PendudukUser from '../user/PendudukUser';
import ApbDesaUser from '../user/ApbDesaUser';

const TentangDesaPreview = () => {
    return (
        <section className=' bg-white'>
            <div className='mt-10'>
                <VisiMisiUser />
                <SejarahDesaUser />
                <PendudukUser />
                <ApbDesaUser />
                <KasUser />
                <PendidikanUser />
                <PekerjaanUser />
                <SemuaPerangkatDesa />
                <SemuaPerwakilanDesa />
                <SemuaLpm />
                {/* Google Maps Embed */}
                <div className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10 max-w-screen-lg mx-auto">
                    <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-4">
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

export default TentangDesaPreview;
