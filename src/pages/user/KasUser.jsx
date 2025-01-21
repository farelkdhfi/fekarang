import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import customApi from "../../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const KasUser = () => {
  const [chartData, setChartData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const chartContainerRef = useRef(null);

  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "#1E90FF"); // Warna biru terang
    gradient.addColorStop(1, "#4682B4"); // Warna biru gelap
    return gradient;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customApi.get("/kass");
        const dataArray = response.data;

        if (dataArray.length > 0) {
          const data = dataArray[0];

          const cleanNumber = (value) => Number(value.replace(/\./g, ""));

          setChartData({
            labels: [
              "Tanah Kas Desa",
              "Abodemen Kios Pasar",
              "Pengguna PAM Jabangsa",
              "Sewa Gedung Serbaguna",
              "Swadaya,Partisipssi dan Gotong royong",
              "Portal dan warung bakul",
              "Urunan Desa dan Retribusi pengusaha",
              "Bagi Hasil Bumdes",
            ],
            datasets: [
              {
                label: "Jumlah Orang",
                data: [
                  cleanNumber(data.tanah),
                  cleanNumber(data.abodemen),
                  cleanNumber(data.pam),
                  cleanNumber(data.sewaGedung),
                  cleanNumber(data.swadaya),
                  cleanNumber(data.portal),
                  cleanNumber(data.pengusaha),
                  cleanNumber(data.bumdes),
                ],
                backgroundColor: (ctx) => {
                  const chart = ctx.chart;
                  const { ctx: canvasCtx, chartArea } = chart;
                  if (!chartArea) return null;
                  return createGradient(canvasCtx, chartArea);
                },
                borderRadius: 15,
                borderWidth: 2,
                borderColor: "#ffffff",
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
    <section className="px-6 lg:px-20 pt-10 lg:pt-20 bg-white">
      <div
        ref={chartContainerRef}
        className="w-full max-w-4xl lg:max-w-full mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-xl flex flex-col items-center"
      >
        <h2 className="text-xl lg:text-3xl font-semibold text-blue-800 text-center">
          Statistik Uang Kas Desa
        </h2>
        {chartData ? (
          <div className="w-full max-w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
            <Bar
              key={isVisible ? "visible" : "hidden"} // Trigger rerender
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `Jumlah: Rp ${context.raw.toLocaleString()}`,
                    },
                    backgroundColor: "rgba(43, 43, 43, 0.8)",
                    titleFont: {
                      size: 14,
                    },
                    bodyFont: {
                      size: 12,
                    },
                    padding: 12,
                  },
                  title: {
                    display: true,
                    text: "Distribusi Kas Desa",
                    color: "#000",
                    font: {
                      size: 12,
                      weight: "semibold",
                    },
                    padding: {
                      bottom: 30,
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#4B5563",
                      font: {
                        size: 14,
                      },
                    },
                  },
                  y: {
                    grid: {
                      color: "#D1D5DB",
                      borderDash: [5, 5],
                    },
                    ticks: {
                      color: "#4B5563",
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
                layout: {
                  padding: {
                    top: 0,
                    bottom: 20,
                    left: 10,
                    right: 10,
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

export default KasUser;
