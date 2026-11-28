import { notFound, redirect } from "next/navigation";
import { configured, sessionDb, requireAdmin } from "../../lib/supabase";
import { signOut } from "../actions";
import PublishingDesk from "../../components/PublishingDesk";
export const dynamic = "force-dynamic";
export const metadata = {
  robots: { index: false, follow: false },
};
export default async function Admin() {
  // Unconfigured deployments and non-owner accounts get the generic 404 page;
  // nothing here should reveal setup details or that a dashboard exists.
  if (!configured()) notFound();
  const session = await sessionDb();
  const {
    data: { user: sessionUser },
  } = await session.auth.getUser();
  if (!sessionUser) redirect("/login?next=/admin");
  // Server-side owner check: ADMIN_EMAIL plus the is_portfolio_admin RPC.
  // notFound() must stay outside try/catch because it works by throwing.
  const owner = await requireAdmin().catch(() => null);
  if (!owner) notFound();
  const { db, user } = owner;
  const { data, error } = await db
    .from("portfolio_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error)
    throw new Error("Could not load articles. Check the database migration.");
  const { error: notesError } = await db
    .from("portfolio_posts")
    .select("kind")
    .limit(0);
  return (
    <div className="container admin-shell">
      <div className="page-heading">
        <span className="eyebrow">Private · publishing desk</span>
        <h1>
          Make a note.
          <br />
          <em>Share a discovery.</em>
        </h1>
      </div>
      <div className="admin-bar">
        <p>Signed in as {user.email}</p>
        <form action={signOut}>
          <button className="button secondary">Sign out</button>
        </form>
      </div>
      <PublishingDesk posts={data || []} notesReady={!notesError} />
    </div>
  );
}
