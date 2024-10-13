// src/components/PatientRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const PatientRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/patients/register', formData);
            alert('Patient registered successfully');
        } catch (error) {
            alert('Error registering patient');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default PatientRegister;
