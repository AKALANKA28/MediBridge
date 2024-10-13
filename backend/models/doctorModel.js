const mongoose = require("mongoose");

const DoctorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
  },
  availableSlots: [
    {
      date: { type: Date },
      isBooked: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Doctor", DoctorProfileSchema);
