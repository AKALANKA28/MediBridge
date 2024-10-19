import React from "react";
import axios from "axios"; // Add this line to import axios
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography, // Import Typography
} from "@mui/material";

const LabTable = ({ data, onEdit }) => {
  const handleEdit = (item) => {
    onEdit(item);
  };

  const handleDelete = async (labId) => {
    // Implement delete logic here (e.g., make an API call to delete the lab test)
    try {
      const response = await axios.delete(`http://localhost:8080/tests/delete/${labId}`);
      alert(response.data.message || "Lab test deleted successfully");
      // Optionally, refresh the data or notify the parent component to refresh
    } catch (error) {
      console.error("Error deleting lab test:", error);
      alert("Failed to delete lab test");
    }
  };

  return (
    <Paper sx={{ marginTop: 3, padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Lab Test Details
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lab Test ID</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Test Results</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.test_Id}>
                <TableCell>{item.test_Id}</TableCell>
                <TableCell>{item.test_Name}</TableCell>
                <TableCell>{item.test_result}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item.test_Id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LabTable;
