import { NextResponse } from "next/server";
import { sessionDb } from "../../../lib/supabase";
import { safeNext } from "../../../lib/validation.mjs";
export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));
  const db = await sessionDb();
  if (code && db) {
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(
    new URL(`/login?error=link&next=${encodeURIComponent(next)}`, url.origin),
  );
}
