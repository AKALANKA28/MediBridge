const Payment = require('../models/payModel');
const stripe = require('stripe')('sk_test_51Q8MeRRq87H6ul5NDxC0hq98sSKcuk7JWPmZUAFCQs5j1kbdD4xhoheUUKIw2VaMWj9a8UZXkPCux6EhFPYynm0q004N4ZqQTQ');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { userId, bank, cardHolderName, cardNumber, exp, cvv, amount } = req.body;

    // Stripe Payment Processing
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: exp.split('/')[0],
          exp_year: exp.split('/')[1],
          cvc: cvv
        }
      },
      confirm: true
    });

    // Save payment to DB
    const payment = new Payment({
      userId,
      bank,
      cardHolderName,
      cardNumber,
      exp,
      cvv,
      amount
    });
    await payment.save();

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId', 'name email');
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('userId', 'name email');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const { bank, cardHolderName, cardNumber, exp, cvv, amount } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.id, {
      bank, cardHolderName, cardNumber, exp, cvv, amount
    }, { new: true });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
