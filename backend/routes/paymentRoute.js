// backend/routes/paymentRoute.js
const express = require('express');
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require('../controller/paymentController');

const router = express.Router();

// Routes for CRUD operations
router.post('/', createPayment);          // Create payment
router.get('/', getAllPayments);         // Read all payments
router.get('/:id', getPaymentById);      // Read single payment
router.put('/:id', updatePayment);       // Update payment
router.delete('/:id', deletePayment);    // Delete payment

module.exports = router;
