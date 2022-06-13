import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const footer = (tooltipItems) => {
  let sum = 0;

  tooltipItems.forEach(function (tooltipItem) {
    sum += tooltipItem.parsed.y;
  });
  return sum;
};
export const options = {
  responsive: true,
  aspectRatio: 1.7,
  animation: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 14,
        },
        color: "#bdc1c6",
      },
      position: "top",
    },
    title: {
      display: true,
      text: "Elevation Profile",
      font: {
        size: 20,
      },
      color: "#bdc1c6",
    },
    decimation: true,
    tooltip: {
      callbacks: {
        footer: footer,
      },
    },
  },
  scales: {
    xAxis: {
      ticks: {
        color: "#bdc1c6",
        font: { size: 15 },
      },
    },
    yAxis: {
      ticks: {
        color: "#bdc1c6",
        font: { size: 15 },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
};

export function ElevationPlot(props) {
  const labels = props.elevation.map((elevation, ind) => ind);

  const data = {
    labels,
    datasets: [
      {
        label: "Elevation in meters",
        data: props.elevation.map((elevation) => elevation),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(11, 300, 1, 0.1)",
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.5,
      },
    ],
  };

  return (
    <div className="elevation-plot">
      <Line options={options} data={data} />
    </div>
  );
}
