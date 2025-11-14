// src/components/PaymentModal.jsx
import React, { useState } from 'react';

export default function PaymentModal({ reservation, onSuccess, onClose }) {
  const [method, setMethod] = useState('gcash');

  const handlePay = () => {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Complete Payment</h3>
        <p className="mb-4">Pay within 30 minutes to confirm:</p>
        <div className="space-y-2 mb-4">
          <p><strong>Date:</strong> {reservation.date}</p>
          <p><strong>Time:</strong> {reservation.time} - {reservation.endTime}</p>
          <p><strong>Guests:</strong> {reservation.guests}</p>
        </div>
        <select value={method} onChange={e => setMethod(e.target.value)} className="w-full p-2 border rounded mb-4">
          <option value="gcash">GCash</option>
          <option value="maya">Maya</option>
          <option value="card">Card</option>
        </select>
        <div className="flex gap-2">
          <button onClick={handlePay} className="flex-1 bg-green-600 text-white py-2 rounded">Pay Now</button>
          <button onClick={onClose} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}