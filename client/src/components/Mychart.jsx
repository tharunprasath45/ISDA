import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MyChart = ({ height = 300 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan-Feb", "Mar-Apr", "May-Jun", "Jul-Aug", "Sep-Oct", "Nov-Dec"],
        datasets: [
          {
            label: "Employment Insights (2025)", // ✅ changed name
            data: [12, 19, 3, 5, 8, 13],
            backgroundColor: "#9f9f9f",
            borderRadius: 6, // optional: rounded bars
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
        },
        plugins: {
          legend: {
            display: true, // change to false if you want to remove it
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // ✅ remove vertical lines
            },
          },
          y: {
            min: 0,      // ✅ side value start
            max: 25,     // ✅ side value end
            ticks: {
              stepSize: 5, // ✅ step size
            },
            grid: {
              display: false, // ✅ remove horizontal lines
            },
          },
        },
      },
    });

    return () => {
      chartRef.current.destroy();
    };
  }, [height]);

  return (
    <div style={{ width: "540px", height: `${height}px` }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MyChart;
