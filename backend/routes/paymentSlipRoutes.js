const express = require('express');
const multer = require('multer');
const router = express.Router();
const paymentSlipController = require('../controller/paymentSlipController');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('File format should be PNG, JPG, or PDF'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// CRUD Routes
router.post('/', upload.single('slip'), paymentSlipController.uploadPaymentSlip);
router.get('/', paymentSlipController.getPaymentSlips);
router.get('/:id', paymentSlipController.getPaymentSlip);
router.put('/:id', upload.single('slip'), paymentSlipController.updatePaymentSlip);
router.delete('/:id', paymentSlipController.deletePaymentSlip);

module.exports = router;
