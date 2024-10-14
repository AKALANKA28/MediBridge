const express = require('express');
const router = express.Router();
const {
  saveTest,
  getAllTests,
  getTestById,
  updateTestById,
  deleteTest
} = require('../../controllers/MedicalRecordsManage/labTestController'); // Import the Test controller

// Route to save a new test
router.post('/', saveTest);

// Route to retrieve all tests
router.get('/', getAllTests);

// Route to retrieve a test by ID
router.get('/:id', getTestById);

// Route to update a test by ID
router.put('/:id', updateTestById);

// Route to delete a test by ID
router.delete('/:id', deleteTest);

module.exports = router;
