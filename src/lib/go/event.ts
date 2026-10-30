import { createHmac, timingSafeEqual } from "node:crypto";
import type { ClickVerdict } from "@/lib/go/classify";

export const DEDUPE_WINDOW_SECONDS = 30 * 60;
export const RETENTION_SECONDS = 400 * 24 * 60 * 60;
export const DEFAULT_STATS_DAYS = 30;
export const MAX_STATS_DAYS = 366;

const LOG_SCRIPT = `
local window = tonumber(ARGV[1])
local retention = tonumber(ARGV[2])
local field = ARGV[3]
local event = ARGV[4]
local dedupe = ARGV[5]
if dedupe == "1" then
  local created = redis.call("SET", KEYS[1], "1", "NX", "EX", window)
  if not created then
    return 0
  end
end
redis.call("HINCRBY", KEYS[2], field, 1)
redis.call("EXPIRE", KEYS[2], retention)
redis.call("RPUSH", KEYS[3], event)
redis.call("EXPIRE", KEYS[3], retention)
return 1
`;

export interface ClickEvent {
  timestamp: string;
  slug: string;
  referrer: string | null;
  country: string | null;
  uaClass: string;
  verdict: ClickVerdict;
}

const SAME_SITE_HOSTS = new Set(["kadunas.com", "www.kadunas.com", "localhost", "127.0.0.1"]);
const UNKNOWN_COUNTRIES = new Set(["XX", "T1"]);

export function clientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim() ?? "";
    if (first) {
      return first;
    }
  }

  const real = headers.get("x-real-ip")?.trim();
  return real || null;
}

export function visitorHash(ip: string, userAgent: string, salt: string): string {
  return createHmac("sha256", salt).update(`${ip}\n${userAgent}`).digest("hex").slice(0, 32);
}

export function referrerPath(referer: string | null): string | null {
  if (!referer) {
    return null;
  }

  try {
    const url = new URL(referer);
    const path = (url.pathname || "/").slice(0, 200);
    if (SAME_SITE_HOSTS.has(url.hostname.toLowerCase())) {
      return path;
    }
    return `${url.origin}${path}`.slice(0, 200);
  } catch {
    return null;
  }
}

export function countryCode(headers: Headers): string | null {
  const raw = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");
  if (!raw) {
    return null;
  }

  const code = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || UNKNOWN_COUNTRIES.has(code)) {
    return null;
  }

  return code;
}

/**
 * A repeat from the same hashed visitor and slug inside the dedupe window is
 * not counted. Without a visitor hash there is nothing safe to dedupe on.
 */
export function shouldCountHit(visitorHashValue: string | null, dedupeKeyCreated: boolean): boolean {
  if (!visitorHashValue) {
    return true;
  }
  return dedupeKeyCreated;
}

export function countPrefix(verdict: ClickVerdict): "h" | "b" {
  switch (verdict) {
    case "human":
      return "h";
    case "bot":
      return "b";
    default: {
      const neverVerdict: never = verdict;
      throw new Error(`Unhandled verdict: ${String(neverVerdict)}`);
    }
  }
}

export function buildLogCommand(input: {
  slug: string;
  verdict: ClickVerdict;
  event: ClickEvent;
  visitorHashValue: string | null;
}): string[] {
  const day = input.event.timestamp.slice(0, 10);
  const seenKey = input.visitorHashValue
    ? `go:seen:${input.visitorHashValue}:${input.slug}`
    : "go:seen:none";

  return [
    "EVAL",
    LOG_SCRIPT,
    "3",
    seenKey,
    `go:${countPrefix(input.verdict)}:${day}`,
    `go:e:${day}`,
    String(DEDUPE_WINDOW_SECONDS),
    String(RETENTION_SECONDS),
    input.slug,
    JSON.stringify(input.event),
    input.visitorHashValue ? "1" : "0"
  ];
}

export function utcDayRange(days: number, now: Date): string[] {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const dates: string[] = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    dates.push(new Date(today - offset * 86_400_000).toISOString().slice(0, 10));
  }
  return dates;
}

export function parseDays(value: string | null): number | null {
  if (value === null || value.trim() === "") {
    return DEFAULT_STATS_DAYS;
  }
  if (!/^[1-9]\d*$/.test(value.trim())) {
    return null;
  }
  const days = Number(value);
  if (days < 1 || days > MAX_STATS_DAYS) {
    return null;
  }
  return days;
}

export function authorizeStats(header: string | null, expected: string | undefined): "ok" | "unauthorized" {
  const token = expected?.trim() ?? "";
  if (!token || !header?.startsWith("Bearer ")) {
    return "unauthorized";
  }

  const presented = header.slice("Bearer ".length).trim();
  const actual = Buffer.from(presented);
  const wanted = Buffer.from(token);
  if (actual.length !== wanted.length || !timingSafeEqual(actual, wanted)) {
    return "unauthorized";
  }

  return "ok";
}

export interface StatsRow {
  date: string;
  slug: string;
  tool: string;
  category: string;
  human: number;
  bot: number;
}

export interface SlugTotal {
  slug: string;
  tool: string;
  category: string;
  human: number;
  bot: number;
}

export function aggregateStats(input: {
  dates: string[];
  humanByDate: Readonly<Record<string, Readonly<Record<string, number>>>>;
  botByDate: Readonly<Record<string, Readonly<Record<string, number>>>>;
  linkMeta: ReadonlyMap<string, { tool: string; category: string }>;
}): { totals: { human: number; bot: number }; rows: StatsRow[]; slugTotals: SlugTotal[] } {
  const rows: StatsRow[] = [];
  const totalsBySlug = new Map<string, { human: number; bot: number }>();
  let human = 0;
  let bot = 0;

  for (const date of input.dates) {
    const humanCounts = input.humanByDate[date] ?? {};
    const botCounts = input.botByDate[date] ?? {};
    const slugs = new Set([...Object.keys(humanCounts), ...Object.keys(botCounts)]);

    for (const slug of [...slugs].sort()) {
      const humanCount = humanCounts[slug] ?? 0;
      const botCount = botCounts[slug] ?? 0;
      if (humanCount === 0 && botCount === 0) {
        continue;
      }

      human += humanCount;
      bot += botCount;
      const meta = input.linkMeta.get(slug);
      rows.push({
        date,
        slug,
        tool: meta?.tool ?? "",
        category: meta?.category ?? "",
        human: humanCount,
        bot: botCount
      });

      const previous = totalsBySlug.get(slug) ?? { human: 0, bot: 0 };
      totalsBySlug.set(slug, {
        human: previous.human + humanCount,
        bot: previous.bot + botCount
      });
    }
  }

  const slugTotals = [...totalsBySlug.entries()]
    .map(([slug, counts]) => {
      const meta = input.linkMeta.get(slug);
      return {
        slug,
        tool: meta?.tool ?? "",
        category: meta?.category ?? "",
        human: counts.human,
        bot: counts.bot
      };
    })
    .sort((left, right) => right.human - left.human || left.slug.localeCompare(right.slug));

  return { totals: { human, bot }, rows, slugTotals };
}

export function parseHash(result: unknown): Record<string, number> {
  const counts: Record<string, number> = {};

  if (Array.isArray(result)) {
    for (let index = 0; index < result.length; index += 2) {
      const field = result[index];
      const value = result[index + 1];
      if (typeof field === "string") {
        counts[field] = Number(value) || 0;
      }
    }
    return counts;
  }

  if (result && typeof result === "object") {
    for (const [field, value] of Object.entries(result)) {
      counts[field] = Number(value) || 0;
    }
  }

  return counts;
}
