const StaffUtilizationSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    role: String,
    shiftStart: Date,
    shiftEnd: Date,
    patientsTreated: Number,
    tasksCompleted: Number,
    createdAt: { type: Date, default: Date.now }
});
