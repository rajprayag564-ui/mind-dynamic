import { getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let warnedAboutFirebaseConfig = false;

export function hasFirebaseClientConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!hasFirebaseClientConfig()) {
    if (!warnedAboutFirebaseConfig) {
      console.warn(
        "Firebase client config is missing. Set NEXT_PUBLIC_FIREBASE_* values in .env.local."
      );
      warnedAboutFirebaseConfig = true;
    }
    return null;
  }

  try {
    const app = getFirebaseApp();
    return getAuth(app);
  } catch (error) {
    if (!warnedAboutFirebaseConfig) {
      console.warn("Firebase auth failed to initialize.", error);
      warnedAboutFirebaseConfig = true;
    }
    return null;
  }
}
