// components/CheckoutForm.tsx
"use client";

import React, { useState } from 'react';

const CheckoutForm = ({ courseId, userId }: { courseId: string; userId: string; }) => {
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!buyerName || !buyerEmail || !utrNumber) {
      setError('All fields are required.');
      return;
    }

    if (!/^\d{12}$/.test(utrNumber)) {
      setError('UTR Number must be exactly 12 digits and contain only numbers.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          courseId,
          buyerName,
          buyerEmail,
          utrNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Payment submitted. Access will be granted once our team verifies your UTR number within X hours.');
        setBuyerName('');
        setBuyerEmail('');
        setUtrNumber('');
      } else {
        setError(data.error || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Manual Payment Checkout</h2>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold mb-2">Scan to Pay via UPI:</p>
        <img
          src="/images/upi-qr-code-placeholder.png" // Placeholder for your UPI QR code image
          alt="UPI QR Code"
          className="mx-auto w-48 h-48 border border-gray-300 rounded-md"
        />
        <p className="mt-2 text-gray-700">UPI ID: <span className="font-mono font-semibold">your_upi_id@bank</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        <div>
          <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">
            Buyer Name
          </label>
          <input
            type="text"
            id="buyerName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            required
            disabled={isLoading || !!message}
          />
        </div>

        <div>
          <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700">
            Buyer Email
          </label>
          <input
            type="email"
            id="buyerEmail"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            required
            disabled={isLoading || !!message}
          />
        </div>

        <div>
          <label htmlFor="utrNumber" className="block text-sm font-medium text-gray-700">
            UTR Number (12 digits)
          </label>
          <input
            type="text"
            id="utrNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
            required
            maxLength={12}
            minLength={12}
            pattern="\\d{12}"
            title="UTR Number must be exactly 12 digits"
            disabled={isLoading || !!message}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isLoading || !!message}
        >
          {isLoading ? 'Submitting...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
