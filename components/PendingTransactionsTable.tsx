// components/PendingTransactionsTable.tsx
"use client";

import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  userName: string;
  courseTitle: string;
  amountOwed: number;
  createdAt?: { toDate: () => Date };
}

const PendingTransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/transactions/pending");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch transactions: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTransactions(Array.isArray(data) ? data : data.transactions || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch transactions";
        setError(errorMessage);
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600 font-medium">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p className="text-red-700 font-medium">Error: {error}</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 font-medium">
          No pending transactions found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Pending Transactions
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-6 text-left text-sm font-semibold">
                User Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold">
                Course Title
              </th>
              <th className="py-3 px-6 text-right text-sm font-semibold">
                Amount Owed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6 text-sm text-gray-800">
                  {transaction.userName}
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  {transaction.courseTitle}
                </td>
                <td className="py-4 px-6 text-right text-sm font-semibold text-indigo-600">
                  ₹{transaction.amountOwed.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Total Pending Transactions: <span className="font-semibold">{transactions.length}</span>
        </p>
        <p>
          Total Amount Owed:{" "}
          <span className="font-semibold">
            ₹
            {transactions
              .reduce((sum, t) => sum + t.amountOwed, 0)
              .toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PendingTransactionsTable;
