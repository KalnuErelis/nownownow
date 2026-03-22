import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const overflowWidths = [375, 768, 1280, 1440] as const;
const aboutSnapshots = [
  { name: "about-page-375x900.png", width: 375, height: 900 },
  { name: "about-page-768x1024.png", width: 768, height: 1024 },
  { name: "about-page-1280x1600.png", width: 1280, height: 1600 }
] as const;

const MOCK_AVATAR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-label="Mocked profile image">
  <rect width="320" height="320" rx="160" fill="#0f4c81" />
  <circle cx="160" cy="120" r="58" fill="#f8f8f8" opacity="0.95" />
  <path d="M72 268c18-52 62-82 88-82s70 30 88 82" fill="#f8f8f8" opacity="0.95" />
</svg>`;

const MOCK_ACTIVITY_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" role="img" aria-label="Mocked activity chart">
  <rect width="1200" height="420" fill="#f5f7fa" />
  <g fill="#d9e2ec">
    <rect x="60" y="70" width="30" height="30" rx="6" />
    <rect x="98" y="70" width="30" height="30" rx="6" />
    <rect x="136" y="70" width="30" height="30" rx="6" />
    <rect x="174" y="70" width="30" height="30" rx="6" />
    <rect x="212" y="70" width="30" height="30" rx="6" />
    <rect x="250" y="70" width="30" height="30" rx="6" />
    <rect x="288" y="70" width="30" height="30" rx="6" />
    <rect x="326" y="70" width="30" height="30" rx="6" />
    <rect x="364" y="70" width="30" height="30" rx="6" />
    <rect x="402" y="70" width="30" height="30" rx="6" />
    <rect x="440" y="70" width="30" height="30" rx="6" />
    <rect x="478" y="70" width="30" height="30" rx="6" />
    <rect x="516" y="70" width="30" height="30" rx="6" />
    <rect x="554" y="70" width="30" height="30" rx="6" />
    <rect x="592" y="70" width="30" height="30" rx="6" />
    <rect x="630" y="70" width="30" height="30" rx="6" />
    <rect x="668" y="70" width="30" height="30" rx="6" />
    <rect x="706" y="70" width="30" height="30" rx="6" />
    <rect x="744" y="70" width="30" height="30" rx="6" />
    <rect x="782" y="70" width="30" height="30" rx="6" />
    <rect x="820" y="70" width="30" height="30" rx="6" />
    <rect x="858" y="70" width="30" height="30" rx="6" />
    <rect x="896" y="70" width="30" height="30" rx="6" />
    <rect x="934" y="70" width="30" height="30" rx="6" />
    <rect x="972" y="70" width="30" height="30" rx="6" />
  </g>
  <g fill="#9fb3c8">
    <rect x="98" y="108" width="30" height="30" rx="6" />
    <rect x="174" y="108" width="30" height="30" rx="6" />
    <rect x="326" y="108" width="30" height="30" rx="6" />
    <rect x="364" y="108" width="30" height="30" rx="6" />
    <rect x="516" y="108" width="30" height="30" rx="6" />
    <rect x="668" y="108" width="30" height="30" rx="6" />
    <rect x="782" y="108" width="30" height="30" rx="6" />
    <rect x="858" y="108" width="30" height="30" rx="6" />
    <rect x="934" y="108" width="30" height="30" rx="6" />
  </g>
  <g fill="#3f7fb4">
    <rect x="136" y="146" width="30" height="30" rx="6" />
    <rect x="212" y="146" width="30" height="30" rx="6" />
    <rect x="288" y="146" width="30" height="30" rx="6" />
    <rect x="478" y="146" width="30" height="30" rx="6" />
    <rect x="554" y="146" width="30" height="30" rx="6" />
    <rect x="706" y="146" width="30" height="30" rx="6" />
    <rect x="896" y="146" width="30" height="30" rx="6" />
  </g>
  <g fill="#0f4c81">
    <rect x="60" y="184" width="30" height="30" rx="6" />
    <rect x="250" y="184" width="30" height="30" rx="6" />
    <rect x="402" y="184" width="30" height="30" rx="6" />
    <rect x="592" y="184" width="30" height="30" rx="6" />
    <rect x="820" y="184" width="30" height="30" rx="6" />
    <rect x="972" y="184" width="30" height="30" rx="6" />
  </g>
  <text x="60" y="300" fill="#52606d" font-family="IBM Plex Mono, monospace" font-size="24">Contribution activity preview</text>
</svg>`;

async function mockAboutRemoteAssets(page: Page) {
  await page.route("https://avatars.githubusercontent.com/**", async (route) => {
    await route.fulfill({
      contentType: "image/svg+xml",
      body: MOCK_AVATAR_SVG
    });
  });

  await page.route("https://activity.kadunas.com/**", async (route) => {
    await route.fulfill({
      contentType: "image/svg+xml",
      body: MOCK_ACTIVITY_SVG
    });
  });
}

async function openAbout(page: Page) {
  await page.goto("/about");
  await expect(page).toHaveURL(/\/about\/?$/);
  await page.waitForLoadState("networkidle");
}

async function openHome(page: Page) {
  await page.goto("/");
  await expect(page).toHaveURL(/\/$/);
  await page.waitForLoadState("networkidle");
}

test("captures the current about-page content baseline", async ({ page }, testInfo) => {
  void testInfo.snapshotPath("about-page.png");

  await mockAboutRemoteAssets(page);
  await openAbout(page);

  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page.locator("main#main-content h1")).toHaveCount(1);
  await expect(page.locator(".about-intro")).toBeVisible();
  await expect(page.locator(".about-intro__lede")).toBeVisible();
  await expect(page.locator(".about-intro__support")).toBeVisible();
  await expect(page.locator(".about-facts__item")).not.toHaveCount(0);
  await expect(page.locator(".about-section--story")).not.toHaveCount(0);
  await expect(page.locator(".activity-card")).toBeVisible();
  await expect(page.locator(".activity-card .activity-card__links li")).not.toHaveCount(0);
  await expect(page.locator(".subscribe-card")).toBeVisible();
  await expect(page.locator(".subscribe-card__copy")).toBeVisible();
  await expect(page.locator(".subscribe-card__form-wrap")).toBeVisible();
  await expect(page.locator('label[for="subscribe-name"]')).toBeVisible();
  await expect(page.locator('#subscribe-name')).toBeVisible();
  await expect(page.locator('label[for="subscribe-email"]')).toBeVisible();
  await expect(page.locator('#subscribe-email')).toBeVisible();
  await expect(page.locator(".about-section--note")).toBeVisible();
  await expect(page.locator(".about-note__meta")).toBeVisible();
  await expect(page.locator(".section-kicker").filter({ hasText: /^Section$/ })).toHaveCount(0);
});

test("has no axe violations on about", async ({ page }) => {
  await mockAboutRemoteAssets(page);
  await openAbout(page);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("avoids horizontal overflow across target breakpoints", async ({ page }) => {
  await mockAboutRemoteAssets(page);

  for (const width of overflowWidths) {
    await page.setViewportSize({ width, height: 1200 });
    await openAbout(page);

    const hasHorizontalOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth;
    });

    expect(hasHorizontalOverflow, `expected no horizontal overflow at ${width}px`).toBe(false);
  }
});

test("keeps the homepage summary list intact after shared selector changes", async ({ page }) => {
  await mockAboutRemoteAssets(page);
  await openHome(page);

  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page.locator("main#main-content h1")).toHaveCount(1);
  await expect(page.locator(".content-section--summary .section-list")).toBeVisible();
  await expect(page.locator(".content-section--summary .section-list li")).not.toHaveCount(0);
});

for (const snapshot of aboutSnapshots) {
  test(`matches about full-page snapshot at ${snapshot.width}x${snapshot.height}`, async ({ page }) => {
    await mockAboutRemoteAssets(page);
    await page.setViewportSize({ width: snapshot.width, height: snapshot.height });
    await openAbout(page);

    await expect(page).toHaveScreenshot(snapshot.name, {
      fullPage: true
    });
  });
}
