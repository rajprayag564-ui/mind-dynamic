"use client";

import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  userId: string;
  courseTitle: string;
  price: number;
  utrNumber: string;
  status: string;
  createdAt: string;
};

export default function PendingTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState<string | null>(null);

  async function fetchTransactions() {
    try {
      const response = await fetch("/api/transactions/list");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleApprove(transactionId: string) {
    if (!confirm("Are you sure you want to approve this transaction?")) {
      return;
    }

    setApproving(transactionId);
    try {
      const response = await fetch("/api/transactions/approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId,
          status: "approved",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to approve transaction");
      }

      await fetchTransactions();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert(`Error: ${message}`);
    } finally {
      setApproving(null);
    }
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading transactions...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (transactions.length === 0) {
    return <div className="p-6 text-center text-gray-600">No transactions.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">User ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Course Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Price (₹)</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">UTR Number</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Created At</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-mono">{tx.id.slice(0, 8)}...</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-mono">{tx.userId.slice(0, 10)}...</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{tx.courseTitle}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-semibold">₹{tx.price}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-mono">{tx.utrNumber}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  tx.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                {tx.createdAt 
                  ? new Date(tx.createdAt).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : '-'
                }
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {tx.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(tx.id)}
                    disabled={approving === tx.id}
                    className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                  >
                    {approving === tx.id ? 'Approving...' : 'Approve'}
                  </button>
                )}
                {tx.status === 'approved' && (
                  <span className="text-xs text-gray-600">✓ Approved</span>
                )}
                {tx.status === 'rejected' && (
                  <span className="text-xs text-red-600">✗ Rejected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
