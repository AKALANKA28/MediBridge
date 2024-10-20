const PDFDocument = require('pdfkit');
const Report = require('./Report');
const Equipment = require('../models/analysis/EquipmentModel'); // Assuming you have an Equipment model

class EquipmentReport extends Report {
  async generatePDF(res) {
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename="equipment-report.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // Fetch all equipment data
    const equipmentList = await Equipment.find(); // Fetch all equipment from the database

    doc.pipe(res);
    doc.fontSize(16).text('Equipment Report', { align: 'center' });
    doc.moveDown();

    if (equipmentList.length === 0) {
      doc.text('No equipment data found.');
    } else {
      // Table header
      doc.fontSize(12);
      doc.text('Equipment ID', { continued: true, width: 150 });
      doc.text('Name', { continued: true, width: 150 });
      doc.text('Status', { width: 100 });
      doc.moveDown();

      // Draw a line under the table header
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Table rows
      equipmentList.forEach((equipment) => {
        doc.text(equipment.equipmentID, { continued: true, width: 150 });
        doc.text(equipment.name, { continued: true, width: 150 });
        doc.text(equipment.status, { width: 100 });
        doc.moveDown();
      });
    }

    doc.end();
  }
}

module.exports = EquipmentReport;
