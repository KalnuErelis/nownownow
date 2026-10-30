import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { AFFILIATE_LINKS, getAffiliateLink } from "../src/data/affiliate-links";
import { TOOLS, getToolBySlug } from "../src/data/tools";
import { classifyClick, classifyRequest } from "../src/lib/go/classify";
import { resolveGoDestination } from "../src/lib/go/destination";
import { readGoStats } from "../src/lib/go/store";
import {
  DEDUPE_WINDOW_SECONDS,
  aggregateStats,
  authorizeStats,
  buildLogCommand,
  countryCode,
  parseDays,
  parseHash,
  referrerPath,
  shouldCountHit,
  utcDayRange,
  visitorHash
} from "../src/lib/go/event";

const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

describe("affiliate redirect targets", () => {
  it("keeps every sheet url exact and sends unknown slugs to /tools/", () => {
    const sheetLinks = AFFILIATE_LINKS.filter((link) => link.sheetRow !== null);
    assert.equal(sheetLinks.length, 160);
    assert.equal(AFFILIATE_LINKS.length, 163);

    const lemlist = resolveGoDestination("lemlist");
    assert.equal(lemlist.known, true);
    assert.equal(lemlist.location, "https://get.lemlist.com/jaunius");

    const warmy = resolveGoDestination("WaRmY");
    assert.equal(warmy.location, "https://warmy.io?fpr=jaunius90");

    const saleshandy = resolveGoDestination("saleshandy");
    assert.equal(saleshandy.location, "https://www.saleshandy.com/?p=v3&via=jaunius");

    const klenty = resolveGoDestination("klenty");
    assert.equal(klenty.location, "http://klenty.com?fpr=jaunius-62132f");

    assert.equal(resolveGoDestination("not-a-tool").location, "/tools/");
    assert.equal(resolveGoDestination("https://evil.example").location, "/tools/");
    assert.equal(resolveGoDestination("../lemlist").location, "/tools/");
    assert.equal(resolveGoDestination("").location, "/tools/");
    assert.equal(resolveGoDestination(undefined).slug, "invalid");
  });

  it("points every published tool CTA at /go/<slug>", () => {
    for (const tool of TOOLS) {
      const destination = resolveGoDestination(tool.outboundHref.slice("/go/".length));
      assert.equal(destination.known, true, tool.slug);
      assert.equal(destination.location, tool.affiliateUrl);
      assert.equal(tool.outboundHref, `/go/${destination.slug}`);
    }

    assert.equal(getToolBySlug("la-growth-machine").outboundHref, "/go/lagrowthmachine");
    assert.equal(getAffiliateLink("mailforge")?.url, "https://mailforge.ai/?via=jaunius");
    assert.equal(getAffiliateLink("infraforge")?.sheetRow, null);
    assert.equal(getAffiliateLink("artisan")?.sheetRow, null);
  });
});

describe("bot classification", () => {
  const bots: readonly [string, string][] = [
    ["Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "googlebot"],
    ["Mediapartners-Google", "googlebot"],
    ["Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", "bingbot"],
    ["Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)", "preview"],
    ["Twitterbot/1.0", "preview"],
    ["facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)", "preview"],
    ["LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)", "preview"],
    ["WhatsApp/2.23.20.0", "preview"],
    ["Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)", "preview"],
    ["TelegramBot (like TwitterBot)", "preview"],
    ["Mozilla/5.0 (compatible; Applebot/0.1; +http://www.apple.com/go/applebot)", "applebot"],
    ["Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)", "seo-crawler"],
    ["Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)", "seo-crawler"],
    ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)", "ai-crawler"],
    ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", "ai-crawler"],
    ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)", "ai-crawler"],
    ["Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36", "headless"],
    ["curl/8.7.1", "script"],
    ["python-requests/2.32.3", "script"],
    ["Wget/1.21.4", "script"],
    ["Go-http-client/2.0", "script"]
  ];

  for (const [userAgent, uaClass] of bots) {
    it(`counts ${uaClass} as a bot`, () => {
      const result = classifyClick({
        method: "GET",
        userAgent,
        purpose: null,
        secPurpose: null,
        xPurpose: null,
        xMoz: null
      });
      assert.equal(result.uaClass, uaClass);
      assert.equal(result.verdict, "bot");
    });
  }

  it("counts a normal browser GET as human", () => {
    for (const userAgent of [
      CHROME,
      "Mozilla/5.0 (Windows NT 10.0; rv:131.0) Gecko/20100101 Firefox/131.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15"
    ]) {
      const result = classifyClick({
        method: "GET",
        userAgent,
        purpose: null,
        secPurpose: null,
        xPurpose: null,
        xMoz: null
      });
      assert.equal(result.verdict, "human");
      assert.equal(result.uaClass, "browser");
    }
  });

  it("counts missing UA, HEAD, and prefetch as bots", () => {
    assert.equal(
      classifyClick({ method: "GET", userAgent: "   ", purpose: null, secPurpose: null, xPurpose: null, xMoz: null })
        .verdict,
      "bot"
    );
    assert.equal(
      classifyClick({ method: "HEAD", userAgent: CHROME, purpose: null, secPurpose: null, xPurpose: null, xMoz: null })
        .verdict,
      "bot"
    );

    const request = new Request("https://kadunas.com/go/lemlist", {
      headers: {
        "user-agent": CHROME,
        purpose: "prefetch"
      }
    });
    assert.deepEqual(classifyRequest(request), { uaClass: "browser", verdict: "bot" });

    const prerender = new Request("https://kadunas.com/go/lemlist", {
      headers: {
        "user-agent": CHROME,
        "sec-purpose": "prefetch;prerender"
      }
    });
    assert.equal(classifyRequest(prerender).verdict, "bot");
    assert.equal(
      classifyClick({ method: "GET", userAgent: CHROME, purpose: null, secPurpose: null, xPurpose: null, xMoz: "prefetch" })
        .verdict,
      "bot"
    );
  });
});

describe("click log", () => {
  it("dedupes a hashed visitor for 30 minutes and never stores the IP", () => {
    assert.equal(DEDUPE_WINDOW_SECONDS, 1800);
    assert.equal(shouldCountHit(null, false), true);
    assert.equal(shouldCountHit("abc", true), true);
    assert.equal(shouldCountHit("abc", false), false);

    const ip = "203.0.113.9";
    const hash = visitorHash(ip, CHROME, "salt");
    assert.match(hash, /^[a-f0-9]{32}$/);
    assert.notEqual(hash, visitorHash("203.0.113.10", CHROME, "salt"));
    assert.equal(hash, visitorHash(ip, CHROME, "salt"));

    const command = buildLogCommand({
      slug: "lemlist",
      verdict: "human",
      visitorHashValue: hash,
      event: {
        timestamp: "2026-10-30T07:13:40.000Z",
        slug: "lemlist",
        referrer: "/tools/lemlist/",
        country: "LT",
        uaClass: "browser",
        verdict: "human"
      }
    });
    const serialized = JSON.stringify(command);
    assert.equal(serialized.includes(ip), false);
    assert.equal(serialized.includes(hash), true);
    assert.match(command[1] ?? "", /SET/);
    assert.match(command[1] ?? "", /NX/);
    assert.equal(command[6], "1800");
    assert.equal(command[8], "lemlist");
    assert.match(command[4] ?? "", /^go:h:2026-10-30$/);
    assert.match(command[5] ?? "", /^go:e:2026-10-30$/);
    assert.equal(command[10], "1");

    const botCommand = buildLogCommand({
      slug: "lemlist",
      verdict: "bot",
      visitorHashValue: null,
      event: {
        timestamp: "2026-10-30T07:13:40.000Z",
        slug: "lemlist",
        referrer: null,
        country: null,
        uaClass: "googlebot",
        verdict: "bot"
      }
    });
    assert.match(botCommand[4] ?? "", /^go:b:2026-10-30$/);
    assert.equal(botCommand[10], "0");
  });

  it("keeps the referrer path and the country code only", () => {
    assert.equal(
      referrerPath("https://kadunas.com/tools/lemlist/?utm=secret#top"),
      "/tools/lemlist/"
    );
    assert.equal(referrerPath("https://news.ycombinator.com/item?id=1"), "https://news.ycombinator.com/item");
    assert.equal(referrerPath("not a url"), null);

    const headers = new Headers({
      "x-vercel-ip-country": "lt",
      "x-forwarded-for": "203.0.113.9, 10.0.0.1"
    });
    assert.equal(countryCode(headers), "LT");
    assert.equal(countryCode(new Headers({ "cf-ipcountry": "XX" })), null);
    assert.equal(countryCode(new Headers({ "x-vercel-ip-country": "T1" })), null);
  });
});

describe("stats query", () => {
  it("parses the day window and requires the bearer token", () => {
    assert.equal(parseDays(null), 30);
    assert.equal(parseDays("7"), 7);
    assert.equal(parseDays("0"), null);
    assert.equal(parseDays("367"), null);
    assert.equal(parseDays("1.5"), null);
    assert.deepEqual(utcDayRange(2, new Date("2026-03-01T12:00:00.000Z")), ["2026-02-28", "2026-03-01"]);

    assert.equal(authorizeStats(null, undefined), "unauthorized");
    assert.equal(authorizeStats("Bearer secret", undefined), "unauthorized");
    assert.equal(authorizeStats("Bearer wrong", "secret"), "unauthorized");
    assert.equal(authorizeStats("Bearer secret", "secret"), "ok");
  });

  it("sums human clicks and bot hits per slug per day", () => {
    const stats = aggregateStats({
      dates: ["2026-10-29", "2026-10-30"],
      humanByDate: {
        "2026-10-29": { lemlist: 2 },
        "2026-10-30": { lemlist: 1, smartlead: 4 }
      },
      botByDate: {
        "2026-10-30": { lemlist: 3, ghost: 1 }
      },
      linkMeta: new Map([
        ["lemlist", { tool: "lemlist.com", category: "Outreach Tool" }],
        ["smartlead", { tool: "Smartlead.ai", category: "Cold Email Outreach" }]
      ])
    });

    assert.deepEqual(stats.totals, { human: 7, bot: 4 });
    assert.deepEqual(
      stats.rows.map((row) => [row.date, row.slug, row.human, row.bot]),
      [
        ["2026-10-29", "lemlist", 2, 0],
        ["2026-10-30", "ghost", 0, 1],
        ["2026-10-30", "lemlist", 1, 3],
        ["2026-10-30", "smartlead", 4, 0]
      ]
    );
    assert.equal(stats.slugTotals[0]?.slug, "smartlead");
    assert.equal(stats.slugTotals.find((row) => row.slug === "ghost")?.tool, "");
    assert.deepEqual(parseHash(["lemlist", "2", "smartlead", "1"]), { lemlist: 2, smartlead: 1 });
    assert.deepEqual(parseHash({ lemlist: "3" }), { lemlist: 3 });
  });
});

describe("storage", () => {
  it("skips logging and returns an empty stats payload when Redis is not configured", async () => {
    const stats = await readGoStats(3, new Date("2026-10-30T12:00:00.000Z"), {});
    assert.equal(stats.logging, false);
    assert.deepEqual(stats.totals, { human: 0, bot: 0 });
    assert.deepEqual(stats.rows, []);
    assert.equal(stats.from, "2026-10-28");
    assert.equal(stats.to, "2026-10-30");
  });
});

describe("robots", () => {
  it("disallows the redirect and stats paths", () => {
    const robots = readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8");
    assert.match(robots, /^Disallow: \/go\/$/m);
    assert.match(robots, /^Disallow: \/api\/$/m);
  });
});
