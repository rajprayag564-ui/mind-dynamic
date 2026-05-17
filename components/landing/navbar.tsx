import { cookies } from "next/headers";
import dynamic from "next/dynamic";

// Render a lightweight server component that reads the session cookie,
// then mount a client-side interactive navbar for hamburger and back button.
const NavbarClient = dynamic(() => import("./navbar-client"), { ssr: false });

export function Navbar() {
  const isLoggedIn = cookies().get("dfm_session")?.value === "1";

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}