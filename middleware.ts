import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "pp_unlocked";

/**
 * Soft password gate. If the visitor doesn't have the unlock cookie, we
 * redirect them to /unlock; they enter a password, we set the cookie, they
 * come back. The cookie is httpOnly so it can't be set from the console.
 *
 * The password lives in the `PROTOTYPE_PASSWORD` env var (set it on Vercel
 * → Project Settings → Environment Variables, and locally in .env.local).
 *
 * This is a polite gate suitable for sharing a prototype with stakeholders;
 * it is NOT a security boundary for sensitive data.
 */
export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie?.value === "ok") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.searchParams.set(
    "next",
    req.nextUrl.pathname + (req.nextUrl.search || "")
  );
  return NextResponse.redirect(url);
}

// Skip Next internals, static assets, the unlock UI itself, the unlock API
// and the cross-prototype bridge from customerext.vercel.app.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|unlock|api/unlock|api/bridge).*)",
  ],
};
