// components/WardCapacityChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const WardCapacityChart = () => {
  const [wardsData, setWardsData] = useState([]);

  // Fetch wards and their capacities
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('api/ward/');
        setWardsData(response.data);
      } catch (error) {
        console.error('Error fetching ward data', error);
      }
    };

    fetchWards();
  }, []);

  // Prepare data for the chart
  const wardNames = wardsData.map(ward => ward.name);
  const capacities = wardsData.map(ward => ward.capacity);
  const currentPatients = wardsData.map(ward => ward.currentPatients.length);
  const availableCapacity = capacities.map((capacity, index) => capacity - currentPatients[index]);

  const data = {
    labels: wardNames, // X-axis labels (Ward names)
    datasets: [
      {
        label: 'Current Patients',
        data: currentPatients, // Data for current patients
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for current patients
      },
      {
        label: 'Available Capacity',
        data: availableCapacity, // Data for available capacity
        backgroundColor: 'rgba(153, 102, 255, 0.6)', // Color for available capacity
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Y-axis starts at 0
      },
    },
  };

  return (
    <div>
      <h2>Ward Capacity Visualization</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WardCapacityChart;
