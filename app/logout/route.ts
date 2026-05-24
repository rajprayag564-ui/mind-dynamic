import { NextResponse } from "next/server";

function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: "dfm_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearSessionCookie(response);

  return response;
}

export async function GET(request: Request) {
  // Keep GET side-effect free. This avoids accidental logout from link prefetching.
  return NextResponse.redirect(new URL("/login", request.url));
}
