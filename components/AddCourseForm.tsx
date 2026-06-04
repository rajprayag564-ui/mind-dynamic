// components/AddCourseForm.tsx
"use client";

import React, { useState } from 'react';

const AddCourseForm: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [bunnyStreamVideoLink, setBunnyStreamVideoLink] = useState('');
  const [pdfResourceLink, setPdfResourceLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Basic frontend validation
    if (!courseTitle || !courseDescription || !price || !bunnyStreamVideoLink || !pdfResourceLink) {
      setError('All fields are required.');
      return;
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
        setError('Price must be a positive number.');
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/courses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseTitle,
          courseDescription,
          price: Number(price),
          bunnyStreamVideoLink,
          pdfResourceLink,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message || 'Course published successfully!');
        // Clear form fields
        setCourseTitle('');
        setCourseDescription('');
        setPrice('');
        setBunnyStreamVideoLink('');
        setPdfResourceLink('');
      } else {
        setError(data.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-red-600 text-center font-medium">{error}</p>}
        {message && <p className="text-green-600 text-center font-medium">{message}</p>}

        <div>
          <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Course Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="courseTitle"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description <span className="text-red-500">*</span></label>
          <textarea
            id="courseDescription"
            rows={4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
            disabled={isLoading}
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price <span className="text-red-500">*</span></label>
          <input
            type="number"
            id="price"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0.01"
            step="0.01"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="bunnyStreamVideoLink" className="block text-sm font-medium text-gray-700">Bunny Stream Video Link <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="bunnyStreamVideoLink"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
            value={bunnyStreamVideoLink}
            onChange={(e) => setBunnyStreamVideoLink(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="pdfResourceLink" className="block text-sm font-medium text-gray-700">PDF Resource Link <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="pdfResourceLink"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
            value={pdfResourceLink}
            onChange={(e) => setPdfResourceLink(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Publishing...' : 'Publish Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
