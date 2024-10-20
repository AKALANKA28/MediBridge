// report/Report.js
class Report {
    constructor() {
      if (this.constructor === Report) {
        throw new Error("Abstract class cannot be instantiated directly");
      }
    }
  
    generatePDF(res) {
      throw new Error("Method 'generatePDF()' must be implemented in subclasses.");
    }
  }
  
  module.exports = Report;
  