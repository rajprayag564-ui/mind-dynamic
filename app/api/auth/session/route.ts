import { NextResponse } from "next/server";

// Optional Firebase Admin verification. To enable secure verification set
// the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to point to a
// service account JSON file (do NOT commit that file to the repo).
// Example: export GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"
let admin: any = null;
try {
  // require only when available to avoid bundling on the client
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  admin = require("firebase-admin");
} catch (e) {
  admin = null;
}

async function ensureAdminInitialized() {
  if (!admin) return false;
  if (admin.apps?.length) return true;

  try {
    // Prefer a JSON string in env (useful for Vercel) named FIREBASE_SERVICE_ACCOUNT_JSON
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({ credential: admin.credential.cert(svc) });
      return true;
    }

    // Next, support GOOGLE_APPLICATION_CREDENTIALS or application default
    try {
      admin.initializeApp({ credential: admin.credential.applicationDefault() });
      return true;
    } catch (e) {
      console.warn('Firebase Admin applicationDefault init failed', e);
    }
  } catch (err) {
    console.error('Failed to initialize Firebase Admin:', err);
  }

  return false;
}

async function verifyIdToken(idToken: string) {
  if (!admin) return null;
  try {
    const ok = await ensureAdminInitialized();
    if (!ok) return null;
    const decoded = await admin.auth().verifyIdToken(idToken);
    return decoded;
  } catch (err) {
    console.error("Firebase Admin verification error:", err);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const idToken = body?.idToken;

    if (idToken) {
      if (!process.env.GOOGLE_APPLICATION_CREDENTIALS || !admin) {
        return NextResponse.json({ ok: false, error: "Server not configured for token verification" }, { status: 500 });
      }

      const decoded = await verifyIdToken(idToken);
      if (!decoded) {
        return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
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
    }

    // Fallback for prototypes when no idToken provided
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: "dfm_session",
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
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
