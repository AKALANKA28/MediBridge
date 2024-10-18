const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for patient visits
const PatientVisitSchema = new Schema({
  patientID: {
    type: String, // This can be an ObjectId if you are linking to a Patient model
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true, // Remove enum to allow any department value
  },
  type: {
    type: String,
    required: true, // Remove enum to allow any type value
  },
});

// Export the model
module.exports = mongoose.model('PatientVisit', PatientVisitSchema);
