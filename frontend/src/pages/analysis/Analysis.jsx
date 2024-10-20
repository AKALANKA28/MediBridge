// Analysis.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Analysis.css'; // Import the CSS file for styling
import VisitsDatatable from '../../components/analysis/VisitsDatatable';
import DayPeakTimeChart from '../../components/analysis/DayPeakTimeChart';
import PeriodPeakTimeChart from "../../components/analysis/PeriodPeakTimeChart";
import VisitKPISection from "../../components/analysis/VisitKPISection";
import ReportButtons from "../../components/analysis/ReportButtons";
import VisitReportButton from "../../components/analysis/VisitReportButton";




const Analysis = () => {

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
      <h1>Analysis Dashboard</h1>
      {/* <div className="kpi-section">
        <VisitReportButton />
      </div> */}
      <div className="charts-container">
        <div className="chart">
          <DayPeakTimeChart data={data}/>
        </div>
        <div className="chart">
          <PeriodPeakTimeChart />
        </div>
      </div>
      <div className="table-container">
        <VisitsDatatable />
      </div>
    </div>
  );
};

export default Analysis;
