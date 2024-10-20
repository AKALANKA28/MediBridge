const express = require('express');
const router = express.Router();
const appointmentsController = require('../controller/appointmentsController');

// CRUD routes
router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAppointments);
router.put('/:id', appointmentsController.updateAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;
