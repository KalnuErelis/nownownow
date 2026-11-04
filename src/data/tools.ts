import { goPathForAffiliateUrl } from "@/data/affiliate-links";

/**
 * Public outbound tools directory.
 *
 * Ranking: reorder slugs in `CATEGORY_RANKINGS`. Earlier slugs rank higher.
 * Affiliate URLs are the public tracking links only. Do not add emails,
 * earnings, payout notes, or commission terms to this file.
 * Rendered CTAs use `outboundHref` (`/go/<slug>`), not `affiliateUrl`.
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
  | "email-verification"
  | "email-warmup"
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
  outboundHref: string;
  homepage: string;
  pricing?: string;
  notFor?: string;
  howItWorks?: string[];
  faq?: ToolFaq[];
  ctaNote?: string;
  firstPerson?: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export const TOOLS_INDEX = {
  title: "Tools",
  description:
    "A ranked directory of outbound tools for cold email, LinkedIn, email finding, infrastructure, email verification, warmup, and AI SDRs.",
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
  notFor?: string;
  howItWorks?: readonly string[];
  faq?: readonly ToolFaq[];
  ctaNote?: string;
  firstPerson?: string;
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
    outboundHref: goPathForAffiliateUrl(entry.affiliateUrl),
    homepage: entry.homepage,
    ...(entry.pricing ? { pricing: entry.pricing } : {}),
    ...(entry.notFor ? { notFor: entry.notFor } : {}),
    ...(entry.howItWorks ? { howItWorks: [...entry.howItWorks] } : {}),
    ...(entry.faq ? { faq: entry.faq.map((item) => ({ ...item })) } : {}),
    ...(entry.ctaNote ? { ctaNote: entry.ctaNote } : {}),
    ...(entry.firstPerson ? { firstPerson: entry.firstPerson } : {})
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
    description: `Best LinkedIn outreach and automation tools in ${DIRECTORY_YEAR}: Gojiberry, La Growth Machine, Waalaxy, Skylead, and SalesRobot, with who each one is for.`,
    intro:
      "Gojiberry is an AI agent that contacts people by email and social. La Growth Machine is the sequencer for LinkedIn, email, calls, and X on accounts you connect. Waalaxy is the low-cost way to start LinkedIn automation. Skylead and SalesRobot run LinkedIn and email sequences from the cloud. Every tool here acts on a LinkedIn account you connect, so the daily limits you set are your responsibility."
  }),
  defineCategory({
    id: "email-finders",
    label: "Email finders and enrichment",
    title: `Best email finders and data enrichment tools in ${DIRECTORY_YEAR}`,
    description: `Best email finders and data enrichment tools in ${DIRECTORY_YEAR}: FullEnrich, Findymail, Prospeo, Databar, Ocean.io, and Treg.`,
    intro:
      "Tools for finding emails and filling in account data before anyone sends. FullEnrich is first when one data vendor is not enough. Treg is the pick when an AI agent does the enrichment."
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
    id: "email-verification",
    label: "Email verification",
    title: `Best email verification tools in ${DIRECTORY_YEAR}`,
    description: `Best email verification and list cleaning tools in ${DIRECTORY_YEAR}: ZeroBounce, BounceBan, Truelist, Bouncify, and EmailListVerify, with prices from their own pages.`,
    intro:
      "Verifiers check a list before a sequencer sends to it, so invalid addresses do not cost you bounces. ZeroBounce is the broad default. BounceBan and Truelist are the picks when a B2B list is full of catch-all domains. Bouncify and EmailListVerify are the low-cost pay-as-you-go options. Prices below were read from each vendor's pricing page on 4 November 2026; accuracy figures are the vendors' own claims, not my tests."
  }),
  defineCategory({
    id: "email-warmup",
    label: "Email warmup",
    title: `Best email warmup tools in ${DIRECTORY_YEAR}`,
    description: `Best email warmup tools in ${DIRECTORY_YEAR}: Warmy, Mailreach, Mailivery, Warmbox, and Warmup Inbox, with how each one prices mailboxes.`,
    intro:
      "Warmup tools send and receive emails between your inbox and a network of other inboxes, so a new mailbox builds a sending history before cold campaigns start. Warmy is the most complete deliverability suite here. Mailreach is the focused warmup and spam-test tool. Mailivery prices by daily volume instead of per mailbox. Warmbox and Warmup Inbox are simple per-inbox plans. Many sequencers already include warmup, so check yours before paying for a second tool."
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
    name: "Treg",
    slug: "treg",
    category: "email-finders",
    summary:
      "Treg is a tool catalog for AI agents: one token gives an agent pay-per-call access to paid data and generation APIs.",
    bestFor: "Giving an AI agent paid data APIs without a subscription per provider.",
    audience:
      "People running GTM, sales, or SEO work with AI agents like Claude Code, and teams that want agents to use shared API keys without handing the keys out.",
    notFor:
      "People who do not work with AI agents and want a point-and-click enrichment app or a sequencer. Anyone who needs an SLA or uptime guarantee, since the hosted service is in early access. Teams that already pay for one data provider and only need that one.",
    firstPerson:
      "I use Treg daily for GTM and sales data work with AI agents. I tell the agent the job, such as finding a work email or pulling SERP data, and it finds the tool, checks the price, and calls it. I do not keep a separate subscription or API key for each provider.",
    howItWorks: [
      "Install the treg CLI for a local coding agent, or add the MCP connector (https://treg.to/mcp/) to a hosted assistant.",
      "Top up the prepaid team balance.",
      "The agent searches the catalog by the job, reads the price, and calls the tool.",
      "Optionally, register your own API keys, OAuth connections, CLIs, or skills so teammates and agents can use them without seeing the key."
    ],
    pros: [
      "One token covers 4,100+ API endpoints across 123 providers, from SERP data and backlinks to enrichment and media generation.",
      "The agent never holds provider API keys. Credentials are injected server-side, and every call is logged.",
      "Pay per call with the price shown first, and no provider signups or subscriptions.",
      "For jobs like finding or verifying an email, a routed tool picks the provider, falls back when one fails, and bills only the answer returned."
    ],
    cons: [
      "The hosted service is in early access, with no uptime promise in its terms.",
      "There is a prepaid balance to keep topped up.",
      "A found email is the provider's best match and still needs verifying before a send.",
      "It is a layer for AI agents, not a point-and-click app or a sequencer."
    ],
    affiliateUrl: "https://treg.to/?ref=jaunius-bpndr",
    homepage: "https://treg.to",
    pricing:
      "Pay per call from a prepaid team balance. The price is shown before each call, and Treg says it adds no markup. New verified accounts get $1.00 of free credit once. Calls on your own keys are not billed.",
    ctaNote:
      "Sign up through this link and you get $5 of Treg credit once your first top-up reaches $10.",
    faq: [
      {
        question: "What is Treg?",
        answer:
          "Treg is a tool catalog for AI agents, built by Superdesign. It describes itself as \"OpenRouter for agent tools\". One token gives an agent access to 4,100+ API endpoints across 123 providers."
      },
      {
        question: "Do I need my own API keys?",
        answer:
          "No. Treg injects provider credentials server-side, so there are no provider signups. You can still bring your own keys or OAuth connections, and calls on your own key are not billed."
      },
      {
        question: "How does pricing work?",
        answer:
          "You pay per call from a prepaid team balance. The agent sees the price before it calls, and Treg says it adds no markup. New verified accounts get $1.00 of free credit once."
      },
      {
        question: "Does it work with Claude Code, Cursor, or ChatGPT?",
        answer:
          "Local coding agents like Claude Code, Cursor, and Codex use the treg CLI. Hosted assistants connect through the MCP server at https://treg.to/mcp/, so ChatGPT works where it accepts an MCP connector."
      },
      {
        question: "Is it open source?",
        answer:
          "Yes. Treg is open source under Apache 2.0 plus additional terms, and it can be self-hosted."
      }
    ]
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
    alsoIn: ["email-warmup"],
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
    homepage: "https://warmy.io",
    pricing:
      "Pricing is volume-based: you pay for the number of warmup emails Warmy generates. There is a 7-day free trial with no credit card. Email verification and DMARC monitoring are listed as included in every plan (warmy.io pricing page, checked 4 November 2026)."
  },
  {
    name: "Mailreach",
    slug: "mailreach",
    category: "cold-email-infrastructure",
    alsoIn: ["email-warmup"],
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
    alsoIn: ["email-verification"],
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
    homepage: "https://www.zerobounce.net",
    pricing:
      "Pay as you go starts at $39 for 2,000 validations. The ZeroBounce ONE subscription starts at $99 per month. Every account gets 100 free validations a month, and unknown results cost no credits (zerobounce.net pricing page, checked 4 November 2026)."
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
  },
  {
    name: "BounceBan",
    slug: "bounceban",
    category: "email-verification",
    summary:
      "BounceBan is an email verifier built around catch-all addresses, which most verifiers return as unknown.",
    bestFor: "Verifying B2B lists with many catch-all domains.",
    audience:
      "Outbound teams whose lists come back from other verifiers with a large share of catch-all or unknown results.",
    pros: [
      "Verifies catch-all addresses without sending an email to them, according to BounceBan.",
      "Single checks in its free mode cost no credits.",
      "Unused credits roll over and do not expire. A Sync add-on can re-verify a CRM such as HubSpot."
    ],
    cons: [
      "The catch-all accuracy figures on its site are BounceBan's own claims.",
      "CRM Sync is a separate subscription from the credits.",
      "It verifies addresses. Finding new ones happens in another tool."
    ],
    affiliateUrl: "https://bounceban.com/?via=jaunius",
    homepage: "https://bounceban.com",
    pricing:
      "Credits are sold in packs from 10,000 to 1,000,000, with one credit per completed verification. Pack prices are shown on bounceban.com/pricing (checked 4 November 2026).",
    faq: [
      {
        question: "Does BounceBan send emails to verify an address?",
        answer:
          "No. Its pricing FAQ says it does not send messages to verify, including for catch-all addresses."
      }
    ]
  },
  {
    name: "Truelist",
    slug: "truelist",
    category: "email-verification",
    summary:
      "Truelist validates email lists and charges extra only on the catch-all addresses it actually resolves.",
    bestFor: "Pay-as-you-go validation with catch-all resolution.",
    audience:
      "Senders who want to start free, pay per list, and move to a flat unlimited plan once volume is steady.",
    pros: [
      "Free tier with 100 validations and no credit card.",
      "Standard checks cost 1 credit. Enhanced catch-all resolution costs 3 credits and runs only where the standard check returns unknown.",
      "Credits never expire, and the same credits work in bulk and through the API."
    ],
    cons: [
      "The unlimited plans need a 3, 6, or 12-month commitment billed upfront.",
      "Email finding and phone validation were marked coming soon when checked.",
      "Sending and warmup happen in other tools."
    ],
    affiliateUrl: "https://truelist.io?via=jaunius",
    homepage: "https://truelist.io",
    pricing:
      "Pay as you go is $1.40 per 1,000 credits up to 10,000, falling to $0.70 per 1,000 at up to 1 million. Unlimited starts at $799 per month on a 12-month commitment (truelist.io/pricing, checked 4 November 2026)."
  },
  {
    name: "Bouncify",
    slug: "bouncify",
    category: "email-verification",
    summary:
      "Bouncify is a bulk and real-time email verifier with pay-as-you-go credits that do not expire.",
    bestFor: "Cheap bulk list cleaning with credits that keep.",
    audience:
      "Marketers and small outbound teams who clean lists now and then and do not want a monthly subscription.",
    pros: [
      "100 free credits on signup, with no card required.",
      "Pay-as-you-go credits never expire, and bulk files and the API share one balance.",
      "Imports from HubSpot, Mailchimp, and Google Sheets, and lists can be deleted at any time."
    ],
    cons: [
      "Catch-all addresses are flagged rather than resolved.",
      "The 99%+ accuracy figure is Bouncify's own claim.",
      "It does not find new emails."
    ],
    affiliateUrl: "https://bouncify.io/?ref=e5mno",
    homepage: "https://bouncify.io",
    pricing:
      "Pay-as-you-go credits and monthly plans are both offered, billed in USD, EUR, or INR. Current pack prices are on bouncify.io (checked 4 November 2026)."
  },
  {
    name: "EmailListVerify",
    slug: "emaillistverify",
    category: "email-verification",
    summary:
      "EmailListVerify is a low-cost list verifier whose credits also work for its email finder.",
    bestFor: "Low per-address cost on one-off list cleans.",
    audience:
      "Budget-conscious senders who verify lists in batches and occasionally need to find an address.",
    pros: [
      "Low per-address price on pay-as-you-go credits, which do not expire.",
      "100 free verifications on signup.",
      "The same credits work for the email finder, at 5 credits per address found."
    ],
    cons: [
      "No catch-all resolution is described on its pricing page.",
      "The 97% accuracy figure is the vendor's own claim.",
      "The minimum purchase is 1,000 credits."
    ],
    affiliateUrl: "https://www.emaillistverify.com/?red=mbmaas",
    homepage: "https://www.emaillistverify.com",
    pricing:
      "10,000 pay-as-you-go credits were listed at €27 one-off, or €25 a month on a monthly plan (emaillistverify.com/pricing, checked 4 November 2026)."
  },
  {
    name: "Mailivery",
    slug: "mailivery",
    category: "email-warmup",
    summary:
      "Mailivery warms mailboxes through a peer-to-peer network and prices by total daily warmup volume, not per mailbox.",
    bestFor: "Warming many mailboxes on one shared daily volume.",
    audience:
      "Agencies and teams with lots of mailboxes who would pay too much on a per-inbox warmup plan.",
    pros: [
      "Unlimited mailboxes on every plan, within the plan's shared daily warmup volume.",
      "Plans bundle blacklist monitoring, email verification credits, and inbox placement tests.",
      "A REST API can connect mailboxes and start or pause warmup."
    ],
    cons: [
      "Each connected mailbox is capped at a daily warmup limit.",
      "The Starter plan caps the response rate on warmup emails at 30%.",
      "It warms and monitors. Campaigns run in your sequencer."
    ],
    affiliateUrl: "https://mailivery.io?fpr=j34i00",
    homepage: "https://mailivery.io",
    pricing:
      "Starter is $29 per month for 200 shared warmup emails a day across unlimited mailboxes, with a 7-day free trial. Yearly billing is listed as 25% cheaper (mailivery.io/pricing, checked 4 November 2026)."
  },
  {
    name: "Warmbox",
    slug: "warmbox",
    category: "email-warmup",
    summary:
      "Warmbox warms inboxes from Gmail, Outlook, and most other providers, with per-inbox plans.",
    bestFor: "Simple warmup for one to a few inboxes.",
    audience:
      "Founders and small sales teams warming a handful of inboxes across Google, Microsoft, or SMTP providers.",
    pros: [
      "Connects Gmail and Google Workspace, Microsoft 365, Zoho, SendGrid, Amazon SES, and any SMTP inbox.",
      "Includes spam score monitoring and a DNS and blacklist checker.",
      "Warmup schedule can be growth, flat, random, or fully custom."
    ],
    cons: [
      "Pricing is per inbox, which adds up across many mailboxes.",
      "Warmbox itself says first results usually take 15 to 30 days of uninterrupted warming.",
      "It does not verify lists or run campaigns."
    ],
    affiliateUrl: "https://warmbox.ai?fpr=jaunius-ff54a6",
    homepage: "https://warmbox.ai",
    pricing:
      "Solo is $19 per month for one inbox, or $15 per month billed yearly. Start-up covers 3 inboxes at $79 per month (warmbox.ai/pricing, checked 4 November 2026)."
  },
  {
    name: "Warmup Inbox",
    slug: "warmup-inbox",
    category: "email-warmup",
    summary:
      "Warmup Inbox warms mailboxes with AI-written messages across a network of real inboxes, priced per inbox.",
    bestFor: "Per-inbox warmup with spam and category monitoring.",
    audience: "Senders warming a small number of inboxes who want a dashboard and an API.",
    pros: [
      "Spam and category monitoring plus an email reputation check.",
      "Human-like AI-generated warmup content.",
      "Developer API on the Basic plan."
    ],
    cons: [
      "Priced per inbox, so larger fleets get expensive.",
      "The listed Basic price is on yearly billing.",
      "It is not a list verifier."
    ],
    affiliateUrl: "https://www.warmupinbox.com/?refby=4f2ec7cb131d73d9",
    homepage: "https://www.warmupinbox.com",
    pricing:
      "Basic is listed at $15 per inbox per month, billed yearly at $180, with 75 warmup messages a day and a free trial (warmupinbox.com/pricing, checked 4 November 2026)."
  },
  {
    name: "Waalaxy",
    slug: "waalaxy",
    category: "linkedin-outreach",
    summary:
      "Waalaxy automates LinkedIn invitations and follow-up messages, with cold email on its higher plan.",
    bestFor: "Starting LinkedIn automation on a small budget.",
    audience:
      "Founders, freelancers, and small teams running their first LinkedIn prospecting campaigns.",
    pros: [
      "Pre-built sequences and automated LinkedIn follow-ups on every plan.",
      "Imports leads from LinkedIn search, Sales Navigator, Recruiter Lite, or CSV.",
      "The Business plan adds cold email sequences and 500 email finder credits a month."
    ],
    cons: [
      "The entry plan is capped at 300 invitations a month.",
      "The LinkedIn conversation inbox is a paid add-on at €20 a month.",
      "API access and Make, Zapier, and n8n modules start on the Advanced plan."
    ],
    affiliateUrl: "https://waal.ink/9LXYki",
    homepage: "https://www.waalaxy.com",
    pricing:
      "Pro starts at €19 per user per month for 300 invitations a month; the price depends on monthly, quarterly, or yearly billing (waalaxy.com/pricing, checked 4 November 2026)."
  },
  {
    name: "Skylead",
    slug: "skylead",
    category: "linkedin-outreach",
    summary:
      "Skylead runs LinkedIn and email sequences from the cloud, with email finding, verification, and warmup included.",
    bestFor: "LinkedIn plus email sequences in one seat, with no extra email tools.",
    audience:
      "Agencies and sales teams that want LinkedIn and cold email in the same sequence without buying a separate finder or warmup tool.",
    pros: [
      "Unlimited email accounts, email warmup, and an email finder and verifier come with the seat.",
      "Smart sequences branch between LinkedIn and email steps.",
      "Agency plan adds a client dashboard, shared inbox, and white-label options."
    ],
    cons: [
      "Priced per seat, which is more than an entry-level LinkedIn tool.",
      "AI SDR and AI data enrichment are listed as add-ons.",
      "Domains and mailboxes still come from your provider."
    ],
    affiliateUrl: "https://dash.skylead.io?fpr=jaunius",
    homepage: "https://skylead.io",
    pricing:
      "All-in-one is $100 per seat per month, with a 7-day free trial. Agency is $999 a month for 25 seats (skylead.io/pricing, checked 4 November 2026)."
  },
  {
    name: "SalesRobot",
    slug: "salesrobot",
    category: "linkedin-outreach",
    summary:
      "SalesRobot is a cloud LinkedIn and email automation tool with voice and video messages and an AI reply assistant.",
    bestFor: "Cloud LinkedIn sequences priced per LinkedIn account.",
    audience:
      "Agencies and B2B teams running outreach across several LinkedIn accounts who want a cloud tool that does not need a browser open.",
    pros: [
      "Cloud-based, so campaigns run without your browser open.",
      "Works with a free LinkedIn account; Premium is not required.",
      "Sequences can mix LinkedIn steps, email, voice notes, and video messages."
    ],
    cons: [
      "The Basic plan allows one active campaign and lower daily limits.",
      "Pricing is per LinkedIn account, so many accounts add up.",
      "Claims on its site about account safety are the vendor's own."
    ],
    affiliateUrl: "https://app.salesrobot.co/register?fpr=jaunius-4890b7",
    homepage: "https://www.salesrobot.co",
    pricing:
      "Basic is $59 per LinkedIn account per month, or $39 billed annually. Advanced is $79 per month, or $59 billed annually (salesrobot.co/pricing, checked 4 November 2026)."
  }
];

export const TOOLS: readonly Tool[] = TOOL_INPUTS.map((entry) => defineTool(entry));

/**
 * Earlier slugs rank higher. Keep this list in sync with each tool's
 * `category` and `alsoIn` fields.
 */
export const CATEGORY_RANKINGS = {
  "cold-email": ["lemlist", "smartlead", "reply", "saleshandy"],
  "linkedin-outreach": ["gojiberry", "la-growth-machine", "waalaxy", "skylead", "salesrobot"],
  "email-finders": ["fullenrich", "findymail", "prospeo", "databar", "ocean", "treg"],
  "cold-email-infrastructure": [
    "zapmail",
    "mailforge",
    "infraforge",
    "warmy",
    "mailreach",
    "zerobounce"
  ],
  "email-verification": ["zerobounce", "bounceban", "truelist", "bouncify", "emaillistverify"],
  "email-warmup": ["warmy", "mailreach", "mailivery", "warmbox", "warmup-inbox"],
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
    if (tool.outboundHref !== goPathForAffiliateUrl(tool.affiliateUrl) || !tool.outboundHref.startsWith("/go/")) {
      throw new Error(`Affiliate CTA for ${tool.slug} must use /go/`);
    }

    const publicText = [
      tool.name,
      tool.summary,
      tool.bestFor,
      tool.audience,
      tool.pricing ?? "",
      tool.notFor ?? "",
      tool.firstPerson ?? "",
      tool.ctaNote ?? "",
      tool.affiliateUrl,
      tool.homepage,
      ...tool.pros,
      ...tool.cons,
      ...(tool.howItWorks ?? []),
      ...(tool.faq ?? []).flatMap((item) => [item.question, item.answer])
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
