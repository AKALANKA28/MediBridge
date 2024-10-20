const Ward = require('../../models/analysis/WardModel');

// Controller to create a new ward
const createWard = async (req, res) => {
  try {
    const { wardID, name, capacity } = req.body;

    // Create a new ward document
    const newWard = new Ward({
      wardID,
      name,
      capacity,
      patients: [], // Initially empty array for patients
    });

    // Save the ward document to the database
    const savedWard = await newWard.save();

    res.status(201).json(savedWard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ward', error });
  }
};


// Admit a patient to a ward
const admitPatient = async (req, res) => {
    const { wardID } = req.params; // Get ward ID from URL parameters
    const { patientID, admissionDate } = req.body; // Get patient data from the request body
  
    try {
      // Find the ward by its ID
      const ward = await Ward.findOne({ wardID });
  
      if (!ward) {
        return res.status(404).json({ message: 'Ward not found' });
      }
  
      // Check if the ward is full
      if (ward.currentPatients.length >= ward.capacity) {
        return res.status(400).json({ message: 'Ward is full' });
      }
  
      // Add the new patient to the currentPatients array
      ward.currentPatients.push({ patientID, admissionDate });
  
      // Save the updated ward
      await ward.save();
  
      res.status(200).json({ message: 'Patient admitted successfully', ward });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
  
  

// Controller to fetch all wards
const getAllWards = async (req, res) => {
  try {
    // Fetch all wards from the database
    const wards = await Ward.find();

    // Check if wards exist
    if (!wards || wards.length === 0) {
      return res.status(404).json({ message: 'No wards found' });
    }

    // Return the wards in the response
    res.status(200).json(wards);
  } catch (error) {
    console.error('Error fetching wards:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch available wards (those that are not full)
const getAvailableWards = async (req, res) => {
    try {
      const wards = await Ward.find(); // Fetch all wards
  
      // Filter wards that have space
      const availableWards = wards.filter(ward => ward.currentPatients.length < ward.capacity);
  
      res.status(200).json(availableWards);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching wards', error });
    }
  };

  // Fetch all patients admitted to a specific ward
const getWardPatients = async (req, res) => {
    const { wardID } = req.params;
  
    try {
      // Find the ward by its ID and return only patient details
      const ward = await Ward.findOne({ wardID });
  
      if (!ward) {
        return res.status(404).json({ message: 'Ward not found' });
      }
  
      res.status(200).json(ward.currentPatients); // Return the list of patients in this ward
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patients', error });
    }
  };
  
  // Discharge a patient from the ward
  const dischargePatient = async (req, res) => {
    const { wardID, patientID } = req.params;
  
    try {
      // Find the ward by its ID
      const ward = await Ward.findOne({ wardID });
  
      if (!ward) {
        return res.status(404).json({ message: 'Ward not found' });
      }
  
      // Find the patient in the ward and remove them (discharge)
      ward.currentPatients = ward.currentPatients.filter(
        (patient) => patient.patientID !== patientID
      );
  
      // Save the updated ward
      await ward.save();
  
      res.status(200).json({ message: 'Patient discharged successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error discharging patient', error });
    }
  };

  // controllers/wardController.js

const getKPIData = async (req, res) => {
    try {
      const wards = await Ward.find();
      
      // Total wards
      const totalWards = wards.length;
  
      // Total admitted patients
      const totalAdmittedPatients = wards.reduce((total, ward) => total + ward.currentPatients.length, 0);
  
      // Total capacity (sum of all wards' capacities)
      const totalCapacity = wards.reduce((total, ward) => total + ward.capacity, 0);
  
      // Available beds (total capacity - total admitted patients)
      const availableBeds = totalCapacity - totalAdmittedPatients;
  
      // Patient admission rate (if you want to measure it for today)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of the day
      const admissionsToday = wards.reduce((total, ward) => {
        return total + ward.currentPatients.filter(patient => new Date(patient.admissionDate) >= today).length;
      }, 0);
  
      res.status(200).json({
        totalWards,
        availableBeds,
        totalAdmittedPatients,
        patientAdmissionRate: admissionsToday, // Admissions today
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching KPI data', error });
    }
  };
  

module.exports = { createWard,admitPatient,getAllWards,getAvailableWards,getWardPatients,dischargePatient,getKPIData };
