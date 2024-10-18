// PeakTimesChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { peakTimesData } from './data'; // Import the data

const PeakTimesChart = () => {
  return (
    <div>
      <h3>Peak Times</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={peakTimesData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="6AM-12PM" stackId="a" fill="#8884d8" />
          <Bar dataKey="12PM-6PM" stackId="a" fill="#82ca9d" />
          <Bar dataKey="6PM-12AM" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PeakTimesChart;
