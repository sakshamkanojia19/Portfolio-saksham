import { test, expect } from "@playwright/test";
import { build } from "esbuild";

test("quick composer publishes without article fields, previews safely, and preserves saved edits", async ({
  page,
}) => {
  const { outputFiles } = await build({
    stdin: {
      contents: `import React from 'react'; import { createRoot } from 'react-dom/client'; import QuickComposer from './components/QuickComposer'; createRoot(document.getElementById('fixture')).render(<QuickComposer />);`,
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
                : `export async function saveNote(_, form){window.fixtureSubmission=Object.fromEntries(form); return {id:'00000000-0000-0000-0000-000000000009',slug:'fixture-note',published:form.get('status')==='published',success:'Post saved'};}`,
          }));
        },
      },
    ],
  });
  await page.setContent('<html><body><div id="fixture"></div></body></html>');
  await page.addScriptTag({ content: outputFiles[0].text });
  await expect(page.getByLabel("Title", { exact: true })).toHaveCount(0);
  await page.getByLabel("What’s on your mind?").fill("Ship.");
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await expect(page.locator(".prose")).toContainText("Ship.");
  await page
    .getByRole("button", { name: "Post publicly", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Post saved");
  expect(await page.evaluate(() => window.fixtureSubmission.status)).toBe(
    "published",
  );
  await expect(
    page.getByRole("link", { name: "View your public post" }),
  ).toHaveAttribute("href", "/posts/fixture-note");
  await page.getByRole("button", { name: "Back to editing" }).click();
  await expect(page.getByLabel("What’s on your mind?")).toHaveValue("Ship.");
  await page.getByLabel("What’s on your mind?").fill("A follow-up thought.");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.fixtureSubmission.body))
    .toBe("A follow-up thought.");
  expect(await page.evaluate(() => window.fixtureSubmission.id)).toBe(
    "00000000-0000-0000-0000-000000000009",
  );
});
