// routes/equipmentRoutes.js
const express = require('express');
const { 
    getAllEquipment, 
    updateEquipmentStatus, 
    logEquipmentUsage, 
    scheduleMaintenance ,
    addNewEquipment,
    getEquipmentDetails,
    getEquipmentUsageById
} = require('../../controller/analysis/equipmentController'); // Import the controller functions

const router = express.Router();

// Route to add new equipment
router.post('/addequipment', addNewEquipment);

// Route to get all equipment
router.get('/equipment', getAllEquipment);

// Route to get  equipment by id
router.get('/equipment/:id', getEquipmentDetails);

// Route to update equipment status
router.put('/equipment/status/:id', updateEquipmentStatus);

// Route to log equipment usage
router.put('/equipment/log/:id', logEquipmentUsage);

// Route to get equipment usage
router.get('/equipment/log/:id', getEquipmentUsageById);

// Route to schedule maintenance
router.put('/equipment/maintenance/:id', scheduleMaintenance);

module.exports = router;
