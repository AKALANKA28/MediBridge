// models/EquipmentModel.js
const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  equipmentID: { type: String, required: true, unique: true }, // Unique identifier for equipment
  name: { type: String, required: true }, // Equipment name
  type: { type: String, required: true }, // Equipment type (e.g., MRI, X-Ray)
  status: { type: String, enum: ["Available", "In Use", "Under Maintenance"], default: "Available" }, // Equipment status
  usageLogs: [
    {
      date: { type: Date, default: Date.now },
      usedBy: { type: String }, // Staff or user who used it
      duration: { type: Number }, // Time used in hours/minutes
    }
  ],
  maintenanceDate: { type: Date }, // Last maintenance date
  nextMaintenance: { type: Date }, // Next scheduled maintenance date
  usageStats: {
    totalUsage: { type: Number, default: 0 }, // Total usage in hours
    lastUsed: { type: Date }, // Last usage date
  }
});

module.exports = mongoose.model('Equipment', equipmentSchema);
