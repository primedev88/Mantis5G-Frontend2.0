"use client";

import React, { useRef, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

// Helper function to convert a color to a lighter version
// const getLighterColor = (color, opacity) => {
//     let r, g, b;

//     if (color.startsWith('#')) {
//         const bigint = parseInt(color.slice(1), 16);
//         r = (bigint >> 16) & 255;
//         g = (bigint >> 8) & 255;
//         b = bigint & 255;
//     } else if (color.startsWith('rgb')) {
//         [r, g, b] = color.match(/\d+/g).map(Number);
//     } else {
//         return color;
//     }

//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

const options = {
    scales: {
        x: {
            type: 'category',
            max: 8,
            maxTicksLimit: 40,
            suggestedMax: 40,
            grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.1)'
            }
        },
        y: {
            grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.1)'
            }
        }
    },
    plugins: {
        legend: {
            display: false // Show the legend to differentiate the datasets
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
};

const LineChart = ({ chartData }) => {
    // const chartRef = useRef(null);

    // useEffect(() => {
    //     if (chartRef.current) {
    //         const chartInstance = chartRef.current;
    //         const ctx = chartInstance.ctx;

    //         const updatedChartData = {
    //             ...chartData,
    //             datasets: chartData.datasets.map(dataset => {
    //                 const color = dataset.borderColor || 'rgba(75,192,192,1)';
    //                 const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    //                 gradient.addColorStop(0, color);
    //                 gradient.addColorStop(1, getLighterColor(color, 0.1));

    //                 return {
    //                     ...dataset,
    //                     backgroundColor: gradient,
    //                     borderColor: color,
    //                 };
    //             })
    //         };

    //         chartInstance.data = updatedChartData;
    //         chartInstance.update();
    //     }
    // }, [chartData]);

    return (
        <Line  data={chartData} options={options} />
    );
};

export default LineChart;
