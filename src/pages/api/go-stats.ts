import type { APIRoute } from "astro";
import { authorizeStats, parseDays } from "@/lib/go/event";
import { readGoStats } from "@/lib/go/store";

export const prerender = false;

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
      ...extraHeaders
    }
  });
}

export const GET: APIRoute = async ({ request, url }) => {
  if (authorizeStats(request.headers.get("authorization"), process.env.GO_STATS_TOKEN) !== "ok") {
    return json({ error: "unauthorized" }, 401, { "WWW-Authenticate": "Bearer" });
  }

  const days = parseDays(url.searchParams.get("days"));
  if (days === null) {
    return json({ error: "invalid_days" }, 400);
  }

  try {
    return json(await readGoStats(days), 200);
  } catch {
    return json({ error: "stats_unavailable" }, 503);
  }
};
