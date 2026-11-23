import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
export function configured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
export function publicDb() {
  if (!configured()) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }),
      },
    },
  );
}
export async function sessionDb() {
  if (!configured()) return null;
  const jar = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => jar.getAll(),
        setAll: (entries) => {
          try {
            entries.forEach(({ name, value, options }) =>
              jar.set(name, value, options),
            );
          } catch {
            /* Server components cannot write cookies; proxy refreshes them. */
          }
        },
      },
    },
  );
}
export async function requireAdmin() {
  const db = await sessionDb();
  if (!db) throw new Error("Publishing is not configured yet.");
  const {
    data: { user },
  } = await db.auth.getUser();
  if (
    !user ||
    !process.env.ADMIN_EMAIL ||
    user.email?.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()
  )
    throw new Error("Only the publishing account can perform this action.");
  const { data: allowed, error } = await db.rpc("is_portfolio_admin");
  if (error || !allowed)
    throw new Error(
      "The publishing account has not been authorized in the database.",
    );
  return { db, user };
}
