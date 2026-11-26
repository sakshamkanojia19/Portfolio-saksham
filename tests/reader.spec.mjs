import { test, expect } from "@playwright/test";
import { build } from "esbuild";

// Renders the real LikeButton and SubscribeBox against in-memory action stubs.
// Nothing contacts Supabase or stores real data.
async function fixture(page) {
  const { outputFiles } = await build({
    stdin: {
      contents: `import React from 'react'; import { createRoot } from 'react-dom/client';
        import LikeButton from './components/LikeButton';
        import SubscribeBox from './components/SubscribeBox';
        const params = new URLSearchParams(location.search);
        createRoot(document.getElementById('like')).render(<LikeButton id={params.get('id')} initialCount={3} />);
        createRoot(document.getElementById('sub')).render(<SubscribeBox source="/posts/fixture" />);`,
      resolveDir: process.cwd(),
      loader: "jsx",
    },
    bundle: true,
    write: false,
    format: "iife",
    jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [
      {
        name: "isolated-actions",
        setup(builder) {
          builder.onResolve({ filter: /app\/actions$/ }, () => ({
            path: "actions",
            namespace: "fixture",
          }));
          builder.onResolve({ filter: /^next\/link$/ }, () => ({
            path: "link",
            namespace: "fixture",
          }));
          builder.onLoad({ filter: /.*/, namespace: "fixture" }, (args) => ({
            loader: "jsx",
            resolveDir: process.cwd(),
            contents:
              args.path === "link"
                ? `import React from 'react'; export default function Link(p){return <a {...p}/>}`
                : `const log = (window.calls ||= []);
                   export async function likePost(id, reader){ log.push(['like', id, reader]);
                     if (reader.name === 'Flood') return { error: 'Too many requests right now. Please try again later.' };
                     return { liked: true, count: 4 }; }
                   export async function subscribeToUpdates(reader, source){ log.push(['subscribe', reader, source]); return { subscribed: true }; }`,
          }));
        },
      },
    ],
  });
  const script = outputFiles[0].text;
  // A real origin so localStorage works like it does on the site.
  await page.route("http://fixture.test/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `<html><body><div id="like"></div><div id="sub"></div><script>${script.replace(/<\/script/gi, "<\\/script")}</script></body></html>`,
    }),
  );
}

test("first like asks for name + email once, then remembers the reader", async ({
  page,
}) => {
  await fixture(page);
  await page.goto("http://fixture.test/?id=post-1");
  const like = page.getByRole("button", { name: /Like · 3/ });
  await expect(like).toHaveAttribute("aria-pressed", "false");
  await like.click();
  const dialog = page.getByRole("dialog", { name: "Like this post" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("never shown");
  await dialog.getByLabel("Name", { exact: true }).fill("Asha");
  await dialog.getByLabel("Email", { exact: true }).fill("asha@example.com");
  await dialog.getByLabel("Also email me when I publish something new").check();
  await dialog.getByRole("button", { name: "♥ Like" }).click();
  await expect(dialog).toBeHidden();
  const liked = page.getByRole("button", { name: /Liked · 4/ });
  await expect(liked).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".like-area [role=status]")).toContainText(
    "Thanks for the like, Asha. You’ll get new posts by email.",
  );
  const calls = await page.evaluate(() => window.calls);
  expect(calls[0]).toEqual([
    "like",
    "post-1",
    { name: "Asha", email: "asha@example.com", website: "" },
  ]);
  expect(calls[1][0]).toBe("subscribe");
  expect(calls[1][1]).toMatchObject({
    name: "Asha",
    email: "asha@example.com",
  });

  // Same post after reload: still liked, no second request.
  await page.reload();
  await expect(page.getByRole("button", { name: /Liked/ })).toBeVisible();
  // Another post: the remembered reader likes in one click, no popup.
  await page.goto("http://fixture.test/?id=post-2");
  await page.getByRole("button", { name: /Like · 3/ }).click();
  await expect(page.getByRole("button", { name: /Liked · 4/ })).toBeVisible();
  await expect(page.getByRole("dialog")).toBeHidden();
  expect(
    (await page.evaluate(() => window.calls)).map((c) => c.slice(0, 2)),
  ).toEqual([["like", "post-2"]]);
  // The subscribe box is prefilled from the remembered reader.
  await expect(page.getByPlaceholder("Your name")).toHaveValue("Asha");
  await expect(page.getByPlaceholder("Your email")).toHaveValue(
    "asha@example.com",
  );
});

test("like errors stay in the popup and subscribing confirms", async ({
  page,
}) => {
  await fixture(page);
  await page.goto("http://fixture.test/?id=post-3");
  await page.getByRole("button", { name: /Like · 3/ }).click();
  const dialog = page.getByRole("dialog", { name: "Like this post" });
  await dialog.getByLabel("Name", { exact: true }).fill("Flood");
  await dialog.getByLabel("Email", { exact: true }).fill("flood@example.com");
  await dialog.getByRole("button", { name: "♥ Like" }).click();
  await expect(dialog.getByRole("alert")).toContainText("Too many requests");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("button", { name: /Like · 3/ })).toHaveAttribute(
    "aria-pressed",
    "false",
  );

  await page.getByPlaceholder("Your name").fill("Ravi");
  await page.getByPlaceholder("Your email").fill("ravi@example.com");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await expect(page.locator(".subscribe-box [role=status]")).toContainText(
    "You’re in, Ravi.",
  );
  const calls = await page.evaluate(() => window.calls);
  expect(calls.at(-1)).toEqual([
    "subscribe",
    { name: "Ravi", email: "ravi@example.com", website: "" },
    "/posts/fixture",
  ]);
});
