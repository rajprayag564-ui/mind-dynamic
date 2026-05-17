import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase/client";

function requireAuth() {
  const auth = getFirebaseAuth();

  if (!auth) {
    throw new Error("Firebase Auth is only available in the browser.");
  }

  return auth;
}

export async function loginWithEmailPassword(email: string, password: string) {
  const auth = requireAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmailPassword(email: string, password: string) {
  const auth = requireAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  const auth = requireAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function logoutUser() {
  const auth = requireAuth();
  return signOut(auth);
}
