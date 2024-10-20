const express = require('express');
const {
  addPatientVisit,
  getPatientVisits,
  getPatientVisitById,
  updatePatientVisit,
  deletePatientVisit,
  getPeakTimeData,
  getCurrentDayPeakTimes,
  getPeakTimesByPeriod,
  getKPIs
} = require('../../controller/analysis/analysisController');

const router = express.Router();

// POST: Add a new patient visit
router.post('/visits', addPatientVisit);

// GET: Get all patient visits (with filters)
router.get('/visits', getPatientVisits);
router.get('/peak', getPeakTimeData);
router.get('/peakday', getCurrentDayPeakTimes);
router.get('/peakperiod', getPeakTimesByPeriod);
router.get('/kpi', getKPIs);

// GET: Get a specific patient visit by ID
//router.get('/:id', getPatientVisitById);

// PUT: Update a patient visit by ID
//router.put('/:id', updatePatientVisit);

// DELETE: Delete a patient visit by ID
//router.delete('/:id', deletePatientVisit);

module.exports = router;
