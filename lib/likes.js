import { publicDb } from "./supabase";
// Public like totals for published posts. `available` is false when Supabase is
// not configured or the likes migration has not been applied yet.
export async function getLikeCounts(ids) {
  const db = publicDb();
  if (!db) return { counts: {}, available: false };
  if (!ids.length) return { counts: {}, available: true };
  try {
    const { data, error } = await db.rpc("portfolio_like_counts", {
      target_posts: ids.slice(0, 100),
    });
    if (error) return { counts: {}, available: false };
    return {
      counts: Object.fromEntries(
        (data || []).map((r) => [r.post_id, Number(r.like_count)]),
      ),
      available: true,
    };
  } catch {
    return { counts: {}, available: false };
  }
}
