import { test, expect } from "@playwright/test";

test("statistics count to their published values and hero has scroll depth", async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => {
    window.counterFrames = [];
    new MutationObserver(() => {
      const counter = document.querySelectorAll('.count-up > [aria-hidden="true"]')[1];
      if (counter && window.counterFrames.at(-1) !== counter.textContent) window.counterFrames.push(counter.textContent);
    }).observe(document, { childList: true, subtree: true, characterData: true });
  });
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-parallax", "true");
  await page.locator(".stats").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.counterFrames.some(value => {
    const number = parseInt(value, 10);
    return number > 0 && number < 250;
  }))).toBe(true);
  await expect(page.locator('.count-up > [aria-hidden="true"]')).toHaveText(["~1s", "250+", "5+"]);
  await expect(page.locator('[data-count-running="true"]')).toHaveCount(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(100);
  const before = await page.locator('[data-depth="portrait"]').evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  await expect.poll(() => page.locator('[data-depth="portrait"]').evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero")).toHaveAttribute("data-parallax", "false");
});

test("reduced motion shows final numbers with no parallax", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute("data-parallax", "false");
  await expect(page.locator('.count-up > [aria-hidden="true"]')).toHaveText(["~1s", "250+", "5+"]);
  await expect(page.locator('[data-count-running="true"]')).toHaveCount(0);
  await expect(page.locator(".scroll-progress")).toBeHidden();
});

test("content and final statistics remain available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator('.count-up > [aria-hidden="true"]')).toHaveText(["~1s", "250+", "5+"]);
  await expect(page.locator(".project").first()).toHaveCSS("opacity", "1");
  await context.close();
});
