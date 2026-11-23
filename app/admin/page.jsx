import Link from "next/link";
import { redirect } from "next/navigation";
import { configured, sessionDb, requireAdmin } from "../../lib/supabase";
import { signOut } from "../actions";
import Editor from "../../components/Editor";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Publishing desk",
  robots: { index: false, follow: false },
};
export default async function Admin() {
  if (!configured())
    return (
      <div className="container auth-shell">
        <span className="eyebrow">PUBLISHING DESK</span>
        <h1>Ready when you are.</h1>
        <p>
          To activate publishing, add the Supabase settings from .env.example to
          .env.local, run the supplied database migration, and authorize your
          account using the setup guide.
        </p>
        <p>
          Your credentials stay outside version control. The public portfolio
          works without them.
        </p>
        <Link className="button secondary" href="/">
          View portfolio
        </Link>
      </div>
    );
  const db = await sessionDb();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login?next=/admin");
  try {
    await requireAdmin();
  } catch {
    return (
      <div className="container auth-shell">
        <h1>Private publishing desk.</h1>
        <p>
          This account does not have publishing access. Only the site owner can
          edit articles.
        </p>
        <form action={signOut}>
          <button className="button secondary">Sign out</button>
        </form>
      </div>
    );
  }
  const { data, error } = await db
    .from("portfolio_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error)
    throw new Error("Could not load articles. Check the database migration.");
  return (
    <div className="container admin-shell">
      <div className="page-heading">
        <span className="eyebrow">PRIVATE · PUBLISHING DESK</span>
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
      <Editor posts={data || []} />
    </div>
  );
}
