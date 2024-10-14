const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('./config/Database'); // Import the Singleton Database class
const patientRoutes = require('./routes/patientRoutes');
const treatmentRoutes = require('./routes/MedicalRecordsManage/treatmentRoutes');
const labTestRoutes = require('./routes/MedicalRecordsManage/labTestRoutes'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize the database connection (Singleton)
Database.getInstance();

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/tests', labTestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
