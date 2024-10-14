const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TreatmentSchema = new mongoose.Schema({
    
    treatment_Id: { type: String, required: true, unique: true },
    treatment_Name: { type: String, required: true },
    doctor_Name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String }
});

// Hash the password before saving
// TreatmentSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

module.exports = mongoose.model('Treatment', TreatmentSchema);
