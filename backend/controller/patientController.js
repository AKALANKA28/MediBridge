const mongoose = require('mongoose'); // Import mongoose
const Patient = require("../models/patientModel"); // Import the Patient model

// Controller to retrieve a patient profile with populated fields
exports.getPatientProfile = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid patient ID." });
  }

  try {
    // Find the patient by ID and populate all referenced fields
    const patient = await Patient.findById(id)
      .populate("user") // Populate the user (Patient owner)

      .populate("treatments"); // Populate treatment details

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Failed to retrieve patient profile:", error);
    res.status(500).json({ message: "Failed to retrieve patient profile." });
  }
};
