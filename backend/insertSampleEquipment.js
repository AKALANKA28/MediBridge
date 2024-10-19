const mongoose = require("mongoose");
const Equipment = require("./models/analysis/EquipmentModel"); // Adjust the path to your Equipment model
const sampleData = [];

// Generate sample data
for (let i = 0; i < 50; i++) {
    // Create random equipment details
    const equipmentID = `EQ-${Math.floor(Math.random() * 100)}`;
    const name = ["X-Ray Machine", "MRI Scanner", "CT Scanner", "Ultrasound Machine"][Math.floor(Math.random() * 4)];
    const type = ["Diagnostic", "Therapeutic", "Surgical"][Math.floor(Math.random() * 3)];
    const status = ["Available", "In Use", "Under Maintenance"][Math.floor(Math.random() * 3)];
    
    // Random maintenance date in the past and next maintenance date in the future
    //const maintenanceDate = new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365))); // Random date in the past year
   // const nextMaintenanceDate = new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 365))); // Random date in the next year

    sampleData.push({
        equipmentID: equipmentID,
        name: name,
        type: type,
        status: status,
       // maintenanceDate: maintenanceDate,
       // nextMaintenanceDate: nextMaintenanceDate,
       // usageLogs: [], // Empty usage logs to start
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
    await Equipment.deleteMany({});
    console.log("Existing data cleared.");

    // Insert sample data
    await Equipment.insertMany(sampleData);
    console.log("Sample data inserted!");
})
.catch((error) => {
    console.error("Database connection error:", error);
})
.finally(() => {
    mongoose.connection.close();
});
