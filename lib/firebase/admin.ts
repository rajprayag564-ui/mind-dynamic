import admin from 'firebase-admin';
import { appendFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { Firestore } from 'firebase-admin/firestore';

/** Avoid webpack inlining empty values for secrets at compile time. */
function env(name: string): string | undefined {
  return process.env[name];
}

type ServiceAccountJson = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

function loadServiceAccountFromFile(): ServiceAccountJson | null {
  const credPath = env('GOOGLE_APPLICATION_CREDENTIALS');
  if (!credPath) return null;

  const resolved = join(
    process.cwd(),
    credPath.startsWith('.') ? credPath : credPath
  );
  if (!existsSync(resolved)) return null;

  try {
    return JSON.parse(readFileSync(resolved, 'utf8')) as ServiceAccountJson;
  } catch {
    return null;
  }
}

const DEBUG_LOG_PATH = join(process.cwd(), 'debug-18b736.log');

function agentLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
  runId = 'post-fix'
) {
  const entry = {
    sessionId: '18b736',
    location,
    message,
    data,
    hypothesisId,
    runId,
    timestamp: Date.now(),
  };
  try {
    appendFileSync(DEBUG_LOG_PATH, `${JSON.stringify(entry)}\n`);
  } catch {
    /* ignore */
  }
  // #region agent log
  fetch('http://127.0.0.1:7250/ingest/04df4a5e-b8a9-4880-9d71-3f25e061ae1b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '18b736',
    },
    body: JSON.stringify(entry),
  }).catch(() => {});
  // #endregion
}

function getServiceAccount() {
  const fileAccount = loadServiceAccountFromFile();

  const projectId =
    env('FIREBASE_ADMIN_PROJECT_ID') ?? fileAccount?.project_id;
  const clientEmail =
    env('FIREBASE_ADMIN_CLIENT_EMAIL') ?? fileAccount?.client_email;
  const envPrivateKey = env('FIREBASE_PRIVATE_KEY');
  const privateKey =
    envPrivateKey?.replace(/\\n/g, '\n') ?? fileAccount?.private_key;

  const privateKeySource = envPrivateKey
    ? 'env'
    : fileAccount?.private_key
      ? 'file'
      : 'none';

  agentLog(
    'lib/firebase/admin.ts:getServiceAccount',
    'credential env check',
    {
      hasProjectId: !!projectId,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey,
      privateKeySource,
      envPrivateKeyLength: envPrivateKey?.length ?? 0,
      serviceAccountFileFound: !!fileAccount,
      privateKeyHasEscapedNewline: envPrivateKey?.includes('\\n') ?? false,
    },
    'A,B,C,H6'
  );

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin credentials missing. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local (or provide GOOGLE_APPLICATION_CREDENTIALS with a valid serviceAccountKey.json), then restart the dev server.'
    );
  }

  return { projectId, clientEmail, privateKey };
}

function ensureInitialized(): admin.app.App {
  if (admin.apps.length > 0) {
    agentLog(
      'lib/firebase/admin.ts:ensureInitialized',
      'reuse existing app',
      { appsCount: admin.apps.length },
      'D'
    );
    return admin.app();
  }

  agentLog(
    'lib/firebase/admin.ts:ensureInitialized',
    'initializing new app',
    { appsCountBefore: 0 },
    'A,E'
  );

  const serviceAccount = getServiceAccount();

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...(env('FIREBASE_DATABASE_URL')
      ? { databaseURL: env('FIREBASE_DATABASE_URL') }
      : {}),
  });

  agentLog(
    'lib/firebase/admin.ts:ensureInitialized',
    'init success',
    { appsCountAfter: admin.apps.length },
    'A'
  );

  return app;
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

let dbAccessLogged = false;

/** Lazy Firestore — avoids initializing at module import time. */
export const db = new Proxy({} as Firestore, {
  get(_target, prop, receiver) {
    if (!dbAccessLogged) {
      dbAccessLogged = true;
      agentLog(
        'lib/firebase/admin.ts:db-proxy',
        'first db access',
        {},
        'D'
      );
    }
    const firestore = getFirestore();
    const value = Reflect.get(firestore as object, prop, receiver);
    return typeof value === 'function'
      ? (value as Function).bind(firestore)
      : value;
  },
});
