import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow login page and all API routes through
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check cookie
  const auth = request.cookies.get("sphrs-auth");
  const password = process.env.SITE_PASSWORD || "sphrs2026";

  if (auth?.value === password) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
