import test from "node:test";
import assert from "node:assert/strict";
import { safeNext, validatePost, xmlEscape } from "../lib/validation.mjs";
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
