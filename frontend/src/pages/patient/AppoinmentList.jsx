import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/AppointmentList.css'; // Using similar styles as the form
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/appoinment');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/appoinment/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleUpdate = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSaveUpdate = async (updatedAppointment) => {
    try {
      await axios.put(`http://localhost:8080/api/appoinment/${updatedAppointment._id}`, updatedAppointment);
      const updatedAppointments = appointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      );
      setAppointments(updatedAppointments);
      setEditingAppointment(null); // Close the editing form
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className='list'>
      <Sidebar />
        <div className='listContainer'>
          <Navbar />
    <div className="appointment-list-container">
      <h2>Appointments List</h2>
      <p>Here are your scheduled appointments</p>

      {editingAppointment && (
        <div className="edit-form">
          {/* Editing form content */}
        </div>
      )}

      <div className="appointment-list">
        {appointments.length > 0 ? (
          <div className="grid-container">
            {appointments.map((appointment) => (
              <div className="appointment-card" key={appointment._id}>
                <h3>{appointment.name}</h3>
                <p><strong>Address:</strong> {appointment.address}</p>
                <p><strong>Mobile Number:</strong> {appointment.mobileNumber}</p>
                <p><strong>Gender:</strong> {appointment.gender}</p>
                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                <p><strong>Schedule Time:</strong> {new Date(appointment.scheduleTime).toLocaleString()}</p>
                <p><strong>Treatment Type:</strong> {appointment.treatmentType}</p>

                <div className="action-buttons">
                  <button onClick={() => handleUpdate(appointment)}>Update</button>
                  <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments available</p>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default AppointmentList;
