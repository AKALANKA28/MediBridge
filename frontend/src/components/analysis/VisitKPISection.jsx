import React, { useState, useEffect } from "react";
import Widget from "../widget/Widget"; // Assuming Widget component is imported from another file
import axios from "axios";

const VisitKPISection = () => {
  const [kpiData, setKPIData] = useState({
    totalVisitsToday: 0,
    totalVisitsWeek: 0,
    totalVisitsMonth: 0,
    visitGrowthRate: 0,
  });

  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        const response = await axios.get("/api/kpi/patient-visits"); // Assuming this is the correct endpoint
        setKPIData(response.data);
      } catch (error) {
        console.error("Error fetching KPI data", error);
      }
    };

    fetchKPIData();
  }, []);

  return (
    <div className="kpi-section">
      <Widget
        type="user"
        amount={kpiData.totalVisitsToday}
        diff={kpiData.visitGrowthRate} // You can customize this as per your growth rate logic
      />
      <Widget
        type="order"
        amount={kpiData.totalVisitsWeek}
        diff={kpiData.visitGrowthRate} // Same growth rate here if needed, else customize
      />
      <Widget
        type="earning"
        amount={kpiData.totalVisitsMonth}
        diff={kpiData.visitGrowthRate} // Customize diff if you want a different logic
      />
      <Widget
        type="balance"
        amount={kpiData.visitGrowthRate}
        diff={kpiData.visitGrowthRate} // You can show growth rate here or use a different logic
      />
    </div>
  );
};

export default VisitKPISection;
