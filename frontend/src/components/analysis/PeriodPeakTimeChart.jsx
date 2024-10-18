import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PeriodPeakTimeChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("this_week"); // Default period is this week

  useEffect(() => {
    const fetchPeakTimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/analysis/peakperiod?period=${period}`);
        setData(response.data.data);
        console.log("Fetched peak time data:", response.data);
      } catch (error) {
        console.error("Error fetching peak time data:", error);
      }
    };

    fetchPeakTimes();
  }, [period]); // Refetch data when the period changes

  // Data for the chart
  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Labels for hours (0:00 to 23:00)
    datasets: [
      {
        label: 'Number of Visits',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of the Day',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Visits',
        },
      },
    },
  };

  return (
    <div>
      <h2>Patient Visit Peak Times</h2>

      {/* Dropdown to select the period */}
      <div className="period-selector">
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      {/* Bar chart */}
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PeriodPeakTimeChart;
