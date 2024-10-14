const Treatment = require('../../models/MedicalRecordsManage/treatmentModel'); // Import the Treatment model
const mongoose = require('mongoose');

// Controller to handle saving a new treatment
exports.saveTreatment = async (req, res) => {
  const { treatment_Id, treatment_Name, doctor_Name, date, description } = req.body;

  // Validate required fields
  if (!treatment_Id || !treatment_Name || !doctor_Name || !date) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Create a new treatment document and save it to MongoDB
    const newTreatment = new Treatment({
      treatment_Id,
      treatment_Name,
      doctor_Name,
      date,
      description
    });

    await newTreatment.save();
    res.status(200).json({ message: "Treatment schedule saved successfully!" });
  } catch (err) {
    console.error("Failed to save treatment schedule:", err);
    res.status(500).json({ message: "Failed to save treatment schedule." });
  }
};

// Controller to retrieve all treatments
exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find();
    res.status(200).json(treatments);
  } catch (err) {
    console.error("Failed to retrieve treatments:", err);
    res.status(500).json({ message: "Failed to retrieve treatments." });
  }
};

// Controller to retrieve a treatment by ID
exports.getTreatmentById = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid treatment ID.' });
  }

  try {
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found.' });
    }
    res.status(200).json(treatment);
  } catch (error) {
    console.error('Failed to retrieve treatment by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve treatment.' });
  }
};

// Controller to update a treatment by ID
exports.updateTreatmentById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid treatment ID.' });
  }

  try {
    // Find the treatment by ID and update it with the new data
    const updatedTreatment = await Treatment.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTreatment) {
      return res.status(404).json({ message: 'Treatment not found.' });
    }
    res.status(200).json({ message: 'Treatment updated successfully.', treatment: updatedTreatment });
  } catch (error) {
    console.error('Failed to update treatment:', error);
    res.status(500).json({ message: 'Failed to update treatment.' });
  }
};

// Controller to delete a treatment by ID
exports.deleteTreatment = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid treatment ID.' });
  }

  try {
    const result = await Treatment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    res.status(200).json({ message: "Treatment deleted successfully." });
  } catch (err) {
    console.error("Failed to delete treatment:", err);
    res.status(500).json({ message: "Failed to delete treatment." });
  }
};
