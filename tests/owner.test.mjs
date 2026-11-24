import test from "node:test";
import assert from "node:assert/strict";
import { isOwnerEmail, hasAdminGrant, isPortfolioOwner } from "../lib/owner.mjs";

const OWNER = "owner@example.com";
const rpcDb = (result, calls = []) => ({
  rpc: async (name) => {
    calls.push(name);
    if (result instanceof Error) throw result;
    return result;
  },
});

test("owner email check requires a configured, case-insensitive match", () => {
  assert.equal(isOwnerEmail({ email: "Owner@Example.com" }, OWNER), true);
  assert.equal(isOwnerEmail({ email: "reader@example.com" }, OWNER), false);
  assert.equal(isOwnerEmail({ email: OWNER }, ""), false);
  assert.equal(isOwnerEmail({ email: OWNER }, undefined), false);
  assert.equal(isOwnerEmail(null, OWNER), false);
  assert.equal(isOwnerEmail({}, OWNER), false);
});

test("database grant must be explicitly true and errors deny access", async () => {
  assert.equal(await hasAdminGrant(rpcDb({ data: true, error: null })), true);
  assert.equal(await hasAdminGrant(rpcDb({ data: false, error: null })), false);
  assert.equal(await hasAdminGrant(rpcDb({ data: null, error: null })), false);
  assert.equal(
    await hasAdminGrant(rpcDb({ data: true, error: { message: "denied" } })),
    false,
  );
  assert.equal(await hasAdminGrant(rpcDb(new Error("network"))), false);
});

test("ownership requires both the email match and the database grant", async () => {
  const granted = { data: true, error: null };
  assert.equal(
    await isPortfolioOwner(rpcDb(granted), { email: OWNER }, OWNER),
    true,
  );
  assert.equal(
    await isPortfolioOwner(
      rpcDb({ data: false, error: null }),
      { email: OWNER },
      OWNER,
    ),
    false,
  );
  const calls = [];
  assert.equal(
    await isPortfolioOwner(
      rpcDb(granted, calls),
      { email: "reader@example.com" },
      OWNER,
    ),
    false,
  );
  assert.deepEqual(calls, [], "non-owner emails never reach the database");
});
