// routes/patientRoutes.js
const express = require("express");
const router = express.Router();

const patientController = require("../controller/patientController");

router.get("/:id", patientController.getPatientProfile);
module.exports = router;
