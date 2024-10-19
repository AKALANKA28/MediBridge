// components/KPISection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WardWidget from './widget/WardWidget';

const WardKPISection = () => {
  const [kpiData, setKpiData] = useState({
    totalWards: 0,
    availableBeds: 0,
    totalAdmittedPatients: 0,
    patientAdmissionRate: 0,
  });

  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        const response = await axios.get('api/ward/kpis');
        setKpiData(response.data);
      } catch (error) {
        console.error('Error fetching KPI data', error);
      }
    };

    fetchKPIData();
  }, []);

  return (
    <div className="kpi-section">
      <WardWidget
        type="totalWards"
        amount={kpiData.totalWards}
        diff={0} // Assuming static for now, or calculate changes
      />
      <WardWidget
        type="availableBeds"
        amount={kpiData.availableBeds}
        diff={5} // Example percentage difference (could be dynamic)
      />
      <WardWidget
        type="totalAdmittedPatients"
        amount={kpiData.totalAdmittedPatients}
        diff={-3} // Example percentage difference (could be dynamic)
      />
      <WardWidget
        type="patientAdmissionRate"
        amount={kpiData.patientAdmissionRate}
        diff={10} // Example percentage difference (could be dynamic)
      />
    </div>
  );
};

export default WardKPISection;
