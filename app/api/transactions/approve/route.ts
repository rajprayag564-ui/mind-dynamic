import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getFirestore, serverTimestamp } from "@/lib/firebase/admin";
import { isUserAdmin } from "@/lib/admin-check";

type Body = {
  transactionId: string;
  status: string;
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

export async function PATCH(request: Request) {
  try {
    const uid = getSessionUid();
    if (!uid) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(uid);
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body: Body = await request.json();
    if (!body?.transactionId || !body?.status) {
      return NextResponse.json({ message: "Missing transactionId or status" }, { status: 400 });
    }

    const db = getFirestore();
    const transactionRef = db.collection("transactions").doc(body.transactionId);
    const transactionSnap = await transactionRef.get();

    if (!transactionSnap.exists) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    await transactionRef.set(
      {
        status: body.status,
        approvedBy: uid,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({
      ok: true,
      message: `Transaction status updated to ${body.status}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Failed to update transaction" }, { status: 500 });
  }
}
