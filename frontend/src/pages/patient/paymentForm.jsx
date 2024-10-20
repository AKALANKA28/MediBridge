import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import axios from 'axios';
import '../../style/paymentForm.css';  // Link to the external CSS file
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/patient/sidebar/Sidebar';

const PaymentForm = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const [formData, setFormData] = useState({
    bankName: '',
    cardHolderName: '',
    cardNumber: '',
    exp: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Automatically format the card number with spaces after every 4 digits
    if (name === 'cardNumber') {
      const formattedCardNumber = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        cardNumber: formattedCardNumber
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Validate form data before submitting
  const validateForm = () => {
    let formErrors = {};

    // Remove spaces before validation for the card number
    const cleanCardNumber = formData.cardNumber.replace(/\s+/g, '');

    // Bank Name validation
    if (!formData.bankName.trim()) {
      formErrors.bankName = 'Bank name is required';
    }

    // Card Holder Name validation
    if (!formData.cardHolderName.trim() || !/^[a-zA-Z\s]+$/.test(formData.cardHolderName)) {
      formErrors.cardHolderName = 'Card holder name must contain only letters and spaces';
    }

    // Card Number validation (exactly 16 digits)
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      formErrors.cardNumber = 'Card number must be exactly 16 digits';
    }

    // Expiry Date validation (MM/YY format)
    const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expRegex.test(formData.exp)) {
      formErrors.exp = 'Expiry date must be in MM/YY format';
    } else {
      const [month, year] = formData.exp.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
        formErrors.exp = 'Expiry date must be in the future';
      }
    }

    // CVV validation (3 or 4 digits)
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      formErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;  // Return true if no errors
  };

  // Submit form and send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Clean the card number by removing spaces before sending to backend
        const cleanCardNumber = formData.cardNumber.replace(/\s+/g, '');
        const response = await axios.post('http://localhost:8080/api/payment', {
          ...formData,
          cardNumber: cleanCardNumber  // Send card number without spaces
        });
        console.log(response.data);
        alert('Payment submitted successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to submit payment');
      }
    }
  };

  // Navigate to another method
  const handleNavigate = () => {
    navigate('/PaymentOpt'); // Replace '/another-method' with your desired route
  };

  return (
    <div className='list'>
      <Sidebar />
        <div className='listContainer'>
          <Navbar />
          <div className="form-container">
            <h2>Payment</h2>
            <p>Enter your payment information</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                />
                {errors.bankName && <span className="error">{errors.bankName}</span>}
              </div>
              <div className="input-group">
                <label>Card Holder Name</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleChange}
                  required
                />
                {errors.cardHolderName && <span className="error">{errors.cardHolderName}</span>}
              </div>
              <div className="input-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength="19"  // Limiting input length for formatted card number (16 digits + 3 spaces)
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>EXP (MM/YY)</label>
                  <input
                    type="text"
                    name="exp"
                    value={formData.exp}
                    onChange={handleChange}
                    required
                  />
                  {errors.exp && <span className="error">{errors.exp}</span>}
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                  {errors.cvv && <span className="error">{errors.cvv}</span>}
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Continue
              </button>
              <p 
                style={{ marginTop: '10px', cursor: 'pointer', color: 'blue' }} 
                onClick={handleNavigate} // Add click handler for navigation
              >
                Choose another method
              </p>
            </form>
          </div>
        </div>
    </div>
  );
};

export default PaymentForm;
