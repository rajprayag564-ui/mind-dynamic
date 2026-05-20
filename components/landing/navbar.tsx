import { cookies } from "next/headers";
import NavbarClient from "./navbar-client";

export function Navbar() {
  // Consider any non-empty dfm_session cookie value (uid) as authenticated.
  const isLoggedIn = !!cookies().get("dfm_session")?.value;

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}