import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/PaymentOpt2.css'; // Import the stylesheet
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const PaymentOpt = () => {
  const navigate = useNavigate(); 
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNavigate = () => {
    navigate('/PaymentForm'); // Replace '/another-method' with your desired route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/paymentSlips', formData);
      alert('Slip uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Error uploading slip');
    }
  };

  return (
    <div className='list'>
      <Sidebar />
        <div className='listContainer'>
          <Navbar />
    <div className="payment-container">

      {/* Main content area */}
      <div className="main-content">

        <h2 className="payment-title">Payment</h2>

        {/* Bank Details Table */}
        <table className="payment-table">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Branch</th>
              <th>Acc No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bank Of Ceylon</td>
              <td>Malabe Branch</td>
              <td>155562</td>
            </tr>
            <tr>
              <td>Bank Of Ceylon</td>
              <td>Malabe Branch</td>
              <td>155562</td>
            </tr>
            <tr>
              <td>Bank Of Ceylon</td>
              <td>Malabe Branch</td>
              <td>155562</td>
            </tr>
          </tbody>
        </table>

        {/* File Upload */}
        <h3 className="payment-subtitle">Upload Your Bank Slip here</h3>
        <form onSubmit={handleSubmit} className="payment-form">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="file-input"
            accept=".jpg, .jpeg, .png, .pdf"
          />
          {file && <p className="file-name">{file.name}</p>}

          {/* Buttons */}
          <p 
          style={{ marginTop: '10px', cursor: 'pointer', color: 'blue' }} 
          onClick={handleNavigate} // Add click handler for navigation
          >
            Choose another method
          </p>
          <button type="submit" className="submit-button">
            Continue
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>

  );
};

export default PaymentOpt;
