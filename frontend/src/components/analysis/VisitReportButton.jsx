// ReportButtons.jsx (or in your component)
import React from 'react';
import axios from 'axios';

const VisitReportButton = () => {
    const downloadReport = (reportType) => {
        axios.get(`http://localhost:8080/api/reports/report/${reportType}`, {
          responseType: 'blob',  // This tells axios to handle the response as a binary file (for PDF)
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${reportType}-report.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error downloading the report:', error);
        });
      };

  return (
    <div>
      <button onClick={() => downloadReport('patient-visit')}>Download Patient Visit Report</button>
    </div>
  );
};

export default VisitReportButton;
