# SRC GUIDE

## OVERVIEW
All shipped site code lives here. Blast radius is high because routes share one layout, one stylesheet, one data hub, and one public theme script.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Shared shell | `layouts/SiteLayout.astro` | Every page goes through this file |
| Shared nav / theme button | `components/Header.astro` | Defines `theme-btn` and nav structure |
| Shared footer | `components/Footer.astro` | Site-wide links and socials |
| Route roots | `pages/` | Home, about, search, agents, dynamic posts |
| Site/page content | `data/site.ts` | Central page copy + metadata |
| Article adapter | `data/articles.ts` | Route-friendly wrapper over generated content |
| Global styling | `styles/global.css` | Tokens, shell, route-specific selectors |

## CONVENTIONS
- Keep pages thin when the content already belongs in `data/site.ts`.
- Use `@/` imports consistently.
- Route files stay Astro-native; shared building blocks stay in `components/` and `layouts/`.
- `styles/global.css` is global in the literal sense; scope new selectors tightly, especially for route-specific work.
- `SiteLayout.astro` is the only shared shell; normal page work should not bypass it.

## CROSS-CUTTING BOUNDARIES
- `layouts/SiteLayout.astro` loads global CSS, header/footer, transitions, and `/toggle-theme.js` for every route.
- `data/site.ts` feeds layout metadata, nav, socials, and authored page content across multiple pages.
- `data/articles.ts` and `pages/posts/[slug].astro` together drive home cards, search indexing, and post routing.
- `styles/global.css` can break unrelated routes if selectors are too generic.

## ANTI-PATTERNS
- Do not duplicate theme logic inside route files; shared behavior belongs in `public/toggle-theme.js`.
- Do not spread site copy across Astro pages when an existing `*_PAGE` object already owns it.
- Do not treat `global.css` as page-local CSS.
- Do not change shared selectors without checking `tests/about.spec.ts`.

## NOTES
- If the work is mostly about content objects or generated article data, read `data/AGENTS.md` next.
- If the work changes shared visuals, verify against `../tests/AGENTS.md` expectations.
