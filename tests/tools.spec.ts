import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import {
  AFFILIATE_DISCLOSURE,
  COMPARISON,
  INSTANTLY,
  TOOL_CATEGORIES,
  TOOLS,
  getCategoryById,
  getRankedTools,
  getToolBySlug
} from "../src/data/tools";

const coldEmail = getCategoryById("cold-email");
const lemlist = getToolBySlug("lemlist");
const smartlead = getToolBySlug("smartlead");

test("keeps private affiliate-sheet fields out of published tool records", () => {
  const source = readFileSync(new URL("../src/data/tools.ts", import.meta.url), "utf8");
  const published = JSON.stringify({
    TOOLS,
    TOOL_CATEGORIES,
    INSTANTLY,
    COMPARISON,
    AFFILIATE_DISCLOSURE
  });

  expect(source).not.toContain("@kadunas.com");
  expect(source).not.toContain("gmail.com");
  expect(source).not.toContain("788.13");
  expect(published).not.toContain("@");
  expect(published).not.toContain("instantly.ai/?via=");
  expect(published.toLowerCase()).not.toContain("paypal");
  expect(published.toLowerCase()).not.toContain("airwallex");
  expect(INSTANTLY.homepage).toBe("https://instantly.ai");
});

test("renders the tools directory and a ranked category page", async ({ page }) => {
  await page.goto("/tools/");

  await expect(page).toHaveTitle(/Tools \| Jaunius Kadunas/);
  await expect(page.locator("main#main-content h1")).toHaveText("Tools");
  await expect(page.getByText(AFFILIATE_DISCLOSURE)).toBeVisible();
  await expect(page.locator("nav[aria-label='Primary']").getByRole("link", { name: "Tools" })).toHaveClass(/active-nav/);
  await expect(page.getByRole("link", { name: coldEmail.title })).toBeVisible();

  await page.getByRole("link", { name: coldEmail.title }).click();
  await expect(page).toHaveURL(new RegExp(`${coldEmail.href.replaceAll("/", "\\/")}$`));
  await expect(page.locator("main#main-content h1")).toHaveText(coldEmail.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", coldEmail.description);
  await expect(page.getByText(AFFILIATE_DISCLOSURE)).toBeVisible();

  const ranked = getRankedTools("cold-email");
  await expect(page.locator(".tools-rank h2").first()).toContainText(ranked[0]?.name ?? "");

  const cta = page.locator(`a[href="${lemlist.affiliateUrl}"]`);
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("rel", "sponsored noopener");
  await expect(cta).toHaveAttribute("target", "_blank");

  await page.locator(`#${lemlist.slug} h2 a`).click();
  await expect(page).toHaveURL(new RegExp(`${lemlist.href.replaceAll("/", "\\/")}$`));
  await expect(page.locator("main#main-content h1")).toHaveText(lemlist.name);
  await expect(page.getByRole("heading", { name: "Who it's for" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pros" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cons" })).toBeVisible();
  await expect(page.locator(`a[href="${lemlist.affiliateUrl}"]`)).toHaveAttribute("rel", "sponsored noopener");
  await expect(page.getByText(AFFILIATE_DISCLOSURE)).toBeVisible();
});

test("links Instantly without an affiliate parameter on the comparison page", async ({ page }) => {
  await page.goto(COMPARISON.href);

  await expect(page.locator("main#main-content h1")).toHaveText(COMPARISON.title);
  await expect(page.getByText(AFFILIATE_DISCLOSURE)).toBeVisible();

  const instantly = page.locator('a[href="https://instantly.ai"]');
  await expect(instantly).toBeVisible();
  await expect(instantly).toHaveAttribute("rel", "noopener");
  await expect(instantly).not.toHaveAttribute("rel", /sponsored/);

  await expect(page.locator(`a[href="${smartlead.affiliateUrl}"]`)).toHaveAttribute("rel", "sponsored noopener");
  await expect(page.locator(`a[href="${lemlist.affiliateUrl}"]`)).toHaveAttribute("rel", "sponsored noopener");

  const html = await page.content();
  expect(html).not.toContain("instantly.ai/?via=");
  expect(html).not.toContain("https://instantly.ai/?");
});

test("tools pages avoid horizontal overflow", async ({ page }) => {
  const paths = ["/tools/", coldEmail.href, lemlist.href, COMPARISON.href];

  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });

    for (const path of paths) {
      await page.goto(path);
      const hasHorizontalOverflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth > root.clientWidth;
      });
      expect(hasHorizontalOverflow, `expected no horizontal overflow at ${path} ${width}px`).toBe(false);
    }
  }
});

test("has no axe violations on the tools directory", async ({ page }) => {
  await page.goto("/tools/");
  const indexResults = await new AxeBuilder({ page }).analyze();
  expect(indexResults.violations).toEqual([]);

  await page.goto(coldEmail.href);
  const categoryResults = await new AxeBuilder({ page }).analyze();
  expect(categoryResults.violations).toEqual([]);
});
