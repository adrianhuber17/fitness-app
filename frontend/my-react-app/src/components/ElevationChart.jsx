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
  animation: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Elevation Profile",
    },
    decimation: true,
    tooltip: {
      callbacks: {
        footer: footer,
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

  return <Line options={options} data={data} />;
}
