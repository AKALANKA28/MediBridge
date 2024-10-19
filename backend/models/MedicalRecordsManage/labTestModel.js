const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // reference to User or Patient model
  },

// const TestSchema = new mongoose.Schema({
    
    test_Id: { type: String, required: true, unique: true },
    test_Name: { type: String, required: true },
    test_result: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String }
});

// Hash the password before saving
// TreatmentSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

module.exports = mongoose.model('Test', TestSchema);
