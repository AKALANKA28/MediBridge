import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
} from "@mui/material";

const TreatmentForm = ({ initialData, patientId }) => {
  const [formData, setFormData] = useState({
    treatment_Id: initialData?.treatment_Id || "",
    treatment_Name: initialData?.treatment_Name || "",
    doctor_Name: initialData?.doctor_Name || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });

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
      const response = await axios.post("http://localhost:8080/treatments/add", submitData);
      alert(response.data.message || "Treatment added successfully");
    } catch (error) {
      console.error("Error adding treatment:", error);
      alert("Failed to add treatment");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: "auto", marginTop: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Treatment Form
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Treatment ID"
            name="treatment_Id"
            value={formData.treatment_Id}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Treatment Name"
            name="treatment_Name"
            value={formData.treatment_Name}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Doctor Name"
            name="doctor_Name"
            value={formData.doctor_Name}
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

export default TreatmentForm;
