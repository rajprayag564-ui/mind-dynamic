import { NextResponse } from "next/server";
import { getPendingTransactions } from "@/lib/firebase/transactions";

export async function GET() {
  try {
    const transactions = await getPendingTransactions();
    return NextResponse.json(transactions, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error fetching pending transactions:", message);

    return NextResponse.json(
      {
        message: "Failed to fetch pending transactions",
        error: message,
      },
      { status: 500 }
    );
  }
}
