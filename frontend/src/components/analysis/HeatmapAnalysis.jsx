import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeatMapGrid } from "react-grid-heatmap";
//import "./Heatmap.scss"; // Your custom styling

const HeatmapAnalysis = () => {
  const [period, setPeriod] = useState("today");
  const [data, setData] = useState([]);
  const [maxVisits, setMaxVisits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/analysis/peak?period=${period}`);
        const visitData = response.data;
        setData(visitData.data);
        setMaxVisits(visitData.max);
      } catch (error) {
        console.error("Error fetching peak time data", error);
      }
    };

    fetchData();
  }, [period]);

  const timeSlots = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div>
      <h2>Patient Visit Peak Times</h2>
      
      {/* Dropdown to select period */}
      <div className="filter-bar">
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="today">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      {/* Heatmap Grid */}
      <HeatMapGrid
        data={data}
        xLabels={timeSlots}
        yLabels={daysOfWeek}
        cellStyle={(background, value) => ({
          background: `rgba(0, 151, 230, ${value / maxVisits})`,
          fontSize: "12px",
          color: "#000",
        })}
        cellHeight="30px"
        xLabelsPos="bottom"
        yLabelsPos="left"
        square
      />
    </div>
  );
};

export default HeatmapAnalysis;
