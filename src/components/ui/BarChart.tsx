// components/MonthlyBarChart.tsx
"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const BarChart = ({ color, labels, data, average }: { color: string, labels: string[], data: number[], average: number }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Átlag",
                data: new Array(labels.length).fill(average),
                backgroundColor: '#ffffff',
                borderRadius: 10,
                barPercentage: 0.1,
            },
            {
                label: "Fogyasztás",
                data: data,
                backgroundColor: color,
                borderRadius: 10,
                barPercentage: 0.6,
            },
        ],
    };

    console.log("BarChart Data:", chartData);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#d1d5db",
                },
                grid: {
                    display: false
                },
                stacked: true
            },
            y: {
                ticks: {
                    color: "#d1d5db",
                },
                grid: {
                    color: "#37415150",
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: "kWh",
                    color: "#d1d5db",
                },
            },
        },
    };

    return (
        <Bar data={chartData as any} options={options} />
    );
};

export default BarChart;
