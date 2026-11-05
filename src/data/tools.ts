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
  | "cold-email-inbox"
  | "email-verification"
  | "email-warmup"
  | "ai-sdr"
  | "website-visitor-identification"
  | "lemlist-alternatives"
  | "seo-aeo"
  | "ai-meeting-notetakers";

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
    "A ranked directory of outbound tools for cold email, LinkedIn, email finding, infrastructure, cold email inbox providers, email verification, warmup, AI SDRs, website visitor identification, lemlist alternatives, SEO and AEO tools, and AI meeting notetakers.",
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
    id: "cold-email-inbox",
    label: "Cold email inboxes",
    title: `Best cold email inbox providers in ${DIRECTORY_YEAR}`,
    description: `Best cold email inbox providers in ${DIRECTORY_YEAR}: Zapmail, Mailforge, Infraforge, Mailpool, Inframail, IceMail, and Winnr, ranked for domains and mailboxes.`,
    intro:
      "Providers that sell the domains and mailboxes cold email sends from, either Google Workspace and Microsoft 365 seats or cold-email SMTP inboxes. Zapmail is first for Google and Microsoft mailboxes with DNS handled. Mailforge and Infraforge are the shared and dedicated-IP Forge options. Mailpool sells its own inboxes next to Google and Microsoft at per-inbox prices. Inframail is the flat-price unlimited-inbox plan. IceMail and Winnr are the low per-mailbox options. None of these run the sequence, and warmup and list cleaning have their own lists: see the email warmup and email verification pages. Prices below were read from each vendor's site on 5 November 2026."
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
  }),
  defineCategory({
    id: "website-visitor-identification",
    label: "Website visitor identification",
    title: `Best website visitor identification tools in ${DIRECTORY_YEAR}`,
    description: `Best website visitor identification tools in ${DIRECTORY_YEAR}: RB2B and Happierleads, with who each one is for and prices from their own pages.`,
    intro:
      "Tools that turn anonymous B2B site traffic into named companies or people you can contact. RB2B is the free-to-start pick for US person-level IDs pushed to Slack. Happierleads is the pay-per-identified-visitor option with person-level ID outside the US. Prices below were read from each vendor's pricing page on 5 November 2026; match-rate figures are the vendors' own claims, not my tests."
  }),
  defineCategory({
    id: "lemlist-alternatives",
    label: "lemlist alternatives",
    title: `Best lemlist alternatives in ${DIRECTORY_YEAR}`,
    description: `Best lemlist alternatives in ${DIRECTORY_YEAR}: Smartlead, Salesforge, Reply, Saleshandy, ReachInbox, SalesBlink, SmartReach, Emelia, Klenty, and Emailchaser, with prices from their own pages.`,
    intro:
      "Cold email and sales engagement sequencers people compare when they look past lemlist. Smartlead is first for cold email across many mailboxes. Salesforge adds an optional AI SDR. Reply and Klenty are the broader sales engagement platforms. Saleshandy, ReachInbox, SalesBlink, and Emailchaser are focused cold email tools with warmup included. SmartReach prices by active prospects instead of seats. Emelia keeps email and LinkedIn on flat plans. Instantly is left off because this list only links to tools with an active affiliate program. None of these sell the mailboxes themselves; see the cold email inbox list for that, and the email warmup and email verification lists for those jobs. The cold email page is the shorter core list, and the AI SDR page covers agents that run outreach for you. Prices below were read from each vendor's site on 5 November 2026."
  }),
  defineCategory({
    id: "seo-aeo",
    label: "SEO and AEO",
    title: `Best SEO and AEO tools in ${DIRECTORY_YEAR}`,
    description: `Best SEO and AEO tools in ${DIRECTORY_YEAR}: Outrank, AIclicks, Clearscope, ChatSEO, LowFruits, and KeySearch, with who each one is for and prices from their own pages.`,
    intro:
      "Ranked tools for organic search and AI-answer visibility (AEO/GEO). Outrank is first for autopilot articles and backlinks. AIclicks tracks brand mentions across ChatGPT and other AI engines. Clearscope optimizes drafts for Google and AI search. ChatSEO is the chat-based SEO agent wired to Search Console. LowFruits and KeySearch are the keyword-research picks when you want weak SERPs or a low monthly price. Ahrefs and Semrush are left off because this list only links to tools with an active affiliate program on this site. Prices below were read from each vendor's site on 5 November 2026."
  }),
  defineCategory({
    id: "ai-meeting-notetakers",
    label: "AI meeting notetakers",
    title: `Best AI meeting notetakers in ${DIRECTORY_YEAR}`,
    description: `Best AI meeting notetakers in ${DIRECTORY_YEAR}: Fireflies, Noota, Leexi, and Bluedot, with who each one is for and prices from their own pages.`,
    intro:
      "Tools that join or record sales and team calls, then turn them into transcripts, summaries, and CRM follow-up. Fireflies is first for a free plan and broad meeting-bot coverage. Noota is the EU-hosted pick with invisible (no-bot) recording on paid plans. Leexi is the European sales suite with CRM and VoIP sync on Business. Bluedot is the Chrome-extension recorder with MCP on every paid plan. Otter, Gong, and Grain are left off because this list only links to tools with an active affiliate program on this site. Prices below were read from each vendor's site on 5 November 2026."
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
    alsoIn: ["lemlist-alternatives"],
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
    alsoIn: ["lemlist-alternatives"],
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
    alsoIn: ["lemlist-alternatives"],
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
    alsoIn: ["cold-email-inbox"],
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
    alsoIn: ["cold-email-inbox"],
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
    alsoIn: ["cold-email-inbox"],
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
    name: "Mailpool",
    slug: "mailpool",
    category: "cold-email-inbox",
    summary:
      "Mailpool sells cold-email inboxes from three sources in one account: its own Mailpool inboxes, Google Workspace, and Microsoft 365.",
    bestFor: "Mixing Google, Microsoft, and lower-cost inboxes under one provider.",
    audience:
      "Senders and agencies who want to split volume across inbox types without managing three vendors.",
    pros: [
      "Mailpool, Google Workspace, and Microsoft 365 inboxes are sold side by side.",
      "Pricing is per inbox, with a lower rate on annual billing.",
      "Dedicated IP servers are available when shared sending is not enough."
    ],
    cons: [
      "Microsoft 365 inboxes cost more per seat than the Mailpool or Google options.",
      "A dedicated IP is priced per server, which only pays off at volume.",
      "The sequence still runs in a separate sending tool."
    ],
    affiliateUrl: "https://mailpool.ai?fpr=jaunius-bd95d6",
    homepage: "https://mailpool.ai",
    pricing:
      "Mailpool inboxes are $3/inbox/mo ($2.60 billed annually). Google Workspace is $4/inbox/mo ($3.40 billed annually). Microsoft 365 is $5/inbox/mo. A dedicated IP is $200/server/mo (mailpool.ai/pricing, checked 5 November 2026)."
  },
  {
    name: "Inframail",
    slug: "inframail",
    category: "cold-email-inbox",
    summary:
      "Inframail sells cold-email inboxes on flat monthly plans with unlimited inboxes, and sets them up for you.",
    bestFor: "High inbox counts at a flat monthly price.",
    audience:
      "Agencies and high-volume senders whose per-inbox bill has grown past what a flat plan costs.",
    pros: [
      "The Unlimited Plan covers unlimited inboxes for one monthly price.",
      "Setup is done for you.",
      "An Agency Pack exists for teams running many client domains."
    ],
    cons: [
      "A flat plan costs more than per-inbox pricing until you run enough inboxes.",
      "It supplies inboxes. Warmup and list cleaning are separate jobs.",
      "The sequence still runs in a separate sending tool."
    ],
    affiliateUrl: "https://inframail.io?via=jaunius",
    homepage: "https://inframail.io",
    pricing:
      "The Unlimited Plan is $147/mo for unlimited inboxes. The Agency Pack is $387/mo. Its homepage compares this with Google Workspace or Microsoft at about $3/inbox, using $600/mo examples (inframail.io, checked 5 November 2026).",
    faq: [
      {
        question: "When does Inframail's unlimited plan make sense?",
        answer:
          "When per-inbox pricing elsewhere would pass $147 a month. At about $3 per inbox, that is roughly 50 inboxes."
      }
    ]
  },
  {
    name: "IceMail",
    slug: "icemail",
    category: "cold-email-inbox",
    summary:
      "IceMail sells cold-email mailboxes and domains at a low per-mailbox price, and its site says there is no lock-in subscription.",
    bestFor: "Low per-mailbox cost without a long commitment.",
    audience:
      "Smaller senders and testers who want a handful of mailboxes cheaply and may not keep them for long.",
    pros: [
      "Mailboxes start at $2.5 per month.",
      "Domains are sold alongside the mailboxes.",
      "The site positions it as no lock-in, so you can stop when a test ends."
    ],
    cons: [
      "Several price tiers sit above the entry price, so check which mailbox type you are buying.",
      "It supplies inboxes. Warmup and list cleaning are separate jobs.",
      "The sequence still runs in a separate sending tool."
    ],
    affiliateUrl: "https://icemail.ai/?ref=jaunius",
    homepage: "https://icemail.ai",
    pricing:
      "Mailboxes start at $2.5/mailbox/month, with $3.9 and $5+ per mailbox tiers also listed. Domain deals start around $3.5/mo (icemail.ai, checked 5 November 2026)."
  },
  {
    name: "Winnr",
    slug: "winnr",
    category: "cold-email-inbox",
    summary:
      "Winnr sells cold-email inboxes in packs, with an API for managing them and warming as a paid add-on.",
    bestFor: "Inbox packs managed through an API.",
    audience:
      "Technical teams and agencies that want to create and manage inboxes from their own tooling.",
    pros: [
      "Startup and Enterprise packs bundle 50 or 200 inboxes for one monthly price.",
      "An API lets you manage inboxes from your own systems.",
      "Extra accounts cost $1 a month on top of a pack."
    ],
    cons: [
      "Warming is billed per mailbox, so the real cost is above the pack price.",
      "Packs make sense at 50 inboxes or more. A few inboxes are cheaper elsewhere.",
      "The sequence still runs in a separate sending tool."
    ],
    affiliateUrl: "https://winnr.app/?ref=WIN-F53F",
    homepage: "https://winnr.app",
    pricing:
      "Startup is $69/mo for 50 inboxes. Enterprise is $189/mo for 200 inboxes. Extra accounts are $1/month, and warming is $0.60 per mailbox (winnr.app/pricing, checked 5 November 2026)."
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
    alsoIn: ["lemlist-alternatives"],
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
  },
  {
    name: "RB2B",
    slug: "rb2b",
    category: "website-visitor-identification",
    summary:
      "RB2B identifies companies and people who visit your website and can push LinkedIn profiles or emails into Slack, a CRM, or a webhook.",
    bestFor: "US B2B sites that want a free plan and person-level IDs in Slack.",
    audience:
      "Outbound and demand-gen teams whose traffic is mostly US and who want identified visitors in Slack or a CRM without buying an enterprise forensics contract.",
    pros: [
      "A free plan covers company-level ID with 150 monthly resolutions, and a 7-day full-featured trial needs no card.",
      "Starter pushes LinkedIn URLs to Slack or Teams. Pro adds business emails and integrations such as HubSpot, Salesforce, Clay, Zapier, and webhooks.",
      "Setup is a pixel. Identified visitors can start arriving the same day."
    ],
    cons: [
      "Contact-level (person) ID is US only. Company-level ID is global.",
      "Vendor coverage claims sit around 15–20% on standard plans and 35–45% on Pro+ Premium Resolution.",
      "It identifies visitors. Writing and sending the outreach still happens in another tool."
    ],
    affiliateUrl: "https://www.rb2b.com/?ref=jaunius",
    homepage: "https://www.rb2b.com",
    pricing:
      "Free is $0 for company-level ID (150 resolutions/mo). Starter is $79/mo. Pro starts at $149/mo. Pro+ starts at $199/mo (rb2b.com/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Does RB2B identify visitors outside the United States?",
        answer:
          "Company-level ID is global on every plan. Person-level contact ID is US only, per RB2B's pricing FAQ."
      },
      {
        question: "Is there a free RB2B plan?",
        answer:
          "Yes. The free plan includes company-level ID and 150 monthly resolutions, and every account gets a 7-day full-featured trial with no credit card."
      }
    ]
  },
  {
    name: "Happierleads",
    slug: "happierleads",
    category: "website-visitor-identification",
    summary:
      "Happierleads identifies website visitors at the person level, with work email and LinkedIn, and charges per identified visitor rather than per seat.",
    bestFor: "Teams that need person-level IDs outside the US and want pay-per-lead pricing.",
    audience:
      "B2B sites with international traffic that want name, work email, and LinkedIn for people on the site, and that prefer usage-based pricing over a forensics seat contract.",
    pros: [
      "Person-level ID across 174+ countries, not only the US, according to Happierleads.",
      "You pay per identified visitor. Plans start at $99/mo for 300 leads, with a 7-day free trial and no seat fees.",
      "Exclusion filters can drop industries, countries, and company sizes you do not sell to, so those visits are not billed as leads."
    ],
    cons: [
      "Match-rate claims (40–80%) are Happierleads' own figures, not an independent audit.",
      "Optional LinkedIn verification and email waterfall add per-lead cost on top of the base plan.",
      "The product also bundles prospecting and intent features. Teams that only want a pixel may pay for more surface area than they use."
    ],
    affiliateUrl: "https://happierleads.com?utm_campaign=QF2hiNZTN9Qz",
    homepage: "https://happierleads.com",
    pricing:
      "Plans start at $99/mo for 300 identified visitors (~$0.33 per lead). Volume lowers the per-lead rate; annual billing takes 30% off (happierleads.com/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Does Happierleads identify people or only companies?",
        answer:
          "Both. Its pricing page says it returns name, verified work email, LinkedIn, and job title for the individual visitor, plus company details, across 174+ countries."
      },
      {
        question: "How does Happierleads pricing work?",
        answer:
          "You buy a monthly pool of identified-visitor credits. Entry is $99/mo for 300 leads. Unused credits can also be spent in its prospector. There is a 7-day free trial with no credit card."
      }
    ]
  },
  {
    name: "ReachInbox",
    slug: "reachinbox",
    category: "lemlist-alternatives",
    summary:
      "ReachInbox is a cold email sequencer with unlimited email accounts on paid plans, built-in AI warmup, and AI reply features.",
    bestFor: "High-volume cold email with many mailboxes and AI assist.",
    audience:
      "Senders running many mailboxes who want warmup and AI help with replies inside the sequencer.",
    pros: [
      "Paid plans connect unlimited email accounts, so adding mailboxes does not add seats.",
      "Warmup is built in, so a second warmup tool is optional.",
      "A free plan with 3 accounts and 250 emails a month lets you test it first."
    ],
    cons: [
      "Plans are capped by active leads and monthly emails, so check both limits.",
      "The listed monthly prices are for yearly billing.",
      "Mailboxes and domains still come from an inbox provider."
    ],
    affiliateUrl: "https://www.reachinbox.ai/?via=jaunius",
    homepage: "https://www.reachinbox.ai",
    pricing:
      "Free is $0 (3 accounts, 250 emails/mo). Starter is $30/mo billed yearly (2,000 active leads, 10,000 emails/mo). Growth is $75/mo billed yearly (50,000 leads, 250,000 emails). Pro is $225/mo billed yearly. Enterprise starts at $999/mo (reachinbox.ai/pricing, checked 5 November 2026)."
  },
  {
    name: "SalesBlink",
    slug: "salesblink",
    category: "lemlist-alternatives",
    summary:
      "SalesBlink is an AI-powered cold email outreach tool with unlimited email accounts, unlimited warmup, and an MCP server for AI agents.",
    bestFor: "Teams that want AI sequences and agent/MCP access from day one.",
    audience:
      "Small teams that want AI-written sequences and plan to run outreach from an AI agent as well as the app.",
    pros: [
      "Unlimited email accounts and warmup are included.",
      "An MCP server lets AI agents work with campaigns.",
      "A 14-day free trial needs no card."
    ],
    cons: [
      "Starter caps sending at 10,000 emails a month.",
      "Growth is limited to 3 team members; more users means Business.",
      "Mailboxes and domains still come from an inbox provider."
    ],
    affiliateUrl: "https://salesblink.io?aff=uYoCKxZXXTO5",
    homepage: "https://salesblink.io",
    pricing:
      "Starter is $25/mo billed yearly ($29 monthly) for up to 10,000 emails. Growth is $79/mo billed yearly ($99 monthly) with unlimited emails and up to 3 team members. Business is $179/mo billed yearly ($199 monthly) with unlimited team members. 14-day free trial, no card (salesblink.io/pricing, checked 5 November 2026)."
  },
  {
    name: "SmartReach",
    slug: "smartreach",
    category: "lemlist-alternatives",
    summary:
      "SmartReach is a cold email and sales engagement platform priced by active prospects, not seats, with optional LinkedIn, calling, and WhatsApp.",
    bestFor: "Teams that want no per-seat pricing and multichannel options beyond email.",
    audience:
      "Growing sales teams that add users often and may want calls, LinkedIn, or WhatsApp next to email.",
    pros: [
      "Pricing is by active prospects, and plans above Basic have unlimited users.",
      "LinkedIn, calling, and WhatsApp are available on Sales Engagement plans.",
      "The Email Outreach plans keep a cold-email-only option cheaper."
    ],
    cons: [
      "Basic covers 1,000 active prospects, so list size moves you up plans fast.",
      "Email Outreach and Sales Engagement are separate plan lines, which takes a moment to compare.",
      "Mailboxes and domains still come from an inbox provider."
    ],
    affiliateUrl: "https://smartreach.io?fpr=jaunius-a83fee",
    homepage: "https://www.smartreach.io",
    pricing:
      "Email Outreach Basic is $29/mo (1,000 active prospects, 10,000 emails). Plus is $89/mo. Pro is $199/mo. Scale is $499/mo. Sales Engagement plans start at $39/mo. No per-seat pricing; unlimited users above Basic (smartreach.io/pricing, checked 5 November 2026)."
  },
  {
    name: "Emelia",
    slug: "emelia",
    category: "lemlist-alternatives",
    summary:
      "Emelia runs cold email and LinkedIn outreach with unlimited sending on flat plans, plus optional enrichment credits.",
    bestFor: "Flat-price email + LinkedIn sequences without paying per email sent.",
    audience:
      "Small teams and agencies that want email and LinkedIn steps together, the job lemlist is often picked for, at a flat price.",
    pros: [
      "Email sending is unlimited on every plan.",
      "Start covers up to 50 mailboxes and 3 LinkedIn accounts.",
      "A 7-day free trial needs no card."
    ],
    cons: [
      "Enrichment is paid separately in credits.",
      "LinkedIn steps run from the LinkedIn account you connect, so the limits you set are your responsibility.",
      "Mailboxes and domains still come from an inbox provider."
    ],
    affiliateUrl: "https://emelia.io/?_by=jaunius",
    homepage: "https://emelia.io",
    pricing:
      "Start is $37/mo ($31/mo yearly) for up to 50 mailboxes and up to 3 LinkedIn accounts. Grow is $97/mo. Scale is $297/mo. Email sending is unlimited; enrichment uses optional credits. 7-day free trial, no card (emelia.io/pricing, checked 5 November 2026)."
  },
  {
    name: "Klenty",
    slug: "klenty",
    category: "lemlist-alternatives",
    summary:
      "Klenty is a sales engagement platform for email cadences, with a dialer and CRM sync on higher plans.",
    bestFor: "SDR teams that want sales engagement email plus optional calling/CRM.",
    audience:
      "SDR teams that work from a CRM and want email cadences first, with calling added later.",
    pros: [
      "Starter includes unlimited users and mailboxes.",
      "Dialer add-ons put calls in the same cadence.",
      "CRM sync is available on higher plans."
    ],
    cons: [
      "The dialer is a per-user add-on, so calling raises the bill per rep.",
      "The listed prices are for annual billing.",
      "Mailbox rotation at high volume is a closer fit for Smartlead or ReachInbox."
    ],
    affiliateUrl: "http://klenty.com?fpr=jaunius-62132f",
    homepage: "https://www.klenty.com",
    pricing:
      "Starter is $50/mo billed annually (15,000 monthly contacts, unlimited users and mailboxes on that plan). Growth is $70/mo billed annually. Dialer add-ons start at about $45/user/mo. 14-day free trial (klenty.com/pricing, checked 5 November 2026)."
  },
  {
    name: "Emailchaser",
    slug: "emailchaser",
    category: "lemlist-alternatives",
    summary:
      "Emailchaser is a cold email platform with unlimited email accounts, built-in warmup, lead finder credits, and discounts for switching from Instantly, Smartlead, or lemlist.",
    bestFor: "Switchers from Instantly or similar sequencers who want flat plans with unlimited accounts.",
    audience:
      "Senders leaving another sequencer who want unlimited accounts, warmup, and some lead data in one plan.",
    pros: [
      "Unlimited email accounts and warmup are included.",
      "Lead finder credits come with the plan.",
      "Annual billing costs 10 months' price, and there is a 7-day free trial."
    ],
    cons: [
      "Starter allows 5,000 emails and 1,000 contacts a month.",
      "The jump from Pro to Max is large.",
      "Mailboxes and domains still come from an inbox provider."
    ],
    affiliateUrl: "https://www.emailchaser.com/?ref=jaunius",
    homepage: "https://www.emailchaser.com",
    pricing:
      "Starter is $47/mo (5,000 emails, 1,000 contacts). Pro is $97/mo (125,000 emails). Max is $358/mo. Enterprise is $897/mo. Annual billing is 10 months' price. 7-day free trial (emailchaser.com/pricing, checked 5 November 2026)."
  },
  {
    name: "Outrank",
    slug: "outrank",
    category: "seo-aeo",
    summary:
      "Outrank researches keywords, writes and publishes SEO articles on a schedule, and builds backlinks, with the aim of ranking on Google and getting cited in AI answers.",
    bestFor: "Founders who want a blog that grows without writing it themselves.",
    audience:
      "Founders and small teams who know organic search matters but will not write or commission articles every week.",
    pros: [
      "One plan covers keyword research, 30 articles a month, and automated backlinks.",
      "Articles are published on a schedule, so the blog keeps moving without someone pushing it.",
      "Annual billing is $999 a year, against $1,188 for twelve monthly payments."
    ],
    cons: [
      "Autopilot articles still need someone to check facts, product claims, and tone before they represent you.",
      "There is one main plan. More than 30 articles a month is a paid add-on.",
      "Teams that already write their own content get more from an optimizer like Clearscope."
    ],
    affiliateUrl: "https://outrank.so/?via=jaunius",
    homepage: "https://outrank.so",
    pricing:
      "Organic Growth Plan is $99/mo or $999/year: 30 SEO articles/mo, automated keyword research, and automated backlinks. Add-ons are 60 articles/mo for +$85 or 90 articles/mo for +$160 (outrank.so/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "What does the Outrank plan include?",
        answer:
          "The Organic Growth Plan includes 30 SEO articles a month, automated keyword research, and automated backlinks for $99/mo or $999/year. More articles are sold as add-ons."
      }
    ]
  },
  {
    name: "AIclicks",
    slug: "aiclicks",
    category: "seo-aeo",
    summary:
      "AIclicks tracks how often your brand is mentioned in answers from ChatGPT, Perplexity, Gemini, Google AI Overviews, and other AI engines, and suggests what to change to show up more.",
    bestFor: "Measuring and improving brand visibility in AI answers (AEO/GEO).",
    audience:
      "Marketing teams and founders who want to know whether AI assistants recommend them, and which prompts competitors win.",
    pros: [
      "Tracks the prompts you choose across several AI platforms in one dashboard.",
      "Gives action recommendations, not only a mention count.",
      "A 3-day free trial lets you check your brand before paying."
    ],
    cons: [
      "Plans are capped by tracked prompts and AI platforms. Starter covers 30 prompts on 3 platforms.",
      "It measures and advises. Writing the content and earning the citations still happens elsewhere.",
      "AI answers change between runs, so treat single results as samples, not rankings."
    ],
    affiliateUrl: "https://aiclicks.io?via=jaunius",
    homepage: "https://aiclicks.io",
    pricing:
      "Starter is $59/mo (30 prompts, 3 AI platforms). Pro is $189/mo (150 prompts, 4 platforms). Business is $499/mo (300+ prompts, 6 platforms). 3-day free trial (aiclicks.io/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Which AI engines does AIclicks track?",
        answer:
          "AIclicks tracks brand mentions in AI answers such as ChatGPT, Perplexity, Gemini, and Google AI Overviews. The number of platforms depends on the plan: 3 on Starter, 4 on Pro, and 6 on Business."
      },
      {
        question: "Is there a free AIclicks trial?",
        answer: "Yes. AIclicks offers a 3-day free trial."
      }
    ]
  },
  {
    name: "Clearscope",
    slug: "clearscope",
    category: "seo-aeo",
    summary:
      "Clearscope grades drafts against what ranks for a query, so writers cover the topic fully, and tracks how pages show up in Google and AI search.",
    bestFor: "Content teams already writing who want each article to rank and get cited.",
    audience:
      "In-house content teams and agencies that publish regularly and want a shared standard for what a finished article covers.",
    pros: [
      "Content grades give writers a clear target before an article ships.",
      "Tracks queries and pages for both Google and AI search visibility.",
      "Monthly plans have no contract, and there is a 14-day free trial."
    ],
    cons: [
      "It does not write or publish for you. Someone still has to do the writing.",
      "Essentials covers 50 tracked queries and 50 pages, which a busy blog outgrows.",
      "Pricier than keyword tools if research is the only job."
    ],
    affiliateUrl: "https://www.clearscope.io?via=jaunius",
    homepage: "https://www.clearscope.io",
    pricing:
      "Essentials is $129/mo (50 tracked queries, 50 pages). Business is $399/mo (300 tracked queries, 300 pages). Enterprise is custom. 14-day free trial; no contracts on monthly plans (clearscope.io/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Does Clearscope write content?",
        answer:
          "No. Clearscope grades and guides drafts that your team writes, and tracks how pages perform in Google and AI search. For done-for-you articles, Outrank is the closer fit."
      }
    ]
  },
  {
    name: "ChatSEO",
    slug: "chatseo",
    category: "seo-aeo",
    summary:
      "ChatSEO is an SEO agent you talk to in chat. It connects to Search Console, Analytics, and your CMS, and has an MCP server for Claude and Cursor.",
    bestFor: "Asking SEO questions about your own site data in a chat instead of dashboards.",
    audience:
      "Founders and marketers who have Search Console data but no SEO specialist, and people who already work in Claude or Cursor.",
    pros: [
      "Answers come from your own Search Console and Analytics data, not generic advice.",
      "The MCP server puts the same agent inside Claude or Cursor.",
      "A 7-day trial includes 30 credits."
    ],
    cons: [
      "Credits are per message (1 credit = 1 message), so long sessions use the plan quickly.",
      "Prices are shown in EUR excluding VAT.",
      "It advises and drafts. Backlinks and a full rank tracker are not the focus."
    ],
    affiliateUrl: "https://chatseo.app/?ref=jaunius",
    homepage: "https://chatseo.app",
    pricing:
      "Starter is from €29/mo (100 credits). Pro is from €49/mo. Ranker is from €79/mo. Annual billing takes 20% off. 1 credit = 1 message. 7-day trial with 30 credits. Prices exclude VAT; USD amounts are the same (chatseo.app/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "How do ChatSEO credits work?",
        answer:
          "One credit is one message to the agent. Starter includes 100 credits a month, and the 7-day trial includes 30."
      },
      {
        question: "Can I use ChatSEO from Claude or Cursor?",
        answer: "Yes. ChatSEO offers an MCP server so Claude and Cursor can call it directly."
      }
    ]
  },
  {
    name: "LowFruits",
    slug: "lowfruits",
    category: "seo-aeo",
    summary:
      "LowFruits analyzes search results in bulk to find keywords where weak or low-authority sites already rank, and pulls long-tail ideas from Google autocomplete.",
    bestFor: "Finding long-tail keywords a newer site can actually rank for.",
    audience:
      "Bloggers, niche site owners, and early-stage startups with low domain authority who need keywords they can win.",
    pros: [
      "Bulk SERP analysis flags results where weak or low-DA sites rank.",
      "Long-tail ideas come from Google autocomplete, so they match how people search.",
      "Pay-as-you-go credits mean you do not need a subscription for occasional research."
    ],
    cons: [
      "Pay-as-you-go credits expire after 1 year.",
      "It is a keyword research tool. Writing and tracking happen elsewhere.",
      "The 14-day money-back only applies if you used fewer than 100 credits."
    ],
    affiliateUrl: "https://lowfruits.io?via=jaunius",
    homepage: "https://lowfruits.io",
    pricing:
      "Standard is $29.9/mo or $20.75/mo billed yearly. Premium is $79.9/mo or $62.45/mo billed yearly. Pay-as-you-go starts at $25 for 2,000 credits, which expire after 1 year. 14-day money-back if under 100 credits are used (lowfruits.io/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Can I use LowFruits without a subscription?",
        answer:
          "Yes. Pay-as-you-go starts at $25 for 2,000 credits. The credits expire after 1 year."
      }
    ]
  },
  {
    name: "KeySearch",
    slug: "keysearch",
    category: "seo-aeo",
    summary:
      "KeySearch is a low-cost keyword research tool with keyword difficulty, competitor analysis, and an AI content editor.",
    bestFor: "Keyword research on a budget, as a cheaper alternative to Ahrefs or Semrush.",
    audience:
      "Solo bloggers, small businesses, and freelancers who need keyword and competitor data but not an enterprise SEO suite.",
    pros: [
      "Starter is $24/mo, well below the big SEO suites.",
      "Keyword research, competitor analysis, and an AI editor sit in one tool.",
      "Pro raises the limit to 500 searches a day and adds Foresight."
    ],
    cons: [
      "Searches are capped per day: 200 on Starter, 500 on Pro.",
      "Agency-scale reporting and large backlink audits are a closer fit for the bigger SEO suites.",
      "It does not write articles or track AI answers."
    ],
    affiliateUrl: "https://keysearch.co?via=jaunius",
    homepage: "https://www.keysearch.co",
    pricing:
      "Starter is $24/mo (200 keyword searches/day). Pro is $48/mo (500 searches/day, includes Foresight) (keysearch.co, checked 5 November 2026).",
    faq: [
      {
        question: "Is KeySearch a replacement for Ahrefs or Semrush?",
        answer:
          "For keyword research and competitor checks on a small site, often yes, at a much lower price. For large backlink audits or agency-scale reporting, a bigger suite is the closer fit."
      }
    ]
  },
  {
    name: "Fireflies",
    slug: "fireflies",
    category: "ai-meeting-notetakers",
    summary:
      "Fireflies sends a meeting bot into Zoom, Google Meet, and Microsoft Teams calls, then writes the transcript, summary, and action items.",
    bestFor: "Teams that want a free plan and a notetaker that joins every major meeting app.",
    audience:
      "Sales and team leads who run calls across Zoom, Meet, and Teams and want searchable notes without changing how they book meetings.",
    pros: [
      "A free plan lets you try it on real calls before paying.",
      "One bot covers Zoom, Google Meet, and Microsoft Teams.",
      "AskFred answers questions across your past meetings, and paid plans push notes into CRMs."
    ],
    cons: [
      "The bot joins the call as a visible attendee, which some prospects notice.",
      "CRM integrations sit on paid plans, not on Free.",
      "The lowest per-seat prices need annual billing; monthly Pro is $18 instead of $10."
    ],
    affiliateUrl: "https://fireflies.ai/?fpr=jaunius-2b4eb6",
    homepage: "https://fireflies.ai",
    pricing:
      "Free is $0. Pro is $10/user/mo billed annually ($18 monthly). Business is $19/user/mo billed annually ($29 monthly). Enterprise is $39/user/mo billed annually (fireflies.ai/pricing and Fireflies billing docs, checked 5 November 2026).",
    faq: [
      {
        question: "Is there a free Fireflies plan?",
        answer:
          "Yes. Free is $0. Pro starts at $10 per user per month billed annually, or $18 billed monthly."
      },
      {
        question: "Which meeting apps does Fireflies work with?",
        answer:
          "Its bot joins Zoom, Google Meet, and Microsoft Teams calls and records them there."
      }
    ]
  },
  {
    name: "Noota",
    slug: "noota",
    category: "ai-meeting-notetakers",
    summary:
      "Noota records and summarizes meetings with EU-hosted data, and on paid plans it can record without a bot joining the call.",
    bestFor: "European teams that want EU hosting and bot-free recording.",
    audience:
      "Sales and recruiting teams in Europe that care where call data is stored and do not want a bot showing up in the attendee list.",
    pros: [
      "Data is hosted in the EU, and Noota says it does not train AI on your data.",
      "Pro adds invisible recording (no bot), 6 months of storage, and CRM sync.",
      "Sales and recruiting agents are available as add-ons when you need more than notes."
    ],
    cons: [
      "The free plan keeps recordings for 1 month only.",
      "Unlimited storage, phone calls, and automations need Business at €39/user/mo.",
      "Sales and recruiting agents cost extra on top of the plan."
    ],
    affiliateUrl: "https://www.noota.io/fr/actions-with-ai?fpr=jaunius-5dbebb",
    homepage: "https://www.noota.io",
    pricing:
      "Free is €0/user/mo billed annually (1 month storage). Pro is €19/user/mo billed annually (invisible recording, 6 months storage, CRM sync). Business is €39/user/mo billed annually (unlimited storage, phone calls, automations). Enterprise is custom (noota.io/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Can Noota record a meeting without a bot?",
        answer:
          "Yes, on Pro and above. Invisible recording is listed on Pro at €19 per user per month billed annually. The free plan does not include it."
      }
    ]
  },
  {
    name: "Leexi",
    slug: "leexi",
    category: "ai-meeting-notetakers",
    summary:
      "Leexi is a European AI meeting suite for sales teams that goes past notes into CRM, ATS, and VoIP sync.",
    bestFor: "European sales teams that want call notes synced to their CRM and phone system.",
    audience:
      "Sales managers in Europe who want meeting and phone-call notes in the CRM, with ISO 27001 and GDPR covered.",
    pros: [
      "Business syncs with CRM, ATS, and VoIP tools, so phone calls land next to video meetings.",
      "ISO 27001 certified and GDPR compliant.",
      "A 7-day free trial lets you test it on real calls."
    ],
    cons: [
      "There is no free plan, only the 7-day trial.",
      "Starter caps out at 5 licences and 20 hours a month.",
      "CRM and VoIP sync need Business at €39/mo billed annually. Prices exclude VAT."
    ],
    affiliateUrl: "https://www.leexi.ai/?via=jaunius",
    homepage: "https://www.leexi.ai",
    pricing:
      "Starter is €12/licence/mo billed annually (€15 monthly), up to 5 licences and 20h/mo. AI-Meeting is €23/mo billed annually (€29 monthly). Business is €39/mo billed annually (€49 monthly) with CRM/ATS/VoIP sync. Enterprise is custom. Prices exclude VAT; 7-day free trial (leexi.ai/en/pricing/, checked 5 November 2026).",
    faq: [
      {
        question: "Does Leexi sync with my CRM?",
        answer:
          "Yes, on Business. That plan adds CRM, ATS, and VoIP sync at €39/mo billed annually, or €49 billed monthly, excluding VAT."
      }
    ]
  },
  {
    name: "Bluedot",
    slug: "bluedothq",
    category: "ai-meeting-notetakers",
    summary:
      "Bluedot records meetings from a Chrome extension or desktop app instead of sending a bot, then writes notes and summaries.",
    bestFor: "People who want bot-free capture and MCP access to their meeting notes.",
    audience:
      "Founders, sales reps, and recruiters who do not want a bot in the call and want to query meeting notes from AI tools over MCP.",
    pros: [
      "Records from the browser or desktop, so no bot joins the attendee list.",
      "MCP is included on every paid plan.",
      "Business adds CRM/ATS sync plus SSO and SCIM."
    ],
    cons: [
      "The free plan is 5 meetings in total, not per month.",
      "Basic records audio only. Video needs Pro at $20/user/mo annual.",
      "Capture depends on the extension or desktop app running on your machine."
    ],
    affiliateUrl: "https://www.bluedothq.com/?ref=jaunius",
    homepage: "https://www.bluedothq.com",
    pricing:
      "Free is $0 (5 meetings lifetime). Basic is $14/user/mo annual ($18 monthly), audio-only and unlimited. Pro is $20/user/mo annual ($25 monthly) with video. Business is $32/user/mo annual ($39 monthly) with CRM/ATS and SSO/SCIM (bluedothq.com/pricing, checked 5 November 2026).",
    faq: [
      {
        question: "Does Bluedot join the call as a bot?",
        answer:
          "No. It records through its Chrome extension or desktop app, so there is no extra attendee in the meeting."
      }
    ]
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
  "cold-email-inbox": [
    "zapmail",
    "mailforge",
    "infraforge",
    "mailpool",
    "inframail",
    "icemail",
    "winnr"
  ],
  "email-verification": ["zerobounce", "bounceban", "truelist", "bouncify", "emaillistverify"],
  "email-warmup": ["warmy", "mailreach", "mailivery", "warmbox", "warmup-inbox"],
  "ai-sdr": ["salesforge", "gojiberry", "la-growth-machine", "artisan"],
  "website-visitor-identification": ["rb2b", "happierleads"],
  "lemlist-alternatives": [
    "smartlead",
    "salesforge",
    "reply",
    "saleshandy",
    "reachinbox",
    "salesblink",
    "smartreach",
    "emelia",
    "klenty",
    "emailchaser"
  ],
  "seo-aeo": ["outrank", "aiclicks", "clearscope", "chatseo", "lowfruits", "keysearch"],
  "ai-meeting-notetakers": ["fireflies", "noota", "leexi", "bluedothq"]
} as const satisfies Record<ToolCategoryId, readonly string[]>;

const PRIVATE_MARKERS = ["@", "paypal", "airwallex", "instantly.ai/?via="] as const;

function assertPublicToolsData(): void {
  const slugs = new Set<string>();

  for (const tool of TOOLS) {
    if (slugs.has(tool.slug)) {
      throw new Error(`Duplicate tool slug: ${tool.slug}`);
    }
    slugs.add(tool.slug);

    // Klenty's registered link is http://; the /go/ check below limits URLs to the registry.
    if (!/^https?:\/\//.test(tool.affiliateUrl) || /\s/.test(tool.affiliateUrl)) {
      throw new Error(`Affiliate URL must be a single http(s) URL for ${tool.slug}`);
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
