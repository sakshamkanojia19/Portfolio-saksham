// Owner authorization shared by proxy.js (gates /admin before rendering) and
// requireAdmin() (gates every server action). Both checks are required:
// the ADMIN_EMAIL match is a server-side guard, and the is_portfolio_admin RPC
// reflects the portfolio_admins allowlist that Supabase RLS enforces.
export function isOwnerEmail(user, adminEmail = process.env.ADMIN_EMAIL) {
  return Boolean(
    user?.email &&
      adminEmail &&
      user.email.toLowerCase() === adminEmail.toLowerCase(),
  );
}
export async function hasAdminGrant(db) {
  try {
    const { data, error } = await db.rpc("is_portfolio_admin");
    return !error && Boolean(data);
  } catch {
    return false;
  }
}
export async function isPortfolioOwner(db, user, adminEmail) {
  return isOwnerEmail(user, adminEmail) && (await hasAdminGrant(db));
}
