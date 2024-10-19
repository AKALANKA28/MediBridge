import React, { useEffect, useState } from 'react';
import "./LabTable.scss"; // Ensure you have the corresponding styles
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, Link } from "react-router-dom";

const LabTable = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { tests } = location.state || {}; // Receive lab tests

  const columns = [
    { field: "test_Id", headerName: "Test ID", width: 150 },
    { field: "test_Name", headerName: "Test Name", width: 230 },
    { field: "test_result", headerName: "Test Result", width: 230 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "description", headerName: "Description", width: 230 },
  ];

  useEffect(() => {
    // Use passed lab tests if available, otherwise fetch from API
    if (tests) {
      setData(tests.map(test => ({
        id: test._id || '',
        test_Id: test.test_Id || '',
        test_Name: test.test_Name || '',
        test_result: test.test_result || '',
        date: test.date ? new Date(test.date).toLocaleDateString() : 'N/A',
        description: test.description || '',
      })));
    } else {
      fetchData();
    }
  }, [tests]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/tests/'); // Your API endpoint for lab tests
      if (!response.ok) {
        throw new Error('Failed to fetch lab tests.');
      }
      const result = await response.json();
      setData(result.map(item => ({ ...item, id: item._id || '' })).filter(item => item.id));
    } catch (error) {
      console.error('Error fetching lab tests:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/tests/${id}`, { // Adjust the endpoint for delete
        method: 'DELETE',
      });
      // Refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting lab test:", error);
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
            <Link to={`/labtestform`} state={{ initialData: params.row }}>
              Edit
            </Link>
            <button onClick={() => handleDelete(params.row.id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="lab-table">
      <div className="datatableTitle">
        Add New Test
        <Link to="/labtests/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid 
        rows={data} 
        columns={columns.concat(actionColumn)} 
        pageSize={5} 
        checkboxSelection // This enables the checkbox selection
        getRowId={(row) => row.id} // Use MongoDB _id as row ID
      />
    </div>
  );
};

export default LabTable;
