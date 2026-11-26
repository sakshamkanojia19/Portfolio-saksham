import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { pathToFileURL } from "node:url";

export function checkEnvironment(env) {
  const issues = [];
  for (const name of [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "ADMIN_EMAIL",
  ]) {
    if (!env[name]?.trim()) issues.push(`Missing ${name}`);
  }
  for (const name of ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_SUPABASE_URL"]) {
    if (!env[name]?.trim()) continue;
    try {
      const url = new URL(env[name]);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.search ||
        url.hash ||
        url.pathname !== "/"
      )
        throw new Error();
      if (
        url.protocol === "http:" &&
        !["localhost", "127.0.0.1"].includes(url.hostname)
      )
        throw new Error();
    } catch {
      issues.push(
        `${name} must be an HTTPS origin (HTTP is allowed on localhost).`,
      );
    }
  }
  if (env.ADMIN_EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.ADMIN_EMAIL))
    issues.push("ADMIN_EMAIL is not a valid email address.");
  const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (key && !key.startsWith("sb_publishable_")) {
    try {
      const payload = JSON.parse(
        Buffer.from(key.split(".")[1], "base64url").toString(),
      );
      if (payload.role !== "anon") throw new Error();
    } catch {
      issues.push(
        "Use a Supabase publishable key or legacy anon key, never a secret/service-role key.",
      );
    }
  }
  return issues;
}

async function main() {
  nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
  const issues = checkEnvironment(process.env);
  if (issues.length) {
    console.log("Setup is incomplete. No credential values are printed.");
    issues.forEach((issue) => console.log(`- ${issue}`));
    console.log(
      "Edit .env.local privately, then run npm run setup:check again.",
    );
    process.exitCode = 1;
    return;
  }
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options) =>
          fetch(url, { ...options, signal: AbortSignal.timeout(10000) }),
      },
    },
  );
  const checks = [
    [
      "Published-article API",
      () =>
        db
          .from("portfolio_posts")
          .select("id", { head: true })
          .eq("status", "published"),
      (result) => !result.error,
    ],
    [
      "Anonymous draft visibility (must return zero)",
      () =>
        db
          .from("portfolio_posts")
          .select("id", { head: true, count: "exact" })
          .eq("status", "draft"),
      (result) => !result.error && result.count === 0,
    ],
    [
      "Anonymous publishing authorization (must be false)",
      () => db.rpc("is_portfolio_admin"),
      (result) => !result.error && result.data === false,
    ],
    [
      "Public vote totals function",
      () =>
        db.rpc("portfolio_vote_stats", {
          target_post: "00000000-0000-0000-0000-000000000000",
        }),
      (result) => !result.error && Array.isArray(result.data),
    ],
    [
      "Public like totals function (202611250001 migration)",
      () =>
        db.rpc("portfolio_like_counts", {
          target_posts: ["00000000-0000-0000-0000-000000000000"],
        }),
      (result) => !result.error && Array.isArray(result.data),
    ],
    [
      "Reader emails are private (must be denied)",
      () => db.from("portfolio_likes").select("email").limit(1),
      (result) => Boolean(result.error),
    ],
  ];
  const results = await Promise.allSettled(
    checks.map(async ([label, run, passes]) => ({
      label,
      passed: passes(await run()),
    })),
  );
  let failed = false;
  results.forEach((result, index) => {
    const passed = result.status === "fulfilled" && result.value.passed;
    console.log(`${passed ? "PASS" : "FAIL"}: ${checks[index][0]}`);
    if (!passed) failed = true;
  });
  console.log(
    "Read-only checks: no articles, accounts, likes, or database policies were changed.",
  );
  if (failed) {
    console.log(
      "Check project configuration and the migration in docs/SETUP.md.",
    );
    process.exitCode = 1;
  } else {
    console.log(
      "Public API checks passed. Owner login, SMTP, uploads, and authenticated voting still require live verification.",
    );
    console.log(
      "An empty draft result alone does not prove RLS; use the owner/reader checks in docs/SETUP.md.",
    );
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch(() => {
    console.error(
      "Setup check failed. Check configuration and network access; no credential values were printed.",
    );
    process.exitCode = 1;
  });
}
