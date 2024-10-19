const Test = require('../../models/MedicalRecordsManage/labTestModel'); // Import the Test model
const Patient = require('../../models/patientModel');

const mongoose = require('mongoose');

// Utility function to check valid ObjectId
const isValidObjectId = (id) => mongoose.isValidObjectId(id);

// Controller to handle saving a new test
exports.saveTest = async (req, res) => {
  const { test_Id, test_Name, test_result, date, description, patientId} = req.body;

  // Validate required fields
  if (!test_Id || !test_Name || !test_result || !date || !patientId) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Create a new test document and save it to MongoDB
    const newTest = new Test({
      test_Id,
      test_Name,
      test_result,
      date,
      description
      
    });

    await newTest.save();
    res.status(201).json({ message: "Test saved successfully!" });
  } catch (err) {
    console.error("Failed to save test:", err);
    res.status(500).json({ message: "Failed to save test.", error: err.message });
  }
};

// Controller to retrieve all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    console.error("Failed to retrieve tests:", err);
    res.status(500).json({ message: "Failed to retrieve tests.", error: err.message });
  }
};

// Controller to retrieve a test by ID
exports.getTestById = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid test ID.' });
  }

  try {
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found.' });
    }
    res.status(200).json(test);
  } catch (error) {
    console.error('Failed to retrieve test by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve test.', error: error.message });
  }
};

// Controller to update a test by ID
exports.updateTestById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if the provided ID is a valid ObjectId
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid test ID.' });
  }

  try {
    // Find the test by ID and update it with the new data
    const updatedTest = await Test.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found.' });
    }
    res.status(200).json({ message: 'Test updated successfully.', test: updatedTest });
  } catch (error) {
    console.error('Failed to update test:', error);
    res.status(500).json({ message: 'Failed to update test.', error: error.message });
  }
};

// Controller to delete a test by ID
exports.deleteTest = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid test ID.' });
  }

  try {
    const result = await Test.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Test not found." });
    }

    res.status(200).json({ message: "Test deleted successfully." });
  } catch (err) {
    console.error("Failed to delete test:", err);
    res.status(500).json({ message: "Failed to delete test.", error: err.message });
  }
};
