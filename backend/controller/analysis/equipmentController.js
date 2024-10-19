// controllers/equipmentController.js
const Equipment = require('../../models/analysis/EquipmentModel'); // Adjust the path as necessary

// Get all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching equipment data', error });
  }
};

// Update equipment status
const updateEquipmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    equipment.status = status;
    await equipment.save();

    res.status(200).json({ message: 'Equipment status updated', equipment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating equipment status', error });
  }
};

// Log equipment usage
const logEquipmentUsage = async (req, res) => {
  const { id } = req.params;
  const { usedBy, duration } = req.body;

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // Update the usage log and stats
    equipment.usageLogs.push({ usedBy, duration, date: new Date() });
    equipment.usageStats.totalUsage += duration;
    equipment.usageStats.lastUsed = new Date();

    await equipment.save();

    res.status(200).json({ message: 'Equipment usage logged', equipment });
  } catch (error) {
    res.status(500).json({ message: 'Error logging equipment usage', error });
  }
};

// Schedule equipment maintenance
const scheduleMaintenance = async (req, res) => {
  const { id } = req.params;
  const { nextMaintenance } = req.body;

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // Update the maintenance date
    equipment.nextMaintenance = new Date(nextMaintenance);
    equipment.status = 'Under Maintenance';

    await equipment.save();

    res.status(200).json({ message: 'Maintenance scheduled', equipment });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling maintenance', error });
  }
};

// Add new equipment
const addNewEquipment = async (req, res) => {
    const { equipmentID, name, type, status } = req.body; // You can customize these fields based on what you need
  
    try {
      // Check if the equipment already exists
      const existingEquipment = await Equipment.findOne({ equipmentID });
      if (existingEquipment) {
        return res.status(400).json({ message: 'Equipment with this ID already exists' });
      }
  
      // Create new equipment
      const newEquipment = new Equipment({
        equipmentID,
        name,
        type,
        status: status || 'Available', // Default status to 'Available' if not provided
      });
  
      await newEquipment.save();
      res.status(201).json({ message: 'New equipment added successfully', equipment: newEquipment });
    } catch (error) {
      res.status(500).json({ message: 'Error adding new equipment', error });
    }
  };

  const getEquipmentDetails = async (req, res) => {
    const { id } = req.params;
    try {
      const equipment = await Equipment.findById(id);
      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching equipment details" });
    }
  };

// Get equipment usage by ID
const getEquipmentUsageById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const equipment = await Equipment.findById(id, 'usageLogs'); // Only return the usageLogs field
      if (!equipment) {
        return res.status(404).json({ message: 'Equipment not found' });
      }
  
      res.status(200).json({ usageLogs: equipment.usageLogs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching equipment usage logs', error });
    }
  };
  
  

module.exports = {
  getAllEquipment,
  updateEquipmentStatus,
  logEquipmentUsage,
  scheduleMaintenance,
  addNewEquipment,
  getEquipmentDetails,
  getEquipmentUsageById,
};
