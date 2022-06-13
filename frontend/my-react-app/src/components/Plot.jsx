import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  aspectRatio: 1.5,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "User Statistics",
      font: {
        size: 20,
      },
      color: "#bdc1c6",
    },
    legend: {
      labels: {
        font: {
          size: 14,
        },
        color: "#bdc1c6",
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
    y: {
      type: "linear",
      display: true,
      position: "left",
      ticks: {
        color: "#bdc1c6",
        font: { size: 15 },
      },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: "#bdc1c6",
        font: { size: 15 },
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Plot(props) {
  const currYearClimb = props.totalElevationGain["2022"];
  console.log(currYearClimb);
  const currYearActivities = props.totalActivites["2022"];
  const data = {
    labels,
    datasets: [
      {
        label: "Total Feet Climbed",
        data: labels.map((month, ind) => {
          const act_ind = ind + 1;
          if (act_ind in currYearClimb) {
            return currYearClimb[act_ind];
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Total Activities",
        data: labels.map((month, ind) => {
          const act_ind = ind + 1;
          if (act_ind in currYearActivities) {
            return currYearActivities[act_ind];
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
