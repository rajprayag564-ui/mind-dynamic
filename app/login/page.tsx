"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import {
  loginWithEmailPassword,
  loginWithGoogle,
  signUpWithEmailPassword,
} from "@/lib/firebase/auth";
import { hasFirebaseClientConfig, getFirebaseAuth } from "@/lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const firebaseReady = hasFirebaseClientConfig();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nextPath, setNextPath] = useState("/dashboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") || "/dashboard");
  }, []);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmailPassword(email, password);
      } else {
        await loginWithEmailPassword(email, password);
      }

      // attempt to fetch an idToken from the client and send it to the server
      try {
        const auth = getFirebaseAuth();
        const idToken = await auth?.currentUser?.getIdToken();
        if (idToken) {
          await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
        } else {
          await fetch("/api/auth/session", { method: "POST" });
        }
      } catch {
        await fetch("/api/auth/session", { method: "POST" });
      }

      router.push(nextPath);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await loginWithGoogle();
      try {
        const auth = getFirebaseAuth();
        const idToken = await auth?.currentUser?.getIdToken();
        if (idToken) {
          await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
        } else {
          await fetch("/api/auth/session", { method: "POST" });
        }
      } catch {
        await fetch("/api/auth/session", { method: "POST" });
      }
      router.push(nextPath);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
          Secure Access
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-blue-100">
          Login to continue your Dynamic Fast Mind learning journey.
        </p>
        {!firebaseReady ? (
          <p className="mt-3 rounded-lg border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
            Firebase config is missing. Add NEXT_PUBLIC_FIREBASE_* values in
            .env.local and restart the dev server.
          </p>
        ) : null}

        <form
          onSubmit={handleAuth}
          className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-blue-50">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={!firebaseReady}
                className="w-full rounded-lg border border-white/15 bg-[#111a46] px-3 py-2.5 outline-none transition focus:border-[#3B82F6]"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-blue-50">
                Password
              </label>
              <input
                id="password"
                type="password"
                minLength={6}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={!firebaseReady}
                className="w-full rounded-lg border border-white/15 bg-[#111a46] px-3 py-2.5 outline-none transition focus:border-[#3B82F6]"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          {errorMessage ? (
            <p className="mt-3 text-xs text-rose-300">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading || !firebaseReady}
            className="mt-5 w-full rounded-lg bg-[#3B82F6] px-4 py-2.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading
              ? "Please wait..."
              : isSignUp
                ? "Create Account"
                : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || !firebaseReady}
            className="mt-3 w-full rounded-lg border border-white/20 bg-transparent px-4 py-2.5 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp((current) => !current)}
            className="mt-4 w-full text-sm text-blue-200 hover:text-white"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "New here? Create an account"}
          </button>
        </form>

        <Link href="/" className="mt-4 text-center text-sm text-blue-200 hover:text-white">
          Back to Home
        </Link>
      </main>
    </div>
  );
}
