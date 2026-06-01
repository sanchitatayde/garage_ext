import { NextResponse } from "next/server";

const COOKIE_NAME = "pp_unlocked";

/**
 * Cross-prototype bridge. The Customer prototype (customerext.vercel.app)
 * sends visitors to this endpoint instead of /login so they don't see the
 * /unlock gate a second time. We set the unlock cookie ourselves and 302
 * to the requested next path inside the Garage app.
 *
 * This is a prototype convenience, not an auth boundary — direct visitors
 * to the Garage URL still hit /unlock as before.
 */
function sessionMaxAgeSeconds(): number {
  const raw = process.env.PROTOTYPE_SESSION_HOURS;
  const hours = raw ? Number(raw) : 4;
  if (!Number.isFinite(hours) || hours <= 0) return 4 * 60 * 60;
  return Math.round(hours * 60 * 60);
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const requestedNext = url.searchParams.get("next") || "/login";

  // Only allow relative paths so the bridge can't be turned into an
  // open-redirect to any URL.
  const next = requestedNext.startsWith("/") ? requestedNext : "/login";

  const target = new URL(next, url.origin);
  const res = NextResponse.redirect(target);
  res.cookies.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAgeSeconds(),
  });
  return res;
}
