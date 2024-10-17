import React, { useEffect, useState } from 'react';
import "./TreatmentTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const TreatmentTable = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
  const [initialData, setInitialData] = useState(null); // State to hold initial data for editing
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/treatments/'); // Replace with your actual API endpoint
      const result = await response.json();
      
      // Map the fetched data to include id property
      const mappedData = result.map(item => ({
        id: item._id || '', // Use _id directly
        treatment_Id: item.treatment_Id || '', // Fallback to empty string if undefined
        treatment_Name: item.treatment_Name || '',
        doctor_Name: item.doctor_Name || '',
        date: item.date ? new Date(item.date) : null, // Parse date directly
        description: item.description || '',
      })).filter(item => item.id); // Filter out items without an id

      setData(mappedData);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/test/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "treatment_Id", headerName: "Treatment ID", width: 150 },
    { field: "treatment_Name", headerName: "Treatment Name", width: 230 },
    { field: "doctor_Name", headerName: "Doctor Name", width: 230 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (params.row.date ? new Date(params.row.date).toLocaleDateString() : 'N/A'), // Handle null dates
    },
    { field: "description", headerName: "Description", width: 230 },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Treatment
        <Link to="/treatments/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id} // Use id directly
      />
    </div>
  );
};

export default TreatmentTable;
