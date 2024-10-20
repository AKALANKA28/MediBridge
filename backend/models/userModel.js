const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    imgUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient", // Default role
      required: true
    },
    // Role-specific data will be referenced by these fields
    doctorProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    address: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
  return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
