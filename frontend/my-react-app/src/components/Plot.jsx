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
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "User Statistics",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
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
  console.log(props.totalActivites);
  const currYearClimb = props.totalElevationGain["2022"];
  const currYearActivities = props.totalActivites["2022"];
  const data = {
    labels,
    datasets: [
      {
        label: "Total Feet Climbed",
        data: labels.map((month, ind) => {
          if (ind in currYearClimb) {
            console.log(ind);
            return currYearClimb[ind];
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
          if (ind in currYearActivities) {
            return currYearActivities[ind];
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
