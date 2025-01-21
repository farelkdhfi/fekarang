import { useState } from "react";
import customApi from "../../api";
import { useNavigate } from "react-router-dom";
import cs from '../../assets/cs.png'

function Skdp() {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    jenisKelamin: "",
    tempatTanggalLahir: "",
    pendidikan: "",
    agama: "",
    statusPerkawinan: "",
    kewarganegaraan: "",
    pekerjaan: "",
    alamatSebelumnya: "",
    alamatSekarang: "",
    fotoKtp: null,
    fotoKk: null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const fields = [
    { name: "nama", label: "Nama", type: "text", placeholder: "Nama Anda", required: true },
    {
      name: "nik",
      label: "NIK",
      type: "text",
      placeholder: "NIK (16 digit)",
      required: true,
      validate: (value) => /^\d{16}$/.test(value) || "NIK harus berupa 16 digit angka",
    },
    {
      name: "jenisKelamin",
      label: "Jenis Kelamin",
      type: "text",
      placeholder: "Jenis Kelamin (Laki-laki/Perempuan)",
      required: true,
      validate: (value) =>
        ["Laki-laki", "Perempuan"].includes(value) || "Jenis Kelamin harus Laki-laki atau Perempuan",
    },
    {
      name: "tempatTanggalLahir",
      label: "Tempat Tanggal Lahir",
      type: "text",
      placeholder: "Contoh: Jakarta, 01 Januari 1990",
      required: true,
      validate: (value) => {
        // Validasi untuk memastikan input berformat "Tempat, DD MMMM YYYY"
        const regex = /^[A-Za-z\s]+,\s\d{2}\s(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s\d{4}$/;
        if (!value) {
          return "Tempat Tanggal Lahir tidak boleh kosong.";
        }
        if (!regex.test(value)) {
          return "Format harus seperti 'Jakarta, 01 Januari 1990'.";
        }
        return true; // Valid
      },
    },
    {
      name: "pendidikan",
      label: "Pendidikan",
      type: "text",
      placeholder: "SD/SMP/SMA/Perguruan Tinggi",
      required: true,
    },
    {
      name: "agama",
      label: "Agama",
      type: "text",
      placeholder: "Islam/Kristen/Konghucu...",
      required: true,
      validate: (value) =>
        ["Islam", "Kristen Protestan", "Katolik", "Hindu", "Buddha", "Konghucu"].includes(value) || "Agama harus berisi Islam/Kristen Protestan/Katolik/Hindu/Buddha/Konghucu",
    },
    {
      name: "statusPerkawinan",
      label: "Status Perkawinan",
      type: "text",
      placeholder: "Kawin/Belum Kawin",
      required: true,
      validate: (value) =>
        ["Kawin", "Belum Kawin"].includes(value) || "Status Perkawinan harus berisi Kawin/Belum Kawin",
    },
    {
      name: "kewarganegaraan",
      label: "Kewarganegaraan",
      type: "text",
      placeholder: "WNI/WNA",
      required: true,
      validate: (value) =>
        ["WNI", "WNA"].includes(value) || "Kewarganegaraan harus berisi WNA/WNI",
    },
    {
      name: "pekerjaan",
      label: "Pekerjaan",
      type: "text",
      placeholder: "Wiraswasta/PNS/Buruh",
      required: true,
      validate: (value) => {
        if (!value) {
          return "Pekerjaan tidak boleh kosong.";
        }
        if (value.length < 3) {
          return "Pekerjaan harus memiliki minimal 3 karakter.";
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Pekerjaan hanya boleh berisi huruf dan spasi.";
        }
        return true; // Valid
      },
    },
    {
      name: "alamatSebelumnya",
      label: "Alamat Sebelumnya",
      type: "text",
      placeholder: "Alamat sebelumnya",
      required: true,
      validate: (value) => {
        if (!value) {
          return "Alamat Sebelumnya tidak boleh kosong.";
        }
        if (value.length < 10) {
          return "Alamat Sebelumnya harus memiliki minimal 10 karakter.";
        }
        if (!/^[A-Za-z0-9\s,.-]+$/.test(value)) {
          return "Alamat Sebelumnya hanya boleh berisi huruf, angka, spasi, koma, titik, dan strip.";
        }
        return true; // Valid
      },
    },
    {
      name: "alamatSekarang",
      label: "Alamat Sekarang",
      type: "text",
      placeholder: "Alamat sekarang",
      required: true,
      validate: (value) => {
        if (!value) {
          return "Alamat sekarang tidak boleh kosong.";
        }
        if (value.length < 10) {
          return "Alamat sekarang harus memiliki minimal 10 karakter.";
        }
        if (!/^[A-Za-z0-9\s,.-]+$/.test(value)) {
          return "Alamat sekarang hanya boleh berisi huruf, angka, spasi, koma, titik, dan strip.";
        }
        return true; // Valid
      },
    },
    {
      name: "fotoKtp",
      label: "Foto KTP",
      type: "file",
      placeholder: "Upload Foto KTP Anda",
      required: true,
      accept: "image/*",
    },
    {
      name: "fotoKk",
      label: "Foto KK",
      type: "file",
      placeholder: "Upload Foto KK Anda",
      required: true,
      accept: "image/*",
    },
  ];

  const validateField = (field, value) => {
    if (field.required && !value) {
      return `${field.label} wajib diisi`;
    }
    if (field.validate) {
      const validationResult = field.validate(value);
      if (validationResult !== true) {
        return validationResult;
      }
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;

    setFormData({ ...formData, [name]: fieldValue });
    setErrors({ ...errors, [name]: validateField(fields[currentStep], fieldValue) });
  };

  const handleNext = () => {
    const currentField = fields[currentStep];
    const error = validateField(currentField, formData[currentField.name]);

    if (error) {
      setErrors({ ...errors, [currentField.name]: error });
    } else {
      setErrors({ ...errors, [currentField.name]: null });
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field)) {
      alert("Mohon untuk melengkapi semua data sebelum mengirim.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("type", "SKDP");

    const token = localStorage.getItem("token");

    try {
      setStatus("Mengirimkan...");
      await customApi.post("applications/uploadapp", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      });
      setStatus("Pengajuan berhasil dikirim.");
      setShowModal(true); // Tampilkan modal
    } catch (err) {
      console.error(err);
      setStatus("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleNavigateBack = () => {
    navigate("/dashboard"); // Ganti dengan rute halaman tujuan
    setShowModal(false);
    setFormData({
      nama: "",
      nik: "",
      jenisKelamin: "",
      tempatTanggalLahir: "",
      pendidikan: "",
      agama: "",
      statusPerkawinan: "",
      kewarganegaraan: "",
      pekerjaan: "",
      alamatSebelumnya: "",
      alamatSekarang: "",
      fotoKtp: null,
      fotoKk: null,
    });
    setCurrentStep(0);
    setStatus("");
  };

  const field = fields[currentStep];

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <div>
        <img src={cs} alt="" className="w-32 lg:w-56"/>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
      >
        <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Surat Keterangan Domisili Perorangan
        </h1>
        <div>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={field.type !== "file" ? formData[field.name] : undefined}
            onChange={handleChange}
            placeholder={field.placeholder}
            accept={field.accept}
            className={`w-full border px-4 py-2 rounded-md focus:outline-none ${errors[field.name] ? "border-red-500" : "border-gray-300"
              }`}
            required={field.required}
          />
          {errors[field.name] && (
            <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
          )}
        </div>
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Back
            </button>
          )}
          {currentStep < fields.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </div>
        {status && <p className="mt-4 text-sm text-center text-gray-600">{status}</p>}
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pengajuan Berhasil!
            </h2>
            <p className="text-gray-600 mb-6">Formulir Anda telah berhasil dikirim.</p>
            <button
              onClick={handleNavigateBack}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Skdp;
