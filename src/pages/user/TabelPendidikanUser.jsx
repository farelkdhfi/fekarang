import React, { useEffect, useState } from "react";
import customApi from "../../api";

const TabelPendidikanUser = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customApi.get("/pendidikans");
        const dataArray = response.data;

        if (dataArray.length > 0) {
          const data = dataArray[0];

          setTableData([
            { label: "Belum Sekolah", value: parseInt(data.belumSekolah) },
            { label: "Tidak Tamat SD", value: parseInt(data.tidakTamatSd) },
            { label: "Tamatan SD", value: parseInt(data.tamatSd) },
            { label: "Tamatan SLTA", value: parseInt(data.tamatSLTA) },
            { label: "Tamatan Perguruan Tinggi", value: parseInt(data.tamatPerguruanTinggi) },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-6 lg:px-20 text-sm pb-10 lg:pb-20">
      <div className="w-full max-w-4xl lg:max-w-full mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
        {tableData ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Pendidikan</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Jumlah Orang</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{item.label}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
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

export default TabelPendidikanUser;
