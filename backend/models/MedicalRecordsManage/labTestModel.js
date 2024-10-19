const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // reference to User or Patient model
  },
  test_Id: { type: String, required: true, unique: true },
  test_Name: { type: String, required: true },
  test_result: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});


module.exports = mongoose.model("Test", TestSchema);
