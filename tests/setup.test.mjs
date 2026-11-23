import test from "node:test";
import assert from "node:assert/strict";
import { checkEnvironment } from "../scripts/check-setup.mjs";
const env = {
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
  ADMIN_EMAIL: "owner@example.com",
};
test("setup accepts public configuration and reports missing names only", () => {
  assert.deepEqual(checkEnvironment(env), []);
  assert.equal(checkEnvironment({}).length, 4);
});
test("setup rejects secret keys without exposing them in messages", () => {
  for (const key of [
    "sb_secret_sensitive-value",
    `header.${Buffer.from(JSON.stringify({ role: "service_role" })).toString("base64url")}.signature`,
  ]) {
    const issues = checkEnvironment({
      ...env,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
    });
    assert.equal(issues.length, 1);
    assert.ok(!issues.join().includes(key));
  }
});
test("setup rejects credentials in URLs and nonlocal unencrypted origins", () => {
  for (const url of [
    "https://user:password@example.com",
    "http://example.com",
    "https://example.com/?key=secret",
  ]) {
    const issues = checkEnvironment({ ...env, NEXT_PUBLIC_SITE_URL: url });
    assert.equal(issues.length, 1);
    assert.ok(!issues.join().includes(url));
  }
});
