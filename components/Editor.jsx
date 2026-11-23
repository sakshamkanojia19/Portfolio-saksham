"use client";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { savePost, uploadImage } from "../app/actions";
import Markdown from "./Markdown";
import { starterDrafts } from "../lib/drafts";
function PostEditor({ initial, onDirtyChange }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(savePost, {});
  const [savedId, setSavedId] = useState(initial.id || "");
  const [title, setTitle] = useState(initial.title || "");
  const [slug, setSlug] = useState(initial.slug || "");
  const [excerpt, setExcerpt] = useState(initial.excerpt || "");
  const [tags, setTags] = useState(
    Array.isArray(initial.tags) ? initial.tags.join(", ") : initial.tags || "",
  );
  const [body, setBody] = useState(initial.body || "");
  const [preview, setPreview] = useState(false);
  const [upload, setUpload] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    onDirtyChange(dirty);
  }, [dirty, onDirtyChange]);
  useEffect(() => {
    if (state.success) setDirty(false);
    if (state.id) setSavedId(state.id);
  }, [state]);
  useEffect(() => {
    function leave(e) {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", leave);
    return () => window.removeEventListener("beforeunload", leave);
  }, [dirty]);
  async function imageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUpload("Uploading…");
    const form = new FormData();
    form.set("image", file);
    try {
      const result = await uploadImage(form);
      if (result.url) {
        setBody((b) => `${b}\n\n![Describe this image](${result.url})\n`);
        setDirty(true);
        setUpload(
          "Image added. Replace “Describe this image” with useful alt text. Uploaded images are publicly accessible, including images in drafts.",
        );
      } else setUpload(result.error);
    } catch {
      setUpload("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }
  return (
    <form action={action} className="editor" onChange={() => setDirty(true)}>
      <fieldset disabled={pending} className="editor-fields">
        <input type="hidden" name="id" value={savedId} />
        <label>
          Title
          <input
            name="title"
            required
            minLength={5}
            maxLength={160}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          URL slug
          <input
            name="slug"
            required
            maxLength={100}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <span className="form-note">
            Use lowercase words and hyphens. Published URLs stay fixed.
          </span>
        </label>
        <label>
          Search & social description
          <textarea
            name="excerpt"
            required
            minLength={20}
            maxLength={300}
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>
        <label>
          Tags <span>(comma separated, up to 5)</span>
          <input
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <div className="editor-tabs">
          <button
            type="button"
            aria-pressed={!preview}
            onClick={() => setPreview(false)}
          >
            Write Markdown
          </button>
          <button
            type="button"
            aria-pressed={preview}
            onClick={() => setPreview(true)}
          >
            Preview
          </button>
        </div>
        {preview ? (
          <>
            <input type="hidden" name="body" value={body} />
            <Markdown>{body || "*Your preview will appear here.*"}</Markdown>
          </>
        ) : (
          <label>
            Article content
            <textarea
              name="body"
              required
              minLength={50}
              maxLength={100000}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Start with a problem you solved…"
            />
          </label>
        )}
        <div className="upload-control">
          <label>
            Add an image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={imageUpload}
              disabled={uploading}
            />
          </label>
          <p className="form-note">
            Up to 4 MB. Images are public; don’t upload private material.
          </p>
          <p role="status" className="form-note">
            {upload}
          </p>
        </div>
        <div className="editor-actions">
          <button
            className="button secondary"
            name="status"
            value="draft"
            disabled={pending || uploading}
          >
            {pending ? "Saving…" : "Save as draft"}
          </button>
          <button
            className="button primary"
            name="status"
            value="published"
            disabled={pending || uploading}
          >
            {pending ? "Saving…" : "Publish article"}
          </button>
        </div>
        <p className="form-note">
          Saving a published article as a draft removes it from public pages.
          Review outlines before publishing.
        </p>
        <p className="status-message" role="status">
          {state.error || state.success}
        </p>
        {state.success && (
          <button
            type="button"
            className="text-link plain-button"
            onClick={() => router.refresh()}
          >
            Refresh article list
          </button>
        )}
        {state.success?.startsWith("Article published") && (
          <p>
            <Link className="text-link" href={`/writing/${state.slug}`}>
              View published article
            </Link>
          </p>
        )}
      </fieldset>
    </form>
  );
}
export default function Editor({ posts, onDirtyChange }) {
  const [selected, setSelected] = useState({ key: "new", data: {} });
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    onDirtyChange?.(hasChanges);
  }, [hasChanges, onDirtyChange]);
  function select(key, data) {
    if (
      selected.key !== key &&
      (!hasChanges ||
        window.confirm("Switch articles? Your unsaved changes will be lost."))
    )
      setSelected({ key, data });
  }
  return (
    <div className="admin-grid">
      <aside className="admin-posts">
        <button
          className={selected.key.startsWith("new") ? "active" : ""}
          onClick={() => select(`new-${crypto.randomUUID()}`, {})}
        >
          + New article
        </button>
        {posts.map((p) => (
          <button
            key={p.id}
            className={selected.key === p.id ? "active" : ""}
            onClick={() => select(p.id, p)}
          >
            {p.title}
            <small>{p.status === "published" ? "Published" : "Draft"}</small>
          </button>
        ))}
        <span className="eyebrow" style={{ marginTop: 20 }}>
          STARTER OUTLINES
        </span>
        {starterDrafts.map((p, i) => (
          <button key={p.slug} onClick={() => select(`outline-${i}`, p)}>
            {p.title}
            <small>Unpublished outline · edit before sharing</small>
          </button>
        ))}
      </aside>
      <PostEditor
        key={selected.key}
        initial={selected.data}
        onDirtyChange={setHasChanges}
      />
    </div>
  );
}
