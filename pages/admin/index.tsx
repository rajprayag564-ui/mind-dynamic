// pages/admin/index.tsx
"use client";

import React, { useEffect, useState } from 'react';
import AddCourseForm from '../../components/AddCourseForm'; 
import PendingTransactionsTable from '@/components/PendingTransactionsTable';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'courses'>('payments');

  useEffect(() => {
    const el = document.querySelector('.min-h-screen');
    const bg = el ? getComputedStyle(el).backgroundColor : 'no-element';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Admin Dashboard</h1>

        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('payments')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${activeTab === 'payments'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Pending Payments
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${activeTab === 'courses'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Add New Course
              </button>
            </nav>
          </div>

          <div>
            {activeTab === 'payments' && <PendingTransactionsTable />}
            {activeTab === 'courses' && <AddCourseForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;