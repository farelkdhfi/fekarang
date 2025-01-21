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

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PekerjaanUser = () => {
  const [chartData, setChartData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const chartContainerRef = useRef(null);

  const createGradient = (ctx, chartArea, colorStart, colorEnd) => {
    const gradient = ctx.createLinearGradient(
      chartArea.left,
      chartArea.top,
      chartArea.right,
      chartArea.top
    );
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customApi.get("/pekerjaans");
        const dataArray = response.data;

        if (dataArray.length > 0) {
          const data = dataArray[0];

          setChartData({
            labels: [
              "Petani",
              "Pedagang",
              "Pengrajin",
              "Pegawai Negeri Sipil",
              "TNI",
              "Swasta",
              "Buruh/lainnya",
            ],
            datasets: [
              {
                label: "Jumlah Orang",
                data: [
                  parseInt(data.petani),
                  parseInt(data.pedagang),
                  parseInt(data.pengrajin),
                  parseInt(data.pns),
                  parseInt(data.tni),
                  parseInt(data.pensiunan),
                  parseInt(data.swasta),
                ],
                backgroundColor: (ctx) => {
                  const chart = ctx.chart;
                  const { ctx: canvasCtx, chartArea } = chart;
                  if (!chartArea) return null;

                  // Warna gradasi untuk setiap bar
                  const colors = [
                    ["#FF5733", "#FF8D57"], // Petani
                    ["#33FF57", "#57FF8D"], // Pedagang
                    ["#3357FF", "#578DFF"], // Pengrajin
                    ["#FF33A6", "#FF57C1"], // PNS
                    ["#FFFF33", "#FFFF57"], // TNI
                    ["#33FFF3", "#57FFF8"], // Pensiunan
                    ["#8E33FF", "#A057FF"], // Swasta
                  ];

                  return colors.map(([start, end]) =>
                    createGradient(canvasCtx, chartArea, start, end)
                  );
                },
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#ccc",
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
    <section className="px-6 lg:px-20 py-10 lg:py-20">
      <div
        ref={chartContainerRef}
        className="w-full max-w-4xl lg:max-w-full mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
      >
        <h2 className="text-xl lg:text-3xl font-bold text-blue-700 text-center">
          Statistik Pekerjaan Penduduk
        </h2>
        {chartData ? (
          <div className="w-full max-w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
            <Bar
              key={isVisible ? "visible" : "hidden"} // Trigger animasi saat terlihat
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y", // Membuat chart menjadi horizontal
                plugins: {
                  legend: {
                    display: false, // Menghapus legenda
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Jumlah: ${context.raw}`,
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
                    text: "Distribusi Pekerjaan",
                    color: "#000",
                    font: {
                      size: 12,
                      weight: "semibold",
                    },
                    padding: {
                      bottom: 20,
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: "#e5e5e5",
                      borderDash: [5, 5],
                    },
                    ticks: {
                      color: "#555",
                      font: {
                        size: 12,
                      },
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#555",
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
                layout: {
                  padding: {
                    top: 0,
                    bottom: 20,
                    left: 15,
                    right: 15,
                  },
                },
                animation: {
                  duration: 1500,
                  easing: "easeOutBounce", // Efek animasi
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

export default PekerjaanUser;
