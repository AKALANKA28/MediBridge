// controllers/patientController.js
const Patient = require('../models/PatientModelss');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerPatient = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Check if the patient already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) return res.status(400).json({ message: 'Email already registered' });

        // Create new patient
        const newPatient = new Patient({ fullName, email, password });
        await newPatient.save();
        
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error });
    }
};

const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the patient by email
        const patient = await Patient.findOne({ email });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        // Validate password
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: patient._id }, 'secretKey', { expiresIn: '1h' });

        res.json({ token, patientId: patient._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { registerPatient, loginPatient };



// // controllers/patientController.js
// exports.getAppointments = async (req, res) => {
//     // Logic for patient to get their appointments
//   };
  
//   exports.createAppointment = async (req, res) => {
//     // Logic for patient to create a new appointment
//   };
  