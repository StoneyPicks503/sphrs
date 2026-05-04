import { NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD || "sphrs2026";

export async function POST(req) {
  const { password } = await req.json();

  if (password !== PASSWORD) {
    return NextResponse.json({ success: false });
  }

  const res = NextResponse.json({ success: true });

  // Set auth cookie — expires in 7 days
  res.cookies.set("sphrs-auth", PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res;
}
