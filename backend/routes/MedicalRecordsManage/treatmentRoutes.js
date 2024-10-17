const express = require('express');
const { 
  saveTreatment, 
  getAllTreatments, 
  getTreatmentById, 
  deleteTreatment, 
  updateTreatmentById 
} = require('../../controller/MedicalRecordsManage/treatmentController'); // Correct path for the controller

const router = express.Router();

// Route to save a new treatment schedule
router.post('/add', saveTreatment);

// Route to retrieve all treatment schedules
router.get('/', getAllTreatments);

// Route to retrieve a treatment by ID
router.get('/treatments/:id', getTreatmentById);

// Route to update a treatment by ID
router.put('/treatments/:id', updateTreatmentById);

// Route to delete a treatment by ID
router.delete('/treatments/:id', deleteTreatment);

module.exports = router;
