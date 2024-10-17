const mongoose = require("mongoose"); // Import mongoose
const QRCode = require("qrcode");

// const Patient = require("../models/patientModel"); // Import the Patient model
const User = require("../models/userModel"); // Import the Patient model
const PatientProfile = require("../models/patientModel"); // Import the Patient model

// Controller to retrieve a patient profile with populated fields
exports.getPatientProfile = async (req, res) => {
  const { id } = req.params; // This should be the patientProfileId

  // Validate the ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid patient profile ID." });
  }

  try {
    // Find the patient profile
    const patientProfile = await PatientProfile.findById(id).populate([
      {
        path: "user",
        select: "name email nic",
      },
    //   {
    //     path: "appointments.doctor",
    //     select: "name email",
    //   },
      {
        path: "treatments",
        select: "treatment_Id treatment_Name date description",
      },
    ]);

    if (!patientProfile) {
      return res.status(404).json({ message: "Patient profile not found." });
    }

    res.status(200).json(patientProfile);
  } catch (error) {
    console.error("Error retrieving patient profile:", error);
    res.status(500).json({ message: "Failed to retrieve patient profile." });
  }
};

exports.generatePatientQRCode = async (req, res) => {
  const { id } = req.params; // User ID from the request

  // Validate the user ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  try {
    // Find the user and populate the patientProfile
    const user = await User.findById(id).populate("patientProfile");

    if (!user || !user.patientProfile) {
      return res.status(404).json({ message: "Patient profile not found." });
    }

    // Create the URL for the patient profile
    const patientProfileId = user.patientProfile._id;
    const qrUrl = `${req.protocol}://${req.get(
      "host"
    )}/patient/${patientProfileId}`;
    // Generate QR code from URL with specified width and margin
    const qrCode = await QRCode.toDataURL(qrUrl, {
      width: 230, // Specify the desired width
      margin: 1, // Add margin if necessary
    });
    // console.log("Generated QR URL:", qrUrl); // Debugging the QR URL

    // Send back the QR code and patient profile
    res.status(200).json({ qrCode, patient: user.patientProfile });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ message: "Failed to generate QR code." });
  }
};
