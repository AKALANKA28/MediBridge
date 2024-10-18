// EquipmentAvailabilityChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { equipmentAvailabilityData } from './data'; // Import the data

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EquipmentAvailabilityChart = () => {
  return (
    <div>
      <h3>Medical Equipment Availability</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={equipmentAvailabilityData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {equipmentAvailabilityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquipmentAvailabilityChart;
