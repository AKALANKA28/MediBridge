import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, TablePagination, Typography } from '@mui/material';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';

const TreatmentTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [status, setStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation();
  const { treatments, patientId } = location.state || {};

  useEffect(() => {
    if (treatments) {
      setData(treatments.map(treatment => ({
        id: treatment._id || '',
        treatment_Id: treatment.treatment_Id || '',
        treatment_Name: treatment.treatment_Name || '',
        doctor_Name: treatment.doctor_Name || '',
        date: treatment.date ? new Date(treatment.date).toLocaleDateString() : '',
        description: treatment.description || '',
        status: treatment.status || 'Pending',  // Assuming there's a status field
        patientId: patientId || '',
      })));
    } else {
      fetchData();
    }
  }, [treatments]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/treatments/');
      setData(response.data.map(item => ({
        ...item, 
        id: item._id || '',
        status: item.status || 'Pending'
      })).filter(item => item.id));
    } catch (error) {
      console.error("Error fetching treatments:", error.response ? error.response.data : error.message);
    }
  };

  const handleStatusChange = async (treatmentId, newStatus) => {
    try {
      await axios.put(`/treatments/status/${treatmentId}`, { status: newStatus });
      setData(prevData =>
        prevData.map(treatment =>
          treatment.id === treatmentId ? { ...treatment, status: newStatus } : treatment
        )
      );
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/treatments/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting treatment:", error.response ? error.response.data : error.message);
    }
  };

  const handleDialogOpen = treatment => {
    setSelectedTreatment(treatment);
    setStatus(treatment.status);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTreatment(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { field: 'treatment_Id', headerName: 'Treatment ID', width: 150 },
    { field: 'treatment_Name', headerName: 'Treatment Name', width: 200 },
    { field: 'doctor_Name', headerName: 'Doctor Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: params => (
        <Select
          value={params.row.status}
          onChange={e => handleStatusChange(params.row.id, e.target.value)}
          fullWidth
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => (
        <div className="cellAction">
          <Button variant="outlined" onClick={() => handleDialogOpen(params.row)}>Edit</Button>
          <Button color="secondary" onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div className="treatment-table">
      <Typography variant="h4" component="h2" gutterBottom>
        Treatment Details
      </Typography>
      <DataGrid
        rows={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        columns={columns}
        pageSize={rowsPerPage}
        checkboxSelection
        autoHeight
      />

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Treatment Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {selectedTreatment && (
          <>
            <DialogTitle>Edit Treatment: {selectedTreatment.treatment_Name}</DialogTitle>
            <DialogContent>
              <TextField
                label="Treatment Name"
                value={selectedTreatment.treatment_Name}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Doctor Name"
                value={selectedTreatment.doctor_Name}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Date"
                value={new Date(selectedTreatment.date).toLocaleDateString()}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Description"
                value={selectedTreatment.description}
                fullWidth
                margin="normal"
                disabled
              />
              <Select
                label="Status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
              <Button
                onClick={() => {
                  handleStatusChange(selectedTreatment.id, status);
                  handleDialogClose();
                }}
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default TreatmentTable;
