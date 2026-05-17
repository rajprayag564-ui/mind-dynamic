const fs = require('fs');
const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local not found in project root. Create it from .env.local.example first.');
  process.exit(2);
}

const raw = fs.readFileSync(envPath, 'utf8');
const lines = raw.split(/\r?\n/);
const env = {};
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  let val = trimmed.slice(eq + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  env[key] = val;
}

const requiredClient = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missing = requiredClient.filter((k) => !env[k]);
if (missing.length) {
  console.error('Missing required client env vars:', missing.join(', '));
} else {
  console.log('Client env vars: OK');
}

const svcPath = env.GOOGLE_APPLICATION_CREDENTIALS || './serviceAccountKey.json';
if (fs.existsSync(path.resolve(process.cwd(), svcPath))) {
  console.log('Service account file found at', svcPath);
} else {
  console.warn('Service account file not found at', svcPath);
}

console.log('To enable server-side token verification, install firebase-admin and set GOOGLE_APPLICATION_CREDENTIALS.');
