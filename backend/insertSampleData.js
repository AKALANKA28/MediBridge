const mongoose = require("mongoose");
const PatientVisit = require("./models/analysis/PatientVisitModel"); // Adjust the path as necessary
const sampleData = [];

// Get the current date
const today = new Date();

// Get the first and last day of the current month
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// Generate sample data
for (let i = 0; i < 50; i++) {
    // Generate a random day within the current month
    const randomDay = Math.floor(Math.random() * endOfMonth.getDate()) + 1; // Random day from 1 to the last day of the month
    
    // Generate random hours, minutes, and seconds
    const randomHour = Math.floor(Math.random() * 24); // Random hour from 0 to 23
    const randomMinute = Math.floor(Math.random() * 60); // Random minute from 0 to 59
    const randomSecond = Math.floor(Math.random() * 60); // Random second from 0 to 59

    // Set the visitDate to a random date and time within the current month
    const visitDate = new Date(today.getFullYear(), today.getMonth(), randomDay, randomHour, randomMinute, randomSecond);

    sampleData.push({
        patientID: `P${Math.floor(Math.random() * 50)}`,
        visitDate: visitDate, // Random date and time within the current month
        department: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"][Math.floor(Math.random() * 4)],
        type: ["OPD", "Emergency"][Math.floor(Math.random() * 2)],
    });
}

// Connect to the database
mongoose.connect("mongodb+srv://savinducs:ZEXCy7aod7wFxI9I@cluster0.c8hkv.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log("Database connected!");
    // Clear existing data
    await PatientVisit.deleteMany({});
    console.log("Existing data cleared.");

    // Insert sample data
    await PatientVisit.insertMany(sampleData);
    console.log("Sample data inserted!");
})
.catch((error) => {
    console.error("Database connection error:", error);
})
.finally(() => {
    mongoose.connection.close();
});
