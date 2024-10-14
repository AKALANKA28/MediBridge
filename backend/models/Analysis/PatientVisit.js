const PatientVisitSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date: Date,
    department: String,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    visitReason: String,
    treatmentDetails: String,
    duration: Number, // in minutes
    createdAt: { type: Date, default: Date.now }
});
