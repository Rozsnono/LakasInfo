// components/DonutChart.tsx
"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ data, labels, colors }: { data: any, labels: any, colors: any }) {
    const dataSet = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors,
                borderColor: "#d1d5db", // háttérhez illő sötét keret (dark mode)
                borderWidth: 2,
            },
        ],
    };

    const options = {
        cutout: "60%",
        borderRadius: 10,
        spacing: 10,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#d1d5db", // Tailwind text-gray-300 (fehér-szürke a dark mode-hoz)
                },
            },
            tooltip: false
        },
    };

    return (
        <div className="max-w-lg">
            <Doughnut data={dataSet} options={options as any} />
        </div>
    );
}


export default DonutChart;
