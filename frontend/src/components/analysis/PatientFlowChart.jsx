// PatientFlowChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { patientFlowData } from './data'; // Import the data

const PatientFlowChart = () => {
  return (
    <div>
      <h3>Patient Flow</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={patientFlowData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ThisMonth" stroke="#8884d8" />
          <Line type="monotone" dataKey="LastMonth" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientFlowChart;
