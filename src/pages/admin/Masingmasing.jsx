import React, { useState, useEffect } from "react";
import { TbTrashFilled } from "react-icons/tb";
import customApi from "../../api";

const Masingmasing = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [filterType, setFilterType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [approvalLoading, setApprovalLoading] = useState(false);

    const fetchApplications = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);
        setError("");
        try {
            const query = filterType ? `?type=${filterType}` : "";
            const res = await customApi.get(`applications${query}`, {
                headers: { "x-auth-token": token },
            });
            setApplications(res.data);
        } catch (err) {
            setError("Gagal memuat aplikasi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [filterType]);

    const handleUpdate = async (id, status) => {
        const adminNotes = prompt("Enter admin notes (optional):");
        const kop1 = prompt("Enter kop1:");
        const kop2 = prompt("Enter kop2:");
        const kop3 = prompt("Enter kop3:");
        const kop4 = prompt("Enter kop4:");

        if (!adminNotes && status === "Rejected") {
            alert("Admin notes are required for rejection.");
            return;
        }

        setApprovalLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await customApi.put(
                `applications/${id}`,
                { status, adminNotes, kop1, kop2, kop3, kop4 },
                { headers: { "x-auth-token": token } }
            );
            alert(`Application ${status.toLowerCase()} successfully!`);
            setApplications((prev) =>
                prev.map((app) => (app._id === id ? res.data : app))
            );
        } catch (err) {
            alert(err.response?.data?.message || "Error updating application.");
        } finally {
            setApprovalLoading(false);
        }
    };

    const deleteApplication = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await customApi.delete(`applications/${id}`, {
                headers: { "x-auth-token": token },
            });
            setApplications(applications.filter((app) => app._id !== id));
        } catch (err) {
            console.error("Failed to delete application:", err);
        }
    };

    if (loading) {
        return <p className="text-center mt-5">Loading applications...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-5">{error}</p>;
    }

    return (
        <>
            <section className=" bg-white p-5 rounded-xl">
                <h1 className="text-blue-700 font-bold text-xl">Surat Administratif</h1>
                <p className="mb-5">Surat akan terbuat otomatis jika anda menyetujuinya</p>
                <div className="h-[1px] bg-gray-200 mb-5"></div>
                <div className="mb-5">
                    <label className="block text-lg font-medium mb-2">Pilih Menu Layanan:</label>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-sm bg-white text-gray-700 border-gray-300"
                    >
                        <option value="">Semua</option>
                        <option value="SKDP">Surat Keterangan Domisili Perorangan</option>
                        <option value="SKDL">Surat Keterangan Domisili Lembaga</option>
                        <option value="SKTM">Surat Keterangan Tidak Mampu</option>
                        <option value="SKU">Surat Keterangan Usaha</option>
                    </select>
                </div>

                {applications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead className="bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] text-white">
                                <tr>
                                    <th className="p-3 text-left text-sm font-semibold">Nama</th>
                                    <th className="p-3 text-left text-sm font-semibold">NIK</th>
                                    {filterType === "" && (
                                        <th className="p-3 text-left text-sm font-semibold">Tipe</th>
                                    )}
                                    <th className="p-3 text-left text-sm font-semibold">Status</th>
                                    <th className="p-3 text-left text-sm font-semibold">Aksi</th>
                                    <th className="p-3 text-left text-sm font-semibold">File</th>
                                    <th className="p-3 text-left text-sm font-semibold">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3 text-sm text-gray-700">{app.nama}</td>
                                        <td className="p-3 text-sm text-gray-700">{app.nik}</td>
                                        {filterType === "" && (
                                            <td className="p-3 text-sm text-gray-700">{app.type}</td>
                                        )}
                                        <td className="p-3 text-sm text-gray-700">{app.status}</td>
                                        <td className="p-3">
                                            <button
                                                className="text-blue-600 hover:underline"
                                                onClick={() => setSelectedApplication(app)}
                                            >
                                                Lihat Detail
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            {app.pdfPath && (
                                                <a
                                                    href={app.pdfPath}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Download PDF
                                                </a>
                                            )}
                                            {app.status === "Menunggu" && (
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => handleUpdate(app._id, "Disetujui")}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        disabled={approvalLoading}
                                                    >
                                                        {approvalLoading ? "Loading..." : "Setujui"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdate(app._id, "Ditolak")}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                        disabled={approvalLoading}
                                                    >
                                                        {approvalLoading ? "Loading..." : "Tolak"}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button className="p-3" onClick={() => deleteApplication(app._id)}>
                                                <TbTrashFilled className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center mt-5 text-gray-700">Tidak ada data</p>
                )}

                {selectedApplication && (
                    <ApplicationDetail
                        application={selectedApplication}
                        onClose={() => setSelectedApplication(null)}
                    />
                )}
            </section>
        </>

    );
};

const ApplicationDetail = ({ application, onClose }) => {
    const { nama, nik, kk, type, tempatTanggalLahir, bentukPerusahaan, npwp, alamatPerusahaan, alamatLengkap, bidangUsaha, jasaDagangUtama, keadaanUsahaSaatIni, fotoKk, fotoKtp, namaLembaga, ketua, tahunBerdiri, jenisKelamin, pendidikan, agama, statusPerkawinan, kewarganegaraan, pekerjaan, alamatSebelumnya, alamatSekarang, noIdDtks } = application;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12 max-w-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                    Detail Aplikasi ({type})
                </h2>
                {/* Konten teks yang bisa di-scroll */}
                <div className="space-y-4 text-gray-700 max-h-[60vh] overflow-y-auto pr-4">
                    <p><strong>Nama:</strong> {nama}</p>
                    <p><strong>NIK:</strong> {nik}</p>
                    <p><strong>Alamat:</strong> {alamatLengkap}</p>
                    {type === "SKU" && (
                        <>
                            <p><strong>Tempat tanggal lahir:</strong> {tempatTanggalLahir}</p>
                            <p><strong>Bentuk perusahaan:</strong> {bentukPerusahaan}</p>
                            <p><strong>NPWP:</strong> {npwp}</p>
                            <p><strong>Alamat perusahaan:</strong> {alamatPerusahaan}</p>
                            <p><strong>Bidang usaha:</strong> {bidangUsaha}</p>
                            <p><strong>Jasa dagang utama:</strong> {jasaDagangUtama}</p>
                            <p><strong>Keadaan usaha saat ini:</strong> {keadaanUsahaSaatIni}</p>
                        </>
                    )}
                    {type === "SKDL" && (
                        <>
                            <p><strong>Nama lembaga:</strong> {namaLembaga}</p>,
                            <p><strong>Ketua lembaga:</strong> {ketua}</p>,
                            <p><strong>Tahun berdiri:</strong> {tahunBerdiri}</p>,
                            <p><strong>Alamat lembaga:</strong> {alamatLengkap}</p>
                        </>
                    )}
                    {type === "SKDP" && (
                        <>
                            <p><strong>Jenis kelamin:</strong> {jenisKelamin}</p>
                            <p><strong>Tempat tanggal lahir:</strong> {tempatTanggalLahir}</p>
                            <p><strong>Pendidikan:</strong> {pendidikan}</p>
                            <p><strong>Agama:</strong> {agama}</p>
                            <p><strong>Status perkawinan:</strong> {statusPerkawinan}</p>
                            <p><strong>Kewarganegaraan:</strong> {kewarganegaraan}</p>
                            <p><strong>Pekerjaan:</strong> {pekerjaan}</p>
                            <p><strong>Alamat sebelumnya:</strong> {alamatSebelumnya}</p>
                            <p><strong>Alamat sekarang:</strong> {alamatSekarang}</p>
                        </>
                    )}
                    {type === "SKTM" && (
                        <>
                            <p><strong>Jenis kelamin:</strong> {jenisKelamin}</p>
                            <p><strong>Tempat tanggal lahir:</strong> {tempatTanggalLahir}</p>
                            <p><strong>No. Id DTKS:</strong> {noIdDtks}</p>
                            <p><strong>Pekerjaan:</strong> {pekerjaan}</p>
                            <p><strong>Alamat lengkap:</strong> {alamatLengkap}</p>
                        </>
                    )}
                    <p>
                        <strong>Foto KTP:</strong>{" "}
                        <a
                            href={fotoKtp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Lihat
                        </a>
                    </p>
                    <p>
                        <strong>Foto KK:</strong>{" "}
                        <a
                            href={fotoKk}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Lihat
                        </a>
                    </p>
                </div>
                {/* Tombol tetap terlihat */}
                <button
                    onClick={onClose}
                    className="mt-4 w-full px-5 py-3 bg-red-500 text-white text-center rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                    Tutup
                </button>
            </div>
        </div>
    );



};

export default Masingmasing;
