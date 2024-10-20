const express = require('express');
const router = express.Router();
const { createWard ,admitPatient,getAllWards,getAvailableWards,getWardPatients,dischargePatient,getKPIData} = require('../../controller/analysis/wardController');

// Route to create a new ward
router.post('/add', createWard);
// Route to admit a patient to a ward
router.post('/:wardID/admit', admitPatient);
// Route to fetch all wards
router.get('/', getAllWards);
router.get('/available', getAvailableWards);

// Route to get patients of a specific ward
router.get('/:wardID/patients', getWardPatients);

//KPI
router.get('/kpis', getKPIData);

// Route to discharge a patient
router.delete('/:wardID/patients/:patientID', dischargePatient);



module.exports = router;
