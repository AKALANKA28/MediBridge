import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './styles/EquipmentTable.css'; // Ensure you have the CSS file

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const MachineStatusPieChart = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [statusData, setStatusData] = useState({ available: 0, inUse: 0, underMaintenance: 0 });

  // Fetch all equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('/api/equipment/equipment');
        const equipment = response.data;

        // Count each status type
        const statusCounts = {
          available: 0,
          inUse: 0,
          underMaintenance: 0,
        };

        equipment.forEach((item) => {
          switch (item.status) {
            case 'Available':
              statusCounts.available++;
              break;
            case 'In Use':
              statusCounts.inUse++;
              break;
            case 'Under Maintenance':
              statusCounts.underMaintenance++;
              break;
            default:
              break;
          }
        });

        setStatusData(statusCounts);
        setEquipmentList(equipment);
      } catch (error) {
        console.error('Error fetching equipment data', error);
      }
    };

    fetchEquipment();
  }, []);

  // Data for the pie chart
  const data = {
    labels: ['Available', 'In Use', 'Under Maintenance'],
    datasets: [
      {
        label: 'Machine Status',
        data: [statusData.available, statusData.inUse, statusData.underMaintenance],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'], // Colors for each status
        hoverBackgroundColor: ['#45a049', '#e0a800', '#d32f2f'],
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <h2>Machine Status Overview</h2>
      <Pie data={data} />
    </div>
  );
};

export default MachineStatusPieChart;
