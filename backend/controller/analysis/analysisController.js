const PatientVisit = require('../../models/analysis/PatientVisitModel');

// Add a new patient visit
const addPatientVisit = async (req, res) => {
  const { patientID, visitDate, department, type } = req.body;

  try {
    const newVisit = new PatientVisit({
      patientID,
      visitDate,
      department,
      type,
    });

    await newVisit.save();
    res.status(201).json({ message: 'Patient visit added successfully!', visit: newVisit });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient visit', error });
  }
};

// Get all patient visits (with optional filters)
const getPatientVisits = async (req, res) => {
  const { startDate, endDate, department, type } = req.query;

  let query = {};

  if (startDate && endDate) {
    query.visitDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (department) {
    query.department = department;
  }

  if (type) {
    query.type = type;
  }

  try {
    const visits = await PatientVisit.find(query);
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient visits', error });
  }
};

// Get a single patient visit by ID
const getPatientVisitById = async (req, res) => {
  const { id } = req.params;

  try {
    const visit = await PatientVisit.findById(id);
    if (!visit) {
      return res.status(404).json({ message: 'Patient visit not found' });
    }
    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient visit', error });
  }
};

// Update a patient visit
const updatePatientVisit = async (req, res) => {
  const { id } = req.params;
  const { patientID, visitDate, department, type } = req.body;

  try {
    const updatedVisit = await PatientVisit.findByIdAndUpdate(
      id,
      { patientID, visitDate, department, type },
      { new: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({ message: 'Patient visit not found' });
    }

    res.status(200).json({ message: 'Patient visit updated successfully', visit: updatedVisit });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient visit', error });
  }
};

// Delete a patient visit
const deletePatientVisit = async (req, res) => {
  const { id } = req.params;

  try {
    const visit = await PatientVisit.findByIdAndDelete(id);

    if (!visit) {
      return res.status(404).json({ message: 'Patient visit not found' });
    }

    res.status(200).json({ message: 'Patient visit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient visit', error });
  }
};


// Helper function to get the start and end dates based on period
const getStartEndDates = (period) => {
  let startDate, endDate;
  const today = new Date();

  if (period === 'today') {
    startDate = new Date(today.setHours(0, 0, 0, 0));
    endDate = new Date(today.setHours(23, 59, 59, 999));
  } else if (period === 'this_week') {
    const firstDayOfWeek = today.getDate() - today.getDay();
    startDate = new Date(today.setDate(firstDayOfWeek));
    endDate = new Date();
  } else if (period === 'this_month') {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    endDate = new Date();
  }

  return { startDate, endDate };
};

// Controller to fetch peak time data
const getPeakTimeData = async (req, res) => {
  const { period } = req.query;
  const { startDate, endDate } = getStartEndDates(period);

  try {
    // Fetch and aggregate data grouped by day and hour
    const visits = await PatientVisit.aggregate([
      { 
        $match: {
          visitDate: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: {
            day: { $dayOfWeek: "$visitDate" },
            hour: { $hour: "$visitDate" },
          },
          visitCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.day": 1, "_id.hour": 1 } }
    ]);

    console.log(visits); 

    // Prepare heatmap data format: 7 rows (days) x 24 columns (hours)
    const heatmapData = Array(7).fill().map(() => Array(24).fill(0));
    let maxVisits = 0;

    visits.forEach(visit => {
      const dayIndex = visit._id.day - 1; // Day 1-7 (Sunday-Saturday)
      const hourIndex = visit._id.hour;   // Hour 0-23
      heatmapData[dayIndex][hourIndex] = visit.visitCount;
      maxVisits = Math.max(maxVisits, visit.visitCount);
    });

    res.json({ data: heatmapData, max: maxVisits });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching peak time data' });
  }
};

const getCurrentDayPeakTimes = async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const visits = await PatientVisit.aggregate([
      {
        $match: {
          visitDate: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: { hour: { $hour: "$visitDate" } },
          visitCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.hour": 1 } }
    ]);

    // Prepare data for the chart (24 hours)
    const visitData = Array(24).fill(0); // 24 hours

    visits.forEach(visit => {
      visitData[visit._id.hour] = visit.visitCount;
    });

    res.json({ data: visitData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching peak time data' });
  }
};

const getPeakTimesByPeriod = async (req, res) => {
  const { period } = req.query; // Expecting 'this_week' or 'this_month'
  let startDate, endDate;

  const now = new Date();

  // Determine startDate and endDate based on the requested period
  if (period === 'this_week') {
    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Set to Sunday
    firstDayOfWeek.setHours(0, 0, 0, 0);
    startDate = firstDayOfWeek;

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Set to Saturday
    lastDayOfWeek.setHours(23, 59, 59, 999);
    endDate = lastDayOfWeek;
  } else if (period === 'this_month') {
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the month
    firstDayOfMonth.setHours(0, 0, 0, 0);
    startDate = firstDayOfMonth;

    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
    lastDayOfMonth.setHours(23, 59, 59, 999);
    endDate = lastDayOfMonth;
  } else {
    return res.status(400).json({ message: 'Invalid period specified. Use "this_week" or "this_month".' });
  }

  try {
    const visits = await PatientVisit.aggregate([
      {
        $match: {
          visitDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { hour: { $hour: "$visitDate" } },
          visitCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.hour": 1 } }
    ]);

    // Prepare data for the chart (24 hours)
    const visitData = Array(24).fill(0); // 24 hours

    visits.forEach(visit => {
      visitData[visit._id.hour] = visit.visitCount;
    });

    res.json({ data: visitData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching peak time data' });
  }
};



module.exports = {
  addPatientVisit,
  getPatientVisits,
  getPatientVisitById,
  updatePatientVisit,
  deletePatientVisit,
  getPeakTimeData,
  getCurrentDayPeakTimes,
  getPeakTimesByPeriod,
};
