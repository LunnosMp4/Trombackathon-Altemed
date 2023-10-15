import React from "react";
import { Bar } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto';

function BarChart({ chartData }) {
  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 30, // Ajuste la taille de la police de la légende
              },
            },
          },
        },
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