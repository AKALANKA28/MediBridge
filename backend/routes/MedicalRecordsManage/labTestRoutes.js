const express = require('express');
const router = express.Router();
const {
  saveTest,
  getAllTests,
  getTestById,
  updateTestById,
  deleteTest
} = require('../../controller/MedicalRecordsManage/labTestController'); // Import the Test controller

// Route to save a new test
router.post('/add', saveTest);

// Route to retrieve all tests
router.get('/', getAllTests);

// Route to retrieve a test by ID
router.get('/labs/:id', getTestById);

// Route to update a test by ID
router.put('/update/:id', updateTestById);

// Route to delete a test by ID
router.delete('/labs/:id', deleteTest);

module.exports = router;
