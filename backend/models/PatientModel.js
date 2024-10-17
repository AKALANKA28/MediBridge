const mongoose = require("mongoose");

const PatientProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicalHistory: [
    {
      disease: { type: String },
      description: { type: String },
      dateDiagnosed: { type: Date },
    },
  ],
  appointments: [
    {
      doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, // reference to doctor
      date: { type: Date, required: true },
      status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
    },
  ],
});

module.exports = mongoose.model("Patient", PatientProfileSchema);
