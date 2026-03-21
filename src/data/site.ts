export const SITE = {
  title: "Jaunius Kadunas",
  description:
    "Writing about agentic systems, work, and what survives contact with real operators.",
  url: "https://kadunas.com",
  email: "jaunius@kadunas.com",
  github: "https://github.com/KalnuErelis",
  linkedin: "https://www.linkedin.com/in/kadunas/",
  x: "https://twitter.com/jaunius",
  company: "https://whitebridge.ai",
  avatar: "https://avatars.githubusercontent.com/u/26115323?v=4",
  location: "Vienna, Austria",
  updated: "March 21, 2026"
};

export const SOCIALS = [
  { href: SITE.github, label: "GitHub", icon: "github" },
  { href: SITE.x, label: "X", icon: "x" },
  { href: SITE.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: `mailto:${SITE.email}`, label: "Email", icon: "email" }
] as const;

export const NAV_ITEMS = [
  { href: "/", label: "Posts" },
  { href: "/about/", label: "About" }
];

export const WRITING = {
  title: "Internet Diet",
  intro:
    "Notes on AI, work, systems, and whatever else survives first contact with real life.",
  home: "https://jauniuskadunas.substack.com",
  archive: "https://jauniuskadunas.substack.com/archive",
  feed: "https://jauniuskadunas.substack.com/feed",
  subscribe: "https://jauniuskadunas.substack.com/subscribe",
  posts: [
    {
      title: "How I’m Learning German in Vienna: What’s Working So Far",
      href: "https://jauniuskadunas.substack.com/p/how-im-learning-german-in-vienna",
      excerpt: "Pathing my self learning way to reach B2 in German.",
      publishedAt: "2025-09-28",
      source: "Substack",
      readingTime: "4 min read",
      tags: ["german", "vienna", "learning"]
    },
    {
      title: "Why You Shouldn’t Be Ashamed of Using AI for Proofreading",
      href: "https://jauniuskadunas.substack.com/p/why-you-shouldnt-be-ashamed-of-using",
      excerpt: "I used to feel ashamed of using AI to proofread my writing.",
      publishedAt: "2025-09-11",
      source: "Substack",
      readingTime: "4 min read",
      tags: ["ai", "writing", "proofreading"]
    },
    {
      title: "PART 2: lessons from spending $1000 on vibe coding",
      href: "https://jauniuskadunas.substack.com/p/part-2-lessons-from-spending-1000",
      excerpt:
        "From ChatGPT 3.5 prompt engineer to full stack vibe coder (Part 2: 2024-2025).",
      publishedAt: "2025-09-04",
      source: "Substack",
      readingTime: "6 min read",
      tags: ["ai", "coding", "vibe coding"]
    },
    {
      title: "PART 1: lessons from spending $1000 on vibe coding",
      href: "https://jauniuskadunas.substack.com/p/part-1-lessons-from-spending-1000",
      excerpt:
        "From ChatGPT 3.5 prompt engineer to full stack vibe coder (Part 1: 2023).",
      publishedAt: "2025-08-28",
      source: "Substack",
      readingTime: "6 min read",
      tags: ["ai", "coding", "vibe coding"]
    },
    {
      title: "How I’m Building an AI-First System for Writing Better",
      href: "https://jauniuskadunas.substack.com",
      excerpt: "A practical system for using AI in drafts without losing voice or judgment.",
      publishedAt: "2025-08-12",
      source: "Substack",
      readingTime: "5 min read",
      tags: ["writing", "ai", "workflow"]
    },
    {
      title: "Operator Notes on What Makes Agentic Systems Useful",
      href: "https://jauniuskadunas.substack.com",
      excerpt: "The bar is not novelty. The bar is whether the system reduces work and stays legible.",
      publishedAt: "2025-07-29",
      source: "Substack",
      readingTime: "5 min read",
      tags: ["agents", "systems", "operations"]
    }
  ]
};

export const NOW_PAGE = {
  title: "Jaunius Kadunas",
  description:
    "Writing, systems work, and what Jaunius Kadunas is focused on right now.",
  eyebrow: "Jaunius Kadunas",
  heroTitle: "Hi, I'm Jaunius.",
  role: "Agentic Engineer at WhiteBridge.ai",
  heroBody:
    "I build agentic systems that make work more useful, then write about the methods, edges, and mistakes that show up along the way.",
  heroSupport:
    "Notes on AI, work, systems, and whatever else survives first contact with real life.",
  quickLinks: [
    { href: WRITING.archive, label: "Substack Archive" },
    { href: SITE.company, label: "WhiteBridge.ai" }
  ],
  nowTitle: "What I’m Focused On",
  nowBody: [
    "Right now I’m deep in agentic engineering at WhiteBridge.ai, building systems that help teams move from promising demos to repeatable output.",
    "Outside work, the recurring themes are writing, endurance sport, sustainability, and learning German in Vienna."
  ],
  bullets: [
    "Designing AI workflows that stay inspectable instead of turning into black boxes.",
    "Working at the edge between sales technology, operational tooling, and internal research automation.",
    "Sharpening this site into a durable home for writing and public experiments."
  ]
};

export const ABOUT_PAGE = {
  title: "About",
  description:
    "Background, trajectory, and working style of Jaunius Kadunas.",
  heading: "About",
  image: SITE.avatar,
  imageAlt: "Jaunius Kadunas",
  intro: [
    "I build agentic systems where AI capability meets real operating work.",
    "Before that, I worked across growth, sales-tech, and operator systems. That left me with a practical bias: tools only matter if they survive contact with the actual workflow.",
    "Based in Vienna, with roots in Vilnius.",
    "Public work lives across GitHub, writing, and small experiments that try to stay useful."
  ],
  summaryLinks: [
    { href: SITE.github, label: "GitHub" },
    { href: WRITING.home, label: "Substack" },
    { href: SITE.linkedin, label: "LinkedIn" },
    { href: SITE.company, label: "WhiteBridge.ai" }
  ],
  current: [
    "Current role: Agentic Engineer at WhiteBridge.ai.",
    "Base: Vienna, with deep ties to Vilnius.",
    "Background across growth, sales technology, and operator-facing systems.",
    "Education: Coventry University, Communication and Media Studies."
  ],
  sections: [
    {
      title: "Current Work",
      body: [
        "Most of my work sits between internal tooling, GTM operations, and agentic workflows. I care about systems that reduce low-value work without turning into black boxes."
      ],
      bullets: [
        "Agentic workflows for research, qualification, and internal operations.",
        "Sales-tech systems that keep data and execution paths legible.",
        "AI implementation with a bias toward usefulness over spectacle."
      ]
    },
    {
      title: "Professional Path",
      body: [
        "The line through my career is less about titles and more about leverage. I started in hospitality, moved through marketing and business development, then into sales technology and now agentic systems."
      ],
      bullets: [
        "WhiteBridge.ai: Agentic Engineer.",
        "carVertical: Sales Technology Manager.",
        "PINPROOF: Head of Growth.",
        "Nord Security: Affiliate Manager.",
        "Earlier roles across Calqulate, HARMAN International, and hospitality work in the UK and US."
      ]
    },
    {
      title: "Outside Work",
      body: [
        "Outside the laptop, I gravitate toward work that rewards patience, repeated effort, and durable systems."
      ],
      bullets: [
        "Endurance sport: running, swimming, triathlon, and long training blocks.",
        "Sustainability and urban mobility as recurring interests.",
        "Coding side projects and AI tools for personal use.",
        "German language learning."
      ]
    }
  ],
  activity: {
    title: "GitHub Activity",
    body:
      "The best public signal is usually shipped work, not self-description. GitHub is the clearest ongoing record of what I’m building and refining.",
    chartUrl: "https://ghchart.rshah.org/KalnuErelis",
    chartAlt: "Jaunius Kadunas GitHub contribution chart",
    links: [
      { href: SITE.github, label: "GitHub profile" },
      { href: WRITING.archive, label: "Writing archive" }
    ]
  },
  subscribe: {
    title: "Stay Connected",
    body:
      "New posts, working notes, and useful links. Low volume.",
    action: "https://buttondown.com/api/emails/embed-subscribe/jaunius",
    tag: "jaunius",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    buttonLabel: "Subscribe",
    aside: "Pure signal. No fake growth loops."
  },
  note:
    "If you want to connect, the fastest route is usually Substack, GitHub, or a direct email."
  ,
  utilityNote:
    "Writing lives on Internet Diet. The best way to keep up is via email or the archive.",
  imprint: "Based in Vienna, building in public."
};

export const SEARCH_PAGE = {
  title: "Search",
  description: "Search writing and notes by title, excerpt, or tag.",
  prompt: "Search posts",
  helper: "Filter by title, excerpt, source, or tags.",
  empty: "Start typing to search across the writing archive.",
  noResults: "No posts found for that query."
};

export const AGENTS_PAGE = {
  title: "Agents",
  description:
    "The kinds of agentic systems and workflows Jaunius Kadunas builds and uses.",
  eyebrow: "Agents",
  heroTitle: "Tools that can carry work, not just generate text.",
  heroBody:
    "I’m interested in agents when they reduce cognitive load, preserve context, and make the next useful action easier. If the system becomes harder to inspect, it’s usually not worth keeping.",
  cards: [
    {
      title: "Research Operators",
      body:
        "Agents that gather context from live sources, structure the signal, and hand back something a person can evaluate fast."
    },
    {
      title: "Sales And GTM Workflows",
      body:
        "Operational systems around sourcing, enrichment, qualification, messaging, and campaign-safe execution."
    },
    {
      title: "Internal Tooling",
      body:
        "Small agentic interfaces that reduce repetitive work for teams without burying the decision path."
    }
  ],
  closing:
    "My bar is simple: keep the human in control, keep the system legible, and make the output materially better than the manual version."
};
