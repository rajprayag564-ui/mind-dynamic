// pages/api/admin/orders/verify.ts

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

  const { order_id, action } = req.body;

  if (!order_id || !action) {
    return res.status(400).json({ error: 'Missing required fields: order_id and action.' });
  }

  if (action !== 'APPROVE' && action !== 'REJECT') {
    return res.status(400).json({ error: 'Invalid action. Must be APPROVE or REJECT.' });
  }

  try {
    const orderRef = db.collection('orders').doc(order_id);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const orderData = orderDoc.data();

    if (orderData?.status !== 'PENDING') {
      return res.status(400).json({ error: 'Order is not in PENDING status.' });
    }

    await orderRef.update({
      status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (action === 'APPROVE') {
      // TODO: Implement authorization logic here.
      // This would typically involve updating the user's record to grant access
      // to the specific course. For example:
      // await db.collection('users').doc(orderData.user_id).update({
      //   enrolledCourses: admin.firestore.FieldValue.arrayUnion(orderData.course_id)
      // });
      console.log(`User ${orderData?.user_id} granted access to course ${orderData?.course_id}`);
    }

    res.status(200).json({ message: `Order ${order_id} ${action.toLowerCase()}D successfully.` });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
