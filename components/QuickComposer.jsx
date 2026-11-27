"use client";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { saveNote } from "../app/actions";
import Markdown from "./Markdown";
import Spinner from "./Spinner";
export default function QuickComposer({ initial = {}, onDirtyChange }) {
  const [state, action, pending] = useActionState(saveNote, {});
  const [body, setBody] = useState(initial.body || "");
  const [tags, setTags] = useState(initial.tags?.join(", ") || "");
  const [id, setId] = useState(initial.id || "");
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    onDirtyChange?.(dirty);
  }, [dirty, onDirtyChange]);
  useEffect(() => {
    if (state.id) setId(state.id);
    if (state.success) setDirty(false);
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
  return (
    <form
      action={action}
      className="quick-composer"
      onChange={() => setDirty(true)}
    >
      <fieldset className="editor-fields" disabled={pending}>
        <div className="composer-identity">
          <img src="/portrait.webp" alt="" width="44" height="44" />
          <div>
            <strong>Saksham Kanojia</strong>
            <span>Only you can publish · Everyone can read</span>
          </div>
        </div>
        <input type="hidden" name="id" value={id} />
        <label htmlFor="quick-body">What’s on your mind?</label>
        {preview ? (
          <>
            <input type="hidden" name="body" value={body} />
            <Markdown>{body || "*Your post preview appears here.*"}</Markdown>
          </>
        ) : (
          <textarea
            id="quick-body"
            name="body"
            rows={6}
            required
            maxLength={5000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="A thing you learned. A bug you solved. An idea worth sharing…"
          />
        )}
        <div className="composer-tools">
          <button
            type="button"
            className="text-link plain-button"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Back to editing" : "Preview"}
          </button>
          <span>{body.length.toLocaleString()} / 5,000</span>
        </div>
        <label>
          Topics <span>(optional, comma separated)</span>
          <input
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="RAG, Voice AI, Building in public"
          />
        </label>
        <p className="form-note">
          No title or SEO fields required. Links, Markdown, and image URLs are
          supported. You can edit or unpublish later.
        </p>
        <div className="editor-actions">
          <button
            name="status"
            value="draft"
            className="button secondary"
            disabled={pending || !body.trim()}
          >
            Save draft
          </button>
          <button
            name="status"
            value="published"
            className="button primary"
            disabled={pending || !body.trim()}
          >
            {pending ? (
              <>
                <Spinner /> Saving
              </>
            ) : id ? (
              "Publish changes"
            ) : (
              "Post publicly"
            )}
          </button>
        </div>
        <p role="status" className="status-message">
          {state.error || state.success}
        </p>
        {state.published && (
          <Link className="text-link" href={`/posts/${state.slug}`}>
            View your public post
          </Link>
        )}
      </fieldset>
    </form>
  );
}
