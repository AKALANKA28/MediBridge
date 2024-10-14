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
        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <img src="your-logo-url-here" alt="Logo" className="w-12 h-12 mx-auto mb-2"/>
                    <h2 className="text-3xl font-bold text-white">Register</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="Your Password"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                    <p className="mt-6 text-center text-gray-400">
                        Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PatientRegister;
