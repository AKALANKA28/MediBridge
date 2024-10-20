// backend/models/paymentModel.js
const mongoose = require('mongoose');

// Define schema for payments
const paymentSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 20
  },
  exp: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
