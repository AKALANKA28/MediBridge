import React, { useEffect, useState } from 'react';
import "./TreatmentTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, Link } from "react-router-dom";

const TreatmentTable = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { treatments, patientId } = location.state || {}; // Receive treatments and patientId

  const columns = [
    { field: "treatment_Id", headerName: "Treatment ID", width: 150 },
    { field: "treatment_Name", headerName: "Treatment Name", width: 200 },
    { field: "doctor_Name", headerName: "Doctor Name", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
  ];

  useEffect(() => {
    // Initial fetch or use passed treatments
    if (treatments) {
      setData(treatments.map(treatment => ({
        id: treatment._id || '',
        treatment_Id: treatment.treatment_Id || '',
        treatment_Name: treatment.treatment_Name || '',
        doctor_Name: treatment.doctor_Name || '',
        date: treatment.date ? new Date(treatment.date).toLocaleDateString() : '',
        description: treatment.description || '',
        patientId: patientId || '',
      })));
    } else {
      fetchData();
    }
  }, [treatments]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/treatments/'); // Your API endpoint
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result.map(item => ({ ...item, id: item._id || '' })).filter(item => item.id));
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/treatments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // Refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/treatmentform`} state={{ initialData: params.row, patientId }}>
              Edit
            </Link>
            <button onClick={() => handleDelete(params.row.id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="treatment-table">
      <DataGrid 
        rows={data} 
        columns={columns.concat(actionColumn)} 
        pageSize={5} 
        checkboxSelection // This enables the checkbox selection
      />
    </div>
  );
};

export default TreatmentTable;
