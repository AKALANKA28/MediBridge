const express = require('express');
const { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } = require('../controller/payController');

const router = express.Router();

router.post('/create', createPayment);
router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;