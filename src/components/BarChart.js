import React from "react";
import { Bar } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto';

function BarChart({ chartData }) {

  const barColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
  ];

  chartData.datasets.forEach((dataset, index) => {
    dataset.backgroundColor = barColors[index];
    dataset.borderColor = barColors[index];
  });

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        scales: {
          x: {
            ticks: {
              font: {
                size: 16, // Ajuste la taille de la police des étiquettes de l'axe des X
              }
            },
            title: {
              display: true,
              text: 'Mois',
              font: {
                size: 20, // Ajuste la taille de la police du titre de l'axe des X
              }
            }
          },
          y: {
            ticks: {
              font: {
                size: 16, // Ajuste la taille de la police des étiquettes de l'axe des Y
              }
            },
            title: {
              display: true,
              text: 'Réclamations',
              font: {
                size: 20, // Ajuste la taille de la police du titre de l'axe des Y
              }
            }
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 25, // Ajuste la taille de la police de la légende
              },
            },
          },
          tooltip: {
            titleFont: {
              size: 18, // Ajuste la taille de la police du titre de l'info-bulle
            },
            bodyFont: {
              size: 16, // Ajuste la taille de la police du corps de l'info-bulle
            }
          }
        }
      }}
    />
  );
}


export default BarChart;