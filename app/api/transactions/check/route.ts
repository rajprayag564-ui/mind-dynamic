import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getFirestore } from "@/lib/firebase/admin";

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
    const uid = getSessionUid();
    if (!uid) {
      return NextResponse.json({ status: "none" });
    }

    const body = await request.json().catch(() => ({}));
    const courseTitle = body?.courseTitle;

    if (!courseTitle) {
      return NextResponse.json({ status: "none" });
    }

    const db = getFirestore();
    const snapshot = await db
      .collection("transactions")
      .where("userId", "==", uid)
      .where("courseTitle", "==", courseTitle)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ status: "none" });
    }

    const transaction = snapshot.docs[0].data();
    return NextResponse.json({
      status: transaction.status, // "pending", "approved", or "rejected"
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Failed to check transaction" }, { status: 500 });
  }
}
