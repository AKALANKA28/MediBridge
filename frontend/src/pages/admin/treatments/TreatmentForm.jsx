import React, { useState } from "react"; // Import React and hooks
import axios from "axios"; // Import axios for HTTP requests
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
  FormHelperText,
} from "@mui/material"; // Material UI components

const TreatmentForm = ({ initialData, patientId }) => {
  // State management for form data and errors (State Pattern)
  const [formData, setFormData] = useState({
    treatment_Id: initialData?.treatment_Id || "", // Initialize with existing data or empty
    treatment_Name: initialData?.treatment_Name || "",
    doctor_Name: initialData?.doctor_Name || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });
  
  const [errors, setErrors] = useState({}); // State for form errors (State Pattern)

  // Handle input change and clear errors
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for the current input when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required"; // Set error for empty fields
      }
    });
    // Return errors if there are any
    return newErrors;
  };

  // Handle form submission
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

    // Validate form before submission
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors
      return; // Exit if there are validation errors
    }

    // Log the data to be submitted
    console.log("Submitting data:", submitData);

    try {
      // Send the form data to the backend
      const response = await axios.post("http://localhost:8080/treatments/add", submitData);
      alert(response.data.message || "Treatment added successfully");
      // Optionally reset form data after successful submission
      setFormData({
        treatment_Id: "",
        treatment_Name: "",
        doctor_Name: "",
        date: "",
        description: "",
      });
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
        {/* Treatment ID Input */}
        <FormControl fullWidth margin="normal" error={!!errors.treatment_Id}>
          <TextField
            label="Treatment ID"
            name="treatment_Id"
            value={formData.treatment_Id}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
          {errors.treatment_Id && <FormHelperText>{errors.treatment_Id}</FormHelperText>}
        </FormControl>

        {/* Treatment Name Input */}
        <FormControl fullWidth margin="normal" error={!!errors.treatment_Name}>
          <TextField
            label="Treatment Name"
            name="treatment_Name"
            value={formData.treatment_Name}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
          {errors.treatment_Name && <FormHelperText>{errors.treatment_Name}</FormHelperText>}
        </FormControl>

        {/* Doctor Name Input */}
        <FormControl fullWidth margin="normal" error={!!errors.doctor_Name}>
          <TextField
            label="Doctor Name"
            name="doctor_Name"
            value={formData.doctor_Name}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
          {errors.doctor_Name && <FormHelperText>{errors.doctor_Name}</FormHelperText>}
        </FormControl>

        {/* Date Input */}
        <FormControl fullWidth margin="normal" error={!!errors.date}>
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
          {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
        </FormControl>

        {/* Description Input */}
        <FormControl fullWidth margin="normal" error={!!errors.description}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            variant="outlined"
            multiline
            rows={4}
          />
          {errors.description && <FormHelperText>{errors.description}</FormHelperText>}
        </FormControl>

        {/* Submit Button */}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TreatmentForm; // Export the TreatmentForm component
