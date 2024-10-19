const asyncHandler = require("express-async-handler");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwtToken");
const crypto = require("crypto");
const sendEmail = require("./emailController");
const User = require("../models/userModel");
const PatientProfile = require("../models/patientModel");
const DoctorProfile = require("../models/doctorModel");
const { default: mongoose } = require("mongoose");

// Register a User
exports.registerUser = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // Log the entire request body
  const { email, role = "patient", ...rest } = req.body; // Default to 'patient'

  // Check if the user already exists
  const findUser = await User.findOne({ email });
  console.log("Checking for existing user:", email);

  if (!findUser) {
    let newUser;

    console.log("No existing user found, creating new user...");

    // First, create the user
    newUser = await User.create({ ...rest, email, role });
    console.log("User created:", newUser);

    // Check the role and create a profile accordingly
    if (role === "doctor") {
      console.log("Creating doctor profile...");

      // Create doctor profile and associate it with the user
      const doctorProfile = await DoctorProfile.create({
        user: newUser._id,
        ...rest,
      });
      console.log("Doctor profile created:", doctorProfile);

      // Update the user to reference the created doctor profile
      await User.findByIdAndUpdate(
        newUser._id,
        { doctorProfile: doctorProfile._id },
        { new: true }
      );
      console.log("Linked user to doctor profile:", doctorProfile._id);
    } else if (role === "patient") {
      console.log("Creating patient profile...");

      // Create the patient profile and associate it with the user
      const newPatient = await PatientProfile.create({ user: newUser._id });
      console.log("Patient profile created:", newPatient);

      // Link the user back to the patient profile
      await User.findByIdAndUpdate(
        newUser._id,
        { patientProfile: newPatient._id },
        { new: true }
      );
      console.log("Linked user to patient profile:", newPatient._id);
    } else {
      console.log("Creating user with non-profile role:", role);
      // No specific profile for non-patient/doctor roles
    }

    console.log("New user registered:", newUser);
    res.json(newUser);
  } else {
    console.log("User already exists:", findUser);
    throw new Error("User Already Exists");
  }
});

// Login a User
// Login a User (Handles all roles including admin)
exports.loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for user:", email);

  // Find user and populate both doctorProfile and patientProfile if applicable
  const findUser = await User.findOne({ email })
    .populate("doctorProfile")
    .populate("patientProfile");

  if (findUser) {
    console.log("User found:", findUser);

    // Check if the provided password matches the stored password
    if (await findUser.isPasswordMatched(password)) {
      // Generate refresh token
      const refreshToken = await generateRefreshToken(findUser._id);
      await User.findByIdAndUpdate(
        findUser._id,
        { refreshToken },
        { new: true }
      );

      // Set refresh token in cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 72 * 60 * 60 * 1000, // 72 hours
      });

      console.log("Login successful for user:", findUser._id);

      // Respond based on user role (admin, doctor, patient, etc.)
      res.json({
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role, // User's role is returned here
        token: generateToken(findUser._id),
        doctorProfile: findUser.doctorProfile || null,
        patientProfile: findUser.patientProfile || null,
      });
    } else {
      console.log("Invalid password for user:", email);
      throw new Error("Invalid Credentials");
    }
  } else {
    console.log("No user found with email:", email);
    throw new Error("Invalid Credentials");
  }
});

// admin login------------------------------------------------------------------------------------------
exports.loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findAdmin = await User.findOne({ email });
  if (!findAdmin || findAdmin.role !== "admin") {
    res.status(403);
    throw new Error("Not Authorized");
  }

  if (await findAdmin.isPasswordMatched(password)) {
    const refreshToken = generateRefreshToken(findAdmin._id);
    await User.findByIdAndUpdate(findAdmin._id, { refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: findAdmin._id,
      name: findAdmin.name,
      email: findAdmin.email,
      token: generateToken(findAdmin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// Logout a User
exports.logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(400);
    throw new Error("No Refresh Token in Cookies");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  await User.findByIdAndUpdate(user._id, { refreshToken: "" });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.sendStatus(204);
});

// Handle Refresh Token
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(403);
    throw new Error("No Refresh Token in Cookies");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.status(403);
    throw new Error("Invalid Refresh Token");
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user._id.toString() !== decoded.id) {
      res.status(403);
      throw new Error("Invalid Refresh Token");
    }

    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken });
  });
});

// Forgot Password
exports.forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found with this email");
  }

  const token = await user.createPasswordResetToken();
  await user.save();

  const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid for 10 minutes. <a href='${process.env.FRONTEND_URL}/user/reset-password/${token}'>Click Here</a>`;
  const data = {
    to: email,
    subject: "Forgot Password Link",
    html: resetURL,
  };

  await sendEmail(data);
  res.status(200).json({ message: "Reset Token Sent" });
});

// Reset Password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Token Expired, Please try again later");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password Reset Successful" });
});

//Get All Users------------------------------------------------------------------------------------------
exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.json(getAllUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get user by id------------------------------------------------------------------------------------------
exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid User ID." });
  }
  try {
    const getUserById = await User.findById(id);
    res.json({
      getUserById,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update a User------------------------------------------------------------------------------------------
exports.updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid User ID." });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        nic: req?.body?.nic,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a User------------------------------------------------------------------------------------------
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Block and Unblock User
exports.blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  res.status(200).json({ message: "User Blocked", user });
});

exports.unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  res.status(200).json({ message: "User Unblocked", user });
});

//update password------------------------------------------------------------------------------------------
exports.updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//forgot password------------------------------------------------------------------------------------------
exports.forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8070/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//reset password------------------------------------------------------------------------------------------
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});
