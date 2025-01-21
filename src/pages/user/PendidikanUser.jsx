import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import customApi from "../../api";

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PendidikanUser = () => {
  const [chartData, setChartData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const chartContainerRef = useRef(null);

  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createRadialGradient(
      chartArea.width / 2, // Pusat x
      chartArea.height / 2, // Pusat y
      0, // Radius dalam
      chartArea.width / 2, // Pusat x
      chartArea.height / 2, // Pusat y
      chartArea.width / 2 // Radius luar
    );
    gradient.addColorStop(0, "#1E90FF"); // Biru terang
    gradient.addColorStop(1, "#4682B4"); // Biru gelap
    return gradient;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customApi.get("/pendidikans");
        const dataArray = response.data;

        if (dataArray.length > 0) {
          const data = dataArray[0];

          setChartData({
            labels: [
              "Belum Sekolah",
              "Tidak Tamat SD",
              "Tamatan SD",
              "Tamatan SLTA",
              "Tamatan Perguruan Tinggi",
            ],
            datasets: [
              {
                label: "Jumlah Orang",
                data: [
                  parseInt(data.belumSekolah),
                  parseInt(data.tidakTamatSd),
                  parseInt(data.tamatSd),
                  parseInt(data.tamatSLTA),
                  parseInt(data.tamatPerguruanTinggi),
                ],
                backgroundColor: (ctx) => {
                  const chart = ctx.chart;
                  const { ctx: canvasCtx, chartArea } = chart;
                  if (!chartArea) return null;
                  return createGradient(canvasCtx, chartArea);
                },
                borderColor: "#ffffff",
                borderWidth: 2,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      observer.observe(chartContainer);
    }

    return () => {
      if (chartContainer) {
        observer.unobserve(chartContainer);
      }
    };
  }, []);

  return (
    <section className="px-6 lg:px-20 pt-10 lg:pt-20">
      <div
        ref={chartContainerRef}
        className="w-full max-w-4xl lg:max-w-full mx-auto mt-8 p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
      >
        <h2 className="text-xl lg:text-3xl font-bold text-blue-700 text-center">
          Statistik Pendidikan Penduduk
        </h2>
        {chartData ? (
          <div className="w-full max-w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
            <Pie
              key={isVisible ? "visible" : "hidden"} // Trigger rerender
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    titleFont: {
                      size: 14,
                    },
                    bodyFont: {
                      size: 12,
                    },
                    padding: 10,
                  },
                  title: {
                    display: true,
                    text: "Distribusi Pendidikan",
                    color: "#333",
                    font: {
                      size: 12,
                      weight: "bold",
                    },
                    padding: {
                      bottom: 20,
                    },
                  },
                },
                animation: {
                  duration: 2000, // Durasi animasi
                  easing: "easeInOutCubic", // Efek animasi
                },
              }}
            />
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

export default PendidikanUser;
