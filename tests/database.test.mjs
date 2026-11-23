import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

test("portfolio authorization and vote integrity in PostgreSQL", async (t) => {
  const db = new PGlite();
  const owner = "00000000-0000-0000-0000-000000000001";
  const reader = "00000000-0000-0000-0000-000000000002";
  const post = "00000000-0000-0000-0000-000000000003";
  const draft = "00000000-0000-0000-0000-000000000004";
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth; create schema storage;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    grant usage on schema auth, public, storage to anon, authenticated;
    create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
    alter table storage.objects enable row level security;
    grant insert,delete on storage.objects to authenticated;
    create function storage.foldername(text) returns text[] language sql immutable as $$ select string_to_array($1,'/') $$;
    insert into auth.users values('${owner}'),('${reader}');
  `);
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/202611230001_portfolio.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(`insert into public.portfolio_admins values('${owner}')`);
  async function as(role, actor, sql) {
    await db.exec(
      `set role ${role}; select set_config('request.jwt.claim.sub','${actor || ""}',false);`,
    );
    try {
      return await db.query(sql);
    } finally {
      await db.exec("reset role");
    }
  }
  const values = (id) =>
    `('${id}','${owner}','A real engineering article','${id === post ? "published-note" : "draft-note"}','A sufficiently detailed article description.','A sufficiently long article body explaining a production engineering decision.')`;
  await t.test("owner can create drafts and publish", async () => {
    await as(
      "authenticated",
      owner,
      `insert into portfolio_posts(id,author_id,title,slug,excerpt,body) values ${values(post)},${values(draft)}`,
    );
    await as(
      "authenticated",
      owner,
      `update portfolio_posts set status='published' where id='${post}'`,
    );
    const result = await as(
      "authenticated",
      owner,
      "select * from portfolio_posts",
    );
    assert.equal(result.rows.length, 2);
    assert.ok(result.rows.find((r) => r.id === post).published_at);
  });
  await t.test("anonymous and reader cannot see draft text", async () => {
    for (const [role, actor] of [
      ["anon", ""],
      ["authenticated", reader],
    ]) {
      const result = await as(role, actor, "select id from portfolio_posts");
      assert.deepEqual(
        result.rows.map((r) => r.id),
        [post],
      );
    }
  });
  await t.test("readers cannot write posts or elevate themselves", async () => {
    await assert.rejects(
      as(
        "authenticated",
        reader,
        `insert into portfolio_posts(author_id,title,slug,excerpt,body) values('${reader}','Reader article','reader-post','Long enough description here.','A long enough body for this attempted unauthorized publication.')`,
      ),
    );
    const result = await as(
      "authenticated",
      reader,
      `update portfolio_posts set title='Unauthorized change' where id='${post}' returning id`,
    );
    assert.equal(result.rows.length, 0);
    await assert.rejects(
      as(
        "authenticated",
        reader,
        `insert into portfolio_admins values('${reader}')`,
      ),
    );
    await assert.rejects(as("anon", "", `select * from portfolio_admins`));
  });
  await t.test("published URLs remain stable after unpublishing", async () => {
    await as(
      "authenticated",
      owner,
      `update portfolio_posts set status='draft' where id='${post}'`,
    );
    await assert.rejects(
      as(
        "authenticated",
        owner,
        `update portfolio_posts set slug='changed-url' where id='${post}'`,
      ),
    );
    await as(
      "authenticated",
      owner,
      `update portfolio_posts set status='published' where id='${post}'`,
    );
  });
  await t.test(
    "anonymous users cannot vote and drafts cannot receive votes",
    async () => {
      await assert.rejects(
        as("anon", "", `select set_portfolio_vote('${post}',true)`),
      );
      await assert.rejects(
        as(
          "authenticated",
          reader,
          `select set_portfolio_vote('${draft}',true)`,
        ),
      );
    },
  );
  await t.test(
    "votes persist, are unique, rate-limited, and retractable",
    async () => {
      const first = await as(
        "authenticated",
        reader,
        `select set_portfolio_vote('${post}',true) as count`,
      );
      assert.equal(Number(first.rows[0].count), 1);
      await assert.rejects(
        as(
          "authenticated",
          reader,
          `select set_portfolio_vote('${post}',false)`,
        ),
      );
      await db.exec(
        `update portfolio_vote_limits set last_action=now()-interval '5 seconds'`,
      );
      const duplicate = await as(
        "authenticated",
        reader,
        `select set_portfolio_vote('${post}',true) as count`,
      );
      assert.equal(Number(duplicate.rows[0].count), 1);
      const stats = await as(
        "authenticated",
        reader,
        `select * from portfolio_vote_stats('${post}')`,
      );
      assert.equal(stats.rows[0].has_voted, true);
      const publicStats = await as(
        "anon",
        "",
        `select * from portfolio_vote_stats('${post}')`,
      );
      assert.equal(Number(publicStats.rows[0].vote_count), 1);
      assert.equal(publicStats.rows[0].has_voted, false);
      await db.exec(
        `update portfolio_vote_limits set last_action=now()-interval '5 seconds'`,
      );
      const undo = await as(
        "authenticated",
        reader,
        `select set_portfolio_vote('${post}',false) as count`,
      );
      assert.equal(Number(undo.rows[0].count), 0);
      await assert.rejects(
        as(
          "authenticated",
          reader,
          `insert into portfolio_votes(post_id,user_id) values('${post}','${reader}')`,
        ),
      );
    },
  );
  await t.test(
    "storage writes are limited to owner and own folder",
    async () => {
      await as(
        "authenticated",
        owner,
        `insert into storage.objects(bucket_id,name) values('portfolio-images','${owner}/image.png')`,
      );
      await assert.rejects(
        as(
          "authenticated",
          reader,
          `insert into storage.objects(bucket_id,name) values('portfolio-images','${reader}/image.png')`,
        ),
      );
      await assert.rejects(
        as(
          "authenticated",
          owner,
          `insert into storage.objects(bucket_id,name) values('portfolio-images','${reader}/image.png')`,
        ),
      );
    },
  );
  await db.close();
});
