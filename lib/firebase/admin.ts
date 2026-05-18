import admin from "firebase-admin";
import fs from "fs";
import path from "path";

function loadServiceAccountJson() {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (fromEnv) return fromEnv;

  let currentDir = process.cwd();
  for (let depth = 0; depth < 6; depth += 1) {
    const envPath = path.join(currentDir, ".env.local");
    if (fs.existsSync(envPath)) {
      const contents = fs.readFileSync(envPath, "utf8");
      const match = contents.match(/FIREBASE_SERVICE_ACCOUNT_JSON=([^\r\n]+)/);
      if (match?.[1]) {
        return match[1].trim();
      }
    }

    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  return null;
}

function ensureInitialized() {
  if (admin.apps?.length) return;

  try {
    // 1) Prefer a JSON string in env (useful for hosting platforms)
    const raw = loadServiceAccountJson();
    if (raw) {
      const svc = JSON.parse(raw);
      admin.initializeApp({ credential: admin.credential.cert(svc) });
      return;
    }

    // 2) If GOOGLE_APPLICATION_CREDENTIALS points to a file, try applicationDefault
    //    which will use that file to provide credentials.
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      try {
        admin.initializeApp({ credential: admin.credential.applicationDefault() });
        return;
      } catch (e) {
        // fall through to next option
        console.warn('Firebase Admin applicationDefault init failed', e);
      }
    }

    // 3) As a last resort, attempt applicationDefault without env var.
    try {
      admin.initializeApp({ credential: admin.credential.applicationDefault() });
      return;
    } catch (err) {
      throw new Error("Firebase Admin initialization failed: " + (err as Error).message);
    }
  } catch (err) {
    throw new Error(`Firebase Admin initialization failed: ${(err as Error).message}`);
  }
}

export function getAuth() {
  ensureInitialized();
  return admin.auth();
}

export function getFirestore() {
  ensureInitialized();
  return admin.firestore();
}

export function serverTimestamp() {
  ensureInitialized();
  return admin.firestore.FieldValue.serverTimestamp();
}
