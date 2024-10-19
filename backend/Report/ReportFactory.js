const PatientVisitReport = require('./PatientVisitReport');
const EquipmentReport = require('./EquipmentReport');
const WardsReport = require('./WardsReport');

class ReportFactory {
  static createReport(type) {
    switch (type) {
      case "patient-visit":
        return new PatientVisitReport();
      case "equipment":
        return new EquipmentReport();
      case "wards":
        return new WardsReport();
      default:
        throw new Error("Unknown report type");
    }
  }
}

module.exports = ReportFactory;
