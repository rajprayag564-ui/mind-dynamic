import { getFirestore } from './admin';
import type { QueryConstraint } from 'firebase-admin/firestore';

export interface PendingTransaction {
  id: string;
  userName: string;
  courseTitle: string;
  amountOwed: number;
  createdAt?: FirebaseFirestore.Timestamp;
}

/**
 * Fetch all pending transactions from Firestore
 * @returns Promise resolving to array of pending transactions
 */
export async function getPendingTransactions(): Promise<PendingTransaction[]> {
  try {
    const db = getFirestore();
    const snapshot = await db
      .collection('transactions')
      .where('status', '==', 'pending')
      .get();

    const transactions: PendingTransaction[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        userName: data.userName || 'Unknown User',
        courseTitle: data.courseTitle || 'Unknown Course',
        amountOwed: data.amountOwed || 0,
        createdAt: data.createdAt,
      });
    });

    return transactions;
  } catch (error) {
    console.error('Error fetching pending transactions:', error);
    throw error;
  }
}

/**
 * Fetch pending transactions with optional filtering
 * @param constraints - Additional Firestore query constraints
 * @returns Promise resolving to array of pending transactions
 */
export async function getPendingTransactionsWithConstraints(
  constraints: QueryConstraint[] = []
): Promise<PendingTransaction[]> {
  try {
    const db = getFirestore();
    let query = db.collection('transactions').where('status', '==', 'pending');

    constraints.forEach((constraint) => {
      query = query.where(constraint._key, constraint._operation, constraint._value);
    });

    const snapshot = await query.get();
    const transactions: PendingTransaction[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        userName: data.userName || 'Unknown User',
        courseTitle: data.courseTitle || 'Unknown Course',
        amountOwed: data.amountOwed || 0,
        createdAt: data.createdAt,
      });
    });

    return transactions;
  } catch (error) {
    console.error('Error fetching pending transactions with constraints:', error);
    throw error;
  }
}
