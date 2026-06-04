// pages/api/admin/courses/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/firebase/admin'; // Adjust path as necessary
import admin from 'firebase-admin';

// IMPORTANT: Implement proper authentication and authorization for admin users.
// This is a placeholder for demonstration purposes.
const ADMIN_EMAIL = "admin@example.com"; // TODO: Replace with the client's actual admin email

const isAdmin = (req: NextApiRequest): boolean => {
  const userEmail = req.headers['x-user-email'];
  return userEmail === ADMIN_EMAIL;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!isAdmin(req)) {
    return res.status(403).json({ error: 'Forbidden: Not an admin.' });
  }

  const { title, description, price, bunnyStreamVideoLink, pdfResourceLink } = req.body;

  // Validate required fields
  if (!title || !price || !bunnyStreamVideoLink) {
    return res.status(400).json({ error: 'Course Title, Price, and Video Link are required.' });
  }

  // Validate price type and value
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number.' });
  }

  try {
    const newCourseRef = db.collection('courses').doc();
    await newCourseRef.set({
      id: newCourseRef.id,
      title,
      description: description || null, // Allow description to be optional
      price: Number(price), // Ensure price is stored as a number
      bunnyStreamVideoLink,
      pdfResourceLink: pdfResourceLink || null, // Allow PDF link to be optional
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'Course created successfully.', courseId: newCourseRef.id });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
