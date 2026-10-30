import { AFFILIATE_LINKS_BY_SLUG } from "@/data/affiliate-links";
import type { Classification } from "@/lib/go/classify";
import {
  aggregateStats,
  buildLogCommand,
  clientIp,
  countryCode,
  parseHash,
  referrerPath,
  utcDayRange,
  visitorHash,
  type ClickEvent
} from "@/lib/go/event";

const REDIS_TIMEOUT_MS = 1500;

interface RedisConfig {
  url: string;
  token: string;
}

export function redisConfigFromEnv(env: Record<string, string | undefined>): RedisConfig | null {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || "").trim().replace(/\/$/, "");
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || "").trim();
  if (!url.startsWith("https://") || !token) {
    return null;
  }
  return { url, token };
}

async function redisJson(config: RedisConfig, path: string, body: unknown, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(`${config.url}${path}`, {
    method: "POST",
    redirect: "manual",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    signal
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Redis request failed (${response.status})`);
  }

  return response.json() as Promise<unknown>;
}

async function redisCommand(config: RedisConfig, command: unknown[], signal: AbortSignal): Promise<unknown> {
  const payload = (await redisJson(config, "", command, signal)) as { result?: unknown; error?: string };
  if (payload.error) {
    throw new Error("Redis command failed");
  }
  return payload.result ?? null;
}

export async function logGoHit(input: {
  request: Request;
  slug: string;
  classification: Classification;
  now?: Date;
  env?: Record<string, string | undefined>;
}): Promise<void> {
  const env = input.env ?? process.env;
  const config = redisConfigFromEnv(env);
  if (!config) {
    return;
  }

  const now = input.now ?? new Date();
  const userAgent = input.request.headers.get("user-agent")?.trim() ?? "";
  const ip = clientIp(input.request.headers);
  const salt = env.GO_CLICK_SALT?.trim();
  const hash = ip && salt ? visitorHash(ip, userAgent, salt) : null;
  const event: ClickEvent = {
    timestamp: now.toISOString(),
    slug: input.slug,
    referrer: referrerPath(input.request.headers.get("referer")),
    country: countryCode(input.request.headers),
    uaClass: input.classification.uaClass,
    verdict: input.classification.verdict
  };

  await redisCommand(
    config,
    buildLogCommand({
      slug: input.slug,
      verdict: input.classification.verdict,
      event,
      visitorHashValue: hash
    }),
    AbortSignal.timeout(REDIS_TIMEOUT_MS)
  );
}

export interface GoStatsBody {
  days: number;
  from: string;
  to: string;
  timezone: "UTC";
  generatedAt: string;
  logging: boolean;
  totals: { human: number; bot: number };
  slugTotals: ReturnType<typeof aggregateStats>["slugTotals"];
  rows: ReturnType<typeof aggregateStats>["rows"];
}

export async function readGoStats(
  days: number,
  now = new Date(),
  env: Record<string, string | undefined> = process.env
): Promise<GoStatsBody> {
  const dates = utcDayRange(days, now);
  const base = {
    days,
    from: dates[0] ?? "",
    to: dates[dates.length - 1] ?? "",
    timezone: "UTC" as const,
    generatedAt: now.toISOString()
  };
  const config = redisConfigFromEnv(env);
  if (!config) {
    return {
      ...base,
      logging: false,
      ...aggregateStats({
        dates,
        humanByDate: {},
        botByDate: {},
        linkMeta: AFFILIATE_LINKS_BY_SLUG
      })
    };
  }

  const commands = dates.flatMap((day) => [
    ["HGETALL", `go:h:${day}`],
    ["HGETALL", `go:b:${day}`]
  ]);
  const payload = await redisJson(config, "/pipeline", commands, AbortSignal.timeout(REDIS_TIMEOUT_MS));
  const results = pipelineResults(payload);
  const humanByDate: Record<string, Record<string, number>> = {};
  const botByDate: Record<string, Record<string, number>> = {};

  dates.forEach((day, index) => {
    humanByDate[day] = parseHash(results[index * 2]);
    botByDate[day] = parseHash(results[index * 2 + 1]);
  });

  return {
    ...base,
    logging: true,
    ...aggregateStats({
      dates,
      humanByDate,
      botByDate,
      linkMeta: AFFILIATE_LINKS_BY_SLUG
    })
  };
}

function pipelineResults(payload: unknown): unknown[] {
  if (!Array.isArray(payload)) {
    throw new Error("Unexpected Redis pipeline response");
  }

  return payload.map((entry) => {
    if (entry && typeof entry === "object" && "error" in entry && (entry as { error?: string }).error) {
      throw new Error("Redis command failed");
    }
    if (entry && typeof entry === "object" && "result" in entry) {
      return (entry as { result: unknown }).result;
    }
    return entry;
  });
}
