import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
} from '@mui/material';

const EquipmentTable = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [logsPopup, setLogsPopup] = useState(false);
  const [newLog, setNewLog] = useState({ usedBy: '', duration: '', date: new Date() });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch all equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('/api/equipment/equipment');
        setEquipmentList(response.data);
      } catch (error) {
        console.error('Error fetching equipment data', error);
      }
    };

    fetchEquipment();
  }, []);

  // Handle status change
  const handleStatusChange = async (equipmentID, newStatus) => {
    try {
      await axios.put(`/api/equipment/equipment/status/${equipmentID}`, { status: newStatus });
      setEquipmentList(prevState =>
        prevState.map(eq => (eq._id === equipmentID ? { ...eq, status: newStatus } : eq))
      );
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  // Open usage log popup
  const handleViewLogs = equipment => {
    setSelectedEquipment(equipment);
    setLogsPopup(true);
  };

  // Close usage log popup
  const closePopup = () => {
    setLogsPopup(false);
    setSelectedEquipment(null);
  };

  // Handle form submission to add new log
  const handleAddLog = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/equipment/equipment/log/${selectedEquipment._id}`, newLog);
      const newLogEntry = response.data; // Assuming this returns the newly added log

      setSelectedEquipment(prev => ({
        ...prev,
        usageLogs: [...(prev.usageLogs || []), newLogEntry], // Append the new log to existing logs
      }));

      setNewLog({ usedBy: '', duration: '', date: new Date() });
    } catch (error) {
      console.error('Error adding usage log', error);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="equipment-table-container">
      {/* <Typography variant="h4" gutterBottom>
        Equipment List
      </Typography> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(equipment => (
              <TableRow key={equipment._id}>
                <TableCell>{equipment.equipmentID}</TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.type}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={equipment.status}
                      onChange={e => handleStatusChange(equipment._id, e.target.value)}
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="In Use">In Use</MenuItem>
                      <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleViewLogs(equipment)}>
                    View Logs
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={equipmentList.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Popup for usage logs */}
      <Dialog open={logsPopup} onClose={closePopup}>
        {selectedEquipment && (
          <>
            <DialogTitle>Usage Logs for {selectedEquipment.name}</DialogTitle>
            <DialogContent>
              <Typography><strong>Equipment ID:</strong> {selectedEquipment.equipmentID}</Typography>
              <form onSubmit={handleAddLog}>
                <TextField
                  label="Used By"
                  value={newLog.usedBy}
                  onChange={e => setNewLog({ ...newLog, usedBy: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Duration (hours)"
                  type="number"
                  value={newLog.duration}
                  onChange={e => setNewLog({ ...newLog, duration: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Date"
                  type="date"
                  value={newLog.date.toISOString().substring(0, 10)}
                  onChange={e => setNewLog({ ...newLog, date: new Date(e.target.value) })}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <DialogActions>
                  <Button onClick={closePopup} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Add Log
                  </Button>
                </DialogActions>
              </form>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Used By</TableCell>
                    <TableCell>Duration (hours)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(selectedEquipment?.usageLogs || []).map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                      <TableCell>{log.usedBy}</TableCell>
                      <TableCell>{log.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default EquipmentTable;
