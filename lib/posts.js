import { publicDb } from "./supabase";
export async function getPosts() {
  const db = publicDb();
  if (!db) return { posts: [], unavailable: false };
  try {
    const { data, error } = await db
      .from("portfolio_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) return { posts: [], unavailable: true };
    return { posts: data || [], unavailable: false };
  } catch {
    return { posts: [], unavailable: true };
  }
}
export async function getPost(slug) {
  const db = publicDb();
  if (!db) return null;
  const { data, error } = await db
    .from("portfolio_posts")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error)
    throw new Error("Articles are temporarily unavailable. Please try again.");
  return data;
}
