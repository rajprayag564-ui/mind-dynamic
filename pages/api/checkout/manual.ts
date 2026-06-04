import { db } from '@/lib/firebase/admin'; // Adjust path based on your project
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId, courseId, buyerName, buyerEmail, utrNumber } = req.body;

  // Input Validation
  if (!userId || !courseId || !buyerName || !buyerEmail || !utrNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!/^\d{12}$/.test(utrNumber)) {
    return res.status(400).json({ error: 'UTR must be exactly 12 digits' });
  }

  try {
    // USE THE UTR AS THE DOCUMENT ID
    const orderRef = db.collection('orders').doc(utrNumber);

    // .create() will FATALLY FAIL if a document with this UTR already exists
    await orderRef.create({
      user_id: userId,
      course_id: courseId,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      utr_number: utrNumber,
      status: 'PENDING',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    // Firebase code 6 / ALREADY_EXISTS handles the duplicate constraint natively
    if (error.code === 6 || error.message?.includes('ALREADY_EXISTS')) {
      return res.status(400).json({ error: 'This UTR number has already been used.' });
    }
    return res.status(500).json({ error: 'Database error processing your request.' });
  }
}