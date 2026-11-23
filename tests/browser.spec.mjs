import { test, expect } from "@playwright/test";
test("public routes render, navigation works, and metadata exists without client JavaScript", async ({
  page,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/projects",
    "/projects/nexus",
    "/projects/collabdocs",
    "/projects/lead-intelligence-agent",
    "/projects/medical-rag-chatbot",
    "/about",
    "/work-with-me",
    "/contact",
    "/writing",
    "/posts",
    "/subscribe",
    "/privacy",
    "/admin",
    "/login",
  ]) {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
  }
  const html = await (await request.get("/projects/nexus")).text();
  expect(html).toContain("Endpointing that considers the sentence");
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  expect(canonical).not.toBeNull();
  expect(new URL(canonical[1]).pathname).toBe("/projects/nexus");
  expect(html).toContain("application/ld+json");
  expect(errors).toEqual([]);
});
test("desktop and mobile layout, theme, and menu", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({
    path: "test-results/home-light.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  for (const width of [390, 320, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of [
      "/",
      "/projects",
      "/projects/nexus",
      "/about",
      "/work-with-me",
      "/writing",
      "/posts",
      "/subscribe",
      "/admin",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("SEO endpoints, old redirects, resume, and missing pages", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/projects/nexus");
  expect(await sitemap.text()).not.toContain("/admin");
  const feed = await request.get("/feed.xml");
  expect(feed.status()).toBe(200);
  expect(feed.headers()["content-type"]).toContain("application/rss+xml");
  expect((await request.get("/opengraph-image")).status()).toBe(200);
  expect((await request.get("/resume.docx")).status()).toBe(200);
  const old = await request.get("/skills", { maxRedirects: 0 });
  expect(old.status()).toBe(308);
  expect(old.headers().location).toBe("/about#toolkit");
  expect((await request.get("/does-not-exist")).status()).toBe(404);
  expect((await request.get("/writing/unpublished")).status()).toBe(404);
  expect((await request.get("/posts/unpublished")).status()).toBe(404);
});
test("follow updates explains RSS and keeps the private composer separate", async ({
  page,
}) => {
  await page.goto("/posts");
  await page
    .getByRole("navigation", { name: "Browse publications" })
    .getByRole("link", { name: "Follow updates" })
    .click();
  await expect(page).toHaveURL(/\/subscribe$/);
  await expect(
    page.getByRole("heading", { name: "What is RSS?" }),
  ).toBeVisible();
  await expect(page.getByLabel("RSS feed URL")).toHaveValue(/\/feed.xml$/);
  await expect(
    page.getByRole("link", { name: "View raw RSS XML" }),
  ).toHaveAttribute("href", "/feed.xml");
  await page
    .getByRole("navigation", { name: "Browse publications" })
    .getByRole("link", { name: "Author sign-in" })
    .click();
  await expect(page.locator(".quick-composer")).toHaveCount(0);
});
