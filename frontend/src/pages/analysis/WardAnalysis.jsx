// Analysis.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Analysis.css'; // Import the CSS file for styling
import WardKPISection from "../../components/analysis/WardKPISection";
import WardCapacityChart from "../../components/analysis/WardCapacityChart";
import WardPatientsTable from "../../components/analysis/WardPatientsTable";
import CreateWardForm from "../../components/analysis/CreateWardForm";

const WardAnalysis = () => {

  return (
<div>
    <WardKPISection/>
    <div className="charts-container">
        <div className="chart">
          <WardCapacityChart/>
        </div>
      </div>
      <div className="table-container">
        <WardPatientsTable />
      </div>
</div>
  );
};

export default WardAnalysis;
<div>
<CreateWardForm/>
</div>