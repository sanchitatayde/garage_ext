import { NextResponse } from "next/server";

const COOKIE_NAME = "pp_unlocked";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expectedUser = process.env.PROTOTYPE_USERNAME;
  const expectedPass = process.env.PROTOTYPE_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return NextResponse.json(
      { ok: false, reason: "not-configured" },
      { status: 500 }
    );
  }

  const userOk =
    typeof body.username === "string" && body.username === expectedUser;
  const passOk =
    typeof body.password === "string" && body.password === expectedPass;

  if (!userOk || !passOk) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK,
  });
  return res;
}
