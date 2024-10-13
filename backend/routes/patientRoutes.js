// routes/patientRoutes.js
const express = require('express');
const { registerPatient, loginPatient } = require('../controller/patientController');
const router = express.Router();

// Register a new patient
router.post('/register', registerPatient);

// Login patient
router.post('/login', loginPatient);

module.exports = router;




// // routes/patientRoutes.js
// const express = require("express");
// const { protect, authorize } = require("../middleware/authMiddleware");
// const { getAppointments, createAppointment } = require("../controllers/patientController");

// const router = express.Router();

// // Patient routes
// router.route("/appointments").get(protect, authorize("patient"), getAppointments);
// router.route("/appointments/new").post(protect, authorize("patient"), createAppointment);

// module.exports = router;
