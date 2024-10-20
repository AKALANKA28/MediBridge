const mongoose = require('mongoose');

const paymentSlipSchema = new mongoose.Schema({
  slipName: {
    type: String,
    required: true
  },
  slipPath: {
    type: String,
    required: true
  },
  slipType: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const PaymentSlip = mongoose.model('PaymentSlip', paymentSlipSchema);

module.exports = PaymentSlip;
