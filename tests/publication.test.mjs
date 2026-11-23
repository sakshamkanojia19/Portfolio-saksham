import test from "node:test";
import assert from "node:assert/strict";
import { prepareNote, postPath } from "../lib/publication.mjs";
import { buildRss } from "../lib/rss.mjs";
test("short posts need only text; metadata is generated and routes stay distinct", () => {
  const post = prepareNote({ body: "Ship.", status: "published" }, "abcd1234");
  assert.equal(post.body, "Ship.");
  assert.equal(post.kind, "note");
  assert.ok(post.title.length >= 5);
  assert.ok(post.excerpt.length >= 20);
  assert.equal(postPath(post), "/posts/ship-abcd1234");
  assert.equal(
    postPath({ slug: "existing-article" }),
    "/writing/existing-article",
  );
});
test("short post validation rejects empty/oversized text and invalid topics", () => {
  for (const body of ["", "   ", "x".repeat(5001)])
    assert.throws(() => prepareNote({ body }, "abcd1234"));
  assert.throws(() =>
    prepareNote({ body: "Hello", tags: "a,b,c,d,e,f" }, "abcd1234"),
  );
  const post = prepareNote(
    { body: "नमस्ते", tags: "RAG, RAG", status: "anything" },
    "abcd1234",
  );
  assert.equal(post.status, "draft");
  assert.deepEqual(post.tags, ["RAG"]);
  assert.equal(post.slug, "note-abcd1234");
});
test("RSS contains public notes and articles at their canonical URLs and excludes drafts", () => {
  const base = {
    title: "RAG & retrieval",
    excerpt: "Article summary",
    published_at: "2026-11-24T10:00:00Z",
    status: "published",
  };
  const xml = buildRss(
    [
      {
        ...base,
        slug: "note",
        kind: "note",
        body: "Use <evidence> & check it.",
      },
      { ...base, slug: "article", kind: "article" },
      { ...base, slug: "private-draft", status: "draft" },
    ],
    "https://example.com",
  );
  assert.ok(xml.includes("https://example.com/posts/note"));
  assert.ok(xml.includes("https://example.com/writing/article"));
  assert.ok(!xml.includes("private-draft"));
  assert.ok(xml.includes("RAG &amp; retrieval"));
  assert.ok(!xml.includes("<evidence>"));
});
