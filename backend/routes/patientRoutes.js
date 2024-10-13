// routes/patientRoutes.js
const express = require('express');
const { registerPatient, loginPatient } = require('../controller/patientController');
const router = express.Router();

// Register a new patient
router.post('/register', registerPatient);

// Login patient
router.post('/login', loginPatient);

module.exports = router;
