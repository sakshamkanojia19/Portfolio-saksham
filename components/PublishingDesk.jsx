"use client";
import { useState } from "react";
import QuickComposer from "./QuickComposer";
import Editor from "./Editor";
export default function PublishingDesk({ posts, notesReady }) {
  const [mode, setMode] = useState("note");
  const [selected, setSelected] = useState({ key: "new", post: {} });
  const [dirty, setDirty] = useState(false);
  function canSwitch() {
    return !dirty || window.confirm("Discard unsaved changes?");
  }
  function select(post = {}) {
    if (canSwitch()) setSelected({ key: post.id || crypto.randomUUID(), post });
  }
  function switchMode(next) {
    if (next !== mode && canSwitch()) {
      setMode(next);
      setDirty(false);
    }
  }
  return (
    <>
      <div className="publication-tabs" aria-label="Publishing format">
        <button
          aria-pressed={mode === "note"}
          onClick={() => switchMode("note")}
        >
          Short post
        </button>
        <button
          aria-pressed={mode === "article"}
          onClick={() => switchMode("article")}
        >
          Long-form article
        </button>
      </div>
      {mode === "note" ? (
        <>
          <h2 className="desk-title">A thought is enough.</h2>
          {!notesReady && (
            <p role="alert" className="setup-notice">
              Apply the follow-up migration{" "}
              <code>202611240001_short_posts.sql</code> in Supabase to activate
              short posts. Existing articles remain available.
            </p>
          )}
          <div className="admin-grid">
            <aside className="admin-posts">
              <button onClick={() => select()}>+ New short post</button>
              {posts
                .filter((p) => p.kind === "note")
                .map((p) => (
                  <button key={p.id} onClick={() => select(p)}>
                    {p.title}
                    <small>
                      {p.status === "published"
                        ? "Public post"
                        : "Private draft"}
                    </small>
                  </button>
                ))}
            </aside>
            {notesReady ? (
              <QuickComposer
                key={selected.key}
                initial={selected.post}
                onDirtyChange={setDirty}
              />
            ) : (
              <div className="empty-state">
                <h3>Short-post setup is pending.</h3>
                <p>
                  The follow-up migration preserves your articles and adds
                  support for short text.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <Editor
          posts={posts.filter((p) => p.kind !== "note")}
          onDirtyChange={setDirty}
        />
      )}
    </>
  );
}
