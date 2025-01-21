import React from 'react';

// gambar
import admns from '../../assets/2.png';
import health from '../../assets/3.png';
import parwst from '../../assets/4.png';
import umkm from '../../assets/5.png';
import Penduduk from './Penduduk';
import ApbDesa from './ApbDesa';
import StrukturOrganisasi from './StrukturOrganisasi';
import VisiMisi from './VisiMisiDesa';
import AdminPerangkatDesa from './AdminPerangkatDesa';
import AdminPerwakilanDesa from './AdminPerwakilanDesa';
import AdminLpm from './AdminLpm';
import AdminPendidikan from './AdminPendidikan';
import AdminPekerjaan from './AdminPekerjaan';
import AdminKas from './AdminKas';
import AdminSejarah from './AdminSejarah';

const HomePageEdit = () => {


  const categories = [
    { image: admns, text: "Administrasi", route: "/administrasi" },
    { image: health, text: "Kesehatan", route: "/kesehatan" },
    { image: parwst, text: "Pariwisata", route: "/pariwisata" },
    { image: umkm, text: "UMKM", route: "/umkm" },
  ];
  return (
    <section className="font-sans bg-white p-5 rounded-xl ">
      <h1 className='text-xl font-bold text-blue-700'>Edit Website </h1>
      <p className='mb-5'>Anda bisa mengedit data yang tampil di website</p>
      <div className="h-[1px] w-full bg-gray-200 mb-5"></div>

      <div className='flex flex-wrap gap-3 items-center w-full'>
        {/* Struktur Organisasi Desa */}
        <StrukturOrganisasi />
        {/* Administrasi Penduduk */}
        <Penduduk />
        {/* Anggaran Desa */}
        <ApbDesa />
        <VisiMisi />
        <AdminPendidikan />
        <AdminPekerjaan />
        <AdminKas />
        <AdminSejarah />

        <AdminPerangkatDesa />
        <AdminPerwakilanDesa />
        <AdminLpm />
      </div>

    </section>
  );
};

export default HomePageEdit;
