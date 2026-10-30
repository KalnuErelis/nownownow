import type { APIRoute } from "astro";
import { classifyRequest } from "@/lib/go/classify";
import { resolveGoDestination } from "@/lib/go/destination";
import { logGoHit } from "@/lib/go/store";

export const prerender = false;

export const ALL: APIRoute = async ({ request, params }) => {
  const destination = resolveGoDestination(params.slug);
  try {
    await logGoHit({
      request,
      slug: destination.slug,
      classification: classifyRequest(request)
    });
  } catch {
    // Click logging is best-effort. The redirect still has to leave.
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.location,
      "X-Robots-Tag": "noindex",
      "Cache-Control": "private, no-store",
      "CDN-Cache-Control": "no-store"
    }
  });
};
