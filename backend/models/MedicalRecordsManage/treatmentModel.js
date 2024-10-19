const mongoose = require("mongoose");

const TreatmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // reference to User or Patient model
    // required: true
  },
  treatment_Id: { type: String, required: true, unique: true },
  // patient_Name: { type: String },
  treatment_Name: { type: String },
  doctor_Name: { type: String }, // reference to doctor
  date: { type: Date },
  description: { type: String },
  // status: {
  //   type: String,
  //   enum: ["ongoing", "completed", "canceled"],
  //   default: "ongoing",
  // },
});

module.exports = mongoose.model("Treatment", TreatmentSchema);
