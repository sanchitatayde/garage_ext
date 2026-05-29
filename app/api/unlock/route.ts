import { NextResponse } from "next/server";

const COOKIE_NAME = "pp_unlocked";

// Cookie lifetime in hours. Configurable via the PROTOTYPE_SESSION_HOURS env
// var (default 4). After this many hours the visitor has to sign in again.
function sessionMaxAgeSeconds(): number {
  const raw = process.env.PROTOTYPE_SESSION_HOURS;
  const hours = raw ? Number(raw) : 4;
  if (!Number.isFinite(hours) || hours <= 0) return 4 * 60 * 60;
  return Math.round(hours * 60 * 60);
}

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
    maxAge: sessionMaxAgeSeconds(),
  });
  return res;
}
