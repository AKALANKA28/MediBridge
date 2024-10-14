import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input name="userId" placeholder="User ID" value={paymentData.userId} onChange={handleChange} />
      <input name="bank" placeholder="Bank" value={paymentData.bank} onChange={handleChange} />
      <input name="cardHolderName" placeholder="Card Holder Name" value={paymentData.cardHolderName} onChange={handleChange} />
      <input name="amount" placeholder="Amount" value={paymentData.amount} onChange={handleChange} />
      
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default Payment;
