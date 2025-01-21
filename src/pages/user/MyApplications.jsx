import React, { useEffect, useState } from "react";
import customApi from "../../api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await customApi.get("applications/my-applications", {
          headers: { "x-auth-token": token },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Riwayat Pengajuan</h1>
        {applications.length > 0 ? (
          applications.map((app) => (
            <div
              key={app._id}
              className="mb-6 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-800">
                {app.nama} <span className="text-sm text-gray-500">({app.type})</span>
              </h3>
              <p className="text-gray-600">NIK: {app.nik}</p>
              <p className="text-gray-600">Alamat: {app.alamatSebelumnya}</p>
              <p className={`text-sm font-medium ${
                app.status === "Approved" 
                  ? "text-blue-600" 
                  : app.status === "Rejected" 
                  ? "text-red-600" 
                  : "text-gray-600"
              }`}>
                Status: {app.status}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Admin Notes:</strong> {app.adminNotes || "No notes yet."}
              </p>
              {app.pdfPath && (
                <a
                  href={app.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Download PDF
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No applications found.</p>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
