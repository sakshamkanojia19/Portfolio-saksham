"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, sessionDb, publicDb } from "../lib/supabase";
import { validatePost, validateReader, safeNext } from "../lib/validation.mjs";
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
export async function signIn(_, form) {
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(form.get("password") || "");
  if (!email || !password)
    return { error: "Enter your email and password.", email };
  const db = await sessionDb();
  if (!db) return { error: "Sign-in is not available right now.", email };
  const { error } = await db.auth.signInWithPassword({ email, password });
  // One generic message: never reveal whether an account exists.
  if (error)
    return {
      error:
        error.status === 429
          ? "Too many attempts. Please wait a few minutes and try again."
          : "Email or password is incorrect.",
      // Keep the email filled in; React resets the form after an action.
      email,
    };
  redirect(safeNext(form.get("next") || "/admin"));
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
// Reader actions: no account. Validation, deduplication, and throttling are
// enforced again inside the database functions.
const readerError = (error, fallback) =>
  error?.code === "PT429"
    ? "Too many requests right now. Please try again later."
    : error?.code === "PT404"
      ? "This post is not available."
      : error?.code === "PT400"
        ? error.message
        : fallback;
export async function likePost(postId, reader) {
  if (!/^[0-9a-f-]{36}$/i.test(String(postId)))
    return { error: "This post is not available." };
  let clean;
  try {
    clean = validateReader(reader);
  } catch (error) {
    return { error: error.message };
  }
  // Bots that fill the hidden field get a convincing no-op.
  if (reader?.website) return { liked: true };
  const db = publicDb();
  if (!db) return { error: "Likes are not available yet." };
  const { data, error } = await db.rpc("add_portfolio_like", {
    target_post: postId,
    reader_name: clean.name,
    reader_email: clean.email,
  });
  if (error)
    return {
      error: readerError(error, "Could not save your like. Please try again."),
    };
  return { liked: true, count: Number(data) };
}
export async function subscribeToUpdates(reader, source = "") {
  let clean;
  try {
    clean = validateReader(reader);
  } catch (error) {
    return { error: error.message };
  }
  if (reader?.website) return { subscribed: true };
  const db = publicDb();
  if (!db) return { error: "Email updates are not available yet." };
  const { error } = await db.rpc("add_portfolio_subscriber", {
    reader_name: clean.name,
    reader_email: clean.email,
    signup_source: String(source || "").slice(0, 200) || null,
  });
  if (error)
    return {
      error: readerError(error, "Could not subscribe you. Please try again."),
    };
  return { subscribed: true };
}
