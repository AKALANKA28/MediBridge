// Analysis.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EquipmentTable from "../../components/analysis/EquipmentTable";
import MaintenanceTable from "../../components/analysis/MachineStatusPieChart";
import MachineStatusPieChart from "../../components/analysis/MachineStatusPieChart";
import CreateWardForm from "../../components/analysis/CreateWardForm";
import AdmitPatientForm from "../../components/analysis/AdmitPatientForm";
import WardList from "../../components/analysis/WardList";
import AddEquipmentForm from "../../components/analysis/AddEquipmentForm";
import WardPatientsTable from "../../components/analysis/WardPatientsTable";

const EquipmentAnalysis = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPeakTimes = async () => {
      try {
        const response = await axios.get("/api/analysis/peakday?period=today");
        setData(response.data.data);
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching peak time data:", error);
      }
    };

    fetchPeakTimes();
  }, []);



  return (

    <div className="analysis-container">
      <h1>Resources</h1>
      <div className="kpi-section">
      </div>
      <div className="charts-container">
        <div className="chart">
          <AddEquipmentForm />
        </div>
        <div className="chart">
          <MachineStatusPieChart/>
        </div>
      </div>
     <div className="table-container">
        <EquipmentTable />
      </div>
  
    </div>
  );
};

export default EquipmentAnalysis;
