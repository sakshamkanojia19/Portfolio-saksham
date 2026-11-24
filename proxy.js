import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { isPortfolioOwner } from "./lib/owner.mjs";
const isAdminPath = (pathname) =>
  pathname === "/admin" || pathname.startsWith("/admin/");
// Render the ordinary missing-page 404 without touching the admin route, so
// no dashboard code or markup is sent and the response matches any unknown URL.
const hideAdmin = (request) =>
  NextResponse.rewrite(new URL("/__not-found", request.url));
export async function proxy(request) {
  let response = NextResponse.next({ request });
  const adminRequest = isAdminPath(request.nextUrl.pathname);
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
    return adminRequest ? hideAdmin(request) : response;
  const db = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (entries) => {
          entries.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          entries.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  const {
    data: { user },
  } = await db.auth.getUser();
  if (adminRequest) {
    let gate = null;
    if (!user) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", "/admin");
      gate = NextResponse.redirect(login);
    } else if (!(await isPortfolioOwner(db, user))) gate = hideAdmin(request);
    if (gate) {
      // Keep any refreshed or cleared session cookies.
      response.cookies.getAll().forEach((cookie) => gate.cookies.set(cookie));
      gate.headers.set("Cache-Control", "private, no-store");
      return gate;
    }
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/auth/:path*",
    "/writing/:path*",
    "/posts/:path*",
  ],
};
