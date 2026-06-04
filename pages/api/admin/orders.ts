import { appendFileSync } from 'fs';
import { join } from 'path';
import { db } from '@/lib/firebase/admin';
import { NextApiRequest, NextApiResponse } from 'next';

function agentLog(message: string, data: Record<string, unknown>, hypothesisId: string) {
  const entry = {
    sessionId: '18b736',
    location: 'pages/api/admin/orders.ts',
    message,
    data,
    hypothesisId,
    runId: 'post-fix',
    timestamp: Date.now(),
  };
  try {
    appendFileSync(join(process.cwd(), 'debug-18b736.log'), `${JSON.stringify(entry)}\n`);
  } catch {
    /* ignore */
  }
  // #region agent log
  fetch('http://127.0.0.1:7250/ingest/04df4a5e-b8a9-4880-9d71-3f25e061ae1b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'18b736'},body:JSON.stringify(entry)}).catch(()=>{});
  // #endregion
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  agentLog('orders handler entered', { method: req.method }, 'D');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // QUICK BUDGET SECURITY: Hardcode your client's email or user ID from Firebase Auth 
  // to block random people from hitting this endpoint.
  // const token = req.headers.authorization; 
  // Perform your basic check here so nobody steals data

  try {
    // Fetch only the orders that need action
    const snapshot = await db
      .collection('orders')
      .where('status', '==', 'PENDING')
      .get();

    const toMillis = (value: unknown): number => {
      if (
        value &&
        typeof value === 'object' &&
        'toDate' in value &&
        typeof (value as { toDate: () => Date }).toDate === 'function'
      ) {
        return (value as { toDate: () => Date }).toDate().getTime();
      }
      if (value && typeof value === 'object' && '_seconds' in value) {
        return (value as { _seconds: number })._seconds * 1000;
      }
      return 0;
    };

    const pendingOrders = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort(
        (a, b) => toMillis(b.created_at) - toMillis(a.created_at)
      );

    agentLog('orders handler success', { count: pendingOrders.length }, 'A');
    return res.status(200).json(pendingOrders);
  } catch (error: any) {
    agentLog('orders handler error', { errorMessage: error?.message }, 'A,B,C,D,E');
    return res.status(500).json({ error: error.message });
  }
}