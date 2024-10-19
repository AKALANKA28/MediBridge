import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
} from "@mui/material";

const LabForm = ({ initialData, patientId }) => {
  const [formData, setFormData] = useState({
    test_Id: initialData?.test_Id || "",
    test_Name: initialData?.test_Name || "",
    test_result: initialData?.test_result || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });

  // Effect to update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        test_Id: initialData.test_Id,
        test_Name: initialData.test_Name,
        test_result: initialData.test_result,
        date: initialData.date,
        description: initialData.description,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure patientId is included
    if (!patientId) {
      alert("Patient ID is required");
      return;
    }

    const submitData = {
      ...formData,
      patientId, // Include patientId in the submitted data
    };

    // Log the data to be submitted
    console.log("Submitting data:", submitData);

    try {
      // Send the form data to the backend
      const response = await axios.post("http://localhost:8080/tests/add", submitData);
      alert(response.data.message || "Lab test added successfully");
      // Optionally reset the form or handle post-submission actions here
    } catch (error) {
      console.error("Error adding lab test:", error);
      alert("Failed to add lab test");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: "auto", marginTop: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Lab Test Form
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Lab Test ID"
            name="test_Id"
            value={formData.test_Id}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Test Name"
            name="test_Name"
            value={formData.test_Name}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Test Results"
            name="test_result"
            value={formData.test_result}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            variant="outlined"
          />
        </FormControl>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LabForm;
