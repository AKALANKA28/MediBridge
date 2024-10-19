const PDFDocument = require('pdfkit');
const Report = require('./Report');

class WardsReport extends Report {
  generatePDF(res) {
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename="wards-report.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);
    doc.fontSize(16).text('Wards Report', { align: 'center' });
    doc.moveDown();
    doc.text('--- Here comes the ward occupancy data ---');

    // Example data - Replace with actual data
    doc.text('Ward: A');
    doc.text('Total Beds: 20');
    doc.text('Occupied: 15');

    doc.end();
  }
}

module.exports = WardsReport;