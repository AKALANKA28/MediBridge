const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  gender: { type: String, required: true },
  doctor: { type: String, required: true },
  scheduleTime: { type: Date, required: true },
  treatmentType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
