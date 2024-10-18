// EquipmentTable.jsx
import React from 'react';
import { equipmentData } from './data'; // Import the data

const EquipmentTable = () => {
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f4f5f7',
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  return (
    <div>
      <h3>Equipment Availability</h3>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>#</th>
            <th style={thStyles}>Equipment Name</th>
            <th style={thStyles}>Type</th>
            <th style={thStyles}>Maintenance Date</th>
            <th style={thStyles}>Location</th>
            <th style={thStyles}>Status</th>
          </tr>
        </thead>
        <tbody>
          {equipmentData.map((item, index) => (
            <tr key={index}>
              <td style={tdStyles}>{index + 1}</td>
              <td style={tdStyles}>{item.name}</td>
              <td style={tdStyles}>{item.type}</td>
              <td style={tdStyles}>{item.maintenanceDate}</td>
              <td style={tdStyles}>{item.location}</td>
              <td style={tdStyles}>
                <span style={{ color: item.status === 'Available' ? 'green' : 'red' }}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
