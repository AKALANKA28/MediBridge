const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('./config/Database'); // Import the Singleton Database class
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');
const treatmentRoutes = require('./routes/MedicalRecordsManage/treatmentRoutes');
const labTestRoutes = require('./routes/MedicalRecordsManage/labTestRoutes'); 
const analysisRoutes = require('./routes/analysis/analysisRoutes');
const equipmentRoutes = require('./routes/analysis/equipmentRoutes');
const wardRoutes = require('./routes/analysis/wardRoutes');
const reportRoutes = require('./routes/analysis/reportRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Initialize the database connection (Singleton)
Database.getInstance();

// Routes
// app.use('/api/patients', patientRoutes);
app.use('/api/user', authRoutes);
app.use('/patient', patientRoutes); // Ensure this is included

app.use('/treatments', treatmentRoutes); // Ensure this is included
app.use('/tests', labTestRoutes); // Ensure this is included
app.use('/api/analysis',analysisRoutes);
app.use('/api/equipment',equipmentRoutes);
app.use('/api/ward',wardRoutes);
app.use('/api/reports', reportRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});