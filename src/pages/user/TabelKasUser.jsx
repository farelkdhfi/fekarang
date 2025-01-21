import React, { useEffect, useState } from "react";
import customApi from "../../api";

const TabelKasUser = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customApi.get("/kass");
        const dataArray = response.data;

        if (dataArray.length > 0) {
          const data = dataArray[0];

          // Fungsi untuk membersihkan string dari tanda titik
          const cleanNumber = (value) => Number(value.replace(/\./g, ""));

          setTableData([
            { label: "Tanah Kas Desa", value: cleanNumber(data.tanah) },
            { label: "Abodemen Kios Pasar", value: cleanNumber(data.abodemen) },
            { label: "Pengguna PAM Jabangsa", value: cleanNumber(data.pam) },
            { label: "Sewa Gedung Serbaguna", value: cleanNumber(data.sewaGedung) },
            { label: "Swadaya,Partisipssi dan Gotong royong", value: cleanNumber(data.swadaya) },
            { label: "Portal dan warung bakul", value: cleanNumber(data.portal) },
            { label: "Urunan Desa dan Retribusi pengusaha", value: cleanNumber(data.pengusaha) },
            { label: "Bagi Hasil Bumdes", value: cleanNumber(data.bumdes) },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-6 lg:px-20 pb-10 lg:pb-20 text-sm">
      <div className="w-full max-w-4xl lg:max-w-full mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
        {tableData ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="px-4 py-2 text-left">Sumber</th>
                  <th className="px-4 py-2 text-right">Jumlah (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-100 transition duration-150`}
                  >
                    <td className="border px-4 py-2 text-gray-800">{item.label}</td>
                    <td className="border px-4 py-2 text-gray-800 text-right">
                      {item.value.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-sm sm:text-base text-center animate-pulse">
            Loading data...
          </p>
        )}
      </div>
    </section>
  );
};

export default TabelKasUser;
