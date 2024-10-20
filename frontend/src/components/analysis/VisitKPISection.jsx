import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Define the KPI section component
const VisitKPISection = () => {
  const [kpiData, setKPIData] = useState({
    totalVisitsToday: 0,
    totalVisitsWeek: 0,
    totalVisitsMonth: 0,
    patientVisitGrowthRate: 0,
  });

  // Fetch KPI data from your API
  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        const response = await axios.get("/api/analysis/kpi"); // Example API endpoint
        setKPIData(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching KPI data", error); // Handle any errors
      }
    };

    fetchKPIData(); // Fetch data on component mount
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 2 }}>
      {/* Total Visits Today */}
      <Card sx={{ minWidth: 200, backgroundColor: "lightblue", padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Total Visits Today</Typography>
          <Typography variant="h5" color="textPrimary">
            {kpiData.totalVisitsToday}
          </Typography>
          <Box display="flex" alignItems="center">
            <KeyboardArrowUpIcon color="success" />
            <Typography color="success">
              {kpiData.patientVisitGrowthRate}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Total Visits This Week */}
      <Card sx={{ minWidth: 200, backgroundColor: "lightgreen", padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Total Visits This Week</Typography>
          <Typography variant="h5" color="textPrimary">
            {kpiData.totalVisitsWeek}
          </Typography>
          <Box display="flex" alignItems="center">
            <KeyboardArrowUpIcon color="success" />
            <Typography color="success">
              {kpiData.patientVisitGrowthRate}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Total Visits This Month */}
      <Card sx={{ minWidth: 200, backgroundColor: "lightcoral", padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Total Visits This Month</Typography>
          <Typography variant="h5" color="textPrimary">
            {kpiData.totalVisitsMonth}
          </Typography>
          <Box display="flex" alignItems="center">
            <KeyboardArrowUpIcon color="success" />
            <Typography color="success">
              {kpiData.patientVisitGrowthRate}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Patient Visit Growth Rate */}
      <Card sx={{ minWidth: 200, backgroundColor: "lightyellow", padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Patient Visit Growth Rate</Typography>
          <Typography variant="h5" color="textPrimary">
            {kpiData.patientVisitGrowthRate}%
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VisitKPISection;
