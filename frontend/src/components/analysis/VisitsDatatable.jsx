// Import necessary hooks and components
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import VisitReportButton from "./VisitReportButton";

// Filter Component
const FilterBar = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [department, setDepartment] = useState('');
  const [type, setType] = useState('');

  const handleApplyFilter = () => {
    onFilter({ startDate, endDate, department, type });
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setDepartment('');
    setType('');
    onFilter({ startDate: '', endDate: '', department: '', type: '' });
  };

  const today = new Date().toISOString().split('T')[0]; // Today's date in 'YYYY-MM-DD' format
  const minEndDate = startDate || today;

  return (
    <div className="filterBar">
      <div>
        <label htmlFor="startDate">From:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          max={today}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">To:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          min={minEndDate}
          max={today}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Neurology">Neurology</option>
        {/* Add more departments as needed */}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="OPD">OPD</option>
        <option value="Emergency">Emergency</option>
      </select>
      <button onClick={handleApplyFilter}>Apply Filter</button>
      <button onClick={handleResetFilter}>Reset Filters</button>
      <VisitReportButton/>
    </div>
  );
};

const List = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  const recordsPerPage = 10; // Number of records to show per page

  // Fetch patient visit data from API
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get("/api/analysis/visits");
        setData(response.data);
        setFilteredData(response.data); // Initialize with all data
      } catch (error) {
        console.error("Error fetching patient visit data", error);
      }
    };

    fetchPatientData();
  }, []);

  // Filter handler
  const handleFilter = (filters) => {
    let filtered = data;

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter((visit) => {
        const visitDate = new Date(visit.visitDate);
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;
        return (!start || visitDate >= start) && (!end || visitDate <= end);
      });
    }

    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter((visit) => visit.department === filters.department);
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter((visit) => visit.type === filters.type);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Calculate the indexes for the current page data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Pagination controls
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / recordsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <FilterBar onFilter={handleFilter} />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Patient ID</TableCell>
              <TableCell className="tableCell">Visit Date</TableCell>
              <TableCell className="tableCell">Visit Time</TableCell>
              <TableCell className="tableCell">Department</TableCell>
              <TableCell className="tableCell">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row.patientID}</TableCell>
                <TableCell className="tableCell">{new Date(row.visitDate).toLocaleDateString()}</TableCell>
                <TableCell className="tableCell">{new Date(row.visitDate).toLocaleTimeString()}</TableCell>
                <TableCell className="tableCell">{row.department}</TableCell>
                <TableCell className="tableCell">{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {Math.ceil(filteredData.length / recordsPerPage)} </span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / recordsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default List;
