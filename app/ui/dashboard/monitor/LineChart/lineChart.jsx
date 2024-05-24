"use client";

import React, { useRef, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';



function hexToRgba(color, alpha) {
    let [r, g, b] = color.match(/\d+/g); // Extract r, g, b values
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


const options = {
    scales: {
        x: {
            type: 'category',
            max: 8,
            maxTicksLimit:8,
            suggestedMax:8,
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
    animation: {
        duration: 0, // shorter animation duration for smoother updates
        easing: 'linear' // linear easing for continuous motion
    }
};

const LineChart = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current;
            const ctx = chartInstance.ctx;

            const updatedChartData = {
                ...chartData,
                datasets: chartData.datasets.map(dataset => {
                    const color = dataset.backgroundColor || 'rgba(75,192,192,1)';
                    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                    gradient.addColorStop(0, hexToRgba(color, 0.7));
                    gradient.addColorStop(1, hexToRgba(color, 0.1));

                    return {
                        ...dataset,
                        backgroundColor: gradient,
                        borderColor: color,
                    };
                })
            };

            chartInstance.data = updatedChartData;
            chartInstance.update();
        }
    }, [chartData]);

    return (
        <Line ref={chartRef} data={chartData} options={options} />
    );
};

export default LineChart;
