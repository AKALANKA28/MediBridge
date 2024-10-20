import React, { useState } from 'react';
import axios from 'axios';
import '../../style/AppointmentForm.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNumber: '',
    gender: '',
    doctor: '',
    scheduleTime: '',
    treatmentType: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Patient name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Valid mobile number is required';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.doctor) newErrors.doctor = 'Doctor selection is required';
    if (!formData.scheduleTime) newErrors.scheduleTime = 'Schedule time is required';
    if (!formData.treatmentType) newErrors.treatmentType = 'Treatment type is required';

    return newErrors;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/appoinment', formData);
      alert('Appointment Created!');
      setFormData({
        name: '',
        address: '',
        mobileNumber: '',
        gender: '',
        doctor: '',
        scheduleTime: '',
        treatmentType: ''
      });
    } catch (err) {
      alert('Error creating appointment');
    }
  };

  return (
    <div className='list'>
      <Sidebar />
        <div className='listContainer'>
            <Navbar />
        <div className="appointment-form-container">
        <h2>Appointments</h2>
        <p>Enter your medical conditions</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Patient Name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
                placeholder="Address"
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-group">
            <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className={errors.mobileNumber ? 'error' : ''}
                placeholder="Mobile Number"
            />
            {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
            </div>

            <div className="form-group">
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
            </div>

            <div className="form-group">
            <select name="doctor" value={formData.doctor} onChange={handleInputChange}>
                <option value="">Doctor</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. Jenny">Dr. Jenny</option>
            </select>
            {errors.doctor && <span className="error-text">{errors.doctor}</span>}
            </div>

            <div className="form-group">
            <input
                type="datetime-local"
                name="scheduleTime"
                value={formData.scheduleTime}
                onChange={handleInputChange}
                className={errors.scheduleTime ? 'error' : ''}
            />
            {errors.scheduleTime && <span className="error-text">{errors.scheduleTime}</span>}
            </div>

            <div className="form-group">
            {/* <input
                type="text"
                name="treatmentType"
                value={formData.treatmentType}
                onChange={handleInputChange}
                className={errors.treatmentType ? 'error' : ''}
                placeholder="Treatment Type"
            /> */}
            <select name="treatmentType" value={formData.treatmentType} onChange={handleInputChange}>
                <option value="">Treatment Type</option>
                <option value="Counsiling">Counsiling</option>
                <option value="Medical Test">Medical Test</option>
                <option value="Medical Report">Medical Report Check</option>
                <option value="Therapy">Therapy</option>
            </select>
            {errors.treatmentType && <span className="error-text">{errors.treatmentType}</span>}
            </div>

            <button type="submit" className="submit-button">Continue</button>
        </form>
        </div>
        </div>
    </div>
  );
};

export default AppointmentForm;
