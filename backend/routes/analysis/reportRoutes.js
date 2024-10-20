// routes/reportRoutes.js
const express = require('express');
const ReportFactory = require('../../Report/ReportFactory');

const router = express.Router();

router.get('/report/:type', (req, res) => {
  const { type } = req.params;

  try {
    const report = ReportFactory.createReport(type);
    report.generatePDF(res);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).send("Failed to generate report");
  }
});

module.exports = router;
