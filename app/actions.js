"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, sessionDb } from "../lib/supabase";
import { validatePost, safeNext } from "../lib/validation.mjs";
import { siteUrl } from "../lib/site";
import { prepareNote } from "../lib/publication.mjs";
export async function saveNote(_, form) {
  try {
    const { db, user } = await requireAdmin();
    const post = prepareNote(
      Object.fromEntries(form),
      crypto.randomUUID().slice(0, 8),
    );
    const id = String(form.get("id") || "");
    let query;
    if (id) {
      if (!/^[0-9a-f-]{36}$/i.test(id))
        return { error: "Invalid post identifier." };
      const { data: existing, error } = await db
        .from("portfolio_posts")
        .select("slug,kind")
        .eq("id", id)
        .single();
      if (error || existing?.kind !== "note")
        return { error: "This short post could not be found." };
      post.slug = existing.slug;
      query = db
        .from("portfolio_posts")
        .update(post)
        .eq("id", id)
        .eq("kind", "note");
    } else
      query = db
        .from("portfolio_posts")
        .insert({ ...post, author_id: user.id });
    const { data, error } = await query.select("id,slug,status").single();
    if (error)
      return {
        error:
          "Could not save. Confirm the short-post migration (202611240001_short_posts.sql) has been applied.",
      };
    for (const path of [
      "/",
      "/posts",
      "/admin",
      "/feed.xml",
      "/sitemap.xml",
      `/posts/${data.slug}`,
    ])
      revalidatePath(path);
    return {
      id: data.id,
      slug: data.slug,
      published: data.status === "published",
      success:
        data.status === "published"
          ? "Posted. Your thought is now public."
          : "Draft saved. Only you can see it.",
    };
  } catch (error) {
    return { error: error.message || "Could not save this post." };
  }
}
export async function sendLogin(_, form) {
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return { error: "Enter a valid email address." };
  const db = await sessionDb();
  if (!db)
    return { error: "Sign-in is not available yet. Please check back soon." };
  const next = safeNext(form.get("next"));
  const { error } = await db.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });
  if (error)
    return {
      error:
        "The sign-in email could not be sent. Please wait a minute and try again.",
    };
  return {
    success:
      "Check your inbox for a sign-in link. Open it in this browser. The link expires and can only be used once.",
  };
}
export async function signOut() {
  const db = await sessionDb();
  if (db) await db.auth.signOut();
  redirect("/");
}
export async function savePost(_, form) {
  try {
    const { db, user } = await requireAdmin();
    const post = validatePost(Object.fromEntries(form));
    const id = String(form.get("id") || "");
    if (id && !/^[0-9a-f-]{36}$/i.test(id))
      return { error: "Invalid article identifier." };
    const query = id
      ? db.from("portfolio_posts").update(post).eq("id", id)
      : db.from("portfolio_posts").insert({ ...post, author_id: user.id });
    const { data, error } = await query.select("id,slug,status").single();
    if (error)
      return {
        error:
          error.code === "23505"
            ? "That slug is already in use. Choose another."
            : "Could not save. Check your database setup. Published slugs cannot be changed.",
      };
    revalidatePath("/");
    revalidatePath("/writing");
    revalidatePath(`/writing/${data.slug}`);
    revalidatePath("/admin");
    revalidatePath("/feed.xml");
    revalidatePath("/sitemap.xml");
    return {
      success:
        data.status === "published"
          ? "Article published. It is now visible to everyone."
          : "Draft saved. Only you can see it.",
      id: data.id,
      slug: data.slug,
    };
  } catch (error) {
    return { error: error.message || "Could not save the article." };
  }
}
export async function uploadImage(form) {
  try {
    const { db, user } = await requireAdmin();
    const file = form.get("image");
    const types = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };
    if (
      !(file instanceof File) ||
      !types[file.type] ||
      file.size > 4 * 1024 * 1024 ||
      file.size === 0
    )
      return { error: "Choose a JPG, PNG, WebP, or GIF image under 4 MB." };
    const path = `${user.id}/${crypto.randomUUID()}.${types[file.type]}`;
    const { error } = await db.storage
      .from("portfolio-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error)
      return {
        error:
          "Upload failed. Check that the image bucket and owner policies are configured.",
      };
    return {
      url: db.storage.from("portfolio-images").getPublicUrl(path).data
        .publicUrl,
    };
  } catch {
    return { error: "Only the publishing account can upload images." };
  }
}
export async function vote(postId, active) {
  const db = await sessionDb();
  if (!db) return { error: "Voting is not available yet." };
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return { login: true };
  if (typeof active !== "boolean" || !/^[0-9a-f-]{36}$/i.test(postId))
    return { error: "Invalid vote." };
  const { data, error } = await db.rpc("set_portfolio_vote", {
    target_post: postId,
    desired: active,
  });
  if (error)
    return {
      error: "Could not update your vote. Wait a few seconds and try again.",
    };
  return { count: Number(data), voted: active };
}
