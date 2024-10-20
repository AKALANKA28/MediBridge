const PaymentSlip = require('../models/paymentSlipModel');
const fs = require('fs');

// Create a new payment slip
exports.uploadPaymentSlip = async (req, res) => {
  try {
    const slip = new PaymentSlip({
      slipName: req.file.originalname,
      slipPath: req.file.path,
      slipType: req.file.mimetype
    });
    const savedSlip = await slip.save();
    res.status(201).json(savedSlip);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

// Get all payment slips
exports.getPaymentSlips = async (req, res) => {
  try {
    const slips = await PaymentSlip.find();
    res.status(200).json(slips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error });
  }
};

// Get a specific payment slip
exports.getPaymentSlip = async (req, res) => {
  try {
    const slip = await PaymentSlip.findById(req.params.id);
    if (!slip) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json(slip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching file', error });
  }
};

// Update a payment slip
exports.updatePaymentSlip = async (req, res) => {
  try {
    const updatedSlip = await PaymentSlip.findByIdAndUpdate(
      req.params.id,
      {
        slipName: req.file ? req.file.originalname : req.body.slipName,
        slipPath: req.file ? req.file.path : req.body.slipPath,
        slipType: req.file ? req.file.mimetype : req.body.slipType
      },
      { new: true }
    );
    res.status(200).json(updatedSlip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating file', error });
  }
};

// Delete a payment slip
exports.deletePaymentSlip = async (req, res) => {
  try {
    const slip = await PaymentSlip.findById(req.params.id);
    if (!slip) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Remove file from the server
    fs.unlinkSync(slip.slipPath);

    // Remove from the database
    await slip.deleteOne();
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error });
  }
};
