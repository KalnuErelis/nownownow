import { expect, test } from "@playwright/test";
import { getAffiliateLink } from "../src/data/affiliate-links";

const lemlist = getAffiliateLink("lemlist");
const warmy = getAffiliateLink("warmy");

test("redirects known slugs to the exact affiliate URL", async ({ request }) => {
  expect(lemlist).toBeTruthy();
  expect(warmy).toBeTruthy();

  const response = await request.get("/go/lemlist", { maxRedirects: 0 });
  expect(response.status()).toBe(302);
  expect(response.headers().location).toBe(lemlist?.url);
  expect(response.headers()["x-robots-tag"]).toBe("noindex");
  expect(response.headers()["cache-control"]).toContain("no-store");

  const cased = await request.get("/go/WaRmY", { maxRedirects: 0 });
  expect(cased.status()).toBe(302);
  expect(cased.headers().location).toBe(warmy?.url);
  expect(warmy?.url).toBe("https://warmy.io?fpr=jaunius90");
});

test("sends unknown slugs to /tools/ and still redirects bots", async ({ request }) => {
  const missing = await request.get("/go/not-a-real-tool", { maxRedirects: 0 });
  expect(missing.status()).toBe(302);
  expect(missing.headers().location).toBe("/tools/");

  const bot = await request.get("/go/lemlist", {
    maxRedirects: 0,
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    }
  });
  expect(bot.status()).toBe(302);
  expect(bot.headers().location).toBe(lemlist?.url);

  const head = await request.fetch("/go/lemlist", { method: "HEAD", maxRedirects: 0 });
  expect(head.status()).toBe(302);
  expect(head.headers().location).toBe(lemlist?.url);
  expect(head.headers()["x-robots-tag"]).toBe("noindex");
});

test("closes the stats endpoint without the bearer token", async ({ request }) => {
  const missing = await request.get("/api/go-stats?days=7");
  expect(missing.status()).toBe(401);

  const wrong = await request.get("/api/go-stats", {
    headers: { authorization: "Bearer wrong-token" }
  });
  expect(wrong.status()).toBe(401);
});
