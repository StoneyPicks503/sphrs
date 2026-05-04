import { NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD || "sphrs2026";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip password check for the login page and its API
  if (pathname === "/login" || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check if user has valid auth cookie
  const auth = request.cookies.get("sphrs-auth");
  if (auth?.value === PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
