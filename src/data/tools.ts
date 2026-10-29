/**
 * Public outbound tools directory.
 *
 * Ranking: reorder slugs in `CATEGORY_RANKINGS`. Earlier slugs rank higher.
 * Affiliate URLs are the public tracking links only. Do not add emails,
 * earnings, payout notes, or commission terms to this file.
 *
 * Salesforge.ai's sheet cell contained three URLs stuck together. They are
 * stored separately for Salesforge, Mailforge, and Infraforge.
 * lemlist's sheet cell contained two URLs; the CTA uses https://get.lemlist.com/jaunius
 * (the other is https://get.lemlist.com/r29b26xyvakg).
 * Artisan's sheet value omitted the scheme; `https://` is added and the host
 * plus `?ref=jaunius` are unchanged.
 */

export const DIRECTORY_YEAR = 2026;

export const AFFILIATE_DISCLOSURE =
  "Some links are affiliate links; I may earn a commission at no extra cost to you.";

export type ToolCategoryId =
  | "cold-email"
  | "linkedin-outreach"
  | "email-finders"
  | "cold-email-infrastructure"
  | "ai-sdr";

export interface ToolCategory {
  id: ToolCategoryId;
  label: string;
  title: string;
  description: string;
  intro: string;
  href: string;
}

export interface Tool {
  name: string;
  slug: string;
  href: string;
  category: ToolCategoryId;
  alsoIn: ToolCategoryId[];
  summary: string;
  bestFor: string;
  audience: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  homepage: string;
  pricing?: string;
}

export const TOOLS_INDEX = {
  title: "Tools",
  description:
    "A ranked directory of outbound tools for cold email, LinkedIn, email finding, infrastructure, and AI SDRs.",
  eyebrow: "Directory",
  intro:
    "Outbound tools I would actually point someone to. Grouped by the job they do, and ranked within each group."
};

export const COMPARISON = {
  title: "Instantly vs Smartlead vs lemlist",
  description: `How Instantly, Smartlead, and lemlist differ for cold email in ${DIRECTORY_YEAR}. The Instantly link has no affiliate parameter.`,
  href: "/tools/compare/instantly-vs-smartlead-vs-lemlist/",
  intro:
    "Three cold email tools people put side by side. Smartlead and lemlist use affiliate links. The Instantly button goes to instantly.ai with no tracking parameter.",
  closing:
    "Choose Smartlead or Instantly when the job is cold email across many accounts. Choose lemlist when LinkedIn steps belong in the same sequence."
};

export const INSTANTLY = {
  name: "Instantly",
  summary:
    "Instantly is a cold email platform for campaigns, warmup, and sending from many accounts.",
  bestFor: "Cold email campaigns and inbox warmup.",
  homepage: "https://instantly.ai"
} as const;

interface ToolInput {
  name: string;
  slug: string;
  category: ToolCategoryId;
  alsoIn?: readonly ToolCategoryId[];
  summary: string;
  bestFor: string;
  audience: string;
  pros: readonly string[];
  cons: readonly string[];
  affiliateUrl: string;
  homepage: string;
  pricing?: string;
}

function defineCategory(entry: Omit<ToolCategory, "href">): ToolCategory {
  return {
    ...entry,
    href: `/tools/best/${entry.id}/`
  };
}

function defineTool(entry: ToolInput): Tool {
  return {
    name: entry.name,
    slug: entry.slug,
    href: `/tools/${entry.slug}/`,
    category: entry.category,
    alsoIn: [...(entry.alsoIn ?? [])],
    summary: entry.summary,
    bestFor: entry.bestFor,
    audience: entry.audience,
    pros: [...entry.pros],
    cons: [...entry.cons],
    affiliateUrl: entry.affiliateUrl,
    homepage: entry.homepage,
    ...(entry.pricing ? { pricing: entry.pricing } : {})
  };
}

export const TOOL_CATEGORIES: readonly ToolCategory[] = [
  defineCategory({
    id: "cold-email",
    label: "Cold email",
    title: `Best cold email tools in ${DIRECTORY_YEAR}`,
    description: `Best cold email tools in ${DIRECTORY_YEAR}: lemlist, Smartlead, Reply, and Saleshandy, with who each one is for.`,
    intro:
      "Sequencers for cold email. lemlist and Smartlead are the ones I would open first. Reply is the broader sales engagement platform. Saleshandy is the simpler cold email tool."
  }),
  defineCategory({
    id: "linkedin-outreach",
    label: "LinkedIn outreach",
    title: `Best LinkedIn outreach tools in ${DIRECTORY_YEAR}`,
    description: `Best LinkedIn outreach tools in ${DIRECTORY_YEAR}: Gojiberry and La Growth Machine, with who each one is for.`,
    intro:
      "Gojiberry is an AI agent that contacts people by email and social. La Growth Machine is the sequencer for LinkedIn, email, calls, and X on accounts you connect."
  }),
  defineCategory({
    id: "email-finders",
    label: "Email finders and enrichment",
    title: `Best email finders and data enrichment tools in ${DIRECTORY_YEAR}`,
    description: `Best email finders and data enrichment tools in ${DIRECTORY_YEAR}: FullEnrich, Findymail, Prospeo, Databar, and Ocean.io.`,
    intro:
      "Tools for finding emails and filling in account data before anyone sends. FullEnrich is first when one data vendor is not enough."
  }),
  defineCategory({
    id: "cold-email-infrastructure",
    label: "Infrastructure and warmup",
    title: `Best cold email infrastructure and warmup tools in ${DIRECTORY_YEAR}`,
    description: `Best cold email infrastructure and warmup tools in ${DIRECTORY_YEAR}: domains, inboxes, warmup, and list verification.`,
    intro:
      "Domains, inboxes, warmup, and list verification. Zapmail is first for Google and Microsoft mailboxes. Mailforge and Infraforge are shared and dedicated infrastructure. Warmy, Mailreach, and ZeroBounce prepare or clean what you send."
  }),
  defineCategory({
    id: "ai-sdr",
    label: "AI SDR and multichannel",
    title: `Best AI SDR and multichannel outreach tools in ${DIRECTORY_YEAR}`,
    description: `Best AI SDR and multichannel outreach tools in ${DIRECTORY_YEAR}: Salesforge, Gojiberry, La Growth Machine, and Artisan.`,
    intro:
      "Salesforge is the outreach platform with an optional AI SDR. Gojiberry and Artisan run prospecting and first-touch outreach. La Growth Machine is the multichannel sequencer you still design."
  })
];

const TOOL_INPUTS: readonly ToolInput[] = [
  {
    name: "lemlist",
    slug: "lemlist",
    category: "cold-email",
    summary:
      "lemlist is an outreach platform for cold email and multichannel sequences, including LinkedIn.",
    bestFor: "Personalized cold email plus LinkedIn in one sequence.",
    audience:
      "Teams that want to design the sequence themselves and keep email and LinkedIn steps in one campaign.",
    pros: [
      "Email and LinkedIn steps live in the same sequence.",
      "Personalization can go beyond a first-name field, including custom images.",
      "You keep control of the campaign instead of handing it to an autonomous agent."
    ],
    cons: [
      "Mailboxes and domains are set up in a separate tool.",
      "LinkedIn steps run from the LinkedIn account you connect.",
      "There is more to configure than in an email finder or a warmup tool."
    ],
    affiliateUrl: "https://get.lemlist.com/jaunius",
    homepage: "https://www.lemlist.com"
  },
  {
    name: "Smartlead",
    slug: "smartlead",
    category: "cold-email",
    summary:
      "Smartlead is a cold email platform for campaigns across many mailboxes, with warmup in the same product.",
    bestFor: "Cold email across many mailboxes.",
    audience:
      "Operators running cold email volume who already have domains and inboxes, or plan to buy them.",
    pros: [
      "Built for campaigns that send from many mailboxes.",
      "Warmup and campaign sending sit in the same product.",
      "You operate the campaigns yourself."
    ],
    cons: [
      "LinkedIn sequences belong in a different tool.",
      "Domains and inboxes come from an infrastructure provider.",
      "It is a campaign tool, so an autonomous AI SDR is a different kind of product."
    ],
    affiliateUrl: "https://smartlead.ai/?via=jaunius-kadunas",
    homepage: "https://www.smartlead.ai"
  },
  {
    name: "Reply",
    slug: "reply",
    category: "cold-email",
    summary:
      "Reply is a sales engagement platform for email sequences, calls, tasks, and LinkedIn steps.",
    bestFor: "Sales engagement beyond email-only sequences.",
    audience:
      "Teams that mix email with calls, tasks, and LinkedIn inside one engagement workflow.",
    pros: [
      "Sequences can include email, calls, tasks, and LinkedIn.",
      "Fits a sales team that works from a shared engagement queue.",
      "Useful when cold email is one channel among several."
    ],
    cons: [
      "There is more to set up than in an email-only sender.",
      "Sending domains and inboxes are separate.",
      "Mailbox rotation at high volume is a closer fit for a dedicated cold-email platform."
    ],
    affiliateUrl: "https://get.reply.io/85purla09q1z",
    homepage: "https://reply.io"
  },
  {
    name: "Saleshandy",
    slug: "saleshandy",
    category: "cold-email",
    summary: "Saleshandy is a cold email tool for sequences and finding emails.",
    bestFor: "Straightforward cold email sequences.",
    audience:
      "Senders who want a focused cold email tool, with email finding in the same product.",
    pros: [
      "Sequences and email finding start in one place.",
      "The product stays centered on cold email.",
      "Easier to scan than a multichannel suite."
    ],
    cons: [
      "LinkedIn-heavy outreach is a closer fit for lemlist or La Growth Machine.",
      "Domains, inboxes, and a separate verification pass still sit outside it.",
      "Autonomous meeting booking is a different product category."
    ],
    affiliateUrl: "https://www.saleshandy.com/?p=v3&via=jaunius",
    homepage: "https://www.saleshandy.com"
  },
  {
    name: "Gojiberry",
    slug: "gojiberry",
    category: "linkedin-outreach",
    alsoIn: ["ai-sdr"],
    summary:
      "Gojiberry is an AI sales agent that finds prospects and contacts them by email and social.",
    bestFor: "An AI agent that prospects and starts conversations.",
    audience:
      "Teams that want prospecting and first-touch outreach handled, with the option to approve messages before they send.",
    pros: [
      "Finds prospects and starts outreach from your site and ideal customer.",
      "Contacts people by email and social.",
      "Can send on its own or hold messages for approval."
    ],
    cons: [
      "A weak fit when you want to design every sequence branch yourself.",
      "La Growth Machine is the closer fit for a classic LinkedIn task sequence.",
      "The public Pro plan is listed; larger setups are sold as a custom plan."
    ],
    affiliateUrl: "https://gojiberry.ai/?ref=jaunius",
    homepage: "https://gojiberry.ai",
    pricing: "Pro is listed at $99 per month on gojiberry.ai (checked 29 October 2026)."
  },
  {
    name: "La Growth Machine",
    slug: "la-growth-machine",
    category: "ai-sdr",
    alsoIn: ["linkedin-outreach"],
    summary:
      "La Growth Machine runs multichannel sequences across LinkedIn, email, calls, and X from your own accounts.",
    bestFor: "LinkedIn-first multichannel sequences on your own accounts.",
    audience:
      "GTM teams that already have a data stack and want one place to run LinkedIn, email, and call tasks.",
    pros: [
      "LinkedIn, email, call tasks, and X can sit in one sequence.",
      "Runs in the cloud from accounts you connect, with limits you set.",
      "Conditions can switch channel when a LinkedIn request is not accepted."
    ],
    cons: [
      "Mailboxes and email finding come from other tools.",
      "LinkedIn safety still depends on the accounts and limits you set.",
      "You design the sequence. It does not replace a data provider."
    ],
    affiliateUrl: "https://lagrowthmachine.com/?ref=mjq1ytz",
    homepage: "https://lagrowthmachine.com"
  },
  {
    name: "FullEnrich",
    slug: "fullenrich",
    category: "email-finders",
    summary:
      "FullEnrich checks multiple data providers to find work emails and phone numbers for a contact.",
    bestFor: "Waterfall enrichment for emails and phone numbers.",
    audience:
      "Teams that already have contacts or a CRM and want a better hit rate on emails and mobiles.",
    pros: [
      "Uses more than one data provider on the same contact.",
      "Aimed at work emails and phone numbers.",
      "Fits a list or CRM you already have."
    ],
    cons: [
      "Sending and LinkedIn outreach happen in another tool.",
      "A miss still leaves you without contact data.",
      "Warmup and sequencing are separate jobs."
    ],
    affiliateUrl: "https://try.fullenrich.com/y17j0olw1cq8",
    homepage: "https://fullenrich.com"
  },
  {
    name: "Findymail",
    slug: "findymail",
    category: "email-finders",
    summary: "Findymail finds professional email addresses and verifies them.",
    bestFor: "Finding a verified work email.",
    audience: "Prospecting workflows that need an email finder with verification included.",
    pros: [
      "Built to find a work email and check it.",
      "Slots in as the email step before a sequencer.",
      "A narrow product, so there is less to configure."
    ],
    cons: [
      "It does not send the campaign.",
      "Phone enrichment is a different tool.",
      "Coverage still depends on the person, as with any finder."
    ],
    affiliateUrl: "https://www.findymail.com/?via=jaunius",
    homepage: "https://www.findymail.com"
  },
  {
    name: "Prospeo",
    slug: "prospeo",
    category: "email-finders",
    summary: "Prospeo finds professional emails, including from LinkedIn-based prospecting.",
    bestFor: "Finding emails from LinkedIn-style prospecting.",
    audience: "People building lists from LinkedIn profiles who need a work email next.",
    pros: [
      "Built for professional email finding.",
      "Fits list building that starts on LinkedIn.",
      "A sequencer can sit downstream of the export."
    ],
    cons: [
      "Warmup and sending live elsewhere.",
      "Company research at Databar's depth is a different product.",
      "A second verifier is still an option if your process requires one."
    ],
    affiliateUrl: "https://prospeo.io/?via=jaunius",
    homepage: "https://prospeo.io"
  },
  {
    name: "Databar",
    slug: "databar",
    category: "email-finders",
    summary:
      "Databar is a workspace for searching companies and people, enriching records, and sending lists onward.",
    bestFor: "Building and enriching lists in one workspace.",
    audience:
      "GTM and RevOps people who want company and contact data, workflows, and a push into the CRM or sequencer.",
    pros: [
      "Search, enrichment, and workflows live in one workspace.",
      "Finished lists can be pushed toward a CRM or outreach tool.",
      "Covers company filters and research steps as well as contact data."
    ],
    cons: [
      "More product than you need when the only job is one verified email.",
      "The campaign still sends from a sequencer.",
      "Current credit pricing is on their site, and it is not repeated here."
    ],
    affiliateUrl: "https://databar.ai/friends?via=jaunius",
    homepage: "https://databar.ai"
  },
  {
    name: "Ocean.io",
    slug: "ocean",
    category: "email-finders",
    summary:
      "Ocean.io builds lookalike company lists from customers or target accounts you already have.",
    bestFor: "Lookalike accounts from customers you already have.",
    audience: "Teams that can name their best customers and want more companies that resemble them.",
    pros: [
      "Starts from accounts you already trust.",
      "Useful when a plain industry-and-size filter is too broad.",
      "Sits upstream of an email finder and a sequencer."
    ],
    cons: [
      "A lookalike company list still needs emails before anyone can send.",
      "Enrichment and sending happen in other tools.",
      "A weak fit when the account list is already known name by name."
    ],
    affiliateUrl: "https://www.ocean.io?aff=OG4BWkCE7bjJ",
    homepage: "https://www.ocean.io"
  },
  {
    name: "Zapmail",
    slug: "zapmail",
    category: "cold-email-infrastructure",
    summary:
      "Zapmail sets up Google and Microsoft mailboxes and domains for cold email, with automated DNS.",
    bestFor: "Google and Microsoft mailboxes for cold email.",
    audience:
      "Senders who want Workspace or Microsoft inboxes, with DNS handled, rather than shared SMTP infrastructure.",
    pros: [
      "Provides Google and Microsoft mailboxes.",
      "DNS setup is automated.",
      "Pre-warmed mailboxes are available when you do not want to warm from zero."
    ],
    cons: [
      "It supplies infrastructure. The sequence lives in a sending tool.",
      "You still connect the mailboxes to that sender.",
      "A shared-IP pool is a different product, such as Mailforge."
    ],
    affiliateUrl: "https://zapmail.ai/?via=jaunius",
    homepage: "https://zapmail.ai"
  },
  {
    name: "Mailforge",
    slug: "mailforge",
    category: "cold-email-infrastructure",
    summary:
      "Mailforge provides cold-email domains and mailboxes on shared infrastructure, with automated DNS.",
    bestFor: "Domains and mailboxes on shared cold-email infrastructure.",
    audience:
      "Teams that want many cold-email mailboxes without a Google or Microsoft seat for each one.",
    pros: [
      "Domains and mailboxes built for cold email.",
      "SPF, DKIM, and DMARC are set up for you.",
      "Works with Salesforge or another sending tool."
    ],
    cons: [
      "Infrastructure is shared. Dedicated IPs are Infraforge's job.",
      "Google and Microsoft mailboxes are a different Forge product, Primeforge, which is not listed here.",
      "The sequencer is separate."
    ],
    affiliateUrl: "https://mailforge.ai/?via=jaunius",
    homepage: "https://mailforge.ai",
    pricing:
      "Mailforge lists $484 per month for 200 mailboxes on its homepage (checked 29 October 2026)."
  },
  {
    name: "Infraforge",
    slug: "infraforge",
    category: "cold-email-infrastructure",
    summary:
      "Infraforge provides cold-email domains and mailboxes on dedicated IPs, with automated DNS.",
    bestFor: "Dedicated-IP mailboxes when shared infrastructure is not enough.",
    audience: "Programs that want private cold-email infrastructure and dedicated IPs.",
    pros: [
      "Mailboxes sit on dedicated IPs.",
      "DNS is automated, and pre-warmed options are offered.",
      "Works with Salesforge or another sender."
    ],
    cons: [
      "More infrastructure than a small, single-domain program needs.",
      "It is not a Google Workspace reseller.",
      "The sequence still runs in a sending tool."
    ],
    affiliateUrl: "https://infraforge.ai/?via=jaunius",
    homepage: "https://infraforge.ai",
    pricing:
      "Infraforge lists $651 per month for 200 mailboxes on its homepage (checked 29 October 2026)."
  },
  {
    name: "Warmy",
    slug: "warmy",
    category: "cold-email-infrastructure",
    summary:
      "Warmy warms mailboxes and shows whether messages land in the inbox, spam, or promotions.",
    bestFor: "Warming mailboxes and checking inbox placement.",
    audience: "Senders who already have inboxes and want warmup plus a view of where mail lands.",
    pros: [
      "Warms mailboxes you already own.",
      "Reports placement across inbox, spam, and promotions.",
      "Connects to Gmail, Outlook, and SMTP."
    ],
    cons: [
      "Domains and mailboxes are purchased elsewhere.",
      "The campaign sends from your sequencer.",
      "List cleaning is a verifier's job, such as ZeroBounce."
    ],
    affiliateUrl: "https://warmy.io?fpr=jaunius90",
    homepage: "https://warmy.io"
  },
  {
    name: "Mailreach",
    slug: "mailreach",
    category: "cold-email-infrastructure",
    summary: "Mailreach warms inboxes used for cold email so a sequencer can send from them.",
    bestFor: "Warming cold-email inboxes.",
    audience: "Senders who want a dedicated warmup tool next to the sequencer.",
    pros: [
      "Does one job: warm inboxes used for cold outreach.",
      "Sits beside a sequencer instead of replacing it.",
      "Uses inboxes you already have."
    ],
    cons: [
      "It does not buy domains or mailboxes.",
      "It does not run the sequence.",
      "Some sequencers already include warmup, so check before adding a second tool."
    ],
    affiliateUrl: "https://mailreach.co?fpr=jaunius-da2f69",
    homepage: "https://mailreach.co"
  },
  {
    name: "ZeroBounce",
    slug: "zerobounce",
    category: "cold-email-infrastructure",
    summary: "ZeroBounce verifies email addresses and flags invalid or risky contacts before a send.",
    bestFor: "Verifying a list before anyone hits send.",
    audience:
      "Teams cleaning a list, or checking addresses as they are captured, so invalid emails stay out of the sequence.",
    pros: [
      "Verifies addresses in bulk or through an API.",
      "Flags invalid and risky contacts before a send.",
      "Works no matter which sequencer you use."
    ],
    cons: [
      "It does not warm inboxes.",
      "It does not find an email you do not already have.",
      "Sending still happens in another product."
    ],
    affiliateUrl: "https://www.zerobounce.net?ref=mmeyzde",
    homepage: "https://www.zerobounce.net"
  },
  {
    name: "Salesforge",
    slug: "salesforge",
    category: "ai-sdr",
    summary:
      "Salesforge runs email and LinkedIn outreach, with an optional AI SDR. Mailboxes are a separate purchase.",
    bestFor: "Email and LinkedIn outreach, with an AI SDR if you want one.",
    audience:
      "Teams that want the sequencer and the AI SDR in the same stack as their mailbox provider.",
    pros: [
      "Email and LinkedIn outreach run from one platform.",
      "Agent Frank can prospect and book, or you can run the campaigns yourself.",
      "Warmup is included, and Forge mailbox products connect to it."
    ],
    cons: [
      "Domains and mailboxes are a separate purchase.",
      "More stack than you need for warmup alone.",
      "Starting the AI SDR goes through a demo on their site."
    ],
    affiliateUrl: "https://salesforge.ai/?via=jaunius",
    homepage: "https://salesforge.ai"
  },
  {
    name: "Artisan",
    slug: "artisan",
    category: "ai-sdr",
    summary:
      "Artisan's AI BDR, Ava, finds leads, writes outreach, handles replies, and books meetings.",
    bestFor: "An autonomous AI BDR that runs outbound end to end.",
    audience:
      "Teams that want one product to find leads, write, send, and book, instead of assembling the stack themselves.",
    pros: [
      "Ava is positioned as an AI BDR for the whole outbound motion.",
      "Lead finding, writing, sending, replies, and booking are one product.",
      "A fit when you want the stack consolidated."
    ],
    cons: [
      "A weak fit when you want to hand-build every step.",
      "Mailbox and data choices are packaged inside the product.",
      "Price is confirmed with them. Nothing is listed here."
    ],
    affiliateUrl: "https://artisan.co/?ref=jaunius",
    homepage: "https://www.artisan.co"
  }
];

export const TOOLS: readonly Tool[] = TOOL_INPUTS.map((entry) => defineTool(entry));

/**
 * Earlier slugs rank higher. Keep this list in sync with each tool's
 * `category` and `alsoIn` fields.
 */
export const CATEGORY_RANKINGS = {
  "cold-email": ["lemlist", "smartlead", "reply", "saleshandy"],
  "linkedin-outreach": ["gojiberry", "la-growth-machine"],
  "email-finders": ["fullenrich", "findymail", "prospeo", "databar", "ocean"],
  "cold-email-infrastructure": [
    "zapmail",
    "mailforge",
    "infraforge",
    "warmy",
    "mailreach",
    "zerobounce"
  ],
  "ai-sdr": ["salesforge", "gojiberry", "la-growth-machine", "artisan"]
} as const satisfies Record<ToolCategoryId, readonly string[]>;

const PRIVATE_MARKERS = ["@", "paypal", "airwallex", "instantly.ai/?via="] as const;

function assertPublicToolsData(): void {
  const slugs = new Set<string>();

  for (const tool of TOOLS) {
    if (slugs.has(tool.slug)) {
      throw new Error(`Duplicate tool slug: ${tool.slug}`);
    }
    slugs.add(tool.slug);

    if (!tool.affiliateUrl.startsWith("https://") || /\s/.test(tool.affiliateUrl)) {
      throw new Error(`Affiliate URL must be a single https URL for ${tool.slug}`);
    }

    const publicText = [
      tool.name,
      tool.summary,
      tool.bestFor,
      tool.audience,
      tool.pricing ?? "",
      tool.affiliateUrl,
      tool.homepage,
      ...tool.pros,
      ...tool.cons
    ].join("\n");

    for (const marker of PRIVATE_MARKERS) {
      if (publicText.toLowerCase().includes(marker)) {
        throw new Error(`Tools data for ${tool.slug} contains a blocked marker: ${marker}`);
      }
    }
  }

  if (INSTANTLY.homepage !== "https://instantly.ai" || INSTANTLY.homepage.includes("?")) {
    throw new Error("Instantly must link to the bare homepage");
  }

  const categoryIds = TOOL_CATEGORIES.map((category) => category.id);
  const uniqueCategoryIds = new Set(categoryIds);
  if (uniqueCategoryIds.size !== categoryIds.length) {
    throw new Error("Duplicate tool category id");
  }

  for (const id of Object.keys(CATEGORY_RANKINGS) as ToolCategoryId[]) {
    if (!uniqueCategoryIds.has(id)) {
      throw new Error(`Missing category page data for ${id}`);
    }
  }

  for (const category of TOOL_CATEGORIES) {
    const ranked = CATEGORY_RANKINGS[category.id];
    const seen = new Set<string>();

    for (const slug of ranked) {
      if (!slugs.has(slug)) {
        throw new Error(`Unknown tool in ${category.id}: ${slug}`);
      }
      if (seen.has(slug)) {
        throw new Error(`Duplicate slug in ${category.id}: ${slug}`);
      }
      seen.add(slug);

      const tool = getToolBySlug(slug);
      const membership = [tool.category, ...tool.alsoIn];
      if (!membership.includes(category.id)) {
        throw new Error(`${slug} is ranked in ${category.id} without that category`);
      }
    }
  }

  for (const tool of TOOLS) {
    for (const categoryId of [tool.category, ...tool.alsoIn]) {
      const ranked: readonly string[] = CATEGORY_RANKINGS[categoryId];
      if (!ranked.includes(tool.slug)) {
        throw new Error(`${tool.slug} is missing from the ${categoryId} ranking`);
      }
    }
  }
}

export function getCategoryById(id: ToolCategoryId): ToolCategory {
  const category = TOOL_CATEGORIES.find((entry) => entry.id === id);
  if (!category) {
    throw new Error(`Unknown category: ${id}`);
  }
  return category;
}

export function getToolBySlug(slug: string): Tool {
  const tool = TOOLS.find((entry) => entry.slug === slug);
  if (!tool) {
    throw new Error(`Unknown tool: ${slug}`);
  }
  return tool;
}

export function getRankedTools(categoryId: ToolCategoryId): readonly Tool[] {
  return CATEGORY_RANKINGS[categoryId].map((slug) => getToolBySlug(slug));
}

export function categoriesFor(tool: Tool): ToolCategory[] {
  return [tool.category, ...tool.alsoIn].map((id) => getCategoryById(id));
}

assertPublicToolsData();
