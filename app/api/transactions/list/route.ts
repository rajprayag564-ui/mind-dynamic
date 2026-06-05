import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getFirestore } from "@/lib/firebase/admin";
import { isUserAdmin } from "@/lib/admin-check";

function getSessionUid() {
  const raw = cookies().get("dfm_session")?.value;
  if (!raw) return null;

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function GET() {
  try {
    const uid = getSessionUid();
    if (!uid) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(uid);
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
    }

    const db = getFirestore();
    const snapshot = await db.collection("transactions")
      .orderBy("createdAt", "desc")
      .get();

    const transactions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      };
    });

    return NextResponse.json({ transactions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Failed to fetch transactions" }, { status: 500 });
  }
}
