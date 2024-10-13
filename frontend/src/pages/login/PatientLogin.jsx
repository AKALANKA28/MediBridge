// src/components/PatientLogin.js
import React, { useState } from 'react';
import axios from 'axios';

const PatientLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/patients/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Logged in successfully');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default PatientLogin;
