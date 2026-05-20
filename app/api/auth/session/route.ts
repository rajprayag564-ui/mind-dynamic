import { NextResponse } from "next/server";

// Optional Firebase Admin verification. To enable secure verification set
// the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to point to a
// service account JSON file (do NOT commit that file to the repo).
// Example: export GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"


export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const idToken = body?.idToken;

    if (!idToken) {
      return NextResponse.json({ ok: false, error: "Missing idToken" }, { status: 400 });
    }

    try {
      const { getAuth, getFirestore } = await import("@/lib/firebase/admin");
      const auth = getAuth();
      const decoded = await auth.verifyIdToken(idToken);
      if (!decoded) {
        return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
      }

      // Create or update users collection record
      try {
        const db = getFirestore();
        await db.collection("users").doc(decoded.uid).set(
          {
            uid: decoded.uid,
            email: decoded.email || null,
            name: decoded.name || null,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn("Failed to write user record:", e);
      }

      const response = NextResponse.json({ ok: true });
      response.cookies.set({
        name: "dfm_session",
        value: decoded.uid,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    } catch (err) {
      console.error("Auth/session error:", err);
      return NextResponse.json({ ok: false, error: "Server configuration error" }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: "dfm_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
