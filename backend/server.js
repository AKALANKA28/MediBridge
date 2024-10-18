const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('./config/Database'); // Import the Singleton Database class
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysis/analysisRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Initialize the database connection (Singleton)
Database.getInstance();

// Routes
// app.use('/api/patients', patientRoutes);
app.use('/api/user', authRoutes);

app.use('/api/analysis',analysisRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
