// KPISection.jsx
import React from 'react';

const KPISection = () => {
  const kpiContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const kpiCardStyles = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flex: '1',
    margin: '0 10px',
    textAlign: 'center',
  };

  return (
    <div style={kpiContainerStyles}>
      <div style={kpiCardStyles}>
        <h3>250</h3>
        <p>OPD Today</p>
      </div>
      <div style={kpiCardStyles}>
        <h3>89</h3>
        <p>Relieved Today</p>
      </div>
      <div style={kpiCardStyles}>
        <h3>300</h3>
        <p>In Patient Today</p>
      </div>
      <div style={kpiCardStyles}>
        <h3>52</h3>
        <p>Total Staff</p>
      </div>
    </div>
  );
};

export default KPISection;
