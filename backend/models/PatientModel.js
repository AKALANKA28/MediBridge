// models/PatientModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    medicalHistory: { type: String },
    demographicInfo: { type: String }
});

// Hash the password before saving
PatientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Patient', PatientSchema);
