import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../../style/payment.css'; // Import the CSS styling

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    userId: '', bank: '', cardHolderName: '', amount: ''
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);
    if (!stripe || !cardElement) return;

    try {
      const response = await axios.post('/api/payments/create', {
        ...paymentData,
        cardNumber: cardElement._element,
        exp: '12/24', // Sample expiry
        cvv: '123', // Sample CVV
      });
      console.log('Payment successful', response.data);
    } catch (error) {
      console.error('Payment failed', error.response.data);
    }
  };

  return (
    <div className="payment-page">
      <div className="sidebar">
        <div className="profile">
          <img src="https://via.placeholder.com/50" alt="Profile" className="profile-pic" />
          <h3>Sarah Smith</h3>
          <p>Admin</p>
        </div>
        <div className="menu">
          <div className="menu-item selected">Appointment</div>
        </div>
      </div>
      <div className="main-content">
        <div className="navbar">
          <h2>MediBridge</h2>
          <div className="user-icons">
            <span>👤</span>
            <span>🔔</span>
          </div>
        </div>
        <div className="payment-container">
          <h3>Payment</h3>
          <form className="payment-form" onSubmit={handleSubmit}>
            <label>Bank Name</label>
            <input name="bank" placeholder="Bank" value={paymentData.bank} onChange={handleChange} required />
            
            <label>Card Holder Name</label>
            <input name="cardHolderName" placeholder="Card Holder Name" value={paymentData.cardHolderName} onChange={handleChange} required />
            
            <label>Amount</label>
            <input name="amount" placeholder="Amount" value={paymentData.amount} onChange={handleChange} required />
            
            <label>Card Details</label>
            <CardElement className="card-element" />
            
            <button type="submit" className="pay-btn" disabled={!stripe}>Pay Here</button>
          </form>
          <button className="other-payment-btn">Choose Other Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
