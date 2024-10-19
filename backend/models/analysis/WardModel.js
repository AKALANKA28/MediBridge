const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  wardID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentPatients: [
    {
      patientID: {
        type: String, // Only save the patient ID as a string (no references)
        required: true
      },
      admissionDate: {
        type: Date,
        required: true
      },
      dischargeDate: {
        type: Date
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Ward', wardSchema);
