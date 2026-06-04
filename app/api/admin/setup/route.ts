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
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const setupKey = body?.setupKey;

    const expectedKey = process.env.NEXT_PUBLIC_ADMIN_SETUP_KEY;
    if (!expectedKey || setupKey !== expectedKey) {
      return NextResponse.json({ message: "Invalid or missing setup key" }, { status: 403 });
    }

    const db = getFirestore();
    await db.collection("users").doc(uid).set(
      {
        role: "admin",
      },
      { merge: true }
    );

    return NextResponse.json({
      ok: true,
      message: "Admin role granted successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || "Failed to grant admin role" }, { status: 500 });
  }
}
