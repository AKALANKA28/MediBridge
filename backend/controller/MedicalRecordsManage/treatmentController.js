const Treatment = require("../../models/MedicalRecordsManage/treatmentModel"); // Import the Treatment model
const Patient = require('../../models/patientModel'); // Import the Patient model
const mongoose = require("mongoose");

// **Controller Pattern**: This code defines a series of functions that serve as controllers for handling HTTP requests.


// Controller to handle saving a new treatment
exports.saveTreatment = async (req, res) => {
  const {
    treatment_Id,
    treatment_Name,
    doctor_Name,
    date,
    description,
    patientId,
  } = req.body;

  // **Validation Pattern**: Validates required fields before proceeding with processing.
  if (!treatment_Id  || !treatment_Name || !doctor_Name || !date || !patientId) {
    return res
      .status(400)
      .json({
        message: "Please provide all required fields, including patient ID.",
      });
  }

  // Check if the provided patientId is a valid ObjectId
  if (!mongoose.isValidObjectId(patientId)) {
    return res.status(400).json({ message: "Invalid patient ID." });
  }

  try {
    // **Repository Pattern**: Uses the Treatment model to create a new treatment document.
    const newTreatment = new Treatment({
      treatment_Id,
      treatment_Name,
      doctor_Name,
      date,
      description
    });

    const savedTreatment = await newTreatment.save();

    // **Update Pattern**: Updates the patient’s profile by adding the new treatment's ID.
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { $push: { treatments: savedTreatment._id } }, // Add the treatment ID to the patient's treatments array
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res
      .status(201)
      .json({
        message: "Treatment schedule saved successfully!",
        treatment: savedTreatment,
      });
  } catch (err) {
    console.error("Failed to save treatment schedule:", err);
    // **Error Handling Pattern**: Catches errors and sends a response accordingly.
    res.status(500).json({ message: "Failed to save treatment schedule." });
  }
};

// Controller to retrieve all treatments
exports.getAllTreatments = async (req, res) => {
  try {
    // **Repository Pattern**: Uses the Treatment model to fetch all treatments.
    const treatments = await Treatment.find();
    return res.status(200).json(treatments);
  } catch (err) {
    console.error("Failed to retrieve treatments:", err);
    // **Error Handling Pattern**: Catches errors and sends a response accordingly.
    return res.status(500).json({ message: "Failed to retrieve treatments." });
  }
};

// Controller to retrieve a treatment by ID
exports.getTreatmentById = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid treatment ID." });
  }

  try {
    // **Repository Pattern**: Uses the Treatment model to find a treatment by ID.
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found." });
    }
    return res.status(200).json(treatment);
  } catch (error) {
    console.error("Failed to retrieve treatment by ID:", error);
    // **Error Handling Pattern**: Catches errors and sends a response accordingly.
    return res.status(500).json({ message: "Failed to retrieve treatment." });
  }
};

// Controller to update a treatment by ID
exports.updateTreatmentById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid treatment ID." });
  }

  try {
    console.log('Updating treatment with ID:', id);
    console.log('Data to update:', updateData);

    // **Repository Pattern**: Uses the Treatment model to find and update a treatment by ID.
    const updatedTreatment = await Treatment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true  // Ensure Mongoose validates the updated data
    });

    if (!updatedTreatment) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    return res.status(200).json({
      message: "Treatment updated successfully.",
      treatment: updatedTreatment,
    });
  } catch (error) {
    console.error("Failed to update treatment:", error);
    // **Error Handling Pattern**: Catches errors and sends a response accordingly.
    return res.status(500).json({ message: "Failed to update treatment." });
  }
};

// Controller to delete a treatment by ID
exports.deleteTreatment = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid treatment ID." });
  }

  try {
    // **Repository Pattern**: Uses the Treatment model to find and delete a treatment by ID.
    const result = await Treatment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    return res.status(200).json({ message: "Treatment deleted successfully." });
  } catch (err) {
    console.error("Failed to delete treatment:", err);
    // **Error Handling Pattern**: Catches errors and sends a response accordingly.
    return res.status(500).json({ message: "Failed to delete treatment." });
  }
};
