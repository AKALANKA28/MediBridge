import React, { useEffect, useState } from 'react';
import "./LabTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

// Function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const LabTable = ({ onEdit }) => { // Accept onEdit as a prop for edit functionality
  const [data, setData] = useState([]);

  // Fetch all lab tests from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/tests/');
        if (!response.ok) {
          throw new Error('Failed to fetch lab tests.');
        }
        const result = await response.json();

        // Map the fetched data to include id property
        const mappedData = result.map(item => ({
          id: item._id || '', // Use _id directly from MongoDB
          test_Id: item.test_Id || '', 
          test_Name: item.test_Name || '',
          test_result: item.test_result || '',
          date: item.date ? new Date(item.date) : null, // Handle null dates
          description: item.description || '',
        })).filter(item => isValidObjectId(item.id)); // Filter invalid ObjectIds

        setData(mappedData);
      } catch (error) {
        console.error('Error fetching lab tests:', error);
      }
    };

    fetchData();
  }, []);

  // Handle deleting a lab test
  const handleDelete = async (id) => {
    if (!isValidObjectId(id)) {
      console.error('Invalid test ID:', id);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/labtests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lab test.');
      }

      setData(data.filter((item) => item.id !== id)); // Remove the deleted item from the state
    } catch (error) {
      console.error('Error deleting lab test:', error);
    }
  };

  // Define the action column for view, edit, and delete actions
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={`/labtests/view/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div 
              className="editButton" 
              onClick={() => onEdit(params.row)} // Call the onEdit function with the row data
            >
              Edit
            </div>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Define the columns for the DataGrid
  const columns = [
    { field: "test_Id", headerName: "Test ID", width: 150 },
    { field: "test_Name", headerName: "Test Name", width: 230 },
    { field: "test_result", headerName: "Test Result", width: 230 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (params.row.date ? new Date(params.row.date).toLocaleDateString() : 'N/A'),
    },
    { field: "description", headerName: "Description", width: 230 },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Test
        <Link to="/labtests/new" className="link">
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
        getRowId={(row) => row.id} // Use MongoDB _id as row ID
      />
    </div>
  );
};

export default LabTable;
