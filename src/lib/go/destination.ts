import { getAffiliateLink } from "@/data/affiliate-links";

export const UNKNOWN_GO_LOCATION = "/tools/";

const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;

function hasControlCharacter(url: string): boolean {
  for (let index = 0; index < url.length; index += 1) {
    const code = url.charCodeAt(index);
    if (code < 32 || code === 127) {
      return true;
    }
  }
  return false;
}

export interface GoDestination {
  location: string;
  slug: string;
  known: boolean;
}

/** True when a stored affiliate URL is safe to put in a Location header as-is. */
export function isSafeAffiliateUrl(url: string): boolean {
  if (!/^https?:\/\//i.test(url)) {
    return false;
  }
  if (url.includes("\\") || /\s/.test(url) || hasControlCharacter(url)) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function resolveGoDestination(slug: string | undefined): GoDestination {
  const normalized = (slug ?? "").trim().toLowerCase();
  if (!SLUG_PATTERN.test(normalized)) {
    return { location: UNKNOWN_GO_LOCATION, slug: "invalid", known: false };
  }

  const link = getAffiliateLink(normalized);
  if (!link || !isSafeAffiliateUrl(link.url)) {
    return { location: UNKNOWN_GO_LOCATION, slug: normalized, known: false };
  }

  return { location: link.url, slug: link.slug, known: true };
}
