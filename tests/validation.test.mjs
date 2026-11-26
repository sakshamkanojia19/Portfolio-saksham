import test from "node:test";
import assert from "node:assert/strict";
import {
  safeNext,
  validatePost,
  validateReader,
  xmlEscape,
} from "../lib/validation.mjs";
const valid = {
  title: "A production engineering note",
  slug: "production-note",
  excerpt: "A useful description of this engineering article.",
  body: "A substantive engineering note explaining the system and its tradeoffs.",
  tags: "RAG, Security",
  status: "published",
};
test("login redirects remain on this origin", () => {
  for (const attack of [
    "https://evil.test",
    "//evil.test",
    "/\\evil.test",
    "/\n/evil.test",
    null,
  ])
    assert.equal(safeNext(attack), "/writing");
  assert.equal(safeNext("/admin"), "/admin");
  assert.equal(safeNext("/writing/a-note"), "/writing/a-note");
});
test("publishing validates content and normalizes tags", () => {
  assert.deepEqual(validatePost(valid).tags, ["RAG", "Security"]);
  for (const patch of [
    { slug: "../admin" },
    { slug: "Uppercase" },
    { title: "x" },
    { body: "short" },
    { excerpt: "short" },
    { tags: "a,b,c,d,e,f" },
  ])
    assert.throws(() => validatePost({ ...valid, ...patch }));
});
test("unknown statuses cannot implicitly publish", () => {
  assert.equal(validatePost({ ...valid, status: "public" }).status, "draft");
});
test("feed text escapes XML markup and quotes", () => {
  assert.equal(
    xmlEscape("<script a=\"x\"> & 'test'"),
    "&lt;script a=&quot;x&quot;&gt; &amp; &apos;test&apos;",
  );
});
test("reader name and email are trimmed, lowercased, and validated", () => {
  assert.deepEqual(
    validateReader({ name: "  Asha  ", email: " Asha@Example.COM " }),
    { name: "Asha", email: "asha@example.com" },
  );
  for (const input of [
    { name: "", email: "asha@example.com" },
    { name: "   ", email: "asha@example.com" },
    { name: "x".repeat(81), email: "asha@example.com" },
    { name: "Asha", email: "" },
    { name: "Asha", email: "not-an-email" },
    { name: "Asha", email: "two words@example.com" },
    { name: "Asha", email: `${"a".repeat(250)}@x.io` },
    null,
  ])
    assert.throws(() => validateReader(input));
});
