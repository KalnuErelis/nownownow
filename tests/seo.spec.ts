import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { importedArticles } from "../src/data/articles";
import { SITE, WRITING } from "../src/data/site";

const [latestPost, secondPost] = importedArticles;

const MOCK_REMOTE_IMAGE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" role="img" aria-label="Mock image">
  <rect width="160" height="90" fill="#dfe7ef" />
</svg>`;

async function mockRemoteImages(page: Page) {
  await page.route("https://avatars.githubusercontent.com/**", async (route) => {
    await route.fulfill({
      contentType: "image/svg+xml",
      body: MOCK_REMOTE_IMAGE
    });
  });

  await page.route("https://substack-post-media.s3.amazonaws.com/**", async (route) => {
    await route.fulfill({
      contentType: "image/svg+xml",
      body: MOCK_REMOTE_IMAGE
    });
  });
}

test("exposes feed discovery and a real RSS endpoint", async ({ page, request }) => {
  await mockRemoteImages(page);
  await page.goto("/");

  const feedLink = page.locator('link[rel="alternate"][type="application/rss+xml"]');
  await expect(feedLink).toHaveAttribute("href", WRITING.feed);

  const response = await request.get("/rss.xml");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/xml");

  const rssXml = await response.text();
  expect(rssXml).toContain("<rss");
  expect(rssXml).toContain(WRITING.title);
  expect(rssXml).toContain(latestPost.title);
});

test("marks search as noindex,follow while keeping it crawlable", async ({ page }) => {
  await page.goto("/search/");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE.url}/search/`);
  await expect(page.locator("main#main-content h1")).toHaveText("Search");
});

test("publishes article-specific metadata, schema, and internal discovery on post pages", async ({ page }) => {
  await mockRemoteImages(page);
  await page.goto(latestPost.href);

  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
    "content",
    `${latestPost.publishedAt}T00:00:00Z`
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", latestPost.seoDescription);

  const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(jsonLd).not.toBeNull();

  const schema = JSON.parse(jsonLd ?? "{}");
  expect(schema["@type"]).toBe("BlogPosting");
  expect(schema.headline).toBe(latestPost.title);
  expect(schema.description).toBe(latestPost.seoDescription);
  expect(schema.datePublished).toBe(latestPost.publishedAt);
  expect(schema.url).toBe(new URL(latestPost.href, SITE.url).toString());

  await expect(page.locator(".article-discovery")).toBeVisible();
  await expect(page.locator('.article-discovery a[href="/search/"]').first()).toBeVisible();
  await expect(page.locator(`.article-discovery a[href="${secondPost.href}"]`)).toBeVisible();
});
