// components/AdminOrders.tsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';

interface Order {
  id: string;
  user_id: string;
  course_id: string;
  buyer_name: string;
  buyer_email: string;
  utr_number: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: { toDate: () => Date }; // Firestore Timestamp
  updated_at: { toDate: () => Date }; // Firestore Timestamp
}

const AdminOrders: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real application, this would be an API route like /api/admin/orders
      // For now, we'll simulate fetching from an admin-protected endpoint.
      const response = await fetch('/api/admin/orders'); // Assuming you'll create this endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPendingOrders(Array.isArray(data) ? data : data.orders ?? []);
    } catch (err) {
      console.error("Failed to fetch pending orders:", err);
      setError("Failed to fetch pending orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingOrders();
  }, [fetchPendingOrders]);

  const handleAction = async (orderId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      const response = await fetch('/api/admin/orders/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers here for production
        },
        body: JSON.stringify({ order_id: orderId, action }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Remove the order from the list or update its status locally
      setPendingOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      alert(`Order ${orderId} ${action.toLowerCase()}D successfully.`);
    } catch (err: any) {
      console.error(`Failed to ${action.toLowerCase()} order ${orderId}:`, err);
      setError(err.message || `Failed to ${action.toLowerCase()} order.`);
    }
  };

  if (loading) return <div className="text-center py-8">Loading pending orders...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (pendingOrders.length === 0) return <div className="text-center py-8">No pending orders found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Order Verification</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Buyer Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Buyer Email</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">UTR Number</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{new Date(order.created_at.toDate()).toLocaleString()}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{order.buyer_name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{order.buyer_email}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{order.utr_number}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleAction(order.id, 'APPROVE')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs mr-2 transition duration-150 ease-in-out"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(order.id, 'REJECT')}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs transition duration-150 ease-in-out"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
