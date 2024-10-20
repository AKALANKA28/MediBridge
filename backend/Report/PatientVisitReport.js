// reports/PatientVisitReport.js
const PDFDocument = require('pdfkit');
const Report = require('./Report');
const PatientVisit = require('../models/analysis/PatientVisitModel');

class PatientVisitReport extends Report {
  async generatePDF(res) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Disposition', 'attachment; filename="patient-visit-report.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // Fetch patient visits for the current month
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = new Date();
    const visits = await PatientVisit.find({
      visitDate: { $gte: startDate, $lte: endDate },
    });

    doc.pipe(res);

    // Header section
    doc.fontSize(16).text('Patient Visit Report (Current Month)', { align: 'center' });
    doc.moveDown();

    // Table headers
    const tableTop = 150;
    const rowHeight = 20;

    doc.fontSize(12);
    doc.text('Patient ID', 50, tableTop);
    doc.text('Visit Date', 150, tableTop);
    doc.text('Department', 300, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke(); // Line under headers

    // Table rows
    let yPosition = tableTop + 30;

    if (visits.length === 0) {
      doc.text('No patient visits found for the current month.', 50, yPosition);
    } else {
      visits.forEach((visit) => {
        if (yPosition > 750) { // If table goes beyond page, create a new page
          doc.addPage();
          yPosition = 50; // Reset y position for new page
        }

        doc.text(visit.patientID, 50, yPosition);
        doc.text(visit.visitDate.toDateString(), 150, yPosition);
        doc.text(visit.department, 300, yPosition);
        yPosition += rowHeight;
      });
    }

    doc.end();
  }
}

module.exports = PatientVisitReport;
