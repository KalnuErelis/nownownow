# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-22T07:13:36Z
**Commit:** 2c8d8a3
**Branch:** main

## OVERVIEW
Small Astro 5 static site for `kadunas.com`. Content and page copy live mostly in `src/data`, posts are generated from a Substack export, and site-wide behavior runs through one shared layout, one global stylesheet, and one public theme script.

## STRUCTURE
```text
./
├── src/                 # App code: routes, shared layout, components, data, styles
├── public/              # Static assets + runtime theme script + standalone redirect pages
├── tests/               # Focused Playwright/Axe regression harness
├── scripts/             # Content ingestion utilities
├── .github/workflows/   # GitHub Pages build/deploy workflow
├── obsidian/            # Sidecar notes/content workspace, not app runtime
├── .sisyphus/           # Local planning artifacts, not shipped site code
└── dist/                # Static build output
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Shared shell / metadata | `src/layouts/SiteLayout.astro` | Loads global CSS, header/footer, transitions, theme script |
| Global nav / theme trigger | `src/components/Header.astro` | Owns `theme-btn`, nav links, skip link |
| Site copy / nav / page objects | `src/data/site.ts` | Canonical source for site metadata and page content |
| Posts pipeline | `src/data/articles.ts` | Adapts generated articles into routed site data |
| Generated article source | `src/data/articles.generated.ts` | Machine-written; do not hand-edit |
| Post import pipeline | `scripts/import_substack_export.py` | Substack export -> generated TS data |
| Main routes | `src/pages/` | `index`, `about`, `search`, `agents`, `posts/[slug]` |
| Global styling | `src/styles/global.css` | One shared stylesheet with page-specific sections |
| Theme runtime | `public/toggle-theme.js` | Shared client behavior across Astro transitions |
| Regression harness | `tests/about.spec.ts` | `/about` checks + homepage smoke for shared selectors |
| Test runner | `playwright.config.ts` | Chromium-only, custom snapshot path, local web server |
| Deploy flow | `.github/workflows/deploy.yml` | Builds `dist/` on `main` pushes |

## HIERARCHY
- `src/AGENTS.md` — app-surface blast radius, layout/data/style rules
- `src/data/AGENTS.md` — data model, generated content, ingestion pipeline
- `tests/AGENTS.md` — Playwright workflow, mocks, snapshots, regression policy

## CONVENTIONS
- Use the `@/` alias for anything under `src`; avoid long relative imports.
- Treat `src/data/site.ts` as the primary content/config registry for navigation, metadata, and authored page copy.
- Post data flow is `scripts/import_substack_export.py` -> `src/data/articles.generated.ts` -> `src/data/articles.ts` -> home/search/post routes.
- `public/` is not passive-only; it contains runtime JS and standalone HTML compatibility pages.
- Playwright coverage is intentionally narrow: one `/about`-centered suite with committed screenshots.

## ANTI-PATTERNS (THIS PROJECT)
- Do not hand-edit `src/data/articles.generated.ts`.
- Do not reintroduce the legacy Python site builder or root-level generated HTML; deploy output is `dist/`.
- Do not make broad shared CSS/layout changes and skip the Playwright homepage smoke + `/about` checks.
- Do not move shared theme behavior into page-local scripts; keep the lifecycle logic in `public/toggle-theme.js`.
- Do not assume `public/` changes are asset-only; redirects and runtime behavior also live there.

## UNIQUE STYLES
- Shared structured content objects in `src/data/site.ts` use uppercase exports: `SITE`, `NOW_PAGE`, `ABOUT_PAGE`, `SEARCH_PAGE`, `AGENTS_PAGE`.
- Styling is plain CSS in one global file, not component-scoped CSS or Tailwind.
- Search uses inline page script; theme uses one plain public script.
- Visual baselines are committed under `tests/__screenshots__/about.spec.ts/chromium/`.

## COMMANDS
```bash
npm install
npm run dev
npm run build
npm run check
npm run lint
npm run test:about
npm run test:about -- --update-snapshots
npm run import:substack
```

## NOTES
- `tests/about.spec.ts` mocks external avatar/activity assets before navigation; keep that pattern when changing snapshots.
- `scripts/import_substack_export.py` has a machine-specific default export path; pass an explicit path if running elsewhere.
- `src/` is the main blast-radius zone; start there before editing shared site behavior.
- Hidden support trees (`.sisyphus/`, `.obsidian/`) are context stores, not production runtime.
