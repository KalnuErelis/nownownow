export type ClickVerdict = "human" | "bot";

export interface Classification {
  uaClass: string;
  verdict: ClickVerdict;
}

export interface ClassifyInput {
  method: string;
  userAgent: string | null;
  purpose: string | null;
  secPurpose: string | null;
  xPurpose: string | null;
  xMoz: string | null;
}

const BOT_UA_RULES: readonly { uaClass: string; pattern: RegExp }[] = [
  {
    uaClass: "googlebot",
    pattern:
      /googlebot|google-inspectiontool|adsbot-google|mediapartners-google|storebot-google|googleother|feedfetcher-google|apis-google/i
  },
  {
    uaClass: "bingbot",
    pattern: /bingbot|bingpreview|msnbot|adidxbot/i
  },
  {
    uaClass: "preview",
    pattern:
      /slackbot|slack-imgproxy|twitterbot|facebookexternalhit|facebookcatalog|facebot|linkedinbot|whatsapp|discordbot|telegrambot|embedly|pinterestbot|redditbot|quora link preview|vkshare|skypeuripreview|iframely/i
  },
  { uaClass: "applebot", pattern: /applebot/i },
  {
    uaClass: "seo-crawler",
    pattern: /ahrefsbot|semrushbot|dotbot|mj12bot|petalbot/i
  },
  {
    uaClass: "ai-crawler",
    pattern:
      /gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|anthropic-ai|perplexitybot|ccbot|amazonbot|bytespider|cohere-ai/i
  },
  {
    uaClass: "headless",
    pattern: /headlesschrome|phantomjs|puppeteer|playwright|selenium|slimerjs|\bheadless\b/i
  },
  {
    uaClass: "script",
    pattern:
      /curl\/|wget\/|python-requests|python-urllib|httpie\/|go-http-client|java\/|libwww-perl|okhttp|axios\/|node-fetch|undici|scrapy|httpx|aiohttp|postmanruntime|insomnia\//i
  },
  { uaClass: "bot", pattern: /bot\b|crawler|spider|slurp/i }
];

function uaClassFor(userAgent: string): string {
  for (const rule of BOT_UA_RULES) {
    if (rule.pattern.test(userAgent)) {
      return rule.uaClass;
    }
  }

  if (/mozilla|chrome|safari|firefox|edg\/|opr\//i.test(userAgent)) {
    return "browser";
  }

  return "other";
}

function headerRequestsPrefetch(value: string | null): boolean {
  if (!value) {
    return false;
  }
  const normalized = value.toLowerCase();
  return normalized.includes("prefetch") || normalized.includes("prerender");
}

export function classifyClick(input: ClassifyInput): Classification {
  const userAgent = input.userAgent?.trim() ?? "";
  const uaClass = userAgent ? uaClassFor(userAgent) : "empty";
  const prefetch =
    headerRequestsPrefetch(input.purpose) ||
    headerRequestsPrefetch(input.secPurpose) ||
    headerRequestsPrefetch(input.xPurpose) ||
    headerRequestsPrefetch(input.xMoz);
  const automatedMethod = input.method.toUpperCase() !== "GET";
  const knownBot = uaClass !== "browser" && uaClass !== "other";
  const verdict: ClickVerdict = knownBot || prefetch || automatedMethod ? "bot" : "human";

  return { uaClass, verdict };
}

export function classifyRequest(request: Request): Classification {
  return classifyClick({
    method: request.method,
    userAgent: request.headers.get("user-agent"),
    purpose: request.headers.get("purpose"),
    secPurpose: request.headers.get("sec-purpose"),
    xPurpose: request.headers.get("x-purpose"),
    xMoz: request.headers.get("x-moz")
  });
}
