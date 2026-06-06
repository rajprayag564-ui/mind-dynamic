import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";

type Body = {
  courseTitle: string;
  price: number;
  utrNumber: string;
  status: string;
  userUpiId?: string;
};

function getSessionUid() {
  const raw = cookies().get("dfm_session")?.value;
  if (!raw) return null;

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    if (!body?.courseTitle || !body?.price || !body?.utrNumber || !body?.status) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (body.utrNumber.length !== 12) {
      return NextResponse.json({ message: "UTR number must be exactly 12 characters" }, { status: 400 });
    }

    const uid = getSessionUid();
    if (!uid) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const db = getFirestore();

    // Check for duplicate UTR number
    const existingUtr = await db
      .collection("transactions")
      .where("utrNumber", "==", body.utrNumber)
      .limit(1)
      .get();

    if (!existingUtr.empty) {
      return NextResponse.json(
        { message: "This UTR number has already been submitted. Each UTR can only be used once." },
        { status: 409 }
      );
    }

    const transactionRef = db.collection("transactions").doc();
    const transactionId = transactionRef.id;

    await transactionRef.set({
      id: transactionId,
      userId: uid,
      courseTitle: body.courseTitle,
      price: body.price,
      utrNumber: body.utrNumber,
      status: body.status,
      userUpiId: body.userUpiId || null,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      ok: true,
      message: "Payment submitted for verification",
      transactionId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Failed to process transaction" }, { status: 500 });
  }
}
