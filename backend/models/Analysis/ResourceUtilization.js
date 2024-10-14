const ResourceUtilizationSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
    resourceName: String,
    usedByStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    usageStart: Date,
    usageEnd: Date,
    usagePurpose: String,
    createdAt: { type: Date, default: Date.now }
});
